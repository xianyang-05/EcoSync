"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Calendar as CalendarIcon, Clock, Video, FileText, CheckCircle2 } from "lucide-react";

const upcoming = [
  { startup: "NovaTech AI", title: "Architecture Review", date: "Tomorrow", time: "2:00 PM - 3:00 PM", platform: "Google Meet", type: "Technical" },
  { startup: "DataForge", title: "Go-to-Market Strategy", date: "Thu, Nov 18", time: "10:00 AM - 10:45 AM", platform: "Zoom", type: "Strategy" },
  { startup: "QuantumBridge", title: "Introductory Meeting", date: "Fri, Nov 19", time: "1:00 PM - 1:30 PM", platform: "Google Meet", type: "Intro" },
];

const past = [
  { startup: "BioSynth Labs", title: "Clinical Trial Phase 1", date: "Yesterday", status: "Completed", notes: true },
  { startup: "GreenLeaf IoT", title: "Pilot Deployment Review", date: "Last Week", status: "Completed", notes: true },
  { startup: "NovaTech AI", title: "Data Pipeline Scalability", date: "2 Weeks Ago", status: "Completed", notes: true },
];

export default function MentorSessionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Sessions</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Manage your mentoring schedule</p>
        </div>
        <Button variant="primary" size="sm"><CalendarIcon className="h-3.5 w-3.5" /> Sync Calendar</Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Upcoming Sessions</CardTitle></CardHeader>
          <div className="space-y-4">
            {upcoming.map((session, i) => (
              <div key={i} className="p-4 rounded-md border border-border bg-surface-container flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                <div className="flex items-center gap-3">
                  <Avatar name={session.startup} size="sm" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{session.title}</h4>
                    <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{session.startup} · {session.type}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CalendarIcon className="h-3.5 w-3.5 text-muted" /> {session.date}, {session.time}
                  </div>
                  <Button variant="primary" size="sm" className="w-full sm:w-auto"><Video className="h-3.5 w-3.5" /> Join {session.platform}</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Past */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Past Sessions</CardTitle></CardHeader>
          <div className="space-y-2">
            {past.map((session, i) => (
              <div key={i} className="flex items-center justify-between p-3 border-b border-border-light last:border-0 hover:bg-surface-container/50 transition-colors rounded-md">
                <div className="flex items-center gap-3">
                  <Avatar name={session.startup} size="sm" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{session.title}</h4>
                    <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{session.startup} · {session.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="success">{session.status}</Badge>
                  {session.notes && <Button variant="ghost" size="icon"><FileText className="h-4 w-4 text-muted" /></Button>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
