"use client";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from "next/link"
export default function ProductPage() {

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
  <div className="grid grid-cols-3 gap-1 md:gap-6 h-[32vh] md:h-[45vh] min-h-[220px] md:min-h-[320px] max-h-[480px] w-full [container-type:inline-size] items-start pt-1">
    
    {/* Card 1: Silver Jewelry */}
    <div 
      onClick={() => setSelectedCategory(selectedCategory === 'Silver Jewelry' ? '' : 'Silver Jewelry')}
      className={`relative group overflow-hidden cursor-pointer h-[95%] bg-surface-container-low border z-10 transition-all duration-500 hover:-translate-y-1 ${
        selectedCategory === 'Silver Jewelry' ? 'border-antique-champagne bg-black/60 shadow-lg shadow-antique-champagne/5' : 'border-white/5'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 group-hover:from-black/70 transition-colors duration-700 z-20`}></div>
      
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

      <div className="absolute bottom-[5cqw] left-[5cqw] right-[5cqw] z-30 pointer-events-none">
        <h2 className={`font-headline-md text-[5cqw] sm:text-xl md:text-[24px] lg:text-[28px] font-bold leading-none mb-[1.5cqw] tracking-wide transition-colors ${
          selectedCategory === 'Silver Jewelry' ? 'text-antique-champagne' : 'text-white'
        }`}>
          SILVER
        </h2>
        <p className="font-label-caps text-[2.2cqw] sm:text-[10px] tracking-[0.15em] text-white/60 uppercase truncate">
          Forged &amp; Sculpted
        </p>
      </div>

      <div className="absolute top-[5cqw] right-[5cqw] z-30 hidden sm:block pointer-events-none">
        <span className={`font-display-hero text-[5cqw] md:text-2xl uppercase tracking-[0.2em] transition-colors ${
          selectedCategory === 'Silver Jewelry' ? 'text-antique-champagne/20' : 'text-white/5'
        }`}>
          01
        </span>
      </div>
    </div>

    {/* Card 2: Artificial Jewelry */}
    <div 
      onClick={() => setSelectedCategory(selectedCategory === 'Artificial jewelry' ? '' : 'Artificial jewelry')}
      className={`relative group overflow-hidden cursor-pointer h-[95%] self-end bg-surface-container-low border z-10 transition-all duration-500 hover:translate-y-1 ${
        selectedCategory === 'Artificial jewelry' ? 'border-antique-champagne bg-black/60 shadow-lg shadow-antique-champagne/5' : 'border-white/5'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 group-hover:from-black/70 transition-colors duration-700 z-20"></div>
      
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

      <div className="absolute bottom-[5cqw] left-[5cqw] right-[5cqw] z-30 pointer-events-none">
        <h2 className={`font-headline-md text-[5cqw] sm:text-xl md:text-[24px] lg:text-[28px] font-bold leading-none mb-[1.5cqw] tracking-wide transition-colors ${
          selectedCategory === 'Artificial jewelry' ? 'text-antique-champagne' : 'text-white'
        }`}>
          ARTIFICIAL
        </h2>
        <p className="font-label-caps text-[2.2cqw] sm:text-[10px] tracking-[0.15em] text-white/60 uppercase truncate">
          Avant-Garde Style
        </p>
      </div>
      
      <div className="absolute top-[5cqw] right-[5cqw] z-30 hidden sm:block pointer-events-none">
        <span className={`font-display-hero text-[5cqw] md:text-2xl uppercase tracking-[0.2em] transition-colors ${
          selectedCategory === 'Artificial jewelry' ? 'text-antique-champagne/20' : 'text-white/5'
        }`}>
          02
        </span>
      </div>
    </div>

    {/* Card 3: Leather Goods */}
    <div 
      onClick={() => setSelectedCategory(selectedCategory === 'Leather Products' ? '' : 'Leather Products')}
      className={`relative group overflow-hidden cursor-pointer h-[95%] bg-surface-container-low border z-10 transition-all duration-500 hover:-translate-y-1 ${
        selectedCategory === 'Leather Products' ? 'border-antique-champagne bg-black/60 shadow-lg shadow-antique-champagne/5' : 'border-white/5'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 group-hover:from-black/70 transition-colors duration-700 z-20"></div>
      
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

      <div className="absolute bottom-[5cqw] left-[5cqw] right-[5cqw] z-30 pointer-events-none">
        <h2 className={`font-headline-md text-[5cqw] sm:text-xl md:text-[24px] lg:text-[28px] font-bold leading-none mb-[1.5cqw] tracking-wide transition-colors ${
          selectedCategory === 'Leather Products' ? 'text-antique-champagne' : 'text-white'
        }`}>
          LEATHER
        </h2>
        <p className="font-label-caps text-[2.2cqw] sm:text-[10px] tracking-[0.15em] text-white/60 uppercase truncate">
          Hand-Stitched
        </p>
      </div>

      <div className="absolute top-[5cqw] right-[5cqw] z-30 hidden sm:block pointer-events-none">
        <span className={`font-display-hero text-[5cqw] md:text-2xl uppercase tracking-[0.2em] transition-colors ${
          selectedCategory === 'Leather Products' ? 'text-antique-champagne/20' : 'text-white/5'
        }`}>
          03
        </span>
      </div>
    </div>

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
<div 
  className={`w-full bg-neutral-950 border-b border-white/10 overflow-hidden transition-all duration-500 ease-in-out ${
    isFilterDrawerOpen ? 'max-h-[1200px] py-8 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'
  }`}
>
  <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
    
    {/* COLUMN 1: MATERIAL */}
    <div className="flex flex-col gap-3">
      <h3 className="font-label-caps text-[10px] tracking-[0.25em] text-antique-champagne uppercase font-bold border-b border-white/5 pb-2">
        Filter By Material
      </h3>
      <div className="flex flex-col gap-2">
        {['Artificial jewelry', 'Silver Jewelry', 'Leather Products'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(selectedCategory === cat ? '' : cat);
              setSelectedSubCategory(''); // Reset subcategories to avoid filter clashes
            }}
            className={`font-nav-link text-[11px] tracking-[0.1em] text-left uppercase transition-colors ${
              selectedCategory === cat ? 'text-antique-champagne font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            {cat === 'Artificial jewelry' ? 'Artificial Pieces' : cat === 'Leather Products' ? 'Leather Goods' : cat}
          </button>
        ))}
      </div>
    </div>

    {/* COLUMN 2: SUB-COLLECTIONS (DYNAMIC DETECT) */}
    <div className="flex flex-col gap-3">
      <h3 className="font-label-caps text-[10px] tracking-[0.25em] text-antique-champagne uppercase font-bold border-b border-white/5 pb-2">
        Sub-Collection Line
      </h3>
      <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto scrollbar-none pr-2">
        {subCategories
          .filter(sub => !selectedCategory || sub.parent_category === selectedCategory)
          .map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubCategory(selectedSubCategory === sub.id ? '' : sub.id)}
              className={`font-nav-link text-[11px] tracking-[0.1em] text-left uppercase transition-colors truncate ${
                selectedSubCategory === sub.id ? 'text-antique-champagne font-bold' : 'text-white/50 hover:text-white'
              }`}
            >
              {sub.name}
            </button>
        ))}
        {subCategories.filter(sub => !selectedCategory || sub.parent_category === selectedCategory).length === 0 && (
          <span className="font-body-lg text-[11px] text-white/20 italic">Select a material above</span>
        )}
      </div>
    </div>

    {/* COLUMN 3: SIZES (CONTEXT AWARE MATRIX) */}
    <div className="flex flex-col gap-3">
      <h3 className="font-label-caps text-[10px] tracking-[0.25em] text-antique-champagne uppercase font-bold border-b border-white/5 pb-2">
        Filter By Sizing
      </h3>
      <div className="flex flex-wrap gap-1.5 max-w-full">
        {/* Scenario A: Silver Jewelry active (Show US/EU mix seamlessly) */}
        {selectedCategory === 'Silver Jewelry' ? (
          <>
            <span className="font-label-caps text-[8px] text-white/30 tracking-widest block w-full uppercase mb-1">US Standard Matrix:</span>
            {['5', '6', '7', '8', '9', '10', '11'].map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                className={`px-2.5 py-1 text-[10px] font-mono border transition-all ${
                  selectedSize === size ? 'bg-antique-champagne text-black border-antique-champagne font-bold' : 'border-white/10 text-white/50 hover:border-white/30'
                }`}
              >
                {size}
              </button>
            ))}
          </>
        ) : (
          /* Scenario B: Artificial / Leather active (Show regular metrics) */
          ['Small', 'Medium', 'Large', 'X-Large'].map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
              className={`px-3 py-1 font-label-caps text-[9px] tracking-widest border transition-all uppercase ${
                selectedSize === size ? 'bg-antique-champagne text-black border-antique-champagne font-bold' : 'border-white/10 text-white/50 hover:border-white/30'
              }`}
            >
              {size}
            </button>
          ))
        )}
      </div>
    </div>

    {/* COLUMN 4: COLORATION VARIETIES */}
    <div className="flex flex-col gap-3">
      <h3 className="font-label-caps text-[10px] tracking-[0.25em] text-antique-champagne uppercase font-bold border-b border-white/5 pb-2">
        Color Accents
      </h3>
      <div className="relative">
        <input
          type="text"
          placeholder="TYPE COLOR... (e.g. SILVER)"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-full bg-black/40 border border-white/10 p-2 text-[11px] font-label-caps tracking-widest text-white focus:outline-none focus:border-antique-champagne transition-colors uppercase placeholder:text-white/20"
        />
        {selectedColor && (
          <button 
            onClick={() => setSelectedColor('')} 
            className="absolute right-2 top-2.5 text-error text-[10px] uppercase font-bold hover:text-white"
          >
            Clear
          </button>
        )}
      </div>
      <span className="text-[9px] font-body-lg text-white/30 leading-tight">
        Type custom colors freely to find matching handcrafted finishes instantly.
      </span>
    </div>

  </div>
</div>



            {/* <!-- Product Grid Section --> */}
<main className="py-6 md:py-20 px-0 sm:px-4 md:px-12 max-w-7xl mx-auto">
  
  {products.length === 0 && !loading && (
    <div className="text-center py-20 border border-white/5 bg-surface-container-low p-8 mx-4">
      <span className="font-label-caps text-[11px] tracking-[0.3em] text-white/30 block mb-2 uppercase">NO RESULTS IDENTIFIED</span>
      <p className="font-body-lg text-[13px] text-white/50 max-w-sm mx-auto">No handcrafted items match your selected filter matrices. Try resetting an active parameter tag above.</p>
    </div>
  )}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">

  {products.map((product, idx) => {
    const isAsymmetricShift = idx % 4 === 2;

    return (
      // ⚡ THE FIX: Wrapped the parent item shell directly inside a single Link element block
      <Link 
        href={`/products/${product.slug}`} 
        key={product.id}
        className={`flex flex-col group cursor-pointer transition-transform duration-500 block ${
          isAsymmetricShift ? 'lg:translate-y-12' : ''
        }`}
      >
        {/* Layout Visual Frame */}
        <div className="relative aspect-[3/4] overflow-hidden bg-surface-container mb-4 border border-transparent hover:border-white/10 transition-colors duration-500 w-full">
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 w-full">
  <Image
    src={product.images[0] || "/product-placeholder.png"} // 🚀 INDEX 0 ALWAYS SPECIFIES YOUR COVER MAIN IMAGE
    alt={product.name}
    fill
    sizes="(max-width: 768px) 100vw, 25vw"
    loading="lazy"
    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" // ⚡ object-cover fills container without stretching
  />
</div>

          <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-antique-champagne z-10"></div>
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 z-10">
            <span className="bg-white text-black font-nav-link px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-semibold text-center">
              View Archive
            </span>
          </div>
        </div>

        {/* Text Specs Context */}
        <h3 className="font-label-caps text-[10px] uppercase tracking-[0.3em] text-white truncate mb-2 pr-2">
          {product.name}
        </h3>
        
        <div className="flex justify-between items-baseline gap-2">
          <p className="font-body-lg text-[13px] text-white/40 italic truncate max-w-[65%]">
            {product.parent_category}
          </p>
          <p className="font-body-lg text-[14px] text-antique-champagne font-semibold">
            €{parseFloat(product.price).toFixed(2)}
          </p>
        </div>
      </Link>
    );
  })}
  
</div>


  <div className="mt-12 md:mt-16 flex flex-col items-center">
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


