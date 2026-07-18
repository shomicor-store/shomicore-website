import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import CartDrawer from "@/Components/CartDrawer";
import Footer from "@/Components/Footer";
import { CartProvider } from '@/context/CartContext';
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
  title: "Shomicore | Handcrafted Luxury Silver Jewelry & Leather Goods",
  description: "Discover Shomicore's exclusive collections of premium Silver Jewelry, custom Artificial Pieces, and handcrafted luxury Leather Goods.",
  openGraph: {
    title: "Shomicore | Premium Luxury Collections",
    description: "Shop premium Silver Jewelry, Artificial Pieces, and Leather Goods online.",
    images: [{ url: '/assets/og-home.jpg' }],
  },
};


export default function RootLayout({ children }) {
  return (

    <CartProvider>
    <html
      lang="en"
      className={`${ebGaramond.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <CartDrawer />
        <Footer/>
      </body>
    </html>
      </CartProvider>
  );
}
