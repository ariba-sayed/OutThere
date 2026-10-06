from flask import Blueprint, jsonify

events_bp = Blueprint("events", __name__)


@events_bp.route("/", methods=["GET"])
def events():
    events = [
        {
            "id": 1,
            "title": "Photography Walk",
            "category": "Outdoor Activity",
            "time": "5:00 PM",
            "date": "Today",
            "distance": "2.1 km",
            "price": "Free",
            "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
            "ai": True
        },
        {
            "id": 2,
            "title": "Weekend Bird Walk",
            "category": "Nature",
            "time": "6:30 AM",
            "date": "Tomorrow",
            "distance": "3.8 km",
            "price": "₹200",
            "image": "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=900&q=80",
            "ai": True
        },
        {
            "id": 3,
            "title": "The Sunday Flea Market",
            "category": "Market",
            "time": "10:00 AM",
            "date": "Sun, Oct 11",
            "distance": "4.8 km",
            "price": "Free",
            "image": "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=900&q=80"
        },
        {
            "id": 4,
            "title": "Outdoor Yoga Session",
            "category": "Wellness",
            "time": "7:00 AM",
            "date": "Sat, Oct 10",
            "distance": "2.8 km",
            "price": "₹300",
            "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80"
        },
        {
            "id": 5,
            "title": "Cubbon Park Sketch Club",
            "category": "Creative",
            "time": "4:30 PM",
            "date": "Today",
            "distance": "3.2 km",
            "price": "Free",
            "image": "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
            "ai": True
        },
        {
            "id": 6,
            "title": "Sunrise Run Club",
            "category": "Fitness",
            "time": "6:00 AM",
            "date": "Sat, Oct 10",
            "distance": "1.9 km",
            "price": "Free",
            "image": "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80"
        }
    ]

    return jsonify(events)