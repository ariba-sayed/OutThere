from flask import Blueprint, jsonify, request
import requests
import os
from datetime import datetime, timedelta

events_bp = Blueprint("events", __name__)

SERPAPI_KEY = os.getenv("SERPAPI_KEY")


# =========================================================
# DATE HELPERS
# =========================================================

def get_dates():
    today = datetime.now().date()
    tomorrow = today + timedelta(days=1)

    # Saturday = 5, Sunday = 6
    days_until_saturday = (5 - today.weekday()) % 7

    saturday = today + timedelta(days=days_until_saturday)
    sunday = saturday + timedelta(days=1)

    return {
        "today": today,
        "tomorrow": tomorrow,
        "saturday": saturday,
        "sunday": sunday,
    }


def parse_event_date(event):
    """
    Convert dates returned by Google/SerpApi into a Python date.

    Examples:
        "18 Oct"
        "8 Oct"
        "10 Oct"
        "Nov 15"
        "October 10"
    """

    raw_date = event.get("date")

    if isinstance(raw_date, dict):
        raw_date = (
            raw_date.get("start_date")
            or raw_date.get("when")
        )

    if not raw_date:
        return None

    raw_date = str(raw_date).strip()

    today = datetime.now().date()
    current_year = today.year

    formats = [
        "%d %b",
        "%d %B",
        "%b %d",
        "%B %d",

        "%d %b %Y",
        "%d %B %Y",
        "%b %d %Y",
        "%B %d %Y",

        "%d %b, %Y",
        "%d %B, %Y",
        "%b %d, %Y",
        "%B %d, %Y",
    ]

    for fmt in formats:

        try:

            parsed = datetime.strptime(
                raw_date,
                fmt
            )

            # If the result didn't contain a year,
            # use the current year.
            if "%Y" not in fmt:
                parsed = parsed.replace(
                    year=current_year
                )

            event_date = parsed.date()

            # Handle New Year correctly.
            if event_date < today - timedelta(days=300):
                event_date = event_date.replace(
                    year=current_year + 1
                )

            return event_date

        except ValueError:
            continue

    return None

# =========================================================
# EVENT CLASSIFICATION
# =========================================================

def get_date_filter(event_date):
    """
    Return:

        Today
        Tomorrow
        Weekend
        Other
        Unknown
    """

    dates = get_dates()

    if event_date is None:
        return "Unknown"

    if event_date == dates["today"]:
        return "Today"

    if event_date == dates["tomorrow"]:
        return "Tomorrow"

    if event_date == dates["saturday"]:
        return "Weekend"

    if event_date == dates["sunday"]:
        return "Weekend"

    return "Other"


# =========================================================
# CATEGORY
# =========================================================

def get_category(event):
    title = str(event.get("title", "")).lower()
    event_type = str(event.get("type", "")).lower()

    text = f"{title} {event_type}"

    categories = {
        "Music": [
            "concert",
            "music",
            "live",
            "dj",
            "band",
            "gig",
        ],

        "Art": [
            "art",
            "painting",
            "drawing",
            "sketch",
            "gallery",
            "exhibition",
            "creative",
        ],

        "Photography": [
            "photography",
            "photograph",
            "photo walk",
            "camera",
        ],

        "Workshop": [
            "workshop",
            "masterclass",
            "hands-on",
            "class",
        ],

        "Food": [
            "food",
            "cooking",
            "baking",
            "tasting",
            "culinary",
        ],

        "Sports": [
            "football",
            "cricket",
            "badminton",
            "basketball",
            "tennis",
            "cycling",
            "running",
            "sports",
        ],

        "Nature": [
            "nature",
            "hike",
            "hiking",
            "trek",
            "forest",
            "garden",
            "bird",
            "wildlife",
        ],

        "Market": [
            "market",
            "flea",
            "bazaar",
            "fair",
            "craft fair",
        ],

        "Theatre": [
            "theatre",
            "theater",
            "play",
            "drama",
            "comedy",
            "stand-up",
        ],

        "Community": [
            "community",
            "meetup",
            "volunteer",
            "networking",
            "social",
        ],
    }

    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword in text:
                return category

    return "Activity"


# =========================================================
# REMOVE RESULTS WE DON'T WANT
# =========================================================

def should_ignore(event):
    """
    Prevent the Events page from becoming a list of
    gyms, yoga studios, salons, etc.
    """

    title = str(event.get("title", "")).lower()
    event_type = str(event.get("type", "")).lower()

    text = f"{title} {event_type}"

    unwanted = [
        "yoga studio",
        "yoga center",
        "yoga centre",
        "gym",
        "fitness center",
        "fitness centre",
        "fitness studio",
        "personal trainer",
        "pilates studio",
        "spa",
        "salon",
        "physiotherapy",
        "physio clinic",
        "martial arts academy",
    ]

    return any(word in text for word in unwanted)


# =========================================================
# FORMAT EVENT
# =========================================================

