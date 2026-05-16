import sys
import os

# Ensure the parent ai_engine directory is in path to import database
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import supabase

async def save_match_recommendation(company_id: str, mentor_id: str, ai_result_dict: dict) -> dict:
    """
    STAGES 7 & 8: Match Recommendation Storage
    Takes the pure AI dictionary output and persists it as a stateful proposal
    in the database for human review.
    
    Args:
        company_id: The UUID of the startup
        mentor_id: The UUID of the recommended mentor
        ai_result_dict: Dictionary returned from `run_matching_pipeline`
    """
    try:
        data = {
            "company_id": company_id,
            "mentor_id": mentor_id,
            "semantic_score": ai_result_dict.get("semantic_score"),
            # Map HGT score to ranking_score per schema requirements
            "ranking_score": ai_result_dict.get("hgt_score"),
            # Map final hybrid float to confidence_score
            "confidence_score": ai_result_dict.get("confidence_score"),
            "recommendation_reason": ai_result_dict.get("recommendation_reason"),
            "retrieved_context": ai_result_dict.get("retrieved_context"),
            "status": "pending"
        }
        
        response = supabase.table("match_recommendations").insert(data).execute()
        
        if not response.data:
            raise Exception("Supabase insert operation returned no data.")
            
        return response.data[0]
        
    except Exception as e:
        print(f"Database Error protecting match recommendation: {str(e)}")
        raise e

async def approve_match(match_id: str, admin_id: str) -> dict:
    """
    STAGE 9: Relationship State Machine
    Translates an admin-approved AI proposal into a materialized, tracked relationship.
    
    Args:
        match_id: The UUID mapping to the `match_recommendations` table
        admin_id: The UUID context of the Orchestrator approving the match
    """
    try:
        # 1. Fetch the pending AI match payload
        match_resp = supabase.table("match_recommendations").select("*").eq("id", match_id).execute()
        if not match_resp.data:
            raise Exception(f"AI recommendation record {match_id} not found.")
            
        match_data = match_resp.data[0]
        
        # 2. Update the original recommendation status
        supabase.table("match_recommendations").update({"status": "accepted"}).eq("id", match_id).execute()
        
        # 3. Forge the Active Relationship entity payload
        rel_data = {
            "company_id": match_data.get("company_id"),
            "mentor_id": match_data.get("mentor_id"),
            "relationship_type": "mentor_to_company",
            "match_score": match_data.get("semantic_score"),
            "confidence_score": match_data.get("confidence_score"),
            # Explanation receives the logic reasoning directly from AI Rationale Engine mapping
            "explanation": match_data.get("recommendation_reason"),
            "status": "active",
            "created_by": admin_id,
            "approved_by": admin_id
        }
        
        # 4. Insert the new active node connection
        rel_resp = supabase.table("relationships").insert(rel_data).execute()
        
        if not rel_resp.data:
            raise Exception("Failed to establish active relationship in database.")
            
        return rel_resp.data[0]
        
    except Exception as e:
        print(f"Database orchestration error during match approval: {str(e)}")
        raise e

async def submit_feedback(relationship_id: str, feedback_data: dict, user_id: str) -> dict:
    """
    STAGE 10: The Feedback Learning Loop
    Captures post-engagement endgame scores establishing the ground-truth intelligence dataset.
    
    *CRITICAL NOTE FOR HGT ML LIFECYCLE*: 
    This function sets the Relationship status to 'completed'. Our PyTorch `graph_builder.py` 
    sql pipeline actively hunts for edges marked as 'completed' with feedback mappings 
    to extract newly structured nodes for the next offline AI retraining epoch!
    
    Args:
        relationship_id: The UUID of the tracked connection
        feedback_data: Dict with 'rating', 'outcome_score', 'goal_completed', 'comments'
        user_id: The profile UUID submitting the scorecard
    """
    try:
        # 1. Insert the feedback matrix parameters establishing learning weight
        feed_data = {
            "relationship_id": relationship_id,
            "given_by": user_id,
            "rating": feedback_data.get("rating"),
            "outcome_score": feedback_data.get("outcome_score"),
            "goal_completed": feedback_data.get("goal_completed"),
            "comments": feedback_data.get("comments")
        }
        
        fb_resp = supabase.table("feedback").insert(feed_data).execute()
        
        # 2. Finalize the ecosystem connection lifecycle
        rel_resp = supabase.table("relationships").update({"status": "completed"}).eq("id", relationship_id).execute()
        
        return {
            "feedback_record": fb_resp.data[0] if fb_resp.data else None,
            "relationship_record": rel_resp.data[0] if rel_resp.data else None
        }
        
    except Exception as e:
        print(f"Database error executing loop feedback injection: {str(e)}")
        raise e
