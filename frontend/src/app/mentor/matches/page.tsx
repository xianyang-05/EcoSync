"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Users, Search, Filter, ArrowUpRight, Clock, Target, Calendar, X, Activity, Sparkles, Network } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const matches = [
  { 
    startup: "NovaTech AI", 
    domain: "AI / NLP", 
    matchScore: 94, 
    status: "Active", 
    duration: "3 months",
    nextMilestone: "Series A Prep",
    description: "Developing next-gen NLP models for edge devices. Needs guidance on scaling architecture and team building.",
    simpleHistory: "Met during the Q3 matching mixer. We hit it off over scaling challenges and formalized the mentorship. Progress has been steady with a focus on engineering culture.",
    history: [
      { date: "Oct 12", event: "Initial Match & Intro", detail: "Discussed mutual expectations and set 6-month goals." },
      { date: "Oct 26", event: "Architecture Review Session", detail: "Deep dive into AWS microservices transition." },
      { date: "Nov 05", event: "GTM Strategy Workshop", detail: "Refined pricing models for enterprise clients." }
    ]
  },
  { 
    startup: "DataForge", 
    domain: "Data Analytics", 
    matchScore: 88, 
    status: "Active", 
    duration: "1 month",
    nextMilestone: "Beta Launch",
    description: "Cloud-native data pipeline orchestration. Looking for product-market fit validation.",
    simpleHistory: "Assigned via the Enterprise SaaS batch. We've just started collaborating on validating their initial feature set with design partners.",
    history: [
      { date: "Nov 02", event: "Initial Match & Intro", detail: "Kick-off meeting. Outlined early user feedback." },
      { date: "Nov 09", event: "Product Roadmap Review", detail: "Prioritized the Q1 roadmap based on feedback." }
    ]
  },
  { 
    startup: "QuantumBridge", 
    domain: "DeepTech", 
    matchScore: 91, 
    status: "Pending", 
    duration: "0 months",
    nextMilestone: "Onboarding",
    description: "Quantum key distribution protocols. Seeking mentorship on enterprise sales cycles.",
    simpleHistory: "Brand new AI-recommended match. The founder's deep technical background aligns perfectly with my recent focus on deep-tech sales cycles.",
    history: [
      { date: "Nov 15", event: "AI Match Proposed", detail: "System identified a 91% match based on mutual tags." }
    ]
  }
];

