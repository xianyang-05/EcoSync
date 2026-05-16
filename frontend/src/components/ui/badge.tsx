import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "secondary" | "ai" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-primary-subtle text-primary",
  success: "bg-success-container text-success",
  warning: "bg-warning-container text-warning",
  danger: "bg-danger-container text-danger",
  secondary: "bg-surface-container-high text-muted",
  ai: "bg-primary-glow text-primary border border-primary-border",
  outline: "bg-transparent text-muted border border-border",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-xs font-medium font-mono tracking-wider uppercase",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
