'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ringChartMatrix } from '@/lib/RingSizes';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function SingleProductPage({ params }) {
  const resolvedParams = use(params); 
  const slug = resolvedParams?.slug;
const router = useRouter();
const { addToCart, setIsCartOpen } = useCart();

  // Master Data Metrics Layout States
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Interactive Variant Tracking States
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  // UX Error & Animation Flags
  const [sizeError, setSizeError] = useState(false);

const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    if (!slug) return;
    const loadProductData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/slug/${slug}`);
        const result = await res.json();
        if (result.success && result.data) {
          setProduct(result.data);
          if (result.data.colors?.length > 0) setSelectedColor(result.data.colors[0]);

        }
      } catch (err) {
        console.error("Data tracking crash:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProductData();
  }, [slug]);
// Master Direct Checkout Shortcut Execution Layer
const handleBuyNow = () => {
  // 1. Structural variation protection validation guard
  if (product?.available_sizes?.length > 0 && !selectedSize) {
    setSizeError(true);
    setTimeout(() => setSizeError(false), 500);
    return;
  }
 
  addToCart(product, selectedSize, selectedColor || 'Standard', quantity);
  setIsCartOpen(false);
  router.push('/checkout');
};
const handleAddToCart = () => {

  if (product?.available_sizes?.length > 0 && !selectedSize) {
    setSizeError(true);
    setTimeout(() => setSizeError(false), 500);
    return;
  }

  addToCart(product, selectedSize, selectedColor || 'Standard', quantity);
};


  if (loading) return <div className="p-20 text-center text-white font-mono text-[11px] tracking-widest uppercase bg-matte-charcoal min-h-screen">Loading the Product.......</div>;
  if (!product) return <div className="p-20 text-center text-error font-mono text-[11px] tracking-widest uppercase bg-matte-charcoal min-h-screen">Product Is Not entered in the Data base !!!</div>;

  return (
    <div className="bg-matte-charcoal min-h-screen text-on-surface w-full py-4 md:py-20 select-none">
      
      {/* 2-Column Product Layout View System */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 lg:gap-x-24 mb-8 max-w-7xl mx-auto px-4 md:px-12">

 {/* Left Column: Premium Interactive High-Res Media Gallery Stage */}
<div className="w-full flex justify-center items-start relative">
  <div className="md:sticky md:top-32 flex flex-col gap-3 md:gap-5 w-full max-w-[540px] md:max-w-xl mx-auto">
    
    {/* Main Primary View Stage Window Container */}
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950 border border-white/5 group shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10 mix-blend-multiply"></div>
      
      {product.images && product.images[activeImageIndex] ? (
        <Image 
          src={product.images[activeImageIndex]}
          alt={`${product.name} - Handcrafted Premium Archive View`}
          fill
          priority 
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={100} 
          className="object-cover transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-[1.02]" 
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-neutral-900 text-white/20">
          <span className="material-symbols-outlined text-[24px]">broken_image</span>
          <span className="font-label-caps text-[9px] tracking-[0.3em] uppercase">Specification Asset Absent</span>
        </div>
      )}
    </div>

    {/* Carousel Navigation Thumbnails Grid Frame Layout */}
    {product.images && product.images.length > 1 && (

      <div className="flex gap-2 w-full overflow-x-auto scrollbar-none snap-x snap-mandatory pb-1 max-w-full">
        {product.images.map((imgUrl, index) => (
          <button 
            key={`${imgUrl}-${index}`}
            type="button"
            onClick={() => setActiveImageIndex(index)}
   
            className={`relative aspect-[4/3] w-[75px] sm:w-[90px] overflow-hidden bg-neutral-900 border transition-all duration-300 cursor-pointer浏览 focus:outline-none flex-shrink-0 snap-center ${
              activeImageIndex === index 
                ? 'border-antique-champagne scale-[1.02] ring-1 ring-antique-champagne/40 bg-black/60 shadow-lg shadow-antique-champagne/5' 
                : 'border-white/5 opacity-40 hover:opacity-100'
            }`}
          >
            <Image 
              src={imgUrl} 
              alt={`${product.name} closeup angle profile thumbnail ${index + 1}`} 
              fill 
              sizes="90px" 
              loading="lazy"
              className="object-cover p-0" // ⚡ Flawless thumbnail pixel alignment
            />
          </button>
        ))}
      </div>
    )}
  </div>

  <style >{`
    .scrollbar-none::-webkit-scrollbar { display: none; }
    .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
