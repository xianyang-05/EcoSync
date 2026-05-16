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
  { startup: "BioSynth Labs", partner: "Q4 DeepTech", type: "Programme", health: 88, sessions: 15, lastActive: "3 days ago", status: "active", trend: "up" },
  { startup: "UrbanFlow", partner: "SmartCity Fund", type: "Investor", health: 67, sessions: 4, lastActive: "5 days ago", status: "needs-attention", trend: "down" },
  { startup: "QuantumBridge", partner: "Prof. Tanaka", type: "Mentor", health: 91, sessions: 10, lastActive: "1 day ago", status: "active", trend: "up" },
  { startup: "AgroSense", partner: "Green AI Incubator", type: "Programme", health: 82, sessions: 7, lastActive: "4 days ago", status: "active", trend: "up" },
];

import { useState } from "react";

export default function RelationshipsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedRelationship, setSelectedRelationship] = useState<any>(null);

  const displayData = relationships
    .filter(r => 
      activeTab === "All" || r.type === activeTab || (activeTab === "Partner" && r.type === "Investor") || (activeTab === "Programme" && r.type === "Programme")
    )
    .map(r => {
      if (activeTab === "Mentor") return { ...r, primary: r.partner, secondary: r.startup };
      if (activeTab === "Partner" || activeTab === "Programme") return { ...r, primary: r.partner, secondary: r.startup };
      return { ...r, primary: r.startup, secondary: r.partner };
    });

  const primaryLabel = activeTab === "Mentor" ? "Mentor" : activeTab === "Partner" ? "Partner" : activeTab === "Programme" ? "Programme" : "Startup";
  const secondaryLabel = activeTab === "Mentor" || activeTab === "Partner" || activeTab === "Programme" ? "Startup" : "Partner";

  return (
    <div className="space-y-6">
      {/* Sticky Page Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md -mx-6 px-6 pt-6 mb-6 -mt-6">
        <div className="flex items-center justify-between pb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Relationships</h1>
            <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Monitor and manage ecosystem relationships</p>
          </div>
          <div className="flex items-center gap-3 mr-48">
            <Button variant="secondary" size="sm"><Filter className="h-3.5 w-3.5" /> Filter</Button>
            <Button variant="ai" size="sm"><Network className="h-3.5 w-3.5" /> View Graph</Button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {["All", "Startup", "Mentor", "Partner", "Programme"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
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
                {[primaryLabel, secondaryLabel, "Type", "Health", "Sessions", "Last Active", "Status", ""].map((h, index) => (
                  <th key={index} className="text-left text-[10px] font-mono font-semibold text-muted uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayData.map((r, i) => (
                <tr key={i} onClick={() => setSelectedRelationship(r)} className="border-b border-border-light hover:bg-surface-container/80 transition-colors cursor-pointer group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={r.primary} size="sm" />
                      <span className="text-sm font-medium text-foreground">{r.primary}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted">{r.secondary}</td>
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

      {/* Side Panel Drawer */}
      {selectedRelationship && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" onClick={() => setSelectedRelationship(null)} />
          <div className="relative w-[450px] bg-surface h-full border-l border-border shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-foreground">Relationship Details</h2>
              <Button variant="ghost" size="sm" onClick={() => setSelectedRelationship(null)}>Close</Button>
            </div>
            
            <div className="flex items-center gap-4 mb-8 p-4 border border-border rounded-lg bg-surface-container/50">
              <Avatar name={selectedRelationship.primary} size="lg" />
              <div className="flex-1 min-w-0">
                <p className="text-lg font-medium text-foreground truncate">{selectedRelationship.primary}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted">Connected with</span>
                  <span className="text-xs font-medium text-foreground truncate">{selectedRelationship.secondary}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 flex-1">
              <div>
                <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Relationship Health</p>
                <div className="flex items-center gap-3">
                  <ProgressBar value={selectedRelationship.health} color={selectedRelationship.health >= 80 ? "success" : selectedRelationship.health >= 50 ? "warning" : "danger"} />
                  <span className="text-sm font-mono text-foreground w-12 text-right">{selectedRelationship.health}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg bg-surface-container/30">
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Total Sessions</p>
                  <p className="text-2xl font-bold font-mono text-foreground">{selectedRelationship.sessions}</p>
                </div>
                <div className="p-4 border border-border rounded-lg bg-surface-container/30">
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Status</p>
                  <Badge variant={selectedRelationship.status === "active" ? "success" : selectedRelationship.status === "at-risk" ? "danger" : "warning"} className="mt-1">
                    {selectedRelationship.status === "at-risk" ? "At Risk" : selectedRelationship.status === "needs-attention" ? "Attention" : "Active"}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Recent Activity</p>
                <div className="p-4 border border-border rounded-lg text-sm text-muted bg-surface-container/20">
                  Last active: <span className="text-foreground">{selectedRelationship.lastActive}</span>
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <p className="text-xs leading-relaxed"><span className="text-primary font-medium">AI Note:</span> The latest session covered strategic milestones and upcoming series preparation.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-border mt-auto">
              <Button className="flex-1" variant="primary">View Full History</Button>
              <Button className="flex-1" variant="secondary">Intervene</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
