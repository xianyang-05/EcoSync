"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { GraduationCap, Plus, ArrowUpRight, Calendar, Users, Building2 } from "lucide-react";

const programmes = [
  { name: "Q3 Deep Tech", status: "Active", progress: 85, startups: 24, mentors: 8, deadline: "Dec 2024", cohort: "Batch 7" },
  { name: "AI Founders", status: "Active", progress: 62, startups: 18, mentors: 6, deadline: "Jan 2025", cohort: "Batch 3" },
  { name: "AI Research Lab", status: "Active", progress: 94, startups: 12, mentors: 5, deadline: "Nov 2024", cohort: "Batch 1" },
  { name: "Green Innovation Sprint", status: "Planning", progress: 25, startups: 8, mentors: 3, deadline: "Feb 2025", cohort: "Batch 1" },
  { name: "FinTech Fellowship Q1", status: "Enrollment", progress: 40, startups: 0, mentors: 4, deadline: "Mar 2025", cohort: "Batch 1" },
];

export default function ProgrammesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Programmes</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Accelerator and incubator management</p>
        </div>
        <Button variant="primary" size="sm"><Plus className="h-3.5 w-3.5" /> New Programme</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {programmes.map((p, i) => (
          <Card key={i} hover className={i === 0 ? "border-t-2 border-t-primary" : ""}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold text-foreground">{p.name}</h4>
                <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{p.cohort}</p>
              </div>
              <Badge variant={p.status === "Active" ? "success" : p.status === "Enrollment" ? "default" : "secondary"}>
                {p.status}
              </Badge>
            </div>

            <ProgressBar value={p.progress} showValue className="mb-4" color={p.progress >= 80 ? "success" : p.progress >= 50 ? "primary" : "warning"} />

            <div className="flex items-center gap-4 text-xs text-muted mb-4">
              <span className="flex items-center gap-1 font-mono"><Building2 className="h-3 w-3" /> {p.startups}</span>
              <span className="flex items-center gap-1 font-mono"><Users className="h-3 w-3" /> {p.mentors}</span>
              <span className="flex items-center gap-1 font-mono"><Calendar className="h-3 w-3" /> {p.deadline}</span>
            </div>

            <Button variant="secondary" size="sm" className="w-full">
              Manage <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
