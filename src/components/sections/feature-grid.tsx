"use client";

import { ShieldCheck, Armchair, Clock3, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

interface FeatureItemProps {
  icon: React.ElementType;
  titleKey: string;
  descriptionKey: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, titleKey, descriptionKey }) => {
  const { t } = useTranslation();
  return (
    <Card className="bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
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

export function FeatureGrid() {
  const features: FeatureItemProps[] = [
    { icon: ShieldCheck, titleKey: 'featureGrid.exclusivity.title', descriptionKey: 'featureGrid.exclusivity.description' },
    { icon: Armchair, titleKey: 'featureGrid.comfort.title', descriptionKey: 'featureGrid.comfort.description' },
    { icon: Clock3, titleKey: 'featureGrid.punctuality.title', descriptionKey: 'featureGrid.punctuality.description' },
    { icon: Users, titleKey: 'featureGrid.personalizedAttention.title', descriptionKey: 'featureGrid.personalizedAttention.description' },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
