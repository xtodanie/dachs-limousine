
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/hooks/use-translation';
import { MapPin, Phone, Printer, Mail } from 'lucide-react';
import Link from 'next/link';
import type { Locale } from '../../../../middleware'; // Adjusted path

export default function ContactoPage({ params }: { params: { lang: Locale } }) {
  const { t, language } = useTranslation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(t('contactoPage.form.submitAlert', 'Formulario enviado (simulación). Gracias por contactarnos.'));
  };

  const contactDetails = [
    { icon: MapPin, text: t('contactoPage.info.addressValue', 'C/ Valencia, 455, 08013 BARCELONA'), href: `https://www.google.com/maps?q=${encodeURIComponent('C/ Valencia, 455, 08013 BARCELONA')}` },
    { icon: Phone, text: t('contactoPage.info.phoneValue', '93 231 45 07'), href: 'tel:932314507' },
    { icon: Printer, text: t('contactoPage.info.faxValue', '93 265 48 43'), href: 'tel:932654843' }, 
    { icon: Mail, text: t('contactoPage.info.emailValue', 'info@dachslimousines.com'), href: 'mailto:info@dachslimousines.com' },
  ];

  return (
    <main className="flex flex-col min-h-screen pt-16 bg-background text-muted-foreground">
      <section className="py-16 md:py-20 text-center bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-headline text-4xl md:text-5xl text-primary">
            {t('contactoPage.hero.title', 'Contáctenos para una experiencia personalizada')}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            {t('contactoPage.hero.subtitle', 'Estaremos encantados de ayudarle a planificar un trayecto inolvidable')}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            <div className="bg-card p-6 sm:p-8 rounded-xl shadow-xl">
              <h2 className="font-headline text-3xl text-primary mb-6">
                {t('contactoPage.form.title', 'Envíanos un mensaje')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fullName" className="block text-sm font-medium mb-1">
                    {t('contactoPage.form.fullNameLabel', 'Nombre completo')}
                  </Label>
                  <Input 
                    type="text" 
                    id="fullName" 
                    name="fullName" 
                    required 
                    className="w-full bg-input border-border focus:border-primary focus:ring-primary text-foreground" 
                    placeholder={t('contactoPage.form.fullNamePlaceholder', 'Juan Pérez')}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium mb-1">
                    {t('contactoPage.form.emailLabel', 'Email')}
                  </Label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full bg-input border-border focus:border-primary focus:ring-primary text-foreground"
                    placeholder={t('contactoPage.form.emailPlaceholder', 'juan.perez@example.com')}
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium mb-1">
                    {t('contactoPage.form.phoneLabel', 'Teléfono')}
                  </Label>
                  <Input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    className="w-full bg-input border-border focus:border-primary focus:ring-primary text-foreground"
                    placeholder={t('contactoPage.form.phonePlaceholder', '+34 600 000 000')}
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium mb-1">
                    {t('contactoPage.form.messageLabel', 'Mensaje')}
                  </Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    required 
                    className="w-full bg-input border-border focus:border-primary focus:ring-primary text-foreground"
                    placeholder={t('contactoPage.form.messagePlaceholder', 'Escriba su consulta aquí...')}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" name="terms" required className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                  <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                    {t('contactoPage.form.termsLabel', 'He leído y acepto los términos y la política de privacidad')}
                  </Label>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground rounded-full px-6 py-3 text-base font-semibold hover:bg-primary/90 hover:scale-105 transition-transform duration-300 shadow-md"
                >
                  {t('contactoPage.form.submitButton', 'Enviar solicitud')}
                </Button>
              </form>
            </div>

            <div className="space-y-12">
              <div>
                <h2 className="font-headline text-3xl text-primary mb-6">
                  {t('contactoPage.info.title', 'Nuestra Información')}
                </h2>
                <ul className="space-y-4">
                  {contactDetails.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <item.icon className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="font-headline text-3xl text-primary mb-6">
                  {t('contactoPage.map.title', 'Encuéntranos')}
                </h2>
                <div className="overflow-hidden rounded-lg shadow-xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.691347475019!2d2.179286815401604!3d41.40089007926299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2c4ac9d6a9b%3A0x8d2c5f2b8708e353!2sCarrer%20de%20Val%C3%A8ncia%2C%20455%2C%20L&#39;Eixample%2C%2008013%20Barcelona%2C%20Spain!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                    width="100%"
                    height="350"
                    style={{ border:0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t('contactoPage.map.iframeTitle', 'Ubicación de Dachs Limousines en Google Maps')}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 text-center bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-headline text-3xl md:text-4xl text-primary mb-6">
            {t('contactoPage.finalCta.title', '¿Prefiere que lo contactemos nosotros?')}
          </h2>
          <Button 
            asChild 
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-3 text-base font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
          >
            <Link href={`/${language}/reservas`}>
              {t('contactoPage.finalCta.button', 'Solicitar llamada VIP')}
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
