from flask import Flask, render_template
from flask import g
from flask.ext.googlemaps import GoogleMaps
from flask.ext.googlemaps import Map
import json
import sqlite3

DATABASE = '/home/russell/Desktop/hackdartmouth/partymap.db'

app = Flask(__name__, template_folder=".")
GoogleMaps(app)

def connect_db():
    return sqlite3.connect(DATABASE)

# def get_db():
#     db = getattr(g, '_database', None)
#     if db is None:
#         db = g._database = connect_to_database()
#     return db

@app.before_request
def before_request():
    g.db = connect_db()

@app.route('/')
def mapview():
    return render_template('map.html')

@app.route('/data')
def data():
    fields = g.db.execute('SELECT lat, long, type from data')
    data = []
    for (lat, long, type) in fields:
        data.append({"lat":lat, "long":long, "type":type})
    return json.dumps(data)

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

if __name__ == '__main__':
    app.run(debug=True)
