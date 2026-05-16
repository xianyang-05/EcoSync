"use client";

import { useState } from "react";
import { Sidebar, NavItem } from "@/components/layout/sidebar";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Rocket, LayoutDashboard, UserCircle, Sparkles, GraduationCap, Users, DollarSign, Activity, Building2 } from "lucide-react";

const startupNav: NavItem[] = [
  { label: "Dashboard", href: "/startup/dashboard", icon: LayoutDashboard },
  { label: "My Matches", href: "/startup/matches", icon: Users },
  { label: "AI Matcher", href: "/startup/matcher", icon: Sparkles, ai: true },
  { label: "History", href: "/startup/history", icon: UserCircle, ai: true },
];

export default function StartupLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar items={startupNav} role="Startup" roleIcon={Rocket} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} userName="Jordan Lee" />
      <main className={cn("transition-all duration-300 min-h-screen relative", collapsed ? "ml-16" : "ml-56")}>
        <div className="fixed top-0 right-0 h-[72px] px-6 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity z-50">
          <div className="text-right">
            <p className="text-xs font-medium text-foreground">Jordan Lee</p>
            <p className="text-[10px] font-mono text-muted uppercase tracking-wider">CEO, NovaTech AI</p>
          </div>
          <Avatar name="Jordan Lee" size="sm" />
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
