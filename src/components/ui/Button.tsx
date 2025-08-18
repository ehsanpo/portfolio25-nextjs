"use client";

import React from "react";
import { cn } from "../../lib/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "gradient"
  | "glass";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  isLoading?: boolean;
}

const buttonVariants = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-lg hover:shadow-primary-500/25",
  secondary:
    "bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 shadow-lg hover:shadow-secondary-500/25",
  outline:
    "bg-transparent border-2 border-border text-foreground hover:bg-muted focus:ring-primary-500",
  ghost: "bg-transparent text-foreground hover:bg-muted focus:ring-primary-500",
  danger:
    "bg-error-500 text-white hover:bg-error-600 focus:ring-error-500 shadow-lg hover:shadow-error-500/25",
  gradient:
    "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-lg animate-gradient",
  glass:
    "glass-card text-foreground hover:bg-white/20 dark:hover:bg-black/20 shadow-xl",
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium font-basement rounded-lg transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "transform hover:scale-105 active:scale-95",
        "relative overflow-hidden group",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <span className="relative z-10 flex items-center">
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
            Loading...
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
}
