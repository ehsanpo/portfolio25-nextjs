import React, { useState, useEffect } from "react";
import { Card, CardTitle } from "./Card";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { AuthorCard } from "./AuthorCard";
import { ShareButtons } from "./ShareButtons";
import {
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Tag,
  ChevronUp,
} from "lucide-react";
import { cn } from "../../utils/cn";

interface ArticleSection {
  id: string;
  title: string;
  content: string;
  type?: "text" | "image" | "code" | "quote" | "list";
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  code?: {
    language: string;
    content: string;
  };
  quote?: {
    text: string;
    author?: string;
  };
  list?: {
    type: "ordered" | "unordered";
    items: string[];
  };
}

interface RelatedArticle {
  title: string;
  excerpt: string;
  slug: string;
  readTime: string;
  image?: string;
}

interface ArticleLayoutProps {
  title: string;
  excerpt: string;
  content: ArticleSection[];
  author: {
    name: string;
    avatar?: string;
    bio: string;
    role?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  };
  publishDate: string;
  lastUpdated?: string;
  readTime: string;
  category?: string;
  tags?: string[];
  featuredImage?: string;
  views?: number;
  likes?: number;
  comments?: number;
  relatedArticles?: RelatedArticle[];
  tableOfContents?: boolean;
  showProgress?: boolean;
  variant?: "default" | "glass" | "gradient" | "neon";
  className?: string;
}

