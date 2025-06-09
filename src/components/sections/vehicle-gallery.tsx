"use client";

import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';

interface VehicleImage {
  src: string;
  altKey: string;
  aiHint: string;
}

export function VehicleGallery() {
  const { t } = useTranslation();

  const vehicles: VehicleImage[] = [
    { src: "https://placehold.co/600x400.png", altKey: "vehicleGallery.imageAlt1", aiHint: "luxury sedan Barcelona" },
    { src: "https://placehold.co/600x400.png", altKey: "vehicleGallery.imageAlt2", aiHint: "SUV event Barcelona" },
    { src: "https://placehold.co/600x400.png", altKey: "vehicleGallery.imageAlt3", aiHint: "vintage limousine wedding" },
    { src: "https://placehold.co/600x400.png", altKey: "vehicleGallery.imageAlt4", aiHint: "luxury van Barcelona" },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-headline text-4xl md:text-5xl font-bold text-primary mb-12">
          {t('vehicleGallery.heading')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-w-3 aspect-h-2 group">
              <Image
                src={vehicle.src}
                alt={t(vehicle.altKey)}
                data-ai-hint={vehicle.aiHint}
                width={600}
                height={400}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
