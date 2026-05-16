"use client";

import { useState } from "react";
import { Sidebar, NavItem } from "@/components/layout/sidebar";
import { Avatar } from "@/components/ui/avatar";
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
  { label: "Relationships", href: "/admin/relationships", icon: GitMerge },
  { label: "Ecosystem Graph", href: "/admin/ecosystem-graph", icon: Network },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        items={adminNav}
        role="Programme Organizer"
        roleIcon={Shield}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        userName="Alex Chen"
      />
      <main
        className={cn(
          "transition-all duration-300 min-h-screen relative",
          collapsed ? "ml-16" : "ml-56"
        )}
      >
        <div className="fixed top-0 right-0 h-[72px] px-6 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity z-50">
          <div className="text-right">
            <p className="text-xs font-medium text-foreground">Alex Chen</p>
            <p className="text-[10px] font-mono text-muted uppercase tracking-wider">Programme Organizer</p>
          </div>
          <Avatar name="Alex Chen" size="sm" />
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
