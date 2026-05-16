"use client";

import { useState } from "react";
import { Sidebar, NavItem } from "@/components/layout/sidebar";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Users, LayoutDashboard, Building2, Sparkles, Calendar, Brain } from "lucide-react";

const mentorNav: NavItem[] = [
  { label: "Dashboard", href: "/mentor/dashboard", icon: LayoutDashboard },
  { label: "My Matches", href: "/mentor/matches", icon: Users },
  { label: "History of Meeting", href: "/mentor/history", icon: Brain, ai: true },
];

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar items={mentorNav} role="Mentor" roleIcon={Users} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} userName="Dr. Sarah Kim" />
      <main className={cn("transition-all duration-300 min-h-screen relative", collapsed ? "ml-16" : "ml-56")}>
        <div className="fixed top-0 right-0 h-[72px] px-6 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity z-50">
          <div className="text-right">
            <p className="text-xs font-medium text-foreground">Dr. Sarah Kim</p>
            <p className="text-[10px] font-mono text-muted uppercase tracking-wider">AI Research Advisor</p>
          </div>
          <Avatar name="Dr. Sarah Kim" size="sm" />
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
