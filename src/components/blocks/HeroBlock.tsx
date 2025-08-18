import React from "react";
import { Button } from "../ui/Button";

export interface HeroBlockProps {
  title?: string;
  subtitle?: string;
  primaryCta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function HeroBlock({
  title = "Welcome",
  subtitle = "Building amazing experiences",
  primaryCta,
  secondaryCta,
}: Readonly<HeroBlockProps>) {
  return (
    <div className="text-center py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold font-basement gradient-text mb-6">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">{subtitle}</p>
        <div className="flex gap-4 justify-center">
          {primaryCta && (
            <Button variant="gradient" size="lg">
              {primaryCta.label}
            </Button>
          )}
          {secondaryCta && (
            <Button variant="outline" size="lg">
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
