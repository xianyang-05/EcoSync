from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.database import supabase
from app.embedding_service import build_organizer_profile_text, generate_embedding

router = APIRouter(prefix="/organizers", tags=["Organizers"])


class OrganizerCreate(BaseModel):
    firebase_uid: str
    email: str
    organizer_name: str
    organization_type: Optional[str] = None
    country: Optional[str] = None
    city: Optional[str] = None
    description: Optional[str] = None
    focus_industries: Optional[str] = None
    programmes_managed: Optional[str] = None
    website_url: Optional[str] = None
    contact_email: Optional[str] = None


@router.post("/", status_code=201)
def create_organizer(payload: OrganizerCreate):
    """
    Embedding pipeline:
      1. Build profile_text from structured fields
      2. Generate 384-dim vector via sentence-transformers
      3. Store data + vector into Supabase organizers table
    """
    data = payload.model_dump()

    profile_text = build_organizer_profile_text(data)
    embedding = generate_embedding(profile_text)

    response = supabase.table("organizers").insert(
        {**data, "profile_text": profile_text, "embedding": embedding}
    ).execute()

    if not response.data:
        raise HTTPException(status_code=500, detail="Insert failed")

    return {"message": "Organizer created", "data": response.data[0]}


@router.get("/")
def list_organizers():
    response = supabase.table("organizers").select(
        "id, organizer_name, organization_type, country, focus_industries, verification_status, created_at"
    ).execute()
    return response.data


@router.get("/{organizer_id}")
def get_organizer(organizer_id: str):
    response = supabase.table("organizers").select("*").eq("id", organizer_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Organizer not found")
    return response.data[0]
