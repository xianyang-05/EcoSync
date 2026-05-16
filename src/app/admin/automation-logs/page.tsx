"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollText, Filter, Download, GitMerge, AlertTriangle, CheckCircle2, Sparkles, Zap, Settings } from "lucide-react";

const logs = [
  { type: "match", message: "AI generated 8 new startup-mentor matches", details: "Batch #4721 — avg score 89.3%", time: "15m ago", severity: "info" },
  { type: "alert", message: "3 relationships flagged for low engagement", details: "CloudPeak, UrbanFlow, DataForge — 30d inactive", time: "1h ago", severity: "warning" },
  { type: "success", message: "Programme Q4 Accelerator fully staffed", details: "24/24 startups, 8/8 mentors assigned", time: "3h ago", severity: "success" },
  { type: "ai", message: "AI model retrained on latest interaction data", details: "Model v4.2.1 — accuracy: 94.2% → 95.1%", time: "5h ago", severity: "info" },
  { type: "match", message: "Auto-approved 5 matches with >95% confidence", details: "Threshold rule #12 triggered", time: "6h ago", severity: "success" },
  { type: "system", message: "Scheduled maintenance completed", details: "Database optimization, index rebuild", time: "8h ago", severity: "info" },
  { type: "alert", message: "Resource allocation exceeded threshold", details: "AWS Credits: 87% consumed, 13 days remaining", time: "12h ago", severity: "warning" },
  { type: "ai", message: "New ecosystem cluster detected", details: "3 startups showing synergistic patterns in NLP domain", time: "1d ago", severity: "info" },
];

const iconMap = { match: GitMerge, alert: AlertTriangle, success: CheckCircle2, ai: Sparkles, system: Settings };
const colorMap = { info: "text-muted", warning: "text-warning", success: "text-success" };

export default function AutomationLogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Automation Logs</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">System operations and AI activity</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm"><Filter className="h-3.5 w-3.5" /> Filter</Button>
          <Button variant="secondary" size="sm"><Download className="h-3.5 w-3.5" /> Export</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-primary" /> Live Feed</CardTitle>
          <Badge variant="ai"><Sparkles className="h-2.5 w-2.5" /> Auto-Refreshing</Badge>
        </CardHeader>
        <div className="space-y-0">
          {logs.map((log, i) => {
            const Icon = iconMap[log.type as keyof typeof iconMap] || Settings;
            return (
              <div key={i} className="flex items-start gap-4 p-4 border-b border-border-light last:border-0 hover:bg-surface-container/50 transition-colors">
                <div className="rounded-md bg-surface-container border border-border p-2 mt-0.5 shrink-0">
                  <Icon className={`h-3.5 w-3.5 ${colorMap[log.severity as keyof typeof colorMap] || "text-muted"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{log.message}</p>
                  <p className="text-xs font-mono text-muted-light mt-0.5">{log.details}</p>
                </div>
                <span className="text-[10px] font-mono text-muted-light uppercase whitespace-nowrap shrink-0">{log.time}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
