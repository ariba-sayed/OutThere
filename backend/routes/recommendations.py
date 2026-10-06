from flask import Blueprint, jsonify, request
import json
import re
import os

from huggingface_hub import InferenceClient


recommendations_bp = Blueprint("recommendations", __name__)


HF_TOKEN = os.getenv("HF_TOKEN")
GEMMA_MODEL = os.getenv(
    "GEMMA_MODEL",
    "google/gemma-4-26B-A4B-it"
)

client = InferenceClient(
    api_key=HF_TOKEN
)


def clean_json_text(text):
    """
    Try to extract a JSON object from Gemma's response.
    """

    if not text:
        return None

    text = text.strip()

    # Case 1: response is already pure JSON
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # Case 2: JSON is inside a markdown code block
    code_block_match = re.search(
        r"```(?:json)?\s*(\{.*?\})\s*```",
        text,
        re.DOTALL
    )

    if code_block_match:
        try:
            return json.loads(code_block_match.group(1))
        except json.JSONDecodeError:
            pass

    # Case 3: find the first JSON object
    start = text.find("{")
    end = text.rfind("}")

    if start != -1 and end != -1 and end > start:

        candidate = text[start:end + 1]

        try:
            return json.loads(candidate)
        except json.JSONDecodeError:
            pass

    return None


def fallback_recommendations(places):
    """
    Safe fallback if Gemma does not return usable JSON.

    Ranking:
    1. Open places
    2. Rating
    3. Number of reviews
    """

    def score(place):

        rating = place.get("rating") or 0
        reviews = place.get("reviews") or 0

        status = str(
            place.get("open_status")
            or place.get("status")
            or ""
        ).lower()

        is_open = (
            "open" in status
            and "closed" not in status
        )

        return (
            1 if is_open else 0,
            rating,
            reviews
        )

    ranked = sorted(
        places,
        key=score,
        reverse=True
    )

    recommendations = []

    for index, place in enumerate(ranked[:3], start=1):

        name = (
            place.get("title")
            or place.get("name")
            or "Unknown place"
        )

        recommendations.append({
            "place": name,
            "rank": index,
            "reason": "A good nearby outdoor option."
        })

    return recommendations


@recommendations_bp.route("/", methods=["POST"])
def recommendations():

    data = request.get_json(silent=True) or {}

    places = data.get("places", [])
    weather = data.get("weather", {})

    if not places:
        return jsonify({
            "recommendations": []
        })

    # Only send the useful fields to Gemma.
    simplified_places = []

    for place in places:

        simplified_places.append({
            "name": (
                place.get("title")
                or place.get("name")
                or ""
            ),

            "type": place.get("type", ""),

            "rating": place.get(
                "rating",
                0
            ),

            "reviews": place.get(
                "reviews",
                0
            ),

            "status": (
                place.get("open_status")
                or place.get("status")
                or ""
            )
        })

    prompt = f"""
You are OutThere's outdoor recommendation engine.

Choose the best 3 places from the provided list.

Rules:
- ONLY choose places from the provided list.
- NEVER invent a place.
- Prefer places that are currently open.
- Consider rating and number of reviews.
- Keep each reason under 12 words.
- Return ONLY valid JSON.
- Do not use markdown.
- Do not explain your answer.

Weather:
{json.dumps(weather, ensure_ascii=False)}

Places:
{json.dumps(simplified_places, ensure_ascii=False)}

Return exactly this structure:

{{
  "recommendations": [
    {{
      "place": "exact place name",
      "rank": 1,
      "reason": "short reason"
    }},
    {{
      "place": "exact place name",
      "rank": 2,
      "reason": "short reason"
    }},
    {{
      "place": "exact place name",
      "rank": 3,
      "reason": "short reason"
    }}
  ]
}}
"""

    try:

        print("Calling Gemma recommendation engine...")

        response = client.chat.completions.create(
            model=GEMMA_MODEL,

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            max_tokens=400,

            temperature=0.2
        )

        message = response.choices[0].message

        print("Gemma message:", message)

        # Normally this is where the final answer lives.
        content = message.content

        parsed = clean_json_text(content)

        # -------------------------------------------------
        # IMPORTANT:
        # Some reasoning models may put useful output
        # into reasoning instead of content.
        # We use it only as a recovery mechanism.
        # -------------------------------------------------

        if parsed is None:

            reasoning = getattr(
                message,
                "reasoning",
                None
            )

            if reasoning:

                print(
                    "Gemma content was empty. "
                    "Trying reasoning as recovery."
                )

                parsed = clean_json_text(
                    reasoning
                )

        # -------------------------------------------------
        # Validate Gemma's result
        # -------------------------------------------------

        if parsed:

            gemma_recommendations = parsed.get(
                "recommendations"
            )

            if isinstance(
                gemma_recommendations,
                list
            ):

                valid_names = {
                    place["name"]
                    for place in simplified_places
                }

                validated = []

                for recommendation in gemma_recommendations:

                    if not isinstance(
                        recommendation,
                        dict
                    ):
                        continue

                    name = recommendation.get(
                        "place"
                    )

                    if name not in valid_names:
                        continue

                    validated.append({
                        "place": name,

                        "rank": len(validated) + 1,

                        "reason": (
                            recommendation.get(
                                "reason"
                            )
                            or "A good nearby outdoor option."
                        )
                    })

                    if len(validated) == 3:
                        break

                if validated:

                    print(
                        "Gemma recommendations:",
                        validated
                    )

                    return jsonify({
                        "recommendations": validated,
                        "source": "gemma"
                    })

        # -------------------------------------------------
        # Gemma failed → safe fallback
        # -------------------------------------------------

        print(
            "Gemma did not return usable JSON. "
            "Using fallback recommendations."
        )

        fallback = fallback_recommendations(
            places
        )

        return jsonify({
            "recommendations": fallback,
            "source": "fallback"
        })

    except Exception as error:

        print(
            "Gemma recommendation error:",
            error
        )

        # VERY IMPORTANT:
        # Recommendation failure should not break Explore.
        fallback = fallback_recommendations(
            places
        )

        return jsonify({
            "recommendations": fallback,
            "source": "fallback",
            "warning": "Gemma unavailable"
        })