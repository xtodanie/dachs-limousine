
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { Ticket, Wine, Briefcase } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Experience {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

export function LuxuryExperiencesSection() {
  const { t } = useTranslation();

  const experiences: Experience[] = [
    { id: 'football', icon: Ticket, titleKey: 'experiences.football.title', descriptionKey: 'experiences.football.description' },
    { id: 'wine', icon: Wine, titleKey: 'experiences.wineRoute.title', descriptionKey: 'experiences.wineRoute.description' },
    { id: 'corporate', icon: Briefcase, titleKey: 'experiences.corporate.title', descriptionKey: 'experiences.corporate.description' },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-headline text-3xl md:text-4xl text-primary mb-12">
          {t('experiences.heading', 'Experiencias de Lujo')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <Card key={exp.id} className="bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl text-center">
              <CardHeader className="flex flex-col items-center">
                <exp.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="font-headline text-2xl text-primary">{t(exp.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{t(exp.descriptionKey)}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
