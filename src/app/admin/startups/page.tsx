"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Building2, Search, ArrowUpRight, TrendingUp, Globe, Users } from "lucide-react";

const startups = [
  { name: "NovaTech AI", domain: "AI / NLP", stage: "Series A", mentors: 3, health: 92, status: "active" },
  { name: "GreenLeaf IoT", domain: "IoT / CleanTech", stage: "Seed", mentors: 2, health: 78, status: "active" },
  { name: "DataForge", domain: "Data Analytics", stage: "Series A", mentors: 2, health: 95, status: "active" },
  { name: "CloudPeak", domain: "Cloud Infra", stage: "Pre-Seed", mentors: 1, health: 45, status: "at-risk" },
  { name: "BioSynth Labs", domain: "BioTech", stage: "Seed", mentors: 3, health: 88, status: "active" },
  { name: "UrbanFlow", domain: "Smart Cities", stage: "Series A", mentors: 2, health: 67, status: "active" },
  { name: "QuantumBridge", domain: "Quantum Computing", stage: "Seed", mentors: 1, health: 91, status: "active" },
  { name: "AgroSense", domain: "AgriTech", stage: "Pre-Seed", mentors: 2, health: 82, status: "active" },
];

export default function StartupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Startups</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">All ecosystem startups</p>
        </div>
        <Button variant="primary" size="sm"><Building2 className="h-3.5 w-3.5" /> Add Startup</Button>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>{startups.length} Startups</CardTitle>
          <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-muted-light" />
            <input placeholder="Search..." className="bg-transparent text-sm font-mono outline-none w-48 text-foreground placeholder:text-muted-light" />
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface-container">
                {["Startup", "Domain", "Stage", "Mentors", "Health", "Status", ""].map((h) => (
                  <th key={h} className="text-left text-[10px] font-mono font-semibold text-muted uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {startups.map((s, i) => (
                <tr key={i} className="border-b border-border-light hover:bg-surface-container/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={s.name} size="sm" />
                      <span className="text-sm font-medium text-foreground">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted">{s.domain}</td>
                  <td className="px-5 py-3.5"><Badge variant="outline">{s.stage}</Badge></td>
                  <td className="px-5 py-3.5 text-sm font-mono text-muted">{s.mentors}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-sm font-mono font-bold ${s.health >= 80 ? "text-success" : s.health >= 50 ? "text-warning" : "text-danger"}`}>
                      {s.health}%
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={s.status === "active" ? "success" : "danger"}>{s.status === "at-risk" ? "At Risk" : "Active"}</Badge>
                  </td>
                  <td className="px-5 py-3.5"><Button variant="ghost" size="icon"><ArrowUpRight className="h-3.5 w-3.5" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
