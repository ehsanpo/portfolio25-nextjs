import { colors } from "./src/tokens/colors.ts";
import { typography } from "./src/tokens/typography.ts";
import { spacing, shadows } from "./src/tokens/spacing.ts";

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.primary,
          DEFAULT: colors.primary[500], // Add default value
        },
        secondary: {
          ...colors.secondary,
          DEFAULT: colors.secondary[500], // Add default value
        },
        accent: {
          ...colors.accent,
          DEFAULT: colors.accent[500], // Add default value if it has shades
        },
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        white: colors.white,
        offwhite: colors.offwhite,
        opium: colors.opium,
        neutral: colors.neutral,
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      letterSpacing: typography.letterSpacing,
      spacing,
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: shadows,
      animation: {
        gradient: "gradient 8s linear infinite",
        scroll: "scroll 30s linear infinite",
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        "block-reveal": "blockReveal 2s ease-in-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "scan-line": "scan-line 2s ease-in-out infinite",
        "glitch-shift": "glitch-shift 0.3s ease-in-out infinite",
        "data-stream": "data-stream 1.5s ease-in-out infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "300% 300%",
            "background-position": "right center",
          },
        },
        scroll: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - var(--gap)))",
          },
        },
        "marquee-vertical": {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(calc(-100% - var(--gap)))",
          },
        },
        blockReveal: {
          "0%": {
            left: "-100%",
          },
          "50%": {
            left: "0%",
          },
          "100%": {
            left: "100%",
          },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        "glitch-shift": {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-1px, 1px)" },
          "40%": { transform: "translate(-1px, -1px)" },
          "60%": { transform: "translate(1px, 1px)" },
          "80%": { transform: "translate(1px, -1px)" },
        },
        "data-stream": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "50%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
