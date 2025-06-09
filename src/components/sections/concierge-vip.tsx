"use client";

import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';

export function ConciergeVipSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 w-full">
            <Image
              src="https://placehold.co/600x450.png"
              alt={t('conciergeVip.imageAlt')}
              data-ai-hint="luxury concierge service Barcelona"
              width={600}
              height={450}
              className="rounded-xl shadow-2xl object-cover"
            />
          </div>
          <div className="md:w-1/2 w-full text-center md:text-left">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
              {t('conciergeVip.heading')}
            </h2>
            <p className="font-headline text-xl md:text-2xl text-foreground mb-6">
              {t('conciergeVip.subheading')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('conciergeVip.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
