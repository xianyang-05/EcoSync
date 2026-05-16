"use client";

import { useState } from "react";
import { Sidebar, NavItem } from "@/components/layout/sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { cn } from "@/lib/utils";
import {
  Shield,
  LayoutDashboard,
  GitMerge,
  Network,
  Building2,
  Users,
  GraduationCap,
  BarChart3,
  ScrollText,
} from "lucide-react";

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Pending Matches", href: "/admin/pending-matches", icon: GitMerge, badge: "12", ai: true },
  { label: "Relationships", href: "/admin/relationships", icon: Network },
  { label: "Ecosystem Graph", href: "/admin/ecosystem-graph", icon: Network },
  { label: "Startups", href: "/admin/startups", icon: Building2 },
  { label: "Mentors", href: "/admin/mentors", icon: Users },
  { label: "Programmes", href: "/admin/programmes", icon: GraduationCap },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Logs", href: "/admin/automation-logs", icon: ScrollText, ai: true },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        items={adminNav}
        role="Admin Control"
        roleIcon={Shield}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />
      <TopNavbar
        title="Ecosystem Orchestration"
        subtitle="Admin Control Center"
        userName="Alex Chen"
        userRole="System Admin"
        sidebarCollapsed={collapsed}
      />
      <main
        className={cn(
          "pt-14 transition-all duration-300 min-h-screen",
          collapsed ? "ml-16" : "ml-56"
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
