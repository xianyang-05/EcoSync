"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon, ChevronLeft, Sparkles, LogOut } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  ai?: boolean;
}

interface SidebarProps {
  items: NavItem[];
  role: string;
  roleIcon: LucideIcon;
  collapsed?: boolean;
  onToggle?: () => void;
  userName?: string;
}

export function Sidebar({ items, role, roleIcon: RoleIcon, collapsed = false, onToggle, userName = "User" }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-[#262626] bg-surface transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-[#262626] shrink-0">
        <div className="rounded-md bg-primary p-1.5 shrink-0">
          <Sparkles className="h-4 w-4 text-primary-on" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-foreground tracking-tight truncate">EcoSync</h1>
          </div>
        )}
      </div>

      {/* Role indicator */}
      <div className={cn("px-3 py-3 border-b border-[#262626] shrink-0", collapsed && "px-2")}>
        <div
          className={cn(
            "flex items-center gap-2 rounded-md bg-primary-subtle border border-primary-border/30 px-3 py-2",
            collapsed && "justify-center px-2"
          )}
        >
          <RoleIcon className="h-3.5 w-3.5 text-primary shrink-0" />
          {!collapsed && (
            <span className="text-xs font-mono font-semibold text-primary uppercase tracking-wider truncate">{role}</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150 group",
                collapsed && "justify-center px-2",
                isActive
                  ? "bg-primary text-primary-on"
                  : "text-muted hover:text-foreground hover:bg-surface-container"
              )}
            >
              <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary-on" : "text-muted-light group-hover:text-foreground")} />
              {!collapsed && (
                <>
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "ml-auto text-[10px] font-mono font-bold rounded-sm px-1.5 py-0.5 shrink-0",
                        isActive
                          ? "bg-primary-on/20 text-primary-on"
                          : "bg-primary-subtle text-primary border border-primary-border/30"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.ai && (
                    <Sparkles
                      className={cn(
                        "ml-auto h-3 w-3 shrink-0",
                        isActive ? "text-primary-on" : "text-primary ai-pulse"
                      )}
                    />
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>



      {/* Footer / User */}
      <div className="mt-auto border-t border-[#262626] p-3 shrink-0">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-xs font-mono text-muted hover:text-foreground hover:bg-surface-container transition-colors cursor-pointer"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
