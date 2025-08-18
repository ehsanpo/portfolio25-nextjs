"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { locales, defaultLocale, type Locale } from "@/utils/i18n";

interface LanguageContextType {
  currentLocale: Locale;
  setLocale: (locale: Locale) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get saved language from localStorage or use browser language
    const savedLanguage = localStorage.getItem("preferred-language") as Locale;
    const browserLanguage = navigator.language.split("-")[0] as Locale;

    const initialLocale =
      savedLanguage && locales.includes(savedLanguage)
        ? savedLanguage
        : locales.includes(browserLanguage)
        ? browserLanguage
        : defaultLocale;

    setCurrentLocale(initialLocale);
    setIsLoading(false);
  }, []);

  const setLocale = (locale: Locale) => {
    setCurrentLocale(locale);
    localStorage.setItem("preferred-language", locale);

    // Update document direction for RTL languages
    const isRtl = locale === "fa";
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  };

  return (
    <LanguageContext.Provider value={{ currentLocale, setLocale, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
