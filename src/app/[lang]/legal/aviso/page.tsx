
"use client";

import { useTranslation } from '@/hooks/use-translation';
import type { Locale } from '../../../../../middleware'; // Adjusted path

export default function LegalNoticePage({ params }: { params: { lang: Locale } }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto max-w-4xl py-16 px-6 text-muted-foreground">
        <h1 className="text-3xl md:text-4xl font-headline text-primary mb-8 text-center">
          {t('legal.notice.title', 'Aviso Legal')}
        </h1>
        <div className="space-y-6 prose prose-invert max-w-none">
          <p>{t('legal.contentPending', 'Contenido pendiente de cargar.')}</p>
        </div>
      </div>
    </div>
  );
}
