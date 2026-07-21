"use client"

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
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
  <div className="bg-black/95 backdrop-blur-md border-b border-white/5 px-4 md:px-12 py-4 md:py-5 flex justify-between items-center">

    {/* Left Side Links: Desktop Category Navs connected directly to filter query parameters */}
    <div className="hidden md:flex items-center gap-8 lg:gap-10 flex-1">
      
      {/* Link 1: Silver Jewelry */}
      <Link href="/products?category=Silver%20Jewelry" className="relative group/nav py-1 block">
        <span className="font-nav-link text-xs lg:text-[13px] uppercase tracking-[0.2em] text-white/60 group-hover/nav:text-white transition-colors duration-300 block font-medium">
          Silver Jewelry
        </span>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-antique-champagne origin-center"
        />
      </Link>

      {/* Link 2: Leather Products */}
      <Link href="/products?category=Leather%20Products" className="relative group/nav py-1 block">
        <span className="font-nav-link text-xs lg:text-[13px] uppercase tracking-[0.2em] text-white/60 group-hover/nav:text-white transition-colors duration-300 block font-medium">
          Leather Products
        </span>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-antique-champagne origin-center"
        />
      </Link>

      {/* Link 3: Artificial Jewelry */}
      <Link href="/products?category=Artificial%20jewelry" className="relative group/nav py-1 block">
        <span className="font-nav-link text-xs lg:text-[13px] uppercase tracking-[0.2em] text-white/60 group-hover/nav:text-white transition-colors duration-300 block font-medium">
          Artificial Jewelry
        </span>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-antique-champagne origin-center"
        />
      </Link>
    </div>

    {/* Mobile Hamburger Layout Toggle Button */}
    <div className="flex md:hidden flex-1 justify-start">
      <motion.button 
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        type="button"
        aria-label="Toggle navigation menu"
        className="text-white hover:text-antique-champagne transition-colors focus:outline-none p-1 cursor-pointer bg-transparent border-none"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
          )}
        </svg>
      </motion.button>
    </div>

    {/* Central Core Store Master Branding Identity */}
    <div className="flex justify-center flex-shrink-0">
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link 
          href="/" 
          className="font-headline-md text-lg md:text-xl tracking-[0.25em] text-white uppercase font-bold hover:text-antique-champagne transition-colors duration-300 block select-none"
        >
          SHOMICORE
        </Link>
      </motion.div>
    </div>

    {/* Right Side Links & Dynamic Actions Control Array */}
    <div className="flex gap-6 lg:gap-8 flex-1 justify-end items-center">
      <Link href="/products" className="hidden md:inline-block relative group/about py-1">
        <span className="font-nav-link text-xs lg:text-[13px] uppercase tracking-[0.2em] text-white/60 group-hover/about:text-white transition-colors duration-300 block font-medium">
          ABOUT
        </span>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-antique-champagne origin-center"
        />
      </Link>
      
      <div className="flex items-center gap-4 sm:gap-5 md:ml-4">

        {/* Simple Search Callout Anchor */}
        <motion.button 
          whileHover={{ scale: 1.1, color: "rgba(230,187,119,1)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Search items catalog" 
          type="button" 
          className="text-white cursor-pointer bg-transparent border-none focus:outline-none p-1"
        >
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </motion.button>

        {/* Cart Drawer Toggle Trigger */}
        <motion.button 
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          type="button"
          aria-label="View shopping archive bag" 
          className="text-white cursor-pointer bg-transparent border-none focus:outline-none flex items-center p-1 relative group"
        >
          <motion.svg 
            variants={{ hover: { color: "rgba(230,187,119,1)" } }}
            className="w-[18px] h-[18px]" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </motion.svg>
          
          {/* Dynamic Live Quantitative Badge Marker Element */}
          {cartItemCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              variants={{ hover: { scale: 1.1 } }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="absolute -top-1 -right-1.5 bg-antique-champagne text-black text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg pointer-events-none"
            >
              {cartItemCount}
            </motion.span>
          )}
        </motion.button>
      </div>
    </div>

  </div>

  {/* Mobile Dynamic Slide-Down Navigation Panel Drawer */}
  <AnimatePresence>
    {isMobileMenuOpen && (
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden w-full bg-black/95 backdrop-blur-md border-b border-white/5 overflow-hidden"
      >
        <div className="px-6 py-5 flex flex-col gap-4 text-left">
          <Link onClick={() => setIsMobileMenuOpen(false)} className="font-nav-link text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white py-1 block transition-colors" href="/products?category=Silver%20Jewelry">Silver Jewelry</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className="font-nav-link text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white py-1 block transition-colors" href="/products?category=Leather%20Products">Leather Products</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className="font-nav-link text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white py-1 block transition-colors" href="/products?category=Artificial%20jewelry">Artificial Jewelry</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className="font-nav-link text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white py-1 block transition-colors" href="/products">ABOUT</Link>
        </div>
      </motion.div>
    )}
  </AnimatePresence>

</nav>

  );
}
