import os
from flask import Flask, send_from_directory, request

from service.Crimes.db import db_get_all_alerts, db_update_category, db_add_alert

app = Flask(__name__, static_folder='react/build')


# Serve React App
@app.route('/', defaults={'path': ''}, methods=['GET'])
@app.route('/api/alerts', methods=['GET'])
def get_all_alerts():
    return {'alerts': db_get_all_alerts()}


@app.route('/api/alerts', methods=['POST'])
def add_alert():
    image_path = request.json['image_path']
    db_add_alert(image_path)
    return "Success"


@app.route('/api/alerts', methods=['PUT'])
def update_category():
    print(request.json)
    id = request.json['id']
    category = request.json['category']
    db_update_category(id, category)
    return "Success"


@app.route('/<path:path>', methods=['GET'])
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(use_reloader=True, host="0.0.0.0", port=80, threaded=True)
