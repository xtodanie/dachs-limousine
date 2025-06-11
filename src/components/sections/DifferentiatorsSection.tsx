
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { Sparkles, Clock3, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface DifferentiatorItemProps {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

const DifferentiatorItem: React.FC<DifferentiatorItemProps> = ({ icon: Icon, titleKey, descriptionKey }) => {
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

export function DifferentiatorsSection() {
  const { t } = useTranslation();

  const differentiatorItems: DifferentiatorItemProps[] = [
    { icon: Sparkles, titleKey: 'differentiators.detail.title', descriptionKey: 'differentiators.detail.description' },
    { icon: Clock3, titleKey: 'differentiators.punctuality.title', descriptionKey: 'differentiators.punctuality.description' },
    { icon: Users, titleKey: 'differentiators.personalized.title', descriptionKey: 'differentiators.personalized.description' },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl text-primary">
            {t('differentiators.heading', 'La excelencia como punto de partida')}
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {differentiatorItems.map((item, index) => (
            <DifferentiatorItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
