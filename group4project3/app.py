from sqlalchemy import func

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:Foge28!@@localhost:5432/clt_hotspots"

db = SQLAlchemy(app)


class Lynx(db.Model):
    __tablename__ = 'lynx'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    latitude = db.Column(db.String(100))
    longitude = db.Column(db.String(100))
    category = db.Column(db.String(100))

class Hotspot(db.Model):
    __tablename__ = 'hotspots'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    latitude = db.Column(db.String(100))
    longitude = db.Column(db.String(100))
    category = db.Column(db.String(255))

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    latitude = db.Column(db.String(100))
    longitude = db.Column(db.String(100))
    category = db.Column(db.String(100))

class Attraction(db.Model):
    __tablename__ = 'attractions'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    latitude = db.Column(db.String(100))
    longitude = db.Column(db.String(100))

@app.route("/api/lynx")
def list_stops():
    results = db.session.query(Lynx.name, Lynx.latitude, Lynx.longitude, Lynx.category).all()

    places = []
    for result in results:
        places.append({
            "name":  result[0],
            "latitude":  result[1],
            "longitude": result[2],
            "category":  result[3]
        })
    return jsonify(places)

@app.route("/api/hotspots")
def hot_spots():
    results = db.session.query(Hotspot.name, Hotspot.latitude, Hotspot.longitude, Hotspot.category).all()

    places = []
    for result in results:
        places.append({
            "name":  result[0],
            "latitude":  result[1],
            "longitude": result[2],
            "category":  result[3]
        })
    return jsonify(places)

@app.route("/api/restaurants")
def list_restaurants():
    results = db.session.query(Restaurant.name, Restaurant.latitude, Restaurant.longitude, Restaurant.category).all()

    places = []
    for result in results:
        places.append({
            "name":  result[0],
            "latitude":  result[1],
            "longitude": result[2],
            "category":  result[3]
        })
    return jsonify(places)

@app.route("/api/attractions")
def list_attractions():
    results = db.session.query(Attraction.name, Attraction.latitude, Attraction.longitude).all()

    places = []
    for result in results:
        places.append({
            "name":  result[0],
            "latitude":  result[1],
            "longitude": result[2]
        })
    return jsonify(places)


@app.route("/resources")
def resources():
    return render_template("resources.html")

@app.route("/team")
def team():
    return render_template("team.html")

@app.route("/lynx_data")
def lynx_data():
    return render_template("lynx_df.html")

@app.route("/attraction_data")
def attraction_data():
    return render_template("top_attractions.html")

@app.route("/restaurants_data")
def restaurants_data():
    return render_template("top_restaurants_df.html")

@app.route("/")
def home():
    return render_template("index.html")


if __name__ == "__main__":
    app.run()
