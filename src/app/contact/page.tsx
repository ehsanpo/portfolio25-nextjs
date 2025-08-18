"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function ContactPage() {
  const { currentLanguage } = useLanguage();

  const content = {
    en: {
      title: "Contact",
      description: "Get in touch with me for projects and collaborations.",
    },
    sv: {
      title: "Kontakt",
      description: "Kontakta mig för projekt och samarbeten.",
    },
    fa: {
      title: "تماس",
      description: "برای پروژه‌ها و همکاری با من در تماس باشید.",
    },
  };

  const t = content[currentLanguage] || content.en;

  return (
    <div className="max-w-4xl mx-auto prose">
      <h1>{t.title}</h1>
      <p>{t.description}</p>
    </div>
  );
}
