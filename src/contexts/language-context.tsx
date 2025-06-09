"use client";
import type React from 'react';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface Translations {
  [key: string]: string | { [key: string]: string } | any;
}

interface LanguageContextType {
  language: 'en' | 'es';
  setLanguage: (language: 'en' | 'es') => void;
  translations: Translations;
  isLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'es'>('es');
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const changeLanguage = useCallback((lang: 'en' | 'es') => {
    setLanguage(lang);
    setIsLoaded(false); // Reset loaded state when language changes
  }, []);
  
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'en' || browserLang === 'es') {
      setLanguage(browserLang as 'en' | 'es');
    } else {
      if (navigator.languages.some(lang => lang.startsWith('es'))) {
        setLanguage('es');
      } else {
        setLanguage('en'); 
      }
    }
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoaded(false);
      try {
        const response = await fetch(`/locales/${language}.json`);
        if (!response.ok) {
          console.error(`Failed to load translations for ${language}: ${response.status}`);
          if (language !== 'en') {
            const fallbackResponse = await fetch(`/locales/en.json`);
            const fallbackData = await fallbackResponse.json();
            setTranslations(fallbackData);
          } else {
            setTranslations({}); // Set empty if english fails too
          }
        } else {
            const data = await response.json();
            setTranslations(data);
        }
      } catch (error) {
        console.error('Error loading translations:', error);
        if (language !== 'en') {
            try {
                const fallbackResponse = await fetch(`/locales/en.json`);
                if (fallbackResponse.ok) {
                    const fallbackData = await fallbackResponse.json();
                    setTranslations(fallbackData);
                } else {
                    setTranslations({});
                }
            } catch (e) {
                console.error('Error loading fallback English translations:', e);
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
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, translations, isLoaded }}>
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
