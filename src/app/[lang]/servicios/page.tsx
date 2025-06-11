
import { FleetSection } from '@/components/sections/FleetSection';
import { LuxuryExperiencesSection } from '@/components/sections/LuxuryExperiencesSection';
// import { useTranslation } from '@/hooks/use-translation'; // Only if client component
import type { Locale } from '../../../../middleware'; // Adjusted path

// If this page needs to use useTranslation for its H1, it must be a client component.
// For now, assuming title is static or handled within child client components.
export default function ServiciosPage({ params }: { params: { lang: Locale } }) {
  // const { t } = useTranslation(); // Make this "use client" to use this hook.

  // Placeholder title, ideally this would come from translations if the page is client-side
  // Or, if it's a server component, title translations would be handled differently (e.g. passed as prop or from a server dictionary)
  const pageTitle = params.lang === 'es' ? 'Nuestros Servicios Premium' : 'Our Premium Services'; 

  return (
    <main className="flex flex-col min-h-screen pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <h1 className="font-headline text-4xl md:text-5xl text-primary mb-16">
          {/* {t('serviciosPage.title', 'Nuestros Servicios Premium')} */}
          {pageTitle}
        </h1>
      </div>
      <FleetSection />
      <LuxuryExperiencesSection />
    </main>
  );
}
