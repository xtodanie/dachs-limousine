
"use client";

import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';

export function Footer() {
  const { t } = useTranslation();

  const legalLinks = [
    { href: '/legal/cookies', labelKey: 'footer.legal.cookies' },
    { href: '/legal/privacidad', labelKey: 'footer.legal.privacy' },
    { href: '/legal/redes', labelKey: 'footer.legal.social' },
    { href: '/legal/aviso', labelKey: 'footer.legal.notice' },
    { href: '/legal/terminos', labelKey: 'footer.legal.terms' },
  ];

  return (
    <footer className="bg-secondary text-muted-foreground py-8 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4">
          <nav aria-label={t('footer.legal.navLabel', 'Legal links')}>
            <ul className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary hover:text-foreground transition-colors duration-300"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} {t('footer.copyrightName', 'Dachs Limousines S.L.')} {t('footer.copyrightRights', 'Todos los derechos reservados.')}
        </p>
      </div>
    </footer>
  );
}
