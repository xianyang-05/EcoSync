"use client";

import { MatchCard } from "@/components/ui/match-card";
import { AIInsightPanel } from "@/components/ui/ai-insight-panel";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight } from "lucide-react";

const recommendations = [
  {
    startupName: "NexusFlow", startupDomain: "Enterprise AI", startupStage: "Seed",
    targetName: "You", targetRole: "Mentor", matchScore: 94, status: "pending" as const,
    aiReasoning: "NexusFlow is building an AI orchestration layer similar to systems you designed previously. Your expertise in distributed AI systems is highly relevant for their upcoming Series A push.",
    factors: [{ label: "Technical Fit", score: 96 }, { label: "Experience", score: 92 }, { label: "Availability", score: 90 }],
  },
  {
    startupName: "OmniHealth", startupDomain: "HealthTech / ML", startupStage: "Series A",
    targetName: "You", targetRole: "Mentor", matchScore: 88, status: "pending" as const,
    aiReasoning: "While not your primary domain, your experience scaling data pipelines is exactly what OmniHealth needs to manage their newly acquired clinical datasets.",
    factors: [{ label: "Skill Gap Fill", score: 94 }, { label: "Growth Stage", score: 85 }, { label: "Domain", score: 78 }],
  },
];

export default function MentorRecommendationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">AI Recommendations</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Startups matched to your expertise</p>
        </div>
        <Badge variant="ai"><Sparkles className="h-2.5 w-2.5" /> Continuously Updated</Badge>
      </div>

      <AIInsightPanel
        title="Matching Analysis"
        insight="We've identified 2 new startups that align strongly with your background in scalable AI architecture. NexusFlow is a particularly strong match (94%) given your previous experience."
        confidence={92}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {recommendations.map((rec, i) => (
          <MatchCard key={i} {...rec} />
        ))}
      </div>
    </div>
  );
}
