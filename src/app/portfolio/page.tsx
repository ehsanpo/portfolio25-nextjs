"use client";

import { allPortfolios } from "contentlayer/generated";
import { filterContentByLanguage } from "@/lib/i18n";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

export default function PortfolioPage() {
  const { currentLanguage } = useLanguage();
  const projects = filterContentByLanguage(allPortfolios, currentLanguage);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Portfolio</h1>

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
            <div className="flex flex-wrap gap-2 mb-3">
              {project.category?.map((cat) => (
                <Link
                  key={cat}
                  href={`/portfolio/category/${cat
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm hover:bg-blue-200"
                >
                  {cat}
                </Link>
              ))}
            </div>
            {project.tag && (
              <div className="flex flex-wrap gap-2">
                {project.tag.map((tag) => (
                  <Link
                    key={tag}
                    href={`/portfolio/tags/${tag
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="bg-gray-200 px-2 py-1 rounded text-sm hover:bg-gray-300"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
