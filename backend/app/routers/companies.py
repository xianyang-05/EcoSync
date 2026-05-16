from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.database import supabase
from app.embedding_service import build_company_profile_text, generate_embedding

router = APIRouter(prefix="/companies", tags=["Companies"])


class CompanyCreate(BaseModel):
    firebase_uid: str
    email: str
    company_name: str
    registration_number: Optional[str] = None
    industry: Optional[str] = None
    sub_industry: Optional[str] = None
    business_stage: Optional[str] = None
    country: Optional[str] = None
    city: Optional[str] = None
    description: Optional[str] = None
    problem_statement: Optional[str] = None
    solution_summary: Optional[str] = None
    target_market: Optional[str] = None
    business_model: Optional[str] = None
    company_needs: Optional[str] = None
    team_size: Optional[int] = None
    founded_year: Optional[int] = None
    website_url: Optional[str] = None
    pitch_deck_url: Optional[str] = None


@router.post("/", status_code=201)
def create_company(payload: CompanyCreate):
    """
    Embedding pipeline:
      1. Build profile_text from structured fields
      2. Generate 384-dim vector via sentence-transformers
      3. Store data + vector into Supabase companies table
    """
    data = payload.model_dump()

    # Step 1 — build searchable profile text
    profile_text = build_company_profile_text(data)

    # Step 2 — generate embedding vector
    embedding = generate_embedding(profile_text)

    # Step 3 — insert into Supabase
    response = supabase.table("companies").insert(
        {**data, "profile_text": profile_text, "embedding": embedding}
    ).execute()

    if not response.data:
        raise HTTPException(status_code=500, detail="Insert failed")

    return {"message": "Company created", "data": response.data[0]}


@router.get("/")
def list_companies():
    response = supabase.table("companies").select(
        "id, company_name, industry, business_stage, country, verification_status, created_at"
    ).execute()
    return response.data


@router.get("/{company_id}")
def get_company(company_id: str):
    response = supabase.table("companies").select("*").eq("id", company_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Company not found")
    return response.data[0]
