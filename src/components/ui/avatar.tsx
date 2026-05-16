import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  src?: string;
  className?: string;
}

const sizeMap = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-11 w-11 text-sm",
};

const colors = [
  "bg-primary-subtle text-primary border border-primary-border/30",
  "bg-success-container text-success",
  "bg-warning-container text-warning",
  "bg-surface-container-high text-muted",
  "bg-danger-container text-danger",
  "bg-secondary-container text-secondary",
];

export function Avatar({ name, size = "md", src, className }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const colorIndex = name.charCodeAt(0) % colors.length;

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn("rounded-md object-cover", sizeMap[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-md flex items-center justify-center font-mono font-semibold shrink-0",
        sizeMap[size],
        colors[colorIndex],
        className
      )}
    >
      {initials}
    </div>
  );
}
