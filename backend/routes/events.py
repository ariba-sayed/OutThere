from flask import Blueprint, jsonify


events_bp = Blueprint("events", __name__)


@events_bp.route("/", methods=["GET"])
def events():
    events = [
        {
            "id": 1,
            "name": "Weekend Photography Walk",
            "category": "Photography",
            "date": "2026-10-10",
            "location": "Bangalore",
            "price": 0
        },
        {
            "id": 2,
            "name": "Open Air Music Evening",
            "category": "Music",
            "date": "2026-10-11",
            "location": "Bangalore",
            "price": 300
        },
        {
            "id": 3,
            "name": "Beginner Pottery Workshop",
            "category": "Workshop",
            "date": "2026-10-12",
            "location": "Bangalore",
            "price": 500
        }
    ]

    return jsonify(events)