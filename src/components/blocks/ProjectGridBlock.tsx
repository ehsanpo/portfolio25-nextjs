"use client";

import React from "react";
import { ProjectCard } from "../ui/ProjectCard";

export interface Project {
  id?: number | undefined;
  title: string;
  description?: string | undefined;
  image?: string;
  href?: string; // Link to portfolio detail page
  caseStudyUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies?: string[];
  category?: string[] | undefined;
  tags?: string[];
  [key: string]: unknown;
}

export interface ProjectGridBlockProps {
  title?: string;
  projects: Project[];
  columns?: 2 | 3 | 4;
}

export function ProjectGridBlock({
  title,
  projects,
  columns = 3,
}: Readonly<ProjectGridBlockProps>) {
  const getGridClasses = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold font-basement text-center mb-12">
            {title}
          </h2>
        )}
        <div className={`grid gap-8 ${getGridClasses()}`}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              caseStudyUrl={project.caseStudyUrl}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
              href={project.href} // Add href for portfolio detail page links
              technologies={project.technologies || []}
              category={project.category}
              variant="default"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
