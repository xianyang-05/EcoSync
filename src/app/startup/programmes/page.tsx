"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { GraduationCap, ArrowUpRight, CheckCircle2, Calendar, LayoutList } from "lucide-react";

export default function StartupProgrammesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Programmes</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Active and recommended accelerators</p>
        </div>
      </div>

      <Card className="border-t-2 border-t-primary">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="success" className="mb-2">Currently Enrolled</Badge>
              <CardTitle className="text-xl">Q3 Deep Tech Accelerator</CardTitle>
              <p className="text-sm text-muted mt-1">An intensive 12-week program focused on scaling deep tech architecture and securing Series A funding.</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold font-mono text-foreground">Week 8</p>
              <p className="text-[10px] font-mono text-muted uppercase tracking-wider">of 12</p>
            </div>
          </div>
        </CardHeader>
        <div className="p-6 pt-0 space-y-6">
          <ProgressBar value={66} label="Programme Completion" showValue color="primary" />
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Completed Tasks</h4>
              <div className="p-3 rounded-md bg-surface-container border border-border text-sm text-muted">Initial Architecture Review</div>
              <div className="p-3 rounded-md bg-surface-container border border-border text-sm text-muted">Go-to-Market Outline</div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2"><LayoutList className="h-4 w-4 text-warning" /> Current Focus</h4>
              <div className="p-3 rounded-md bg-primary-subtle border border-primary-border/50 text-sm text-primary">Refine scalable data pipelines</div>
              <div className="p-3 rounded-md bg-surface-container border border-border text-sm text-muted">Draft initial pitch deck</div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Recommended For You</CardTitle></CardHeader>
          <div className="p-4 rounded-md border border-border bg-surface-container mx-6 mb-6">
            <Badge variant="ai" className="mb-2">91% Match</Badge>
            <h4 className="text-base font-semibold text-foreground mb-1">AI Founders Series A Prep</h4>
            <p className="text-sm text-muted mb-4">Starts in Jan 2025. Perfect follow-up to your current accelerator.</p>
            <Button variant="secondary" size="sm" className="w-full">View Details <ArrowUpRight className="h-3.5 w-3.5" /></Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
