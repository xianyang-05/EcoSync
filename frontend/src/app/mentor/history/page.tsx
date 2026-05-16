"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Search, Filter, Play, Brain, Download, FileText, ArrowRight, Sparkles, Users } from "lucide-react";
import { useState } from "react";

const meetingHistory = [
  {
    id: "m-1",
    startup: "NovaTech AI",
    date: "Nov 15, 2026",
    duration: "45 min",
    type: "Architecture Review",
    programme: "Q4 DeepTech Accelerator",
    aiSummary: "The session focused on scaling the NLP infrastructure for edge devices. NovaTech agreed to migrate to a microservices architecture. Key blocker identified in the data pipeline throughput.",
    actionItems: ["Review AWS architecture proposal", "Intro to data engineer contact"],
    recordingUrl: "recording-placeholder-1.mp4"
  },
  {
    id: "m-2",
    startup: "DataForge",
    date: "Nov 09, 2026",
    duration: "60 min",
    type: "Product Roadmap Review",
    programme: "Enterprise SaaS Batch 3",
    aiSummary: "Discussed the Q3 Go-to-Market strategy. The beta launch is on track, but pricing tiers need further validation with early adopters before public release.",
    actionItems: ["Finalize pricing model draft", "Schedule follow-up on customer feedback"],
    recordingUrl: "recording-placeholder-2.mp4"
  },
  {
    id: "m-3",
    startup: "NovaTech AI",
    date: "Oct 26, 2026",
    duration: "30 min",
    type: "Introductory Meeting",
    programme: "Q4 DeepTech Accelerator",
    aiSummary: "Initial meet and greet. Established communication norms and defined the primary goals for the mentorship period. NovaTech is aiming for Series A in 6 months.",
    actionItems: ["Set up bi-weekly check-ins"],
    recordingUrl: "recording-placeholder-3.mp4"
  }
];

