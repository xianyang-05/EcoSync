import numpy as np
import ast
from database import supabase

async def retrieve_ecosystem_context(startup_embedding: list[float], limit: int = 3) -> str:
    """
    RAG Retrieval Layer: Fetches historical knowledge context that is semantically
    relevant to the startup's needs. This provides grounded, real-world ecosystem
    data to the Explainability Engine.
    
    Args:
        startup_embedding: The 384-dimensional vector of the startup's needs.
        limit: Number of knowledge chunks to retrieve.
        
    Returns:
        str: A concatenated string of the top retrieved context chunks.
    """
    try:
        # ATTEMPT 1: Supabase pgvector RPC
        rpc_response = supabase.rpc(
            'match_knowledge_chunks', 
            {'query_embedding': startup_embedding, 'match_count': limit}
        ).execute()

        if rpc_response.data:
            chunks = [record.get("chunk_text") for record in rpc_response.data if record.get("chunk_text")]
            if chunks:
                formatted_context = "\n".join([f"- {chunk}" for chunk in chunks])
                return f"Retrieved Ecosystem Context:\n{formatted_context}"

    except Exception as e:
        print(f"RPC 'match_knowledge_chunks' failed, falling back to local Python calculation: {str(e)}")

    # ATTEMPT 2: Fallback Hackathon MVP mode - Fetch all and calculate cosine similarity locally
    try:
        response = supabase.table("knowledge_chunks").select("chunk_text, embedding").execute()
        all_chunks = response.data

        if not all_chunks:
            return "No historical ecosystem context available at this time."

        scored_chunks = []
        query_vec = np.array(startup_embedding)
        
        for chunk in all_chunks:
            chunk_emb_raw = chunk.get('embedding')
            if not chunk_emb_raw:
                continue
                
            if isinstance(chunk_emb_raw, str):
                chunk_vec = np.array(ast.literal_eval(chunk_emb_raw))
            else:
                chunk_vec = np.array(chunk_emb_raw)
            
            # Compute Cosine Similarity
            if np.linalg.norm(query_vec) == 0 or np.linalg.norm(chunk_vec) == 0:
                similarity = 0.0
            else:
                similarity = np.dot(query_vec, chunk_vec) / (np.linalg.norm(query_vec) * np.linalg.norm(chunk_vec))
                
            scored_chunks.append({
                "chunk_text": chunk.get('chunk_text', ''),
                "score": similarity
            })
            
        # Sort descending by score
        scored_chunks.sort(key=lambda x: x["score"], reverse=True)
        top_chunks = scored_chunks[:limit]
        
        if top_chunks:
            formatted_context = "\n".join([f"- {chunk['chunk_text']}" for chunk in top_chunks])
            return f"Retrieved Ecosystem Context:\n{formatted_context}"
        else:
            return "No valid knowledge chunks found."

    except Exception as e:
        print(f"Error determining RAG context: {str(e)}")
        return "Ecosystem context retrieval failed."
