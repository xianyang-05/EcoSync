"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AIInsightPanel } from "@/components/ui/ai-insight-panel";
import { Brain, TrendingUp, Lightbulb, Target, Sparkles } from "lucide-react";

const insights = [
  {
    category: "Portfolio Trend",
    title: "Shift towards Edge AI",
    description: "3 of your 5 startups are currently shifting their architecture to support Edge AI deployments. Consider dedicating a group session to cover best practices.",
    icon: TrendingUp,
    impact: "High",
  },
  {
    category: "Knowledge Gap",
    title: "Series A Readiness",
    description: "DataForge and QuantumBridge both show weakness in their Go-to-Market models according to recent AI analysis of their pitch decks.",
    icon: Target,
    impact: "Medium",
  },
  {
    category: "Network Opportunity",
    title: "Cross-Pollination Potential",
    description: "NovaTech AI's recent breakthrough in NLP could solve a critical data structuring bottleneck for GreenLeaf IoT. Recommending a joint session.",
    icon: Lightbulb,
    impact: "High",
  },
];

export default function MentorInsightsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">AI Insights</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Intelligence synthesized from your portfolio</p>
        </div>
        <Badge variant="ai"><Sparkles className="h-2.5 w-2.5" /> Real-time Synthesis</Badge>
      </div>

      <AIInsightPanel
        title="Portfolio Health Summary"
        insight="Your portfolio is currently outperforming the ecosystem average by 14% in milestone completion. The primary area of concern across your startups is 'Go-to-Market Strategy' which accounts for 60% of delayed goals."
        confidence={95}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {insights.map((insight, i) => (
          <Card key={i} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="rounded-md bg-primary-subtle border border-primary-border/30 p-2">
                  <insight.icon className="h-4 w-4 text-primary" />
                </div>
                <Badge variant={insight.impact === "High" ? "success" : "warning"}>{insight.impact} Impact</Badge>
              </div>
              <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{insight.category}</p>
              <CardTitle className="text-base">{insight.title}</CardTitle>
            </CardHeader>
            <div className="p-4 pt-0 mt-auto">
              <p className="text-sm text-muted leading-relaxed">{insight.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
