
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { Gem, CarFront, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface LegacyItemProps {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

const LegacyItem: React.FC<LegacyItemProps> = ({ icon: Icon, titleKey, descriptionKey }) => {
  const { t } = useTranslation();
  return (
    <Card className="bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl flex-1">
      <CardHeader className="flex flex-col items-center text-center">
        <Icon className="h-12 w-12 text-primary mb-4" />
        <CardTitle className="font-headline text-2xl text-primary">{t(titleKey)}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground">{t(descriptionKey)}</p>
      </CardContent>
    </Card>
  );
};

export function LegacySection() {
  const { t } = useTranslation();

  const legacyItems: LegacyItemProps[] = [
    { icon: Gem, titleKey: 'legacy.tradition.title', descriptionKey: 'legacy.tradition.description' },
    { icon: CarFront, titleKey: 'legacy.fleet.title', descriptionKey: 'legacy.fleet.description' },
    { icon: ShieldCheck, titleKey: 'legacy.discretion.title', descriptionKey: 'legacy.discretion.description' },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl text-primary">
            {t('legacy.heading', 'Un legado de excelencia desde 1940')}
          </h2>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            {t('legacy.subheading', 'Más de ocho décadas de servicio exclusivo en toda España.')}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {legacyItems.map((item, index) => (
            <LegacyItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
