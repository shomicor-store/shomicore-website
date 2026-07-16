import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
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
  title: "SHOMICOR | Home",
  description: "Curated Craftsmanship",
};

export default function RootLayout({ children }) {
  return (

    <html
      lang="en"
      className={`${ebGaramond.variable} ${inter.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
