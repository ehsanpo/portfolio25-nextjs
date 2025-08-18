"use client";

import { allPortfolios } from "contentlayer/generated";
import { filterContentByLanguage } from "@/lib/i18n";
import { useLanguage } from "@/lib/LanguageContext";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PortfolioTagPage() {
  const { currentLanguage } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;

  const tagName = slug.replace(/-/g, " ");
  const allProjects = filterContentByLanguage(allPortfolios, currentLanguage);

  // Filter projects that have the tag (case insensitive)
  const projects = allProjects.filter((project) =>
    project.tag?.some((tag) => tag.toLowerCase().replace(/\s+/g, "-") === slug)
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Projects tagged with &ldquo;{tagName}&rdquo;
      </h1>

      {projects.length === 0 ? (
        <p className="text-gray-600">No projects found with this tag.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <article key={project._id} className="border p-6">
              <h2 className="text-2xl font-semibold mb-3">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="hover:underline"
                >
                  {project.title}
                </Link>
              </h2>
              {project.tagline && (
                <p className="text-gray-600 mb-3">{project.tagline}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {project.category?.map((cat) => (
                  <span
                    key={cat}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}

      <Link
        href="/portfolio"
        className="text-blue-500 hover:underline mt-8 inline-block"
      >
        ← Back to all projects
      </Link>
    </div>
  );
}
