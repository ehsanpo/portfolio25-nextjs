import React, { useState } from "react";
import { Button } from "./Button";
import {
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Github,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "../../utils/cn";

interface ShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  variant?: "default" | "minimal" | "floating" | "compact";
  platforms?: (
    | "twitter"
    | "linkedin"
    | "facebook"
    | "instagram"
    | "github"
    | "email"
    | "copy"
  )[];
  showLabels?: boolean;
  className?: string;
}

export function ShareButtons({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = typeof window !== "undefined" ? document.title : "",
  description = "",
  hashtags = [],
  variant = "default",
  platforms = ["twitter", "linkedin", "facebook", "email", "copy"],
  showLabels = true,
  className,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleNativeShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        console.log("Share cancelled or failed:", err);
      }
    }
  };

  const shareLinks = {
    twitter: {
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}&hashtags=${hashtags.join(",")}`,
      icon: Twitter,
      label: "Twitter",
      color: "hover:text-blue-400",
      bg: "hover:bg-blue-400/10",
    },
    linkedin: {
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      icon: Linkedin,
      label: "LinkedIn",
      color: "hover:text-blue-600",
      bg: "hover:bg-blue-600/10",
    },
    facebook: {
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      icon: Facebook,
      label: "Facebook",
      color: "hover:text-blue-500",
      bg: "hover:bg-blue-500/10",
    },
    instagram: {
      url: "#",
      icon: Instagram,
      label: "Instagram",
      color: "hover:text-pink-500",
      bg: "hover:bg-pink-500/10",
    },
    github: {
      url: `https://github.com`,
      icon: Github,
      label: "GitHub",
      color: "hover:text-gray-600 dark:hover:text-gray-300",
      bg: "hover:bg-gray-600/10",
    },
    email: {
      url: `mailto:?subject=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(description + "\n\n" + url)}`,
      icon: Mail,
      label: "Email",
      color: "hover:text-green-500",
      bg: "hover:bg-green-500/10",
    },
  };

  const renderButton = (platform: string) => {
    if (platform === "copy") {
      return (
        <Button
          key="copy"
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className={cn(
            "transition-all duration-300",
            variant === "compact" ? "p-2" : "px-3 py-2",
            copied
              ? "text-success-500 bg-success-500/10"
              : "hover:text-primary-500 hover:bg-primary-500/10"
          )}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {showLabels && variant !== "compact" && (
            <span className="ml-2">{copied ? "Copied!" : "Copy Link"}</span>
          )}
        </Button>
      );
    }

    const share = shareLinks[platform as keyof typeof shareLinks];
    if (!share) return null;

    const Icon = share.icon;

    return (
      <Button
        key={platform}
        variant="ghost"
        size="sm"
        onClick={() => window.open(share.url, "_blank", "noopener,noreferrer")}
        className={cn(
          "transition-all duration-300",
          variant === "compact" ? "p-2" : "px-3 py-2",
          share.color,
          share.bg
        )}
      >
        <Icon size={16} />
        {showLabels && variant !== "compact" && (
          <span className="ml-2">{share.label}</span>
        )}
      </Button>
    );
  };

  if (variant === "floating") {
    return (
      <div
        className={cn(
          "fixed right-4 top-1/2 transform -translate-y-1/2 z-40",
          className
        )}
      >
        <div className="flex flex-col space-y-2 glass-card p-2 rounded-lg border border-border/50">
          {typeof window !== "undefined" && "share" in navigator && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNativeShare}
              className="p-2 hover:text-primary-500 hover:bg-primary-500/10"
            >
              <Share2 size={16} />
            </Button>
          )}
          {platforms.map(renderButton)}
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center space-x-1", className)}>
        {platforms.map(renderButton)}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center space-x-2">
        <Share2 className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm font-medium font-basement text-foreground">
          Share this
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {typeof window !== "undefined" && "share" in navigator && (
          <Button
            variant="gradient"
            size="sm"
            onClick={handleNativeShare}
            className="flex items-center gap-2"
          >
            <Share2 size={16} />
            {showLabels && "Share"}
          </Button>
        )}
        {platforms.map(renderButton)}
      </div>

      {copied && (
        <div className="flex items-center space-x-2 text-success-500">
          <Check size={16} />
          <span className="text-sm font-kabel">Link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
