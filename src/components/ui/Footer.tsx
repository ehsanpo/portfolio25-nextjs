"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";
import { Button } from "./Button";
import { Badge } from "./Badge";
import {
  Zap,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  ExternalLink,
  Heart,
  Coffee,
  Code,
  Palette,
  User,
  Briefcase,
  FileText,
  Phone,
  MapPin,
  Calendar,
  ArrowUp,
} from "lucide-react";
import { cn } from "../../lib/cn";

interface FooterProps {
  variant?: "default" | "glass" | "gradient" | "minimal";
  showSocial?: boolean;
  showNavigation?: boolean;
  showContact?: boolean;
  showStats?: boolean;
  onSectionChange?: (section: string) => void;
  className?: string;
}

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/yourusername",
    color: "hover:text-gray-600 dark:hover:text-gray-300",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/yourprofile",
    color: "hover:text-blue-600",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com/yourusername",
    color: "hover:text-blue-400",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/yourusername",
    color: "hover:text-pink-500",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:your@email.com",
    color: "hover:text-green-500",
  },
];

const navigationSections = [
  {
    title: "Portfolio",
    links: [
      { name: "Projects", id: "projects", icon: Briefcase },
      { name: "Case Studies", id: "case-studies", icon: FileText },
      { name: "Skills", id: "skills", icon: Code },
      { name: "About", id: "about", icon: User },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Design System", id: "design-system", icon: Palette },
      { name: "Blog", id: "blog", icon: FileText },
      { name: "Downloads", id: "downloads", icon: ExternalLink },
      { name: "Contact", id: "contact", icon: Mail },
    ],
  },
  {
    title: "Connect",
    links: [
      {
        name: "LinkedIn",
        href: "https://linkedin.com/in/yourprofile",
        icon: Linkedin,
      },
      { name: "GitHub", href: "https://github.com/yourusername", icon: Github },
      {
        name: "Twitter",
        href: "https://twitter.com/yourusername",
        icon: Twitter,
      },
      { name: "Email", href: "mailto:your@email.com", icon: Mail },
    ],
  },
];

