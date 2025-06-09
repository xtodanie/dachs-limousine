"use client";

import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { Phone, Share2 } from 'lucide-react';

export function FinalCtaSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-secondary/50 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-10">
          {t('finalCta.heading')}
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-semibold shadow-xl hover:opacity-90 transition-opacity duration-300 transform hover:scale-105"
            aria-label={t('finalCta.contactButton')}
          >
            <Phone className="mr-2 h-5 w-5" />
            {t('finalCta.contactButton')}
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-4 rounded-full font-semibold shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            aria-label={t('finalCta.shareButton')}
          >
            <Share2 className="mr-2 h-5 w-5" />
            {t('finalCta.shareButton')}
          </Button>
        </div>
      </div>
    </section>
  );
}
