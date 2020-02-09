import os
from flask import Flask, send_from_directory, request

from service.Crimes.db import db_get_all_alerts, db_update_category, db_add_alert
from service.Crimes.s3 import upload_to_bucket

app = Flask(__name__, static_folder='react/build')

s3_bucket = 'ichack20-images'

# Serve React App
@app.route('/api/alerts', methods=['GET'])
def get_all_alerts():
    return {'alerts': db_get_all_alerts()}


@app.route('/api/alerts', methods=['POST'])
def add_alert():
    meraki_image_path = request.json['image_path']
    # processing to temp download local image

    # upload to s3 bucket
    temp_file_name = ""
    upload_to_bucket(temp_file_name, s3_bucket, temp_file_name)
    # image path should now be https://ichack20-images.s3.amazonaws.com/<imagename>
    image_path = "https://ichack20-images.s3.amazonaws.com/" + temp_file_name
    db_add_alert(image_path)
    return "Success"


@app.route('/api/alerts', methods=['PUT'])
def update_category():
    print(request.json)
    id = request.json['id']
    category = request.json['category']
    db_update_category(id, category)
    return "Success"


@app.route('/', defaults={'path': ''}, methods=['GET'])
@app.route('/<path:path>', methods=['GET'])
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(use_reloader=True, host="0.0.0.0", port=5000, threaded=True)