def format_event(event, index):
    title = str(event.get("title", "")).strip()

    event_date = parse_event_date(event)

    date_filter = get_date_filter(event_date)

    # -----------------------------------------
    # DATE
    # -----------------------------------------

    raw_date = event.get("date")

    if isinstance(raw_date, dict):
        display_date = (
            raw_date.get("when")
            or raw_date.get("start_date")
            or "Date unavailable"
        )
    else:
        display_date = raw_date or "Date unavailable"

    # -----------------------------------------
    # VENUE
    # -----------------------------------------

    venue = event.get("venue", "")

    if isinstance(venue, dict):
        venue_name = (
            venue.get("name")
            or venue.get("title")
            or ""
        )
    else:
        venue_name = str(venue)

    # -----------------------------------------
    # ADDRESS
    # -----------------------------------------

    address = event.get("address", "")

    if isinstance(address, list):
        address = ", ".join(str(item) for item in address)

    # -----------------------------------------
    # IMAGE
    # -----------------------------------------

    image = (
        event.get("thumbnail")
        or event.get("image")
        or "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
    )

    # -----------------------------------------
    # LINK
    # -----------------------------------------

    link = (
        event.get("link")
        or event.get("event_link")
        or ""
    )

    # -----------------------------------------
    # TIME
    # -----------------------------------------

    time = event.get("time", "")

    if not time and isinstance(event.get("date"), dict):
        time = event["date"].get("when", "")

    # -----------------------------------------
    # DESCRIPTION
    # -----------------------------------------

    description = (
        event.get("description")
        or event.get("type")
        or "A real-world event happening near you."
    )

    return {
        "id": index,

        "title": title,

        "category": get_category(event),

        "date": display_date,

        "date_filter": date_filter,

        "event_date": (
            event_date.isoformat()
            if event_date
            else None
        ),

        "event_type": "event",

        "time": time,

        "venue": venue_name,

        "address": address,

        "distance": "Nearby",

        "price": event.get("ticket_info", ""),

        "image": image,

        "link": link,

        "description": description,
    }


# =========================================================
# EVENTS API
# =========================================================

@events_bp.route("/", methods=["GET"])
def get_events():

    latitude = request.args.get("latitude")
    longitude = request.args.get("longitude")

    if not latitude or not longitude:
        return jsonify({
            "error": "Latitude and longitude are required"
        }), 400

    if not SERPAPI_KEY:
        return jsonify({
            "error": "SERPAPI_KEY is not configured"
        }), 500

    dates = get_dates()

    # =====================================================
    # ONE SERPAPI REQUEST
    # =====================================================

    params = {
        "engine": "google",

        # This wording is important.
        # Google is more likely to expose an events block
        # for queries that explicitly mention events.
        "q": "events near me",

        "location": "Bengaluru, Karnataka, India",

        "hl": "en",

        "gl": "in",

        "num": 20,

        "api_key": SERPAPI_KEY,
    }

    try:

        response = requests.get(
            "https://serpapi.com/search.json",
            params=params,
            timeout=20,
        )

        response.raise_for_status()

        data = response.json()

    except requests.RequestException as error:

        print("SerpApi Events Error:", error)

        return jsonify({
            "error": "Could not fetch events",
            "details": str(error),
        }), 500

    # =====================================================
    # DEBUG
    # =====================================================

    print("SerpApi keys:", list(data.keys()))

    # =====================================================
    # PRIMARY SOURCE
    #
    # SerpApi documents events_results as the structured
    # event data returned from normal Google Search.
    # =====================================================

    raw_events = data.get("events_results", [])

    # =====================================================
    # FALLBACK
    #
    # If Google doesn't expose an events_results block,
    # inspect organic results instead.
    # =====================================================

    if not raw_events:

        print("No events_results found. Checking organic_results.")

        organic_results = data.get("organic_results", [])

        for result in organic_results:

            title = result.get("title", "")

            snippet = result.get("snippet", "")

            combined = (
                f"{title} {snippet}"
            ).lower()

            event_words = [
                "event",
                "concert",
                "workshop",
                "festival",
                "exhibition",
                "meetup",
                "show",
                "market",
                "performance",
                "happening",
            ]

            looks_like_event = any(
                word in combined
                for word in event_words
            )

            if not looks_like_event:
                continue

            raw_events.append({
                "title": title,

                "link": result.get("link", ""),

                "thumbnail": result.get("thumbnail", ""),

                "description": snippet,

                "type": "Event",

                "date": result.get("date", ""),

                "venue": result.get("source", ""),

                "address": "",

            })

    # =====================================================
    # FORMAT + DEDUPLICATE
    # =====================================================

    formatted_events = []

    seen = set()

    for event in raw_events:

        title = str(
            event.get("title", "")
        ).strip()

        if not title:
            continue

        normalized = " ".join(
            title.lower().split()
        )

        if normalized in seen:
            continue

        seen.add(normalized)

        if should_ignore(event):
            continue

        formatted = format_event(
            event,
            len(formatted_events) + 1
        )

        formatted_events.append(formatted)

    # =====================================================
    # SORT
    #
    # Actual upcoming events first.
    # Unknown dates last.
    # =====================================================

    def sort_key(event):

        event_date = event.get("event_date")

        if not event_date:
            return (
                2,
                "9999-12-31"
            )

        return (
            0 if event["date_filter"] in [
                "Today",
                "Tomorrow",
                "Weekend",
            ] else 1,
            event_date,
        )

    formatted_events.sort(
        key=sort_key
    )

    # Maximum 20.
    formatted_events = formatted_events[:20]

    # Re-number after sorting.
    for index, event in enumerate(
        formatted_events,
        start=1
    ):
        event["id"] = index

    # =====================================================
    # RESPONSE
    # =====================================================

    return jsonify({

        "events": formatted_events,

        "dates": {
            "today": dates["today"].isoformat(),

            "tomorrow": dates["tomorrow"].isoformat(),

            "saturday": dates["saturday"].isoformat(),

            "sunday": dates["sunday"].isoformat(),
        },

        "total": len(formatted_events),

        "source": "Google Search via SerpApi",

        "note": (
            "Events are taken from Google's event/search "
            "results. Date filters use dates returned by "
            "the search results rather than venue opening hours."
        ),
    })