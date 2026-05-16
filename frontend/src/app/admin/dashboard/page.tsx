"use client";

import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AIInsightPanel } from "@/components/ui/ai-insight-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Avatar } from "@/components/ui/avatar";
import {
  Building2, Users, GitMerge, TrendingUp, Activity, Target,
  Sparkles, ArrowUpRight, Clock, CheckCircle2, AlertTriangle,
  BarChart3, Zap, Network, GraduationCap
} from "lucide-react";

const recentMatches = [
  { startup: "NovaTech AI", mentor: "Dr. Sarah Kim", score: 94, status: "approved" as const, time: "2h ago" },
  { startup: "GreenLeaf IoT", mentor: "James Wilson", score: 87, status: "pending" as const, time: "4h ago" },
  { startup: "DataForge", mentor: "Priya Sharma", score: 91, status: "approved" as const, time: "6h ago" },
  { startup: "CloudPeak", mentor: "Michael Torres", score: 78, status: "pending" as const, time: "8h ago" },
  { startup: "BioSynth", mentor: "Dr. Lisa Park", score: 82, status: "rejected" as const, time: "12h ago" },
];

const automationEvents = [
  { type: "match", message: "AI generated 8 new startup-mentor matches", time: "15m ago", icon: GitMerge },
  { type: "alert", message: "3 relationships flagged for low engagement", time: "1h ago", icon: AlertTriangle },
  { type: "success", message: "Programme Q4 Accelerator fully staffed", time: "3h ago", icon: CheckCircle2 },
  { type: "insight", message: "Ecosystem growth rate increased by 12%", time: "5h ago", icon: TrendingUp },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Live metrics and automated matching controls</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <BarChart3 className="h-3.5 w-3.5" />
            Export Report
          </Button>
          <Button variant="ai" size="sm">
            <Sparkles className="h-3.5 w-3.5" />
            Run AI Analysis
          </Button>
        </div>
      </div>

      {/* AI Insight */}
      <AIInsightPanel
        title="System Insights"
        insight="Unusually high interaction rate between ecosystem entities. 23 new startups onboarded this month (↑40%). AI has identified 12 high-potential matches awaiting approval with an average compatibility score of 89%."
        confidence={94}
        recommendations={[
          "Approve the 5 matches with >90% compatibility to accelerate Q4 programme enrollment",
          "Schedule mentor onboarding for the 3 new industry experts in FinTech vertical",
          "Resource 'AWS Credits' depletion accelerating. Recommend triggering tier 2 top-up protocols within 48h",
        ]}
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Startups" value="248" change="↑ 23" changeType="positive" description="this month" icon={Building2} />
        <MetricCard title="Active Mentors" value="89" change="↑ 7" changeType="positive" description="this month" icon={Users} />
        <MetricCard title="Pending Matches" value="12" change="5 critical" changeType="negative" description="need review" icon={GitMerge} />
        <MetricCard title="Match Accuracy" value="94.2%" change="↑ 2.1%" changeType="positive" description="vs last quarter" icon={Target} />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Matches - 2 columns */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>AI Recommended Matches</CardTitle>
              <p className="text-[10px] font-mono text-muted uppercase tracking-wider mt-0.5">Latest AI-generated relationships</p>
            </div>
            <Button variant="ghost" size="sm">
              View All <ArrowUpRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <div className="space-y-2">
            {recentMatches.map((match, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-md border border-border hover:bg-surface-container transition-colors"
              >
                <Avatar name={match.startup} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{match.startup}</span>
                    <span className="text-xs text-muted-light">→</span>
                    <span className="text-sm text-muted">{match.mentor}</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-light uppercase">{match.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-foreground">{match.score}%</span>
                    <p className="text-[10px] font-mono text-muted-light">match</p>
                  </div>
                  <Badge
                    variant={
                      match.status === "approved" ? "success" : match.status === "pending" ? "warning" : "danger"
                    }
                  >
                    {match.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Automation Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-primary" />
              Pending Queue
            </CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {automationEvents.map((event, i) => (
              <div key={i} className="flex gap-3">
                <div className="rounded-md bg-surface-container p-1.5 h-fit border border-border">
                  <event.icon className="h-3.5 w-3.5 text-muted" />
                </div>
                <div>
                  <p className="text-xs text-foreground leading-relaxed">{event.message}</p>
                  <span className="text-[10px] font-mono text-muted-light uppercase">{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Programme Health */}
        <Card>
          <CardHeader>
            <CardTitle>Active Programmes</CardTitle>
            <Badge variant="ai">
              <Sparkles className="h-2.5 w-2.5" />
              AI Monitored
            </Badge>
          </CardHeader>
          <div className="space-y-4">
            {[
              { name: "Q3 Deep Tech", progress: 85, status: "On Track" },
              { name: "AI Founders", progress: 62, status: "Needs Attention" },
              { name: "AI Research Lab", progress: 94, status: "Ahead" },
              { name: "Green Innovation", progress: 45, status: "At Risk" },
            ].map((prog, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{prog.name}</span>
                  <Badge variant={prog.progress >= 80 ? "success" : prog.progress >= 60 ? "warning" : "danger"}>
                    {prog.status}
                  </Badge>
                </div>
                <ProgressBar
                  value={prog.progress}
                  color={prog.progress >= 80 ? "success" : prog.progress >= 60 ? "warning" : "danger"}
                  showValue
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Network Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-3.5 w-3.5 text-primary" />
              Network Health Velocity
            </CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Active Relationships", value: "1,247", icon: Activity },
              { label: "AI Matches (30d)", value: "156", icon: GitMerge },
              { label: "Approval Rate", value: "87%", icon: CheckCircle2 },
              { label: "Avg. Match Score", value: "86.4", icon: Target },
              { label: "Programmes Active", value: "14", icon: GraduationCap },
              { label: "Investor Interest", value: "↑ 34%", icon: TrendingUp },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-md border border-border bg-surface-container p-3 hover:bg-surface-container-high transition-colors"
              >
                <stat.icon className="h-4 w-4 text-primary mb-2" />
                <p className="text-lg font-bold font-mono text-foreground">{stat.value}</p>
                <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
