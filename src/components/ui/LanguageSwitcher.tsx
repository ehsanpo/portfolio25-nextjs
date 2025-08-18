import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "./Button";
import { Globe } from "lucide-react";
import { languages, type Language } from "@/lib/i18n";

const languageNames: Record<Language, string> = {
  en: "English",
  sv: "Svenska",
  fa: "فارسی",
};

export function LanguageSwitcher() {
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  const switchLanguage = (newLanguage: Language) => {
    setCurrentLanguage(newLanguage);
  };

  return (
    <div className="relative group">
      <Button variant="ghost" size="sm" className="flex items-center gap-2">
        <Globe className="w-4 h-4" />
        {languageNames[currentLanguage]}
      </Button>

      <div className="absolute right-0 top-full mt-2 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[120px]">
        {languages.map((language) => (
          <button
            key={language}
            onClick={() => switchLanguage(language)}
            className={`block w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${
              language === currentLanguage ? "bg-muted font-medium" : ""
            }`}
          >
            {languageNames[language]}
          </button>
        ))}
      </div>
    </div>
  );
}
