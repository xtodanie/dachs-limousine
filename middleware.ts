
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

export const i18n = {
  defaultLocale: 'es',
  locales: ['es', 'en', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ar', 'zh', 'ja'] as const,
  rtlLocales: ['ar'] as const,
};

export type Locale = (typeof i18n)['locales'][number];

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore languages are readonly
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  // Ensure i18n.locales is an array of strings for matchLocale
  const locales: string[] = [...i18n.locales];
  
  try {
    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch (e) {
    // Fallback if matchLocale throws an error (e.g. if locales array is not as expected)
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Skip API routes, Next.js specific paths, and static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    /\.(jpe?g|png|gif|svg|ico|webmanifest|xml|txt|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)$/i.test(pathname) || // Added common media and font extensions
    pathname.startsWith('/locales/') // Don't rewrite requests for locale files
  ) {
    return NextResponse.next();
  }
  
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /es/products (or other detected locale)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|locales|images|fonts|videos|sitemap.xml|robots.txt).*)'], // Added more common static files/paths to ignore
};
