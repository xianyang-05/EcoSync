"use client";

import { cn } from "@/lib/utils";
import { Sparkles, Check, X, Eye, Building2, User, TrendingUp } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";

interface MatchCardProps {
  startupName: string;
  startupDomain: string;
  startupStage: string;
  targetName: string;
  targetRole: string;
  matchScore: number;
  aiReasoning: string;
  status: "pending" | "approved" | "rejected";
  factors: { label: string; score: number }[];
  onApprove?: () => void;
  onReject?: () => void;
  onAnalyze?: () => void;
  className?: string;
}

function CircularProgress({ score, size = 72 }: { score: number; size?: number }) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = ((100 - score) / 100) * circumference;

  const getColor = () => {
    if (score >= 85) return "#4ade80";
    if (score >= 70) return "#BFF549";
    if (score >= 50) return "#fbbf24";
    return "#f87171";
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#262626"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="butt"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold font-mono text-foreground">{score}%</span>
      </div>
    </div>
  );
}

export function MatchCard({
  startupName,
  startupDomain,
  startupStage,
  targetName,
  targetRole,
  matchScore,
  aiReasoning,
  status,
  factors,
  onApprove,
  onReject,
  onAnalyze,
  className,
}: MatchCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface-card overflow-hidden transition-all duration-200 hover:border-surface-variant",
        status === "pending" && "border-l-2 border-l-primary",
        className
      )}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-primary-subtle p-2 border border-primary-border/30">
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">{startupName}</h4>
              <p className="text-xs font-mono text-muted">{startupDomain} · {startupStage}</p>
            </div>
          </div>
          <Badge variant={status === "pending" ? "ai" : status === "approved" ? "success" : "danger"}>
            {status === "pending" ? "Pending" : status === "approved" ? "Approved" : "Rejected"}
          </Badge>
        </div>

        {/* Match visualization */}
        <div className="flex items-center gap-4 mb-4 p-3 rounded-md bg-surface-container border border-border">
          <CircularProgress score={matchScore} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-3.5 w-3.5 text-muted" />
              <span className="text-sm font-medium text-foreground">{targetName}</span>
              <span className="text-xs font-mono text-muted">· {targetRole}</span>
            </div>
            <div className="space-y-1.5">
              {factors.slice(0, 3).map((factor, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-muted w-20 truncate">{factor.label}</span>
                  <div className="flex-1 h-0.5 bg-border overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-muted w-8 text-right">{factor.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="rounded-md border border-primary-border bg-primary-subtle p-3 mb-4">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">AI Reasoning</span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">{aiReasoning}</p>
        </div>

        {/* Actions */}
        {status === "pending" && (
          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" onClick={onApprove} className="flex-1">
              <Check className="h-3.5 w-3.5" />
              Approve
            </Button>
            <Button variant="secondary" size="sm" onClick={onReject} className="flex-1">
              <X className="h-3.5 w-3.5" />
              Reject
            </Button>
            <Button variant="ghost" size="icon" onClick={onAnalyze}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
