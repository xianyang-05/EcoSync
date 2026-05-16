from vector_search import get_top_semantic_matches
from hybrid_ranker import hgt_graph_inference, calculate_hybrid_score
from explainability import generate_match_rationale
from rag_retriever import retrieve_ecosystem_context

async def run_matching_pipeline(startup_data: dict, startup_embedding: list[float]) -> dict:
    """
    The Master Orchestrator for the EcoSync AI Engine.
    Executes the full NLP matching, graph relationship simulation, hybrid math scoring, 
    and Gemini 1.5 Pro explainability synthesis.
    
    Args:
        startup_data: Dict of the startup. Must include keys like 'industry', 'business_stage', 'company_needs'.
        startup_embedding: Required 384-dimensional vector array.
        
    Returns:
        dict: The final best match mentor, including the semantic_score, hgt_score, final_score,
              and the Gemini-generated recommendation_reason.
    """
    
    # 1. Fetch the Top Semantic Matches using `pgvector` Cosine Distance
    semantic_matches = await get_top_semantic_matches(startup_embedding, limit=5)
    
    if not semantic_matches:
        return {"error": "No mentors available in the ecosystem."}
        
    final_candidates = []
    
    # 2. Iterate through matches and apply Graph Intelligence
    for match in semantic_matches:
        mentor_data = match["mentor_data"]
        semantic_score = match["semantic_score"]
        
        # Calculate Simulated Graph Score (HGT Node Interaction logic)
        hgt_score = mock_hgt_inference(startup_data, mentor_data)
        
        # Calculate Historic Base (Assume 0.8 as safe default for new mentors in MVP)
        historical_score = 0.8
        
        # 3. Calculate Final Engine Ranking Math
        final_score = calculate_hybrid_score(
            semantic_score=semantic_score,
            hgt_score=hgt_score,
            historical_score=historical_score
        )
        
        final_candidates.append({
            "mentor_id": str(mentor_data.get("id")),
            "mentor_data": mentor_data,
            "semantic_score": semantic_score,
            "hgt_score": hgt_score,
            "final_score": final_score
        })
        
    # 4. Sort the processed mentors by the `final_score` descendant
    final_candidates.sort(key=lambda x: x["final_score"], reverse=True)
    
    best_candidate = final_candidates[0]
    
    # 4.5 Fetch RAG context to ground the explainability evaluation
    ecosystem_context = await retrieve_ecosystem_context(startup_embedding)
    
    # 5. Connect the winning math back to human language (Explainability Engine)
    recommendation_reason = await generate_match_rationale(
        startup_data=startup_data,
        mentor_data=best_candidate["mentor_data"],
        hybrid_score=best_candidate["final_score"],
        retrieved_context=ecosystem_context
    )
    
    # 6. Package Data for FastAPI -> Supabase insertion
    return {
        "mentor_id": best_candidate["mentor_id"],
        "confidence_score": best_candidate["final_score"],
        "semantic_score": best_candidate["semantic_score"],
        "hgt_score": best_candidate["hgt_score"],
        "recommendation_reason": recommendation_reason,
        "retrieved_context": ecosystem_context
    }
