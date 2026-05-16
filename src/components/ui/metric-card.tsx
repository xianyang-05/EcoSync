import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  description,
  className,
}: MetricCardProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-surface-card p-5", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-mono font-medium text-muted uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-semibold text-foreground tracking-tight">{value}</p>
        </div>
        <div className="rounded-md bg-primary-subtle p-2.5 border border-primary-border/30">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      {(change || description) && (
        <div className="mt-3 flex items-center gap-2">
          {change && (
            <span
              className={cn(
                "text-xs font-mono font-medium",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-danger",
                changeType === "neutral" && "text-muted"
              )}
            >
              {change}
            </span>
          )}
          {description && (
            <span className="text-xs text-muted-light">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}
