
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { Award, Users, PhoneForwarded, CarFront } from 'lucide-react';
import type { Locale } from '../../../../middleware'; // Adjusted path

export default function SobrePage({ params }: { params: { lang: Locale } }) {
  const { t, language } = useTranslation();

  const differentiators = [
    { icon: Award, textKey: 'sobrePage.differentiators.experience' },
    { icon: Users, textKey: 'sobrePage.differentiators.drivers' },
    { icon: PhoneForwarded, textKey: 'sobrePage.differentiators.attention' },
    { icon: CarFront, textKey: 'sobrePage.differentiators.fleet' },
  ];

  return (
    <main className="flex flex-col min-h-screen pt-16 bg-background text-muted-foreground">
      <section className="bg-charcoal py-20 md:py-28 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-headline text-4xl md:text-6xl text-primary">
            {t('sobrePage.hero.title', 'Más de 80 años de excelencia sobre ruedas')}
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto italic">
            {t('sobrePage.hero.subtitle', 'Pioneros en el alquiler de vehículos con chófer en España desde 1940.')}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="font-headline text-3xl md:text-4xl text-primary">
                {t('sobrePage.history.title', 'Nuestra Historia')}
              </h2>
              <p className="text-lg leading-relaxed">
                {t('sobrePage.history.paragraph1', 'Desde 1940, Dachs Limousines ha definido el estándar del transporte exclusivo en España.')}
              </p>
              <p className="leading-relaxed">
                {t('sobrePage.history.paragraph2', 'Como una de las empresas pioneras en el alquiler de coches con chófer en Barcelona, hemos acompañado a generaciones de clientes con un compromiso inquebrantable por la puntualidad, la elegancia y el confort.')}
              </p>
              <p className="leading-relaxed">
                {t('sobrePage.history.paragraph3', 'Nuestra flota incluye desde berlinas ejecutivas hasta lujosas limusinas, vans, minibuses y autocares, todos equipados para satisfacer las expectativas de quienes exigen lo mejor.')}
              </p>
               <p className="leading-relaxed">
                {t('sobrePage.history.paragraph4', 'Cada detalle ha sido cuidado con esmero. Con conductores multilingües altamente formados, ofreciendo algo más que un trayecto: una experiencia sin fricciones, con estilo y discreción.')}
              </p>
              <p className="font-headline text-xl text-primary pt-4">
                {t('sobrePage.history.slogan', 'Elegancia en movimiento. Desde 1940.')}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Image
                src="https://placehold.co/400x500.png"
                alt={t('sobrePage.history.imageAlt1', 'Vehículo Dachs clásico en Barcelona')}
                data-ai-hint="classic car Barcelona"
                width={400}
                height={500}
                className="rounded-xl shadow-xl object-cover w-full h-[350px] md:h-[450px]"
              />
              <Image
                src="https://placehold.co/400x500.png"
                alt={t('sobrePage.history.imageAlt2', 'Chófer profesional Dachs Limousines')}
                data-ai-hint="chauffeur professional uniform"
                width={400}
                height={500}
                className="rounded-xl shadow-xl object-cover w-full h-[350px] md:h-[450px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-headline text-3xl md:text-4xl text-primary mb-12 md:mb-16">
            {t('sobrePage.differentiators.title', 'Un Servicio Pensado Para Usted')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((item, index) => (
              <div key={index} className="bg-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">{t(item.textKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/30 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-headline text-3xl md:text-4xl text-primary mb-8">
            {t('sobrePage.cta.title', '¿Listo para vivir el siguiente nivel de transporte de lujo?')}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 font-semibold shadow-md hover:scale-105 transition-transform">
              <Link href={`/${language}/reservas`}>
                {t('sobrePage.cta.reserveButton', 'Reserve su experiencia VIP')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-3 font-semibold shadow-md hover:scale-105 transition-transform">
              <Link href={`/${language}/contacto`}>
                {t('sobrePage.cta.contactButton', 'Contáctenos')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
