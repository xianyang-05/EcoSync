import asyncio
from graph_builder import fetch_company_nodes, fetch_mentor_nodes, fetch_historical_edges, build_ecosystem_graph
from hgt_model import LinkPredictionHGT, run_hgt_inference

async def run_diagnostics():
    print("=== INITIATING PYTORCH DIAGNOSTICS ===")
    
    # 1. Test Database Fetching
    print("\n1. Fetching Database Nodes & Edges...")
    companies = await fetch_company_nodes()
    mentors = await fetch_mentor_nodes()
    edges = await fetch_historical_edges()
    print(f"✅ Found {len(companies)} Companies, {len(mentors)} Mentors, and {len(edges)} Historical Edges.")

    # 2. Test Graph Construction
    print("\n2. Building HeteroData Tensor Graph...")
    hetero_data, company_map, mentor_map = build_ecosystem_graph(companies, mentors, edges)
    print("✅ Graph Constructed Successfully.")
    print("\n--- GRAPH TENSOR INSPECTION ---")
    print(hetero_data)
    print("--------------------------------")

    # 3. Test HGT Model Initialization & Inference
    print("\n3. Testing HGT Neural Network...")
    try:
        # Initialize the model with the metadata from our graph
        model = LinkPredictionHGT(hidden_channels=64, out_channels=1, metadata=hetero_data.metadata())
        
        # Test a mock prediction between the first company and first mentor
        test_company_idx = 0
        test_mentor_idx = 0
        
        score = run_hgt_inference(model, hetero_data, test_company_idx, test_mentor_idx)
        print(f"✅ HGT Inference Successful! Output Score: {score:.4f}")
        
    except Exception as e:
        print(f"❌ PyTorch Error: {e}")

if __name__ == "__main__":
    asyncio.run(run_diagnostics())