"use client";

import React from "react";
import { cn } from "../../utils/cn";

let cardCounter = 0;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
  variant?: "default" | "glass" | "gradient" | "neon";
  blockReveal?: boolean;
}

const paddingVariants = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const cardVariants = {
  default: "bg-card border border-border shadow-lg",
  glass: "glass-card shadow-2xl",
  gradient:
    "bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/30 shadow-xl",
  neon: "bg-card border-2 border-accent-500/50 shadow-lg shadow-accent-500/20 animate-pulse",
};

export function Card({
  children,
  padding = "md",
  hover = false,
  variant = "default",
  blockReveal = false,
  className,
  ...props
}: CardProps) {
  const cardId = React.useRef(cardCounter++);
  const animationDelay = `${cardId.current * 150}ms`;

  return (
    <div
      className={cn(
        "rounded-xl transition-all duration-300",
        hover && "hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1",
        cardVariants[variant],
        paddingVariants[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pb-4 border-b border-border/50", className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pt-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold font-basement text-card-foreground block-reveal",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground mt-1", className)}
      {...props}
    >
      {children}
    </p>
  );
}
