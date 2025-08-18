"use client";

import React, { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { Linkedin, Quote } from "lucide-react";
import { cn } from "../../utils/cn";

interface TestimonialCardProps {
  name: string;
  position: string;
  company?: string;
  avatar?: string;
  shortTestimonial: string;
  fullTestimonial: string;
  linkedinUrl?: string;
  rating?: number;
  variant?: "default" | "glass" | "gradient";
  className?: string;
}

export function TestimonialCard({
  name,
  position,
  company,
  avatar,
  shortTestimonial,
  fullTestimonial,
  linkedinUrl,
  rating,
  variant = "default",
  className,
}: TestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={cn(
          "text-lg",
          index < rating ? "text-warning-500" : "text-muted"
        )}
      >
        ★
      </span>
    ));
  };

  return (
    <Card
      variant={variant}
      hover
      padding="lg"
      className={cn("relative overflow-hidden", className)}
    >
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 opacity-20">
        <Quote className="w-8 h-8 text-primary-500" />
      </div>

      {/* Header with Avatar and Info */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex-shrink-0">
          {avatar && !imageError ? (
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              className="w-16 h-16 rounded-full object-cover border-2 border-border/50"
              onError={handleImageError}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border-2 border-primary-500/30 flex items-center justify-center">
              <span className="text-lg font-bold font-basement text-primary-500">
                {getInitials(name)}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold font-basement text-foreground text-lg">
                {name}
              </h4>
              <p className="text-sm text-muted-foreground font-kabel">
                {position}
                {company && (
                  <>
                    <span className="mx-1">at</span>
                    <span className="text-primary-500">{company}</span>
                  </>
                )}
              </p>

              {/* Rating */}
              {rating && (
                <div className="flex items-center mt-2">
                  {renderStars(rating)}
                  <span className="ml-2 text-xs text-muted-foreground font-kabel">
                    {rating}/5
                  </span>
                </div>
              )}
            </div>

            {/* LinkedIn Link */}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass-card hover:bg-primary-500/10 transition-all duration-300 hover:scale-110 group"
                aria-label={`View ${name}'s LinkedIn profile`}
              >
                <Linkedin className="w-5 h-5 text-primary-500 group-hover:text-primary-400" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Testimonial Content */}
      <div className="space-y-4">
        <blockquote className="text-foreground font-kabel leading-relaxed">
          "{isExpanded ? fullTestimonial : shortTestimonial}"
        </blockquote>

        {/* Read More/Less Button */}
        {shortTestimonial !== fullTestimonial && (
          <div className="flex justify-start">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="text-primary-500 hover:text-primary-400 p-0 h-auto font-kabel"
            >
              {isExpanded ? "Read less" : "Read more"}
            </Button>
          </div>
        )}

        {/* Badge for verified or featured testimonials */}
        <div className="flex justify-end">
          <Badge variant="primary" className="text-xs">
            Verified Review
          </Badge>
        </div>
      </div>

      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
}
