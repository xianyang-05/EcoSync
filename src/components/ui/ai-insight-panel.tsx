"use client";

import { cn } from "@/lib/utils";
import { Sparkles, ChevronRight, TrendingUp } from "lucide-react";

interface AIInsightPanelProps {
  title?: string;
  insight: string;
  confidence?: number;
  recommendations?: string[];
  className?: string;
  compact?: boolean;
}

export function AIInsightPanel({
  title = "AI Insight",
  insight,
  confidence,
  recommendations,
  className,
  compact = false,
}: AIInsightPanelProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-primary-border bg-primary-subtle overflow-hidden",
        "shadow-ai",
        className
      )}
    >
      <div className={cn("px-4 py-3", compact ? "pb-3" : "pb-2")}>
        <div className="flex items-center gap-2 mb-2">
          <div className="rounded-sm bg-primary p-1">
            <Sparkles className="h-3 w-3 text-primary-on" />
          </div>
          <span className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
            {title}
          </span>
          {confidence !== undefined && (
            <span className="ml-auto text-xs font-mono text-primary/70">
              {confidence}% conf.
            </span>
          )}
        </div>
        <p className={cn("text-sm text-on-surface leading-relaxed", compact && "text-xs")}>
          {insight}
        </p>
      </div>
      {recommendations && recommendations.length > 0 && !compact && (
        <div className="border-t border-primary-border/40 bg-primary-glow px-4 py-3">
          <p className="text-xs font-mono font-medium text-muted mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <TrendingUp className="h-3 w-3" />
            Recommendations
          </p>
          <ul className="space-y-1.5">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-on-surface-variant">
                <ChevronRight className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
