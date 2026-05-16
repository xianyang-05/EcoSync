"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Sparkles, Target, ArrowUpRight } from "lucide-react";
import { AIInsightPanel } from "@/components/ui/ai-insight-panel";

export default function StartupFundingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Funding Radar</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Capital readiness and investor matching</p>
        </div>
        <Button variant="primary" size="sm">Upload Pitch Deck</Button>
      </div>

      <AIInsightPanel
        title="Funding Readiness"
        insight="You are currently tracking towards a Series A raise in 6-8 months. Based on similar ecosystem startups, you need to increase MRR by 35% to reach the optimal valuation band."
        confidence={88}
        recommendations={[
          "Focus Q3 entirely on Go-to-Market execution",
          "Finalize Technical Architecture to prove scale to investors"
        ]}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-4 w-4 text-primary" /> Series A Targets</CardTitle></CardHeader>
          <div className="p-6 pt-0 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="text-muted">MRR Target ($100k)</span><span className="font-mono text-foreground">$45k</span></div>
              <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "45%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="text-muted">Enterprise Pilots</span><span className="font-mono text-foreground">2/5</span></div>
              <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-warning" style={{ width: "40%" }}></div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Investor Matches</CardTitle></CardHeader>
          <div className="space-y-3 px-6 pb-6">
             <div className="p-3 rounded-md border border-border bg-surface-container flex justify-between items-center">
                <div>
                  <Badge variant="ai" className="mb-1">92% Match</Badge>
                  <p className="text-sm font-medium text-foreground">Vertex Capital</p>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider">Enterprise AI Fund</p>
                </div>
                <Button variant="ghost" size="icon"><ArrowUpRight className="h-4 w-4 text-muted" /></Button>
             </div>
             <p className="text-xs text-muted-light text-center mt-2">More matches will unlock as you progress in the accelerator.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
