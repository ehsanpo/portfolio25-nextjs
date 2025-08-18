import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../lib/cn";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case "light":
        return (
          <Sun className="w-5 h-5 text-primary-500 transition-transform group-hover:rotate-12" />
        );
      case "dark":
        return (
          <Moon className="w-5 h-5 text-primary-500 transition-transform group-hover:rotate-12" />
        );
      default:
        return (
          <Moon className="w-5 h-5 text-primary-500 transition-transform group-hover:rotate-12" />
        );
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative p-2 rounded-lg transition-all duration-300",
        "glass-card hover:scale-105 active:scale-95",
        "border border-border/50",
        "group overflow-hidden"
      )}
    >
      <div className="relative z-10 flex items-center justify-center w-6 h-6">
        {getIcon()}
      </div>

      {/* Glossy effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}
