"use client";

import { allBlogs, allPortfolios } from "contentlayer/generated";
import { filterContentByLanguage } from "@/lib/i18n";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";
import { ProjectGridBlock } from "@/components/blocks/ProjectGridBlock";
import { HeroBlock } from "@/components/blocks/HeroBlock";
import { CertificationCard } from "@/components/cards/CertificationCard";
import portfolioData from "@/data/portfolio.json";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/cards/Card";
import { Badge } from "@/components/ui/Badge";

export default function Home() {
  const { currentLanguage } = useLanguage();
  const blogs = filterContentByLanguage(allBlogs, currentLanguage).slice(0, 3);
  const portfolios = filterContentByLanguage(
    allPortfolios,
    currentLanguage
  ).slice(0, 6);

  const certifications = portfolioData.certifications.map((cert) => ({
    title: cert.name,
    issuer: "Professional Certification",
    issueDate: cert.year,
    credentialId: cert.name.replace(/\s+/g, "-").toLowerCase(),
    logo: cert.img,
  }));

  const testimonials = portfolioData.testimonials
    .slice(0, 2)
    .map((testimonial) => ({
      name: testimonial.name,
      position: testimonial.title,
      company: testimonial.title.split(" at ")[1] || "",
      avatar: testimonial.img,
      shortTestimonial: testimonial.short,
      fullTestimonial: testimonial.desc,
      rating: 5,
    }));

  const awards = portfolioData.awards.map((award) => ({
    name: award.name,
    description: award.description,
    image: award.images,
    link: award.link,
  }));

  return (
    <div className="max-w-4xl mx-auto">
      <HeroBlock
        title="Hello, I'm Ehsan Pourhadi"
        subtitle="A passionate designer and developer creating exceptional digital experiences through innovative design systems and user-centered solutions."
        primaryCta={{
          label: "View My Work",
          href: "/portfolio",
        }}
        secondaryCta={{
          label: "Design System",
          href: "/design-system",
        }}
      />
      <ProjectGridBlock projects={portfolios} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <CertificationCard
            key={cert.credentialId}
            title={cert.title}
            issuer={cert.issuer}
            issueDate={cert.issueDate}
            credentialId={cert.credentialId}
            logo={cert.logo}
          />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.name}
            name={testimonial.name}
            position={testimonial.position}
            company={testimonial.company}
            avatar={testimonial.avatar}
            shortTestimonial={testimonial.shortTestimonial}
            fullTestimonial={testimonial.fullTestimonial}
            rating={testimonial.rating}
          />
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {awards.map((award) => (
          <Card key={award.name} className="text-center p-6">
            <div className="mb-4">
              <img
                src={award.image}
                alt={award.name}
                className="w-16 h-16 mx-auto object-contain"
              />
            </div>
            <h3 className="font-semibold mb-2">{award.name}</h3>
            <p className="text-muted-foreground">{award.description}</p>
          </Card>
        ))}
      </div>

      <Card variant="glass" padding="lg">
        <CardTitle className="font-basement">Marquee Animation</CardTitle>
        <CardDescription className="font-kabel">
          Horizontal marquee with variable duration and gap
        </CardDescription>
        <CardContent>
          <div className="space-y-6">
            <div className="overflow-hidden bg-muted/30 rounded-lg p-4">
              <div
                className={`flex space-x-4 animate-marquee`}
                style={
                  {
                    "--duration": "15s",
                    "--gap": "1rem",
                  } as React.CSSProperties
                }
              >
                <div className="flex space-x-4 shrink-0">
                  <Badge variant="primary">Marquee Item 1</Badge>
                  <Badge variant="secondary">Marquee Item 2</Badge>
                  <Badge variant="gradient">Marquee Item 3</Badge>
                  <Badge variant="success">Marquee Item 4</Badge>
                  <Badge variant="warning">Marquee Item 5</Badge>
                </div>
                <div className="flex space-x-4 shrink-0">
                  <Badge variant="primary">Marquee Item 1</Badge>
                  <Badge variant="secondary">Marquee Item 2</Badge>
                  <Badge variant="gradient">Marquee Item 3</Badge>
                  <Badge variant="success">Marquee Item 4</Badge>
                  <Badge variant="warning">Marquee Item 5</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
        <div className="grid gap-4 md:grid-cols-3 gap-6">
          {blogs.map((post) => (
            <Card key={post._id} padding="md" hover variant="default">
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
            </Card>
          ))}
        </div>
        <Link
          href="/blog"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          View all posts →
        </Link>
      </section>
    </div>
  );
}
