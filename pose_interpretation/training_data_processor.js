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

const print_keypoints = async (local_path) => {
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
        const keypoints = {};
        for (const keypoint of pose.keypoints) {
            keypoints[keypoint.part] = keypoint.position;
        }
        console.log(keypoints)
    }
    suspicious_image_count = Math.max(0, suspicious_image_count - count_deduction)
    console.log('\n');
};


