import numpy as np
from database import supabase
import ast

async def get_top_semantic_matches(startup_embedding: list[float], limit: int = 5) -> list[dict]:
    """
    Fetches the most semantically similar mentors to the given startup embedding.
    First tries to use the Supabase `pgvector` stored procedure `match_mentors`.
    If the RPC method fails (e.g., procedure not yet defined), falls back to 
    computing cosine similarity locally using numpy on all mentors.
    
    Args:
        startup_embedding: A 384-dimensional vector representing the startup's needs.
        limit: The maximum number of mentors to return.
        
    Returns:
        List of dictionaries containing matched mentor data and their semantic_score.
    """
    try:
        # ATTEMPT 1: Supabase pgvector RPC (Requires `match_mentors` SQL function)
        # This function should use the <=> operator for exact cosine distance search inside Postgres.
        rpc_response = supabase.rpc(
            'match_mentors', 
            {'query_embedding': startup_embedding, 'match_count': limit}
        ).execute()

        if rpc_response.data:
            # Assuming the RPC returns records merged with a 'similarity' score
            matches = []
            for record in rpc_response.data:
                 matches.append({
                     "mentor_data": record,
                     "semantic_score": float(record.get('similarity', 0.0))
                 })
            return matches

    except Exception as e:
        print(f"RPC 'match_mentors' failed or Not Found, falling back to local Python calculation: {str(e)}")

    # ATTEMPT 2: Fallback Hackathon MVP mode - Fetch all and compute distance in python
    try:
        # Fetch all mentors and their embeddings
        response = supabase.table("mentors").select("*").execute()
        all_mentors = response.data

        if not all_mentors:
            return []

        scored_mentors = []
        # Convert python list to highly optimized numpy array
        query_vec = np.array(startup_embedding)
        
        for mentor in all_mentors:
            # Some pgvector/supabase clients return vectors as string representations "[0.1, 0.2...]"
            # So we parse it safely if it comes as a string.
            mentor_emb_raw = mentor.get('embedding')
            if not mentor_emb_raw:
                continue
                
            if isinstance(mentor_emb_raw, str):
                mentor_vec = np.array(ast.literal_eval(mentor_emb_raw))
            else:
                mentor_vec = np.array(mentor_emb_raw)
            
            # Compute Cosine Similarity
            # formula: dot(A,B) / (norm(A) * norm(B))
            # 1.0 means perfectly similar, 0.0 means orthogonal, -1.0 means opposite
            if np.linalg.norm(query_vec) == 0 or np.linalg.norm(mentor_vec) == 0:
                similarity = 0.0
            else:
                similarity = np.dot(query_vec, mentor_vec) / (np.linalg.norm(query_vec) * np.linalg.norm(mentor_vec))
            
            # Normalize to 0-1 scale safely handling slight floating point issues
            normalized_score = float(max(0.0, min(1.0, similarity)))
            
            scored_mentors.append({
                "mentor_data": mentor,
                "semantic_score": normalized_score
            })
            
        # Sort mentors descending order based on semantic_score
        scored_mentors.sort(key=lambda x: x["semantic_score"], reverse=True)
        
        # Return top N limit
        return scored_mentors[:limit]

    except Exception as e:
        print(f"Error determining semantic matches: {str(e)}")
        return []
