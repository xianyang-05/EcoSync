"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Search, ArrowUpRight, MessageSquare, Calendar, Target } from "lucide-react";

const myStartups = [
  { name: "NovaTech AI", domain: "AI / NLP", stage: "Series A", progress: 85, nextGoal: "Refine architecture for scalability", lastSession: "2 days ago", status: "Active" },
  { name: "DataForge", domain: "Data Analytics", stage: "Series A", progress: 70, nextGoal: "Finalize Go-to-Market Strategy", lastSession: "1 week ago", status: "Active" },
  { name: "BioSynth Labs", domain: "BioTech", stage: "Seed", progress: 45, nextGoal: "Complete clinical trial Phase 1 design", lastSession: "3 weeks ago", status: "Needs Attention" },
  { name: "QuantumBridge", domain: "Quantum Computing", stage: "Seed", progress: 90, nextGoal: "Secure lead investor for Series A", lastSession: "1 day ago", status: "Active" },
  { name: "GreenLeaf IoT", domain: "IoT / CleanTech", stage: "Seed", progress: 60, nextGoal: "Deploy pilot with first enterprise client", lastSession: "2 weeks ago", status: "Active" },
];

export default function MentorStartupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">My Startups</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Manage your active mentoring portfolio</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {myStartups.map((startup, i) => (
          <Card key={i} hover className={startup.status === "Needs Attention" ? "border-t-2 border-t-warning" : ""}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar name={startup.name} size="md" />
                <div>
                  <h4 className="text-base font-semibold text-foreground">{startup.name}</h4>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{startup.domain} · {startup.stage}</p>
                </div>
              </div>
              <Badge variant={startup.status === "Active" ? "success" : "warning"}>{startup.status}</Badge>
            </div>
            
            <ProgressBar value={startup.progress} label="Milestone Progress" showValue className="mb-4" color={startup.progress >= 80 ? "success" : startup.progress >= 50 ? "primary" : "warning"} />
            
            <div className="mb-4 space-y-2">
              <div className="flex gap-2">
                <Target className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider">Next Goal</p>
                  <p className="text-sm text-foreground">{startup.nextGoal}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider flex items-center gap-1"><Calendar className="h-3 w-3" /> Last: {startup.lastSession}</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon"><MessageSquare className="h-4 w-4" /></Button>
                <Button variant="secondary" size="sm">Details <ArrowUpRight className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
