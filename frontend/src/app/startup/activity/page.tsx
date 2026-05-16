"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, MessageSquare, Target, GitMerge } from "lucide-react";

const activities = [
  { type: "milestone", title: "Completed Product Market Fit Validation", time: "2 days ago", icon: Target, color: "text-success" },
  { type: "session", title: "Architecture Review with Dr. Sarah Kim", time: "Last week", icon: MessageSquare, color: "text-primary" },
  { type: "match", title: "AI matched you with Vertex Capital", time: "2 weeks ago", icon: GitMerge, color: "text-primary" },
  { type: "update", title: "Updated MRR metrics to $45k", time: "3 weeks ago", icon: Activity, color: "text-muted" },
];

export default function StartupActivityPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Activity Log</h1>
        <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Recent timeline</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
        <div className="p-6 pt-0 space-y-6 relative before:absolute before:inset-y-0 before:left-8 before:w-px before:bg-border">
          {activities.map((activity, i) => (
            <div key={i} className="flex gap-4 relative z-10">
              <div className={`h-8 w-8 rounded-full bg-surface-container border border-border flex items-center justify-center shrink-0 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="pt-1.5">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-[10px] font-mono text-muted-light uppercase tracking-wider mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
