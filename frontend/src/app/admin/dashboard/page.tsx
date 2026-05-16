"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AIInsightPanel } from "@/components/ui/ai-insight-panel";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Avatar } from "@/components/ui/avatar";
import {
  Building2, Users, GitMerge, TrendingUp, Activity, Target,
  Sparkles, ArrowUpRight, Clock, CheckCircle2, AlertTriangle,
  BarChart3, Zap, Network, GraduationCap, X, Server, ChevronDown
} from "lucide-react";

const recentMatches = [
  { startup: "NovaTech AI", mentor: "Dr. Sarah Kim", score: 94, status: "approved" as const, time: "2h ago" },
  { startup: "GreenLeaf IoT", mentor: "James Wilson", score: 87, status: "pending" as const, time: "4h ago" },
  { startup: "DataForge", mentor: "Priya Sharma", score: 91, status: "approved" as const, time: "6h ago" },
  { startup: "CloudPeak", mentor: "Michael Torres", score: 78, status: "pending" as const, time: "8h ago" },
  { startup: "BioSynth", mentor: "Dr. Lisa Park", score: 82, status: "rejected" as const, time: "12h ago" },
];

const automationEvents = [
  { type: "match", message: "AI generated 8 new startup-mentor matches", time: "15m ago", icon: GitMerge },
  { type: "alert", message: "3 relationships flagged for low engagement", time: "1h ago", icon: AlertTriangle },
  { type: "success", message: "Programme Q4 Accelerator fully staffed", time: "3h ago", icon: CheckCircle2 },
  { type: "insight", message: "Ecosystem growth rate increased by 12%", time: "5h ago", icon: TrendingUp },
];

