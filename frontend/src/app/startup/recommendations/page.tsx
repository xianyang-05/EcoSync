"use client";

import { MatchCard } from "@/components/ui/match-card";
import { AIInsightPanel } from "@/components/ui/ai-insight-panel";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Filter } from "lucide-react";

const recommendations = [
  {
    startupName: "You", startupDomain: "AI / NLP", startupStage: "Series A",
    targetName: "Dr. Sarah Kim", targetRole: "Technical Mentor", matchScore: 96, status: "pending" as const,
    aiReasoning: "Dr. Kim has built and scaled 3 NLP-focused architectures and led engineering at leading AI firms. She matches your current critical milestone requirement (Architecture Refinement) perfectly.",
    factors: [{ label: "Technical Fit", score: 98 }, { label: "Experience", score: 95 }, { label: "Availability", score: 88 }],
  },
  {
    startupName: "You", startupDomain: "AI / NLP", startupStage: "Series A",
    targetName: "Vertex Capital", targetRole: "Series A Investor", matchScore: 92, status: "pending" as const,
    aiReasoning: "Vertex Capital recently announced a $50M fund specifically targeting Enterprise AI orchestration. Your metrics align with their typical entry requirements.",
    factors: [{ label: "Thesis Match", score: 96 }, { label: "Stage Fit", score: 90 }, { label: "Check Size", score: 89 }],
  },
];

export default function StartupRecommendationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">AI Recommendations</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Curated connections for growth</p>
        </div>
        <Badge variant="ai"><Sparkles className="h-2.5 w-2.5" /> Updated Daily</Badge>
      </div>

      <AIInsightPanel
        title="Matching Context"
        insight="Based on your progress towards 'Architecture Refinement', I am prioritizing technical mentors with scaling experience. I've also surfaced an investor match based on your recent MRR update."
        confidence={94}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {recommendations.map((rec, i) => (
          <MatchCard key={i} {...rec} />
        ))}
      </div>
    </div>
  );
}
