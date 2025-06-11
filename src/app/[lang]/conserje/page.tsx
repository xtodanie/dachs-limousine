
import Link from 'next/link';
import type { Locale } from '../../../../middleware'; // Adjusted path
// To enable translations, make this component "use client"
// "use client";
// import { useTranslation } from '@/hooks/use-translation';

export default function ConserjePage({ params }: { params: { lang: Locale } }) {
  // const { t } = useTranslation(); // Uncomment if "use client" is enabled

  const regions = [
    { region: 'China', desc: 'Servicios adaptados a tradiciones y expectativas asiáticas.' },
    { region: 'Países Árabes', desc: 'Atención respetuosa con costumbres culturales.' },
    { region: 'Rusia', desc: 'Estándares de lujo para clientes exigentes.' },
    { region: 'Estados Unidos', desc: 'Eficiencia y excelencia al estilo americano.' },
  ];

  const experiences = [
    { title: 'Fútbol de élite', desc: 'Palcos VIP, cenas gourmet, traslados privados' },
    { title: 'Rutas de vino y aceite', desc: 'Bodegas exclusivas, catas privadas, acceso reservado' },
    { title: 'Eventos únicos', desc: 'Bodas, aniversarios, celebraciones de alto nivel' },
  ];

  // TODO: Replace static text with t() calls if this becomes a client component
  return (
    <main className="flex flex-col min-h-screen pt-16">
      <section className="bg-charcoal text-primary py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-headline">
          {/* {t('conserjePage.hero.title', 'Concierge VIP: Más allá del transporte')} */}
          Concierge VIP: Más allá del transporte
        </h1>
        <p className="mt-6 text-muted-foreground text-lg max-w-3xl mx-auto">
          {/* {t('conserjePage.hero.subtitle', 'Creamos momentos inolvidables adaptándonos a los deseos más exclusivos de nuestros clientes.')} */}
          Creamos momentos inolvidables adaptándonos a los deseos más exclusivos de nuestros clientes.
        </p>
      </section>

      <section className="bg-secondary py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-muted-foreground">
            {regions.map(({ region, desc }) => (
              <div key={region} className="bg-charcoal rounded-xl p-6 shadow-md hover:scale-105 transition-transform duration-300">
                <h2 className="text-primary text-xl font-medium mb-2">{region}</h2>
                <p className="text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal text-muted-foreground py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-headline text-primary mb-12 text-center">
            {/* {t('conserjePage.experiences.title', 'Ejemplos de experiencias personalizadas')} */}
            Ejemplos de experiencias personalizadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map(({ title, desc }) => (
              <div key={title} className="bg-secondary rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-primary text-lg mb-2">{title}</h3>
                <p className="text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground text-center py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl">
            {/* {t('conserjePage.cta.title', 'Solicita tu experiencia VIP')} */}
            Solicita tu experiencia VIP
          </h2>
          <p className="mt-3 mb-6 text-lg">
            {/* {t('conserjePage.cta.subtitle', 'Contáctanos para planear un servicio a tu medida, sin compromiso.')} */}
            Contáctanos para planear un servicio a tu medida, sin compromiso.
          </p>
          <Link
            href={`/${params.lang}/contacto`}
            className="inline-block bg-black text-primary px-8 py-3 rounded-full font-semibold hover:bg-slate-200 hover:text-foreground transition-colors duration-300 text-lg shadow-md transform hover:scale-105"
          >
            {/* {t('conserjePage.cta.button', 'Contactar ahora')} */}
            Contactar ahora
          </Link>
        </div>
      </section>
    </main>
  );
}
