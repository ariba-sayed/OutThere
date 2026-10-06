from flask import Blueprint, jsonify, request

location_bp = Blueprint("location", __name__)


@location_bp.route("/", methods=["POST"])
def save_location():

    data = request.get_json() or {}

    latitude = data.get("latitude")
    longitude = data.get("longitude")

    if latitude is None or longitude is None:
        return jsonify({
            "error": "Latitude and longitude are required"
        }), 400

    print(f"User location: {latitude}, {longitude}")

    return jsonify({
        "success": True,
        "latitude": latitude,
        "longitude": longitude
    })