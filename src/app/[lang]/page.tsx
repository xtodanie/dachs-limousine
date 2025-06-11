
import { HeroSection } from '@/components/sections/hero';
import { LegacySection } from '@/components/sections/LegacySection';
import { DifferentiatorsSection } from '@/components/sections/DifferentiatorsSection';
import type { Locale } from '../../../middleware'; // Adjusted path

export default function HomePage({ params }: { params: { lang: Locale } }) {
  // The lang param is available here if needed for specific logic, 
  // but translation is handled by useTranslation hook in components.
  return (
    <main className="flex flex-col min-h-screen pt-16"> 
      <HeroSection />
      <LegacySection />
      <DifferentiatorsSection />
    </main>
  );
}
