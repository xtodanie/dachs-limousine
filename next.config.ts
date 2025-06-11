
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // The i18n object is typically for Pages Router. 
  // For App Router with middleware, this is not strictly needed 
  // unless you have specific fallback behaviors or domain routing.
  // For path-prefixing with middleware, it's usually omitted here.
  // i18n: {
  //   locales: ['es', 'en', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ar', 'zh', 'ja'],
  //   defaultLocale: 'es',
  //   localeDetection: false, // Middleware handles detection
  // },
};

export default nextConfig;
