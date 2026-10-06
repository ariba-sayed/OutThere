from flask import Blueprint, jsonify, request
from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os
import json

load_dotenv()

missions_bp = Blueprint("missions", __name__)

HF_TOKEN = os.getenv("HF_TOKEN")
GEMMA_MODEL = os.getenv(
    "GEMMA_MODEL",
    "google/gemma-4-26B-A4B-it"
)

client = InferenceClient(
    api_key=HF_TOKEN
)


@missions_bp.route("/", methods=["POST"])
def create_mission():

    data = request.get_json() or {}

    time_available = data.get("time", "45 minutes")
    budget = data.get("budget", 300)
    mood = data.get("mood", "Peaceful")

    prompt = f"""
You are the mission generator for OutThere.

OutThere encourages people to spend meaningful time
outside and away from their screens.

Create ONE original outdoor mission.

User preferences:
- Time available: {time_available}
- Budget: ₹{budget}
- Mood: {mood}
- Location: Bengaluru, India

The mission must:
- Be realistic
- Fit the available time
- Stay within the budget
- Match the mood
- Encourage the user to physically go outside
- Feel like a small adventure

Do not always suggest walking or photography.

Do not invent specific businesses or events.

Return ONLY valid JSON in this exact structure:

{{
    "title": "Short mission title",
    "description": "Short description",
    "time": "{time_available}",
    "budget": {budget},
    "mood": "{mood}",
    "steps": [
        "Step 1",
        "Step 2",
        "Step 3",
        "Step 4"
    ],
    "xp": 50
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
            max_tokens=1500,
            temperature=0.7
        )
        # DEBUG: print the complete response
        print("\n========== GEMMA RESPONSE ==========")
        print(response)
        print("====================================\n")

        message = response.choices[0].message

        generated_text = message.content

        if generated_text is None:
            return jsonify({
                "error": "Gemma returned no text",
                "response": str(response)
            }), 500

        generated_text = generated_text.strip()

        if generated_text.startswith("```"):
            generated_text = generated_text.replace("```json", "")
            generated_text = generated_text.replace("```", "")
            generated_text = generated_text.strip()

        mission = json.loads(generated_text)

        return jsonify(mission)

    except Exception as e:

        print("Gemma error:", e)

        return jsonify({
            "error": "Could not generate mission",
            "details": str(e)
        }), 500