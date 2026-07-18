"use client"
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t-2 border-black pt-16 pb-8 px-4 md:px-12 select-none text-black">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* BRAND STATEMENT BANNER ZONE - HIGH CONTRAST SOLID TYPE */}
        <div className="border-b-2 border-black pb-8">
          <h2 className="font-display-hero text-[12vw] sm:text-[80px] md:text-[100px] lg:text-[120px] leading-none tracking-tighter uppercase text-black font-black select-none">
            SHOMICOR
          </h2>
        </div>

        {/* MAIN DESCRIPTIVE COLUMNS MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-12 items-start">
          
          {/* THE BRAND PHILOSOPHY CONTAINER */}
          <div className="flex flex-col gap-4">
            <h3 className="font-label-caps text-[11px] tracking-[0.25em] text-black font-black uppercase">
              OUR MANIFESTO
            </h3>
            <p className="font-body-lg text-[13px] text-black/80 leading-relaxed font-normal">
              An independent design house exploring architectural boundaries through curated craftsmanship, pure metals, and fine art pieces.
            </p>
          </div>

          {/* THE PRODUCT CATEGORIES HUB */}
          <div className="flex flex-col gap-4">
            <h3 className="font-label-caps text-[11px] tracking-[0.25em] text-black font-black uppercase">
              THE ARCHIVE
            </h3>
            <div className="flex flex-col items-start gap-3">
              <Link href="/products" className="font-nav-link text-[12px] text-black/70 hover:text-black font-medium uppercase tracking-widest relative group/link transition-colors duration-300">
                SILVER JEWELRY
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover/link/w-full"></span>
              </Link>
              <Link href="/products" className="font-nav-link text-[12px] text-black/70 hover:text-black font-medium uppercase tracking-widest relative group/link transition-colors duration-300">
                ARTIFICIAL PIECES
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover/link/w-full"></span>
              </Link>
              <Link href="/products" className="font-nav-link text-[12px] text-black/70 hover:text-black font-medium uppercase tracking-widest relative group/link transition-colors duration-300">
                LEATHER GOODS
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover/link/w-full"></span>
              </Link>
            </div>
          </div>

          {/* DIGITAL CONCIERGE CHANNELS */}
          <div className="flex flex-col gap-4">
            <h3 className="font-label-caps text-[11px] tracking-[0.25em] text-black font-black uppercase">
              CONNECT WITH US
            </h3>
            <div className="flex flex-col items-start gap-3">
              <a href="tel:+923010544620" className="font-nav-link text-[15px] font-black text-black hover:text-black relative group/link transition-colors duration-300">
                +92 301 0544620
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover/link/w-full"></span>
              </a>
              <a href="mailto:concierge@shomicor.com" className="font-nav-link text-[12px] text-black/70 hover:text-black font-semibold tracking-wider relative group/link transition-colors duration-300">
                CONCIERGE@SHOMICOR.COM
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover/link/w-full"></span>
              </a>
              <p className="font-body-lg text-[11px] text-black/50 font-medium uppercase tracking-wider mt-1">
                MON — FRI / 09:00 — 18:00 GMT
              </p>
            </div>
          </div>

          {/* LUXURY EDITORIAL SOCIAL MEDIA ENGINES */}
          <div className="flex flex-col gap-4">
            <h3 className="font-label-caps text-[11px] tracking-[0.25em] text-black font-black uppercase">
              SOCIAL MEDIAS
            </h3>
            <div className="flex items-center gap-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Follow Shomicor on Instagram" className="text-black/60 hover:text-black hover:scale-110 transform transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
                </svg>
              </a>
              
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" title="Follow Shomicor on TikTok" className="text-black/60 hover:text-black hover:scale-110 transform transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                </svg>
              </a>

              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Follow Shomicor on Facebook" className="text-black/60 hover:text-black hover:scale-110 transform transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM METRICS TRACKER & DEDICATED LOGO PLACEMENT MATRIX */}
        <div className="border-t-2 border-black pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full md:w-auto">
            {/* High Contrast Bold Solid Border Logo Container */}
            <div className="relative w-12 h-12 md:w-14 md:h-14 border-2 border-black rounded-none bg-white flex items-center justify-center overflow-hidden flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Image 
                src="/shomicor_logo.png" 
                alt="Shomicor Brand Signature Logo Mark" 
                fill 
                sizes="56px"
                className="object-contain p-1"
              />
            </div>
            
            <span className="font-label-caps text-[10px] tracking-[0.2em] text-black font-bold uppercase">
              © 2026 SHOMICOR. ALL RIGHTS RESERVED.
            </span>
          </div>

          <div className="flex gap-6">
            <Link href="/terms" className="font-label-caps text-[10px] tracking-[0.15em] text-black/60 hover:text-black font-bold uppercase relative group/foot transition-colors duration-300">
              TERMS OF SERVICE
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover/foot/w-full"></span>
            </Link>
            <Link href="/privacy" className="font-label-caps text-[10px] tracking-[0.15em] text-black/60 hover:text-black font-bold uppercase relative group/foot transition-colors duration-300">
              PRIVACY REGULATION
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover/foot/w-full"></span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