export function ArticleLayout({
  title,
  excerpt,
  content,
  author,
  publishDate,
  lastUpdated,
  readTime,
  category,
  tags = [],
  featuredImage,
  views = 0,
  likes = 0,
  comments = 0,
  relatedArticles = [],
  tableOfContents = true,
  showProgress = true,
  variant = "default",
  className,
}: ArticleLayoutProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");

  // Calculate reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderSection = (section: ArticleSection) => {
    switch (section.type) {
      case "image":
        return (
          <div className="my-8">
            {section.image && (
              <figure>
                <img
                  src={section.image.src}
                  alt={section.image.alt}
                  className="w-full rounded-lg shadow-lg"
                />
                {section.image.caption && (
                  <figcaption className="text-sm text-muted-foreground font-kabel text-center mt-2 italic">
                    {section.image.caption}
                  </figcaption>
                )}
              </figure>
            )}
          </div>
        );

      case "code":
        return (
          <div className="my-8">
            <div className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="neutral" className="text-xs">
                  {section.code?.language || "Code"}
                </Badge>
              </div>
              <pre className="text-sm font-mono text-foreground">
                <code>{section.code?.content}</code>
              </pre>
            </div>
          </div>
        );

      case "quote":
        return (
          <div className="my-8">
            <blockquote className="border-l-4 border-primary-500 pl-6 py-4 bg-primary-500/5 rounded-r-lg">
              <p className="text-lg font-kabel italic text-foreground leading-relaxed">
                "{section.quote?.text}"
              </p>
              {section.quote?.author && (
                <cite className="text-sm text-muted-foreground font-basement mt-2 block">
                  — {section.quote.author}
                </cite>
              )}
            </blockquote>
          </div>
        );

      case "list":
        return (
          <div className="my-6">
            {section.list?.type === "ordered" ? (
              <ol className="space-y-2 text-muted-foreground font-kabel leading-relaxed list-decimal list-inside">
                {section.list.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            ) : (
              <ul className="space-y-2 text-muted-foreground font-kabel leading-relaxed">
                {section.list?.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      default:
        return (
          <div className="my-6">
            <p className="text-muted-foreground font-kabel leading-relaxed">
              {section.content}
            </p>
          </div>
        );
    }
  };

  return (
    <div className={cn("max-w-4xl mx-auto", className)}>
      {/* Reading Progress Bar */}
      {showProgress && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-150"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      )}

      {/* Back to Top Button */}
      <Button
        variant="glass"
        size="sm"
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full shadow-lg"
      >
        <ChevronUp size={20} />
      </Button>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Table of Contents */}
        {tableOfContents && content.length > 3 && (
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card variant="glass" className="p-4">
                <h4 className="font-basement text-foreground mb-4">
                  Table of Contents
                </h4>
                <nav className="space-y-2">
                  {content
                    .filter((section) => section.title)
                    .map((section, index) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={cn(
                          "block w-full text-left text-sm font-kabel p-2 rounded transition-colors",
                          activeSection === section.id
                            ? "text-primary-500 bg-primary-500/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                      >
                        {section.title}
                      </button>
                    ))}
                </nav>
              </Card>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div
          className={cn(
            tableOfContents && content.length > 3
              ? "lg:col-span-3"
              : "lg:col-span-4"
          )}
        >
          <article className="space-y-8">
            {/* Article Header */}
            <Card variant={variant} padding="lg">
              {/* Featured Image */}
              {featuredImage && (
                <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
                  <img
                    src={featuredImage}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category */}
                  {category && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="glass" className="text-white">
                        {category}
                      </Badge>
                    </div>
                  )}

                  {/* Bookmark */}
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="absolute top-4 right-4 p-2 glass-card rounded-lg hover:bg-white/20 transition-colors"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-5 h-5 text-white" />
                    ) : (
                      <Bookmark className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
              )}

              {/* Article Meta */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground font-kabel">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(publishDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{readTime}</span>
                  </div>
                  {views > 0 && (
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{views} views</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold font-basement text-foreground leading-tight">
                  {title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-muted-foreground font-kabel leading-relaxed">
                  {excerpt}
                </p>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="neutral" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Author and Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <AuthorCard
                    name={author.name}
                    bio={author.bio}
                    avatar={author.avatar}
                    role={author.role}
                    social={author.social}
                    variant="compact"
                    showFollow={true}
                  />

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className="flex items-center space-x-1 text-muted-foreground hover:text-error-500 transition-colors"
                    >
                      <Heart
                        className={cn(
                          "w-4 h-4",
                          isLiked && "fill-current text-error-500"
                        )}
                      />
                      <span className="text-sm font-kabel">
                        {likes + (isLiked ? 1 : 0)}
                      </span>
                    </button>

                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-kabel">{comments}</span>
                    </div>

                    <ShareButtons
                      title={title}
                      description={excerpt}
                      hashtags={tags}
                      variant="minimal"
                      showLabels={false}
                      platforms={["twitter", "linkedin", "copy"]}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Article Content */}
            <Card variant="glass" padding="lg">
              <div className="prose prose-lg max-w-none">
                {content.map((section, index) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24"
                  >
                    {section.title && (
                      <h2 className="text-2xl font-bold font-basement text-foreground mt-8 mb-4 first:mt-0">
                        {section.title}
                      </h2>
                    )}
                    {renderSection(section)}
                  </div>
                ))}
              </div>
            </Card>

            {/* Article Footer */}
            <Card variant="default" padding="lg">
              <div className="space-y-6">
                {/* Last Updated */}
                {lastUpdated && (
                  <div className="text-sm text-muted-foreground font-kabel">
                    Last updated: {formatDate(lastUpdated)}
                  </div>
                )}

                {/* Author Bio */}
                <div>
                  <h3 className="font-basement text-foreground text-lg mb-4">
                    About the Author
                  </h3>
                  <AuthorCard
                    name={author.name}
                    bio={author.bio}
                    avatar={author.avatar}
                    role={author.role}
                    social={author.social}
                    variant="default"
                    showStats={true}
                    showSocial={true}
                    showFollow={true}
                    stats={{
                      articles: 24,
                      followers: 1250,
                      likes: 3400,
                    }}
                  />
                </div>

                {/* Share Section */}
                <div>
                  <h3 className="font-basement text-foreground text-lg mb-4">
                    Share this Article
                  </h3>
                  <ShareButtons
                    title={title}
                    description={excerpt}
                    hashtags={tags}
                    platforms={[
                      "twitter",
                      "linkedin",
                      "facebook",
                      "email",
                      "copy",
                    ]}
                  />
                </div>
              </div>
            </Card>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <Card variant="gradient" padding="lg">
                <CardTitle className="font-basement text-white mb-6">
                  Related Articles
                </CardTitle>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedArticles.map((article, index) => (
                    <Card key={index} variant="glass" hover className="p-4">
                      <div className="flex space-x-4">
                        {article.image && (
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-basement text-foreground text-sm mb-2 line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-xs text-muted-foreground font-kabel line-clamp-2 mb-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge variant="neutral" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {article.readTime}
                            </Badge>
                            <Button variant="ghost" size="sm" className="p-1">
                              <ArrowRight size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}
