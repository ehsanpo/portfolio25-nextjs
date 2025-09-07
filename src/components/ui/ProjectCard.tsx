"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "../cards/Card";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { ShareButtons } from "./ShareButtons";
import {
  ExternalLink,
  Github,
  Calendar,
  Users,
  Star,
  Eye,
  Heart,
  MoreHorizontal,
  Code,
  Palette,
  Smartphone,
} from "lucide-react";
import { cn } from "../../lib/cn";

interface ProjectCardProps {
  title: string;
  description: string | undefined;
  image?: string;
  technologies: string[];
  category?: string | string[];
  status?: "completed" | "in-progress" | "concept";
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  href?: string; // Link to portfolio detail page
  date?: string;
  team?: string[];
  featured?: boolean;
  likes?: number;
  views?: number;
  variant?: "default" | "glass" | "gradient" | "neon";
  size?: "small" | "medium" | "large";
  showShare?: boolean;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  category,
  status = "completed",
  demoUrl,
  githubUrl,
  caseStudyUrl,
  href,
  date,
  team,
  featured = false,
  likes = 0,
  views = 0,
  variant = "default",
  size = "medium",
  showShare = true,
  className,
}: Readonly<ProjectCardProps>) {
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const getStatusBadge = () => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "in-progress":
        return <Badge variant="warning">In Progress</Badge>;
      case "concept":
        return <Badge variant="neutral">Concept</Badge>;
      default:
        return null;
    }
  };

  const getCategoryIcon = () => {
    // Handle both string and array cases for category
    const categoryStr = Array.isArray(category) ? category[0] : category;
    switch (categoryStr?.toLowerCase()) {
      case "web":
        return <Code className="w-4 h-4" />;
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "design":
        return <Palette className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  const sizeClasses = {
    small: "aspect-video",
    medium: "aspect-[4/3]",
    large: "aspect-[3/2]",
  };

  const cardContent = (
    <Card
      variant={variant}
      hover
      padding="lg"
      className={cn("relative overflow-hidden group", className)}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="gradient" className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            Featured
          </Badge>
        </div>
      )}

      {/* Project Image */}
      {image && (
        <div
          className={cn(
            "relative overflow-hidden rounded-lg mb-4",
            sizeClasses[size]
          )}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex items-center space-x-3">
              {demoUrl && (
                <Button variant="glass" size="sm" className="text-white">
                  <ExternalLink size={16} />
                </Button>
              )}
              {githubUrl && (
                <Button variant="glass" size="sm" className="text-white">
                  <Github size={16} />
                </Button>
              )}
              {caseStudyUrl && (
                <Button variant="glass" size="sm" className="text-white">
                  <Eye size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Project Info */}
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              {category && (
                <div className="flex items-center space-x-1 text-muted-foreground">
                  {getCategoryIcon()}
                  <span className="text-xs font-kabel">{category}</span>
                </div>
              )}
              {getStatusBadge()}
            </div>

            <h3 className="font-semibold font-basement text-foreground text-lg mb-2 truncate">
              {title}
            </h3>

            <p className="text-sm text-muted-foreground font-kabel leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          {/* More Actions */}
          <div className="relative ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-2"
            >
              <MoreHorizontal size={16} />
            </Button>

            {showShareMenu && showShare && (
              <div className="absolute right-0 top-full mt-2 z-20">
                <div className="glass-card p-4 rounded-lg border border-border/50 min-w-[200px]">
                  <ShareButtons
                    url={demoUrl || window.location.href}
                    title={title}
                    description={description}
                    variant="minimal"
                    showLabels={false}
                    platforms={["twitter", "linkedin", "copy"]}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.slice(0, 4).map((tech, index) => (
            <Badge key={index} variant="neutral" className="text-xs">
              {tech}
            </Badge>
          ))}
          {technologies.length > 4 && (
            <Badge variant="neutral" className="text-xs">
              +{technologies.length - 4} more
            </Badge>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground font-kabel">
          <div className="flex items-center space-x-4">
            {date && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{date}</span>
              </div>
            )}
            {team && team.length > 0 && (
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>
                  {team.length} member{team.length > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {views > 0 && (
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{views}</span>
              </div>
            )}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center space-x-1 hover:text-error-500 transition-colors"
            >
              <Heart
                className={cn(
                  "w-3 h-3",
                  isLiked && "fill-current text-error-500"
                )}
              />
              <span>{likes + (isLiked ? 1 : 0)}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-2">
          {demoUrl && (
            <Button
              variant="gradient"
              size="sm"
              className="flex items-center gap-2"
            >
              <ExternalLink size={14} />
              Live Demo
            </Button>
          )}
          {githubUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Github size={14} />
              Code
            </Button>
          )}
          {caseStudyUrl && (
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <Eye size={14} />
              Case Study
            </Button>
          )}
        </div>
      </div>

      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );

  // Return the card wrapped in Link if href is provided
  return href ? (
    <Link href={href} className="block">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}
