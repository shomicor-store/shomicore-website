"use client"
import Image from "next/image";

export default function Home() {
  const dummyProducts = [
    { id: 1, title: "Helix Ring No. 04", price: "€240.00" },
    { id: 2, title: "Noir Minimalist Clutch", price: "€580.00" },
    { id: 3, title: "Forged Link Bracelet", price: "€310.00" },
    { id: 4, title: "Molten Drop Earrings", price: "€185.00" },
  ];
  const silverProducts = [
    { id: 1, title: "Helix Ring No. 04", price: "€240.00" },
    { id: 2, title: "Noir Minimalist Clutch", price: "€580.00" },
    { id: 3, title: "Forged Link Bracelet", price: "€310.00" },
    { id: 4, title: "Molten Drop Earrings", price: "€185.00" },
  ];
  const leatherProducts  = [
    { id: 1, title: "Helix Ring No. 04", price: "€240.00" },
    { id: 2, title: "Noir Minimalist Clutch", price: "€580.00" },
    { id: 3, title: "Forged Link Bracelet", price: "€310.00" },
    { id: 4, title: "Molten Drop Earrings", price: "€185.00" },
  ];
  return (
    <div className="bg-matte-charcoal min-h-screen text-on-surface font-body-lg">


<section className="relative w-full h-[35vh] md:h-[55vh] min-h-[250px] md:min-h-[340px] max-h-[600px] flex overflow-hidden bg-matte-charcoal select-none">
  
  {/* Left Box */}
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

  {/* Center Box */}
  <div className="relative w-1/3 h-full flex items-center justify-center bg-black overflow-hidden border-x border-white/5 z-20">
  
    <div className="text-center w-[95%] px-1 sm:px-2 md:px-4 flex flex-col items-center justify-center whitespace-nowrap overflow-hidden">
      
   
      <h1 className="font-display-hero text-[6.5vw] md:text-[4.8vw] lg:text-[75px] xl:text-[80px] tracking-tighter leading-none text-white mb-[2vw] md:mb-6">
        SHOMICOR
      </h1>
      
  
      <div className="w-6 md:w-10 lg:w-12 h-[1px] bg-antique-champagne mb-[2.5vw] md:mb-7 flex-shrink-0"></div>
 
      <p className="font-body-lg text-white/60 tracking-widest uppercase text-[1.2vw] md:text-[1vw] lg:text-xs mb-[3.5vw] md:mb-8 flex-shrink-0">
        Curated Craftsmanship
      </p>
      <a 
        href="#collections" 
        title="Explore Shomicor curated jewelry collections"
        className="inline-block border border-white/20 hover:border-white/80 text-white font-label-caps tracking-[0.15em] text-[1.2vw] md:text-[0.9vw] lg:text-xs uppercase px-[2.5vw] py-[1vw] lg:px-5 lg:py-3 transition-colors duration-300 bg-transparent hover:bg-white hover:text-black flex-shrink-0"
      >
        Explore our collections
      </a>
      
    </div>
  </div>

  {/* Right Box  */}
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


{/* LUXURY CATEGORIES & SUBCATEGORIES NAV ROW */}
<div className="w-full bg-matte-charcoal border-y border-white/10">
  
  {/* MAIN CATEGORIES BAR - Responsive Flex Grid Layout */}
  <div className="px-4 md:px-12 py-4 md:py-6 flex justify-center items-center gap-7 sm:gap-12 md:gap-16 overflow-x-auto md:overflow-x-visible scrollbar-none whitespace-nowrap md:whitespace-normal md:flex-wrap">
    
    {/* Category 1: Silver */}
    <button className="flex flex-col items-center gap-2 group outline-none select-none">
      <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full overflow-hidden border border-antique-champagne bg-black/40 transition-transform duration-300 group-hover:scale-105">
        <Image 
          src="/high_contrast_black_and_white_lifestyle_fashion_photography._close_up_of_a.png" 
          alt="Premium Silver Jewelry Collection by Shomicor" 
          fill 
          sizes="(max-width: 768px) 36px, 56px"
          priority
          className="object-cover"
        />
      </div>
      <span className="font-nav-link text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.25em] uppercase text-white transition-colors duration-300">
        SILVER JEWELRY
      </span>
    </button>

    {/* Category 2: Artificial */}
    <button className="flex flex-col items-center gap-2 group outline-none select-none">
      <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/10 bg-black/40 transition-transform duration-300 group-hover:scale-105 group-hover:border-white/40">
        <Image 
          src="/moody_dark_portrait_of_a_model_wearing_premium_sculptural_jewelry._sharp_side.png" 
          alt="Luxury Artificial Pieces Collection by Shomicor" 
          fill 
          sizes="(max-width: 768px) 36px, 56px"
          className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <span className="font-nav-link text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.25em] uppercase text-white/40 group-hover:text-antique-champagne transition-colors duration-300">
        ARTIFICIAL PIECES
      </span>
    </button>

    {/* Category 3: Leather */}
    <button className="flex flex-col items-center gap-2 group outline-none select-none">
      <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/10 bg-black/40 transition-transform duration-300 group-hover:scale-105 group-hover:border-white/40">
        <Image 
          src="/high_contrast_black_and_white_lifestyle_fashion_photography._close_up_of_a.png" 
          alt="Handcrafted Luxury Leather Goods by Shomicor" 
          fill 
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






{/* ALL CATEGORIES PRODUCT SHOWCASE SECTION */}
<main className="px-0 sm:px-3 md:px-12 py-6 md:py-16 bg-black flex flex-col gap-12 md:gap-20">

  {/* SECTION 1: ARTIFICIAL JEWELRY */}
  <section id="artificial-pieces" className="w-full max-w-7xl mx-auto flex flex-col">
    <div className="flex flex-col items-center text-center mb-4 md:mb-8 px-4">
      <h2 className="font-label-caps text-white text-xs md:text-sm tracking-[0.3em] uppercase font-semibold">
        Artificial Jewelry
      </h2>
      <div className="w-6 h-[1px] bg-antique-champagne mt-2"></div>
    </div>

    <div className="grid grid-cols-3 lg:grid-cols-4 gap-[2px] md:gap-6 w-full">
    
      {(dummyProducts || []).filter(p => p.category?.toLowerCase() === 'artificial' || true).map((product) => (
        <div 
          key={product.id} 
          className="group flex flex-col cursor-pointer bg-white border border-neutral-200/60 p-0 pb-2 md:p-3 transition-colors duration-300"
        >
          <div className="relative aspect-square w-full overflow-hidden bg-white flex items-center justify-center">
            <Image 
              src={product.imageSrc || "/product-placeholder.png"} 
              alt={`${product.title} - Premium Artificial Jewelry by Shomicor`} 
              fill
              sizes="(max-width: 1024px) 33vw, 25vw"
              loading="lazy"
              className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col gap-0.5 items-center text-center mt-2 w-full px-1 bg-white">
            <h3 className="font-label-caps text-black text-[9px] md:text-[11px] uppercase tracking-wider md:tracking-[0.2em] truncate w-full px-0.5">
              {product.title}
            </h3>
            <span className="font-body-lg text-black font-bold text-[11px] md:text-[14px] mt-0.5">
              {product.price}
            </span>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* EDITORIAL SUB-CATEGORIES ROW */}
  <div className="border-t border-white/5 bg-black/40 px-4 md:px-12 py-4 flex items-center gap-2 sm:gap-3 overflow-x-auto md:overflow-x-visible scrollbar-none whitespace-nowrap md:whitespace-normal snap-x snap-mandatory md:flex-wrap md:justify-center">
    {[
      { name: "OPAL RINGS", img: "/placeholder-opal.jpg" },
      { name: "EMERALD RINGS", img: "/placeholder-emerald.jpg" },
      { name: "SAPPHIRE RINGS", img: "/placeholder-sapphire.jpg" },
      { name: "RUBY RINGS", img: "/placeholder-ruby.jpg" },
      { name: "TOURMALINE RINGS", img: "/placeholder-tourmaline.jpg" },
      { name: "PERIDOT RINGS", img: "/placeholder-peridot.jpg" },
      { name: "MOISSANITE RINGS", img: "/placeholder-moissanite.jpg" },
      { name: "QUARTZ RINGS", img: "/placeholder-quartz.jpg" },
      { name: "TOPAZ RINGS", img: "/placeholder-topaz.jpg" },
      { name: "AGATE RINGS", img: "/placeholder-agate.jpg" },
    ].map((sub, index) => (
      <a
        key={index}
        href={`#${sub.name.toLowerCase().replace(/\s+/g, '-')}`}
        title={`Shop Shomicor ${sub.name}`}
        className="snap-center flex flex-col items-center gap-2 text-center group outline-none select-none min-w-[72px] sm:min-w-[90px] md:min-w-[105px]"
      >
        {/* Sharp Lookbook Image Container - 3:4 portrait ratio */}
        <div className="relative w-14 h-[74px] sm:w-16 sm:h-[85px] md:w-20 md:h-[105px] border border-white/10 group-hover:border-antique-champagne/60 bg-neutral-900 transition-all duration-500 overflow-hidden">
          <Image
            src={sub.img}
            alt={sub.name}
            fill
            sizes="(max-width: 768px) 64px, 80px"
            loading="lazy"
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
        </div>
        
        {/* Bold minimalist item title */}
        <span className="font-nav-link text-[9px] sm:text-[10px] tracking-[0.12em] text-white/50 group-hover:text-white transition-colors duration-300 max-w-[80px] sm:max-w-[100px] whitespace-normal break-words leading-tight">
          {sub.name}
        </span>
      </a>
    ))}
  </div>
  {/* SECTION 2: SILVER JEWELRY */}
  <section id="silver-jewelry" className="w-full max-w-7xl mx-auto flex flex-col">
    <div className="flex flex-col items-center text-center mb-4 md:mb-8 px-4">
      <h2 className="font-label-caps text-white text-xs md:text-sm tracking-[0.3em] uppercase font-semibold">
        Silver Jewelry
      </h2>
      <div className="w-6 h-[1px] bg-antique-champagne mt-2"></div>
    </div>

    <div className="grid grid-cols-3 lg:grid-cols-4 gap-[2px] md:gap-6 w-full">
      {/* Swap mapping arrays effortlessly once your backend APIs are ready to connect */}
      {(silverProducts || dummyProducts || []).map((product) => (
        <div 
          key={`silver-${product.id}`} 
          className="group flex flex-col cursor-pointer bg-white border border-neutral-200/60 p-0 pb-2 md:p-3 transition-colors duration-300"
        >
          <div className="relative aspect-square w-full overflow-hidden bg-white flex items-center justify-center">
            <Image 
              src={product.imageSrc || "/product-placeholder.png"} 
              alt={`${product.title} - Handcrafted Pure Silver Jewelry by Shomicor`} 
              fill
              sizes="(max-width: 1024px) 33vw, 25vw"
              loading="lazy"
              className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col gap-0.5 items-center text-center mt-2 w-full px-1 bg-white">
            <h3 className="font-label-caps text-black text-[9px] md:text-[11px] uppercase tracking-wider md:tracking-[0.2em] truncate w-full px-0.5">
              {product.title}
            </h3>
            <span className="font-body-lg text-black font-bold text-[11px] md:text-[14px] mt-0.5">
              {product.price}
            </span>
          </div>
        </div>
      ))}
    </div>
  </section>


  {/* SECTION 3: LEATHER PRODUCTS */}
  <section id="leather-goods" className="w-full max-w-7xl mx-auto flex flex-col">
    <div className="flex flex-col items-center text-center mb-4 md:mb-8 px-4">
      <h2 className="font-label-caps text-white text-xs md:text-sm tracking-[0.3em] uppercase font-semibold">
        Leather Products
      </h2>
      <div className="w-6 h-[1px] bg-antique-champagne mt-2"></div>
    </div>

    <div className="grid grid-cols-3 lg:grid-cols-4 gap-[2px] md:gap-6 w-full">
      {(leatherProducts || dummyProducts || []).map((product) => (
        <div 
          key={`leather-${product.id}`} 
          className="group flex flex-col cursor-pointer bg-white border border-neutral-200/60 p-0 pb-2 md:p-3 transition-colors duration-300"
        >
          <div className="relative aspect-square w-full overflow-hidden bg-white flex items-center justify-center">
            <Image 
              src={product.imageSrc || "/product-placeholder.png"} 
              alt={`${product.title} - Curated Genuine Leather Goods by Shomicor`} 
              fill
              sizes="(max-width: 1024px) 33vw, 25vw"
              loading="lazy"
              className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col gap-0.5 items-center text-center mt-2 w-full px-1 bg-white">
            <h3 className="font-label-caps text-black text-[9px] md:text-[11px] uppercase tracking-wider md:tracking-[0.2em] truncate w-full px-0.5">
              {product.title}
            </h3>
            <span className="font-body-lg text-black font-bold text-[11px] md:text-[14px] mt-0.5">
              {product.price}
            </span>
          </div>
        </div>
      ))}
    </div>
  </section>

</main>






    </div>
  );
}