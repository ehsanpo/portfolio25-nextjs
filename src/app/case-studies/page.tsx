"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function CaseStudiesPage() {
  const { currentLanguage, isRTL } = useLanguage();

  const content = {
    en: {
      title: "Case Studies",
      description: "Detailed projects insights, methodologies, and outcomes",
    },
    sv: {
      title: "Fallstudier",
      description: "Detaljerade projektinsikter, metodiker och resultat",
    },
    fa: {
      title: "مطالعات موردی",
      description: "بینش‌های تفصیلی پروژه‌ها، روش‌شناسی و نتایج",
    },
  };

  const t = content[currentLanguage] || content.en;

  return (
    <div className={`max-w-4xl mx-auto ${isRTL ? "text-right" : "text-left"}`}>
      <h1 className="text-3xl font-bold mb-8">{t.title}</h1>
      <p className="text-gray-600">{t.description}</p>
    </div>
  );
}
