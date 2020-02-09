const tf = require('@tensorflow/tfjs-node');
const posenet = require('@tensorflow-models/posenet');
const {
    createCanvas, Image
} = require('canvas');
const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;

var fs = require('fs'),
    request = require('request');
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
      if (res.headers['content-type']) {
          console.log('content-type:', res.headers['content-type']);
          console.log('content-length:', res.headers['content-length']);
          request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      } else {
          setTimeout(function() {
            download(uri, filename, callback)
        }, 100);
      }
  });
};

let suspicious_image_count = 0;
const count_deduction = 2;

const analyse = async (local_path) => {

    console.log('loading image from local');
    const img = new Image();
    img.src = local_path;
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    console.log('Estimating pose from image.');
    const net = await posenet.load();
    const input = tf.browser.fromPixels(canvas);
    const poses = await net.estimateMultiplePoses(input, imageScaleFactor, flipHorizontal, outputStride);
    for (const pose of poses) {
        console.log('pose');
        const keypoints = {};
        for (const keypoint of pose.keypoints) {
            keypoints[keypoint.part] = keypoint.position;
        }
        if (Math.abs(keypoints['leftShoulder'].y - keypoints['leftHip'].y) < 400
            || Math.abs(keypoints['rightShoulder'].y - keypoints['rightHip'].y) < 400) {
            suspicious_image_count += 1;
            console.log('detected flat');
            if (suspicious_image_count >= 5) {
                console.log('ALERT');
            }
            return;
        }
    }
    suspicious_image_count = Math.max(0, suspicious_image_count - count_deduction)
    console.log('end');
};

const runSnapshotAnalysis = async(iteration, snapshot_url) => {
    console.log('Fetching snapshot from', snapshot_url);
    const temp_file_name = 'snapshots0/image' + iteration + '.jpeg';
    download(snapshot_url, temp_file_name, function() { analyse(temp_file_name)})
};

const findSnapshotLink = async(snapshot_url) => {
    console.log("Trying to find snapshot link at", snapshot_url);
    return new Promise((resolve, reject) => {
        request({
                uri: snapshot_url,
                method: 'POST',
                headers: {
                    'X-Cisco-Meraki-API-Key': '96850833f85705851d736e34914eea6db9360280',
                    'Accept': 'application/json'
                },
            },
            (err, res, body) => {
                 if (res.statusCode === 308 && res.headers.location) {
                      console.log('308 - Redirected');
                      resolve(findSnapshotLink(res.headers.location))
                 } else if (200 <= res.statusCode < 300) {
                      console.log(res.statusCode, '- Success');
                      resolve(JSON.parse(body)['url']);
                 } else {
                     reject('Unexpected Error')
                 }
        });
    });
};

const recursiveLoop = (iteration) => {
    findSnapshotLink('https://api.meraki.com/api/v0/networks/L_575897802350005367/cameras/Q2FV-ZUXG-MZ79/snapshot')
        .then(url => runSnapshotAnalysis(iteration, url))
    setTimeout(function() {
        recursiveLoop(iteration+1)
    }, 5000);
};

recursiveLoop(0);