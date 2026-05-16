from hgt_model import run_hgt_inference

def hgt_graph_inference(model, hetero_data, company_idx: int, mentor_idx: int) -> float:
    """
    Executes real inference on the PyTorch Heterogeneous Graph Transformer.
    Replaces the previous mock logic by utilizing the structural intelligence
    of the ecosystem graph to predict relationship success.
    
    Args:
        model: Initialized LinkPredictionHGT module
        hetero_data: The PyTorch Geometric HeteroData graph object
        company_idx: integer index of the startup/company in the graph
        mentor_idx: integer index of the mentor candidate in the graph
        
    Returns:
        float: A prediction probability (0.0 to 1.0) defining how likely 
               this relationship will result in a successful outcome structurally.
    """
    # Route directly to the HGT model's isolated evaluation wrapper
    return run_hgt_inference(model, hetero_data, company_idx, mentor_idx)

def calculate_hybrid_score(semantic_score: float, hgt_score: float, historical_score: float = 0.8) -> float:
    """
    The Mathematical Core of the Hybrid Scoring Engine.
    Combines disparate AI analysis layers into a single cohesive ranking metric.
    
    Weights Breakdown (Subject to Tuning post-hackathon):
    - 30% Semantic Embeddings (Vector distance of textual needs vs expertise)
    - 40% Graph Model (HGT structural relationship probability)
    - 30% Historical Reputation (Past success loops from the feedback table)
    
    Args:
        semantic_score (float): Score (0-1) from the pgvector/Google Vertex model
        hgt_score (float): Score (0-1) from the Graph intelligence inference
        historical_score (float): Default 0.8. Represents the mentor's reputation multiplier.
        
    Returns:
        float: The final unified ranking score
    """
    # Defensive programming: ensure inputs are handled safely
    semantic = max(0.0, min(1.0, float(semantic_score or 0.0)))
    hgt = max(0.0, min(1.0, float(hgt_score or 0.0)))
    historical = max(0.0, min(1.0, float(historical_score or 0.0)))
    
    # Calculate weighted linear combination
    final_score = (0.3 * semantic) + (0.4 * hgt) + (0.3 * historical)
    
    return final_score
