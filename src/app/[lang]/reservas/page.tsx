
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, Users, MapPin } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import { useTranslation } from '@/hooks/use-translation';
import type { Locale } from '../../../../middleware';

// Import date-fns locales statically
import { es as esLocale } from 'date-fns/locale/es';
import { enUS as enUSLocale } from 'date-fns/locale/en-US';
import { fr as frLocale } from 'date-fns/locale/fr';
import { de as deLocale } from 'date-fns/locale/de';
import { it as itLocale } from 'date-fns/locale/it';
import { pt as ptLocale } from 'date-fns/locale/pt';
import { nl as nlLocale } from 'date-fns/locale/nl';
import { pl as plLocale } from 'date-fns/locale/pl';
import { arSA as arSALocale } from 'date-fns/locale/ar-SA';
import { zhCN as zhCNLocale } from 'date-fns/locale/zh-CN';
import { ja as jaLocale } from 'date-fns/locale/ja';
import type { Locale as DateFnsLocaleType } from 'date-fns';


// Map our app locales to date-fns locales
const dateFnsLocalesMap: Record<string, DateFnsLocaleType> = {
  es: esLocale,
  en: enUSLocale,
  fr: frLocale,
  de: deLocale,
  it: itLocale,
  pt: ptLocale,
  nl: nlLocale,
  pl: plLocale,
  ar: arSALocale, 
  zh: zhCNLocale,
  ja: jaLocale,
};

