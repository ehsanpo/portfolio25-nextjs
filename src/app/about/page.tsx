"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function AboutPage() {
  const { currentLanguage, isRTL } = useLanguage();

  const content = {
    en: {
      title: "About",
      description: "Learn more about me and my work.",
    },
    sv: {
      title: "Om mig",
      description: "Lär dig mer om mig och mitt arbete.",
    },
    fa: {
      title: "درباره من",
      description: "بیشتر درباره من و کارم بدانید.",
    },
  };

  const t = content[currentLanguage] || content.en;

  return (
    <div
      className={`max-w-4xl mx-auto prose ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      <h1>{t.title}</h1>
      <div className="bg-primary-500 text-white p-4 rounded">
        {t.description}
      </div>
    </div>
  );
}
