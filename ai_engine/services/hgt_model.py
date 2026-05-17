"""
③ Graph Intelligence — services/hgt_model.py

Defines the Heterogeneous Graph Transformer (HGT) model for link prediction.
Uses PyTorch Geometric to predict match success probability between
startup-mentor pairs via graph-based structural signals.
"""

import torch
import torch.nn as nn

try:
    from torch_geometric.nn import HGTConv, Linear
    HAS_PYG = True
except ImportError:
    HAS_PYG = False


class HGTLinkPredictor(nn.Module):
    """
    Heterogeneous Graph Transformer for startup-mentor link prediction.
    
    Node types: 'company', 'mentor', 'programme'
    Edge types: ('company', 'matched_with', 'mentor'),
                ('company', 'enrolled_in', 'programme'),
                ('mentor', 'advises', 'programme')
    
    The model learns node representations through message passing on the
    heterogeneous graph, then predicts link probability between a company
    node and a mentor node using a dot-product decoder.
    """

    def __init__(self, hidden_channels=64, num_heads=2, num_layers=2):
        super().__init__()
        self.hidden_channels = hidden_channels

        if not HAS_PYG:
            # Fallback: simple linear projection when PyG is not available
            self.company_proj = nn.Linear(384, hidden_channels)
            self.mentor_proj = nn.Linear(384, hidden_channels)
            self.output = nn.Linear(hidden_channels * 2, 1)
            self.use_hgt = False
            return

        self.use_hgt = True
        metadata = (
            ["company", "mentor", "programme"],
            [
                ("company", "matched_with", "mentor"),
                ("mentor", "matched_with", "company"),
                ("company", "enrolled_in", "programme"),
                ("programme", "enrolled_in", "company"),
                ("mentor", "advises", "programme"),
                ("programme", "advises", "mentor"),
            ],
        )

        # Input projection per node type (384d embedding → hidden_channels)
        self.lin_dict = nn.ModuleDict()
        for node_type in metadata[0]:
            self.lin_dict[node_type] = Linear(384, hidden_channels)

        # HGT convolution layers
        self.convs = nn.ModuleList()
        for _ in range(num_layers):
            self.convs.append(
                HGTConv(hidden_channels, hidden_channels, metadata, num_heads)
            )

        # Decoder: dot product + sigmoid for link probability
        self.output = nn.Linear(hidden_channels * 2, 1)

    def forward(self, x_dict, edge_index_dict, company_idx, mentor_idx):
        """
        Forward pass for link prediction.
        
        Args:
            x_dict: Dict of node features {node_type: Tensor[N, 384]}
            edge_index_dict: Dict of edge indices {edge_type: Tensor[2, E]}
            company_idx: Index of the query company node
            mentor_idx: Index of the query mentor node
        
        Returns:
            Probability (0-1) of a successful match between the pair.
        """
        if self.use_hgt:
            # Project input features
            h_dict = {
                node_type: self.lin_dict[node_type](x)
                for node_type, x in x_dict.items()
            }
            # Message passing through HGT layers
            for conv in self.convs:
                h_dict = conv(h_dict, edge_index_dict)
        else:
            h_dict = {
                "company": self.company_proj(x_dict["company"]),
                "mentor": self.mentor_proj(x_dict["mentor"]),
            }

        # Extract embeddings for the query pair
        company_emb = h_dict["company"][company_idx]
        mentor_emb = h_dict["mentor"][mentor_idx]

        # Concatenate and predict
        combined = torch.cat([company_emb, mentor_emb], dim=-1)
        score = torch.sigmoid(self.output(combined))
        return score.item()


def predict_link_score(
    model: HGTLinkPredictor,
    x_dict: dict[str, torch.Tensor],
    edge_index_dict: dict[tuple, torch.Tensor],
    company_idx: int,
    mentor_idx: int,
) -> float:
    """
    Run inference with torch.no_grad() to predict match success probability.
    
    Returns:
        A float between 0 and 1 representing the predicted success probability.
    """
    model.eval()
    with torch.no_grad():
        score = model(x_dict, edge_index_dict, company_idx, mentor_idx)
    return score
