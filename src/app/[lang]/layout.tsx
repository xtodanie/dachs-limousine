
import type { Metadata, Viewport } from 'next';
// Global CSS is imported in the root src/app/layout.tsx
// ThemeProvider and Toaster are also in the root src/app/layout.tsx
import { LanguageProvider } from '@/contexts/language-context';
import { Navbar } from '@/components/Navbar';
import AIConcierge from '@/components/AIConcierge';
import { Footer } from '@/components/Footer';
import { i18n, type Locale } from '../../../middleware';
// Fonts are imported and applied in the root src/app/layout.tsx
import { SetLangDir } from './set-lang-dir';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const localeToLoad = params.lang || i18n.defaultLocale;
  let translations: any = {};
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';

  try {
    const res = await fetch(`${baseUrl}/locales/${localeToLoad}/common.json`);
    if (res.ok) {
      translations = await res.json();
    } else {
      const fallbackRes = await fetch(`${baseUrl}/locales/${i18n.defaultLocale}/common.json`);
      if (fallbackRes.ok) translations = await fallbackRes.json();
    }
  } catch (error) {
    console.error("Failed to load translations for metadata, attempting fallback:", error);
     try {
        const fallbackRes = await fetch(`${baseUrl}/locales/${i18n.defaultLocale}/common.json`);
        if (fallbackRes.ok) translations = await fallbackRes.json();
     } catch (fallbackError) {
        console.error("Failed to load fallback translations for metadata:", fallbackError);
     }
  }

  const getTranslation = (key: string, fallback: string) => {
    const keys = key.split('.');
    let value = translations;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else { return fallback; }
    }
    return typeof value === 'string' ? value : fallback;
  };
  
  const pageTitle = getTranslation('metadata.defaultTitle', 'Dachs Limousines');
  const pageDescription = getTranslation('metadata.defaultDescription', 'Luxury limousine services.');
  
  const alternatesLanguages: Record<string, string> = {};
  i18n.locales.forEach(loc => {
    // This needs to be dynamic based on the current path, not just root
    // For now, points to root of each locale. Needs improvement for full SEO.
    alternatesLanguages[loc] = `${baseUrl}/${loc}`;
  });
  
  return {
    title: pageTitle,
    description: pageDescription,
    // metadataBase: new URL(baseUrl), // Set in root layout or ensure it's correct
    alternates: {
      canonical: `${baseUrl}/${localeToLoad}`, // Needs to be dynamic to current page path
      languages: alternatesLanguages,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const lang = params.lang || i18n.defaultLocale;
  const dir = i18n.rtlLocales.includes(lang) ? 'rtl' : 'ltr';

  return (
    <> {/* This layout is now a child of src/app/layout.tsx's <body> */}
      <SetLangDir lang={lang} dir={dir} />
      <LanguageProvider initialLocale={lang}>
        <Navbar />
        <div className="flex flex-col min-h-screen">
          {/* pt-16 is for the fixed Navbar height */}
          <main className="flex-grow pt-16"> 
            {children}
          </main>
          <Footer /> 
        </div>
        <AIConcierge />
      </LanguageProvider>
    </>
  );
}
