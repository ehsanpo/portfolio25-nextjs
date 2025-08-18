"use client";

import { allPortfolios } from "contentlayer/generated";
import { findContentWithFallback } from "@/lib/i18n";
import { useLanguage } from "@/lib/LanguageContext";
import { notFound, useParams } from "next/navigation";
import { CaseStudyLayout } from "@/components/layouts/CaseStudyLayout";

export default function PortfolioProjectPage() {
  const { currentLanguage } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;

  const project = findContentWithFallback(allPortfolios, slug, currentLanguage);

  if (!project) {
    notFound();
  }

  // Convert contentlayer data to CaseStudyLayout props
  const caseStudyData = {
    title: project.title,
    subtitle: project.tagline,
    description: project.description || project.tagline || project.title,
    heroImage: project.background_image || project.cover,
    client: project.client,
    role: "Full Stack Developer", // Default role since not in schema
    duration: project.port_date
      ? project.port_date[0] || "3 months"
      : "3 months",
    team: [], // Not in schema, using empty array
    technologies: project.tag || [],
    category: project.category || ["Web Development"],
    status: "completed" as const,
    demoUrl: project.case_link_url,
    githubUrl: undefined, // Not in schema
    sections: [
      {
        id: "overview",
        title: "Project Overview",
        content: project.body.html,
        images: project.images
          ? project.images.map((img, index) => ({
              id: `image-${index}`,
              src: img,
              alt: `${project.title} screenshot ${index + 1}`,
              title: `${project.title} - Image ${index + 1}`,
            }))
          : undefined,
      },
    ],
    outcomes: [], // Not in schema
    challenges: [], // Not in schema
    learnings: [], // Not in schema
    nextSteps: [], // Not in schema
  };

  return <CaseStudyLayout {...caseStudyData} />;
}
