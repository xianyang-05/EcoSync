from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uuid
import ast
from database import supabase
from services.extraction import extract_startup_profile
from services.embeddings import generate_embedding
from master_pipeline import run_matching_pipeline
from services.match_service import save_match_recommendation

app = FastAPI(title="EcoSync AI Engine API", description="AI ecosystem linkage engine")

class ExtractRequest(BaseModel):
    profile_text: str

class RegisterStartupRequest(BaseModel):
    company_name: str
    email: str
    unstructured_profile_text: str

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

@app.post("/api/startups/register")
async def register_startup(request: RegisterStartupRequest):
    try:
        # 1. Extract structured data from unstructured text via Gemini
        extracted_data = await extract_startup_profile(request.unstructured_profile_text)
        
        # 2. Generate embedding for the company needs
        company_needs = extracted_data.get("company_needs", "Unknown")
        embedding = await generate_embedding(company_needs)
        
        # 3. Prepare data for Supabase insert
        # Mocking firebase_uid with a random UUID for MVP as requested
        firebase_uid = f"mock-firebase-uid-{uuid.uuid4().hex[:8]}"
        
        company_data = {
            "firebase_uid": firebase_uid,
            "email": request.email,
            "company_name": request.company_name,
            "industry": extracted_data.get("industry"),
            "business_stage": extracted_data.get("business_stage"),
            "company_needs": company_needs,
            "profile_text": request.unstructured_profile_text,
            "embedding": embedding
        }
        
        # 4. Insert into Supabase 'companies' table
        response = supabase.table("companies").insert(company_data).execute()
        
        if not response.data:
            raise Exception("Failed to insert company data into Supabase")
            
        return {
            "status": "success", 
            "message": "Startup registered successfully",
            "data": response.data[0]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/matches/generate/{startup_id}")
async def generate_match_route(startup_id: str):
    try:
        # 1. Fetch startup data & embedding from Supabase
        response = supabase.table("companies").select("*").eq("id", startup_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Startup not found")
            
        startup_data = response.data[0]
        
        # Safely parse the pgvector embedding representation
        embedding_raw = startup_data.get("embedding")
        if not embedding_raw:
            raise HTTPException(status_code=400, detail="Startup has no embedding context.")
            
        if isinstance(embedding_raw, str):
            startup_embedding = ast.literal_eval(embedding_raw)
        else:
            startup_embedding = embedding_raw
            
        # 2. Run the AI Brain Pipeline
        ai_result = await run_matching_pipeline(startup_data, startup_embedding)
        
        if "error" in ai_result:
            raise HTTPException(status_code=400, detail=ai_result["error"])
        
        # 3. Save to Database State Machine
        saved_record = await save_match_recommendation(startup_id, ai_result['mentor_id'], ai_result)
        
        # 4. Return to frontend
        return {
            "status": "success",
            "message": "AI match generated and saved successfully",
            "data": saved_record
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))