export default function MentorMatchesPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  const displayData = matches.filter(m => activeTab === "All" || m.status === activeTab);

  return (
    <div className="space-y-6">
      {/* Sticky Page Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md -mx-6 px-6 pt-6 mb-6 -mt-6">
        <div className="flex items-center justify-between pb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">My Matches</h1>
            <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Startups matched to your expertise</p>
          </div>
          <div className="flex items-center gap-3 mr-48">
            <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5">
              <Search className="h-3.5 w-3.5 text-muted-light" />
              <input placeholder="Search matches..." className="bg-transparent text-sm font-mono outline-none w-48 text-foreground placeholder:text-muted-light" />
            </div>
            <Button variant="secondary" size="sm"><Filter className="h-3.5 w-3.5" /> Filter</Button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {["All", "Active", "Pending"].map((tab) => (
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
          { label: "Active Connections", value: displayData.filter(r => r.status === "Active").length.toString(), color: "text-primary" },
          { label: "Avg. Match Score", value: displayData.length > 0 ? `${(displayData.reduce((acc, r) => acc + r.matchScore, 0) / displayData.length).toFixed(1)}%` : "0%", color: "text-success" },
          { label: "Total Sessions", value: displayData.reduce((acc, r) => acc + (r.history ? r.history.length : 0), 0).toString(), color: "text-foreground" },
          { label: "Pending Intros", value: displayData.filter(r => r.status === "Pending").length.toString(), color: "text-warning" },
        ].map((s, i) => (
          <Card key={i} className="p-4">
            <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {displayData.map((match, i) => (
          <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer group flex flex-col" onClick={() => setSelectedMatch(match)}>
            <div className="p-5 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar name={match.startup} size="md" />
                  <div>
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{match.startup}</h3>
                    <p className="text-[10px] font-mono text-muted uppercase tracking-wider mt-0.5">{match.domain}</p>
                  </div>
                </div>
                <Badge variant={match.status === "Active" ? "success" : "warning"}>{match.status}</Badge>
              </div>
              
              <p className="text-sm text-muted leading-relaxed mb-6 line-clamp-2">{match.description}</p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Match Score</span>
                    <span className="text-xs font-bold text-primary">{match.matchScore}%</span>
                  </div>
                  <ProgressBar value={match.matchScore} color="primary" size="sm" />
                </div>
              </div>
            </div>
            <div className="bg-surface-container/50 border-t border-border p-4 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 text-xs font-mono text-muted">
                <Target className="h-3.5 w-3.5" />
                <span>{match.nextMilestone}</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-primary transition-colors" />
            </div>
          </Card>
        ))}
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
      {selectedMatch && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedMatch(null)}
          />
          
          {/* Modal Content */}
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
                <Users className="h-3 w-3 mr-2" /> Match Overview
              </Badge>
              <button onClick={() => setSelectedMatch(null)} className="text-white/50 hover:text-white transition-colors bg-white/5 rounded-full p-1.5">
                <X className="h-4 w-4" />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight relative z-10">{selectedMatch.startup}</h2>
            <div className="flex items-center gap-2 mt-2 relative z-10">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20">{selectedMatch.domain}</Badge>
              <Badge variant="outline" className="border-white/10 text-white/70">{selectedMatch.status}</Badge>
            </div>
            <p className="text-sm text-white/60 mt-4 relative z-10">{selectedMatch.description}</p>
          </div>

          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full blur-xl -mr-4 -mt-4 pointer-events-none" />
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <Activity className="h-4 w-4 text-white/50" />
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Match Score</span>
                </div>
                <span className="text-2xl font-bold text-primary relative z-10">{selectedMatch.matchScore}%</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-xl -mr-4 -mt-4 pointer-events-none" />
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <Clock className="h-4 w-4 text-white/50" />
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Duration</span>
                </div>
                <span className="text-2xl font-bold text-white relative z-10">{selectedMatch.duration}</span>
              </div>
            </div>

            {/* AI Insights & Simple History */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="h-3 w-3" /> Engagement History
              </h3>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-4 rounded-lg border border-primary/20 bg-primary/5 flex items-start gap-3">
                <p className="text-sm text-white/80 leading-relaxed italic relative z-10">"{selectedMatch.simpleHistory}"</p>
              </motion.div>
            </div>

            {/* Progress */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                <Target className="h-3 w-3" /> Progress & Milestones
              </h3>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-white/60">Overall Mentorship Progress</span>
                  <span className="text-xs font-bold text-primary">65%</span>
                </div>
                <div className="w-full bg-black/50 rounded-full h-1.5 mb-4 overflow-hidden border border-white/5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: '65%' }} />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-white/40 uppercase">
                  <span>Phase 2 of 4</span>
                  <span>Next: {selectedMatch.nextMilestone}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3 pt-2 border-t border-white/10 pb-4">
              <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                <Calendar className="h-3 w-3" /> Recent Activity Timeline
              </h3>
              <div className="space-y-4 pl-2 ml-1 border-l border-white/10">
                {selectedMatch.history.map((h: any, i: number) => (
                  <div key={i} className="relative pl-4">
                    <div className="absolute w-2 h-2 bg-black border border-primary rounded-full -left-[4.5px] top-1 shadow-[0_0_8px_theme(colors.primary.DEFAULT)]" />
                    <p className="text-[10px] font-mono text-primary uppercase">{h.date}</p>
                    <p className="text-xs font-bold text-white mt-0.5">{h.event}</p>
                    <p className="text-[11px] text-white/60 mt-1 leading-relaxed">{h.detail}</p>
                  </div>
                ))}
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
