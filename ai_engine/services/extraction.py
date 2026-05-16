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

# Initialize the Gemini 2.5 Flash model
model = genai.GenerativeModel('gemini-2.5-flash')

async def extract_startup_profile(unstructured_text: str) -> dict:
    prompt = f"""You are an expert innovation ecosystem data extractor. Read the following unstructured startup profile and extract the data into a strict JSON format. 
You must extract: 'industry' (string), 'business_stage' (string, e.g., Seed, Series A), and 'company_needs' (a single concise string summarizing their core needs). 
If a field cannot be determined, return 'Unknown'.

Startup Profile:
{unstructured_text}"""

    response = model.generate_content(
        prompt,
        generation_config=genai.types.GenerationConfig(
            response_mime_type="application/json",
        )
    )
    
    try:
        # The response.text is guaranteed to be a JSON string due to response_mime_type
        return json.loads(response.text)
    except json.JSONDecodeError:
        raise ValueError(f"Failed to parse JSON from Gemini response: {response.text}")
