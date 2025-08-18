"use client";

import React, { useState } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { MapPin,
  Calendar, 
  Mail,
  Twitter,
  Linkedin,
  Github,
  Globe, 
  Award,
  Heart,
  MessageCircle,
  FolderDown as Follow,
  UserPlus,
  UserCheck} from "lucide-react";
import { cn } from "../../utils/cn";

interface AuthorCardProps {
  name: string;
  bio: string;
  avatar?: string;
  role?: string;
  company?: string;
  location?: string;
  joinDate?: string;
  website?: string;
  email?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  stats?: {
    articles?: number;
    followers?: number;
    likes?: number;
    views?: number;
  };
  specialties?: string[];
  achievements?: string[];
  featured?: boolean;
  verified?: boolean;
  variant?: "default" | "glass" | "gradient" | "minimal" | "compact";
  showStats?: boolean;
  showSocial?: boolean;
  showFollow?: boolean;
  className?: string;
}

export function AuthorCard({
  name,
  bio,
  avatar,
  role,
  company,
  location,
  joinDate,
  website,
  email,
  social = {},
  stats = {},
  specialties = [],
  achievements = [],
  featured = false,
  verified = false,
  variant = "default",
  showStats = true,
  showSocial = true,
  showFollow = true,
  className,
}: AuthorCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const socialLinks = [
    {
      platform: "twitter",
      icon: Twitter,
      url: social.twitter,
      color: "hover:text-blue-400",
    },
    {
      platform: "linkedin",
      icon: Linkedin,
      url: social.linkedin,
      color: "hover:text-blue-600",
    },
    {
      platform: "github",
      icon: Github,
      url: social.github,
      color: "hover:text-gray-600",
    },
  ].filter((link) => link.url);

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center space-x-3 p-3 glass-card rounded-lg",
          className
        )}
      >
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center border border-primary-500/30">
            <span className="text-sm font-bold font-basement text-primary-500">
              {getInitials(name)}
            </span>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h4 className="font-basement text-foreground truncate">{name}</h4>
            {verified && (
              <Badge variant="primary" className="text-xs">
                Verified
              </Badge>
            )}
          </div>
          {role && (
            <p className="text-sm text-muted-foreground font-kabel truncate">
              {role}
            </p>
          )}
        </div>

        {showFollow && (
          <Button
            variant={isFollowing ? "outline" : "primary"}
            size="sm"
            onClick={() => setIsFollowing(!isFollowing)}
            className="flex items-center gap-1"
          >
            {isFollowing ? <UserCheck size={14} /> : <UserPlus size={14} />}
            {isFollowing ? "Following" : "Follow"}
          </Button>
        )}
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-start space-x-3", className)}>
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center border border-primary-500/30">
            <span className="text-xs font-bold font-basement text-primary-500">
              {getInitials(name)}
            </span>
          </div>
        )}

        <div>
          <div className="flex items-center space-x-2">
            <h4 className="font-basement text-foreground text-sm">{name}</h4>
            {verified && (
              <Badge variant="primary" className="text-xs">
                ✓
              </Badge>
            )}
          </div>
          {role && (
            <p className="text-xs text-muted-foreground font-kabel">{role}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card
      variant={featured ? "gradient" : variant}
      hover
      className={cn("overflow-hidden", className)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-16 h-16 rounded-full object-cover border-2 border-border/50"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center border-2 border-primary-500/30">
                <span className="text-lg font-bold font-basement text-primary-500">
                  {getInitials(name)}
                </span>
              </div>
            )}

            {verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3
                  className={cn(
                    "font-basement text-xl mb-1",
                    featured ? "text-white" : "text-foreground"
                  )}
                >
                  {name}
                </h3>
                {role && (
                  <p
                    className={cn(
                      "text-sm font-kabel mb-1",
                      featured ? "text-white/90" : "text-muted-foreground"
                    )}
                  >
                    {role}
                    {company && (
                      <>
                        <span className="mx-1">at</span>
                        <span
                          className={
                            featured ? "text-white" : "text-primary-500"
                          }
                        >
                          {company}
                        </span>
                      </>
                    )}
                  </p>
                )}

                {/* Location and Join Date */}
                <div className="flex items-center space-x-3 text-xs text-muted-foreground font-kabel">
                  {location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{location}</span>
                    </div>
                  )}
                  {joinDate && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Joined {formatDate(joinDate)}</span>
                    </div>
                  )}
                </div>
              </div>

              {showFollow && (
                <Button
                  variant={
                    isFollowing ? "outline" : featured ? "glass" : "primary"
                  }
                  size="sm"
                  onClick={() => setIsFollowing(!isFollowing)}
                  className="flex items-center gap-2"
                >
                  {isFollowing ? (
                    <UserCheck size={16} />
                  ) : (
                    <UserPlus size={16} />
                  )}
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <p
          className={cn(
            "text-sm font-kabel leading-relaxed mb-4",
            featured ? "text-white/90" : "text-muted-foreground"
          )}
        >
          {bio}
        </p>

        {/* Specialties */}
        {specialties.length > 0 && (
          <div className="mb-4">
            <h4
              className={cn(
                "text-sm font-basement mb-2",
                featured ? "text-white" : "text-foreground"
              )}
            >
              Specialties
            </h4>
            <div className="flex flex-wrap gap-1">
              {specialties.map((specialty, index) => (
                <Badge
                  key={index}
                  variant={featured ? "glass" : "neutral"}
                  className="text-xs"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mb-4">
            <h4
              className={cn(
                "text-sm font-basement mb-2",
                featured ? "text-white" : "text-foreground"
              )}
            >
              Achievements
            </h4>
            <div className="flex flex-wrap gap-1">
              {achievements.slice(0, 2).map((achievement, index) => (
                <Badge
                  key={index}
                  variant={featured ? "glass" : "success"}
                  className="text-xs"
                >
                  <Award className="w-3 h-3 mr-1" />
                  {achievement}
                </Badge>
              ))}
              {achievements.length > 2 && (
                <Badge
                  variant={featured ? "glass" : "neutral"}
                  className="text-xs"
                >
                  +{achievements.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        {showStats && Object.keys(stats).length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {stats.articles && (
              <div className="text-center">
                <div
                  className={cn(
                    "text-lg font-bold font-basement",
                    featured ? "text-white" : "text-foreground"
                  )}
                >
                  {stats.articles}
                </div>
                <div
                  className={cn(
                    "text-xs font-kabel",
                    featured ? "text-white/70" : "text-muted-foreground"
                  )}
                >
                  Articles
                </div>
              </div>
            )}

            {stats.followers && (
              <div className="text-center">
                <div
                  className={cn(
                    "text-lg font-bold font-basement",
                    featured ? "text-white" : "text-foreground"
                  )}
                >
                  {stats.followers}
                </div>
                <div
                  className={cn(
                    "text-xs font-kabel",
                    featured ? "text-white/70" : "text-muted-foreground"
                  )}
                >
                  Followers
                </div>
              </div>
            )}

            {stats.likes && (
              <div className="text-center">
                <div
                  className={cn(
                    "text-lg font-bold font-basement",
                    featured ? "text-white" : "text-foreground"
                  )}
                >
                  {stats.likes}
                </div>
                <div
                  className={cn(
                    "text-xs font-kabel",
                    featured ? "text-white/70" : "text-muted-foreground"
                  )}
                >
                  Likes
                </div>
              </div>
            )}

            {stats.views && (
              <div className="text-center">
                <div
                  className={cn(
                    "text-lg font-bold font-basement",
                    featured ? "text-white" : "text-foreground"
                  )}
                >
                  {stats.views}
                </div>
                <div
                  className={cn(
                    "text-xs font-kabel",
                    featured ? "text-white/70" : "text-muted-foreground"
                  )}
                >
                  Views
                </div>
              </div>
            )}
          </div>
        )}

        {/* Social Links and Contact */}
        <div className="flex items-center justify-between">
          {showSocial && socialLinks.length > 0 && (
            <div className="flex items-center space-x-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "p-2 rounded-lg glass-card transition-all duration-300 hover:scale-110",
                      "text-muted-foreground",
                      link.color
                    )}
                    aria-label={`${name}'s ${link.platform}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}

              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass-card hover:bg-muted/50 transition-colors text-muted-foreground hover:text-primary-500"
                  aria-label={`${name}'s website`}
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="p-2 rounded-lg glass-card hover:bg-muted/50 transition-colors text-muted-foreground hover:text-green-500"
                  aria-label={`Email ${name}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className="p-2"
            >
              <Heart
                className={cn(
                  "w-4 h-4",
                  isLiked && "fill-current text-error-500"
                )}
              />
            </Button>

            <Button variant="ghost" size="sm" className="p-2">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
