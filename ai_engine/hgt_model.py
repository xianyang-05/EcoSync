import torch
import torch.nn as nn
import torch.nn.functional as F
from torch_geometric.nn import HGTConv, Linear

class LinkPredictionHGT(nn.Module):
    def __init__(self, in_channels: int, hidden_channels: int, metadata: tuple, num_heads: int = 2):
        """
        Heterogeneous Graph Transformer (HGT) for Ecosystem Link Prediction.
        
        Args:
            in_channels: The dimension of our text embeddings (384 from Vertex AI)
            hidden_channels: Lightweight hidden state dimension (e.g., 64) for CPU execution
            metadata: Tuple of (node_types, edge_types) from hetero_data.metadata()
            num_heads: Number of attention heads for the HGT layers
        """
        super().__init__()
        
        # 1. Linear projections mapping raw node embeddings to the hidden dimension
        # HGT requires node feature transformations prior to passing into the attention layer
        self.lin_dict = nn.ModuleDict()
        for node_type in metadata[0]:
            self.lin_dict[node_type] = Linear(in_channels, hidden_channels)
            
        # 2. HGT Convolutional Layer
        # Message passing over the heterogeneous structure based on node/edge relationships
        self.conv = HGTConv(hidden_channels, hidden_channels, metadata, num_heads)
        
        # 3. Classical Feed-Forward Link Predictor head
        # Concatenates output vectors of Company + Mentor, running it through an MLP
        self.predictor = nn.Sequential(
            nn.Linear(hidden_channels * 2, hidden_channels),
            nn.ReLU(),
            nn.Linear(hidden_channels, 1),
            nn.Sigmoid() # Squashes output into a 0.0 to 1.0 success probability score
        )
        
    def forward(self, x_dict: dict, edge_index_dict: dict, company_idx: int, mentor_idx: int) -> torch.Tensor:
        """
        Forward pass executing the projection, message passing, and classification.
        """
        # Step A: Project Node Attributes
        h_dict = {}
        for node_type, x in x_dict.items():
            h_dict[node_type] = F.relu(self.lin_dict[node_type](x))
            
        # Step B: Graph Message Passing
        # HGT naturally handles sparse structural connections and varying node types
        h_dict = self.conv(h_dict, edge_index_dict)
        
        # Step C: Edge Prediction
        # Retrieve the updated context-aware graph representations for the two specific nodes
        company_emb = h_dict['company'][company_idx]
        mentor_emb = h_dict['mentor'][mentor_idx]
        
        # Merge them
        combined_emb = torch.cat([company_emb, mentor_emb], dim=-1)
        
        # Final classification
        probability_tensor = self.predictor(combined_emb)
        return probability_tensor

def run_hgt_inference(model: LinkPredictionHGT, hetero_data, company_idx: int, mentor_idx: int) -> float:
    """
    Utility wrapper to run link prediction execution smoothly.
    Ensures gradients are detached for Hackathon MVP production inference mode.
    """
    model.eval()
    with torch.no_grad():
        # Execute the forward pass mapping the target nodes directly via graph structure
        prob = model(
            x_dict=hetero_data.x_dict, 
            edge_index_dict=hetero_data.edge_index_dict, 
            company_idx=company_idx, 
            mentor_idx=mentor_idx
        )
    return float(prob.item())
