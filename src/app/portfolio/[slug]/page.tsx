"use client";

import { allPortfolios } from "contentlayer/generated";
import { findContentWithFallback } from "@/lib/i18n";
import { useLanguage } from "@/lib/LanguageContext";
import { notFound, useParams } from "next/navigation";

export default function PortfolioProjectPage() {
  const { currentLanguage } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;

  const project = findContentWithFallback(allPortfolios, slug, currentLanguage);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto prose">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        {project.tagline && (
          <p className="text-xl text-gray-600 mb-4">{project.tagline}</p>
        )}
        <div className="flex gap-4 mb-4">
          {project.category && project.category.length > 0 && (
            <div className="flex gap-2">
              <span className="font-semibold">Categories:</span>
              {project.category.map((cat) => (
                <span
                  key={cat}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
        {project.tag && project.tag.length > 0 && (
          <div className="flex gap-2 mb-4">
            <span className="font-semibold">Tags:</span>
            {project.tag.map((tag) => (
              <span key={tag} className="bg-gray-200 px-2 py-1 rounded text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div dangerouslySetInnerHTML={{ __html: project.body.html }} />
    </article>
  );
}
