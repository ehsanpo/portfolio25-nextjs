"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Language, defaultLanguage } from "./i18n";

interface LanguageContextType {
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: defaultLanguage,
  setCurrentLanguage: () => {},
  isRTL: false,
});

export function LanguageProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [currentLanguage, setCurrentLanguage] =
    useState<Language>(defaultLanguage);

  const value = useMemo(() => {
    const isRTL = currentLanguage === "fa";
    return { currentLanguage, setCurrentLanguage, isRTL };
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
