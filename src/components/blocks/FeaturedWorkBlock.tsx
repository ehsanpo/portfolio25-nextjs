import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ArrowRight } from "lucide-react";

interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  gradient: string;
  technologies: string[];
  linkText: string;
  href?: string;
}

interface FeaturedWorkBlockProps {
  title?: string;
  subtitle?: string;
  projects?: FeaturedProject[];
  content?: string;
}

const defaultProjects: FeaturedProject[] = [
  {
    id: "enterprise-design-system",
    title: "Enterprise Design System",
    description: "Comprehensive component library serving 50+ applications",
    gradient: "from-primary-500 to-secondary-500",
    technologies: ["React", "TypeScript", "Storybook"],
    linkText: "View Case Study",
  },
  {
    id: "component-documentation",
    title: "Component Documentation",
    description: "Interactive documentation with live code examples",
    gradient: "from-secondary-500 to-accent-500",
    technologies: ["Storybook", "MDX", "Figma"],
    linkText: "View Project",
  },
  {
    id: "brand-identity-system",
    title: "Brand Identity System",
    description: "Complete visual identity with design tokens and guidelines",
    gradient: "from-accent-500 to-primary-500",
    technologies: ["Design Tokens", "Figma", "Brand"],
    linkText: "View System",
  },
];

export function FeaturedWorkBlock({
  title = "Featured Work",
  subtitle = "Recent projects and achievements",
  projects = defaultProjects,
}: Readonly<FeaturedWorkBlockProps>) {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="group">
            <div
              className={`aspect-video bg-gradient-to-br ${project.gradient} rounded-lg mb-4`}
            />
            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <div className="flex gap-2 mb-4">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
            <Button variant="ghost" className="p-0 h-auto">
              {project.linkText} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