</div>



 {/* Right Column: Dynamic Text Product Specification Summary */}
<div className="flex flex-col pt-2 md:pt-4">
  <nav className="mb-4 md:mb-6">
    <span className="font-label-caps text-[9px] md:text-[10px] tracking-[0.25em] text-white/40 uppercase">
      <Link href="/products" className="hover:text-antique-champagne transition-colors duration-300">The Archive</Link> / {product.parent_category}
    </span>
  </nav>

  <h1 className="font-display-hero text-2xl sm:text-4xl md:text-[44px] lg:text-[56px] leading-tight tracking-tighter mb-3 md:mb-4 uppercase text-white break-words">
    {product.name}
  </h1>

  <p className="font-body-lg text-antique-champagne text-xl md:text-2xl mb-5 md:mb-6 font-bold leading-none">
    €{parseFloat(product.price).toFixed(2)}
  </p>

  <div className="w-12 h-[1px] bg-white/10 mb-5 md:mb-6"></div>


{/* Code snippet example for your live storefront description display tag */}
{/* Code snippet example for your live storefront description display tag */}
<p className="font-body-lg text-white/70 text-[13px] md:text-[14px] leading-relaxed font-light whitespace-pre-wrap">
  {product.description}
</p>





  {/* 1. Dynamic Color Variation Tags Output */}
  {product.colors && product.colors.length > 0 && (
    <div className="mb-6 md:mb-8 w-full">
      <h3 className="font-label-caps text-[9px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase mb-2.5 block">
        Available Accent Finishes: <span className="text-antique-champagne font-bold">{selectedColor}</span>
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {product.colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setSelectedColor(color)}
            className={`px-3 py-2 font-label-caps text-[9px] md:text-[10px] tracking-wider border transition-all uppercase cursor-pointer bg-transparent focus:outline-none ${
              selectedColor === color 
                ? 'border-antique-champagne text-antique-champagne bg-white/5 font-semibold' 
                : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
            }`}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  )}