export default function AdminDashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "", type: "", industry: "", stage: "", organizer: "", country: "", city: "",
    organizer_email: "", organizer_website: "", description: "", objective: "",
    eligibility_criteria: "", benefits: "", application_open_date: "", application_deadline: "",
    programme_start_date: "", programme_end_date: "", venue: "", max_participants: "",
    funding_amount: "", website_url: "", application_url: ""
  });

  const handleAutoFill = () => {
    setIsGenerating(true);
    // Simulate AI API delay
    setTimeout(() => {
      setFormData(prev => ({
        name: prev.name || "Global DeepTech Vanguard 2027",
        type: prev.type || "Accelerator",
        industry: prev.industry || "Artificial Intelligence",
        stage: prev.stage || "Seed",
        organizer: prev.organizer || "EcoSync Foundation",
        country: prev.country || "United States",
        city: prev.city || "San Francisco",
        organizer_email: prev.organizer_email || "partnerships@ecosync.org",
        organizer_website: prev.organizer_website || "https://ecosync.org",
        description: prev.description || "A 12-week intensive accelerator designed to propel elite AI startups from prototype to Series A readiness.",
        objective: prev.objective || "Accelerate go-to-market strategies for deep tech companies.",
        eligibility_criteria: prev.eligibility_criteria || "Must have a working MVP, raised pre-seed, and have at least 2 full-time founders.",
        benefits: prev.benefits || "$100k investment, 1-on-1 mentorship, co-working space, and $50k in cloud credits.",
        application_open_date: prev.application_open_date || "2027-01-01",
        application_deadline: prev.application_deadline || "2027-02-15",
        programme_start_date: prev.programme_start_date || "2027-03-01",
        programme_end_date: prev.programme_end_date || "2027-05-30",
        venue: prev.venue || "EcoSync Innovation Hub, SF",
        max_participants: prev.max_participants || "15",
        funding_amount: prev.funding_amount || "100000",
        website_url: prev.website_url || "https://ecosync.org/vanguard",
        application_url: prev.application_url || "https://ecosync.org/apply",
      }));
      setIsAutoFilled(true);
      setIsGenerating(false);
    }, 1500);
  };

  const saveProgramme = async () => {
    setIsGenerating(true);
    
    let mappedType = 'other';
    const typeLower = formData.type.toLowerCase();
    if (typeLower.includes('accelerator')) mappedType = 'accelerator';
    else if (typeLower.includes('incubator')) mappedType = 'incubator';
    else if (typeLower.includes('mentor')) mappedType = 'mentorship';
    else if (typeLower.includes('grant')) mappedType = 'grant';

    const programmeData = {
      programme_name: formData.name,
      programme_type: mappedType,
      organizer_name: formData.organizer,
      organizer_email: formData.organizer_email,
      organizer_website: formData.organizer_website,
      industry_focus: formData.industry,
      target_stage: formData.stage,
      description: formData.description,
      objective: formData.objective,
      eligibility_criteria: formData.eligibility_criteria,
      benefits: formData.benefits,
      application_open_date: formData.application_open_date || null,
      application_deadline: formData.application_deadline || null,
      programme_start_date: formData.programme_start_date || null,
      programme_end_date: formData.programme_end_date || null,
      country: formData.country,
      city: formData.city,
      venue: formData.venue,
      max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
      funding_amount: formData.funding_amount ? parseFloat(formData.funding_amount) : null,
      website_url: formData.website_url,
      application_url: formData.application_url,
      status: 'open'
    };

    try {
      const { error } = await supabase.from('programmes').insert([programmeData]);
      if (error) throw error;
      
      alert("Programme saved successfully to EcoSync Supabase!");
      closeAndReset();
    } catch (error: any) {
      console.error("Error saving programme:", error);
      alert("Failed to save programme: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const closeAndReset = () => {
    setIsCreateModalOpen(false);
    setTimeout(() => {
      setIsAutoFilled(false);
      setFormData({ 
        name: "", type: "", industry: "", stage: "", organizer: "", country: "", city: "",
        organizer_email: "", organizer_website: "", description: "", objective: "",
        eligibility_criteria: "", benefits: "", application_open_date: "", application_deadline: "",
        programme_start_date: "", programme_end_date: "", venue: "", max_participants: "",
        funding_amount: "", website_url: "", application_url: ""
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Sticky Page Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md -mx-6 px-6 pt-6 pb-4 mb-6 -mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
            <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Live metrics and automated matching controls</p>
          </div>
          <div className="flex items-center gap-3 pr-[300px]">
            <Button variant="ai" size="sm">
              <Sparkles className="h-3.5 w-3.5" />
              Run AI Analysis
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsCreateModalOpen(true)}>
              <GraduationCap className="h-3.5 w-3.5" />
              Create
            </Button>
          </div>
        </div>
      </div>

      {/* AI Insight */}
      <AIInsightPanel
        title="System Insights"
        insight="Unusually high interaction rate between ecosystem entities. 23 new startups onboarded this month (↑40%). AI has identified 12 high-potential matches awaiting approval with an average compatibility score of 89%."
        confidence={94}
        recommendations={[
          "Approve the 5 matches with >90% compatibility to accelerate Q4 programme enrollment",
          "Schedule mentor onboarding for the 3 new industry experts in FinTech vertical",
          "Resource 'AWS Credits' depletion accelerating. Recommend triggering tier 2 top-up protocols within 48h",
        ]}
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Startups" value="248" change="↑ 23" changeType="positive" description="this month" icon={Building2} />
        <MetricCard title="Active Mentors" value="89" change="↑ 7" changeType="positive" description="this month" icon={Users} />
        <MetricCard title="Pending Matches" value="12" change="5 critical" changeType="negative" description="need review" icon={GitMerge} />
        <MetricCard title="Match Accuracy" value="94.2%" change="↑ 2.1%" changeType="positive" description="vs last quarter" icon={Target} />
      </div>

      {/* Main Content Grid */}


      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Programme Health */}
        <Card>
          <CardHeader>
            <CardTitle>Active Programmes</CardTitle>
            <Badge variant="ai">
              <Sparkles className="h-2.5 w-2.5" />
              AI Monitored
            </Badge>
          </CardHeader>
          <div className="space-y-4">
            {[
              { name: "Q3 Deep Tech", progress: 85, status: "On Track" },
              { name: "AI Founders", progress: 62, status: "Needs Attention" },
              { name: "AI Research Lab", progress: 94, status: "Ahead" },
              { name: "Green Innovation", progress: 45, status: "At Risk" },
            ].map((prog, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{prog.name}</span>
                  <Badge variant={prog.progress >= 80 ? "success" : prog.progress >= 60 ? "warning" : "danger"}>
                    {prog.status}
                  </Badge>
                </div>
                <ProgressBar
                  value={prog.progress}
                  color={prog.progress >= 80 ? "success" : prog.progress >= 60 ? "warning" : "danger"}
                  showValue
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Network Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-3.5 w-3.5 text-primary" />
              Network Health Velocity
            </CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Active Relationships", value: "1,247", icon: Activity },
              { label: "AI Matches (30d)", value: "156", icon: GitMerge },
              { label: "Approval Rate", value: "87%", icon: CheckCircle2 },
              { label: "Avg. Match Score", value: "86.4", icon: Target },
              { label: "Programmes Active", value: "14", icon: GraduationCap },
              { label: "Investor Interest", value: "↑ 34%", icon: TrendingUp },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-md border border-border bg-surface-container p-3 hover:bg-surface-container-high transition-colors"
              >
                <stat.icon className="h-4 w-4 text-primary mb-2" />
                <p className="text-lg font-bold font-mono text-foreground">{stat.value}</p>
                <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Create Programme Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={closeAndReset}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative w-full max-w-3xl bg-surface border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-border bg-surface-container/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
                <div className="flex justify-between items-center relative z-10">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Create New Programme</h2>
                    <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Initialize in EcoSync Supabase</p>
                  </div>
                  <button onClick={closeAndReset} className="text-muted hover:text-foreground transition-colors p-1.5 bg-surface-container rounded-full">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[70vh] space-y-5">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-primary">{isAutoFilled ? "AI Auto-Fill Complete" : "AI Auto-Fill Enabled"}</p>
                    <p className="text-xs text-muted mt-1 leading-relaxed">
                      {isAutoFilled ? "The AI has populated the remaining fields based on your initial inputs. Please review and edit the details before saving to the EcoSync Supabase." : "Fields left blank will be intelligently auto-generated by the AI Engine before storing to the EcoSync Supabase. This programme will be automatically linked to relevant Mentors and Startups in the ecosystem."}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase tracking-wider">Programme Name *</label>
                    <input 
                      className={`w-full bg-background border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors ${isAutoFilled && formData.name ? 'border-primary/50 bg-primary/5' : 'border-border'}`}
                      placeholder="e.g. Q4 DeepTech Accelerator" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted uppercase tracking-wider">Programme Type</label>
                      <div className="relative">
                        <select 
                          className={`w-full bg-background border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none ${isAutoFilled && formData.type ? 'border-primary/50 bg-primary/5' : 'border-border'}`}
                          value={formData.type}
                          onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                          <option value="">Select type...</option>
                          <option>Accelerator</option>
                          <option>Incubator</option>
                          <option>Mentorship Batch</option>
                          <option>Corporate Innovation</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted uppercase tracking-wider">Industry Focus</label>
                      <div className="relative">
                        <select 
                          className={`w-full bg-background border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none ${isAutoFilled && formData.industry ? 'border-primary/50 bg-primary/5' : 'border-border'}`}
                          value={formData.industry}
                          onChange={(e) => setFormData({...formData, industry: e.target.value})}
                        >
                          <option value="">Select industry...</option>
                          <option>Artificial Intelligence</option>
                          <option>FinTech</option>
                          <option>HealthTech & BioTech</option>
                          <option>CleanTech & Energy</option>
                          <option>SaaS & Enterprise</option>
                          <option>Web3 & Blockchain</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted uppercase tracking-wider">Target Stage</label>
                      <div className="relative">
                        <select 
                          className={`w-full bg-background border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none ${isAutoFilled && formData.stage ? 'border-primary/50 bg-primary/5' : 'border-border'}`}
                          value={formData.stage}
                          onChange={(e) => setFormData({...formData, stage: e.target.value})}
                        >
                          <option value="">Select stage...</option>
                          <option>Pre-Seed</option>
                          <option>Seed</option>
                          <option>Series A</option>
                          <option>Growth</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted uppercase tracking-wider">Organizer Name</label>
                      <input 
                        className={`w-full bg-background border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors ${isAutoFilled && formData.organizer ? 'border-primary/50 bg-primary/5' : 'border-border'}`}
                        placeholder="e.g. Vertex Ventures" 
                        value={formData.organizer}
                        onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted uppercase tracking-wider">Country</label>
                      <input 
                        className={`w-full bg-background border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors ${isAutoFilled && formData.country ? 'border-primary/50 bg-primary/5' : 'border-border'}`}
                        placeholder="e.g. Singapore" 
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted uppercase tracking-wider">City</label>
                      <div className="relative">
                        <select 
                          className={`w-full bg-background border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none ${isAutoFilled && formData.city ? 'border-primary/50 bg-primary/5' : 'border-border'}`}
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                        >
                          <option value="">Select city...</option>
                          <option>Singapore</option>
                          <option>London</option>
                          <option>San Francisco</option>
                          <option>New York</option>
                          <option>Berlin</option>
                          <option>Tokyo</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-2">
                    <label className="text-xs font-bold text-muted uppercase tracking-wider">Ecosystem Linking</label>
                    <div className="flex items-center gap-2 mt-1">
                      <input type="checkbox" id="link_startups" defaultChecked className="rounded border-border bg-background" />
                      <label htmlFor="link_startups" className="text-sm text-foreground cursor-pointer">Auto-match with relevant Startups</label>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <input type="checkbox" id="link_mentors" defaultChecked className="rounded border-border bg-background" />
                      <label htmlFor="link_mentors" className="text-sm text-foreground cursor-pointer">Auto-match with expert Mentors</label>
                    </div>
                  </div>

                  {isAutoFilled && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4 pt-4 border-t border-border mt-4"
                    >
                      <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                        <Sparkles className="h-4 w-4" /> AI Generated Details
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted uppercase tracking-wider">Organizer Email</label>
                          <input className="w-full bg-primary/5 border border-primary/50 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" value={formData.organizer_email} onChange={(e) => setFormData({...formData, organizer_email: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted uppercase tracking-wider">Organizer Website</label>
                          <input className="w-full bg-primary/5 border border-primary/50 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" value={formData.organizer_website} onChange={(e) => setFormData({...formData, organizer_website: e.target.value})} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Description</label>
                        <textarea className="w-full bg-primary/5 border border-primary/50 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors h-20 resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Objective</label>
                        <textarea className="w-full bg-primary/5 border border-primary/50 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors h-16 resize-none" value={formData.objective} onChange={(e) => setFormData({...formData, objective: e.target.value})} />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted uppercase tracking-wider">Eligibility Criteria</label>
                          <textarea className="w-full bg-primary/5 border border-primary/50 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors h-20 resize-none" value={formData.eligibility_criteria} onChange={(e) => setFormData({...formData, eligibility_criteria: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted uppercase tracking-wider">Benefits</label>
                          <textarea className="w-full bg-primary/5 border border-primary/50 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors h-20 resize-none" value={formData.benefits} onChange={(e) => setFormData({...formData, benefits: e.target.value})} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted uppercase tracking-wider">App Open Date</label>
                          <input type="date" className="w-full bg-primary/5 border border-primary/50 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" value={formData.application_open_date} onChange={(e) => setFormData({...formData, application_open_date: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted uppercase tracking-wider">App Deadline</label>
                          <input type="date" className="w-full bg-primary/5 border border-primary/50 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" value={formData.application_deadline} onChange={(e) => setFormData({...formData, application_deadline: e.target.value})} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted uppercase tracking-wider">Programme Start</label>
                          <input type="date" className="w-full bg-primary/5 border border-primary/50 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" value={formData.programme_start_date} onChange={(e) => setFormData({...formData, programme_start_date: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted uppercase tracking-wider">Programme End</label>
                          <input type="date" className="w-full bg-primary/5 border border-primary/50 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" value={formData.programme_end_date} onChange={(e) => setFormData({...formData, programme_end_date: e.target.value})} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted uppercase tracking-wider">Max Participants</label>
                          <input type="number" className="w-full bg-primary/5 border border-primary/50 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" value={formData.max_participants} onChange={(e) => setFormData({...formData, max_participants: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted uppercase tracking-wider">Funding Amount ($)</label>
                          <input type="number" className="w-full bg-primary/5 border border-primary/50 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" value={formData.funding_amount} onChange={(e) => setFormData({...formData, funding_amount: e.target.value})} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted uppercase tracking-wider">Website URL</label>
                          <input className="w-full bg-primary/5 border border-primary/50 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" value={formData.website_url} onChange={(e) => setFormData({...formData, website_url: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted uppercase tracking-wider">Application URL</label>
                          <input className="w-full bg-primary/5 border border-primary/50 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" value={formData.application_url} onChange={(e) => setFormData({...formData, application_url: e.target.value})} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Venue</label>
                        <input className="w-full bg-primary/5 border border-primary/50 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
              
              <div className="p-6 border-t border-border bg-surface-container/30 flex justify-end gap-3">
                <Button variant="ghost" onClick={closeAndReset} disabled={isGenerating}>Cancel</Button>
                {!isAutoFilled ? (
                  <Button variant="ai" onClick={handleAutoFill} disabled={isGenerating}>
                    {isGenerating ? <div className="h-4 w-4 mr-2 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                    {isGenerating ? "Generating..." : "Auto-fill with AI"}
                  </Button>
                ) : (
                  <Button variant="primary" onClick={saveProgramme} disabled={isGenerating}>
                    {isGenerating ? <div className="h-4 w-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Server className="h-4 w-4 mr-2" />}
                    {isGenerating ? "Saving..." : "Confirm & Save"}
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
