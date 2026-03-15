import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Language, Translations } from './translations';
import en from './en';
import it from './it';

const translationsMap: Record<Language, Translations> = { en, it };

interface LanguageContextValue {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'it',
  t: it,
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('it');

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'it' : 'en'));
  }, []);

  const value: LanguageContextValue = {
    language,
    t: translationsMap[language],
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
