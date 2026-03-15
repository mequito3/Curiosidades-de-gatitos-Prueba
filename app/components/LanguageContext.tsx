'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, Translation } from '@/utils/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  translate: (text: string) => Promise<string>;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('preferredLanguage') as Language;
      if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
        setLanguage(savedLang);
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang);
    }
  };

  const t = translations[language];

  const translate = async (text: string): Promise<string> => {
    if (language === 'en') return text;
    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${language}&dt=t&q=${encodeURIComponent(text)}`
      );
      const data = await res.json();
      return data[0][0][0];
    } catch (e) {
      console.error('Translation error:', e);
      return text;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, translate, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
