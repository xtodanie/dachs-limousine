
'use client';
import { useLanguage } from '@/contexts/language-context';
import type { Locale } from '../../../middleware'; // Adjusted path

const getNestedValue = (obj: any, path: string): string => {
  const value = path.split('.').reduce((acc, part) => acc && acc[part], obj);
  return typeof value === 'string' ? value : path;
};

interface UseTranslationReturn {
  t: (key: string, fallback?: string, options?: Record<string, string | number>) => string;
  language: Locale; // Changed from currentLanguage
  isTranslationsLoaded: boolean;
  isRTL: boolean;
}

export const useTranslation = (): UseTranslationReturn => {
  const { translations, isLoaded, language, isRTL } = useLanguage();

  const t = (key: string, fallback?: string, options?: Record<string, string | number>): string => {
    if (!isLoaded || Object.keys(translations).length === 0) {
        return fallback || key;
    }
    let translatedValue = getNestedValue(translations, key);
    if (translatedValue === key && fallback) { 
        translatedValue = fallback;
    }

    if (options) {
      Object.keys(options).forEach(optionKey => {
        const regex = new RegExp(`{${optionKey}}`, 'g');
        translatedValue = translatedValue.replace(regex, String(options[optionKey]));
      });
    }
    return translatedValue;
  };

  return { t, language, isTranslationsLoaded: isLoaded, isRTL };
};
