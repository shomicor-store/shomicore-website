"use client"
import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";

export default function Home() {
  


  // Database Data 
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeArtificialSub, setActiveArtificialSub] = useState('ALL');
  const [activeSilverSub, setActiveSilverSub] = useState('ALL');
  const [activeLeatherSub, setActiveLeatherSub] = useState('ALL');

  useEffect(() => {
    const fetchHomeStoreData = async () => {
      try {
        setLoading(true);
        
        //  Fetch all store products
        const productsResponse = await fetch('/api/products');
        const productsResult = await productsResponse.json();
        if (productsResult.success) setProducts(productsResult.data);

        const subCategoriesResponse = await fetch('/api/sub-categories');
        const subCategoriesResult = await subCategoriesResponse.json();
        if (subCategoriesResult.success) setSubCategories(subCategoriesResult.data);

      } catch (error) {
        console.error("Failed to load storefront data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeStoreData();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="bg-matte-charcoal min-h-screen text-on-surface flex items-center justify-center font-label-caps text-[12px] tracking-[0.3em]">
        LOADING SHOMICORE ARCHITECTURE...
      </div>
    );
  }
 
  return (
    <div className="bg-matte-charcoal min-h-screen text-on-surface font-body-lg">

{/* HERO SECTION - COMPACT HEIGHT RE-ENGINEERED */}
<section className="relative w-full h-[22vh] md:h-[45vh] min-h-[160px] md:min-h-[280px] max-h-[450px] flex overflow-hidden bg-matte-charcoal select-none">
  
  {/* Left Box - Static 1/3 Width */}
  <div className="relative w-1/3 h-full overflow-hidden group border-r border-white/5 bg-surface-container-low z-10">
    <div className="w-full h-full opacity-30 transition-opacity duration-1000 group-hover:opacity-60">
      <Image 
        src="/high_contrast_black_and_white_lifestyle_fashion_photography._close_up_of_a.png" 
        alt="High contrast black and white luxury lifestyle fashion photography curated by Shomicor" 
        fill
        sizes="33vw"
        priority
        className="object-cover" 
      />
    </div>
  </div>

  {/* Center Box - Completely isolated container with safe content boundaries */}
  <div className="relative w-1/3 h-full flex items-center justify-center bg-black overflow-hidden border-x border-white/5 z-20">
    <div className="text-center w-full px-2 flex flex-col items-center justify-center whitespace-nowrap overflow-hidden [container-type:inline-size]">
      <h1 className="font-display-hero text-[18cqw] md:text-[60px] lg:text-[70px] xl:text-[80px] tracking-tighter leading-none text-white mb-[2cqw] md:mb-5">
        SHOMICOR
      </h1>
      <div className="w-[12cqw] md:w-10 lg:w-12 h-[1px] bg-antique-champagne mb-[2cqw] md:mb-5 flex-shrink-0"></div>
      <p className="font-body-lg text-white/60 tracking-widest uppercase text-[2.8cqw] md:text-[11px] lg:text-xs mb-[4cqw] md:mb-6 flex-shrink-0">
        Curated Craftsmanship
      </p>
      <a 
        href="#collections" 
        title="Explore Shomicor curated jewelry collections"
        className="inline-block border border-white/20 hover:border-white/80 text-white font-label-caps tracking-[0.15em] text-[2.8cqw] md:text-[10px] lg:text-xs uppercase px-[4cqw] py-[1.5cqw] md:px-4 md:py-2.5 transition-colors duration-300 bg-transparent hover:bg-white hover:text-black flex-shrink-0"
      >
        Explore our collections
      </a>
      
    </div>
  </div>

  {/* Right Box - Static 1/3 Width */}
  <div className="relative w-1/3 h-full overflow-hidden group border-l border-white/5 bg-surface-container-low z-10">
    <div className="w-full h-full opacity-30 transition-opacity duration-1000 group-hover:opacity-60">
      <Image 
        src="/moody_dark_portrait_of_a_model_wearing_premium_sculptural_jewelry._sharp_side.png" 
        alt="Moody dark portrait of a model wearing premium sculptural jewelry from Shomicor" 
        fill
        sizes="33vw"
        priority
        className="object-cover" 
      />
    </div>
  </div>

</section>



{/* Main categories Anchor Navigation Bar */}
<div className="w-full bg-matte-charcoal border-y border-white/10 sticky top-0 z-20 backdrop-blur-md bg-matte-charcoal/95">
  
  {/* MAIN CATEGORIES  */}
  <div className="px-4 md:px-12 py-4 md:py-6 flex justify-center items-center gap-7 sm:gap-12 md:gap-16 overflow-x-auto md:overflow-x-visible scrollbar-none whitespace-nowrap md:whitespace-normal md:flex-wrap">
    
    {/* Category 1: Silver Jewelry */}
    <button 
      onClick={() => scrollToSection('silver-jewelry')}
      className="flex flex-col items-center gap-2 group outline-none select-none cursor-pointer"
    >
      <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full overflow-hidden  border border-white/10 bg-black/40  group-hover:border-antique-champagne bg-black/40 transition-all duration-300 group-hover:scale-105">
        <Image 
          src="/silver_jewelry_pic.png" 
          alt="Premium Silver Jewelry Collection by Shomicore" 
          fill 
          priority
          sizes="(max-width: 768px) 36px, 56px"
          className="object-cover"
        />
      </div>
      <span className="font-nav-link text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.25em] uppercase text-white group-hover:text-antique-champagne transition-colors duration-300">
        SILVER JEWELRY
      </span>
    </button>

    {/* Category 2: Artificial Pieces */}
    <button 
      onClick={() => scrollToSection('artificial-jewelry')}
      className="flex flex-col items-center gap-2 group outline-none select-none cursor-pointer"
    >
      <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/10 bg-black/40 transition-all duration-300 group-hover:scale-105 group-hover:border-antique-champagne">
        <Image 
          src="/artificial_jewelry.png" 
          alt="Luxury Artificial Pieces Collection by Shomicore" 
          fill 
          priority 
          sizes="(max-width: 768px) 36px, 56px"
          className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <span className="font-nav-link text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.25em] uppercase text-white/40 group-hover:text-antique-champagne transition-colors duration-300">
        ARTIFICIAL PIECES
      </span>
    </button>

    {/* Category 3: Leather Goods */}
    <button 
      onClick={() => scrollToSection('leather-products')}
      className="flex flex-col items-center gap-2 group outline-none select-none cursor-pointer"
    >
      <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/10 bg-black/40 transition-all duration-300 group-hover:scale-105 group-hover:border-antique-champagne">
        <Image 
          src="/high_contrast_black_and_white_lifestyle_fashion_photography._close_up_of_a.png" 
          alt="Handcrafted Luxury Leather Goods by Shomicore" 
          fill 
          priority 
          sizes="(max-width: 768px) 36px, 56px"
          className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <span className="font-nav-link text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.25em] uppercase text-white/40 group-hover:text-antique-champagne transition-colors duration-300">
        LEATHER GOODS
      </span>
    </button>

  </div>

  <style jsx global>{`
    .scrollbar-none::-webkit-scrollbar { display: none; }
    .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
</div>


{/* ALL DYNAMIC CATEGORIES PRODUCT SHOWCASE SECTION */}
<main className="px-0 sm:px-3 md:px-12 py-6 md:py-16 bg-black flex flex-col gap-12 md:gap-20">

  {/* SECTION 1: ARTIFICIAL JEWELRY CONTAINER*/}

  <section id="artificial-jewelry" className="w-full max-w-7xl mx-auto flex flex-col gap-4">
    <div className="flex flex-col items-center text-center mb-4 md:mb-6 px-4">
      <h2 className="font-label-caps text-white text-xs md:text-sm tracking-[0.3em] uppercase font-semibold">
        Artificial Jewelry
      </h2>
      <div className="w-6 h-[1px] bg-antique-champagne mt-2"></div>
    </div>

  
{/* Dynamic Sub-Category Artificial Jewelry Navigation */}
<div className="w-full bg-gradient-to-b from-black/60 to-black/20 backdrop-blur-md border-y border-white/[0.06] mb-10 py-8 relative">
  
  {/* Smooth horizontal scrolling track with robust spacing layout constraints */}
  <div className="px-4 md:px-12 flex items-center gap-4 sm:gap-6 overflow-x-auto md:overflow-x-visible scrollbar-none whitespace-nowrap md:whitespace-normal snap-x snap-mandatory md:flex-wrap md:justify-center">
    


    {/* SUB CATEGORY LIST MAP */}
    {subCategories
      .filter(sub => sub.parent_category === 'Artificial jewelry')
      .map((sub) => (
        <button
          key={sub.id}
          onClick={() => setActiveArtificialSub(sub.id)}
          className="snap-center flex flex-col items-center gap-3.5 text-center group outline-none select-none min-w-[140px] sm:min-w-[160px] md:min-w-[180px] cursor-pointer"
        >
          {/* INCREASED IMAGE BOX FRAME: Expanded surface space with consistent luxury geometry scale */}
          <div 
            className={`relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 border overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#121212] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center
              ${activeArtificialSub === sub.id 
                ? 'border-antique-champagne shadow-[0_0_20px_rgba(230,187,119,0.15)]' 
                : 'border-white/[0.08] group-hover:border-white/30'
              }`}
          >
            <Image
              src={sub.image_url || "/placeholder-circle.jpg"}
              alt={`${sub.name} Collection`}
              fill
              sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
              className={`object-contain p-2.5 transition-transform duration-[1000ms] ease-out mix-blend-screen ${
                activeArtificialSub === sub.id 
                  ? 'scale-[1.05]' 
                  : 'group-hover:scale-[1.1]'
              }`}
            />
            <div className={`absolute inset-1.5 border pointer-events-none transition-colors duration-500
              ${activeArtificialSub === sub.id ? 'border-antique-champagne/20' : 'border-white/[0.02]'}`} 
            />
          </div>
          
          {/* HIGH CONTRAST TYPOGRAPHY COLOR OVERHAUL */}
          <div className="flex flex-col items-center gap-1.5 max-w-[130px] sm:max-w-[150px] md:max-w-[170px]">
            <span className={`font-nav-link text-[11px] sm:text-xs md:text-[13px] tracking-[0.18em] uppercase transition-colors duration-500 whitespace-normal break-words leading-relaxed font-medium
              ${activeArtificialSub === sub.id ? 'text-antique-champagne' : 'text-white group-hover:text-antique-champagne'}`}
            >
              {sub.name}
            </span>
            {/* Sleek structural bottom track indicator */}
            <div className={`h-[1px] bg-antique-champagne transition-all duration-500 ease-out ${activeArtificialSub === sub.id ? 'w-8' : 'w-0 group-hover:w-4'}`} />
          </div>
        </button>
    ))}
  </div>
</div>



{/* Dynamic Sub-Category Artificial Jewelry - Unbounded Text Layout */}
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16 w-full bg-transparent">
  {products
    .filter(p => p.parent_category === 'Artificial jewelry' && (activeArtificialSub === 'ALL' || p.sub_category_id === activeArtificialSub))
    .slice(0, 12)
    .map((product) => (
      <Link 
        href={`/products/${product.slug}`}
        key={product.id} 
        className="group flex flex-col cursor-pointer w-full h-full justify-between"
      >
        {/* Container wrapping content to align metadata perfectly with the bottom elements */}
        <div className="flex flex-col w-full">
          
          {/* SHARP LOOKBOOK CANVAS CONTAINER - FORCED ASPECT SQUARE */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#090909] to-[#121212] border border-white/[0.03] group-hover:border-antique-champagne/20 transition-all duration-700 w-full mb-4 flex items-center justify-center p-4">
            <Image 
              src={product.images?.[0] || "/product-placeholder.png"} 
              alt={`${product.name} - Handcrafted Premium Archive by Shomicor`} 
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority 
              quality={95}
              className="object-contain p-2 mix-blend-screen transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]" 
            />
            
            {/* AMBIENT EXHIBITION BACKLIGHT */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_75%)] pointer-events-none group-hover:opacity-150 transition-opacity duration-700" />
            
            {/* SIGNATURE BRAND ASSET ALIGNMENT DOT */}
            <div className="absolute top-3 right-3 md:top-4 md:right-4 h-1.5 w-1.5 rounded-full bg-antique-champagne z-10 shadow-[0_0_8px_rgba(230,187,119,0.5)] group-hover:scale-110 transition-transform duration-500" />
            
            {/* ACTION QUICK VIEW REVEAL LAYER */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 hidden md:flex items-center justify-center z-10 backdrop-blur-[2px]">
              <span className="bg-white text-black font-nav-link px-6 py-3 text-[10px] uppercase tracking-[0.25em] font-medium text-center select-none shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 border border-white">
                View Archive
              </span>
            </div>
          </div>

          {/* DYNAMIC TITLE WITH PROGRESSIVE SEPARATOR - ZERO TEXT TRUNCATION */}
          <div className="flex flex-col gap-2 w-full text-left px-1">
            {/* 
              CRITICAL UNBOUNDED TEXT FIX: 
              Completely removed 'truncate' to let long names wrap vertically down.
              whitespace-normal allows the layout to expand onto lines 2, 3, or more naturally.
              break-words and hyphens-auto manage elongated item codes safely.
            */}
            <h3 
              className="font-label-caps text-[11px] md:text-[12px] uppercase tracking-[0.12em] text-white/90 font-bold leading-snug break-words whitespace-normal block w-full hyphens-auto transition-colors duration-300 group-hover:text-antique-champagne" 
              title={product.name}
            >
              {product.name}
            </h3>
            
            {/* DYNAMIC PROGRESSIVE SEPARATOR */}
            <div className="relative w-full h-[1px] bg-white/[0.06] overflow-hidden my-0.5">
              <div className="absolute top-0 left-0 h-full w-0 bg-gradient-to-r from-transparent via-antique-champagne/40 to-transparent group-hover:w-full transition-all duration-700 ease-out" />
            </div>
          </div>
          
        </div>

        {/* BALANCED TRANSACTION DETAILS LAYER - ANCHORED STABLY AT THE BOTTOM HORIZON BASELINE */}
        <div className="flex justify-between items-center gap-2 w-full pt-1.5 px-1 mt-auto">
          
          {/* CATEGORY BLOCK DETAILS */}
          <p className="font-body-lg text-[10px] text-white/40 tracking-[0.15em] uppercase font-medium break-words whitespace-normal leading-normal max-w-[60%]">
            Artificial Pieces
          </p>
          
          {/* SOLID FINANCIAL PRICE BLOCK MARKER */}
          <p className="font-body-lg text-[11px] md:text-[13px] text-antique-champagne font-semibold tracking-wider whitespace-nowrap bg-white/[0.02] group-hover:bg-white/[0.05] px-2 py-1 border border-white/[0.08] group-hover:border-antique-champagne/30 transition-all duration-500 shrink-0">
            €{parseFloat(product.price).toFixed(2)}
          </p>
          
        </div>
      </Link>
  ))}
</div>





  </section>


  {/* SECTION 2: SILVER JEWELRY CONTAINER*/}
 
  <section id="silver-jewelry" className="w-full max-w-7xl mx-auto flex flex-col gap-4">
    <div className="flex flex-col items-center text-center mb-4 md:mb-6 px-4">
      <h2 className="font-label-caps text-white text-xs md:text-sm tracking-[0.3em] uppercase font-semibold">
        Silver Jewelry
      </h2>
      <div className="w-6 h-[1px] bg-antique-champagne mt-2"></div>
    </div>


<div className="w-full bg-gradient-to-b from-black/60 to-black/20 backdrop-blur-md border-y border-white/[0.06] mb-10 py-8 relative">
  

  <div className="px-4 md:px-12 flex items-center gap-4 sm:gap-6 overflow-x-auto md:overflow-x-visible scrollbar-none whitespace-nowrap md:whitespace-normal snap-x snap-mandatory md:flex-wrap md:justify-center">

    {/* SUB CATEGORY LIST MAP */}
    {subCategories
      .filter(sub => sub.parent_category === 'Silver Jewelry')
      .map((sub) => (
        <button
          key={sub.id}
          onClick={() => setActiveSilverSub(sub.id)}
          className="snap-center flex flex-col items-center gap-3.5 text-center group outline-none select-none min-w-[140px] sm:min-w-[160px] md:min-w-[180px] cursor-pointer"
        >
          {/* INCREASED IMAGE BOX FRAME: Scaled up to w-32/h-32 up to w-40/h-40 with clear layout constraints */}
          <div 
            className={`relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 border overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#121212] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center
              ${activeSilverSub === sub.id 
                ? 'border-antique-champagne shadow-[0_0_20px_rgba(230,187,119,0.15)]' 
                : 'border-white/[0.08] group-hover:border-white/30'
              }`}
          >
            <Image
              src={sub.image_url || "/assets/placeholder-circle.jpg"}
              alt={`${sub.name} Collection`}
              fill
              sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
              className={`object-contain p-2 transition-transform duration-[1000ms] ease-out mix-blend-screen ${
                activeSilverSub === sub.id 
                  ? 'scale-[1.05]' 
                  : 'group-hover:scale-[1.1]'
              }`}
            />
            <div className={`absolute inset-1.5 border pointer-events-none transition-colors duration-500
              ${activeSilverSub === sub.id ? 'border-antique-champagne/20' : 'border-white/[0.02]'}`} 
            />
          </div>
          
          {/* CLEAN HIGH CONTRAST TYPOGRAPHY COLOR OVERHAUL */}
          <div className="flex flex-col items-center gap-1.5 max-w-[130px] sm:max-w-[150px] md:max-w-[170px]">
            <span className={`font-nav-link text-[11px] sm:text-xs md:text-[13px] tracking-[0.18em] uppercase transition-colors duration-500 whitespace-normal break-words leading-relaxed font-medium
              ${activeSilverSub === sub.id ? 'text-antique-champagne' : 'text-white group-hover:text-antique-champagne'}`}
            >
              {sub.name}
            </span>
            {/* Sleek structural underline */}
            <div className={`h-[1px] bg-antique-champagne transition-all duration-500 ease-out ${activeSilverSub === sub.id ? 'w-8' : 'w-0 group-hover:w-4'}`} />
          </div>
        </button>
    ))}
  </div>
</div>






{/* Dynamic products of silver jewelry */}
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16 w-full bg-transparent">
  {products
    .filter(p => p.parent_category === 'Silver Jewelry' && (activeSilverSub === 'ALL' || p.sub_category_id === activeSilverSub))
    .slice(0, 12)
    .map((product) => (
      <Link 
        href={`/products/${product.slug}`}
        key={product.id} 
        className="group flex flex-col cursor-pointer w-full h-full justify-between"
      >
        {/* Container wrapping content to align metadata perfectly with the bottom elements */}
        <div className="flex flex-col w-full">
          
          {/* PREMIUM IMAGE CANVAS */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#121212] border border-white/[0.04] group-hover:border-antique-champagne/30 transition-all duration-700 w-full mb-4 flex items-center justify-center p-4">
            <Image 
              src={product.images?.[0] || "/product-placeholder.png"} 
              alt={`${product.name} - Handcrafted Premium Archive by Shomicor`} 
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority 
              quality={95} 
              className="object-contain p-2 mix-blend-screen transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]" 
            />
            
            {/* RADIAL GLOW BEHIND PRODUCT */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none group-hover:opacity-150 transition-opacity duration-700" />
            
            {/* THE BRAND PIN */}
            <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-antique-champagne z-10 shadow-[0_0_8px_rgba(230,187,119,0.6)] group-hover:scale-125 transition-transform duration-500"></div>
            
            {/* REFINED HOVER ACTION */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 hidden md:flex items-center justify-center z-10 backdrop-blur-[2px]">
              <span className="bg-white text-black font-nav-link px-6 py-3 text-[10px] uppercase tracking-[0.3em] font-medium text-center select-none shadow-2xl transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 delay-75 border border-white">
                View Archive
              </span>
            </div>
          </div>

          {/* DYNAMIC TITLE UNDERLINE EFFECT - ZERO TEXT TRUNCATION */}
          <div className="relative pt-0.5 pb-2 px-1 text-left w-full">
            {/* 
              CRITICAL UNBOUNDED TEXT FIX: 
              Completely removed 'truncate' to let long names wrap vertically down.
              whitespace-normal allows the layout to expand onto lines 2, 3, or more naturally.
              break-words and hyphens-auto manage elongated item codes safely.
            */}
            <h3 
              className="font-label-caps text-[12px] md:text-[13px] uppercase tracking-[0.12em] text-white/90 font-bold leading-snug break-words whitespace-normal block w-full hyphens-auto transition-colors duration-300 group-hover:text-white" 
              title={product.name}
            >
              {product.name}
            </h3>
            <div className="absolute bottom-0 left-1 right-1 h-[1px] bg-white/[0.06] overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-0 bg-gradient-to-r from-transparent via-antique-champagne/40 to-transparent group-gradient group-hover:w-full transition-all duration-700 ease-out" />
            </div>
          </div>
          
        </div>

        {/* DETAILS SECTION - ANCHORED STABLY AT THE BOTTOM HORIZON BASELINE */}
        <div className="flex flex-col gap-1 w-full text-left px-1 mt-auto pt-2">
          <div className="flex justify-between items-center gap-3 w-full">
            <p className="font-body-lg text-[9px] md:text-[10px] text-white/40 tracking-[0.2em] uppercase font-medium break-words whitespace-normal leading-normal max-w-[60%]">
              Silver Jewelry
            </p>
            <p className="font-body-lg text-[12px] md:text-[13px] text-antique-champagne font-semibold tracking-wider whitespace-nowrap transition-transform duration-300 group-hover:translate-x-[-2px] bg-white/[0.02] group-hover:bg-white/[0.05] px-2 py-0.5 border border-white/[0.08] group-hover:border-antique-champagne/30 shrink-0">
              €{parseFloat(product.price).toFixed(2)}
            </p>
          </div>
        </div>

      </Link>
  ))}
</div>





  </section>

  {/* SECTION 3: LEATHER PRODUCTS CONTAINER*/}
  <section id="leather-products" className="w-full max-w-7xl mx-auto flex flex-col gap-4">
    <div className="flex flex-col items-center text-center mb-4 md:mb-6 px-4">
      <h2 className="font-label-caps text-white text-xs md:text-sm tracking-[0.3em] uppercase font-semibold">
        Leather Products (COMMING SOON)
      </h2>
      <div className="w-6 h-[1px] bg-antique-champagne mt-2"></div>
    </div>
{/* Dynamic Sub-Category Leather Products Navigation */}
<div className="w-full bg-gradient-to-b from-black/60 to-black/20 backdrop-blur-md border-y border-white/[0.06] mb-10 py-8 relative">
  
  {/* Smooth horizontal scrolling track with uniform layout constraints */}
  <div className="px-4 md:px-12 flex items-center gap-4 sm:gap-6 overflow-x-auto md:overflow-x-visible scrollbar-none whitespace-nowrap md:whitespace-normal snap-x snap-mandatory md:flex-wrap md:justify-center">


    {/* SUB CATEGORY LIST MAP */}
    {subCategories
      .filter(sub => sub.parent_category === 'Leather Products')
      .map((sub) => (
        <button
          key={sub.id}
          onClick={() => setActiveLeatherSub(sub.id)}
          className="snap-center flex flex-col items-center gap-3.5 text-center group outline-none select-none min-w-[140px] sm:min-w-[160px] md:min-w-[180px] cursor-pointer"
        >
          {/* LARGER IMAGE BOX FRAME: Expanded proportions to highlight organic product textures */}
          <div 
            className={`relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 border overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#121212] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center
              ${activeLeatherSub === sub.id 
                ? 'border-antique-champagne shadow-[0_0_20px_rgba(230,187,119,0.15)]' 
                : 'border-white/[0.08] group-hover:border-white/30'
              }`}
          >
            <Image
              src={sub.image_url || "/placeholder-circle.jpg"}
              alt={`${sub.name} Collection`}
              fill
              sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
              className={`object-contain p-2.5 transition-transform duration-[1000ms] ease-out mix-blend-screen ${
                activeLeatherSub === sub.id 
                  ? 'scale-[1.05]' 
                  : 'group-hover:scale-[1.1]'
              }`}
            />
            <div className={`absolute inset-1.5 border pointer-events-none transition-colors duration-500
              ${activeLeatherSub === sub.id ? 'border-antique-champagne/20' : 'border-white/[0.02]'}`} 
            />
          </div>
          
          {/* HIGH CONTRAST TYPOGRAPHY COLOR OVERHAUL */}
          <div className="flex flex-col items-center gap-1.5 max-w-[130px] sm:max-w-[150px] md:max-w-[170px]">
            <span className={`font-nav-link text-[11px] sm:text-xs md:text-[13px] tracking-[0.18em] uppercase transition-colors duration-500 whitespace-normal break-words leading-relaxed font-medium
              ${activeLeatherSub === sub.id ? 'text-antique-champagne' : 'text-white group-hover:text-antique-champagne'}`}
            >
              {sub.name}
            </span>
            {/* Sleek structural underline active track */}
            <div className={`h-[1px] bg-antique-champagne transition-all duration-500 ease-out ${activeLeatherSub === sub.id ? 'w-8' : 'w-0 group-hover:w-4'}`} />
          </div>
        </button>
    ))}
  </div>
</div>

{/* Dynamic Sub-Category Leather Products - Unbounded Text Layout */}
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16 w-full bg-transparent">
  {products
    .filter(p => p.parent_category === 'Leather Products' && (activeLeatherSub === 'ALL' || p.sub_category_id === activeLeatherSub))
    .map((product) => (
      <Link 
        href={`/products/${product.slug}`}
        key={product.id} 
        className="group flex flex-col cursor-pointer w-full h-full justify-between"
      >
        {/* Container wrapping content to align everything nicely with the bottom elements */}
        <div className="flex flex-col w-full">
          
          {/* PREMIUM IMAGE CANVAS */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#121212] border border-white/[0.03] group-hover:border-antique-champagne/20 transition-all duration-700 w-full mb-4 flex items-center justify-center p-4">
            <Image 
              src={product.images?.[0] || "/product-placeholder.png"} 
              alt={`${product.name} - Handcrafted Premium Archive by Shomicor`} 
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
              quality={95}
              className="object-contain p-2 mix-blend-screen transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]" 
            />

            {/* Ambient Backlight Spotlight Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_75%)] pointer-events-none group-hover:opacity-150 transition-opacity duration-700" />

            {/* Premium Visual Accent Dot */}
            <div className="absolute top-3 right-3 md:top-4 md:right-4 h-1.5 w-1.5 rounded-full bg-antique-champagne z-10 shadow-[0_0_8px_rgba(230,187,119,0.5)] group-hover:scale-110 transition-transform duration-500" />
            
            {/* Action Hover Slide Reveal Layer */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 hidden md:flex items-center justify-center z-10 backdrop-blur-[2px]">
              <span className="bg-white text-black font-nav-link px-6 py-3 text-[10px] uppercase tracking-[0.25em] font-medium text-center select-none border border-white transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                View Archive
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full text-left px-1">
            
            <h3 
              className="font-label-caps text-[11px] md:text-[12px] uppercase tracking-[0.12em] text-white/95 font-bold leading-snug break-words whitespace-normal block w-full hyphens-auto transition-colors duration-300 group-hover:text-antique-champagne" 
              title={product.name}
            >
              {product.name}
            </h3>
            <div className="relative w-full h-[1px] bg-white/[0.06] overflow-hidden my-0.5">
              <div className="absolute top-0 left-0 h-full w-0 bg-gradient-to-r from-transparent via-antique-champagne/40 to-transparent group-hover:w-full transition-all duration-700 ease-out" />
            </div>
            
          </div>
        </div>

        {/* BOTTOM METADATA BAR STRIP */}
        <div className="flex justify-between items-center gap-3 w-full pt-1.5 px-1 mt-auto">
          
          {/* CATEGORY DESIGNATOR */}
          <p className="font-body-lg text-[9px] md:text-[10px] text-white/40 tracking-[0.15em] uppercase font-medium break-words whitespace-normal leading-normal max-w-[60%]">
            Leather Goods
          </p>
          
          {/* PRICE TAG CONTAINER */}
          <p className="font-body-lg text-[11px] md:text-[13px] text-antique-champagne font-semibold tracking-wider whitespace-nowrap bg-white/[0.02] group-hover:bg-white/[0.05] px-2 py-0.5 border border-white/[0.08] group-hover:border-antique-champagne/30 transition-all duration-500 shrink-0">
            €{parseFloat(product.price).toFixed(2)}
          </p>
          
        </div>

      </Link>
  ))}
</div>




  </section>
</main>






    </div>
  );
}
