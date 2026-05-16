"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/ui/metric-card";
import { BarChart3, TrendingUp, Users, Building2, GitMerge, Target, Calendar } from "lucide-react";

const monthlyData = [
  { month: "Jun", matches: 45, approvals: 38 },
  { month: "Jul", matches: 52, approvals: 44 },
  { month: "Aug", matches: 48, approvals: 41 },
  { month: "Sep", matches: 63, approvals: 55 },
  { month: "Oct", matches: 71, approvals: 62 },
  { month: "Nov", matches: 78, approvals: 68 },
];

const domainData = [
  { domain: "AI / ML", count: 68, percentage: 27 },
  { domain: "FinTech", count: 45, percentage: 18 },
  { domain: "HealthTech", count: 38, percentage: 15 },
  { domain: "CleanTech", count: 32, percentage: 13 },
  { domain: "SaaS", count: 28, percentage: 11 },
  { domain: "Other", count: 37, percentage: 16 },
];

export default function AnalyticsPage() {
  const maxMatches = Math.max(...monthlyData.map((d) => d.matches));

  return (
    <div className="space-y-6">
      {/* Sticky Page Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md -mx-6 px-6 pt-6 pb-4 mb-6 -mt-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Analytics</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Ecosystem performance metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <MetricCard title="Total Matches" value="357" change="↑ 23%" changeType="positive" icon={GitMerge} />
        <MetricCard title="Avg Score" value="86.4" change="↑ 3.1" changeType="positive" icon={Target} />
        <MetricCard title="Active Entities" value="337" change="↑ 30" changeType="positive" icon={Users} />
        <MetricCard title="Engagement" value="78%" change="↑ 5%" changeType="positive" icon={TrendingUp} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Match Trends (6 Months)</CardTitle></CardHeader>
          <div className="flex items-end gap-3 h-48 px-2">
            {monthlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center gap-1" style={{ height: "160px" }}>
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    <div className="w-3 bg-primary transition-all duration-500" style={{ height: `${(d.matches / maxMatches) * 100}%` }} />
                    <div className="w-3 bg-primary/30 transition-all duration-500" style={{ height: `${(d.approvals / maxMatches) * 100}%` }} />
                  </div>
                </div>
                <span className="text-[10px] font-mono text-muted uppercase">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
            <div className="flex items-center gap-2"><div className="h-2 w-2 bg-primary" /><span className="text-[10px] font-mono text-muted uppercase tracking-wider">Matches</span></div>
            <div className="flex items-center gap-2"><div className="h-2 w-2 bg-primary/30" /><span className="text-[10px] font-mono text-muted uppercase tracking-wider">Approvals</span></div>
          </div>
        </Card>

        <Card>
          <CardHeader><CardTitle>Domain Distribution</CardTitle></CardHeader>
          <div className="space-y-3">
            {domainData.map((d, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-foreground w-24 truncate">{d.domain}</span>
                <div className="flex-1 h-1 bg-border overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${d.percentage}%` }} />
                </div>
                <span className="text-xs font-mono text-muted w-12 text-right">{d.count}</span>
                <span className="text-xs font-mono text-muted-light w-8 text-right">{d.percentage}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
