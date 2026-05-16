from __future__ import annotations
from sentence_transformers import SentenceTransformer

# Lazy singleton — loaded on first use, not at import time.
# This keeps FastAPI startup fast and avoids blocking the event loop.
_model: SentenceTransformer | None = None


def _get_model() -> SentenceTransformer:
    global _model
    if _model is None:
        _model = SentenceTransformer("all-MiniLM-L6-v2")
    return _model


def generate_embedding(text: str) -> list[float]:
    """Convert any text into a 384-dim float vector."""
    embedding = _get_model().encode(text)
    return embedding.tolist()


# ── Profile text builders ──────────────────────────────────────────────────────
# Combines structured profile fields into one searchable string.
# This text is what gets embedded and stored in the `embedding` column.
#
# Example output for a company:
#   Company Name: FinTech AI
#   Industry: FinTech
#   Stage: Seed
#   Description: AI fraud detection for banks
#   Needs: fundraising, compliance, mentor guidance

def build_company_profile_text(data: dict) -> str:
    parts = [
        f"Company Name: {data.get('company_name', '')}",
        f"Industry: {data.get('industry', '')}",
        f"Sub-Industry: {data.get('sub_industry', '')}",
        f"Stage: {data.get('business_stage', '')}",
        f"Country: {data.get('country', '')}",
        f"City: {data.get('city', '')}",
        f"Description: {data.get('description', '')}",
        f"Problem: {data.get('problem_statement', '')}",
        f"Solution: {data.get('solution_summary', '')}",
        f"Target Market: {data.get('target_market', '')}",
        f"Business Model: {data.get('business_model', '')}",
        f"Needs: {data.get('company_needs', '')}",
    ]
    # Drop lines whose value is empty (ends with ": ")
    return "\n".join(p for p in parts if not p.endswith(": "))


def build_mentor_profile_text(data: dict) -> str:
    parts = [
        f"Mentor Name: {data.get('mentor_name', '')}",
        f"Job Title: {data.get('job_title', '')}",
        f"Organization: {data.get('organization', '')}",
        f"Years of Experience: {data.get('years_experience', '')}",
        f"Expertise: {data.get('expertise', '')}",
        f"Industries: {data.get('industries', '')}",
        f"Mentoring Topics: {data.get('mentoring_topics', '')}",
        f"Preferred Stage: {data.get('preferred_stage', '')}",
        f"Country: {data.get('country', '')}",
        f"City: {data.get('city', '')}",
        f"Bio: {data.get('bio', '')}",
    ]
    return "\n".join(p for p in parts if not p.endswith(": "))


def build_organizer_profile_text(data: dict) -> str:
    parts = [
        f"Organizer Name: {data.get('organizer_name', '')}",
        f"Organization Type: {data.get('organization_type', '')}",
        f"Country: {data.get('country', '')}",
        f"City: {data.get('city', '')}",
        f"Description: {data.get('description', '')}",
        f"Focus Industries: {data.get('focus_industries', '')}",
        f"Programmes Managed: {data.get('programmes_managed', '')}",
    ]
    return "\n".join(p for p in parts if not p.endswith(": "))


def build_knowledge_chunk_profile_text(data: dict) -> str:
    """For knowledge chunks, the chunk_text itself IS the profile text."""
    return data.get("chunk_text", "")