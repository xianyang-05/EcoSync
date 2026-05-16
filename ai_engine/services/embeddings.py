import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini (It may already be configured if extraction.py is imported first, 
# but it's good practice to ensure it's available here too)
gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY is not set in the environment.")

genai.configure(api_key=gemini_api_key)

async def generate_embedding(text: str) -> list[float]:
    """Generates a text embedding using Google's text-embedding-004 model."""
    if not text or text == 'Unknown' or text.strip() == '':
        text = "No specific needs provided."
        
    result = genai.embed_content(
        model="models/text-embedding-004",
        content=text,
        task_type="retrieval_document"
    )
    
    return result['embedding']
