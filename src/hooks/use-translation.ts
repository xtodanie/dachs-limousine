'use client';
import { useLanguage } from '@/contexts/language-context';

const getNestedValue = (obj: any, path: string): string => {
  const value = path.split('.').reduce((acc, part) => acc && acc[part], obj);
  return typeof value === 'string' ? value : path;
};

export const useTranslation = () => {
  const { translations, isLoaded, language } = useLanguage();

  const t = (key: string, fallback?: string): string => {
    if (!isLoaded || Object.keys(translations).length === 0) {
        // console.warn(`Translations not loaded or empty for language: ${language}. Key: ${key}`);
        return fallback || key;
    }
    const translatedValue = getNestedValue(translations, key);
    if (translatedValue === key && fallback) { // Key not found, use fallback
        return fallback;
    }
    return translatedValue;
  };

  return { t, currentLanguage: language, isTranslationsLoaded: isLoaded };
};
