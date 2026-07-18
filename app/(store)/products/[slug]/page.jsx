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

  // 2. Dispatch data item cleanly to global state matrices
  addToCart(product, selectedSize, selectedColor || 'Standard', quantity);

  // 3. Immediately slide closed any structural visual background cart drawer overlays
  setIsCartOpen(false);

  // 4. Force browser window redirect directly to checkout processing form paths
  router.push('/checkout');
};
const handleAddToCart = () => {
  // Enforce required size verification rule
  if (product?.available_sizes?.length > 0 && !selectedSize) {
    setSizeError(true);
    setTimeout(() => setSizeError(false), 500);
    return;
  }

  // ⚡ DISPATCH LIVE DATA: Safely fires structured metrics into your persistent state machine
  addToCart(product, selectedSize, selectedColor || 'Standard', quantity);
};


  if (loading) return <div className="p-20 text-center text-white font-mono text-[11px] tracking-widest uppercase bg-matte-charcoal min-h-screen">Loading the Product.......</div>;
  if (!product) return <div className="p-20 text-center text-error font-mono text-[11px] tracking-widest uppercase bg-matte-charcoal min-h-screen">Product Is Not entered in the Data base !!!</div>;

  return (
    <div className="bg-matte-charcoal min-h-screen text-on-surface w-full py-4 md:py-20 select-none">
      
      {/* 2-Column Product Layout View System */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 lg:gap-x-24 mb-8 max-w-7xl mx-auto px-4 md:px-12">

  {/* Left Column: Premium Interactive High-Res Media Gallery Stage */}
<div className="relative w-full">
  <div className="md:sticky md:top-32 flex flex-col gap-3 md:gap-6">
    
    {/* Main Primary View Stage Window Container */}
    {/* ⚡ THE ASPECT FIX: Fixed to absolute aspect-[3/4] on all viewports to preserve editorial design scaling */}
    <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950 border border-white/5 group shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none z-10 mix-blend-multiply"></div>
      
      {product.images && product.images[activeImageIndex] ? (
        <Image 
          src={product.images[activeImageIndex]}
          alt={`${product.name} - Handcrafted Premium Archive View`}
          fill
          priority // ⚡ Blazing Fast Speed: Forces instant top priority asset rendering above-the-fold
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
          quality={95} // ⚡ Elite Quality: Increases Next.js asset compiler compression limits from 75 to 95 for sharp details
          className="object-cover transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-[1.03]" // ⚡ object-cover guarantees your high-res photos fill every pixel of the frame perfectly
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-neutral-900 text-white/20">
          <span className="material-symbols-outlined text-[24px]">broken_image</span>
          <span className="font-label-caps text-[9px] tracking-[0.3em] uppercase">Specification Asset Absent</span>
        </div>
      )}
    </div>

    {/* Carousel Navigation Thumbnails Grid Frame Layout (Upgraded for Multi-device streams) */}
    {product.images && product.images.length > 1 && (
      <div className="grid grid-cols-6 gap-2.5 w-full overflow-x-auto scrollbar-none md:overflow-x-visible whitespace-nowrap snap-x snap-mandatory pb-1">
        {product.images.map((imgUrl, index) => (
          <button 
            key={`${imgUrl}-${index}`}
            type="button"
            onClick={() => setActiveImageIndex(index)}
            className={`relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 border transition-all duration-300 cursor-pointer focus:outline-none flex-shrink-0 snap-center ${
              activeImageIndex === index 
                ? 'border-antique-champagne scale-[1.02] ring-1 ring-antique-champagne/40 bg-black/60 shadow-lg shadow-antique-champagne/5' 
                : 'border-white/5 hover:border-white/20 opacity-50 hover:opacity-90'
            }`}
          >
            <Image 
              src={imgUrl} 
              alt={`${product.name} structural closeup profile angle ${index + 1}`} 
              fill 
              sizes="90px" 
              loading="lazy"
              className="object-cover p-0" // ⚡ Synchronized thumbnail frame filling
            />
          </button>
        ))}
      </div>
    )}
  </div>


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

  <p className="font-body-lg text-white/70 mb-6 md:mb-8 leading-relaxed font-light text-[13px] md:text-[14px]">
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
      <div className="flex justify-between items-baseline mb-3 border-b border-white/5 pb-1.5">
        <h3 className={`font-label-caps text-[9px] md:text-[10px] tracking-[0.2em] uppercase ${sizeError ? 'text-error font-bold' : 'text-white/40'}`}>
          {sizeError ? 'Attention: Size Selection Required' : 'Select Size Fit:'} 
          {selectedSize && <span className="text-antique-champagne font-bold ml-1">[{selectedSize} USA / Canada]</span>}
        </h3>
        <span className="font-label-caps text-[8px] text-antique-champagne/40 uppercase font-mono">
          {product.parent_category === 'Silver Jewelry' ? 'Global Conversion Grid Active' : 'Standard Scale'}
        </span>
      </div>
      
      {product.parent_category !== 'Silver Jewelry' ? (
        /* Regular Standard Buttons Row View */
        <div className="flex flex-wrap gap-1.5">
          {product.available_sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => { setSelectedSize(size); setSizeError(false); }}
              className={`min-w-[40px] h-[36px] px-2.5 flex items-center justify-center transition-all border cursor-pointer focus:outline-none font-label-caps text-[9px] tracking-widest uppercase ${
                selectedSize === size ? 'bg-antique-champagne text-black border-antique-champagne font-bold' : 'bg-transparent border-white/10 text-white/60 hover:border-white/30'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      ) : (
        /* ⚡ ADVANCED CONVERSION TABLE LOOKUP FOR CONSUMERS */
        <div className="flex flex-col gap-1 w-full border border-white/5 bg-black/20 p-2 max-h-[300px] overflow-y-auto scrollbar-none">
          {/* Table Column Labels */}
          <div className="grid grid-cols-5 text-center text-[8px] font-label-caps text-white/30 tracking-widest border-b border-white/5 pb-1.5 mb-1.5 uppercase">
            <span>USA / Canada</span>
            <span>UK</span>
            <span>FRANCE</span>
            <span>GERMANY</span>
            <span>DIAMETER</span>
          </div>

          {/* Display only the sizes that the admin checked during product upload */}
          {ringChartMatrix
            .filter(row => product.available_sizes.includes(row.us))
            .map((row) => {
              const isSelected = selectedSize === row.us;
              return (
                <button
                  type="button"
                  key={row.us}
                  onClick={() => { setSelectedSize(row.us); setSizeError(false); }}
                  className={`grid grid-cols-5 items-center py-2.5 text-center font-mono text-[12px] border transition-all cursor-pointer focus:outline-none ${
                    isSelected 
                      ? 'bg-antique-champagne text-black border-antique-champagne font-bold shadow-md shadow-antique-champagne/5' 
                      : 'bg-transparent border-transparent text-white/70 hover:border-white/10 hover:text-white'
                  }`}
                >
                  <span>{row.us}</span>
                  <span>{row.uk}</span>
                  <span>{row.fr}</span>
                  <span>{row.de}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-black/60' : 'text-antique-champagne/60'}`}>{row.mm}</span>
                </button>
              );
          })}
        </div>
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
        Every piece inside the Shomicore archive is individually handled and handcrafted by master craftsmen.
      </p>
    </div>
  </div>
</div>

      </div>

      {/* Global CSS Shake Animation Keyframes Injection block */}
      <style jsx global>{`
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