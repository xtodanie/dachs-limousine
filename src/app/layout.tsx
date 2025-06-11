
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
  weight: ['400', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Dachs Limousines Reimagined',
  description: 'Luxury limousine services in Barcelona since 1940.',
};

// This script is run on the client before React hydrates.
// It sets the theme based on localStorage or system preference.
const themeInitializerScript = `
  (function() {
    try {
      var d = document.documentElement,
          c = d.classList;
      c.remove('light', 'dark'); // Remove any existing theme classes
      var e = localStorage.getItem('theme'); // Check localStorage for a saved theme
      if (e) {
        c.add(e);
      } else {
        // If no saved theme, check system preference
        var m = window.matchMedia('(prefers-color-scheme: dark)').matches;
        c.add(m ? 'dark' : 'light');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
      </head>
      <body className={`${inter.variable} ${playfair_display.variable} font-body antialiased`}>
        <ThemeProvider attribute="class">
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
