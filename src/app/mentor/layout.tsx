"use client";

import { useState } from "react";
import { Sidebar, NavItem } from "@/components/layout/sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { cn } from "@/lib/utils";
import { Users, LayoutDashboard, Building2, Sparkles, Calendar, Brain } from "lucide-react";

const mentorNav: NavItem[] = [
  { label: "Dashboard", href: "/mentor/dashboard", icon: LayoutDashboard },
  { label: "My Startups", href: "/mentor/startups", icon: Building2 },
  { label: "Recommendations", href: "/mentor/recommendations", icon: Sparkles, ai: true },
  { label: "Sessions", href: "/mentor/sessions", icon: Calendar },
  { label: "Insights", href: "/mentor/insights", icon: Brain, ai: true },
];

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar items={mentorNav} role="Mentor" roleIcon={Users} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <TopNavbar title="Mentor Hub" subtitle="Productivity Center" userName="Dr. Sarah Kim" userRole="AI Research Advisor" sidebarCollapsed={collapsed} />
      <main className={cn("pt-14 transition-all duration-300 min-h-screen", collapsed ? "ml-16" : "ml-56")}>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
