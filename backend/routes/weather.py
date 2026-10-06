from flask import Blueprint, jsonify, request
import requests

weather_bp = Blueprint("weather", __name__)


def get_weather_description(code):
    weather_codes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        61: "Light rain",
        63: "Moderate rain",
        65: "Heavy rain",
        71: "Light snow",
        73: "Moderate snow",
        75: "Heavy snow",
        80: "Light rain showers",
        81: "Moderate rain showers",
        82: "Heavy rain showers",
        95: "Thunderstorm",
        96: "Thunderstorm with hail",
        99: "Heavy thunderstorm with hail"
    }

    return weather_codes.get(code, "Unknown weather")


@weather_bp.route("/", methods=["GET"])
def weather():

    latitude = request.args.get("latitude")
    longitude = request.args.get("longitude")

    if not latitude or not longitude:
        return jsonify({
            "error": "Latitude and longitude are required"
        }), 400

    params = {
        "latitude": latitude,
        "longitude": longitude,

        "current": (
            "temperature_2m,"
            "relative_humidity_2m,"
            "apparent_temperature,"
            "precipitation,"
            "weather_code,"
            "wind_speed_10m"
        ),

        # We need these for the dynamic OutThere card.
        "daily": (
            "sunrise,"
            "sunset"
        ),

        "timezone": "auto"
    }

    try:

        response = requests.get(
            "https://api.open-meteo.com/v1/forecast",
            params=params,
            timeout=15
        )

        response.raise_for_status()

        data = response.json()

        current = data.get("current", {})
        daily = data.get("daily", {})

        sunrise = None
        sunset = None

        if daily.get("sunrise"):
            sunrise = daily["sunrise"][0]

        if daily.get("sunset"):
            sunset = daily["sunset"][0]

        return jsonify({

            "latitude": latitude,

            "longitude": longitude,

            "temperature": current.get(
                "temperature_2m"
            ),

            "feels_like": current.get(
                "apparent_temperature"
            ),

            "humidity": current.get(
                "relative_humidity_2m"
            ),

            "precipitation": current.get(
                "precipitation"
            ),

            "wind_speed": current.get(
                "wind_speed_10m"
            ),

            "weather_code": current.get(
                "weather_code"
            ),

            "weather": get_weather_description(
                current.get("weather_code")
            ),

            # 🌅🌇 NEW
            "sunrise": sunrise,

            "sunset": sunset,

            "timezone": data.get(
                "timezone"
            )
        })

    except requests.RequestException as error:

        print("Weather API error:", error)

        return jsonify({
            "error": "Could not fetch weather",
            "details": str(error)
        }), 500