import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// HIGH-PERFORMANCE GLOBAL SEO METADATA CONFIGURATION
export const metadata = {
  metadataBase: new URL('https://shomicor.es'),
  title: {
    template: '%s | Shomicor Premium Jewelry Spain',
    default: "Shomicor | Handcrafted Luxury Silver Jewelry & Leather Goods in Spain", 
  },
  icons: {
    icon: '/Shomicor_logo.png',
    shortcut: '/Shomicor_logo.png',
    apple: '/Shomicor_logo.png',
  },
  description: "Descubre las colecciones exclusivas de Shomicor. Joyería de plata de primera calidad de ley 925, piezas artesanales y artículos de cuero de lujo hechos a mano. Envío gratis a toda España.",
  keywords: [
    "joyería de plata", 
    "plata de ley 925", 
    "joyería artesanal españa", 
    "artículos de cuero de lujo", 
    "moda premium españa", 
    "Shomicor", 
    "luxury jewelry europe",
    "joyería de diseño",
    "joyería sostenible",
    "anillos de plata",
    "pendientes de plata",
    "colgantes de plata",
    "joyería personalizada",
    "regalos originales españa",
    "joyería de autor",
    "comprar joyería online",
        "silver jewelry", 
    "925 sterling silver", 
    "Spanish artisan jewelry", 
    "luxury leather goods", 
    "premium Spanish fashion", 
    "Shomicor", 
    "luxury jewelry Europe",
    "designer jewelry",
    "sustainable jewelry",
    "silver rings",
    "silver earrings",
    "silver pendants",
    "personalized jewelry",
    "unique gifts from Spain",
    "original designer jewelry",
    "buy jewelry online"
  ],

  alternates: {
    canonical: 'https://shomicor.es',
    languages: {
      'es-ES': 'https://shomicor.es',
      'en-EU': 'https://shomicor.es',
      'x-default': 'https://shomicor.es',
    },
  },

  openGraph: {
    title: "Shomicor | Joyería de Plata de Ley y Cuero de Lujo en España",
    description: "Colecciones exclusivas de alta joyería de plata y artesanía en cuero premium con envío europeo gratuito. Descubre la elegancia artesanal.",
    url: 'https://shomicor.es',
    siteName: 'Shomicor',
    locale: 'es_ES',
    type: 'website',
    images: [
      { 
        url: '/assets/og-home.jpg', 
        width: 1200, 
        height: 630,
        alt: 'Shomicor Premium Luxury Jewelry Collections - Silver & Leather Goods'
      }
    ],
  },

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

  twitter: {
    card: 'summary_large_image',
    title: 'Shomicor Premium Luxury Jewelry Collections Spain',
    description: 'Joyería de plata de ley 925 y cuero de lujo hechos a mano. Envío gratis a toda España.',
    images: ['/assets/og-home.jpg'],
  },

  // Additional SEO signals
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console code
  },
  category: 'Jewelry Store',
  classification: 'Luxury Jewelry Retailer',
};

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
        <link rel="dns-prefetch" href="https://cloudinary.com" />
        
        {/* Enhanced SEO Meta Tags */}
        <meta name="geo.region" content="ES" />
        <meta name="geo.placename" content="Madrid" />
        <meta name="geo.position" content="40.416775;-3.703790" />
        <meta name="ICBM" content="40.416775, -3.703790" />
        
        {/* Business Information */}
        <meta name="business:contact_data:country" content="Spain" />
        <meta name="business:contact_data:locality" content="Madrid" />
        
        {/* Enhanced Social Media Tags */}
        <meta property="og:country-name" content="Spain" />
        <meta property="og:region" content="Madrid" />
        
        {/* Additional Schema.org hints */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JewelryStore",
            "name": "Shomicor",
            "description": "Handcrafted luxury silver jewelry and leather goods in Spain",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Madrid",
              "addressCountry": "ES"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "40.416775",
              "longitude": "-3.703790"
            },
            "priceRange": "€€",
            "telephone": "+92-3010544620",
            "url": "https://shomicor.es",
            "openingHours": "Mo-Su 10:00-20:00",
            "paymentAccepted": ["Credit Card", "PayPal", "Bank Transfer"],
            "currenciesAccepted": "EUR"
          })}
        </script>
      </head>
      <body className="h-full bg-black text-white font-sans overflow-x-hidden">
        {children}
        <Analytics /> 
        <SpeedInsights /> 
      </body>
    </html>
  );
}
