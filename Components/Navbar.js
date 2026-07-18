"use client"

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function LuxuryNavbar() {
  // Mobile drawer panel toggle state tracking
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // ⚡ THE FIX: Extract live context items count and cart visibility trigger
  const { cartItemCount, setIsCartOpen } = useCart();

  return (
    <nav className="sticky top-0 w-full z-[100] bg-black select-none">
      
      {/* Top Promotional Header Area Banner */}
      <div className="bg-matte-charcoal/80 border-b border-white/5 text-white py-2 px-4 flex justify-center items-center text-center">
        <span className="font-label-caps text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white/80">
          Free Premium European Shipping on orders over €100
        </span>
      </div>

      {/* Main Branding Navigation Body Segment */}
      <div className="bg-black/95 backdrop-blur-md border-b border-white/5 px-4 md:px-12 py-4 md:py-5 flex justify-between items-center transition-all duration-300">

        {/* Left Side Links: Desktop Category Navs connected directly to filter query parameters */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12 flex-1">
          <Link className="font-nav-link text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300" href="/products?category=Silver%20Jewelry">SILVER</Link>
          <Link className="font-nav-link text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300" href="/products?category=Leather%20Products">LEATHER</Link>
          <Link className="font-nav-link text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300" href="/products?category=Artificial%20jewelry">ARTIFICIAL</Link>
        </div>

        {/* Mobile Hamburger Layout Toggle Button */}
        <div className="flex md:hidden flex-1 justify-start">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            aria-label="Toggle navigation menu"
            className="text-white hover:text-antique-champagne transition-colors focus:outline-none p-1 cursor-pointer bg-transparent border-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Central Core Store Master Branding Identity */}
        <div className="flex justify-center flex-shrink-0">
          <Link 
            href="/" 
            className="font-headline-md text-lg md:text-xl tracking-[0.2em] text-white uppercase font-bold hover:text-antique-champagne/90 transition-colors"
          >
            SHOMICORE
          </Link>
        </div>

        {/* Right Side Links & Dynamic Actions Control Array */}
        <div className="flex gap-6 lg:gap-8 flex-1 justify-end items-center">
          <Link className="hidden md:inline-block font-nav-link text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300" href="/products">ABOUT</Link>
          
          <div className="flex items-center gap-4 sm:gap-5 md:ml-4">

            {/* Simple Search Callout Anchor */}
            <button aria-label="Search items catalog" type="button" className="text-white hover:text-antique-champagne transition-colors duration-300 cursor-pointer bg-transparent border-none focus:outline-none">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              type="button"
              aria-label="View shopping archive bag" 
              className="text-white hover:text-antique-champagne transition-colors duration-300 relative cursor-pointer bg-transparent border-none focus:outline-none flex items-center group"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              
              {/* Dynamic Live Quantitative Badge Marker Element */}
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-antique-champagne text-black text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center animation-popIn scale-100 group-hover:scale-105 transition-transform">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Dynamic Slide-Down Navigation Panel Drawer */}
      <div 
        className={`
          md:hidden w-full bg-black/95 backdrop-blur-md border-b border-white/5 transition-all duration-300 ease-in-out overflow-hidden
          ${isMobileMenuOpen ? 'max-h-[250px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
        `}
      >
        <div className="px-6 py-4 flex flex-col gap-4 text-left">
          <Link onClick={() => setIsMobileMenuOpen(false)} className="font-nav-link text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white py-1" href="/products?category=Silver%20Jewelry">SILVER</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className="font-nav-link text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white py-1" href="/products?category=Leather%20Products">LEATHER</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className="font-nav-link text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white py-1" href="/products?category=Artificial%20jewelry">ARTIFICIAL</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className="font-nav-link text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white py-1" href="/products">ABOUT</Link>
        </div>
      </div>

    </nav>
  );
}
