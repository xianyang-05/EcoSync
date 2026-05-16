"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  Network, Search, Filter, ArrowUpRight, Activity,
  Calendar, MessageSquare, TrendingUp, TrendingDown
} from "lucide-react";

const relationships = [
  { startup: "NovaTech AI", partner: "Dr. Sarah Kim", type: "Mentor", health: 92, sessions: 12, lastActive: "2 days ago", status: "active", trend: "up" },
  { startup: "GreenLeaf IoT", partner: "James Wilson", type: "Mentor", health: 78, sessions: 8, lastActive: "1 week ago", status: "active", trend: "down" },
  { startup: "DataForge", partner: "Vertex Capital", type: "Investor", health: 95, sessions: 5, lastActive: "1 day ago", status: "active", trend: "up" },
  { startup: "CloudPeak", partner: "Michael Torres", type: "Mentor", health: 45, sessions: 3, lastActive: "3 weeks ago", status: "at-risk", trend: "down" },
  { startup: "BioSynth Labs", partner: "Dr. Lisa Park", type: "Mentor", health: 88, sessions: 15, lastActive: "3 days ago", status: "active", trend: "up" },
  { startup: "UrbanFlow", partner: "SmartCity Fund", type: "Investor", health: 67, sessions: 4, lastActive: "5 days ago", status: "needs-attention", trend: "down" },
  { startup: "QuantumBridge", partner: "Prof. Tanaka", type: "Mentor", health: 91, sessions: 10, lastActive: "1 day ago", status: "active", trend: "up" },
  { startup: "AgroSense", partner: "GreenTech Ventures", type: "Investor", health: 82, sessions: 7, lastActive: "4 days ago", status: "active", trend: "up" },
];

export default function RelationshipsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Relationships</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Monitor and manage ecosystem relationships</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm"><Filter className="h-3.5 w-3.5" /> Filter</Button>
          <Button variant="ai" size="sm"><Network className="h-3.5 w-3.5" /> View Graph</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Active", value: "1,247", color: "text-primary" },
          { label: "Healthy (>80%)", value: "1,048", color: "text-success" },
          { label: "Needs Attention", value: "142", color: "text-warning" },
          { label: "At Risk (<50%)", value: "57", color: "text-danger" },
        ].map((s, i) => (
          <Card key={i} className="p-4">
            <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>All Relationships</CardTitle>
          <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-muted-light" />
            <input placeholder="Search relationships..." className="bg-transparent text-sm font-mono outline-none w-48 text-foreground placeholder:text-muted-light" />
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface-container">
                {["Startup", "Partner", "Type", "Health", "Sessions", "Last Active", "Status", ""].map((h) => (
                  <th key={h} className="text-left text-[10px] font-mono font-semibold text-muted uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {relationships.map((r, i) => (
                <tr key={i} className="border-b border-border-light hover:bg-surface-container/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={r.startup} size="sm" />
                      <span className="text-sm font-medium text-foreground">{r.startup}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted">{r.partner}</td>
                  <td className="px-5 py-3.5"><Badge variant={r.type === "Investor" ? "default" : "secondary"}>{r.type}</Badge></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 w-32">
                      <ProgressBar value={r.health} size="sm" color={r.health >= 80 ? "success" : r.health >= 50 ? "warning" : "danger"} />
                      <span className="text-xs font-mono text-muted">{r.health}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-mono text-muted">{r.sessions}</td>
                  <td className="px-5 py-3.5 text-xs font-mono text-muted-light">{r.lastActive}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={r.status === "active" ? "success" : r.status === "at-risk" ? "danger" : "warning"}>
                      {r.status === "at-risk" ? "At Risk" : r.status === "needs-attention" ? "Attention" : "Active"}
                    </Badge>
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
