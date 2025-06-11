
"use client";
import type React from 'react';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { i18n, type Locale } from '../../middleware'; // Corrected path

interface Translations {
  [key: string]: string | { [key: string]: string } | any;
}

interface LanguageContextType {
  language: Locale;
  setLanguage: (language: Locale) => void;
  translations: Translations;
  isLoaded: boolean;
  availableLanguages: Readonly<Locale[]>;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode, initialLocale: Locale | string }> = ({ children, initialLocale }) => {
  // Validate initialLocale before setting state.
  // If it's an invalid string (like "undefined") or not in the list, use defaultLocale.
  const getValidatedLocale = (localeInput: Locale | string | undefined): Locale => {
    if (typeof localeInput === 'string' && i18n.locales.includes(localeInput as Locale)) {
      return localeInput as Locale;
    }
    return i18n.defaultLocale;
  };
  
  const [language, _setLanguage] = useState<Locale>(getValidatedLocale(initialLocale));
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isRTL = i18n.rtlLocales.includes(language);

  // Effect to update language state if initialLocale prop changes and is valid
  useEffect(() => {
    const newValidatedLocale = getValidatedLocale(initialLocale);
    if (newValidatedLocale !== language) {
      _setLanguage(newValidatedLocale);
      setIsLoaded(false); // Trigger re-fetch of translations for the new valid language
    }
  }, [initialLocale, language]); // Keep language in deps to avoid stale closure issues if initialLocale itself doesn't change but validation criteria might somehow (though unlikely here)

  const setLanguage = useCallback((newLocale: Locale) => {
    // Ensure newLocale is a valid one before proceeding
    if (i18n.locales.includes(newLocale)) {
      _setLanguage(newLocale); 
      setIsLoaded(false); 

      const currentPath = pathname;
      let newPath = '/';

      if (currentPath) {
        const segments = currentPath.split('/');
        const currentLocaleSegment = segments[1];
        let pathWithoutLocale = '';

        if (i18n.locales.includes(currentLocaleSegment as Locale)) {
          // Path starts with a known locale, e.g., /es/about -> /fr/about
          pathWithoutLocale = segments.slice(2).join('/');
        } else {
          // Path does not start with a known locale, e.g., /about (middleware should prevent this state ideally)
          // or currentPath is just "/"
          pathWithoutLocale = currentPath === '/' ? '' : currentPath.substring(1);
        }
        
        newPath = `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`;
      } else {
        // Fallback if pathname is somehow null/undefined
        newPath = `/${newLocale}`;
      }
      router.push(newPath);
      
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLocale;
        document.documentElement.dir = i18n.rtlLocales.includes(newLocale) ? 'rtl' : 'ltr';
      }
    } else {
      console.warn(`Attempted to set invalid language: ${newLocale}`);
    }
  }, [pathname, router]);
  
  useEffect(() => {
    const loadTranslations = async () => {
      // Now `language` should always be a validated locale from i18n.locales
      setIsLoaded(false);
      try {
        const response = await fetch(`/locales/${language}/common.json`);
        if (!response.ok) {
          console.error(`Failed to load translations for ${language}: ${response.status}`);
          if (language !== i18n.defaultLocale) {
            const fallbackResponse = await fetch(`/locales/${i18n.defaultLocale}/common.json`);
            if (fallbackResponse.ok) {
              const fallbackData = await fallbackResponse.json();
              setTranslations(fallbackData);
            } else {
              setTranslations({});
            }
          } else {
            setTranslations({}); 
          }
        } else {
            const data = await response.json();
            setTranslations(data);
        }
      } catch (error) {
        console.error(`Error loading translations for ${language}:`, error);
        if (language !== i18n.defaultLocale) {
            try {
                const fallbackResponse = await fetch(`/locales/${i18n.defaultLocale}/common.json`);
                if (fallbackResponse.ok) {
                    const fallbackData = await fallbackResponse.json();
                    setTranslations(fallbackData);
                } else {
                    setTranslations({});
                }
            } catch (e) {
                console.error('Error loading fallback translations:', e);
                setTranslations({});
            }
        } else {
            setTranslations({});
        }
      } finally {
        setIsLoaded(true);
      }
    };
    loadTranslations();
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, isLoaded, availableLanguages: i18n.locales, isRTL }}>
      {isLoaded ? children : <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-foreground">Loading multilingual experience...</p></div>}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
