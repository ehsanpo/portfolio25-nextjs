"use client";

import { allBlogs } from "contentlayer/generated";
import { findContentWithFallback } from "@/lib/i18n";
import { useLanguage } from "@/lib/LanguageContext";
import { notFound, useParams } from "next/navigation";
import { ArticleLayout } from "@/components/layouts/ArticleLayout";

export default function BlogPostPage() {
  const { currentLanguage } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;

  const post = findContentWithFallback(allBlogs, slug, currentLanguage);

  if (!post) {
    notFound();
  }

  // Convert contentlayer data to ArticleLayout props
  const articleData = {
    title: post.title,
    excerpt: post.summary,
    content: [
      {
        id: "main-content",
        title: "",
        content: post.body.html,
        type: "text" as const,
      },
    ],
    publishDate: post.date,
    readTime: `${Math.ceil(post.body.html.split(" ").length / 200)} min read`,
    tags: post.tags || [],
    author: {
      name: "Ehsan Pourhadi",
      bio: "Full Stack Developer & Designer",
      avatar: "/images/avatar.jpg",
      social: {
        twitter: "https://twitter.com/ehsanpourhadi",
        linkedin: "https://linkedin.com/in/ehsanpourhadi",
        github: "https://github.com/ehsanpourhadi",
      },
    },
    relatedArticles: [], // You can implement related articles logic here
  };

  return <ArticleLayout {...articleData} />;
}
