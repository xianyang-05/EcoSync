"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Users, Calendar, MessageSquare, Video, ArrowUpRight } from "lucide-react";

const myMentors = [
  { name: "Dr. Sarah Kim", role: "Lead Technical Mentor", expertise: "AI Architecture", status: "Active", nextSession: "Tomorrow, 2:00 PM" },
  { name: "James Wilson", role: "Strategy Advisor", expertise: "B2B Sales", status: "Active", nextSession: "Next Week" },
];

export default function StartupMentorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Mentors</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Your advisory network</p>
        </div>
        <Button variant="secondary" size="sm">Find New Mentors</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {myMentors.map((mentor, i) => (
          <Card key={i} className={i === 0 ? "border-t-2 border-t-primary" : ""}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar name={mentor.name} size="md" />
                <div>
                  <h4 className="text-base font-semibold text-foreground">{mentor.name}</h4>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{mentor.role}</p>
                </div>
              </div>
              <Badge variant="success">{mentor.status}</Badge>
            </div>
            
            <div className="mb-6 space-y-2">
              <p className="text-sm text-muted"><span className="font-medium text-foreground">Expertise:</span> {mentor.expertise}</p>
              <div className="flex items-center gap-2 p-2 rounded bg-surface-container border border-border text-xs text-foreground">
                <Calendar className="h-3.5 w-3.5 text-primary" /> Next Session: {mentor.nextSession}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="primary" className="flex-1"><Video className="h-4 w-4" /> Join Call</Button>
              <Button variant="secondary" size="icon"><MessageSquare className="h-4 w-4" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
