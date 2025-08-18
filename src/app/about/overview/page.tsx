"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function AboutOverviewPage() {
  const { currentLanguage, isRTL } = useLanguage();

  const content = {
    en: {
      title: "About Overview",
      description: "Professional background and philosophy",
    },
    sv: {
      title: "Om översikt",
      description: "Professionell bakgrund och filosofi",
    },
    fa: { title: "درباره کلی", description: "پیشینه حرفه‌ای و فلسفه" },
  };

  const t = content[currentLanguage] || content.en;

  return (
    <div className={`max-w-4xl mx-auto ${isRTL ? "text-right" : "text-left"}`}>
      <h1 className="text-3xl font-bold mb-8">{t.title}</h1>
      <p className="text-gray-600">{t.description}</p>
    </div>
  );
}
