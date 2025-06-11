
"use client";

// This component is effectively replaced by AIConcierge.tsx
// Keeping the file to avoid breaking existing imports if any, but it's not used in layout.tsx anymore.
// Consider deleting this file if AIConcierge.tsx is the permanent solution.

import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export default function ChatWidget() {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="default"
        size="lg"
        className="bg-primary text-primary-foreground rounded-full shadow-xl hover:opacity-90 transition-opacity duration-300 transform hover:scale-105 px-6 py-3"
        aria-label={t('chatWidget.trigger', 'Chat con Dachs')}
      >
        <MessageSquare className="mr-2 h-5 w-5" />
        {t('chatWidget.trigger', 'Chat con Dachs')}
      </Button>
    </div>
  );
}

    