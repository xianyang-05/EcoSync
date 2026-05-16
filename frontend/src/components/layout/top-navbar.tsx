"use client";

import { Bell, Search, Sparkles, ChevronDown } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TopNavbarProps {
  title: string;
  subtitle?: string;
  userName?: string;
  userRole?: string;
  sidebarCollapsed?: boolean;
}

export function TopNavbar({
  title,
  subtitle,
  userName = "Alex Chen",
  userRole = "Admin",
  sidebarCollapsed = false,
}: TopNavbarProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-14 border-b border-border bg-surface/80 backdrop-blur-md transition-all duration-300",
        sidebarCollapsed ? "left-16" : "left-56"
      )}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left: Page title */}
        <div>
          <h2 className="text-sm font-semibold text-foreground tracking-tight">{title}</h2>
          {subtitle && <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{subtitle}</p>}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 w-64">
            <Search className="h-3.5 w-3.5 text-muted-light" />
            <input
              type="text"
              placeholder="Search ecosystem..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-light outline-none w-full font-mono"
            />
            <kbd className="text-[10px] text-muted-light bg-surface-container border border-border rounded-sm px-1 py-0.5 font-mono">⌘K</kbd>
          </div>

          {/* AI Assistant */}
          <button className="relative rounded-md border border-primary-border bg-primary-subtle p-2 transition-colors hover:bg-primary-glow cursor-pointer">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
          </button>

          {/* Notifications */}
          <button className="relative rounded-md border border-border bg-surface-container p-2 transition-colors hover:bg-surface-container-high cursor-pointer">
            <Bell className="h-4 w-4 text-muted" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-danger" />
          </button>

          {/* User */}
          <div className="flex items-center gap-2 pl-3 border-l border-border cursor-pointer">
            <Avatar name={userName} size="sm" />
            <div className="hidden lg:block">
              <p className="text-xs font-medium text-foreground">{userName}</p>
              <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{userRole}</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-muted" />
          </div>
        </div>
      </div>
    </header>
  );
}
