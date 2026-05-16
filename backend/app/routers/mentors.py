from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.database import supabase
from app.embedding_service import build_mentor_profile_text, generate_embedding

router = APIRouter(prefix="/mentors", tags=["Mentors"])


class MentorCreate(BaseModel):
    firebase_uid: str
    email: str
    mentor_name: str
    job_title: Optional[str] = None
    organization: Optional[str] = None
    years_experience: Optional[int] = None
    expertise: Optional[str] = None
    industries: Optional[str] = None
    mentoring_topics: Optional[str] = None
    preferred_stage: Optional[str] = None
    country: Optional[str] = None
    city: Optional[str] = None
    availability: Optional[str] = None
    linkedin_url: Optional[str] = None
    bio: Optional[str] = None


@router.post("/", status_code=201)
def create_mentor(payload: MentorCreate):
    """
    Embedding pipeline:
      1. Build profile_text from structured fields
      2. Generate 384-dim vector via sentence-transformers
      3. Store data + vector into Supabase mentors table
    """
    data = payload.model_dump()

    profile_text = build_mentor_profile_text(data)
    embedding = generate_embedding(profile_text)

    response = supabase.table("mentors").insert(
        {**data, "profile_text": profile_text, "embedding": embedding}
    ).execute()

    if not response.data:
        raise HTTPException(status_code=500, detail="Insert failed")

    return {"message": "Mentor created", "data": response.data[0]}


@router.get("/")
def list_mentors():
    response = supabase.table("mentors").select(
        "id, mentor_name, job_title, organization, expertise, country, verification_status, created_at"
    ).execute()
    return response.data


@router.get("/{mentor_id}")
def get_mentor(mentor_id: str):
    response = supabase.table("mentors").select("*").eq("id", mentor_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Mentor not found")
    return response.data[0]
