"use client"
import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";



// export const revalidate = 60; // Regenerates the cached page smoothly in the background every 60 seconds
export default function Home() {
  


  // Database Data States
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Active Subcategory Tracking Filters per Section
  // This lets the user click a subcategory in one section without breaking the other sections!
  const [activeArtificialSub, setActiveArtificialSub] = useState('ALL');
  const [activeSilverSub, setActiveSilverSub] = useState('ALL');
  const [activeLeatherSub, setActiveLeatherSub] = useState('ALL');

  // Fetch all initial storefront data from your backend API endpoints on load
  useEffect(() => {
    const fetchHomeStoreData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch all store products
        const productsResponse = await fetch('/api/products');
        const productsResult = await productsResponse.json();
        if (productsResult.success) setProducts(productsResult.data);

        // 2. Fetch all dynamic subcategories created in your admin panel
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

  // Smooth Scroll Helper Function for your Main Navigation Links
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

    {/* Dynamic Sub-Category Artificial Jewelry */}
 <div className="w-full bg-black/40 border-y border-white/10 mb-8 py-5">
  <div className="px-4 md:px-12 flex items-center gap-3 sm:gap-4 overflow-x-auto md:overflow-x-visible scrollbar-none whitespace-nowrap md:whitespace-normal snap-x snap-mandatory md:flex-wrap md:justify-center">
    
    <button
      onClick={() => setActiveArtificialSub('ALL')}
      className="snap-center flex flex-col items-center gap-2.5 text-center group outline-none select-none min-w-[80px] sm:min-w-[95px] md:min-w-[110px] cursor-pointer"
    >
      <div 
        className={`relative w-14 h-[74px] sm:w-16 sm:h-[85px] md:w-20 md:h-[105px] border flex items-center justify-center transition-all duration-500 ease-out bg-neutral-950
          ${activeArtificialSub === 'ALL' 
            ? 'border-antique-champagne shadow-lg shadow-antique-champagne/[0.04]' 
            : 'border-white/10 group-hover:border-white/30'
          }`}
      >
        <span className={`font-label-caps text-[11px] md:text-xs tracking-[0.2em] font-bold transition-colors duration-300
          ${activeArtificialSub === 'ALL' ? 'text-antique-champagne' : 'text-white/30 group-hover:text-white/80'}`}
        >
          ALL
        </span>
        <div className={`absolute inset-1 border pointer-events-none transition-colors duration-500
          ${activeArtificialSub === 'ALL' ? 'border-antique-champagne/20' : 'border-transparent'}`} 
        />
      </div>
      
      <span className={`font-nav-link text-[9px] sm:text-[10px] tracking-[0.12em] uppercase transition-colors duration-300
        ${activeArtificialSub === 'ALL' ? 'text-antique-champagne font-medium' : 'text-white/40 group-hover:text-white'}`}
      >
        VIEW ALL
      </span>
    </button>

    {subCategories
      .filter(sub => sub.parent_category === 'Artificial jewelry')
      .map((sub) => (
        <button
          key={sub.id}
          onClick={() => setActiveArtificialSub(sub.id)}
          className="snap-center flex flex-col items-center gap-2.5 text-center group outline-none select-none min-w-[80px] sm:min-w-[95px] md:min-w-[110px] cursor-pointer"
        >
          <div 
            className={`relative w-14 h-[74px] sm:w-16 sm:h-[85px] md:w-20 md:h-[105px] border overflow-hidden bg-neutral-900 transition-all duration-500 ease-out
              ${activeArtificialSub === sub.id 
                ? 'border-antique-champagne shadow-lg shadow-antique-champagne/[0.04]' 
                : 'border-white/10 group-hover:border-white/30'
              }`}
          >
            <Image
              src={sub.image_url || "/placeholder-circle.jpg"}
              alt={`${sub.name} Collection`}
              fill
              sizes="(max-width: 768px) 64px, 80px"
              className={`object-cover transition-all duration-700 ease-out
                ${activeArtificialSub === sub.id 
                  ? 'grayscale-0 scale-105' 
                  : 'grayscale group-hover:grayscale-0 group-hover:scale-110'
                }`}
            />
            <div className={`absolute inset-1 border pointer-events-none transition-colors duration-500
              ${activeArtificialSub === sub.id ? 'border-antique-champagne/20' : 'border-white/5'}`} 
            />
          </div>
          
          <span className={`font-nav-link text-[9px] sm:text-[10px] tracking-[0.12em] uppercase transition-colors duration-300 max-w-[80px] sm:max-w-[100px] whitespace-normal break-words leading-tight
            ${activeArtificialSub === sub.id ? 'text-antique-champagne font-medium' : 'text-white/40 group-hover:text-white'}`}
          >
            {sub.name}
          </span>
        </button>
    ))}
  </div>
</div>


 <div className="grid grid-cols-3 lg:grid-cols-4 gap-[2px] md:gap-6 w-full">
  {products
    .filter(p => p.parent_category === 'Artificial jewelry' && (activeArtificialSub === 'ALL' || p.sub_category_id === activeArtificialSub))
    .map((product) => (
      <Link 
        href={`/products/${product.slug}`}
        key={product.id} 
        className="group flex flex-col cursor-pointer transition-all duration-300 w-full"
      >
        {/* 🚀 THE FRAME FIX: High-end 3:4 portrait view container with zero padding */}
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-transparent hover:border-white/10 transition-colors duration-500 w-full mb-3 md:mb-4">
          <Image 
            src={product.images?.[0] || "/product-placeholder.png"} 
            alt={`${product.name} - Handcrafted Premium Archive by Shomicore`} 
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
            quality={95} // Forces maximum luxury texture definition rendering
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" // ⚡ Edge-to-edge cover layout filling
          />

          {/* Premium Visual Accent dot */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4 h-1 md:h-1.5 w-1 md:w-1.5 rounded-full bg-antique-champagne z-10"></div>
          
          {/* Action Hover Slide Reveal Layer (Hidden on mobile grid view scales for clean UX targets) */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-end justify-center pb-8 z-10">
            <span className="bg-white text-black font-nav-link px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-semibold text-center select-none">
              View Archive
            </span>
          </div>
        </div>

        {/* 🚀 THE TYPOGRAPHY FIX: Aligned perfectly to match dark editorial lookbook guidelines */}
        <h3 className="font-label-caps text-[9px] md:text-[11px] uppercase tracking-wider md:tracking-[0.2em] text-white truncate mb-1 pr-2 w-full text-left" title={product.name}>
          {product.name}
        </h3>
        
        <div className="flex justify-between items-baseline gap-2 w-full">
          <p className="font-body-lg text-[11px] md:text-[13px] text-white/40 italic truncate max-w-[60%] capitalize">
            Artificial Pieces
          </p>
          <p className="font-body-lg text-[11px] md:text-[14px] text-antique-champagne font-bold whitespace-nowrap">
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

    {/* Dynamic Sub-Category */}
<div className="w-full bg-black/40 border-y border-white/10 mb-8 py-5">
  <div className="px-4 md:px-12 flex items-center gap-3 sm:gap-4 overflow-x-auto md:overflow-x-visible scrollbar-none whitespace-nowrap md:whitespace-normal snap-x snap-mandatory md:flex-wrap md:justify-center">
    
    <button
      onClick={() => setActiveSilverSub('ALL')}
      className="snap-center flex flex-col items-center gap-2.5 text-center group outline-none select-none min-w-[80px] sm:min-w-[95px] md:min-w-[110px] cursor-pointer"
    >
      <div 
        className={`relative w-14 h-[74px] sm:w-16 sm:h-[85px] md:w-20 md:h-[105px] border flex items-center justify-center transition-all duration-500 ease-out bg-neutral-950
          ${activeSilverSub === 'ALL' 
            ? 'border-antique-champagne shadow-lg shadow-antique-champagne/[0.04]' 
            : 'border-white/10 group-hover:border-white/30'
          }`}
      >
        <span className={`font-label-caps text-[11px] md:text-xs tracking-[0.2em] font-bold transition-colors duration-300
          ${activeSilverSub === 'ALL' ? 'text-antique-champagne' : 'text-white/30 group-hover:text-white/80'}`}
        >
          ALL
        </span>
        <div className={`absolute inset-1 border pointer-events-none transition-colors duration-500
          ${activeSilverSub === 'ALL' ? 'border-antique-champagne/20' : 'border-transparent'}`} 
        />
      </div>
      
      <span className={`font-nav-link text-[9px] sm:text-[10px] tracking-[0.12em] uppercase transition-colors duration-300
        ${activeSilverSub === 'ALL' ? 'text-antique-champagne font-medium' : 'text-white/40 group-hover:text-white'}`}
      >
        VIEW ALL
      </span>
    </button>

    {subCategories
      .filter(sub => sub.parent_category === 'Silver Jewelry')
      .map((sub) => (
        <button
          key={sub.id}
          onClick={() => setActiveSilverSub(sub.id)}
          className="snap-center flex flex-col items-center gap-2.5 text-center group outline-none select-none min-w-[80px] sm:min-w-[95px] md:min-w-[110px] cursor-pointer"
        >
       <div 
  className={`relative w-14 h-[74px] sm:w-16 sm:h-[85px] md:w-20 md:h-[105px] border overflow-hidden bg-neutral-900 transition-all duration-500 ease-out
    ${activeSilverSub === sub.id 
      ? 'border-antique-champagne shadow-lg shadow-antique-champagne/[0.04]' 
      : 'border-white/10 group-hover:border-white/30'
    }`}
>
  <Image
    src={sub.image_url || "/assets/placeholder-circle.jpg"}
    alt={`${sub.name} Collection`}
    fill
    sizes="(max-width: 768px) 64px, 80px"
    className={`object-cover transition-all duration-700 ease-out ${
      activeSilverSub === sub.id 
        ? 'grayscale-0 scale-105' 
        : 'grayscale group-hover:grayscale-0 group-hover:scale-110'
    }`}
  />
  <div className={`absolute inset-1 border pointer-events-none transition-colors duration-500
    ${activeSilverSub === sub.id ? 'border-antique-champagne/20' : 'border-white/5'}`} 
  />
</div>

          
          <span className={`font-nav-link text-[9px] sm:text-[10px] tracking-[0.12em] uppercase transition-colors duration-300 max-w-[80px] sm:max-w-[100px] whitespace-normal break-words leading-tight
            ${activeSilverSub === sub.id ? 'text-antique-champagne font-medium' : 'text-white/40 group-hover:text-white'}`}
          >
            {sub.name}
          </span>
        </button>
    ))}
  </div>
</div>


{/* Filtered Grid Logic for Silver Products */}
<div className="grid grid-cols-3 lg:grid-cols-4 gap-[2px] md:gap-6 w-full">
  {products
    .filter(p => p.parent_category === 'Silver Jewelry' && (activeSilverSub === 'ALL' || p.sub_category_id === activeSilverSub))
    .slice(0, 12)
    .map((product) => (
      <Link 
        href={`/products/${product.slug}`}
        key={product.id} 
        className="group flex flex-col cursor-pointer transition-all duration-300 w-full"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950 border border-transparent group-hover:border-white/10 transition-colors duration-500 w-full mb-3 md:mb-4">
          <Image 
            src={product.images?.[0] || "/product-placeholder.png"} 
            alt={`${product.name} - Handcrafted Premium Archive by Shomicore`} 
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority 
            quality={100} 
            className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]" 
          />
          <div className="absolute top-3 right-3 md:top-4 md:right-4 h-1 md:h-1.5 w-1 md:w-1.5 rounded-full bg-antique-champagne z-10"></div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-end justify-center pb-6 z-10">
            <span className="bg-white text-black font-nav-link px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] font-semibold text-center select-none">
              View Archive
            </span>
          </div>
        </div>
        <h3 className="font-label-caps text-[9px] md:text-[11px] uppercase tracking-wider md:tracking-[0.2em] text-white truncate mb-1 pr-2 w-full text-left" title={product.name}>
          {product.name}
        </h3>
        
        <div className="flex justify-between items-baseline gap-2 w-full">
          <p className="font-body-lg text-[11px] md:text-[13px] text-white/40 italic truncate max-w-[60%] capitalize">
            Silver Jewelry
          </p>
          <p className="font-body-lg text-[11px] md:text-[14px] text-antique-champagne font-bold whitespace-nowrap">
            €{parseFloat(product.price).toFixed(2)}
          </p>
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
<div className="w-full bg-black/40 border-y border-white/10 mb-8 py-5">

  <div className="px-4 md:px-12 flex items-center gap-3 sm:gap-4 overflow-x-auto md:overflow-x-visible scrollbar-none whitespace-nowrap md:whitespace-normal snap-x snap-mandatory md:flex-wrap md:justify-center">
    
    <button
      onClick={() => setActiveLeatherSub('ALL')}
      className="snap-center flex flex-col items-center gap-2.5 text-center group outline-none select-none min-w-[80px] sm:min-w-[95px] md:min-w-[110px] cursor-pointer"
    >
      <div 
        className={`relative w-14 h-[74px] sm:w-16 sm:h-[85px] md:w-20 md:h-[105px] border flex items-center justify-center transition-all duration-500 ease-out bg-neutral-950
          ${activeLeatherSub === 'ALL' 
            ? 'border-antique-champagne shadow-lg shadow-antique-champagne/[0.04]' 
            : 'border-white/10 group-hover:border-white/30'
          }`}
      >
        <span className={`font-label-caps text-[11px] md:text-xs tracking-[0.2em] font-bold transition-colors duration-300
          ${activeLeatherSub === 'ALL' ? 'text-antique-champagne' : 'text-white/30 group-hover:text-white/80'}`}
        >
          ALL
        </span>
        <div className={`absolute inset-1 border pointer-events-none transition-colors duration-500
          ${activeLeatherSub === 'ALL' ? 'border-antique-champagne/20' : 'border-transparent'}`} 
        />
      </div>
      
      <span className={`font-nav-link text-[9px] sm:text-[10px] tracking-[0.12em] uppercase transition-colors duration-300
        ${activeLeatherSub === 'ALL' ? 'text-antique-champagne font-medium' : 'text-white/40 group-hover:text-white'}`}
      >
        VIEW ALL
      </span>
    </button>

    {subCategories
      .filter(sub => sub.parent_category === 'Leather Products')
      .map((sub) => (
        <button
          key={sub.id}
          onClick={() => setActiveLeatherSub(sub.id)}
          className="snap-center flex flex-col items-center gap-2.5 text-center group outline-none select-none min-w-[80px] sm:min-w-[95px] md:min-w-[110px] cursor-pointer"
        >
          <div 
            className={`relative w-14 h-[74px] sm:w-16 sm:h-[85px] md:w-20 md:h-[105px] border overflow-hidden bg-neutral-900 transition-all duration-500 ease-out
              ${activeLeatherSub === sub.id 
                ? 'border-antique-champagne shadow-lg shadow-antique-champagne/[0.04]' 
                : 'border-white/10 group-hover:border-white/30'
              }`}
          >
            <Image
              src={sub.image_url || "/placeholder-circle.jpg"}
              alt={`${sub.name} Collection`}
              fill
              sizes="(max-width: 768px) 64px, 80px"
              className={`object-cover transition-all duration-700 ease-out
                ${activeLeatherSub === sub.id 
                  ? 'grayscale-0 scale-105' 
                  : 'grayscale group-hover:grayscale-0 group-hover:scale-110'
                }`}
            />
            <div className={`absolute inset-1 border pointer-events-none transition-colors duration-500
              ${activeLeatherSub === sub.id ? 'border-antique-champagne/20' : 'border-white/5'}`} 
            />
          </div>
          
          <span className={`font-nav-link text-[9px] sm:text-[10px] tracking-[0.12em] uppercase transition-colors duration-300 max-w-[80px] sm:max-w-[100px] whitespace-normal break-words leading-tight
            ${activeLeatherSub === sub.id ? 'text-antique-champagne font-medium' : 'text-white/40 group-hover:text-white'}`}
          >
            {sub.name}
          </span>
        </button>
    ))}
  </div>
</div>


<div className="grid grid-cols-3 lg:grid-cols-4 gap-[2px] md:gap-6 w-full">
  {products
    .filter(p => p.parent_category === 'Leather Products' && (activeLeatherSub === 'ALL' || p.sub_category_id === activeLeatherSub))
    .map((product) => (
      <Link 
        href={`/products/${product.slug}`}
        key={product.id} 
        className="group flex flex-col cursor-pointer transition-all duration-300 w-full"
      >
        {/* 🚀 THE FRAME FIX: Exact vertical 3:4 portrait view container to match Silver and Artificial */}
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-transparent hover:border-white/10 transition-colors duration-500 w-full mb-3 md:mb-4">
          <Image 
            src={product.images?.[0] || "/product-placeholder.png"} 
            alt={`${product.name} - Handcrafted Premium Archive by Shomicore`} 
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
            quality={95} // Maintains clean close-up details for leather textures
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" // ⚡ Edge-to-edge cover layout filling
          />

          {/* Premium Visual Accent dot */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4 h-1 md:h-1.5 w-1 md:w-1.5 rounded-full bg-antique-champagne z-10"></div>
          
          {/* Action Hover Slide Reveal Layer */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-end justify-center pb-8 z-10">
            <span className="bg-white text-black font-nav-link px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-semibold text-center select-none">
              View Archive
            </span>
          </div>
        </div>

        {/* 🚀 THE TYPOGRAPHY FIX: Left-aligned minimalist luxury layout */}
        <h3 className="font-label-caps text-[9px] md:text-[11px] uppercase tracking-wider md:tracking-[0.2em] text-white truncate mb-1 pr-2 w-full text-left" title={product.name}>
          {product.name}
        </h3>
        
        <div className="flex justify-between items-baseline gap-2 w-full">
          <p className="font-body-lg text-[11px] md:text-[13px] text-white/40 italic truncate max-w-[60%] capitalize">
            Leather Goods
          </p>
          <p className="font-body-lg text-[11px] md:text-[14px] text-antique-champagne font-bold whitespace-nowrap">
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