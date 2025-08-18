"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";
import { Button } from "./Button";
import { ThemeToggle } from "../ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Badge } from "./Badge";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  FileText,
  Mail,
  ChevronDown,
  Palette,
  Phone,
  Settings,
} from "lucide-react";
import { cn } from "../../lib/cn";

interface HeaderProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  variant?: "default" | "glass" | "gradient";
  sticky?: boolean;
  showBadge?: boolean;
  className?: string;
}

interface NavItem {
  id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  href: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  { id: "home", name: "Home", icon: Home, href: "/" },
  {
    id: "about",
    name: "About",
    icon: User,
    href: "/about",
    children: [
      {
        id: "about-overview",
        name: "Overview",
        icon: User,
        href: "/about/overview",
      },
      {
        id: "about-highlights",
        name: "Highlights",
        icon: Briefcase,
        href: "/about/highlights",
      },
    ],
  },
  { id: "portfolio", name: "Work", icon: Briefcase, href: "/portfolio" },
  { id: "skills", name: "Skills", icon: Settings, href: "/skills" },
  { id: "services", name: "Services", icon: Settings, href: "/services" },
  {
    id: "design-system",
    name: "Design System",
    icon: Palette,
    href: "/design-system",
    children: [
      {
        id: "ds-overview",
        name: "Overview",
        icon: Home,
        href: "/design-system/overview",
      },
      {
        id: "ds-logo",
        name: "Logo",
        icon: Settings,
        href: "/design-system/logo",
      },
      {
        id: "ds-colors",
        name: "Colors",
        icon: Palette,
        href: "/design-system/colors",
      },
      {
        id: "ds-typography",
        name: "Typography",
        icon: FileText,
        href: "/design-system/typography",
      },
      {
        id: "ds-spacing",
        name: "Spacing",
        icon: Settings,
        href: "/design-system/spacing",
      },
      {
        id: "ds-iconography",
        name: "Iconography",
        icon: Settings,
        href: "/design-system/iconography",
      },
      {
        id: "ds-components",
        name: "Components",
        icon: Settings,
        href: "/design-system/components",
      },
      {
        id: "ds-design-tokens",
        name: "Design Tokens",
        icon: Settings,
        href: "/design-system/design-tokens",
      },
      {
        id: "ds-animations",
        name: "Animations",
        icon: Settings,
        href: "/design-system/animations",
      },
      {
        id: "ds-motion",
        name: "Motion",
        icon: Settings,
        href: "/design-system/motion",
      },
      {
        id: "ds-accessibility",
        name: "Accessibility",
        icon: Settings,
        href: "/design-system/accessibility",
      },
      {
        id: "ds-audio-player-demo",
        name: "Audio Player Demo",
        icon: Settings,
        href: "/design-system/audio-player-demo",
      },
    ],
  },
  { id: "contact", name: "Contact", icon: Phone, href: "/contact" },
];

