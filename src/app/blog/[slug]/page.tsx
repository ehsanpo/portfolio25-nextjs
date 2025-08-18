import { allBlogs } from "contentlayer/generated";
import { findContentWithFallback, defaultLanguage } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findContentWithFallback(allBlogs, slug, defaultLanguage);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = findContentWithFallback(allBlogs, slug, defaultLanguage);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto prose">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex justify-between items-center text-gray-600 mb-4">
          <time>{new Date(post.date).toLocaleDateString()}</time>
          {post.tags && (
            <div className="flex gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-gray-200 px-2 py-1 rounded text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <p className="text-xl text-gray-600">{post.summary}</p>
      </header>

      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </article>
  );
}
