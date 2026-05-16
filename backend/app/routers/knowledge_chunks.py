from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Literal

from app.database import supabase
from app.embedding_service import build_knowledge_chunk_profile_text, generate_embedding

router = APIRouter(prefix="/knowledge-chunks", tags=["Knowledge Chunks"])


class KnowledgeChunkCreate(BaseModel):
    source_type: Literal["company", "mentor", "organizer", "programme", "document", "relationship"]
    source_id: str
    chunk_text: str
    chunk_index: Optional[int] = 0


@router.post("/", status_code=201)
def create_knowledge_chunk(payload: KnowledgeChunkCreate):
    """
    Embedding pipeline:
      1. chunk_text IS the profile text
      2. Generate 384-dim vector
      3. Store into Supabase knowledge_chunks table
    """
    data = payload.model_dump()

    profile_text = build_knowledge_chunk_profile_text(data)
    embedding = generate_embedding(profile_text)

    response = supabase.table("knowledge_chunks").insert(
        {**data, "embedding": embedding}
    ).execute()

    if not response.data:
        raise HTTPException(status_code=500, detail="Insert failed")

    return {"message": "Knowledge chunk created", "data": response.data[0]}


@router.post("/batch", status_code=201)
def create_knowledge_chunks_batch(payloads: list[KnowledgeChunkCreate]):
    """Batch insert multiple chunks for a single source."""
    records = []
    for payload in payloads:
        data = payload.model_dump()
        embedding = generate_embedding(build_knowledge_chunk_profile_text(data))
        records.append({**data, "embedding": embedding})

    response = supabase.table("knowledge_chunks").insert(records).execute()
    if not response.data:
        raise HTTPException(status_code=500, detail="Batch insert failed")

    return {"message": f"{len(records)} chunks created", "data": response.data}


@router.get("/")
def list_knowledge_chunks(
    source_type: Optional[str] = None,
    source_id: Optional[str] = None,
):
    query = supabase.table("knowledge_chunks").select(
        "id, source_type, source_id, chunk_index, chunk_text, created_at"
    )
    if source_type:
        query = query.eq("source_type", source_type)
    if source_id:
        query = query.eq("source_id", source_id)
    return query.order("chunk_index").execute().data
