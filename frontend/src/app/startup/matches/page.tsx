"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Search, Filter, ArrowUpRight, Network, X, Activity, Sparkles, Share2, Target, Calendar } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const myRelationships = [
  { partner: "Dr. Sarah Kim", type: "Mentor", health: 92, sessions: 12, lastActive: "2 days ago", status: "active", trend: "up" },
  { partner: "Vertex Capital", type: "Investor", health: 95, sessions: 5, lastActive: "1 day ago", status: "active", trend: "up" },
  { partner: "Q4 DeepTech", type: "Programme", health: 88, sessions: 15, lastActive: "3 days ago", status: "active", trend: "up" },
  { partner: "Prof. Tanaka", type: "Mentor", health: 91, sessions: 10, lastActive: "1 day ago", status: "active", trend: "up" },
];

export default function StartupRelationshipsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedRelationship, setSelectedRelationship] = useState<any>(null);

  const displayData = myRelationships
    .filter(r => 
      activeTab === "All" || r.type === activeTab || (activeTab === "Investors" && r.type === "Investor") || (activeTab === "Mentors" && r.type === "Mentor") || (activeTab === "Programmes" && r.type === "Programme")
    );

  return (
    <div className="space-y-6">
      {/* Sticky Page Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md -mx-6 px-6 pt-6 mb-6 -mt-6">
        <div className="flex items-center justify-between pb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">My Relationships</h1>
            <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Manage your connections and network health</p>
          </div>
          <div className="flex items-center gap-3 mr-48">
            <Button variant="secondary" size="sm"><Filter className="h-3.5 w-3.5" /> Filter</Button>
            <Button variant="ai" size="sm"><Network className="h-3.5 w-3.5" /> Request Intro</Button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {["All", "Mentors", "Investors", "Programmes"].map((tab) => (
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
          { label: "Active Connections", value: displayData.filter(r => r.status === "active").length.toString(), color: "text-primary" },
          { label: "Avg. Health", value: displayData.length > 0 ? `${(displayData.reduce((acc, r) => acc + r.health, 0) / displayData.length).toFixed(1)}%` : "0%", color: "text-success" },
          { label: "Total Sessions", value: displayData.reduce((acc, r) => acc + r.sessions, 0).toString(), color: "text-foreground" },
          { label: "Pending Intros", value: activeTab === "All" ? "1" : "0", color: "text-warning" },
        ].map((s, i) => (
          <Card key={i} className="p-4">
            <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {displayData.map((r, i) => (
          <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer group flex flex-col" onClick={() => setSelectedRelationship(r)}>
            <div className="p-5 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar name={r.partner} size="md" />
                  <div>
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{r.partner}</h3>
                    <p className="text-[10px] font-mono text-muted uppercase tracking-wider mt-0.5">{r.type}</p>
                  </div>
                </div>
                <Badge variant={r.status === "active" ? "success" : r.status === "at-risk" ? "danger" : "warning"}>
                  {r.status === "at-risk" ? "At Risk" : r.status === "needs-attention" ? "Attention" : "Active"}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Health Score</span>
                    <span className="text-xs font-bold text-primary">{r.health}%</span>
                  </div>
                  <ProgressBar value={r.health} color={r.health >= 80 ? "success" : r.health >= 50 ? "warning" : "danger"} size="sm" />
                </div>
              </div>
            </div>
            <div className="bg-surface-container/50 border-t border-border p-4 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 text-xs font-mono text-muted">
                <Calendar className="h-3.5 w-3.5" />
                <span>Last active: {r.lastActive}</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-primary transition-colors" />
            </div>
          </Card>
        ))}
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
      {selectedRelationship && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedRelationship(null)}
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[650px] max-h-[85vh] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 relative overflow-hidden shrink-0">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <Badge variant="outline" className="bg-white/5 border-white/10 text-white uppercase font-mono tracking-wider text-[10px]">
                  <Network className="h-3 w-3 mr-2" /> Match Overview
                </Badge>
                <button onClick={() => setSelectedRelationship(null)} className="text-white/50 hover:text-white transition-colors bg-white/5 rounded-full p-1.5">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight relative z-10">{selectedRelationship.partner}</h2>
              <div className="flex items-center gap-2 mt-2 relative z-10">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20">{selectedRelationship.type}</Badge>
                <Badge variant="outline" className="border-white/10 text-white/70">{selectedRelationship.status}</Badge>
              </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full blur-xl -mr-4 -mt-4 pointer-events-none" />
                  <div className="flex items-center gap-2 mb-2 relative z-10">
                    <Activity className="h-4 w-4 text-white/50" />
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Health Score</span>
                  </div>
                  <span className="text-2xl font-bold text-primary relative z-10">{selectedRelationship.health}%</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-xl -mr-4 -mt-4 pointer-events-none" />
                  <div className="flex items-center gap-2 mb-2 relative z-10">
                    <Calendar className="h-4 w-4 text-white/50" />
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Sessions</span>
                  </div>
                  <span className="text-2xl font-bold text-white relative z-10">{selectedRelationship.sessions}</span>
                </div>
              </div>

              {/* AI Insights & Simple History */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="h-3 w-3" /> Engagement History
                </h3>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-4 rounded-lg border border-primary/20 bg-primary/5 flex items-start gap-3">
                  <p className="text-sm text-white/80 leading-relaxed italic relative z-10">"Session successfully concluded with actionable next steps assigned to both parties."</p>
                </motion.div>
              </div>

              {/* Progress */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Target className="h-3 w-3" /> Progress & Milestones
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-white/60">Overall Progress</span>
                    <span className="text-xs font-bold text-primary">65%</span>
                  </div>
                  <div className="w-full bg-black/50 rounded-full h-1.5 mb-4 overflow-hidden border border-white/5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: '65%' }} />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/40 uppercase">
                    <span>Phase 2 of 4</span>
                    <span>Next: Product Review</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md flex gap-3 shrink-0">
              <Button className="flex-1 bg-white text-black hover:bg-white/90">Schedule Session</Button>
              <Button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white" variant="secondary">Send Message</Button>
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>
    </div>
  );
}