export default function ReservasPage({ params }: { params: { lang: Locale } }) {
  const { t, language, isRTL } = useTranslation();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [city, setCity] = React.useState<string | undefined>(undefined);
  const [pax, setPax] = React.useState<number | undefined>(1);
  const [availabilityMessage, setAvailabilityMessage] = React.useState<string | null>(null);

  const cities = [
    { value: 'barcelona', labelKey: 'cities.barcelona' },
    { value: 'madrid', labelKey: 'cities.madrid' },
    { value: 'sevilla', labelKey: 'cities.sevilla' },
    { value: 'valencia', labelKey: 'cities.valencia' },
    { value: 'ibiza', labelKey: 'cities.ibiza' },
    { value: 'malaga', labelKey: 'cities.malaga' },
    { value: 'otro', labelKey: 'cities.other' },
  ];

  // Determine the correct date-fns locale key based on app language
  const getDateFnsLocaleKey = (lang: Locale): string => {
    if (lang === 'zh') return 'zh'; // Mapped to zhCNLocale
    if (lang === 'en') return 'en'; // Mapped to enUSLocale
    if (lang === 'ar') return 'ar'; // Mapped to arSALocale
    return lang;
  };
  
  const currentAppLocaleKey = getDateFnsLocaleKey(language);
  const dateFnsLocale = dateFnsLocalesMap[currentAppLocaleKey] || enUSLocale; // Fallback to enUS

  const handleCheckAvailability = () => {
    if (!date || !city || !pax || pax < 1) {
      setAvailabilityMessage(t('reservasPage.availability.error', 'Por favor, complete todos los campos.'));
      return;
    }
    const selectedCityLabel = cities.find(c => c.value === city)?.labelKey;
    const displayCity = selectedCityLabel ? t(selectedCityLabel, city) : city;
    
    setAvailabilityMessage(
      t('reservasPage.availability.success', 
        `Gracias. Hemos recibido su solicitud para ${displayCity} el ${date.toLocaleDateString(t('common.locale', language), { year: 'numeric', month: 'long', day: 'numeric' })} para ${pax} persona(s). Uno de nuestros asesores se pondrá en contacto con usted en breve para confirmar la disponibilidad y los detalles.`,
        { 
          city: displayCity, 
          date: date.toLocaleDateString(t('common.locale', language), { year: 'numeric', month: 'long', day: 'numeric' }), 
          pax: pax.toString() 
        }
      )
    );
  };

  return (
    <main className="flex flex-col min-h-screen"> {/* Removed pt-16 as it's in [lang]/layout.tsx */}
      <section className="bg-charcoal text-primary py-16 md:py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-headline">
          {t('reservasPage.hero.title', 'Reserva tu experiencia exclusiva')}
        </h1>
        <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto">
          {t('reservasPage.hero.subtitle', 'Elija una fecha y uno de nuestros asesores lo contactará para diseñar un servicio a su medida.')}
        </p>
      </section>

      <section className="bg-secondary py-16 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-headline text-primary mb-10 text-center">
            {t('reservasPage.form.title', 'Planifica tu Viaje de Lujo')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col items-center md:items-start">
              <Label htmlFor="date-picker" className="mb-2 text-lg font-medium text-foreground">
                {t('reservasPage.calendar.title', 'Selecciona tu Fecha')}
              </Label>
              <Calendar
                id="date-picker"
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border bg-card text-card-foreground shadow-lg self-center md:self-auto"
                disabled={(current) => current < new Date(new Date().setDate(new Date().getDate() - 1))}
                dir={isRTL ? 'rtl' : 'ltr'}
                locale={dateFnsLocale} 
              />
               <p className="mt-3 text-muted-foreground text-sm text-center md:text-left w-full">
                {t('reservasPage.calendar.selectedDateLabel', 'Fecha seleccionada')}:{' '}
                {date ? date.toLocaleDateString(t('common.locale', language), { year: 'numeric', month: 'long', day: 'numeric' }) : t('reservasPage.calendar.noDateSelected', 'Ninguna')}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="city-select" className="mb-2 text-lg font-medium text-foreground flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  {t('reservasPage.form.cityLabel', 'Ciudad de Servicio')}
                </Label>
                <Select value={city} onValueChange={setCity} dir={isRTL ? 'rtl' : 'ltr'}>
                  <SelectTrigger id="city-select" className="w-full bg-card text-card-foreground">
                    <SelectValue placeholder={t('reservasPage.form.cityPlaceholder', 'Selecciona una ciudad')} />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(c => (
                      <SelectItem key={c.value} value={c.value}>{t(c.labelKey, c.value.charAt(0).toUpperCase() + c.value.slice(1))}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="pax-input" className="mb-2 text-lg font-medium text-foreground flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  {t('reservasPage.form.paxLabel', 'Número de Pasajeros')}
                </Label>
                <Input
                  id="pax-input"
                  type="number"
                  min="1"
                  value={pax === undefined ? '' : pax}
                  onChange={(e) => setPax(e.target.value === '' ? undefined : parseInt(e.target.value, 10))}
                  placeholder={t('reservasPage.form.paxPlaceholder', 'Ej: 2')}
                  className="w-full bg-card text-card-foreground"
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>
              
              <Button 
                onClick={handleCheckAvailability} 
                size="lg" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-md transform hover:scale-105 transition-transform duration-300 py-3"
              >
                {t('reservasPage.form.checkAvailabilityButton', 'Consultar Disponibilidad')}
              </Button>
            </div>
          </div>

          {availabilityMessage && (
            <div className={`mt-8 p-4 rounded-md text-center ${availabilityMessage.includes(t('reservasPage.availability.successPrefix', 'Gracias')) ? 'bg-green-100 border border-green-300 text-green-800' : 'bg-red-100 border border-red-300 text-red-800'}`}>
              <p>{availabilityMessage}</p>
            </div>
          )}
           <p className="mt-8 text-muted-foreground text-sm text-center max-w-xl mx-auto">
            {t('reservasPage.calendar.confirmationNote', 'Tras completar su solicitud, nuestro equipo revisará la disponibilidad y se pondrá en contacto con usted para confirmar y personalizar su reserva.')}
          </p>
        </div>
      </section>
      
      <section className="py-12 md:py-16 px-6 text-center bg-background">
        <div className="container mx-auto max-w-3xl text-muted-foreground">
          <h3 className="text-2xl font-headline text-primary mb-6">
            {t('reservasPage.support.title', 'Apoyo y Contacto Alternativo')}
          </h3>
          <p className="text-lg mb-4">
            {t('reservasPage.support.urgentContactIntro', 'Para consultas urgentes o asistencia inmediata, por favor contáctenos al:')}
            <a href="tel:+34608491219" className="font-semibold text-primary hover:underline ml-2 whitespace-nowrap">
              +34 608 491 219
            </a>
          </p>
          <div className="my-6">
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300">
              <a 
                href="https://api.whatsapp.com/send?phone=34608491219&text=" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={t('reservasPage.support.whatsappAriaLabel', 'Contactar por WhatsApp')}
              >
                <Phone className="mr-2 h-5 w-5" />
                {t('reservasPage.support.whatsappButton', 'Contactar por WhatsApp')}
              </a>
            </Button>
          </div>
          <p className="text-sm mt-8">
            {t('reservasPage.support.legalNotice', 'Las reservas están sujetas a disponibilidad y confirmación manual por parte del equipo de Dachs Limousines.')}
          </p>
        </div>
      </section>
    </main>
  );
}

    