export const languages = ["en", "sv", "fa"] as const;
export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "en";

export function getLanguageFromFilename(filename: string): Language {
  if (filename.endsWith(".sv.md")) return "sv";
  if (filename.endsWith(".fa.md")) return "fa";
  return "en";
}

export function filterContentByLanguage<T extends { lang: string }>(
  content: T[],
  language: Language
): T[] {
  return content.filter((item) => item.lang === language);
}

export function findContentWithFallback<
  T extends { lang: string; slug: string }
>(content: T[], slug: string, language: Language): T | undefined {
  // Try to find content in requested language
  const preferred = content.find(
    (item) => item.slug === slug && item.lang === language
  );
  if (preferred) return preferred;

  // Fallback to English
  return content.find((item) => item.slug === slug && item.lang === "en");
}
