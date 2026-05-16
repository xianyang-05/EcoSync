"use client";

import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AIInsightPanel } from "@/components/ui/ai-insight-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Avatar } from "@/components/ui/avatar";
import {
  Rocket, Target, Users, Calendar, TrendingUp, Sparkles, AlertTriangle, ArrowUpRight
} from "lucide-react";

export default function StartupDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">NovaTech AI - Growth Assistant</p>
        </div>
        <Button variant="primary" size="sm">Update Progress</Button>
      </div>

      <AIInsightPanel
        title="Growth Coach"
        insight="You are 85% towards completing the 'Architecture Refinement' milestone. Based on your current trajectory, you should prepare your Series A pitch deck framework next week. I've found 3 potential mentors who specialize in Series A pitches for Enterprise AI."
        confidence={92}
        recommendations={[
          "Schedule final architecture review with Dr. Sarah Kim",
          "Begin drafting Series A pitch deck outline",
          "Review the 3 new mentor recommendations in your matching queue"
        ]}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Ecosystem Score" value="92/100" change="Top 5%" changeType="positive" icon={TrendingUp} />
        <MetricCard title="Next Milestone" value="85%" change="Due in 4 days" changeType="negative" icon={Target} />
        <MetricCard title="Active Mentors" value="3" change="2 sessions pending" changeType="neutral" icon={Users} />
        <MetricCard title="Programmes" value="1" change="Q3 Deep Tech" changeType="neutral" icon={Rocket} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Growth Pathway */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Growth Pathway</CardTitle>
            <p className="text-[10px] font-mono text-muted uppercase tracking-wider mt-0.5">Series A Readiness</p>
          </CardHeader>
          <div className="space-y-6">
            {[
              { title: "Product Market Fit Validation", status: "Completed", progress: 100 },
              { title: "Architecture Refinement", status: "In Progress", progress: 85 },
              { title: "Initial Revenue Traction ($10k MRR)", status: "At Risk", progress: 40 },
              { title: "Series A Pitch Deck", status: "Pending", progress: 0 },
            ].map((goal, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{goal.title}</span>
                  <Badge variant={goal.status === "Completed" ? "success" : goal.status === "In Progress" ? "default" : goal.status === "At Risk" ? "danger" : "secondary"}>
                    {goal.status}
                  </Badge>
                </div>
                <ProgressBar value={goal.progress} color={goal.progress === 100 ? "success" : goal.progress >= 50 ? "primary" : goal.progress > 0 ? "warning" : "primary"} />
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Upcoming</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            <div className="p-3 rounded-md border border-border bg-surface-container">
              <div className="flex items-center gap-3 mb-2">
                <Avatar name="Dr. Sarah Kim" size="sm" />
                <div>
                  <p className="text-sm font-medium text-foreground">Dr. Sarah Kim</p>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider">Architecture Review</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs">
                <span className="text-foreground">Tomorrow, 2:00 PM</span>
                <span className="text-muted-light font-mono">1h</span>
              </div>
            </div>

            <div className="p-3 rounded-md border border-border bg-surface-container">
               <div className="flex items-center gap-2 mb-2">
                 <AlertTriangle className="h-4 w-4 text-warning" />
                 <p className="text-sm font-medium text-foreground">Update Metrics</p>
               </div>
               <p className="text-xs text-muted mb-3">Monthly MRR update is required for the Q3 Deep Tech programme reporting.</p>
               <Button variant="secondary" size="sm" className="w-full">Submit Data <ArrowUpRight className="h-3 w-3" /></Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