export default function MentorHistoryPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [filterStartup, setFilterStartup] = useState("All");
  
  const startups = ["All", "NovaTech AI", "DataForge"];

  const displayData = meetingHistory.filter(m => filterStartup === "All" || m.startup === filterStartup);

  return (
    <div className="space-y-6">
      {/* Sticky Page Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md -mx-6 px-6 pt-6 pb-4 mb-6 -mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Meeting History</h1>
            <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Past sessions and AI summaries</p>
          </div>
          <div className="flex items-center gap-3 mr-48">
            <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5">
              <Search className="h-3.5 w-3.5 text-muted-light" />
              <input suppressHydrationWarning placeholder="Search meetings..." className="bg-transparent text-sm font-mono outline-none w-48 text-foreground placeholder:text-muted-light" />
            </div>
            <select 
              suppressHydrationWarning
              className="bg-surface border border-border rounded-md text-sm font-mono px-3 py-1.5 text-foreground outline-none"
              value={filterStartup}
              onChange={(e) => setFilterStartup(e.target.value)}
            >
              {startups.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <Button suppressHydrationWarning variant="secondary" size="sm"><Filter className="h-3.5 w-3.5" /> More Filters</Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {displayData.map((m, i) => (
          <Card key={i} onClick={() => setSelectedMeeting(m)} className="hover:border-primary/50 transition-colors cursor-pointer group flex flex-col">
            <div className="p-5 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar name={m.startup} size="sm" />
                  <div>
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{m.startup}</h3>
                    <p className="text-[10px] font-mono text-muted uppercase tracking-wider mt-0.5">{m.programme}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{m.date.split(',')[0]}</p>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{m.date.split(',')[1]}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <Badge variant="secondary" className="mb-2">{m.type}</Badge>
                <div className="flex items-center gap-2 text-xs font-mono text-muted mt-2">
                  <Play className="h-3.5 w-3.5" />
                  <span>{m.duration} Recorded</span>
                </div>
              </div>

              <div className="bg-surface-container/30 p-3 rounded-lg border border-border">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Brain className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold">AI Summary Preview</span>
                </div>
                <p className="text-xs text-muted line-clamp-2 leading-relaxed">{m.aiSummary}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Meeting Details Modal / Panel */}
      {selectedMeeting && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSelectedMeeting(null)} />
          <div className="relative w-full max-w-4xl bg-surface border border-border shadow-2xl rounded-xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-border bg-surface-container/30 shrink-0">
              <div className="flex items-center gap-4">
                <Avatar name={selectedMeeting.startup} size="lg" />
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selectedMeeting.type}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium text-foreground">{selectedMeeting.startup}</span>
                    <span className="text-muted text-xs">•</span>
                    <span className="text-xs font-mono text-muted uppercase tracking-wider">{selectedMeeting.date}</span>
                    <span className="text-muted text-xs">•</span>
                    <span className="text-xs font-mono text-muted uppercase tracking-wider">{selectedMeeting.duration}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedMeeting(null)}>✕</Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 grid md:grid-cols-[1fr_350px] gap-8">
              {/* Left Column: Recording & Details */}
              <div className="space-y-6">
                <div className="aspect-video rounded-lg border border-border relative overflow-hidden group">
                  {/* Mock Video Grid */}
                  <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1 bg-[#111]">
                    {/* Participant 1 */}
                    <div className="relative bg-[#222] rounded-md overflow-hidden flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                        <Users className="w-8 h-8 text-white/20" />
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-xs text-white/90 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        You
                      </div>
                    </div>
                    {/* Participant 2 */}
                    <div className="relative bg-[#222] rounded-md overflow-hidden flex items-center justify-center">
                      <div className="scale-150">
                        <Avatar name={selectedMeeting.startup} size="lg" />
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-xs text-white/90 flex items-center gap-2">
                        {selectedMeeting.startup}
                      </div>
                    </div>
                  </div>

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-[2px]">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-white/90 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                      <Play className="h-6 w-6 text-black ml-1" />
                    </div>
                  </div>
                  
                  {/* Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <Badge variant="outline" className="bg-black/50 backdrop-blur-md text-white border-white/10 font-mono">00:00 / {selectedMeeting.duration}</Badge>
                    <Button variant="secondary" size="sm" className="h-7 text-xs bg-black/50 backdrop-blur-md text-white hover:bg-white/10 border-white/10"><Download className="h-3 w-3 mr-1.5" /> Download</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><FileText className="h-4 w-4" /> Session Transcript Summary</h3>
                  <div className="p-4 bg-surface-container/30 border border-border rounded-lg text-sm text-muted leading-relaxed">
                    <p>The discussion centered on resolving latency bottlenecks within the edge NLP infrastructure. Both parties identified the current monolithic architecture as the primary cause of processing delays when handling batches larger than 50. It was agreed that migrating the inference endpoints to a microservices-based architecture is the necessary next step. Follow-up actions include reviewing an AWS architecture proposal and connecting with a specialized data engineer to streamline the pipeline throughput.</p>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Insights & Actions */}
              <div className="space-y-6">
                <div className="p-5 border border-primary/30 bg-primary/5 rounded-lg relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-primary/10">
                    <Brain className="w-24 h-24" />
                  </div>
                  <h3 className="text-xs font-mono text-primary uppercase tracking-wider font-bold mb-3 flex items-center gap-2 relative z-10">
                    <Sparkles className="h-3.5 w-3.5" /> AI Summary
                  </h3>
                  <p className="text-sm text-foreground leading-relaxed relative z-10">
                    {selectedMeeting.aiSummary}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-mono text-muted uppercase tracking-wider font-bold mb-3">Action Items Detected</h3>
                  <div className="space-y-2">
                    {selectedMeeting.actionItems.map((item: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-surface-container border border-border rounded-lg">
                        <div className="w-4 h-4 rounded border border-muted mt-0.5 shrink-0" />
                        <p className="text-sm text-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