{/* 2. Context-Aware Size Variant Selection Hub with Complete International Table Display */}
{product.available_sizes && product.available_sizes.length > 0 && (
  <div className={`mb-6 md:mb-8 w-full ${sizeError ? 'animate-shake' : ''}`}>
    <div className="flex justify-between items-baseline mb-3 border-b border-white/10 pb-2">
      <h3 className={`font-label-caps text-[10px] md:text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 ${sizeError ? 'text-red-500 font-bold' : 'text-white/50'}`}>
        {sizeError ? 'Selection Required: Choose a Size Option' : 'Select Size Fit:'} 
 
      </h3>
      <span className="font-label-caps text-[10px] text-antique-champagne/50 uppercase font-mono tracking-wider">
        {product.parent_category === 'Silver Jewelry' ? 'Available Sizes (Scroll for more Sizes)' : 'Standard Sizes'}
      </span>
    </div>
    
    {product.parent_category !== 'Silver Jewelry' ? (
      /* Regular Standard Buttons Row View */
      <div className={`flex flex-wrap gap-2 p-1 transition-all duration-300 ${sizeError ? 'bg-red-500/5 border border-red-500/20' : 'border border-transparent'}`}>
        {product.available_sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => { setSelectedSize(size); setSizeError(false); }}
              className={`min-w-[44px] h-[40px] px-3 flex items-center justify-center transition-all duration-300 border focus:outline-none font-label-caps text-[10px] tracking-widest uppercase rounded-none select-none cursor-pointer
                ${isSelected 
                  ? 'bg-antique-champagne text-black border-antique-champagne font-black shadow-lg shadow-antique-champagne/10 scale-102 z-10' 
                  : sizeError
                    ? 'bg-transparent border-red-500/30 text-red-400 hover:border-red-500 hover:text-white'
                    : 'bg-transparent border-white/10 text-white/60 hover:border-white/40 hover:text-white'
                }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    ) : (
      <div className={`flex flex-col w-full border bg-neutral-950/40 p-2 max-h-[300px] overflow-y-auto scrollbar-none transition-all duration-300 ${sizeError ? 'border-red-500/30 bg-red-500/[0.02]' : 'border-white/10'}`}>
        
        {/* Table Column Labels */}
        <div className="grid grid-cols-5 text-center text-[9px] font-label-caps text-white/40 tracking-[0.2em] border-b border-white/10 pb-2 mb-2 uppercase font-bold sticky top-0 bg-neutral-950/80 backdrop-blur-sm z-20">
          <span>US / CA</span>
          <span>UK</span>
          <span>FRANCE</span>
          <span>GERMANY</span>
          <span>DIAMETER</span>
        </div>

        {/* Dynamic Matrix Sizing Iteration */}
        <div className="flex flex-col gap-1 w-full">
          {ringChartMatrix
            .filter(row => product.available_sizes.includes(row.us))
            .map((row) => {
              const isSelected = selectedSize === row.us;
              return (
                <button
                  type="button"
                  key={row.us}
                  onClick={() => { setSelectedSize(row.us); setSizeError(false); }}
                  className={`grid grid-cols-5 items-center py-3 text-center font-mono text-[13px] border rounded-none transition-all duration-200 focus:outline-none select-none cursor-pointer
                    ${isSelected 
                      ? 'bg-antique-champagne text-black border-antique-champagne font-black shadow-lg shadow-antique-champagne/10 scale-[1.01] z-10' 
                      : sizeError
                        ? 'bg-transparent border-transparent text-red-300/70 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400'
                        : 'bg-transparent border-transparent text-white/60 hover:bg-white/[0.03] hover:border-white/10 hover:text-white'
                    }`}
                >
                  <span className={`font-bold ${isSelected ? 'text-black' : 'text-white'}`}>{row.us}</span>
                  <span className={isSelected ? 'text-black' : 'text-white/60'}>{row.uk}</span>
                  <span className={isSelected ? 'text-black' : 'text-white/60'}>{row.fr}</span>
                  <span className={isSelected ? 'text-black' : 'text-white/60'}>{row.de}</span>
                  <span className={`text-[11px] font-medium ${isSelected ? 'text-black/70' : 'text-antique-champagne/70 font-semibold'}`}>
                    {row.mm}
                  </span>
                </button>
              );
          })}
        </div>
      </div>
    )}
    
    {sizeError && (
      <span className="font-label-caps text-[9px] tracking-widest text-red-500 uppercase mt-2 block font-semibold">
        * Please pick an operational size configuration before proceeding to checkout modules.
      </span>
    )}
  </div>
)}


  {/* ── HIGH PERFORMANCE ACTION BUTTONS ARRAYS BLOCK ── */}
  <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
    
    {/* Action 1: Standard Cart Append */}
    <button 
      type="button"
      onClick={handleAddToCart}
      className="flex-1 border border-antique-champagne py-4 flex justify-center items-center group hover:bg-antique-champagne transition-all duration-300 cursor-pointer bg-transparent focus:outline-none"
    >
      <span className="font-nav-link text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-antique-champagne group-hover:text-black transition-colors duration-300 font-semibold">
        Add To Archive
      </span>
    </button>

    {/* Action 2: Premium Quick Checkout Direct Buy Now Trigger (High Contrast Fill Style) */}
    <button 
      type="button"
      onClick={handleBuyNow}
      className="flex-1 bg-antique-champagne text-black py-4 flex justify-center items-center hover:bg-white hover:text-black border border-antique-champagne hover:border-white transition-all duration-300 cursor-pointer focus:outline-none font-semibold"
    >
      <span className="font-nav-link text-[10px] md:text-[11px] tracking-[0.2em] uppercase tracking-[0.25em]">
        Instant Purchase
      </span>
    </button>
  </div>

{/* Accordion Layer Info */}
<div className="mt-8 pt-6 border-t border-white/5">
  <div className="flex flex-col gap-2">
    <h4 className="font-label-caps text-[9px] tracking-[0.2em] text-antique-champagne uppercase">
      Artisanal Process
    </h4>
    <p className="font-body-lg text-white/50 text-[12px] leading-relaxed">
      Every piece inside the Shomicor archive is individually handled and handcrafted by master craftsmen.
    </p>
  </div>
</div>

{/* Ring Sizes image shown */}
{product.parent_category === 'Silver Jewelry' && (
  <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-6 w-full animate-fade-in">
    
    {/* Section Meta Title */}
    <div className="flex flex-col gap-1">
      <h4 className="font-label-caps text-[10px] tracking-[0.25em] text-antique-champagne uppercase font-bold">
        Measurement &amp; Fitting Resource
      </h4>
      <p className="font-body-lg text-white/40 text-[11px] uppercase tracking-wider">
        Reference blueprints for optimal finger profiling
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      
      {/* CARD 1: HOW TO MEASURE INSTRUCTIONS */}
      <div className="flex flex-col gap-2.5 group">
        <div 
          onClick={() => setLightboxImage("/ring_size_guide.png")}
          className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950 border border-white/10 group-hover:border-white/20 transition-colors duration-300 cursor-zoom-in"
        >
          <Image 
            src="/ring_size_guide.png" 
            alt="Step-by-step instructions on how to measure your finger for Shomicor rings"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            loading="lazy"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
          />
        </div>
        <span className="font-label-caps text-[9px] tracking-widest text-white/40 uppercase font-medium pl-0.5 group-hover:text-white/80 transition-colors">
          How to Measure Your Finger for a Perfect Fit Ring
        </span>
      </div>

      {/* CARD 2: INTERNATIONAL SIZE REFERENCE GUIDE */}
      <div className="flex flex-col gap-2.5 group">
        <div 
          onClick={() => setLightboxImage("/ring_sizes.png")}
          className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950 border border-white/10 group-hover:border-white/20 transition-colors duration-300 cursor-zoom-in"
        >
          <Image 
            src="/ring_sizes.png" 
            alt="International ring size conversion scale chart diagram"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            loading="lazy"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
          />
        </div>
        <span className="font-label-caps text-[9px] tracking-widest text-white/40 uppercase font-medium pl-0.5 group-hover:text-white/80 transition-colors">
          All International Ring Size Conversion Reference Chart
        </span>
      </div>

    </div>

    {/* ── LUXURY LIGHTBOX MODAL OVERLAY EXTENSION ── */}
    {lightboxImage && (
      <div 
        onClick={() => setLightboxImage(null)}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200] flex items-center justify-center p-4 md:p-12 cursor-zoom-out animate-fade-in select-none"
      >
        {/* Close Button UI Shortcut element */}
        <button 
          onClick={() => setLightboxImage(null)}
          className="absolute top-6 right-6 text-white/40 hover:text-white font-label-caps text-[10px] tracking-widest uppercase bg-transparent border-none focus:outline-none cursor-pointer"
        >
          [ Click Anywhere To Close ]
        </button>
        
        {/* Center Target Scaled Frame */}
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="relative w-full max-w-4xl h-[70vh] max-h-[600px] border border-white/10 bg-neutral-950 p-2"
        >
          <Image 
            src={lightboxImage} 
            alt="Expanded Size Resource View" 
            fill
            sizes="100vw"
            priority
            className="object-contain"
          />
        </div>
      </div>
    )}

  </div>
)}


</div>

      </div>

      {/*  CSS Shake Animation */}
      <style >{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-4px); }
          40%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}