export function Header({
  activeSection = "home",
  onSectionChange,
  variant = "glass",
  sticky = true,
  showBadge = true,
  className,
}: Readonly<HeaderProps>) {
  const t = useTranslations("navigation");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Build navigation items with translations
  const buildLocalizedNavItems = (items: NavItem[]): NavItem[] => {
    return items.map((item) => ({
      ...item,
      name: t(item.id) || item.name, // Use translation if available, fallback to original
      href: item.href,
      children: item.children
        ? buildLocalizedNavItems(item.children)
        : undefined,
    }));
  };

  // Get localized navigation items
  const localizedNavItems = buildLocalizedNavItems(navigationItems);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
      if (openDropdown && !target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen, openDropdown]);

  const handleNavigation = (sectionId: string) => {
    onSectionChange?.(sectionId);
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "glass":
        return "glass-card border-b border-border/50";
      case "gradient":
        return "bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border-b border-primary-500/20";
      case "default":
        return "bg-background border-b border-border";
      default:
        return "glass-card border-b border-border/50";
    }
  };

  const renderNavItem = (item: NavItem, isDesktop: boolean = true) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isDropdownOpen = openDropdown === item.id;

    if (isDesktop) {
      return (
        <div key={item.id} className="relative dropdown-container">
          {hasChildren ? (
            <button
              onClick={() => setOpenDropdown(isDropdownOpen ? null : item.id)}
              className={cn(
                "flex items-center px-4 py-2 rounded-lg text-sm font-medium font-kabel transition-all duration-300 group relative overflow-hidden cursor-pointer",
                "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Icon className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">{item.name}</span>
              <ChevronDown
                className={cn(
                  "w-3 h-3 ml-1 relative z-10 transition-transform duration-200",
                  isDropdownOpen && "rotate-180"
                )}
              />
            </button>
          ) : (
            <Link href={item.href}>
              <div
                className={cn(
                  "flex items-center px-4 py-2 rounded-lg text-sm font-medium font-kabel transition-all duration-300 group relative overflow-hidden cursor-pointer",
                  "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Icon className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">{item.name}</span>
              </div>
            </Link>
          )}

          {/* Desktop Dropdown */}
          {hasChildren && isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-border rounded-lg shadow-lg glass-card z-50">
              <div className="py-2">
                <Link href={item.href}>
                  <div className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
                    {item.name} Overview
                  </div>
                </Link>
                {item.children?.map((child) => (
                  <div key={child.id}>
                    {child.children ? (
                      <div className="relative group">
                        <Link href={child.href}>
                          <div className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 flex items-center justify-between">
                            {child.name}
                            <ChevronDown className="w-3 h-3 -rotate-90" />
                          </div>
                        </Link>
                        {/* Nested dropdown */}
                        <div className="absolute left-full top-0 ml-1 w-48 bg-background border border-border rounded-lg shadow-lg glass-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                          <div className="py-2">
                            <Link href={child.href}>
                              <div className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
                                {child.name} Overview
                              </div>
                            </Link>
                            {child.children?.map((nestedChild) => (
                              <Link
                                key={nestedChild.id}
                                href={nestedChild.href}
                              >
                                <div className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
                                  {nestedChild.name}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link href={child.href}>
                        <div className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
                          {child.name}
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    } else {
      // Mobile navigation
      const isActive = activeSection === item.id;
      return (
        <div key={item.id}>
          <button
            onClick={() => {
              if (hasChildren) {
                setOpenDropdown(isDropdownOpen ? null : item.id);
              } else {
                handleNavigation(item.id);
              }
            }}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium font-kabel transition-all duration-300 group relative overflow-hidden",
              isActive
                ? "bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-400 border border-primary-500/30"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <div className="flex items-center">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Icon className="w-4 h-4 mr-3 relative z-10" />
              <span className="relative z-10">{item.name}</span>
            </div>
            {hasChildren && (
              <ChevronDown
                className={cn(
                  "w-3 h-3 relative z-10 transition-transform duration-200",
                  isDropdownOpen && "rotate-180"
                )}
              />
            )}
          </button>

          {/* Mobile submenu */}
          {hasChildren && isDropdownOpen && (
            <div className="ml-4 mt-2 space-y-1">
              <Link href={item.href}>
                <div className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-all duration-200">
                  {item.name} Overview
                </div>
              </Link>
              {item.children?.map((child) => (
                <div key={child.id}>
                  <Link href={child.href}>
                    <div className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-all duration-200">
                      {child.name}
                    </div>
                  </Link>
                  {child.children && (
                    <div className="ml-4 space-y-1">
                      {child.children.map((nestedChild) => (
                        <Link key={nestedChild.id} href={nestedChild.href}>
                          <div className="px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-lg transition-all duration-200">
                            {nestedChild.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <header
      className={cn(
        "relative z-50 transition-all duration-300",
        sticky && "sticky top-0",
        isScrolled && "backdrop-blur-xl shadow-lg",
        getVariantClasses(),
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="transition-transform group-hover:scale-110">
                <svg
                  width="40"
                  height="40"
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
              <div className="hidden sm:block">
                <div className="text-xl font-bold font-basement gradient-text">
                  Portfolio
                </div>
                <div className="text-xs font-kabel text-muted-foreground -mt-1">
                  Design System
                </div>
              </div>
            </Link>

            {showBadge && (
              <Badge variant="primary" className="hidden md:inline-flex">
                v2.0.0
              </Badge>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {localizedNavItems.map((item) => renderNavItem(item, true))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg glass-card hover:bg-muted/50 transition-all duration-300 mobile-menu-container"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 mobile-menu-container",
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="py-4 space-y-2">
            {localizedNavItems.map((item) => renderNavItem(item, false))}

            {/* Mobile Language & Theme Controls */}
            <div className="pt-4 border-t border-border/50 space-y-3">
              <div className="flex items-center justify-between">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>

              <Button
                variant="gradient"
                className="w-full flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Get In Touch
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" />
      )}
    </header>
  );
}
