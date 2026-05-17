from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import supabase
from services.extraction import extract_startup_profile
from services.generator import generate_programme_details

app = FastAPI(title="EcoSync AI Engine API", description="AI ecosystem linkage engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ExtractRequest(BaseModel):
    profile_text: str

class GenerateProgrammeRequest(BaseModel):
    name: str = ""
    type: str = ""
    industry: str = ""
    stage: str = ""
    organizer: str = ""
    country: str = ""
    city: str = ""

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Welcome to the EcoSync AI Engine API"}

@app.get("/health")
def health_check():
    # Verify Supabase connection by checking the companies table
    try:
        response = supabase.table("companies").select("id").limit(1).execute()
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": str(e)}

@app.post("/api/extract/startup")
async def extract_startup(request: ExtractRequest):
    try:
        extracted_data = await extract_startup_profile(request.profile_text)
        return {"status": "success", "data": extracted_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate/programme")
async def generate_programme(request: GenerateProgrammeRequest):
    try:
        generated_data = await generate_programme_details(request.dict())
        return {"status": "success", "data": generated_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
