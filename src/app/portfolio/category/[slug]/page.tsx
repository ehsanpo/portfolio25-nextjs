"use client";

import { allPortfolios } from "contentlayer/generated";
import { filterContentByLanguage, defaultLanguage } from "@/lib/i18n";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PortfolioCategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const categoryName = slug.replace(/-/g, " ");
  const allProjects = filterContentByLanguage(allPortfolios, defaultLanguage);

  // Debug logging
  console.log("Category slug:", slug);
  console.log("Category name:", categoryName);
  console.log("All projects count:", allProjects.length);
  console.log("Sample project categories:", allProjects[0]?.category);

  // Filter projects that have the category (case insensitive)
  const projects = allProjects.filter((project) => {
    const hasCategory = project.category?.some(
      (cat) => cat.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
    );
    console.log(
      `Project ${project.title} categories:`,
      project.category,
      "matches:",
      hasCategory
    );
    return hasCategory;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{categoryName} Projects</h1>

      {projects.length === 0 ? (
        <p className="text-gray-600">No projects found in this category.</p>
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
              {project.tag && project.tag.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tag.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-200 px-2 py-1 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
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
