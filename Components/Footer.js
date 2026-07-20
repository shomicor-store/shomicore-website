"use client"
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-neutral-200 pt-16 pb-8 px-4 md:px-12 select-none text-black">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="border-b border-black/10 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-display-hero text-[13vw] sm:text-[85px] md:text-[105px] lg:text-[130px] leading-none tracking-[0.02em] uppercase text-black font-black select-none">
            SHOMICOR
          </h2>
          <span className="font-label-caps text-[10px] tracking-[0.3em] text-black/40 uppercase font-bold whitespace-nowrap mb-3">
            CURATED CRAFTSMANSHIP / ARCHIVE 2026
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 items-start">
          <div className="flex flex-col gap-4">
            <h3 className="font-label-caps text-[11px] tracking-[0.2em] text-black font-bold uppercase border-b border-black/5 pb-2">
              OUR MANIFESTO
            </h3>
            <p className="font-body-lg text-[13px] text-black/70 leading-relaxed font-light">
              An independent design house exploring architectural boundaries through curated craftsmanship, pure metals, and fine art pieces.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-label-caps text-[11px] tracking-[0.2em] text-black font-bold uppercase border-b border-black/5 pb-2">
              THE ARCHIVE
            </h3>
            <div className="flex flex-col items-start gap-3">
              <Link href="/products" className="font-nav-link text-[12px] text-black/60 hover:text-black uppercase tracking-wider relative group transition-colors duration-300">
                SILVER JEWELRY
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/products" className="font-nav-link text-[12px] text-black/60 hover:text-black uppercase tracking-wider relative group transition-colors duration-300">
                ARTIFICIAL PIECES
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/products" className="font-nav-link text-[12px] text-black/60 hover:text-black uppercase tracking-wider relative group transition-colors duration-300">
                LEATHER GOODS
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-label-caps text-[11px] tracking-[0.2em] text-black font-bold uppercase border-b border-black/5 pb-2">
              CONNECT WITH US
            </h3>
            <div className="flex flex-col items-start gap-3">
              <a href="tel:+923010544620" className="font-nav-link text-[14px] font-bold text-black hover:text-black relative group transition-colors duration-300 tracking-wide">
                +92 301 0544620
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="mailto:concierge@shomicor.com" className="font-nav-link text-[12px] text-black/60 hover:text-black uppercase tracking-wider relative group transition-colors duration-300">
                CONCIERGE@SHOMICOR.COM
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
              <p className="font-body-lg text-[10px] tracking-widest text-black/40 uppercase font-medium mt-1">
                MON — FRI / 09:00 — 18:00 GMT
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-label-caps text-[11px] tracking-[0.2em] text-black font-bold uppercase border-b border-black/5 pb-2">
              SOCIAL MEDIAS
            </h3>
            <div className="flex items-center gap-6 pt-1">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Follow Shomicor on Instagram" className="text-black/50 hover:text-black transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
                </svg>
              </a>
              
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" title="Follow Shomicor on TikTok" className="text-black/50 hover:text-black transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                </svg>
              </a>

              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Follow Shomicor on Facebook" className="text-black/50 hover:text-black transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
        <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto">
            <div className="relative w-12 h-12 border border-black/10 bg-neutral-50 flex items-center justify-center overflow-hidden flex-shrink-0 rounded-sm">
              <Image 
                src="/shomicor_logo.png" 
                alt="Shomicor Brand Signature Logo Mark" 
                fill 
                sizes="48px"
                className="object-contain p-1.5"
              />
            </div>
            <span className="font-label-caps text-[10px] tracking-[0.2em] text-black/50 uppercase font-medium">
              © 2026 SHOMICOR. ALL RIGHTS RESERVED.
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-neutral-50 border border-neutral-200/60 rounded-sm mix-blend-multiply opacity-60 hover:opacity-100 transition-opacity duration-300">
            <span className="w-1 h-1 bg-black/30 rounded-full"></span>
            <span className="font-label-caps text-[9px] tracking-[0.25em] text-black/40 font-medium uppercase">
              DESIGN BY{" "}
              <a 
                href="http://vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-black/80 font-bold hover:text-black tracking-widest transition-colors duration-200"
              >
                SAAD MIRZA
              </a>
            </span>
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="font-label-caps text-[10px] tracking-[0.15em] text-black/40 hover:text-black uppercase font-medium relative group transition-colors duration-300">
              TERMS OF SERVICE
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/privacy" className="font-label-caps text-[10px] tracking-[0.15em] text-black/40 hover:text-black uppercase font-medium relative group transition-colors duration-300">
              PRIVACY REGULATION
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
