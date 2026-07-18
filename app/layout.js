// app/layout.js
import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://shomicore.es'),
  title: {
    template: '%s | Shomicore',
    default: "Shomicore | Handcrafted Luxury Silver Jewelry & Leather Goods", 
  },
  description: "Discover Shomicore's exclusive collections of premium Silver Jewelry, custom Artificial Pieces, and handcrafted luxury Leather Goods.",
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/', // ⚡ Targets Spain Audiences explicitly
    },
  },
  openGraph: {
    title: "Shomicore | Premium Luxury Collections",
    description: "Shop premium Silver Jewelry, Artificial Pieces, and Leather Goods online.",
    url: 'https://shomicore.es',
    siteName: 'Shomicore',
    locale: 'es_ES',
    type: 'website',
    images: [{ url: '/assets/og-home.jpg', width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {
  return (
    // ✅ Formatted correctly with Spain's language code and font variable setups
    <html
      lang="es" 
      className={`${ebGaramond.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="h-full bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
