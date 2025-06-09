import { HeroSection } from '@/components/sections/hero';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { ConciergeVipSection } from '@/components/sections/concierge-vip';
import { VehicleGallery } from '@/components/sections/vehicle-gallery';
import { FinalCtaSection } from '@/components/sections/final-cta';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <FeatureGrid />
      <ConciergeVipSection />
      <VehicleGallery />
      <FinalCtaSection />
      {/* A simple footer can be added here if needed */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Dachs Limousines Reimagined. Todos los derechos reservados.</p>
          <p className="text-sm mt-1">Desde 1940, sirviendo con excelencia.</p>
        </div>
      </footer>
    </main>
  );
}
