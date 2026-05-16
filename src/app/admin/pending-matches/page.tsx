"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MatchCard } from "@/components/ui/match-card";
import { AIInsightPanel } from "@/components/ui/ai-insight-panel";
import { GitMerge, Filter, Sparkles, CheckCircle2 } from "lucide-react";

const pendingMatches = [
  {
    startupName: "NovaTech AI", startupDomain: "AI / NLP", startupStage: "Series A",
    targetName: "Prof. Emily Zhang", targetRole: "NLP Research", matchScore: 95, status: "pending" as const,
    aiReasoning: "Leading researcher in attention mechanisms — directly relevant to NovaTech's core technology. Strong publication overlap with team's research interests.",
    factors: [{ label: "Technical", score: 97 }, { label: "Domain", score: 93 }, { label: "Stage Fit", score: 88 }],
  },
  {
    startupName: "GreenLeaf IoT", startupDomain: "IoT / CleanTech", startupStage: "Seed",
    targetName: "Mark Stevens", targetRole: "Enterprise Sales", matchScore: 89, status: "pending" as const,
    aiReasoning: "Scaled 2 IoT companies from Seed to Series B. Strong B2B channel experience in sustainability markets.",
    factors: [{ label: "Industry", score: 92 }, { label: "Stage", score: 90 }, { label: "Availability", score: 85 }],
  },
  {
    startupName: "DataForge", startupDomain: "Data Analytics", startupStage: "Series A",
    targetName: "Dr. Aris Thorne", targetRole: "AI Systems", matchScore: 98, status: "pending" as const,
    aiReasoning: "AI Systems architecture specialization. 98% match for cohort alpha. Exceptionally rare alignment in distributed data processing.",
    factors: [{ label: "Technical", score: 99 }, { label: "Domain", score: 96 }, { label: "Culture", score: 94 }],
  },
];

export default function PendingMatchesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Pending Matches</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">AI-generated matches awaiting approval</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm"><Filter className="h-3.5 w-3.5" /> Filter</Button>
          <Button variant="primary" size="sm"><CheckCircle2 className="h-3.5 w-3.5" /> Approve All &gt;90%</Button>
        </div>
      </div>

      <AIInsightPanel
        title="Match Intelligence"
        insight="3 high-priority matches detected. 2 matches exceed 90% confidence threshold and are recommended for immediate approval. Dr. Aris Thorne match (98%) represents an exceptionally rare alignment."
        confidence={96}
        compact
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pendingMatches.map((match, i) => (
          <MatchCard key={i} {...match} />
        ))}
      </div>
    </div>
  );
}
