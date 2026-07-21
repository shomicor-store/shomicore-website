"use client"
import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";
import { motion } from "framer-motion";
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
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center font-label-caps select-none relative overflow-hidden">
      
      {/* Premium Ambient Background Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,187,119,0.02)_0%,transparent_65%)] pointer-events-none" />

      {/* Main Core Loading Geometry Assembly */}
      <div className="flex flex-col items-center gap-6 relative z-10">
        
        {/* Luxury Signature Ring Loader Ring Asset */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Outermost Infinite Spinning Border Matrix Track */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-white/[0.03] border-t-antique-champagne/40 rounded-full"
          />
          
          {/* Innermost Breathing Core Dot Focus Marker */}
          <motion.div 
            animate={{ 
              scale: [0.85, 1.05, 0.85],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-10 h-10 border border-white/5 bg-white/[0.01] rounded-full flex items-center justify-center"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-antique-champagne shadow-[0_0_12px_rgba(230,187,119,0.6)]" />
          </motion.div>
        </div>

        {/* Dynamic Typography Identity Block */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <motion.h2 
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="font-headline-md text-sm md:text-base tracking-[0.35em] text-white font-bold uppercase"
          >
            SHOMICORE
          </motion.h2>
          
          {/* Elegant Horizontal Progress Bar Track */}
          <div className="w-20 h-[1px] bg-white/5 relative overflow-hidden mt-0.5">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-antique-champagne/50 to-transparent"
            />
          </div>
          
          <span className="text-[9px] tracking-[0.25em] text-white/30 uppercase font-mono mt-1 block">
            Mounting Secure Architecture...
          </span>
        </div>

      </div>
    </div>
  );
}

 
  return (
    <div className="bg-matte-charcoal min-h-screen text-on-surface font-body-lg">

{/* HERO SECTION - COMPACT HEIGHT RE-ENGINEERED */}
<motion.section 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
  className="relative w-full h-[22vh] md:h-[45vh] min-h-[160px] md:min-h-[280px] max-h-[450px] flex overflow-hidden bg-matte-charcoal select-none group/hero"
>
  
  {/* Left Box - Static 1/3 Width */}
  <div className="relative w-1/3 h-full overflow-hidden border-r border-white/5 bg-surface-container-low z-10">
    <motion.div 
      initial={{ scale: 1.15, opacity: 0 }}
      animate={{ 
        scale: [1.08, 1.03, 1.08],
        opacity: 0.3
      }}
      transition={{ 
        scale: { repeat: Infinity, duration: 24, ease: "easeInOut" },
        opacity: { duration: 1.8, ease: "easeOut" }
      }}
      whileHover={{ 
        scale: 1.05, 
        opacity: 0.6, 
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="w-full h-full"
    >
      <Image 
        src="/high_contrast_black_and_white_lifestyle_fashion_photography._close_up_of_a.png" 
        alt="High contrast black and white luxury lifestyle fashion photography curated by Shomicor" 
        fill
        sizes="33vw"
        priority
        className="object-cover" 
      />
    </motion.div>
  </div>

  {/* Center Box - Completely isolated container with safe content boundaries */}
  <div className="relative w-1/3 h-full flex items-center justify-center bg-black overflow-hidden border-x border-white/5 z-20">
    <motion.div 
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.15, delayChildren: 0.3 }
        }
      }}
      className="text-center w-full px-2 flex flex-col items-center justify-center whitespace-nowrap overflow-hidden [container-type:inline-size]"
    >
      <motion.h1 
        variants={{
          hidden: { opacity: 0, y: 30 },
          show: { opacity: 1, y: 0, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
        }}
        className="font-display-hero text-[18cqw] md:text-[60px] lg:text-[70px] xl:text-[80px] tracking-tighter leading-none text-white mb-[2cqw] md:mb-5 select-none"
      >
        SHOMICOR
      </motion.h1>
      
      <motion.div 
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          show: { scaleX: 1, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
        }}
        className="w-[12cqw] md:w-10 lg:w-12 h-[1px] bg-antique-champagne mb-[2cqw] md:mb-5 flex-shrink-0 origin-center"
      ></motion.div>
      
      <motion.p 
        variants={{
          hidden: { opacity: 0, y: 15, letterSpacing: "0.05em" },
          show: { opacity: 1, y: 0, letterSpacing: "0.15em", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
        }}
        className="font-body-lg text-white/60 uppercase text-[2.8cqw] md:text-[11px] lg:text-xs mb-[4cqw] md:mb-6 flex-shrink-0"
      >
        Curated Craftsmanship
      </motion.p>
      
      <motion.a 
        variants={{
          hidden: { opacity: 0, y: 15 },
          show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
        }}
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        href="#collections" 
        title="Explore Shomicor curated jewelry collections"
        className="relative inline-block border border-white/20 text-white font-label-caps tracking-[0.15em] text-[2.8cqw] md:text-[10px] lg:text-xs uppercase px-[4cqw] py-[1.5cqw] md:px-4 md:py-2.5 bg-transparent flex-shrink-0 overflow-hidden group/btn"
      >
        {/* Sliding background color layer for premium interaction */}
        <motion.span 
          variants={{
            hover: { y: "0%" }
          }}
          initial={{ y: "101%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-white z-0"
        />
        
        {/* Text Layer that stays crisp and changes color seamlessly */}
        <motion.span 
          variants={{
            hover: { color: "#000000" }
          }}
          initial={{ color: "#ffffff" }}
          transition={{ duration: 0.3 }}
          className="relative z-10 block"
        >
          Explore our collections
        </motion.span>
      </motion.a>
      
    </motion.div>
  </div>

  {/* Right Box - Static 1/3 Width */}
  <div className="relative w-1/3 h-full overflow-hidden border-l border-white/5 bg-surface-container-low z-10">
    <motion.div 
      initial={{ scale: 1.15, opacity: 0 }}
      animate={{ 
        scale: [1.08, 1.03, 1.08],
        opacity: 0.3
      }}
      transition={{ 
        scale: { repeat: Infinity, duration: 24, ease: "easeInOut", delay: 2 },
        opacity: { duration: 1.8, ease: "easeOut" }
      }}
      whileHover={{ 
        scale: 1.05, 
        opacity: 0.6, 
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="w-full h-full"
    >
      <Image 
        src="/moody_dark_portrait_of_a_model_wearing_premium_sculptural_jewelry._sharp_side.png" 
        alt="Moody dark portrait of a model wearing premium sculptural jewelry from Shomicor" 
        fill
        sizes="33vw"
        priority
        className="object-cover" 
      />
    </motion.div>
  </div>

</motion.section>



{/* Main categories Bar */}
<motion.div 
  initial={{ y: -20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
  className="w-full bg-matte-charcoal border-y border-white/10 sticky top-0 z-50 backdrop-blur-md bg-matte-charcoal/95"
>
  
  {/* MAIN CATEGORIES CONTAINER */}
  <motion.div 
    initial="hidden"
    animate="show"
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
      }
    }}
    className="px-4 md:px-12 py-3 md:py-5 flex justify-center items-center gap-6 sm:gap-12 md:gap-16 overflow-x-auto md:overflow-x-visible scrollbar-none whitespace-nowrap md:whitespace-normal md:flex-wrap"
  >
    
    {/* Category 1: Silver Jewelry */}
    <motion.button 
      variants={{
        hidden: { opacity: 0, y: -12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
      }}
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      onClick={() => scrollToSection('silver-jewelry')}
      className="flex flex-col items-center gap-2.5 group outline-none select-none cursor-pointer flex-shrink-0"
    >
      <motion.div 
        variants={{
          hover: { 
            scale: 1.06, 
            borderColor: "rgba(230,187,119,1)",
            boxShadow: "0 0 15px rgba(230,187,119,0.2)"
          }
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-white/10 bg-black/40 flex-shrink-0"
      >
        <motion.div
          variants={{
            hover: { scale: 1.08 }
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full relative"
        >
          <Image 
            src="/silver_jewelry_pic.png" 
            alt="Premium Silver Jewelry Collection by Shomicore" 
            fill 
            priority
            sizes="(max-width: 768px) 40px, 64px"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      
      <div className="flex flex-col items-center relative overflow-hidden pb-1">
        <motion.span 
          variants={{
            hover: { y: -1, color: "rgba(230,187,119,1)" }
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="font-nav-link text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.25em] uppercase text-white block select-none"
        >
          SILVER JEWELRY
        </motion.span>
        <motion.div 
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            hover: { scaleX: 1, opacity: 1 }
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-antique-champagne origin-center"
        />
      </div>
    </motion.button>

    {/* Category 2: Artificial Pieces */}
    <motion.button 
      variants={{
        hidden: { opacity: 0, y: -12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
      }}
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      onClick={() => scrollToSection('artificial-jewelry')}
      className="flex flex-col items-center gap-2.5 group outline-none select-none cursor-pointer flex-shrink-0"
    >
      <motion.div 
        variants={{
          hover: { 
            scale: 1.06, 
            borderColor: "rgba(230,187,119,1)",
            boxShadow: "0 0 15px rgba(230,187,119,0.2)"
          }
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-white/10 bg-black/40 flex-shrink-0"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0.6, scale: 1 },
            hover: { opacity: 1, scale: 1.08 }
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full relative"
        >
          <Image 
            src="/artificial_jewelry.png" 
            alt="Luxury Artificial Pieces Collection by Shomicore" 
            fill 
            priority 
            sizes="(max-width: 768px) 40px, 64px"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      
      <div className="flex flex-col items-center relative overflow-hidden pb-1">
        <motion.span 
          variants={{
            hidden: { color: "rgba(255,255,255,0.4)" },
            hover: { y: -1, color: "rgba(230,187,119,1)" }
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="font-nav-link text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.25em] uppercase block select-none"
        >
          ARTIFICIAL PIECES
        </motion.span>
        <motion.div 
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            hover: { scaleX: 1, opacity: 1 }
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-antique-champagne origin-center"
        />
      </div>
    </motion.button>

    {/* Category 3: Leather Goods */}
    <motion.button 
      variants={{
        hidden: { opacity: 0, y: -12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
      }}
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      onClick={() => scrollToSection('leather-products')}
      className="flex flex-col items-center gap-2.5 group outline-none select-none cursor-pointer flex-shrink-0"
    >
      <motion.div 
        variants={{
          hover: { 
            scale: 1.06, 
            borderColor: "rgba(230,187,119,1)",
            boxShadow: "0 0 15px rgba(230,187,119,0.2)"
          }
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-white/10 bg-black/40 flex-shrink-0"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0.6, scale: 1 },
            hover: { opacity: 1, scale: 1.08 }
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full relative"
        >
          <Image 
            src="/high_contrast_black_and_white_lifestyle_fashion_photography._close_up_of_a.png" 
            alt="Handcrafted Luxury Leather Goods by Shomicore" 
            fill 
            priority 
            sizes="(max-width: 768px) 40px, 64px"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      
      <div className="flex flex-col items-center relative overflow-hidden pb-1">
        <motion.span 
          variants={{
            hidden: { color: "rgba(255,255,255,0.4)" },
            hover: { y: -1, color: "rgba(230,187,119,1)" }
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="font-nav-link text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.25em] uppercase block select-none"
        >
          LEATHER GOODS
        </motion.span>
        <motion.div 
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            hover: { scaleX: 1, opacity: 1 }
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-antique-champagne origin-center"
        />
      </div>
    </motion.button>

  </motion.div>

  <style jsx global>{`
    .scrollbar-none::-webkit-scrollbar { display: none; }
    .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
</motion.div>




{/* ALL DYNAMIC CATEGORIES PRODUCT SHOWCASE SECTION */}
<main className="px-0 sm:px-3 md:px-12 py-6 md:py-16 bg-black flex flex-col gap-12 md:gap-20">


  {/* SECTION 1: ARTIFICIAL JEWELRY CONTAINER*/}
  <section id="artificial-jewelry" className="w-full max-w-7xl mx-auto flex flex-col gap-4">
<motion.div 
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-10% 0px" }}
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }}
  className="flex flex-col items-center text-center mb-6 md:mb-8 px-4 select-none"
>
  <motion.h2 
    variants={{
      hidden: { opacity: 0, y: 15 },
      show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
    }}
    className="font-label-caps text-white text-sm md:text-base lg:text-lg tracking-[0.35em] uppercase font-semibold"
  >
    Artificial Jewelry
  </motion.h2>
  
  <motion.div 
    variants={{
      hidden: { scaleX: 0, opacity: 0 },
      show: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
    }}
    className="w-10 md:w-14 h-[1px] bg-antique-champagne mt-2.5 origin-center"
  ></motion.div>
</motion.div>

  
{/* Dynamic Sub-Category Artificial Jewelry Navigation */}
<motion.div 
  initial={{ opacity: 0, y: 15 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-5% 0px" }}
  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
  className="w-full bg-gradient-to-b from-black/60 to-black/20 backdrop-blur-md border-y border-white/[0.06] mb-10 py-8 relative"
>
  
  {/* Smooth horizontal scrolling track with robust spacing layout constraints */}
  <div className="px-4 md:px-12 flex items-center gap-4 sm:gap-6 overflow-x-auto md:overflow-x-visible scrollbar-none whitespace-nowrap md:whitespace-normal snap-x snap-mandatory md:flex-wrap md:justify-center">
    
    {/* SUB CATEGORY LIST MAP */}
    {subCategories
      .filter(sub => sub.parent_category === 'Artificial jewelry')
      .map((sub) => {
        const isActive = activeArtificialSub === sub.id;
        
        return (
          <motion.button
            key={sub.id}
            onClick={() => setActiveArtificialSub(sub.id)}
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            className="snap-center flex flex-col items-center gap-3.5 text-center group outline-none select-none min-w-[140px] sm:min-w-[160px] md:min-w-[180px] cursor-pointer"
          >
            {/* INCREASED IMAGE BOX FRAME: Expanded surface space with consistent luxury geometry scale */}
            <motion.div 
              animate={{
                borderColor: isActive ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.08)",
                boxShadow: isActive ? "0 0 20px rgba(230,187,119,0.15)" : "0 0 0px rgba(0,0,0,0)"
              }}
              variants={{
                hover: {
                  borderColor: isActive ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.3)"
                }
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 border overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#121212] flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.05 : 1
                }}
                variants={{
                  hover: {
                    scale: isActive ? 1.05 : 1.1
                  }
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full h-full relative p-2.5"
              >
                <Image
                  src={sub.image_url || "/placeholder-circle.jpg"}
                  alt={`${sub.name} Collection`}
                  fill
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
                  className="object-contain p-2.5 mix-blend-screen"
                />
              </motion.div>
              
              <motion.div 
                animate={{
                  borderColor: isActive ? "rgba(230,187,119,0.2)" : "rgba(255,255,255,0.02)"
                }}
                className="absolute inset-1.5 border pointer-events-none" 
              />
            </motion.div>
            
            {/* HIGH CONTRAST TYPOGRAPHY COLOR OVERHAUL */}
            <div className="flex flex-col items-center gap-1.5 max-w-[130px] sm:max-w-[150px] md:max-w-[170px]">
              <motion.span 
                animate={{
                  color: isActive ? "rgba(230,187,119,1)" : "rgba(255,255,255,1)"
                }}
                variants={{
                  hover: {
                    color: "rgba(230,187,119,1)"
                  }
                }}
                transition={{ duration: 0.3 }}
                className="font-nav-link text-[11px] sm:text-xs md:text-[13px] tracking-[0.18em] uppercase whitespace-normal break-words leading-relaxed font-medium block"
              >
                {sub.name}
              </motion.span>
              
              {/* Sleek structural bottom track indicator */}
              <motion.div 
                animate={{
                  width: isActive ? "32px" : "0px"
                }}
                variants={{
                  hover: {
                    width: isActive ? "32px" : "16px"
                  }
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-[1px] bg-antique-champagne origin-center" 
              />
            </div>
          </motion.button>
        );
      })}
  </div>
</motion.div>


{/* Artificial jewelry products */}
<motion.div 
  layout
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-5% 0px" }}
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }}
  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16 w-full bg-transparent"
>
  {products
    .filter(p => p.parent_category === 'Artificial jewelry' && (activeArtificialSub === 'ALL' || p.sub_category_id === activeArtificialSub))
    .slice(0, 12)
    .map((product) => (
      <Link 
        href={`/products/${product.slug}`}
        key={product.id} 
        className="block w-full h-full"
      >
        <motion.div
          layout
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          whileHover="hover"
          className="group flex flex-col cursor-pointer w-full h-full justify-between select-none"
        >
          {/* Container wrapping content to align metadata perfectly with the bottom elements */}
          <div className="flex flex-col w-full">
            
            {/* SHARP LOOKBOOK CANVAS CONTAINER - FORCED ASPECT SQUARE */}
            <motion.div 
              variants={{
                hover: { 
                  borderColor: "rgba(230,187,119,0.2)",
                  boxShadow: "0 10px 30px -15px rgba(0,0,0,0.7)"
                }
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#090909] to-[#121212] border border-white/[0.03] w-full mb-4 flex items-center justify-center p-4"
            >
              <motion.div
                variants={{
                  hover: { scale: 1.04 }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative"
              >
                <Image 
                  src={product.images?.[0] || "/product-placeholder.png"} 
                  alt={`${product.name} - Handcrafted Premium Archive by Shomicor`} 
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority 
                  quality={95}
                  className="object-contain p-2 mix-blend-screen" 
                />
              </motion.div>
              
              {/* AMBIENT EXHIBITION BACKLIGHT */}
              <motion.div 
                variants={{
                  hover: { opacity: 1.5 }
                }}
                initial={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_75%)] pointer-events-none" 
              />
              
              {/* SIGNATURE BRAND ASSET ALIGNMENT DOT */}
              <motion.div 
                variants={{
                  hover: { scale: 1.15 }
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute top-3 right-3 md:top-4 md:right-4 h-1.5 w-1.5 rounded-full bg-antique-champagne z-10 shadow-[0_0_8px_rgba(230,187,119,0.5)]" 
              />
              
              {/* ACTION QUICK VIEW REVEAL LAYER */}
              <motion.div 
                variants={{
                  hover: { opacity: 1, backdropFilter: "blur(2px)" }
                }}
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-black/60 hidden md:flex items-center justify-center z-10"
              >
                <motion.span 
                  variants={{
                    hover: { y: 0 }
                  }}
                  initial={{ y: 8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white text-black font-nav-link px-6 py-3 text-[10px] uppercase tracking-[0.25em] font-medium text-center select-none shadow-2xl border border-white block"
                >
                  View Archive
                </motion.span>
              </motion.div>
            </motion.div>

            {/* DYNAMIC TITLE WITH PROGRESSIVE SEPARATOR - ZERO TEXT TRUNCATION */}
            <div className="flex flex-col gap-2 w-full text-left px-1">
              <motion.h3 
                variants={{
                  hover: { color: "rgba(230,187,119,1)" }
                }}
                transition={{ duration: 0.3 }}
                className="font-label-caps text-[11px] md:text-[12px] uppercase tracking-[0.12em] text-white/90 font-bold leading-snug break-words whitespace-normal block w-full hyphens-auto" 
                title={product.name}
              >
                {product.name}
              </motion.h3>
              
              {/* DYNAMIC PROGRESSIVE SEPARATOR */}
              <div className="relative w-full h-[1px] bg-white/[0.06] overflow-hidden my-0.5">
                <motion.div 
                  variants={{
                    hover: { left: "0%", width: "100%" }
                  }}
                  initial={{ left: "50%", width: "0%" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 h-full bg-gradient-to-r from-transparent via-antique-champagne/40 to-transparent" 
                />
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
            <motion.p 
              variants={{
                hover: { 
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(230,187,119,0.3)"
                }
              }}
              transition={{ duration: 0.4 }}
              className="font-body-lg text-[11px] md:text-[13px] text-antique-champagne font-semibold tracking-wider whitespace-nowrap bg-white/[0.02] px-2 py-1 border border-white/[0.08] shrink-0"
            >
              €{parseFloat(product.price).toFixed(2)}
            </motion.p>
            
          </div>
        </motion.div>
      </Link>
    ))}
</motion.div>






  </section>


  {/* SECTION 2: SILVER JEWELRY CONTAINER*/}
 
  <section id="silver-jewelry" className="w-full max-w-7xl mx-auto flex flex-col gap-4">
<motion.div 
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-10% 0px" }}
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }}
  className="flex flex-col items-center text-center mb-6 md:mb-8 px-4 select-none"
>
  <motion.h2 
    variants={{
      hidden: { opacity: 0, y: 15 },
      show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
    }}
    className="font-label-caps text-white text-sm md:text-base lg:text-lg tracking-[0.35em] uppercase font-semibold"
  >
    Silver Jewelry
  </motion.h2>
  
  <motion.div 
    variants={{
      hidden: { scaleX: 0, opacity: 0 },
      show: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
    }}
    className="w-10 md:w-14 h-[1px] bg-antique-champagne mt-2.5 origin-center"
  ></motion.div>
</motion.div>



<div className="w-full bg-gradient-to-b from-black/60 to-black/20 backdrop-blur-md border-y border-white/[0.06] mb-10 py-8 relative">
  

<motion.div 
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-5% 0px" }}
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  }}
  className="px-4 md:px-12 flex items-center gap-4 sm:gap-6 overflow-x-auto md:overflow-x-visible scrollbar-none whitespace-nowrap md:whitespace-normal snap-x snap-mandatory md:flex-wrap md:justify-center"
>

  {/* SUB CATEGORY LIST MAP */}
  {subCategories
    .filter(sub => sub.parent_category === 'Silver Jewelry')
    .map((sub) => {
      const isActive = activeSilverSub === sub.id;
      
      return (
        <motion.button
          key={sub.id}
          onClick={() => setActiveSilverSub(sub.id)}
          variants={{
            hidden: { opacity: 0, y: 15 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          whileHover="hover"
          whileTap={{ scale: 0.96 }}
          className="snap-center flex flex-col items-center gap-3.5 text-center group outline-none select-none min-w-[140px] sm:min-w-[160px] md:min-w-[180px] cursor-pointer flex-shrink-0 relative focus-visible:ring-1 focus-visible:ring-antique-champagne/50"
        >
          {/* INCREASED IMAGE BOX FRAME: Scaled up with custom dynamic luxury effects */}
          <motion.div 
            animate={{
              borderColor: isActive ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.08)",
              boxShadow: isActive ? "0 0 25px rgba(230,187,119,0.2)" : "0 0 0px rgba(0,0,0,0)",
              backgroundColor: isActive ? "rgba(10,10,10,1)" : "rgba(18,18,18,0.5)"
            }}
            variants={{
              hover: {
                borderColor: isActive ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.35)",
                boxShadow: isActive ? "0 0 30px rgba(230,187,119,0.25)" : "0 8px 20px rgba(0,0,0,0.4)"
              }
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 border overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#121212] flex items-center justify-center rounded-none"
          >
            {/* INNER IMAGE ZOOM CONTAINER */}
            <motion.div
              animate={{
                scale: isActive ? 1.04 : 1,
                filter: isActive ? "brightness(1.05)" : "brightness(0.9)"
              }}
              variants={{
                hover: {
                  scale: isActive ? 1.06 : 1.1,
                  filter: "brightness(1.1)"
                }
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative"
            >
              <Image
                src={sub.image_url || "/assets/placeholder-circle.jpg"}
                alt={`${sub.name} Collection`}
                fill
                sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
                className="object-contain p-3 mix-blend-screen"
              />
            </motion.div>
            
            {/* ACCENT LINING GEOMETRY OVERLAY */}
            <motion.div 
              animate={{
                borderColor: isActive ? "rgba(230,187,119,0.25)" : "rgba(255,255,255,0.02)",
                opacity: isActive ? 1 : 0.5
              }}
              variants={{
                hover: { opacity: 1, borderColor: isActive ? "rgba(230,187,119,0.4)" : "rgba(255,255,255,0.1)" }
              }}
              transition={{ duration: 0.4 }}
              className="absolute inset-1.5 border pointer-events-none" 
            />
          </motion.div>
          
          {/* CLEAN HIGH CONTRAST TYPOGRAPHY COLOR OVERHAUL */}
          <div className="flex flex-col items-center gap-2 max-w-[130px] sm:max-w-[150px] md:max-w-[170px] w-full">
            <motion.span 
              animate={{
                color: isActive ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.8)",
                y: isActive ? -1 : 0
              }}
              variants={{
                hover: {
                  color: "rgba(230,187,119,1)",
                  y: -2
                }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="font-nav-link text-[11px] sm:text-xs md:text-[13px] tracking-[0.18em] uppercase whitespace-normal break-words leading-relaxed font-medium block select-none"
            >
              {sub.name}
            </motion.span>
            
            {/* Elegant horizontal tracking line indicator */}
            <div className="relative w-12 h-[1px] bg-white/[0.04] overflow-hidden mt-0.5">
              <motion.div 
                animate={{
                  width: isActive ? "100%" : "0%",
                  left: isActive ? "0%" : "50%"
                }}
                variants={{
                  hover: {
                    width: "100%",
                    left: "0%"
                  }
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 h-full bg-antique-champagne" 
              />
            </div>
          </div>
        </motion.button>
      );
    })}
</motion.div>

</div>






{/* Dynamic products of silver jewelry */}
<motion.div 
  layout
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-5% 0px" }}
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }}
  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16 w-full bg-transparent"
>
  {products
    .filter(p => p.parent_category === 'Silver Jewelry' && (activeSilverSub === 'ALL' || p.sub_category_id === activeSilverSub))
    .slice(0, 12)
    .map((product) => (
      <Link 
        href={`/products/${product.slug}`}
        key={product.id} 
        className="block w-full h-full"
      >
        <motion.div
          layout
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          whileHover="hover"
          className="group flex flex-col cursor-pointer w-full h-full justify-between select-none"
        >
          {/* Container wrapping content to align metadata perfectly with the bottom elements */}
          <div className="flex flex-col w-full">
            
            {/* PREMIUM IMAGE CANVAS */}
            <motion.div 
              variants={{
                hover: { 
                  borderColor: "rgba(230,187,119,0.3)",
                  boxShadow: "0 10px 30px -15px rgba(0,0,0,0.7)"
                }
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#121212] border border-white/[0.04] w-full mb-4 flex items-center justify-center p-4"
            >
              <motion.div
                variants={{
                  hover: { scale: 1.05 }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative"
              >
                <Image 
                  src={product.images?.[0] || "/product-placeholder.png"} 
                  alt={`${product.name} - Handcrafted Premium Archive by Shomicor`} 
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority 
                  quality={95} 
                  className="object-contain p-2 mix-blend-screen" 
                />
              </motion.div>
              
              {/* RADIAL GLOW BEHIND PRODUCT */}
              <motion.div 
                variants={{
                  hover: { opacity: 1.5 }
                }}
                initial={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" 
              />
              
              {/* THE BRAND PIN */}
              <motion.div 
                variants={{
                  hover: { scale: 1.25 }
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-antique-champagne z-10 shadow-[0_0_8px_rgba(230,187,119,0.6)]" 
              />
              
              {/* REFINED HOVER ACTION */}
              <motion.div 
                variants={{
                  hover: { opacity: 1, backdropFilter: "blur(2px)" }
                }}
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-black/60 hidden md:flex items-center justify-center z-10"
              >
                <motion.span 
                  variants={{
                    hover: { y: 0 }
                  }}
                  initial={{ y: 12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                  className="bg-white text-black font-nav-link px-6 py-3 text-[10px] uppercase tracking-[0.3em] font-medium text-center select-none shadow-2xl border border-white block"
                >
                  View Archive
                </motion.span>
              </motion.div>
            </motion.div>

            {/* DYNAMIC TITLE UNDERLINE EFFECT - ZERO TEXT TRUNCATION */}
            <div className="relative pt-0.5 pb-2 px-1 text-left w-full">
              <motion.h3 
                variants={{
                  hover: { color: "rgba(255,255,255,1)" }
                }}
                transition={{ duration: 0.3 }}
                className="font-label-caps text-[12px] md:text-[13px] uppercase tracking-[0.12em] text-white/90 font-bold leading-snug break-words whitespace-normal block w-full hyphens-auto" 
                title={product.name}
              >
                {product.name}
              </motion.h3>
              <div className="absolute bottom-0 left-1 right-1 h-[1px] bg-white/[0.06] overflow-hidden">
                <motion.div 
                  variants={{
                    hover: { left: "0%", width: "100%" }
                  }}
                  initial={{ left: "50%", width: "0%" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 h-full bg-gradient-to-r from-transparent via-antique-champagne/40 to-transparent" 
                />
              </div>
            </div>
            
          </div>

          {/* DETAILS SECTION - ANCHORED STABLY AT THE BOTTOM HORIZON BASELINE */}
          <div className="flex flex-col gap-1 w-full text-left px-1 mt-auto pt-2">
            <div className="flex justify-between items-center gap-3 w-full">
              <p className="font-body-lg text-[9px] md:text-[10px] text-white/40 tracking-[0.2em] uppercase font-medium break-words whitespace-normal leading-normal max-w-[60%]">
                Silver Jewelry
              </p>
              <motion.p 
                variants={{
                  hover: { 
                    x: -2,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(230,187,119,0.3)"
                  }
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="font-body-lg text-[12px] md:text-[13px] text-antique-champagne font-semibold tracking-wider whitespace-nowrap bg-white/[0.02] px-2 py-0.5 border border-white/[0.08] shrink-0"
              >
                €{parseFloat(product.price).toFixed(2)}
              </motion.p>
            </div>
          </div>

        </motion.div>
      </Link>
    ))}
</motion.div>






  </section>

  {/* SECTION 3: LEATHER PRODUCTS CONTAINER*/}
  <section id="leather-products" className="w-full max-w-7xl mx-auto flex flex-col gap-4">
 <motion.div 
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-10% 0px" }}
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }}
  className="flex flex-col items-center text-center mb-6 md:mb-8 px-4 select-none"
>
  <motion.h2 
    variants={{
      hidden: { opacity: 0, y: 15 },
      show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
    }}
    className="font-label-caps text-white text-sm md:text-base lg:text-lg tracking-[0.35em] uppercase font-semibold flex flex-wrap justify-center items-center gap-2"
  >
    <span>Leather Products</span>
    <motion.span 
      animate={{ 
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="text-[9px] md:text-[10px] tracking-[0.15em] text-antique-champagne/80 font-medium ml-1"
    >
      (COMING SOON)
    </motion.span>
  </motion.h2>
  
  <motion.div 
    variants={{
      hidden: { scaleX: 0, opacity: 0 },
      show: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
    }}
    className="w-10 md:w-14 h-[1px] bg-antique-champagne mt-2.5 origin-center"
  ></motion.div>
</motion.div>

{/* Dynamic Sub-Category Leather Products Navigation */}
<div className="w-full bg-gradient-to-b from-black/60 to-black/20 backdrop-blur-md border-y border-white/[0.06] mb-10 py-8 relative">
  
  {/* Sub-Category Navigation Leather Products */}
<motion.div 
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-5% 0px" }}
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  }}
  className="px-4 md:px-12 flex items-center gap-4 sm:gap-6 overflow-x-auto md:overflow-x-visible scrollbar-none whitespace-nowrap md:whitespace-normal snap-x snap-mandatory md:flex-wrap md:justify-center"
>

  {/* SUB CATEGORY LIST MAP */}
  {subCategories
    .filter(sub => sub.parent_category === 'Leather Products')
    .map((sub) => {
      const isActive = activeLeatherSub === sub.id;
      
      return (
        <motion.button
          key={sub.id}
          onClick={() => setActiveLeatherSub(sub.id)}
          variants={{
            hidden: { opacity: 0, y: 15 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          whileHover="hover"
          whileTap={{ scale: 0.96 }}
          className="snap-center flex flex-col items-center gap-3.5 text-center group outline-none select-none min-w-[140px] sm:min-w-[160px] md:min-w-[180px] cursor-pointer flex-shrink-0"
        >
          {/* LARGER IMAGE BOX FRAME: Expanded proportions to highlight organic product textures */}
          <motion.div 
            animate={{
              borderColor: isActive ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.08)",
              boxShadow: isActive ? "0 0 20px rgba(230,187,119,0.15)" : "0 0 0px rgba(0,0,0,0)"
            }}
            variants={{
              hover: {
                borderColor: isActive ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.35)"
              }
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 border overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#121212] flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: isActive ? 1.05 : 1
              }}
              variants={{
                hover: {
                  scale: isActive ? 1.05 : 1.1
                }
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative"
            >
              <Image
                src={sub.image_url || "/placeholder-circle.jpg"}
                alt={`${sub.name} Collection`}
                fill
                sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
                className="object-contain p-2.5 mix-blend-screen"
              />
            </motion.div>
            
            <motion.div 
              animate={{
                borderColor: isActive ? "rgba(230,187,119,0.2)" : "rgba(255,255,255,0.02)"
              }}
              className="absolute inset-1.5 border pointer-events-none" 
            />
          </motion.div>
          
          {/* HIGH CONTRAST TYPOGRAPHY COLOR OVERHAUL */}
          <div className="flex flex-col items-center gap-2 max-w-[130px] sm:max-w-[150px] md:max-w-[170px] w-full">
            <motion.span 
              animate={{
                color: isActive ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.8)"
              }}
              variants={{
                hover: {
                  color: "rgba(230,187,119,1)",
                  y: -1
                }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="font-nav-link text-[11px] sm:text-xs md:text-[13px] tracking-[0.18em] uppercase whitespace-normal break-words leading-relaxed font-medium block select-none"
            >
              {sub.name}
            </motion.span>
            
            {/* Sleek structural underline active track */}
            <div className="relative w-12 h-[1px] bg-white/[0.04] overflow-hidden mt-0.5">
              <motion.div 
                animate={{
                  width: isActive ? "100%" : "0%",
                  left: isActive ? "0%" : "50%"
                }}
                variants={{
                  hover: {
                    width: "100%",
                    left: "0%"
                  }
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 h-full bg-antique-champagne" 
              />
            </div>
          </div>
        </motion.button>
      );
    })}
</motion.div>

</div>

{/* Dynamic Sub-Category Leather Products - Unbounded Text Layout */}
<motion.div 
  layout
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-5% 0px" }}
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }}
  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16 w-full bg-transparent"
>
  {products
    .filter(p => p.parent_category === 'Leather Products' && (activeLeatherSub === 'ALL' || p.sub_category_id === activeLeatherSub))
    .map((product) => (
      <Link 
        href={`/products/${product.slug}`}
        key={product.id} 
        className="block w-full h-full"
      >
        <motion.div
          layout
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          whileHover="hover"
          className="group flex flex-col cursor-pointer w-full h-full justify-between select-none"
        >
          {/* Container wrapping content to align everything nicely with the bottom elements */}
          <div className="flex flex-col w-full">
            
            {/* PREMIUM IMAGE CANVAS */}
            <motion.div 
              variants={{
                hover: { 
                  borderColor: "rgba(230,187,119,0.2)",
                  boxShadow: "0 10px 30px -15px rgba(0,0,0,0.7)"
                }
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#121212] border border-white/[0.03] w-full mb-4 flex items-center justify-center p-4"
            >
              <motion.div
                variants={{
                  hover: { scale: 1.04 }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative"
              >
                <Image 
                  src={product.images?.[0] || "/product-placeholder.png"} 
                  alt={`${product.name} - Handcrafted Premium Archive by Shomicor`} 
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                  quality={95}
                  className="object-contain p-2 mix-blend-screen" 
                />
              </motion.div>

              {/* Ambient Backlight Spotlight Effect */}
              <motion.div 
                variants={{
                  hover: { opacity: 1.5 }
                }}
                initial={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_75%)] pointer-events-none" 
              />

              {/* Premium Visual Accent Dot */}
              <motion.div 
                variants={{
                  hover: { scale: 1.15 }
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute top-3 right-3 md:top-4 md:right-4 h-1.5 w-1.5 rounded-full bg-antique-champagne z-10 shadow-[0_0_8px_rgba(230,187,119,0.5)]" 
              />
              
              {/* Action Hover Slide Reveal Layer */}
              <motion.div 
                variants={{
                  hover: { opacity: 1, backdropFilter: "blur(2px)" }
                }}
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-black/40 hidden md:flex items-center justify-center z-10"
              >
                <motion.span 
                  variants={{
                    hover: { y: 0 }
                  }}
                  initial={{ y: 8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white text-black font-nav-link px-6 py-3 text-[10px] uppercase tracking-[0.25em] font-medium text-center select-none border border-white block shadow-2xl"
                >
                  View Archive
                </motion.span>
              </motion.div>
            </motion.div>

            <div className="flex flex-col gap-2 w-full text-left px-1">
              <motion.h3 
                variants={{
                  hover: { color: "rgba(230,187,119,1)" }
                }}
                transition={{ duration: 0.3 }}
                className="font-label-caps text-[11px] md:text-[12px] uppercase tracking-[0.12em] text-white/95 font-bold leading-snug break-words whitespace-normal block w-full hyphens-auto" 
                title={product.name}
              >
                {product.name}
              </motion.h3>
              
              <div className="relative w-full h-[1px] bg-white/[0.06] overflow-hidden my-0.5">
                <motion.div 
                  variants={{
                    hover: { left: "0%", width: "100%" }
                  }}
                  initial={{ left: "50%", width: "0%" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 h-full bg-gradient-to-r from-transparent via-antique-champagne/40 to-transparent" 
                />
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
            <motion.p 
              variants={{
                hover: { 
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(230,187,119,0.3)"
                }
              }}
              transition={{ duration: 0.4 }}
              className="font-body-lg text-[11px] md:text-[13px] text-antique-champagne font-semibold tracking-wider whitespace-nowrap bg-white/[0.02] px-2 py-0.5 border border-white/[0.08] shrink-0"
            >
              €{parseFloat(product.price).toFixed(2)}
            </motion.p>
            
          </div>
        </motion.div>
      </Link>
    ))}
</motion.div>





  </section>
</main>






    </div>
  );
}
