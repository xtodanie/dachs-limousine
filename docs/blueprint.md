# **App Name**: Dachs Limousines Reimagined

## Core Features:

- Hero Section Recreation: Faithfully replicate the Dachs Limousines hero section from the reference image using Next.js and TailwindCSS.
- Responsive Feature Grid: Implement a responsive feature grid below the hero section with a 2x2 layout for mobile and a 4x1 layout for desktop.
- Concierge VIP Section: Create a 'Concierge VIP' section with a column layout showcasing culturally personalized service offerings.
- Vehicle Showcase Gallery: Display a showcase gallery with 3-4 images of luxury vehicles in various Barcelona locations.
- Final Call to Action: Include a final call to action section with two buttons: 'Contactanos' and 'Comparte esta experiencia'.
- Theme Toggle: Add a theme toggle for light and dark mode.
- Multilingual Support: Offer multilingual support, beginning with English and Spanish and also displaying "CONSERJERÍA VIP" to show internal service based on elite clients protocols. Automatically adapting UX/UI copy based on geolocation (default Español if in Spain/LatAm).
- Hero Section: The Hero Section: Layout: Full viewport height (min-h-screen), center-aligned content with left-aligned text. Background: High-resolution image of a luxury limousine on Passeig de Gràcia at golden hour. Use bg-cover, bg-center, with dark gradient overlay (from black to transparent) to improve text readability. Overlay: absolute inset-0 bg-gradient-to-r from-black/90 to-transparent z-10 Content Positioning: Container (max-w-7xl) with padding-x and z-20 text on top of overlay. Typography: Heading: 'MÁS ALLÁ DEL LUJO. DESDE 1940.' in 'Playfair Display', serif, text-5xl md:text-7xl, text-gold (#D4AF37) Subheading: 'Desde Barcelona para el mundo. Servicios VIP con más de 80 años de legado.' in 'Inter', text-white/80, text-lg md:text-xl CTA Button: Text: 'Solicita tu experiencia VIP' Style: bg-gold text-black px-8 py-3 rounded-full font-semibold shadow-xl Hover: bg-black text-gold border border-gold transition-all duration-300 ease-in-out Additional: Theme toggle icon in top-right corner (🌙 / ☀️), absolute top-6 right-6 z-30, color-white Responsiveness: All content scales gracefully from mobile (sm:) to large screens (2xl:container)

## Style Guidelines:

- Primary background: Deep Onyx Black (#0E0E0E) for full background, sections, and navbar in dark mode; Pearl White (#F7F7F7) for the page background in light mode.
- Accent gold: Champagne Gold (#D4AF37) for CTAs, hover effects, icons, and borders, consistent across both light and dark modes.
- Primary text: Pearl White (#F7F7F7) for headings and body text in dark mode; Deep Onyx Black (#0E0E0E) in light mode.
- Headings: 'Playfair Display', serif, for a prestige feel.
- Body: 'Inter', sans-serif, for modern UI elements.
- Theme toggle: White icons (🌙 / ☀️) on a dark background.
- Hero Section: Fullscreen (min-h-screen) with darkened background image (bg-black/70 overlay).