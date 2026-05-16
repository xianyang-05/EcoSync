import torch
from torch_geometric.data import HeteroData
import pandas as pd
import numpy as np
import ast
from database import supabase

async def fetch_company_nodes() -> list[dict]:
    """
    Fetches all company nodes from the database.
    Returns:
        List of dictionaries containing company data.
    """
    try:
        response = supabase.table("companies").select("id, business_stage, industry, embedding").execute()
        return response.data or []
    except Exception as e:
        print(f"Failed to fetch companies: {e}")
        return []

async def fetch_mentor_nodes() -> list[dict]:
    """
    Fetches all mentor nodes from the database.
    Returns:
        List of dictionaries containing mentor data.
    """
    try:
        response = supabase.table("mentors").select("id, expertise, preferred_stage, embedding").execute()
        return response.data or []
    except Exception as e:
        print(f"Failed to fetch mentors: {e}")
        return []

async def fetch_historical_edges() -> pd.DataFrame:
    """
    Fetches relationships and corresponding feedback to form historical edges.
    Performs a local Pandas join as a resilient Hackathon MVP approach if the RPC isn't available.
    
    Returns:
        pd.DataFrame: Merged dataframe containing edge data between companies and mentors.
    """
    try:
        # Fetch completed relationships
        rel_response = supabase.table("relationships").select(
            "id, company_id, mentor_id, relationship_type"
        ).eq("status", "completed").execute()
        
        rel_data = rel_response.data or []
        if not rel_data:
            return pd.DataFrame(columns=["company_id", "mentor_id", "rating", "outcome_score", "goal_completed"])
            
        df_rel = pd.DataFrame(rel_data)
        
        # Fetch feedback tied to these relationships
        feed_response = supabase.table("feedback").select(
            "relationship_id, rating, outcome_score, goal_completed"
        ).execute()
        
        df_feed = pd.DataFrame(feed_response.data or [])
        
        if df_feed.empty:
            # If no feedback exists yet, mock default neutral features for the edges
            df_rel["rating"] = 3.0
            df_rel["outcome_score"] = 0.5
            df_rel["goal_completed"] = False
            return df_rel
            
        # Left join feedback onto relationships
        df_merged = pd.merge(
            df_rel, 
            df_feed, 
            left_on="id", 
            right_on="relationship_id", 
            how="left"
        )
        
        return df_merged
        
    except Exception as e:
        print(f"Failed to fetch edges: {e}")
        return pd.DataFrame(columns=["company_id", "mentor_id", "rating", "outcome_score", "goal_completed"])

def parse_embedding(emb_val) -> list[float]:
    """Helper to safely parse pgvector stored embeddings back to float lists."""
    if not emb_val:
        return [0.0] * 384  # Default 384 dim matching the Vertex schema
    if isinstance(emb_val, str):
        return ast.literal_eval(emb_val)
    return emb_val

def build_ecosystem_graph(companies: list[dict], mentors: list[dict], df_edges: pd.DataFrame) -> tuple[HeteroData, dict, dict]:
    """
    Converts relational UUID-based database records into a PyTorch Geometric mathematical graph.
    
    Args:
        companies: List of company dictionaries.
        mentors: List of mentor dictionaries.
        df_edges: Pandas DataFrame containing historical edge connections.
        
    Returns:
        tuple containing:
        - data (HeteroData): The constructed PyTorch geometric graph object.
        - company_id_to_idx (dict): Mapping from Company UUID string to PyTorch integer index.
        - mentor_id_to_idx (dict): Mapping from Mentor UUID string to PyTorch integer index.
    """
    data = HeteroData()
    
    # ---------------------------------------------------------
    # 1. NODE TENSORS (x) & ID MAPPINGS
    # ---------------------------------------------------------
    
    company_id_to_idx = {}
    company_embeddings = []
    
    for idx, c in enumerate(companies):
        company_id_to_idx[str(c["id"])] = idx
        emb = parse_embedding(c.get("embedding"))
        company_embeddings.append(emb)
        
    mentor_id_to_idx = {}
    mentor_embeddings = []
    
    for idx, m in enumerate(mentors):
        mentor_id_to_idx[str(m["id"])] = idx
        emb = parse_embedding(m.get("embedding"))
        mentor_embeddings.append(emb)
        
    # Convert lists to PyTorch Tensors
    # Shape: [num_companies, embedding_dim]
    data['company'].x = torch.tensor(company_embeddings, dtype=torch.float)
    # Shape: [num_mentors, embedding_dim]
    data['mentor'].x = torch.tensor(mentor_embeddings, dtype=torch.float)
    
    # ---------------------------------------------------------
    # 2. EDGE INDICES (edge_index)
    # ---------------------------------------------------------
    
    if df_edges.empty:
        # Create an empty graph structure if no edges exist yet
        data['company', 'mentored_by', 'mentor'].edge_index = torch.empty((2, 0), dtype=torch.long)
        data['company', 'mentored_by', 'mentor'].edge_attr = torch.empty((0, 3), dtype=torch.float)
        return data, company_id_to_idx, mentor_id_to_idx

    source_indices = []
    target_indices = []
    edge_features = []
    
    for _, row in df_edges.iterrows():
        c_id = str(row.get("company_id"))
        m_id = str(row.get("mentor_id"))
        
        # Only build edge if both nodes actually exist in our mapping
        if c_id in company_id_to_idx and m_id in mentor_id_to_idx:
            source_indices.append(company_id_to_idx[c_id])
            target_indices.append(mentor_id_to_idx[m_id])
            
            # ---------------------------------------------------------
            # 3. EDGE FEATURES (edge_attr)
            # ---------------------------------------------------------
            # Hackathon Fallback: Fill NA with neutral values
            rating = float(row.get("rating")) if not pd.isna(row.get("rating")) else 3.0
            outcome = float(row.get("outcome_score")) if not pd.isna(row.get("outcome_score")) else 0.5
            
            # Convert boolean goal_completed to 1.0/0.0
            goal_raw = row.get("goal_completed")
            if pd.isna(goal_raw):
                goal = 0.5  # Neutral prediction
            else:
                goal = 1.0 if goal_raw else 0.0
                
            edge_features.append([rating, outcome, goal])
            
    # Form the edge_index tensor. Shape must be [2, num_edges]
    # Row 0: source nodes (companies), Row 1: target nodes (mentors)
    edge_index_tensor = torch.tensor([source_indices, target_indices], dtype=torch.long)
    data['company', 'mentored_by', 'mentor'].edge_index = edge_index_tensor
    
    # Form the edge_attr tensor. Shape must be [num_edges, num_features]
    edge_attr_tensor = torch.tensor(edge_features, dtype=torch.float)
    data['company', 'mentored_by', 'mentor'].edge_attr = edge_attr_tensor

    # Add reverse edges so both 'company' and 'mentor' appear as target nodes
    # This prevents HGTConv from dropping 'company' out of the graph state forward pass!
    rev_edge_index = torch.tensor([target_indices, source_indices], dtype=torch.long)
    data['mentor', 'mentors', 'company'].edge_index = rev_edge_index
    data['mentor', 'mentors', 'company'].edge_attr = edge_attr_tensor
    
    return data, company_id_to_idx, mentor_id_to_idx
