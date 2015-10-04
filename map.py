from flask import Flask, render_template, request, url_for
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

def insert(table, fields=(), values=()):
    # g.db is the database connection
    cur = g.db.cursor()
    query = 'INSERT INTO %s (%s) VALUES (%s)' % (
        table,
        ', '.join(fields),
        ', '.join(['?'] * len(values))
    )
    cur.execute(query, values)
    g.db.commit()
    id = cur.lastrowid
    cur.close()
    return id


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

@app.route('/postloc', methods=['POST'])
def postloc():
    #   lat = request.args.get('lat', 0, type=float)
    #   lon = request.args.get('lon', 0, type=float)
    #   print lat
    #   print lon
      # print(request.get_json())
      # g.db.execute('INSERT INTO data (type, lat, long) VALUES ()')
      # add data to the database
      data = request.get_json()
      insert('data', ('type', 'lat', 'long'), (data['type'], data['lat'], data['lon']))
    #   g.db.execute("""INSERT INTO data (type, lat, long)
    #                   VALUES (%s)""", (data['type'], data['lat'], data['lon']))
      return 'OK'

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

if __name__ == '__main__':
    app.run(debug=True)
