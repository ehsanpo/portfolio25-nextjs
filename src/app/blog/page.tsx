"use client";

import { allBlogs } from "contentlayer/generated";
import { filterContentByLanguage } from "@/lib/i18n";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

export default function BlogPage() {
  const { currentLanguage } = useLanguage();
  const blogs = filterContentByLanguage(allBlogs, currentLanguage);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      <div className="grid gap-6">
        {blogs.map((post) => (
          <article key={post._id} className="border p-6">
            <h2 className="text-2xl font-semibold mb-3">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-3">{post.summary}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <time>{new Date(post.date).toLocaleDateString()}</time>
              {post.tags && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-gray-200 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
