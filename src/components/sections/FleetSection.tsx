
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

interface Vehicle {
  id: string;
  imageSrc: string;
  imageAltKey: string;
  aiHint: string;
  nameKey: string;
  descriptionKey: string;
}

export function FleetSection() {
  const { t } = useTranslation();

  const vehicles: Vehicle[] = [
    { id: 's-class', imageSrc: "https://placehold.co/600x400.png", imageAltKey: "fleet.sClass.alt", aiHint: "Mercedes S-Class black", nameKey: 'fleet.sClass.name', descriptionKey: 'fleet.sClass.description' },
    { id: 'suv', imageSrc: "https://placehold.co/600x400.png", imageAltKey: "fleet.suv.alt", aiHint: "Executive SUV black", nameKey: 'fleet.suv.name', descriptionKey: 'fleet.suv.description' },
    { id: 'van', imageSrc: "https://placehold.co/600x400.png", imageAltKey: "fleet.van.alt", aiHint: "Luxury Van interior", nameKey: 'fleet.van.name', descriptionKey: 'fleet.van.description' },
    { id: 'classic', imageSrc: "https://placehold.co/600x400.png", imageAltKey: "fleet.classic.alt", aiHint: "Classic limousine white", nameKey: 'fleet.classic.name', descriptionKey: 'fleet.classic.description' },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-headline text-3xl md:text-4xl text-primary mb-12">
          {t('fleet.heading', 'Flota de Élite')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  src={vehicle.imageSrc}
                  alt={t(vehicle.imageAltKey)}
                  data-ai-hint={vehicle.aiHint}
                  width={600}
                  height={338} // Adjusted for 16:9
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">{t(vehicle.nameKey)}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{t(vehicle.descriptionKey)}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
