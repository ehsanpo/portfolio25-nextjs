"use client";

import { languages, type Language } from "@/lib/i18n";

interface LanguageSwitcherProps {
  readonly currentLanguage: Language;
  readonly onLanguageChange: (language: Language) => void;
}

export default function LanguageSwitcher({
  currentLanguage,
  onLanguageChange,
}: LanguageSwitcherProps) {
  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => onLanguageChange(lang)}
          className={`px-2 py-1 text-sm ${
            currentLanguage === lang
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
