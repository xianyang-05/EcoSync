import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY is not set in the environment.")

genai.configure(api_key=gemini_api_key)
model = genai.GenerativeModel('gemini-2.5-flash')

async def generate_programme_details(initial_data: dict) -> dict:
    prompt = f"""You are an expert startup ecosystem programme generator. The user has provided some basic details for a new programme.
Generate the missing details to create a comprehensive and realistic programme profile. Return ONLY a valid JSON object.

Input details:
{json.dumps(initial_data, indent=2)}

You must return a JSON object with exactly the following string keys and realistically generated values:
- "organizer_email"
- "organizer_website"
- "description" (a 2-3 sentence overview)
- "objective" (a 1-2 sentence goal)
- "eligibility_criteria"
- "benefits"
- "application_open_date" (YYYY-MM-DD format, e.g. 2027-01-01)
- "application_deadline" (YYYY-MM-DD format)
- "programme_start_date" (YYYY-MM-DD format)
- "programme_end_date" (YYYY-MM-DD format)
- "venue"
- "max_participants" (a number as string, e.g. "15")
- "funding_amount" (a number as string, e.g. "100000", if applicable, otherwise "0")
- "website_url"
- "application_url"

Also if the input details like name, organizer, city, industry, stage, or type are empty strings, you should also generate and include them in the JSON output under the keys: "name", "type", "industry", "stage", "organizer", "city". If they are already provided, return them unchanged.

Return ONLY the JSON object.
"""

    response = model.generate_content(
        prompt,
        generation_config=genai.types.GenerationConfig(
            response_mime_type="application/json",
        )
    )
    
    try:
        data = json.loads(response.text)
        # Ensure we return all required fields even if the model missed some
        result = {
            "name": data.get("name", initial_data.get("name") or "Global Vanguard Accelerator"),
            "type": data.get("type", initial_data.get("type") or "Accelerator"),
            "industry": data.get("industry", initial_data.get("industry") or "Technology"),
            "stage": data.get("stage", initial_data.get("stage") or "Seed"),
            "organizer": data.get("organizer", initial_data.get("organizer") or "EcoSync Foundation"),
            "city": data.get("city", initial_data.get("city") or "San Francisco"),
            "organizer_email": data.get("organizer_email", "partnerships@ecosync.org"),
            "organizer_website": data.get("organizer_website", "https://ecosync.org"),
            "description": data.get("description", "An intensive 12-week accelerator designed to propel elite startups from prototype to Series A readiness."),
            "objective": data.get("objective", "Accelerate go-to-market strategies for deep tech companies."),
            "eligibility_criteria": data.get("eligibility_criteria", "Must have a working MVP, raised pre-seed, and have at least 2 full-time founders."),
            "benefits": data.get("benefits", "$100k investment, 1-on-1 mentorship, co-working space, and $50k in cloud credits."),
            "application_open_date": data.get("application_open_date", "2027-01-01"),
            "application_deadline": data.get("application_deadline", "2027-02-15"),
            "programme_start_date": data.get("programme_start_date", "2027-03-01"),
            "programme_end_date": data.get("programme_end_date", "2027-05-30"),
            "venue": data.get("venue", "Innovation Hub"),
            "max_participants": str(data.get("max_participants", "15")),
            "funding_amount": str(data.get("funding_amount", "100000")),
            "website_url": data.get("website_url", "https://ecosync.org/programme"),
            "application_url": data.get("application_url", "https://ecosync.org/apply")
        }
        return result
    except json.JSONDecodeError:
        raise ValueError(f"Failed to parse JSON from Gemini response: {response.text}")
