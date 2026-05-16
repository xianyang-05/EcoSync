"use client";

import Link from "next/link";
import { Shield, Users, Rocket, Sparkles, ArrowRight, Network } from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  {
    id: "admin",
    label: "Programme Organizer",
    subtitle: "Control Center",
    description: "High-density terminal for global oversight. Access system-level authority, deep analytics, and complete platform governance.",
    icon: Shield,
    href: "/auth/signin?role=admin",
    accentBorder: "border-t-primary",
    cta: "Initialize Subsystem",
    features: ["Match Approvals", "Ecosystem Graph", "Automation Logs", "Analytics"],
  },
  {
    id: "mentor",
    label: "Mentor",
    subtitle: "Productivity Hub",
    description: "Focused guidance environment. Manage portfolios, provide strategic feedback, and foster growth across designated startups.",
    icon: Users,
    href: "/auth/signin?role=mentor",
    accentBorder: "border-t-success",
    cta: "Enter Hub",
    features: ["AI Recommendations", "Session Management", "Startup Insights", "Impact Metrics"],
  },
  {
    id: "startup",
    label: "Startup",
    subtitle: "Growth Assistant",
    description: "Action-oriented interface. Track milestones, interact with AI insights, and execute strategies to scale your venture.",
    icon: Rocket,
    href: "/auth/signin?role=startup",
    accentBorder: "border-t-warning",
    cta: "Launch Dashboard",
    features: ["Growth Pathway", "Mentor Matching", "Funding Radar", "AI Coach"],
  },
];

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-primary p-2">
            <Sparkles className="h-5 w-5 text-primary-on" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">Nexus Ecosystem</h1>
            <p className="text-[10px] font-mono text-muted uppercase tracking-[0.15em]">
              Orchestration Engine
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-muted-light uppercase tracking-wider">
          <Network className="h-3.5 w-3.5" />
          <span>v2.4.0</span>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-8 pt-16 pb-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-sm bg-primary-subtle border border-primary-border px-4 py-1.5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">AI-Powered Platform</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
            Select Your Interface
          </h2>
          <p className="text-base text-muted max-w-lg mx-auto leading-relaxed">
            Choose your access level to enter the Nexus Ecosystem. Each portal is optimized for specific roles and capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 group/cards">
          {roles.map((role) => (
            <Link
              key={role.id}
              href={role.href}
              className={cn(
                "group relative flex flex-col rounded-lg border border-border bg-surface-card p-6",
                "border-t-2",
                role.accentBorder,
                "transition-all duration-500",
                "group-hover/cards:scale-[0.98] group-hover/cards:opacity-50",
                "hover:!scale-105 hover:!opacity-100 hover:shadow-[0_0_40px_rgba(191,245,73,0.25)] hover:border-primary/50 hover:bg-surface-container hover:z-10"
              )}
            >
              {/* Icon */}
              <div className="rounded-md bg-primary-subtle border border-primary-border/30 p-3 w-fit mb-5 transition-transform duration-300 group-hover:scale-110">
                <role.icon className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-foreground mb-0.5">{role.label}</h3>
              <p className="text-xs font-mono font-medium text-primary uppercase tracking-wider mb-3">
                {role.subtitle}
              </p>
              <p className="text-sm text-muted leading-relaxed mb-5">{role.description}</p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {role.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="h-1 w-1 bg-primary" />
                    <span className="text-xs text-muted">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                <span>{role.cta}</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
