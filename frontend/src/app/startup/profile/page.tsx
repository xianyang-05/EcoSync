"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { UserCircle, Building2, Globe, Mail, Link as LinkIcon, Edit3 } from "lucide-react";

export default function StartupProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Company Profile</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Manage your public ecosystem presence</p>
        </div>
        <Button variant="secondary" size="sm"><Edit3 className="h-3.5 w-3.5" /> Edit Profile</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border-t-2 border-t-primary">
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-xl bg-primary-subtle border border-primary-border flex items-center justify-center mb-4">
              <span className="text-2xl font-bold font-mono text-primary">NT</span>
            </div>
            <h2 className="text-xl font-bold text-foreground">NovaTech AI</h2>
            <p className="text-sm text-muted mt-1">Enterprise AI orchestration and automation layer.</p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <Badge variant="outline">AI / NLP</Badge>
              <Badge variant="outline">B2B SaaS</Badge>
              <Badge variant="outline">Series A</Badge>
            </div>

            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted">
                <Globe className="h-4 w-4" /> <a href="#" className="hover:text-primary transition-colors">novatech.ai</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <Mail className="h-4 w-4" /> contact@novatech.ai
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <Building2 className="h-4 w-4" /> San Francisco, CA
              </div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Profile Completeness</CardTitle></CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <ProgressBar value={85} color="success" />
              </div>
              <span className="text-sm font-bold font-mono text-success">85%</span>
            </div>
            <p className="text-xs text-muted mt-3">Add your 'Pitch Deck' and 'Key Team Members' to reach 100% and improve AI matching visibility.</p>
          </Card>

          <Card>
            <CardHeader><CardTitle>About</CardTitle></CardHeader>
            <p className="text-sm text-muted leading-relaxed">
              NovaTech AI provides an enterprise-grade orchestration layer that allows legacy systems to interface seamlessly with modern LLMs. Our proprietary routing algorithms reduce inference costs by 40% while maintaining 99.9% uptime for mission-critical applications.
            </p>
          </Card>

          <Card>
            <CardHeader><CardTitle>Current Metrics</CardTitle></CardHeader>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Team Size", value: "14" },
                { label: "Funding", value: "$2.4M" },
                { label: "Founded", value: "2023" },
                { label: "MRR", value: "$45k" },
              ].map((stat, i) => (
                <div key={i} className="p-3 rounded-md bg-surface-container border border-border text-center">
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-lg font-bold font-mono text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