export function Footer({
  variant = "glass",
  showSocial = true,
  showNavigation = true,
  showContact = true,
  showStats = true,
  onSectionChange,
  className,
}: Readonly<FooterProps>) {
  const t = useTranslations("navigation");
  const buildLocalizedNavSections = () => {
    return navigationSections.map((section) => ({
      ...section,
      links: section.links.map((link) => {
        if ("href" in link) {
          // Handle external links (keep as is)
          if (link.href.startsWith("http") || link.href.startsWith("mailto:")) {
            return link;
          }
          // Handle internal links (no locale prefix needed)
          return link;
        }
        // Handle id-based navigation (keep as is for section navigation)
        return link;
      }),
    }));
  };

  const localizedNavSections = buildLocalizedNavSections();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (id: string) => {
    if (onSectionChange) {
      onSectionChange(id);
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "glass":
        return "glass-card border-t border-border/50";
      case "gradient":
        return "bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border-t border-primary-500/20";
      case "default":
        return "bg-background border-t border-border";
      case "minimal":
        return "bg-transparent border-t border-border/30";
      default:
        return "glass-card border-t border-border/50";
    }
  };

  if (variant === "minimal") {
    return (
      <footer className={cn("py-8", className)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-basement text-foreground">Portfolio</span>
            </div>

            {/* Social Links */}
            {showSocial && (
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-2 rounded-lg transition-all duration-300 hover:scale-110",
                        "text-muted-foreground",
                        social.color
                      )}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            )}

            {/* Copyright */}
            <div className="text-sm text-muted-foreground font-kabel">
              © 2024 Your Name. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={cn("relative mt-20", getVariantClasses(), className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold font-basement gradient-text">
                  Portfolio
                </div>
                <div className="text-sm font-kabel text-muted-foreground">
                  Design System
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground font-kabel leading-relaxed mb-6">
              Creating beautiful, accessible, and performant digital experiences
              with modern web technologies and thoughtful design.
            </p>

            {/* Social Links */}
            {showSocial && (
              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-3 rounded-lg glass-card transition-all duration-300 hover:scale-110 group relative overflow-hidden",
                        "text-muted-foreground",
                        social.color
                      )}
                      aria-label={social.name}
                    >
                      {/* Glossy effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Icon className="w-5 h-5 relative z-10" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navigation Sections */}
          {showNavigation &&
            localizedNavSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-basement text-foreground text-lg mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.name}>
                        {"href" in link ? (
                          <a
                            href={link.href}
                            target={
                              link.href.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              link.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="flex items-center text-sm text-muted-foreground hover:text-primary-500 transition-colors font-kabel group"
                          >
                            <Icon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                            {link.name}
                            {link.href.startsWith("http") && (
                              <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </a>
                        ) : (
                          <button
                            onClick={() => link.id && handleNavigation(link.id)}
                            className="flex items-center text-sm text-muted-foreground hover:text-primary-500 transition-colors font-kabel group"
                          >
                            <Icon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                            {link.name}
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

          {/* Contact Section */}
          {showContact && (
            <div>
              <div className="mb-6">
                <svg
                  width="48"
                  height="48"
                  className="text-primary-500"
                  viewBox="0 0 27.8 26.7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M0.5,19.4C0.2,19,0,18.7,0,18.2c0-0.4,0.2-0.8,0.5-1.1L17.1,0.5C17.4,0.2,17.8,0,18.2,0c0.4,0,0.8,0.2,1.1,0.5
                  c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1L2.7,19.4c-0.3,0.3-0.7,0.5-1.1,0.5C1.2,19.8,0.8,19.7,0.5,19.4z M12.4,25.6
                  c-0.3,0.3-0.8,0.6-1.3,0.8s-1,0.3-1.5,0.3c-0.5,0-1.1-0.1-1.6-0.3c-0.5-0.2-1.1-0.5-1.5-1l-2.1-2.1c-0.4-0.4-0.6-0.8-0.5-1.2
                  c0.1-0.4,0.4-0.8,0.9-1.3L20.6,5c0.3-0.3,0.7-0.5,1.1-0.5c0.4,0,0.8,0.2,1.1,0.5c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1
                  l-15,15L9,23.4c0.2,0.2,0.4,0.2,0.6,0.2c0.2,0,0.5-0.1,0.7-0.4L25.1,8.4C25.4,8.1,25.8,8,26.2,8c0.4,0,0.8,0.2,1.1,0.5
                  c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1L12.4,25.6z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-basement text-foreground text-lg mb-4">
                  Get In Touch
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground font-kabel">
                    <Mail className="w-4 h-4 mr-2 text-primary-500" />
                    <a
                      href="mailto:your@email.com"
                      className="hover:text-primary-500 transition-colors"
                    >
                      your@email.com
                    </a>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground font-kabel">
                    <Phone className="w-4 h-4 mr-2 text-primary-500" />
                    <a
                      href="tel:+1234567890"
                      className="hover:text-primary-500 transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground font-kabel">
                    <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                    <span>San Francisco, CA</span>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground font-kabel">
                    <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                    <span>Available for projects</span>
                  </div>
                </div>

                {/* Availability Status */}
                <div className="mt-4 p-3 glass-card rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-basement text-success-500">
                      Available for hire
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-kabel mt-1">
                    Open to new opportunities and collaborations
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Section */}
        {showStats && (
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold font-basement gradient-text">
                  50+
                </div>
                <div className="text-sm text-muted-foreground font-kabel">
                  Projects Completed
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-bold font-basement gradient-text">
                  25+
                </div>
                <div className="text-sm text-muted-foreground font-kabel">
                  Happy Clients
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-bold font-basement gradient-text">
                  5+
                </div>
                <div className="text-sm text-muted-foreground font-kabel">
                  Years Experience
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-bold font-basement gradient-text">
                  100%
                </div>
                <div className="text-sm text-muted-foreground font-kabel">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground font-kabel">
              <span>© 2024 Your Name. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-error-500 fill-current" />
                <span>and</span>
                <Coffee className="w-4 h-4 text-warning-500" />
              </div>
            </div>

            {/* Back to Top */}
            <Button
              variant="glass"
              size="sm"
              onClick={scrollToTop}
              className="flex items-center gap-2"
            >
              <ArrowUp className="w-4 h-4" />
              Back to Top
            </Button>
          </div>

          {/* Tech Stack */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground font-kabel mr-2">
              Built with:
            </span>
            <Badge variant="neutral" className="text-xs">
              React
            </Badge>
            <Badge variant="neutral" className="text-xs">
              TypeScript
            </Badge>
            <Badge variant="neutral" className="text-xs">
              Tailwind CSS
            </Badge>
            <Badge variant="neutral" className="text-xs">
              Vite
            </Badge>
            <Badge variant="neutral" className="text-xs">
              Lucide Icons
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}
