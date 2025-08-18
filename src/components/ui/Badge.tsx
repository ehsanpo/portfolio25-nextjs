import React from "react";
import { cn } from "../../lib/cn";

type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "neutral"
  | "gradient"
  | "glass";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const badgeVariants = {
  primary: "bg-primary-500/20 text-primary-400 border-primary-500/30",
  secondary: "bg-secondary-500/20 text-secondary-400 border-secondary-500/30",
  success: "bg-success-500/20 text-success-400 border-success-500/30",
  warning: "bg-warning-500/20 text-warning-400 border-warning-500/30",
  error: "bg-error-500/20 text-error-400 border-error-500/30",
  neutral: "bg-muted text-muted-foreground border-border",
  gradient:
    "bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-transparent",
  glass: "glass-card text-foreground border-border/50",
};

export function Badge({
  variant = "neutral",
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-basement border transition-all duration-300",
        "hover:scale-105",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
