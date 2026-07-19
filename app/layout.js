import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

//  HIGH-PERFORMANCE GLOBAL SEO METADATA CONFIGURATION
export const metadata = {
  metadataBase: new URL('https://shomicor.es'),
  title: {
    template: '%s | Shomicor Premium',
    default: "Shomicor | Handcrafted Luxury Silver Jewelry & Leather Goods", 
  },
   icons: {
    icon: '/Shomicor_logo.png',         // Points to public/Shomicor_logo.png
    shortcut: '/Shomicor_logo.png',     // Shortcut backup mapping tracking parameters
    apple: '/Shomicor_logo.png',        // Automatically pins high contrast themes on iOS home screens
  },
  description: "Descubre las colecciones exclusivas de Shomicor. Joyería de plata de primera calidad de ley 925, piezas artesanales y artículos de cuero de lujo hechos a mano.",
  keywords: ["joyería de plata", "plata de ley 925", "artículos de cuero de lujo", "moda premium españa", "Shomicor", "luxury jewelry europe"],
  
  //  CRAWLER SEARCH OPTIMIZATION 
  alternates: {
    canonical: 'https://shomicor.es',
    languages: {
      'es-ES': 'https://shomicor.es',      // Primary Target: Spain Regional Market
      'en-EU': 'https://shomicor.es',   // Secondary Target: Global European English Market
      'x-default': 'https://shomicor.es',  // Fallback Catch-All Crawler Directives
    },
  },

  //  PREMIUM EUROPEAN OPEN GRAPH METRICS
  openGraph: {
    title: "Shomicor | Joyería de Plata de Ley y Cuero de Lujo",
    description: "Colecciones exclusivas de alta joyería de plata y artesanía en cuero premium con envío europeo gratuito.",
    url: 'https://shomicor.es',
    siteName: 'Shomicor',
    locale: 'es_ES',
    type: 'website',
    images: [
      { 
        url: '/assets/og-home.jpg', 
        width: 1200, 
        height: 630,
        alt: 'Shomicor Premium Luxury Lookbook Collection Display'
      }
    ],
  },

  //  SECURE GLOBAL BOT CRAWLING CONSTRAINTS
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  //  DRILLDOWN METADATA PROFILES
  twitter: {
    card: 'summary_large_image',
    title: 'Shomicor Premium Luxury Collections',
    description: 'Joyería de plata de ley 925 y cuero de lujo hechos a mano.',
    images: ['/assets/og-home.jpg'],
  }
};

//  PERFORMANCE EDGE PRE-FETCH STRUCT MATRIX
export const viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es" 
      className="scroll-smooth h-full antialiased"
      style={{ colorScheme: 'dark' }} 
    >
      <head>
        <link rel="preconnect" href="https://cloudinary.com" crossOrigin="anonymous" />
        <meta name="geo.region" content="ES" />
        <meta name="geo.placename" content="Madrid" />
      </head>
      <body className="h-full bg-black text-white font-sans overflow-x-hidden">
        {children}
        <Analytics /> 
        <SpeedInsights /> 
      </body>
    </html>
  );
}
