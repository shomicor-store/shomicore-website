"use client"
import Link from 'next/link';
import { useState } from 'react';

export default function LuxuryNavbar() {
  // Mobile drawer panel toggle state tracking
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    /* 
      CRITICAL CONTENT FIX: Changed from fixed to sticky.
      This ensures the rest of your page content naturally sits below the header.
    */
    <nav className="sticky top-0 w-full z-[100] bg-black select-none">
      
      {/* TOP ANNOUNCEMENT BAR - HIGH SEO VALUE */}
      <div className="bg-matte-charcoal/80 border-b border-white/5 text-white py-2 px-4 flex justify-center items-center text-center">
        <span className="font-label-caps text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white/80">
          Free Premium European Shipping on orders over €100
        </span>
      </div>

      {/* MAIN NAV HEADER BODY */}
      <div className="bg-black/95 backdrop-blur-md border-b border-white/5 px-4 md:px-12 py-4 md:py-5 flex justify-between items-center transition-all duration-300">
        
        {/* DESKTOP LEFT LINKS - Hidden securely on mobile */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12 flex-1">
          <Link className="font-nav-link text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300" href="/Products">SILVER</Link>
          <Link className="font-nav-link text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300" href="/Products">LEATHER</Link>
          <Link className="font-nav-link text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300" href="/Products">ARTIFICIAL</Link>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON - Left-aligned for intuitive ergonomics */}
        <div className="flex md:hidden flex-1 justify-start">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="text-white hover:text-antique-champagne transition-colors focus:outline-none p-1"
          >
            {/* Minimalist 2-line clean structural burger switch icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>

        {/* MAIN CENTER BRAND LOGO - Strictly locked and centered across all viewport metrics */}
        <div className="flex justify-center flex-shrink-0">
          <Link 
            href="/" 
            className="font-headline-md text-lg md:text-xl tracking-[0.2em] text-white uppercase font-bold hover:text-antique-champagne/90 transition-colors"
          >
            SHOMICOR
          </Link>
        </div>

        {/* RIGHT SIDE UTILITIES & DESKTOP LINKS */}
        <div className="flex gap-6 lg:gap-8 flex-1 justify-end items-center">
          <Link className="hidden md:inline-block font-nav-link text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300" href="/Products">ABOUT</Link>
          
          <div className="flex items-center gap-4 sm:gap-5 md:ml-4">
            {/* Native Search Utility Icon Trigger Wrapper Link */}
            <button aria-label="Search items catalog" className="text-white hover:text-antique-champagne transition-colors duration-300">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            
            {/* Native Cart Shopping Bag Asset Trigger Link */}
            <Link href="/cart" aria-label="View shopping bag" className="text-white hover:text-antique-champagne transition-colors duration-300">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
            </Link>
          </div>
        </div>

      </div>

      {/* 
        EXPANDABLE MOBILE NAVIGATION DROPDOWN DRAWER 
        Smoothly unrolls downwards when clicking the hamburger toggle switch.
      */}
      <div 
        className={`
          md:hidden w-full bg-black/95 backdrop-blur-md border-b border-white/5 transition-all duration-300 ease-in-out overflow-hidden
          ${isMobileMenuOpen ? 'max-h-[250px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
        `}
      >
        <div className="px-6 py-4 flex flex-col gap-4 text-left">
          <Link onClick={() => setIsMobileMenuOpen(false)} className="font-nav-link text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white py-1" href="/Products">SILVER</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className="font-nav-link text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white py-1" href="/Products">LEATHER</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className="font-nav-link text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white py-1" href="/Products">ARTIFICIAL</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className="font-nav-link text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white py-1" href="/Products">ABOUT</Link>
        </div>
      </div>

    </nav>
  );
}
