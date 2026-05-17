"""
② Semantic Mapping — services/embeddings.py

Generates 384-dimensional dense vectors using Google's text-embedding-004 model.
These embeddings are stored in Supabase (pgvector) for cosine similarity search.
"""

import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY is not set in the environment.")

genai.configure(api_key=gemini_api_key)


async def generate_embedding(text: str) -> list[float]:
    """
    Generate a 384-dimensional embedding vector using Google's text-embedding-004 model.
    
    Args:
        text: The input text to embed (profile text, expertise, needs, etc.)
    
    Returns:
        A list of 384 floats representing the semantic vector.
    """
    result = genai.embed_content(
        model="models/text-embedding-004",
        content=text,
        output_dimensionality=384
    )
    return result["embedding"]


async def embed_company_profile(company: dict) -> list[float]:
    """
    Build a composite text representation of a startup company and embed it.
    Combines key fields: industry, stage, needs, description, and problem statement.
    """
    parts = [
        f"Industry: {company.get('industry', 'Unknown')}",
        f"Stage: {company.get('business_stage', 'Unknown')}",
        f"Needs: {company.get('company_needs', '')}",
        f"Description: {company.get('description', '')}",
        f"Problem: {company.get('problem_statement', '')}",
        f"Solution: {company.get('solution_summary', '')}",
        f"Target Market: {company.get('target_market', '')}",
    ]
    composite_text = " | ".join(p for p in parts if p.split(": ", 1)[-1])
    return await generate_embedding(composite_text)


async def embed_mentor_profile(mentor: dict) -> list[float]:
    """
    Build a composite text representation of a mentor and embed it.
    Combines expertise, industries, mentoring topics, and bio.
    """
    parts = [
        f"Expertise: {mentor.get('expertise', '')}",
        f"Industries: {mentor.get('industries', '')}",
        f"Topics: {mentor.get('mentoring_topics', '')}",
        f"Stage Preference: {mentor.get('preferred_stage', '')}",
        f"Bio: {mentor.get('bio', '')}",
        f"Title: {mentor.get('job_title', '')} at {mentor.get('organization', '')}",
    ]
    composite_text = " | ".join(p for p in parts if p.split(": ", 1)[-1])
    return await generate_embedding(composite_text)


async def embed_knowledge_chunk(chunk_text: str) -> list[float]:
    """
    Embed a knowledge chunk for RAG retrieval.
    """
    return await generate_embedding(chunk_text)
