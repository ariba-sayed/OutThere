from flask import Blueprint, jsonify


explore_bp = Blueprint("explore", __name__)


@explore_bp.route("/", methods=["GET"])
def explore():
    places = [
        {
            "id": 1,
            "name": "Cubbon Park",
            "category": "Nature",
            "description": "A peaceful green space for walking and relaxing.",
            "distance": "2.1 km"
        },
        {
            "id": 2,
            "name": "Lalbagh Botanical Garden",
            "category": "Nature",
            "description": "Explore gardens, trees and open spaces.",
            "distance": "4.5 km"
        },
        {
            "id": 3,
            "name": "Local Art Walk",
            "category": "Art",
            "description": "Discover interesting art and creative spaces.",
            "distance": "3.2 km"
        }
    ]

    return jsonify(places)