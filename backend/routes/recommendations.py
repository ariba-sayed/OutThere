from flask import Blueprint, jsonify, request
from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os
import json

load_dotenv()

recommendations_bp = Blueprint("recommendations", __name__)

HF_TOKEN = os.getenv("HF_TOKEN")
GEMMA_MODEL = os.getenv(
    "GEMMA_MODEL",
    "google/gemma-4-26B-A4B-it"
)

client = InferenceClient(api_key=HF_TOKEN)


@recommendations_bp.route("/", methods=["POST"])
def recommend_places():

    data = request.get_json() or {}

    places = data.get("places", [])
    weather = data.get("weather", {})

    if not places:
        return jsonify({
            "error": "No places provided"
        }), 400

    prompt = f"""
You are OutThere's outdoor recommendation engine.

Choose the best 3 places from the provided places.

IMPORTANT:
- ONLY use places from the provided list.
- NEVER invent a place.
- Keep reasons short.
- Return ONLY JSON.
- Do not use markdown.
- Do not explain anything outside the JSON.

Weather:
{json.dumps(weather)}

Places:
{json.dumps(places)}

Return exactly:

{{
  "recommendations": [
    {{
      "place": "exact title from provided places",
      "rank": 1,
      "reason": "Short reason"
    }},
    {{
      "place": "exact title from provided places",
      "rank": 2,
      "reason": "Short reason"
    }},
    {{
      "place": "exact title from provided places",
      "rank": 3,
      "reason": "Short reason"
    }}
  ]
}}
"""

    try:

        response = client.chat_completion(
            model=GEMMA_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=2000,
            temperature=0.3
        )

        print("\n========== GEMMA RECOMMENDATION ==========")
        print(response)
        print("==========================================\n")

        message = response.choices[0].message

        generated_text = message.content

        if generated_text is None:

            print("Gemma message:", message)

            return jsonify({
                "error": "Gemma returned no text",
                "message": str(message)
            }), 500

        generated_text = generated_text.strip()

        if generated_text.startswith("```"):
            generated_text = generated_text.replace(
                "```json", ""
            )
            generated_text = generated_text.replace(
                "```", ""
            )
            generated_text = generated_text.strip()

        recommendations = json.loads(generated_text)

        return jsonify(recommendations)

    except Exception as e:

        import traceback

        print("\n========== RECOMMENDATION ERROR ==========")
        print("ERROR:", e)
        traceback.print_exc()
        print("==========================================\n")

        return jsonify({
            "error": "Could not generate recommendations",
            "details": str(e)
        }), 500