from flask import Blueprint, jsonify

explore_bp = Blueprint("explore", __name__)


@explore_bp.route("/", methods=["GET"])
def explore():
    places = [
        {
            "title": "Lalbagh Botanical Garden",
            "type": "Nature escape",
            "distance": "3.4 km",
            "cost": "₹30",
            "time": "Best after 4:30 PM",
            "image": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80",
            "reason": "Easy green escape with enough time for a slow walk before sunset."
        },
        {
            "title": "Ulsoor Lake",
            "type": "Sunset + walk",
            "distance": "4.1 km",
            "cost": "Free",
            "time": "Best 5:15–6:30 PM",
            "image": "https://images.unsplash.com/photo-1470214304380-aadaedcfff1b?auto=format&fit=crop&w=1000&q=80",
            "reason": "Tonight's clouds make this a strong sunset candidate."
        },
        {
            "title": "Cubbon Park",
            "type": "Walk + photography",
            "distance": "3.0 km",
            "cost": "Free",
            "time": "Best before 6:00 PM",
            "image": "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80",
            "reason": "Close, free, and good for a 45-minute phone-free reset."
        },
        {
            "title": "Turahalli Forest",
            "type": "Mini adventure",
            "distance": "12.8 km",
            "cost": "Free",
            "time": "Best before sunset",
            "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
            "reason": "Worth the extra travel if you want something that feels like an escape."
        }
    ]

    return jsonify(places)