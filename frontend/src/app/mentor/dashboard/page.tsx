"use client";

import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AIInsightPanel } from "@/components/ui/ai-insight-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Users, Calendar, Target, Brain, Star, Clock,
  ArrowUpRight, MessageSquare, Sparkles
} from "lucide-react";

const activeStartups = [
  { name: "NovaTech AI", domain: "AI / NLP", nextSession: "Tomorrow, 2pm", health: 92, status: "on-track" },
  { name: "DataForge", domain: "Data Analytics", nextSession: "Thu, 10am", health: 88, status: "on-track" },
  { name: "BioSynth Labs", domain: "BioTech", nextSession: "Next Week", health: 75, status: "needs-attention" },
];

const upcomingSessions = [
  { startup: "NovaTech AI", type: "Architecture Review", time: "Tomorrow, 2:00 PM", duration: "1h", action: "Prepare" },
  { startup: "DataForge", type: "Go-to-Market Strategy", time: "Thursday, 10:00 AM", duration: "45m", action: "Join" },
  { startup: "QuantumBridge", type: "Introductory Meeting", time: "Friday, 1:00 PM", duration: "30m", action: "Review Profile" },
];

export default function MentorDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Mentor Hub</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Overview of your mentoring activities</p>
        </div>
        <Button variant="primary" size="sm"><Calendar className="h-3.5 w-3.5" /> Manage Schedule</Button>
      </div>

      <AIInsightPanel
        title="Mentor Insights"
        insight="NovaTech AI has reached a critical milestone in their NLP model development. Review their latest architecture diagram before tomorrow's session. They are well-positioned for Series A if they improve their data pipeline."
        confidence={89}
      />

      <div className="grid grid-cols-4 gap-4">
        <MetricCard title="Active Startups" value="8" change="2 new this month" changeType="positive" icon={Users} />
        <MetricCard title="Upcoming Sessions" value="5" change="This week" changeType="neutral" icon={Calendar} />
        <MetricCard title="Avg Match Score" value="91%" change="Top 10% of Mentors" changeType="positive" icon={Target} />
        <MetricCard title="Mentoring Impact" value="High" change="4.9/5 rating" changeType="positive" icon={Star} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Startups</CardTitle>
            <Button variant="ghost" size="sm">View All <ArrowUpRight className="h-3 w-3" /></Button>
          </CardHeader>
          <div className="space-y-3">
            {activeStartups.map((startup, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-md border border-border hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar name={startup.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{startup.name}</p>
                    <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{startup.domain}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-foreground">{startup.nextSession}</p>
                    <p className="text-[10px] font-mono text-muted uppercase tracking-wider">Next Session</p>
                  </div>
                  <Badge variant={startup.status === "on-track" ? "success" : "warning"}>
                    {startup.status === "on-track" ? "On Track" : "Attention"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary" /> Upcoming Sessions</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {upcomingSessions.map((session, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-md border border-border bg-surface-container">
                <div className="rounded-md bg-background border border-border p-2 text-center min-w-[60px]">
                  <p className="text-sm font-bold text-foreground">{session.time.split(',')[1].trim().split(' ')[0]}</p>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{session.time.split(',')[1].trim().split(' ')[1]}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{session.startup}</p>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{session.type} · {session.duration}</p>
                </div>
                <Button variant={session.action === "Join" ? "primary" : "secondary"} size="sm">
                  {session.action}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
