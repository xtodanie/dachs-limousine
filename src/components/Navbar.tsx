
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/hooks/use-translation';
import { useLanguage } from '@/contexts/language-context';
import { cn } from '@/lib/utils';
import { i18n, type Locale } from '../../middleware'; // Corrected path
import { usePathname } from 'next/navigation';


interface NavLink {
  href: string;
  labelKey: string;
}

const languageNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
  nl: "Nederlands",
  pl: "Polski",
  ar: "العربية",
  zh: "中文 (简体)",
  ja: "日本語",
};


export function Navbar() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, availableLanguages } = useLanguage();
  const pathname = usePathname();

  const navLinks: NavLink[] = [
    { href: '/', labelKey: 'navbar.home' },
    { href: '/servicios', labelKey: 'navbar.services' },
    { href: '/sobre', labelKey: 'navbar.aboutUs' },
    { href: '/empresas', labelKey: 'navbar.corporate' },
    { href: '/conserje', labelKey: 'navbar.conciergeVip' },
    { href: '/reservas', labelKey: 'navbar.reservations' },
    { href: '/contacto', labelKey: 'navbar.contact' },
  ];

  const getLocalizedPath = (path: string, locale: Locale) => {
    if (path === '/') return `/${locale}`;
    return `/${locale}${path}`;
  };
  
  const getCurrentPathWithoutLocale = () => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    if (segments.length > 1 && i18n.locales.includes(segments[1] as Locale)) {
      return '/' + segments.slice(2).join('/') || '/';
    }
    return pathname;
  };


  const NavLinksComponent: React.FC<{ mobile?: boolean }> = ({ mobile = false }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={getLocalizedPath(link.href, language)}
          onClick={() => mobile && setIsMobileMenuOpen(false)}
          className={cn(
            "px-4 py-2 text-sm uppercase tracking-wide transition hover:text-primary text-muted-foreground",
            mobile && "block w-full text-left hover:bg-accent"
          )}
        >
          {t(link.labelKey)}
        </Link>
      ))}
    </>
  );
  
  return (
    <nav className={cn(
        "fixed top-0 w-full h-16 text-muted-foreground flex items-center justify-between px-4 sm:px-6 z-50 shadow-md",
        theme === 'dark' ? 'bg-black' : 'bg-slate-200' 
      )}>
      <Link href={getLocalizedPath('/', language)} className="text-primary text-xl font-headline font-bold tracking-wider">
        {t('navbar.logoText', 'Dachs Limousines')}
      </Link>

      <div className="hidden md:flex items-center gap-2">
        <NavLinksComponent />
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggle iconClassName="text-muted-foreground hover:text-primary" />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={t('navbar.changeLanguage', 'Change language')}>
              <Globe className="h-5 w-5 text-muted-foreground hover:text-primary" />
              <span className="ml-1 text-xs uppercase">{language}</span>
              <ChevronDown className="h-4 w-4 opacity-50 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background border-border shadow-xl">
            {availableLanguages.map((loc) => (
              <DropdownMenuItem
                key={loc}
                onClick={() => setLanguage(loc)}
                className={cn(
                  "cursor-pointer hover:bg-accent hover:text-accent-foreground",
                  language === loc && "bg-accent text-accent-foreground"
                )}
              >
                {languageNames[loc]} ({loc.toUpperCase()})
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t('navbar.openMenu', 'Open menu')}>
                <Menu className="h-6 w-6 text-muted-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className={cn(
                "w-[250px] sm:w-[300px] p-0",
                theme === 'dark' ? 'bg-black' : 'bg-slate-200' 
              )}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-border">
                   <Link href={getLocalizedPath('/', language)} onClick={() => setIsMobileMenuOpen(false)} className="text-primary text-lg font-headline font-bold tracking-wider">
                     {t('navbar.logoText', 'Dachs Limousines')}
                   </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" aria-label={t('navbar.closeMenu', 'Close menu')}>
                      <X className="h-6 w-6 text-muted-foreground" />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-2 p-4">
                  <NavLinksComponent mobile />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
