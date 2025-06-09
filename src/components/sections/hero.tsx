"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTranslation } from '@/hooks/use-translation';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt={t('hero.backgroundAlt', 'Luxury limousine on Passeig de Gràcia')}
        data-ai-hint="limousine Passeig de Gracia golden hour"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="z-0"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-10"></div>
      
      <ThemeToggle className="absolute top-6 right-6 z-30" iconClassName="text-white" />

      <div className="relative z-20 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-2xl">
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary animate-fade-in-down">
            {t('hero.heading')}
          </h1>
          <p className="mt-6 font-body text-lg md:text-xl text-white/80 animate-fade-in-up delay-300">
            {t('hero.subheading')}
          </p>
          <Button 
            size="lg" 
            className="mt-10 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-xl hover:bg-background hover:text-primary border border-transparent hover:border-primary transition-all duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up delay-500"
            aria-label={t('hero.ctaButton')}
          >
            {t('hero.ctaButton')}
          </Button>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>
    </section>
  );
}
