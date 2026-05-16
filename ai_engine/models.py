from pydantic import BaseModel, ConfigDict
from typing import Optional
from uuid import UUID
from datetime import datetime

class CompanyModel(BaseModel):
    id: Optional[UUID] = None
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
    profile_text: Optional[str] = None
    verification_status: Optional[str] = "pending"
    # Embeddings are typically handled as lists of floats in Python if needed
    embedding: Optional[list[float]] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class MentorModel(BaseModel):
    id: Optional[UUID] = None
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
    profile_text: Optional[str] = None
    verification_status: Optional[str] = "pending"
    embedding: Optional[list[float]] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class MatchRecommendationModel(BaseModel):
    id: Optional[UUID] = None
    company_id: UUID
    mentor_id: UUID
    semantic_score: Optional[float] = None
    ranking_score: Optional[float] = None
    confidence_score: Optional[float] = None
    recommendation_reason: Optional[str] = None
    retrieved_context: Optional[str] = None
    status: Optional[str] = "pending"
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
