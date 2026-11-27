import React, { createContext, useContext } from 'react';
import { translate, type Language, type TranslationKey } from '../lib/i18n';

/**
 * The app is English-only. This context is kept as the single place UI text is looked up
 * (`t(key)`), so adding another language later only means extending `i18n.ts` and this file.
 */
interface LanguageContextValue {
  language: Language;
  t: (key: TranslationKey) => string;
}

const LANGUAGE: Language = 'en';

const value: LanguageContextValue = {
  language: LANGUAGE,
  t: (key: TranslationKey): string => translate(key, LANGUAGE),
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
