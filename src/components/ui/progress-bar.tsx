import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "warning" | "danger";
  className?: string;
}

const colorStyles = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

const sizeStyles = {
  sm: "h-0.5",
  md: "h-1",
  lg: "h-1.5",
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  size = "md",
  color = "primary",
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, (value / max) * 100);

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-xs font-medium text-muted">{label}</span>}
          {showValue && <span className="text-xs font-mono text-muted">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={cn("w-full bg-border overflow-hidden", sizeStyles[size])}>
        <div
          className={cn("h-full transition-all duration-700 ease-out", colorStyles[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
