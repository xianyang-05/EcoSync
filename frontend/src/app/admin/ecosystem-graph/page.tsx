"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Sparkles, Building2, Users, Briefcase, GraduationCap, X, Target, Activity, Share2, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Dynamically import the graph component with no SSR to avoid window/canvas errors
const InteractiveGraph = dynamic(() => import("@/components/ui/interactive-graph"), { ssr: false });

// Generate rich mock data
const generateMockData = () => {
  const nodes: any[] = [];
  const links: any[] = [];
  
  const types = ["startup", "mentor", "investor", "programme"];
  const typeCounts = { startup: 25, mentor: 15, investor: 10, programme: 4 };
  
  // Create Nodes
  let idCounter = 1;
  const nodesByType: Record<string, any[]> = { startup: [], mentor: [], investor: [], programme: [] };

  Object.entries(typeCounts).forEach(([type, count]) => {
    for (let i = 0; i < count; i++) {
      const node = {
        id: `node-${idCounter}`,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${i + 1}`,
        type,
        val: type === "programme" ? 25 : type === "investor" ? 18 : type === "mentor" ? 12 : 8,
        metrics: {
          engagement: Math.floor(Math.random() * 40 + 60),
          compatibility: Math.floor(Math.random() * 30 + 70)
        },
        desc: `A highly active ${type} in the ecosystem contributing to various innovations.`
      };
      nodes.push(node);
      nodesByType[type].push(node);
      idCounter++;
    }
  });

  // Create Links (Relationships)
  // Programmes connect to Startups and Mentors
  nodesByType.programme.forEach(prog => {
    const connectedStartups = [...nodesByType.startup].sort(() => 0.5 - Math.random()).slice(0, 8);
    connectedStartups.forEach(s => links.push({ source: prog.id, target: s.id, type: "participant" }));
    
    const connectedMentors = [...nodesByType.mentor].sort(() => 0.5 - Math.random()).slice(0, 4);
    connectedMentors.forEach(m => links.push({ source: prog.id, target: m.id, type: "facilitator" }));
  });

  // Startups connect to Investors and Mentors
  nodesByType.startup.forEach(startup => {
    // 60% chance to have an investor
    if (Math.random() > 0.4) {
      const investor = nodesByType.investor[Math.floor(Math.random() * nodesByType.investor.length)];
      links.push({ source: investor.id, target: startup.id, type: "funding" });
    }
    // Connect to 1-2 mentors
    const mentorCount = Math.floor(Math.random() * 2) + 1;
    const mentors = [...nodesByType.mentor].sort(() => 0.5 - Math.random()).slice(0, mentorCount);
    mentors.forEach(m => links.push({ source: m.id, target: startup.id, type: "mentorship" }));
  });

  return { nodes, links };
};

export default function EcosystemGraphPage() {
  const [data, setData] = useState<{nodes: any[], links: any[]}>({ nodes: [], links: [] });
  const [hoveredNode, setHoveredNode] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [activeTypes, setActiveTypes] = useState<string[]>(["startup", "mentor", "investor", "programme"]);

  const toggleType = (type: string) => {
    setActiveTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  useEffect(() => {
    setData(generateMockData() as any);
    setMounted(true);
  }, []);

  const filteredData = useMemo(() => {
    if (!data.nodes.length) return { nodes: [], links: [] };

    let fNodes = data.nodes.filter(n => activeTypes.includes(n.type));
    
    const nodeIds = new Set(fNodes.map(n => n.id));
    const fLinks = data.links.filter(l => {
      const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
      const targetId = typeof l.target === 'object' ? l.target.id : l.target;
      return nodeIds.has(sourceId) && nodeIds.has(targetId);
    });

    return { nodes: fNodes, links: fLinks };
  }, [data, activeTypes]);

  if (!mounted) return <div className="h-screen w-full bg-black flex items-center justify-center text-primary font-mono text-sm">Loading Ecosystem Core...</div>;

  const getIconForType = (type: string) => {
    switch (type) {
      case "startup": return <Building2 className="h-4 w-4 text-[#00e5ff]" />;
      case "mentor": return <Users className="h-4 w-4 text-[#b388ff]" />;
      case "investor": return <Briefcase className="h-4 w-4 text-[#ffd54f]" />;
      case "programme": return <GraduationCap className="h-4 w-4 text-[#69f0ae]" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  const getConnections = (nodeId: string) => {
    return data.links.filter((l: any) => l.source.id === nodeId || l.target.id === nodeId || l.source === nodeId || l.target === nodeId).length;
  };

  return (
    <div className="relative w-full h-[calc(100vh-80px)] -mt-6 -mx-6 overflow-hidden bg-[#050505]">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Ambient Gradient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00e5ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#b388ff]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navigation Panel */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-6 left-6 right-6 z-40 flex items-center justify-between"
      >
        <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-6 shadow-2xl shadow-black/50">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" /> EcoSync Engine
            </h1>
            <p className="text-[10px] font-mono text-white/50 uppercase tracking-widest mt-1">Live Entity Topography</p>
          </div>
          <div className="h-8 w-px bg-white/10 mx-2" />
          <div className="relative">
            <Button 
              variant="secondary" 
              className="bg-white/5 hover:bg-white/10 border-white/10 text-white"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Filter className="h-4 w-4 mr-2" /> Filter Entities
            </Button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 left-0 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 p-2 space-y-1"
                >
                  {[
                    { id: "startup", label: "Startups" },
                    { id: "mentor", label: "Mentors" },
                    { id: "investor", label: "Investors" },
                    { id: "programme", label: "Programmes" }
                  ].map(t => (
                    <label key={t.id} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                      <input 
                        type="checkbox" 
                        className="accent-primary w-4 h-4 cursor-pointer"
                        checked={activeTypes.includes(t.id)}
                        onChange={() => toggleType(t.id)}
                      />
                      <span className="text-sm font-mono text-white/90">{t.label}</span>
                    </label>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Legend / Stats */}
        <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex gap-4 shadow-2xl">
          {[
            { label: "Startups", color: "bg-[#00e5ff]", count: 25 },
            { label: "Mentors", color: "bg-[#b388ff]", count: 15 },
            { label: "Investors", color: "bg-[#ffd54f]", count: 10 },
            { label: "Programmes", color: "bg-[#69f0ae]", count: 4 },
          ].map(l => (
            <div key={l.label} className="flex flex-col items-center px-3">
              <div className="flex items-center gap-1.5 mb-1">
                <div className={`w-2 h-2 rounded-full ${l.color} shadow-[0_0_8px_currentColor]`} />
                <span className="text-[10px] font-mono text-white/60 uppercase tracking-wider">{l.label}</span>
              </div>
              <span className="text-sm font-bold text-white">{l.count}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* The Interactive Force Graph */}
      <div className="absolute inset-0 z-10">
        <InteractiveGraph 
          data={filteredData} 
          onNodeClick={setSelectedNode} 
          hoveredNode={hoveredNode} 
          setHoveredNode={setHoveredNode} 
          selectedNode={selectedNode}
        />
      </div>

      {/* Node Detail Side Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-6 bottom-6 right-6 w-[400px] bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
                selectedNode.type === 'startup' ? 'from-[#00e5ff] to-transparent' :
                selectedNode.type === 'mentor' ? 'from-[#b388ff] to-transparent' :
                selectedNode.type === 'investor' ? 'from-[#ffd54f] to-transparent' :
                'from-[#69f0ae] to-transparent'
              }`} />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <Badge variant="outline" className="bg-white/5 border-white/10 text-white uppercase font-mono tracking-wider text-[10px]">
                  {getIconForType(selectedNode.type)} <span className="ml-2">{selectedNode.type}</span>
                </Badge>
                <button onClick={() => setSelectedNode(null)} className="text-white/50 hover:text-white transition-colors bg-white/5 rounded-full p-1.5">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight relative z-10">{selectedNode.name}</h2>
              <p className="text-sm text-white/60 mt-2 relative z-10">{selectedNode.desc}</p>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Share2 className="h-4 w-4 text-white/50" />
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Connections</span>
                  </div>
                  <span className="text-2xl font-bold text-white">{getConnections(selectedNode.id)}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-white/50" />
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Engagement</span>
                  </div>
                  <span className="text-2xl font-bold text-white">{selectedNode.metrics.engagement}%</span>
                </div>
              </div>

              {/* AI Insights */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="h-3 w-3" /> System Insights
                </h3>
                
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-3 rounded-lg border border-primary/20 bg-primary/5 flex items-start gap-3">
                  <Target className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-white/80 leading-relaxed">High ecosystem gravity detected. Highly compatible with {selectedNode.type === 'startup' ? 'Seed-stage Investors' : 'DeepTech Startups'}.</p>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-3 rounded-lg border border-white/10 bg-white/5 flex items-start gap-3">
                  <Network className="h-4 w-4 text-white/50 mt-0.5 shrink-0" />
                  <p className="text-sm text-white/80 leading-relaxed">Directly connected to {Math.max(1, getConnections(selectedNode.id) - 1)} secondary hubs in the ecosystem.</p>
                </motion.div>
              </div>

              {/* Progress */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="h-3 w-3" /> Progress & Milestones
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-white/60">Ecosystem Integration</span>
                    <span className="text-xs font-bold text-primary">78%</span>
                  </div>
                  <div className="w-full bg-black/50 rounded-full h-1.5 mb-4 overflow-hidden border border-white/5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: '78%' }} />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/40 uppercase">
                    <span>Phase 3</span>
                    <span>Next: Strategic Partnership</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3 pt-2 border-t border-white/10 pb-4">
                <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="h-3 w-3" /> Recent Activity Timeline
                </h3>
                <div className="space-y-4 pl-2 ml-1 border-l border-white/10">
                  {[
                    { date: "Today", event: "Completed Q3 Mentorship Review" },
                    { date: "Nov 12", event: "Matched with new Investor Node" },
                    { date: "Oct 28", event: "Joined DeepTech Accelerator Programme" }
                  ].map((item, i) => (
                    <div key={i} className="relative pl-4">
                      <div className="absolute w-2 h-2 bg-black border border-primary rounded-full -left-[4.5px] top-1" />
                      <p className="text-[10px] font-mono text-primary uppercase">{item.date}</p>
                      <p className="text-xs text-white/80 mt-0.5">{item.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md">
              <Button className="w-full bg-white text-black hover:bg-white/90">View Full Profile</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
