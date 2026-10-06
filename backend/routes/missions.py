from flask import Blueprint, jsonify, request


missions_bp = Blueprint("missions", __name__)


@missions_bp.route("/", methods=["POST"])
def create_mission():

    data = request.get_json() or {}

    time_available = data.get("time", "2 hours")
    budget = data.get("budget", 500)
    mood = data.get("mood", "relaxed")

    mission = {
        "title": "Take a Photo Walk",
        "description": "Explore somewhere nearby and capture five interesting things.",
        "time": time_available,
        "budget": budget,
        "mood": mood,
        "steps": [
            "Choose a nearby outdoor location",
            "Walk around for 30 minutes",
            "Take 5 photos of things you normally overlook",
            "Stop somewhere and relax for 20 minutes"
        ],
        "xp": 50
    }

    return jsonify(mission)