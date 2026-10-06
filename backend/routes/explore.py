from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
import os
import requests

load_dotenv()

explore_bp = Blueprint("explore", __name__)

SERPAPI_KEY = os.getenv("SERPAPI_KEY")


@explore_bp.route("/", methods=["GET"])
def explore():

    latitude = request.args.get("latitude")
    longitude = request.args.get("longitude")

    if not latitude or not longitude:
        return jsonify({
            "error": "Latitude and longitude are required"
        }), 400

    if not SERPAPI_KEY:
        return jsonify({
            "error": "SERPAPI_KEY is missing"
        }), 500

    # -----------------------------
    # GET NEARBY PLACES
    # -----------------------------

    places_params = {
        "engine": "google_maps",
        "q": "parks gardens outdoor places",
        "ll": f"@{latitude},{longitude},14z",
        "type": "search",
        "api_key": SERPAPI_KEY
    }

    # -----------------------------
    # GET WEATHER
    # -----------------------------

    weather_params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": (
            "temperature_2m,"
            "apparent_temperature,"
            "precipitation,"
            "weather_code,"
            "wind_speed_10m"
        ),
        "timezone": "auto"
    }

    try:

        # Places request
        places_response = requests.get(
            "https://serpapi.com/search.json",
            params=places_params,
            timeout=15
        )

        places_response.raise_for_status()

        places_data = places_response.json()

        places = []

        for place in places_data.get("local_results", [])[:10]:

            places.append({
                "title": place.get("title", "Outdoor place"),
                "type": place.get("type", "Outdoor"),
                "distance": place.get("distance", "Nearby"),
                "cost": place.get("price", "Free / Check price"),
                "time": (
                    place.get("open_state")
                    or place.get("hours")
                    or "Check opening hours"
                ),
                "rating": place.get("rating"),
                "reviews": place.get("reviews"),
                "address": place.get("address"),
                "image": place.get("thumbnail"),
                "reason": "A nearby outdoor place you could explore."
            })

        # Weather request
        weather_response = requests.get(
            "https://api.open-meteo.com/v1/forecast",
            params=weather_params,
            timeout=15
        )

        weather_response.raise_for_status()

        weather_data = weather_response.json()
        current_weather = weather_data.get("current", {})

        return jsonify({
            "places": places,
            "weather": {
                "temperature": current_weather.get("temperature_2m"),
                "feels_like": current_weather.get(
                    "apparent_temperature"
                ),
                "precipitation": current_weather.get(
                    "precipitation"
                ),
                "weather_code": current_weather.get(
                    "weather_code"
                ),
                "wind_speed": current_weather.get(
                    "wind_speed_10m"
                )
            }
        })

    except requests.RequestException as e:

        print("API error:", e)

        return jsonify({
            "error": "Could not fetch places or weather",
            "details": str(e)
        }), 500