import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("Missing GEMINI_API_KEY")

client = genai.Client(api_key=api_key)

print("Testing Gemini API (AI Studio)...")

# 🔍 LIST MODELS FIRST (this is critical)
models = client.models.list()

print("\nAvailable models:")
for m in models:
    print("-", m.name)

# 🧪 Pick first usable model automatically
model_name = models[0].name

print("\nUsing model:", model_name)

response = client.models.generate_content(
    model=model_name,
    contents="Reply with: Success"
)

print("\n✅ Result:")
print(response.text)