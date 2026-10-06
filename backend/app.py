from flask import Flask, jsonify
from flask_cors import CORS
from routes.location import location_bp
from routes.explore import explore_bp
from routes.events import events_bp
from routes.missions import missions_bp
from routes.weather import weather_bp
from routes.recommendations import recommendations_bp

app = Flask(__name__)

# Allow requests from our frontend
CORS(app)

# Register API routes
app.register_blueprint(explore_bp, url_prefix="/api/explore")
app.register_blueprint(events_bp, url_prefix="/api/events")
app.register_blueprint(missions_bp, url_prefix="/api/missions")
app.register_blueprint(location_bp, url_prefix="/api/location")
app.register_blueprint(weather_bp,url_prefix="/api/weather")
app.register_blueprint(recommendations_bp,url_prefix="/api/recommendations")

@app.route("/")
def home():
    return jsonify({
        "message": "TouchGrass API is running 🌱"
    })


@app.route("/api/health")
def health():
    return jsonify({
        "status": "healthy",
        "service": "TouchGrass backend"
    })


if __name__ == "__main__":
    app.run(debug=True)