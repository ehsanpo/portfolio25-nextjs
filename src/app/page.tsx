"use client";

import { allBlogs, allPortfolios } from "contentlayer/generated";
import { filterContentByLanguage } from "@/lib/i18n";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

export default function Home() {
  const { currentLanguage } = useLanguage();
  const blogs = filterContentByLanguage(allBlogs, currentLanguage).slice(0, 3);
  const portfolios = filterContentByLanguage(
    allPortfolios,
    currentLanguage
  ).slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Welcome to My Portfolio</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
        <div className="grid gap-4">
          {blogs.map((post) => (
            <article key={post._id} className="border p-4">
              <h3 className="text-xl font-semibold mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-2">{post.summary}</p>
              <time className="text-sm text-gray-500">
                {/* {new Date(post.date).toLocaleDateString()} */}
              </time>
            </article>
          ))}
        </div>
        <Link
          href="/blog"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          View all posts →
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Portfolio Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolios.map((project) => (
            <article key={project._id} className="border p-4">
              <h3 className="text-xl font-semibold mb-2">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="hover:underline"
                >
                  {project.title}
                </Link>
              </h3>
              {project.tagline && (
                <p className="text-gray-600 mb-2">{project.tagline}</p>
              )}
              {project.category && project.category.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {project.category.map((cat) => (
                    <span key={cat} className="bg-gray-200 px-2 py-1 text-sm">
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
        <Link
          href="/portfolio"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          View all projects →
        </Link>
      </section>
    </div>
  );
}
