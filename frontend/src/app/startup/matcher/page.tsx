"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Sparkles, ArrowRight, UserPlus, Zap, CheckCircle2, ShieldAlert, Check, X, Target, Briefcase, Share2, Activity, Calendar, Network } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const recommendations = [
  { id: 1, name: "Dr. Sarah Kim", type: "Mentor", role: "AI Ethics Specialist", matchScore: 98, description: "Leading expert in AI compliance and scaling. Highly recommended for your upcoming Series A prep.", focus: ["AI Regulations", "Enterprise Scaling"], img: "Dr. Sarah Kim" },
  { id: 2, name: "Q4 DeepTech Accelerator", type: "Programme", role: "6-Month Incubator", matchScore: 94, description: "Provides up to $150k non-dilutive funding and direct access to top-tier enterprise clients.", focus: ["Funding", "Enterprise Access"], img: "Q4 DeepTech" },
  { id: 3, name: "James Wilson", type: "Mentor", role: "GTM Strategist", matchScore: 88, description: "Ex-CMO at TechFlow. Can help you refine your B2B sales motion.", focus: ["B2B Sales", "GTM"], img: "James Wilson" }
];

export default function StartupAIMatcher() {
  const [selectedRec, setSelectedRec] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("Mentor");

  const displayRecs = recommendations.filter(r => r.type === activeCategory);

  return (
    <div className="space-y-6 pb-20">
      {/* Page Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md -mx-6 px-6 pt-6 pb-4 mb-6 -mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" /> AI Matcher
            </h1>
            <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Discover high-value ecosystem connections</p>
          </div>
          <div className="flex items-center gap-3 pr-[300px]">
            <Button variant="secondary" size="sm">Update Preferences</Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border mb-6">
        <button onClick={() => setActiveCategory("Mentor")} className={`pb-3 text-sm font-bold font-mono uppercase tracking-wider transition-colors ${activeCategory === "Mentor" ? "text-primary border-b-2 border-primary" : "text-muted hover:text-foreground border-b-2 border-transparent"}`}>Mentors</button>
        <button onClick={() => setActiveCategory("Programme")} className={`pb-3 text-sm font-bold font-mono uppercase tracking-wider transition-colors ${activeCategory === "Programme" ? "text-primary border-b-2 border-primary" : "text-muted hover:text-foreground border-b-2 border-transparent"}`}>Programmes</button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {displayRecs.map((rec, i) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="h-full"
          >
            <Card className="h-full hover:border-primary/50 transition-all cursor-pointer overflow-hidden group flex flex-col" onClick={() => setSelectedRec(rec)}>
              <div className="h-1 w-full bg-gradient-to-r from-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant={rec.type === "Mentor" ? "secondary" : "default"}>{rec.type}</Badge>
                  <div className="flex items-center gap-1 text-primary">
                    <Sparkles className="h-3 w-3" />
                    <span className="font-mono text-sm font-bold">{rec.matchScore}% Match</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <Avatar name={rec.img} size="lg" />
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{rec.name}</h3>
                    <p className="text-sm text-muted">{rec.role}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-light leading-relaxed mb-6">{rec.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {rec.focus.map((f, j) => (
                    <Badge key={j} variant="outline" className="bg-surface-container">{f}</Badge>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button className="w-full bg-white text-black hover:bg-white/90">
                    View Profile <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detail Side Panel */}
      <AnimatePresence>
      {selectedRec && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" onClick={() => setSelectedRec(null)} />
          <motion.div 
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative top-0 right-0 h-screen w-full md:w-[450px] bg-black/60 backdrop-blur-2xl border-l border-white/10 z-[60] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 relative overflow-hidden shrink-0">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <Badge variant="outline" className="bg-white/5 border-white/10 text-white uppercase font-mono tracking-wider text-[10px]">
                  <Sparkles className="h-3 w-3 mr-2" /> Match Analysis
                </Badge>
                <button onClick={() => setSelectedRec(null)} className="text-white/50 hover:text-white transition-colors bg-white/5 rounded-full p-1.5">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight relative z-10">{selectedRec.name}</h2>
              <div className="flex items-center gap-2 mt-2 relative z-10">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20">{selectedRec.type}</Badge>
                <Badge variant="outline" className="border-white/10 text-white/70">{selectedRec.role}</Badge>
              </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full blur-xl -mr-4 -mt-4 pointer-events-none" />
                  <div className="flex items-center gap-2 mb-2 relative z-10">
                    <Zap className="h-4 w-4 text-white/50" />
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Synergy</span>
                  </div>
                  <span className="text-2xl font-bold text-primary relative z-10">{selectedRec.matchScore}%</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-xl -mr-4 -mt-4 pointer-events-none" />
                  <div className="flex items-center gap-2 mb-2 relative z-10">
                    <Briefcase className="h-4 w-4 text-white/50" />
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Focus</span>
                  </div>
                  <span className="text-xs font-bold text-white relative z-10 leading-tight block truncate">{selectedRec.focus[0]}</span>
                </div>
              </div>

              {/* AI Insights & Simple History */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="h-3 w-3" /> Why this match?
                </h3>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-4 rounded-lg border border-primary/20 bg-primary/5 flex items-start gap-3">
                  <p className="text-sm text-white/80 leading-relaxed italic relative z-10">"{selectedRec.description}"</p>
                </motion.div>
                <div className="mt-4 p-4 rounded-lg border border-white/10 bg-white/5 space-y-3">
                   <p className="text-xs text-white/70 flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-success"/> Aligns with your "Series A Readiness" goal.</p>
                   <p className="text-xs text-white/70 flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-success"/> Perfect timezone overlap (EST).</p>
                   <p className="text-xs text-white/70 flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-success"/> Previous success with Enterprise AI startups.</p>
                </div>
              </div>

            </div>

            <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md flex gap-3 shrink-0">
              <Button className="flex-1 bg-white text-black hover:bg-white/90">Request Introduction</Button>
              <Button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white" variant="secondary">Ignore Match</Button>
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>

    </div>
  );
}
