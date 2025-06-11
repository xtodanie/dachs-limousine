
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { Plane, Heart, Briefcase, MapPin, CheckCircle2 } from 'lucide-react';
import type { Locale } from '../../../../middleware'; // Adjusted path

export default function EmpresasPage({ params }: { params: { lang: Locale } }) {
  const { t, language } = useTranslation();

  const services = [
    {
      icon: Plane,
      titleKey: 'empresasPage.services.corporate.title',
      descriptionKey: 'empresasPage.services.corporate.description',
    },
    {
      icon: Heart,
      titleKey: 'empresasPage.services.weddings.title',
      descriptionKey: 'empresasPage.services.weddings.description',
    },
    {
      icon: Briefcase,
      titleKey: 'empresasPage.services.congresses.title',
      descriptionKey: 'empresasPage.services.congresses.description',
    },
    {
      icon: MapPin,
      titleKey: 'empresasPage.services.vipTourism.title',
      descriptionKey: 'empresasPage.services.vipTourism.description',
    },
  ];

  const benefits = [
    'empresasPage.benefits.fleet',
    'empresasPage.benefits.drivers',
    'empresasPage.benefits.organization',
    'empresasPage.benefits.budgets',
    'empresasPage.benefits.attention',
    'empresasPage.benefits.activeFor',
  ];

  return (
    <main className="flex flex-col min-h-screen pt-16 bg-background text-muted-foreground">
      <section className="bg-charcoal py-20 md:py-28 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary">
            {t('empresasPage.hero.title', 'Soluciones de movilidad de alto nivel para empresas y eventos')}
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto">
            {t('empresasPage.hero.subtitle', 'Confíe en Dachs Limousines para traslados premium en congresos, bodas, viajes corporativos y logística de grupos.')}
          </p>
          <Button asChild size="lg" className="mt-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 font-semibold shadow-md hover:scale-105 transition-transform">
            <Link href={`/${language}/contacto`}>
              {t('empresasPage.hero.cta', 'Solicitar propuesta personalizada')}
            </Link>
          </Button>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-secondary/30">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt={t('empresasPage.leadersSection.bgAlt', 'Corporate event background')}
          data-ai-hint="corporate event logistics"
          fill
          style={{objectFit: 'cover'}}
          className="z-0"
        />
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className="container mx-auto px-6 relative z-20 max-w-3xl text-center md:text-left">
          <h2 className="font-headline text-3xl md:text-4xl text-primary mb-6">
            {t('empresasPage.leadersSection.title', 'Líderes en movilidad premium desde 1940')}
          </h2>
          <p className="text-lg leading-relaxed mb-4 text-slate-200">
            {t('empresasPage.leadersSection.paragraph1', 'En Dachs Limousines llevamos más de 80 años al servicio de empresas, instituciones y clientes exigentes.')}
          </p>
          <p className="text-lg leading-relaxed text-slate-200">
            {t('empresasPage.leadersSection.paragraph2', 'Nuestra experiencia nos permite ofrecer soluciones completas en movilidad premium: desde traslados individuales hasta la logística integral para eventos con cientos de asistentes, garantizando siempre puntualidad, discreción y el máximo confort.')}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="font-headline text-3xl md:text-4xl text-primary mb-12 md:mb-16 text-center">
            {t('empresasPage.services.heading', 'Servicios Diseñados para el Éxito de su Evento')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
                <service.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-headline text-xl text-foreground mb-2">{t(service.titleKey)}</h3>
                <p className="text-sm text-muted-foreground flex-grow">{t(service.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-headline text-3xl md:text-4xl text-primary mb-12 text-center">
            {t('empresasPage.benefits.heading', 'Una flota premium, una experiencia impecable')}
          </h2>
          <ul className="space-y-6">
            {benefits.map((benefitKey, index) => (
              <li key={index} className="flex items-start text-lg">
                <CheckCircle2 className="h-7 w-7 text-primary mr-4 flex-shrink-0" />
                <span>{t(benefitKey)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-headline text-3xl md:text-4xl mb-8">
            {t('empresasPage.finalCta.title', '¿Organiza un evento o necesita movilidad ejecutiva de lujo?')}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Button asChild size="lg" className="bg-background text-primary hover:bg-background/90 rounded-full px-8 py-3 font-semibold shadow-md hover:scale-105 transition-transform">
              <Link href={`/${language}/contacto`}>
                {t('empresasPage.finalCta.ctaButton1', 'Solicitar presupuesto')}
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-background text-primary hover:bg-background/90 rounded-full px-8 py-3 font-semibold shadow-md hover:scale-105 transition-transform">
              <Link href={`/${language}/servicios`}>
                {t('empresasPage.finalCta.ctaButton2', 'Ver nuestra flota')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
