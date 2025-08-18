"use client";

import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "./Card";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { ShareButtons } from "./ShareButtons";
import { ImageGallery } from "./ImageGallery";
import {
  ExternalLink,
  Github,
  Users,
  Clock,
  Target,
  Lightbulb,
  Zap,
  CheckCircle,
  ArrowRight,
  Code,
  Palette,
  Smartphone,
  Database,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "../../utils/cn";

interface CaseStudySection {
  id: string;
  title: string;
  content: string;
  images?: Array<{
    id: string;
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }>;
  code?: string;
  highlights?: string[];
}

interface CaseStudyLayoutProps {
  title: string;
  subtitle?: string;
  description: string;
  heroImage?: string;
  client?: string;
  role: string;
  duration: string;
  team?: string[];
  technologies: string[];
  category: string | string[]; // Allow both string and array
  status: "completed" | "in-progress" | "concept";
  demoUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
  sections: CaseStudySection[];
  outcomes?: {
    metric: string;
    value: string;
    description: string;
  }[];
  challenges?: string[];
  learnings?: string[];
  nextSteps?: string[];
  variant?: "default" | "glass" | "gradient";
  className?: string;
}

export function CaseStudyLayout({
  title,
  subtitle,
  description,
  heroImage,
  client,
  role,
  duration,
  team = [],
  technologies,
  category,
  status,
  demoUrl,
  githubUrl,
  figmaUrl,
  sections,
  outcomes = [],
  challenges = [],
  learnings = [],
  nextSteps = [],
  variant = "default",
  className,
}: CaseStudyLayoutProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getCategoryIcon = () => {
    // Handle both string and array categories
    const primaryCategory = Array.isArray(category)
      ? category[0]?.toLowerCase() || ""
      : category?.toLowerCase() || "";

    switch (primaryCategory) {
      case "web":
        return <Code className="w-5 h-5 text-blue-500" />;
      case "mobile":
        return <Smartphone className="w-5 h-5 text-green-500" />;
      case "design":
        return <Palette className="w-5 h-5 text-purple-500" />;
      case "backend":
        return <Database className="w-5 h-5 text-orange-500" />;
      default:
        return <Zap className="w-5 h-5 text-primary-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "in-progress":
        return <Badge variant="warning">In Progress</Badge>;
      case "concept":
        return <Badge variant="neutral">Concept</Badge>;
    }
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Hero Section */}
      <Card
        variant="gradient"
        padding="lg"
        className="relative overflow-hidden"
      >
        {heroImage && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={heroImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/20 rounded-lg">
                {getCategoryIcon()}
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="glass">{category}</Badge>
                  {getStatusBadge()}
                </div>
                <h1 className="text-4xl font-bold font-basement text-white mb-2">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xl text-white/80 font-kabel">{subtitle}</p>
                )}
              </div>
            </div>
          </div>

          <p className="text-lg text-white/90 font-kabel leading-relaxed mb-8 max-w-3xl">
            {description}
          </p>

          <div className="flex flex-wrap gap-3">
            {demoUrl && (
              <Button variant="glass" className="flex items-center gap-2">
                <ExternalLink size={16} />
                Live Demo
              </Button>
            )}
            {githubUrl && (
              <Button variant="glass" className="flex items-center gap-2">
                <Github size={16} />
                View Code
              </Button>
            )}
            {figmaUrl && (
              <Button variant="glass" className="flex items-center gap-2">
                <Palette size={16} />
                Design Files
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Project Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="glass" className="text-center">
          <div className="p-6">
            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-primary-400" />
            </div>
            <h3 className="font-basement text-foreground mb-1">Role</h3>
            <p className="text-sm text-muted-foreground font-kabel">{role}</p>
          </div>
        </Card>

        <Card variant="glass" className="text-center">
          <div className="p-6">
            <div className="w-12 h-12 bg-secondary-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-secondary-400" />
            </div>
            <h3 className="font-basement text-foreground mb-1">Duration</h3>
            <p className="text-sm text-muted-foreground font-kabel">
              {duration}
            </p>
          </div>
        </Card>

        {client && (
          <Card variant="glass" className="text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-accent-400" />
              </div>
              <h3 className="font-basement text-foreground mb-1">Client</h3>
              <p className="text-sm text-muted-foreground font-kabel">
                {client}
              </p>
            </div>
          </Card>
        )}

        <Card variant="glass" className="text-center">
          <div className="p-6">
            <div className="w-12 h-12 bg-warning-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-warning-400" />
            </div>
            <h3 className="font-basement text-foreground mb-1">Team</h3>
            <p className="text-sm text-muted-foreground font-kabel">
              {team.length > 0 ? `${team.length} members` : "Solo project"}
            </p>
          </div>
        </Card>
      </div>

      {/* Technologies */}
      <Card variant="glass" padding="lg">
        <CardTitle className="font-basement">Technologies Used</CardTitle>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="primary" className="text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Case Study Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <Card
            key={section.id}
            variant={index % 2 === 0 ? "default" : "glass"}
            padding="lg"
          >
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="font-basement">{section.title}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection(section.id)}
                className="flex items-center gap-2"
              >
                {expandedSections.includes(section.id) ? (
                  <>
                    <ChevronUp size={16} />
                    Collapse
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} />
                    Expand
                  </>
                )}
              </Button>
            </div>

            <CardContent>
              <div className="space-y-6">
                <p className="text-muted-foreground font-kabel leading-relaxed">
                  {section.content}
                </p>

                {section.highlights && section.highlights.length > 0 && (
                  <div>
                    <h4 className="font-medium font-basement text-foreground mb-3">
                      Key Highlights
                    </h4>
                    <ul className="space-y-2">
                      {section.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground font-kabel">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {expandedSections.includes(section.id) && (
                  <div className="space-y-6">
                    {section.images && section.images.length > 0 && (
                      <div>
                        <h4 className="font-medium font-basement text-foreground mb-3">
                          Visual Examples
                        </h4>
                        <ImageGallery
                          images={section.images}
                          variant="grid"
                          columns={3}
                          showTags={false}
                          showInfo={true}
                        />
                      </div>
                    )}

                    {section.code && (
                      <div>
                        <h4 className="font-medium font-basement text-foreground mb-3">
                          Code Example
                        </h4>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <code className="text-sm font-mono text-foreground whitespace-pre-wrap">
                            {section.code}
                          </code>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Outcomes */}
      {outcomes.length > 0 && (
        <Card variant="gradient" padding="lg">
          <CardTitle className="font-basement text-white mb-4">
            Project Outcomes
          </CardTitle>
          <div className="grid md:grid-cols-3 gap-6">
            {outcomes.map((outcome, index) => (
              <div
                key={index}
                className="text-center p-4 glass-card rounded-lg border border-white/20"
              >
                <div className="text-3xl font-bold font-basement text-white mb-2">
                  {outcome.value}
                </div>
                <div className="text-lg font-basement text-white/90 mb-2">
                  {outcome.metric}
                </div>
                <p className="text-sm text-white/70 font-kabel">
                  {outcome.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Challenges & Learnings */}
      <div className="grid md:grid-cols-2 gap-6">
        {challenges.length > 0 && (
          <Card variant="glass" padding="lg">
            <CardTitle className="font-basement">Challenges</CardTitle>
            <CardContent>
              <ul className="space-y-3">
                {challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Lightbulb className="w-5 h-5 text-warning-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground font-kabel">
                      {challenge}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {learnings.length > 0 && (
          <Card variant="default" padding="lg">
            <CardTitle className="font-basement">Key Learnings</CardTitle>
            <CardContent>
              <ul className="space-y-3">
                {learnings.map((learning, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground font-kabel">
                      {learning}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Next Steps */}
      {nextSteps.length > 0 && (
        <Card variant="glass" padding="lg">
          <CardTitle className="font-basement">Next Steps</CardTitle>
          <CardContent>
            <ul className="space-y-3">
              {nextSteps.map((step, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <ArrowRight className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground font-kabel">
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Share Section */}
      <Card variant="gradient" padding="lg">
        <CardTitle className="font-basement text-white mb-4">
          Share This Case Study
        </CardTitle>
        <ShareButtons
          title={title}
          description={description}
          hashtags={[
            "portfolio",
            "casestudy",
            Array.isArray(category)
              ? category[0]?.toLowerCase() || "web"
              : category?.toLowerCase() || "web",
          ]}
          platforms={["twitter", "linkedin", "copy"]}
          variant="minimal"
        />
      </Card>
    </div>
  );
}
