"use client";

import { useState } from "react";
import { Sidebar, NavItem } from "@/components/layout/sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { cn } from "@/lib/utils";
import { Rocket, LayoutDashboard, UserCircle, Sparkles, GraduationCap, Users, DollarSign, Activity } from "lucide-react";

const startupNav: NavItem[] = [
  { label: "Dashboard", href: "/startup/dashboard", icon: LayoutDashboard },
  { label: "My Profile", href: "/startup/profile", icon: UserCircle },
  { label: "Recommendations", href: "/startup/recommendations", icon: Sparkles, ai: true },
  { label: "Programmes", href: "/startup/programmes", icon: GraduationCap },
  { label: "Mentors", href: "/startup/mentors", icon: Users },
  { label: "Funding", href: "/startup/funding", icon: DollarSign, ai: true },
  { label: "Activity", href: "/startup/activity", icon: Activity },
];

export default function StartupLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar items={startupNav} role="Startup" roleIcon={Rocket} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <TopNavbar title="Growth Assistant" subtitle="Startup Portal" userName="Jordan Lee" userRole="CEO, NovaTech AI" sidebarCollapsed={collapsed} />
      <main className={cn("pt-14 transition-all duration-300 min-h-screen", collapsed ? "ml-16" : "ml-56")}>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
