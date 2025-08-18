export type Locale = "en" | "sv" | "fa";

export const locales: readonly Locale[] = ["en", "sv", "fa"] as const;
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  sv: "Svenska",
  fa: "فارسی",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  sv: "🇸🇪",
  fa: "🇮🇷",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getValidLocale(locale: string | undefined): Locale {
  if (!locale || !isValidLocale(locale)) {
    return defaultLocale;
  }
  return locale;
}
