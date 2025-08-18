"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function SkillsPage() {
  const { currentLanguage, isRTL } = useLanguage();

  const content = {
    en: {
      title: "Skills",
      description: "Technical skills, stacks, and proficiency levels",
    },
    sv: {
      title: "Färdigheter",
      description: "Tekniska färdigheter, stackar och kompetensnivåer",
    },
    fa: {
      title: "مهارت‌ها",
      description: "مهارت‌های فنی، استک‌ها و سطوح مهارت",
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
