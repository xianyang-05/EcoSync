"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Users, Search, ArrowUpRight, Star, Calendar } from "lucide-react";

const mentors = [
  { name: "Dr. Sarah Kim", expertise: "AI / Machine Learning", startups: 4, sessions: 32, rating: 4.9, availability: "available", nextSlot: "Tomorrow" },
  { name: "James Wilson", expertise: "Business Strategy", startups: 3, sessions: 24, rating: 4.7, availability: "available", nextSlot: "Today" },
  { name: "Priya Sharma", expertise: "Growth / Marketing", startups: 5, sessions: 41, rating: 4.8, availability: "busy", nextSlot: "Next week" },
  { name: "Michael Torres", expertise: "Cybersecurity", startups: 2, sessions: 15, rating: 4.3, availability: "available", nextSlot: "Thursday" },
  { name: "Dr. Lisa Park", expertise: "Biotech / Health", startups: 3, sessions: 28, rating: 4.6, availability: "available", nextSlot: "Friday" },
  { name: "Prof. Emily Zhang", expertise: "NLP / Transformers", startups: 1, sessions: 8, rating: 4.9, availability: "available", nextSlot: "Wednesday" },
];

export default function MentorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Mentors</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mt-1">Manage ecosystem mentors</p>
        </div>
        <Button variant="primary" size="sm"><Users className="h-3.5 w-3.5" /> Add Mentor</Button>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>{mentors.length} Mentors</CardTitle>
          <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-muted-light" />
            <input placeholder="Search..." className="bg-transparent text-sm font-mono outline-none w-48 text-foreground placeholder:text-muted-light" />
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface-container">
                {["Mentor", "Expertise", "Startups", "Sessions", "Rating", "Availability", ""].map((h) => (
                  <th key={h} className="text-left text-[10px] font-mono font-semibold text-muted uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mentors.map((m, i) => (
                <tr key={i} className="border-b border-border-light hover:bg-surface-container/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={m.name} size="sm" />
                      <span className="text-sm font-medium text-foreground">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted">{m.expertise}</td>
                  <td className="px-5 py-3.5 text-sm font-mono text-muted">{m.startups}</td>
                  <td className="px-5 py-3.5 text-sm font-mono text-muted">{m.sessions}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-warning fill-warning" />
                      <span className="text-sm font-mono text-foreground">{m.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={m.availability === "available" ? "success" : "warning"}>{m.availability}</Badge>
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
