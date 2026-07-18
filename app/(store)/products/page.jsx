"use client";
import Image from "next/image";
import { useEffect, useState, use, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from "next/link"


 function ProductPageContent() {

const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State arrays populated from the database layer
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // 1. Read values directly from the browser URL path on load
  const selectedCategory = searchParams.get('category') || '';
  const selectedSubCategory = searchParams.get('subcategory') || '';
  const selectedSize = searchParams.get('size') || '';
  const selectedColor = searchParams.get('color') || '';
  const priceOrder = searchParams.get('order') || 'ASC';

  // 2. Shared utility to update URL parameters dynamically without reloading the page
  const updateFilterInUrl = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Automatically reset subcategory if the parent material drops or changes
    if (key === 'category' && !value) {
      params.delete('subcategory');
    }

    // Pushes the updated parameters onto the browser URL line invisibly [1]
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Helper bindings to link your old onClick triggers safely
  const setSelectedCategory = (val) => updateFilterInUrl('category', val);
  const setSelectedSubCategory = (val) => updateFilterInUrl('subcategory', val);
  const setSelectedSize = (val) => updateFilterInUrl('size', val);
  const setSelectedColor = (val) => updateFilterInUrl('color', val);
  const setPriceOrder = (val) => updateFilterInUrl('order', val);

  useEffect(() => {
    const syncAndFetchStoreItems = async () => {
      setLoading(true);
      try {
        let apiUrl = `/api/products?order=${priceOrder}&`;
        if (selectedCategory) apiUrl += `category=${encodeURIComponent(selectedCategory)}&`;
        if (selectedSubCategory) apiUrl += `subcategory=${encodeURIComponent(selectedSubCategory)}&`;
        if (selectedSize) apiUrl += `size=${encodeURIComponent(selectedSize)}&`;
        if (selectedColor) apiUrl += `color=${encodeURIComponent(selectedColor)}`;

        const res = await fetch(apiUrl);
        const result = await res.json();
        if (result.success) setProducts(result.data);

        // Lazily cache subcategories list
        if (subCategories.length === 0) {
          const subRes = await fetch('/api/sub-categories');
          const subData = await subRes.json();
          if (subData.success) setSubCategories(subData.data);
        }
      } catch (error) {
        console.error("Data syncing issue identified:", error);
      } finally {
        setLoading(false);
      }
    };

    syncAndFetchStoreItems();
  }, [searchParams]); 





    return (
        <div className="bg-matte-charcoal min-h-screen text-on-surface font-body-lg">
{/* Hero Section  */}
<header className="pt-6 pb-8 md:pb-14 px-4 md:px-12 max-w-7xl mx-auto select-none">
  
  <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4 mb-4 md:mb-16">
    <h1 className="font-display-hero text-[10vw] sm:text-5xl md:text-[80px] leading-none tracking-tighter uppercase text-white">
      The Archive
    </h1>
    <span className="font-label-caps text-[9px] sm:text-[10px] tracking-[0.25em] text-antique-champagne whitespace-nowrap">
      EST. 2026
    </span>
  </div>

{/* Interactive Grid Cards Wrapper */}
<div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 h-[22vh] md:h-[45vh] min-h-[160px] md:min-h-[320px] max-h-[480px] w-full [container-type:inline-size] items-start pt-1">
  
  {/* Card 1: Silver Jewelry */}
  <div 
    onClick={() => setSelectedCategory(selectedCategory === 'Silver Jewelry' ? '' : 'Silver Jewelry')}
    className={`relative group overflow-hidden cursor-pointer h-[95%] bg-surface-container-low border z-10 transition-all duration-500 hover:-translate-y-0.5 ${
      selectedCategory === 'Silver Jewelry' ? 'border-antique-champagne bg-black/60 shadow-lg shadow-antique-champagne/5' : 'border-white/5'
    }`}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/80 transition-colors duration-700 z-20"></div>
    
    <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 z-10 ${
      selectedCategory === 'Silver Jewelry' ? 'opacity-80' : 'opacity-40 group-hover:opacity-70'
    }`}>
      <Image 
        src="/silver_jewelry_pic.png" 
        alt="Premium pure silver jewelry collection catalog archive" 
        fill
        sizes="33vw"
        priority
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />
    </div>

    {/* Fixed textual position framework using tight padding limits */}
    <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-30 pointer-events-none flex flex-col items-start">
      <h2 className={`font-headline-md font-bold leading-none mb-1 tracking-wide transition-colors mobile-title-clamp md:text-[24px] lg:text-[28px] ${
        selectedCategory === 'Silver Jewelry' ? 'text-antique-champagne' : 'text-white'
      }`}>
        SILVER
      </h2>
      <p className="font-label-caps tracking-[0.1em] text-white/50 uppercase truncate w-full mobile-sub-clamp md:text-[10px]">
        Forged &amp; Sculpted
      </p>
    </div>

    <div className="absolute top-4 right-4 z-30 hidden sm:block pointer-events-none">
      <span className={`font-display-hero text-2xl uppercase tracking-[0.2em] transition-colors ${
        selectedCategory === 'Silver Jewelry' ? 'text-antique-champagne/20' : 'text-white/5'
      }`}>
        01
      </span>
    </div>
  </div>

  {/* Card 2: Artificial Jewelry */}
  <div 
    onClick={() => setSelectedCategory(selectedCategory === 'Artificial jewelry' ? '' : 'Artificial jewelry')}
    className={`relative group overflow-hidden cursor-pointer h-[95%] self-end bg-surface-container-low border z-10 transition-all duration-500 hover:translate-y-0.5 ${
      selectedCategory === 'Artificial jewelry' ? 'border-antique-champagne bg-black/60 shadow-lg shadow-antique-champagne/5' : 'border-white/5'
    }`}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/80 transition-colors duration-700 z-20"></div>
    
    <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 z-10 ${
      selectedCategory === 'Artificial jewelry' ? 'opacity-80' : 'opacity-40 group-hover:opacity-70'
    }`}>
      <Image 
        src="/moody_dark_portrait_of_a_model_wearing_premium_sculptural_jewelry._sharp_side.png" 
        alt="Avant-Garde artificial fashion jewelry selection archive" 
        fill
        sizes="33vw"
        priority
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />
    </div>

    <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-30 pointer-events-none flex flex-col items-start">
      <h2 className={`font-headline-md font-bold leading-none mb-1 tracking-wide transition-colors mobile-title-clamp md:text-[24px] lg:text-[28px] ${
        selectedCategory === 'Artificial jewelry' ? 'text-antique-champagne' : 'text-white'
      }`}>
        ARTIFICIAL
      </h2>
      <p className="font-label-caps tracking-[0.1em] text-white/50 uppercase truncate w-full mobile-sub-clamp md:text-[10px]">
        Avant-Garde Style
      </p>
    </div>
    
    <div className="absolute top-4 right-4 z-30 hidden sm:block pointer-events-none">
      <span className={`font-display-hero text-2xl uppercase tracking-[0.2em] transition-colors ${
        selectedCategory === 'Artificial jewelry' ? 'text-antique-champagne/20' : 'text-white/5'
      }`}>
        02
      </span>
    </div>
  </div>

  {/* Card 3: Leather Goods */}
  <div 
    onClick={() => setSelectedCategory(selectedCategory === 'Leather Products' ? '' : 'Leather Products')}
    className={`relative group overflow-hidden cursor-pointer h-[95%] bg-surface-container-low border z-10 transition-all duration-500 hover:-translate-y-0.5 ${
      selectedCategory === 'Leather Products' ? 'border-antique-champagne bg-black/60 shadow-lg shadow-antique-champagne/5' : 'border-white/5'
    }`}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/80 transition-colors duration-700 z-20"></div>
    
    <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 z-10 ${
      selectedCategory === 'Leather Products' ? 'opacity-80' : 'opacity-40 group-hover:opacity-70'
    }`}>
      <Image 
        src="/high_contrast_black_and_white_lifestyle_fashion_photography._close_up_of_a.png" 
        alt="Hand-stitched essential luxury leather goods archive" 
        fill
        sizes="33vw"
        priority
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />
    </div>

    <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-30 pointer-events-none flex flex-col items-start">
      <h2 className={`font-headline-md font-bold leading-none mb-1 tracking-wide transition-colors mobile-title-clamp md:text-[24px] lg:text-[28px] ${
        selectedCategory === 'Leather Products' ? 'text-antique-champagne' : 'text-white'
      }`}>
        LEATHER
      </h2>
      <p className="font-label-caps tracking-[0.1em] text-white/50 uppercase truncate w-full mobile-sub-clamp md:text-[10px]">
        Hand-Stitched
      </p>
    </div>

    <div className="absolute top-4 right-4 z-30 hidden sm:block pointer-events-none">
      <span className={`font-display-hero text-2xl uppercase tracking-[0.2em] transition-colors ${
        selectedCategory === 'Leather Products' ? 'text-antique-champagne/20' : 'text-white/5'
      }`}>
        03
      </span>
    </div>
  </div>

  {/* Clean fallback text clamps specifically handling narrow high-density mobile viewports */}
  <style jsx global>{`
    @media (max-width: 767px) {
      .mobile-title-clamp {
        font-size: clamp(9px, 4.2cqw, 14px) !important;
      }
      .mobile-sub-clamp {
        font-size: clamp(6px, 2.2cqw, 9px) !important;
      }
    }
  `}</style>
</div>

</header>





            {/* <!-- Floating Filter Bar --> */}
<section className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-y border-white/10 px-4 md:px-12 py-4 md:py-5">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
    
    {/* Left Utility Actions: Dynamic Selection Feedback Toggles */}
    <div className="flex flex-wrap justify-center md:justify-start items-center gap-5 sm:gap-8 md:gap-10">
      
      {/* 1. Category Indicator (Material) */}
      <div 
        onClick={() => setSelectedCategory('')} // Fast reset switch
        className="group cursor-pointer flex flex-col items-center md:items-start select-none"
        title="Click to reset material filter"
      >
        <span className={`font-label-caps text-[10px] tracking-[0.2em] md:tracking-[0.25em] transition-colors duration-300 uppercase ${
          selectedCategory ? 'text-antique-champagne' : 'text-white/40 group-hover:text-white'
        }`}>
          MATERIAL: {selectedCategory ? selectedCategory.split(' ')[0] : 'ALL'}
        </span>
        <div className={`h-[1px] bg-antique-champagne transition-all duration-300 mt-0.5 ${
          selectedCategory ? 'w-full' : 'w-0 group-hover:w-full'
        }`}></div>
      </div>
      
      {/* 2. Interactive Price Ordering Switch (Blazing Fast UX) */}
{/* 2. Interactive Price Ordering Switch with Visual Directional Anchors */}
<div 
  onClick={() => setPriceOrder(priceOrder === 'ASC' ? 'DESC' : 'ASC')}
  className="group cursor-pointer flex flex-col items-center md:items-start select-none"
  title={priceOrder === 'ASC' ? "Switch to: Price High to Low" : "Switch to: Price Low to High"}
>
  <span className="font-label-caps text-[10px] tracking-[0.2em] md:tracking-[0.25em] text-white/40 group-hover:text-white transition-colors duration-300 uppercase flex items-center gap-1">
    PRICE: {priceOrder === 'ASC' ? (
      <>
        <span className="text-antique-champagne font-bold">LOW TO HIGH</span>
        <span className="text-antique-champagne font-mono text-[12px] font-bold">↑</span>
      </>
    ) : (
      <>
        <span className="text-antique-champagne font-bold">HIGH TO LOW</span>
        <span className="text-antique-champagne font-mono text-[12px] font-bold">↓</span>
      </>
    )}
  </span>
  <div className="h-[1px] w-0 group-hover:w-full bg-antique-champagne transition-all duration-300 mt-0.5"></div>
</div>

      
      {/* 3. Sub-Category*/}
      <div 
        onClick={() => setSelectedSubCategory('')} 
        className="group cursor-pointer flex flex-col items-center md:items-start select-none"
        title="Click to reset sub-collection"
      >
        <span className={`font-label-caps text-[10px] tracking-[0.2em] md:tracking-[0.25em] transition-colors duration-300 uppercase ${
          selectedSubCategory ? 'text-antique-champagne' : 'text-white/40 group-hover:text-white'
        }`}>
          Sub Category: {
            selectedSubCategory 
              ? (subCategories.find(s => s.id === selectedSubCategory)?.name || 'ACTIVE') 
              : 'ALL Products'
          }
        </span>
        <div className={`h-[1px] bg-antique-champagne transition-all duration-300 mt-0.5 ${
          selectedSubCategory ? 'w-full' : 'w-0 group-hover:w-full'
        }`}></div>
      </div>
      
      {/* 4. Reset All Active Filters Token */}
      {(selectedCategory || selectedSubCategory || selectedSize || selectedColor) && (
        <button 
          onClick={() => {
            setSelectedCategory('');
            setSelectedSubCategory('');
            setSelectedSize('');
            setSelectedColor('');
          }}
          className="font-label-caps text-[9px] tracking-[0.15em] border border-error/30 text-error hover:bg-error hover:text-white transition-colors px-2 py-0.5 uppercase cursor-pointer"
        >
          Clear Active Filters [X]
        </button>
      )}
    </div>

    {/* Right Utility Actions: Counters & Main Drawer Trigger Toggle */}
    <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-6 border-t border-white/5 md:border-none pt-3 md:pt-0">
      <span className="font-label-caps text-[9px] md:text-[10px] tracking-[0.2em] text-white/30 uppercase font-mono">
        {products.length} {products.length === 1 ? 'ITEM' : 'ITEMS'} IDENTIFIED
      </span>
      
      <button 
        onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
        className={`flex items-center gap-2.5 border hover:border-white font-nav-link text-[10px] md:text-[11px] tracking-[0.15em] uppercase px-4 py-2 md:px-5 md:py-2.5 transition-all duration-300 select-none cursor-pointer ${
          isFilterDrawerOpen 
            ? 'bg-antique-champagne text-black border-antique-champagne' 
            : 'bg-transparent text-white border-white/20 hover:bg-white hover:text-black'
        }`}
      >
        <span>{isFilterDrawerOpen ? 'Close Drawer' : 'Filter Drawer'}</span>
        <svg 
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isFilterDrawerOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
      </button>
    </div>

  </div>
</section>
{/*  FILTER DRAWER */}
{/* ── HIGH PERFORMANCE FULLY CONNECTED FILTER DRAWER PANEL ── */}
<div 
  className={`w-full bg-neutral-950 border-b border-white/10 overflow-hidden transition-all duration-500 ease-in-out ${
    isFilterDrawerOpen ? 'max-h-[1200px] py-8 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'
  }`}
>
  <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 relative">
    
    {/* COLUMN 1: MATERIAL (CONNECTED DYNAMICALLY TO URL ROUTER) */}
    <div className="flex flex-col gap-3">
      <h3 className="font-label-caps text-[10px] tracking-[0.25em] text-antique-champagne uppercase font-bold border-b border-white/5 pb-2">
        Filter By Material
      </h3>
      <div className="flex flex-col gap-2">
        {['Artificial jewelry', 'Silver Jewelry', 'Leather Products'].map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                // ⚡ THE ROUTER FIX: Fires changes instantly to your centralized URL engine
                updateFilterInUrl('category', isSelected ? '' : cat);
              }}
              className={`font-nav-link text-[11px] tracking-[0.1em] text-left uppercase transition-colors bg-transparent border-none cursor-pointer focus:outline-none ${
                isSelected ? 'text-antique-champagne font-bold' : 'text-white/50 hover:text-white'
              }`}
            >
              {cat === 'Artificial jewelry' ? 'Artificial Pieces' : cat === 'Leather Products' ? 'Leather Goods' : cat}
            </button>
          );
        })}
      </div>
    </div>

    {/* COLUMN 2: SUB-COLLECTIONS (LIVE NEON PARAMETER BUFFER) */}
    <div className="flex flex-col gap-3">
      <h3 className="font-label-caps text-[10px] tracking-[0.25em] text-antique-champagne uppercase font-bold border-b border-white/5 pb-2">
        Sub-Collection Line
      </h3>
      <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto scrollbar-none pr-2">
        {subCategories
          .filter(sub => !selectedCategory || sub.parent_category === selectedCategory)
          .map((sub) => {
            const isSelected = selectedSubCategory === sub.id;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => updateFilterInUrl('subcategory', isSelected ? '' : sub.id)}
                className={`font-nav-link text-[11px] tracking-[0.1em] text-left uppercase transition-colors truncate bg-transparent border-none cursor-pointer focus:outline-none ${
                  isSelected ? 'text-antique-champagne font-bold' : 'text-white/50 hover:text-white'
                }`}
              >
                {sub.name}
              </button>
            );
        })}
        {subCategories.filter(sub => !selectedCategory || sub.parent_category === selectedCategory).length === 0 && (
          <span className="font-body-lg text-[11px] text-white/20 italic select-none">Select a material above</span>
        )}
      </div>
    </div>

    {/* COLUMN 3: CONTEXT AWARE MATRIX SIZES (FIXED DATA ASSIGNMENT) */}
    <div className="flex flex-col gap-3">
      <h3 className="font-label-caps text-[10px] tracking-[0.25em] text-antique-champagne uppercase font-bold border-b border-white/5 pb-2">
        Filter By Sizing
      </h3>
      <div className="flex flex-wrap gap-1.5 max-w-full">
        {/* ⚡ THE SYSTEM FIX: Checks the string matching condition accurately against your database text strings */}
        {selectedCategory === 'Silver Jewelry' ? (
          <>
            <span className="font-label-caps text-[8px] text-white/30 tracking-widest block w-full uppercase mb-1 select-none">US Standard Matrix:</span>
            {['5', '6', '7', '8', '9', '10', '11'].map(size => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => updateFilterInUrl('size', isSelected ? '' : size)}
                  className={`px-2.5 py-1 text-[10px] font-mono border transition-all cursor-pointer focus:outline-none ${
                    isSelected ? 'bg-antique-champagne text-black border-antique-champagne font-bold' : 'border-white/10 text-white/50 hover:border-white/30'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </>
        ) : (
          /* Scenario B: Artificial / Leather sizing matrices display */
          <div className="flex flex-wrap gap-1.5 w-full">
            {['Small', 'Medium', 'Large', 'X-Large'].map(size => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => updateFilterInUrl('size', isSelected ? '' : size)}
                  className={`px-3 py-1 font-label-caps text-[9px] tracking-widest border transition-all uppercase cursor-pointer focus:outline-none ${
                    isSelected ? 'bg-antique-champagne text-black border-antique-champagne font-bold' : 'border-white/10 text-white/50 hover:border-white/30'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>

    {/* COLUMN 4: TEXT ACCENTS FILTER & ABSOLUTE MASTER RESET BUTTON */}
    <div className="flex flex-col gap-3 justify-between h-full">
      <div className="flex flex-col gap-3">
        <h3 className="font-label-caps text-[10px] tracking-[0.25em] text-antique-champagne uppercase font-bold border-b border-white/5 pb-2">
          Color Accents
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="TYPE COLOR... (e.g. SILVER)"
            value={selectedColor}
            onChange={(e) => updateFilterInUrl('color', e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-2 text-[11px] font-label-caps tracking-widest text-white focus:outline-none focus:border-antique-champagne transition-colors uppercase placeholder:text-white/20"
          />
          {selectedColor && (
            <button 
              type="button"
              onClick={() => updateFilterInUrl('color', '')} 
              className="absolute right-2 top-2.5 text-error text-[10px] uppercase font-bold hover:text-white bg-transparent border-none cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ⚡ THE CLEAR ALL FILTER FIX: Dropdown master reset controls shortcut built right into layout view footer */}
      {(selectedCategory || selectedSubCategory || selectedSize || selectedColor) && (
        <button
          type="button"
          onClick={() => {
            // Clears all tracking strings out of your Next.js address router stream simultaneously
            const cleanUrlParams = new URLSearchParams();
            cleanUrlParams.set('order', priceOrder || 'ASC'); // keep sorting choice active safely
            router.push(`${pathname}?${cleanUrlParams.toString()}`, { scroll: false });
          }}
          className="w-full border border-error/40 text-error hover:bg-error hover:text-white transition-all duration-300 font-label-caps text-[10px] tracking-widest uppercase py-2.5 mt-4 cursor-pointer font-bold bg-transparent text-center"
        >
          Clear All Active Filters [X]
        </button>
      )}
    </div>

  </div>
</div>




{/* ── UPDATED DATABASE DRIVEN STORE GRID SECTION ── */}
<main className="py-6 md:py-20 px-0 sm:px-4 md:px-12 max-w-7xl mx-auto selection:bg-antique-champagne selection:text-black">
  
  {/* Empty State Data Parameter Check */}
  {products.length === 0 && !loading && (
    <div className="text-center py-20 border border-white/5 bg-surface-container-low p-8 mx-4 animate-fadeIn">
      <span className="font-label-caps text-[11px] tracking-[0.3em] text-white/30 block mb-2 uppercase font-bold">NO RESULTS IDENTIFIED</span>
      <p className="font-body-lg text-[13px] text-white/50 max-w-sm mx-auto">No handcrafted items match your selected filter matrices. Try resetting an active parameter tag above.</p>
    </div>
  )}

  {/* 🚀 RESPONSIVE CORES FIX: 
      - grid-cols-3 handles EXACTLY 3 images per row on mobile viewports.
      - md:grid-cols-3 and lg:grid-cols-4 seamlessly steps up to 4 images per row on desktops.
      - gap-[3px] ensures microscopic spacing on phones while md:gap-6 adds deep space on large screens. */}
  <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-[3px] md:gap-6 w-full px-[3px] sm:px-0">

    {products.map((product, idx) => {
      // Retain layout asymmetry only on desktop sizes to prevent layout disruption on tiny mobile screens
      const isAsymmetricShift = idx % 4 === 2;

      return (
        <Link 
          href={`/products/${product.slug}`} 
          key={product.id}
          className={`flex flex-col group cursor-pointer transition-all duration-500 w-full ${
            isAsymmetricShift ? 'lg:translate-y-12' : ''
          }`}
        >
          {/* 🚀 THE ASPECT FIX: Shifted to a wide 4:3 frame to fully display your landscape photography without cutting anything out */}
          <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950 border border-transparent group-hover:border-white/10 transition-colors duration-500 w-full mb-2 md:mb-4">
            <Image
              src={product.images?.[0] || "/product-placeholder.png"} 
              alt={`${product.name} - Handcrafted Premium Archive by Shomicore`}
              fill
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw" // Optimizes performance for dense 3-column structures
              priority={idx < 4} // Instantly pre-loads your top row items to skip loading blurs
              quality={100} // Zero compression drops for intricate silver filigree details
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" 
            />

            {/* Design indicator accent dot */}
            <div className="absolute top-2.5 right-2.5 md:top-4 md:right-4 h-1 md:h-1.5 w-1 md:w-1.5 rounded-full bg-antique-champagne z-10"></div>
            
            {/* Action Hover Slide Reveal Layer (Hidden on mobile for lightning-fast touch targets) */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-end justify-center pb-6 z-10">
              <span className="bg-white text-black font-nav-link px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] font-semibold text-center select-none">
                View Archive
              </span>
            </div>
          </div>

          {/* Text Specifications Metadata Blocks */}
          <div className="flex flex-col w-full px-1 sm:px-0">
            {/* Title Block */}
            <h3 className="font-label-caps text-[8px] sm:text-[9px] md:text-[11px] uppercase tracking-wider md:tracking-[0.2em] text-white truncate mb-0.5 md:mb-2 pr-1" title={product.name}>
              {product.name}
            </h3>
            
            {/* Category / Pricing Flex Strip */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-0.5 sm:gap-2 w-full">
              <p className="font-body-lg text-[9px] sm:text-[11px] md:text-[13px] text-white/40 italic truncate max-w-[85%] sm:max-w-[65%] capitalize">
                {product.parent_category?.toLowerCase().replace(' products', '').replace(' jewelry', '')}
              </p>
              <p className="font-body-lg text-[9px] sm:text-[11px] md:text-[14px] text-antique-champagne font-bold whitespace-nowrap mt-0.5 sm:mt-0">
                €{parseFloat(product.price).toFixed(2)}
              </p>
            </div>
          </div>

        </Link>
      );
    })}
    
  </div>

  {/* Bottom Action Footer Separator */}
  <div className="mt-12 md:mt-24 flex flex-col items-center">
    <div className="h-12 md:h-16 w-px bg-white/10 mb-6 md:mb-8"></div>
    <button className="font-label-caps text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-white/40 hover:text-antique-champagne transition-colors cursor-pointer group bg-transparent border-none outline-none focus:outline-none">
      Continue Discovering
      <div className="h-px w-0 group-hover:w-full bg-antique-champagne transition-all duration-500 mt-2 mx-auto"></div>
    </button>
  </div>

</main>


        </div>
    );
}



export default function ProductPage() {
  return (
    <Suspense 
      fallback={
        <div className="bg-matte-charcoal min-h-screen text-on-surface flex flex-col items-center justify-center font-label-caps text-[11px] tracking-[0.3em] uppercase opacity-40">
          Mounting Secure Catalog Stream...
        </div>
      }
    >
      <ProductPageContent />
    </Suspense>
  );
}
