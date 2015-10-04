from flask import Flask, render_template
from flask.ext.googlemaps import GoogleMaps
from flask.ext.googlemaps import Map
import json

app = Flask(__name__, template_folder=".")
GoogleMaps(app)

@app.route('/')
def mapview():
    return render_template('map.html')

@app.route('/hello')
def hello():
    data = {"data": "a"}
    return json.dumps(data)

if __name__ == '__main__':
    app.run(debug=True)
