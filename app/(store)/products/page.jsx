


"use client";
import Image from "next/image";
import { useEffect, useState, use, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion";

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
<motion.div 
  initial="hidden"
  animate="show"
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  }}
  className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4 mb-4 md:mb-16 select-none"
>
  <motion.h1 
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
      }
    }}
    className="font-display-hero text-[10vw] sm:text-5xl md:text-[80px] leading-none tracking-tighter uppercase text-white"
  >
    The Archive
  </motion.h1>
  
  <motion.span 
    variants={{
      hidden: { opacity: 0, y: 10 },
      show: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
      }
    }}
    className="font-label-caps text-[9px] sm:text-[10px] tracking-[0.25em] text-antique-champagne whitespace-nowrap"
  >
    EST. 2026
  </motion.span>
</motion.div>


{/* Interactive Grid Cards Wrapper */}
<motion.div 
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-5% 0px" }}
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }}
  className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 h-[22vh] md:h-[45vh] min-h-[160px] md:min-h-[320px] max-h-[480px] w-full [container-type:inline-size] items-start pt-1 select-none"
>
  
  {/* Card 1: Silver Jewelry */}
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 25 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    }}
    whileHover="hover"
    whileTap={{ scale: 0.98 }}
    onClick={() => setSelectedCategory(selectedCategory === 'Silver Jewelry' ? '' : 'Silver Jewelry')}
    className="w-full h-[95%] relative z-10"
  >
    <motion.div
      animate={{
        borderColor: selectedCategory === 'Silver Jewelry' ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.05)",
        boxShadow: selectedCategory === 'Silver Jewelry' ? "0 10px 30px -10px rgba(230,187,119,0.15)" : "0 0 0px rgba(0,0,0,0)",
        backgroundColor: selectedCategory === 'Silver Jewelry' ? "rgba(0,0,0,0.6)" : "rgba(18,18,18,0.2)"
      }}
      variants={{
        hover: { 
          borderColor: selectedCategory === 'Silver Jewelry' ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.2)",
          y: -4 
        }
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full relative border overflow-hidden cursor-pointer bg-surface-container-low"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-20" />
      
      <motion.div 
        animate={{
          opacity: selectedCategory === 'Silver Jewelry' ? 0.8 : 0.4
        }}
        variants={{
          hover: { opacity: 0.7, scale: 1.04 }
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full z-10"
      >
        <Image 
          src="/silver_jewelry_pic.png" 
          alt="Premium pure silver jewelry collection catalog archive" 
          fill
          sizes="33vw"
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Text Details horizon */}
      <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-30 pointer-events-none flex flex-col items-start">
        <motion.h2 
          animate={{
            color: selectedCategory === 'Silver Jewelry' ? "rgba(230,187,119,1)" : "rgba(255,255,255,1)"
          }}
          className="font-headline-md font-bold leading-none mb-1 tracking-wide mobile-title-clamp md:text-[24px] lg:text-[28px]"
        >
          SILVER
        </motion.h2>
        <p className="font-label-caps tracking-[0.1em] text-white/50 uppercase truncate w-full mobile-sub-clamp md:text-[10px]">
          Forged &amp; Sculpted
        </p>
      </div>

      <div className="absolute top-4 right-4 z-30 hidden sm:block pointer-events-none">
        <motion.span 
          animate={{
            color: selectedCategory === 'Silver Jewelry' ? "rgba(230,187,119,0.2)" : "rgba(255,255,255,0.05)"
          }}
          className="font-display-hero text-2xl uppercase tracking-[0.2em]"
        >
          01
        </motion.span>
      </div>
    </motion.div>
  </motion.div>

  {/* Card 2: Artificial Jewelry */}
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 25 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    }}
    whileHover="hover"
    whileTap={{ scale: 0.98 }}
    onClick={() => setSelectedCategory(selectedCategory === 'Artificial jewelry' ? '' : 'Artificial jewelry')}
    className="w-full h-[95%] self-end relative z-10"
  >
    <motion.div
      animate={{
        borderColor: selectedCategory === 'Artificial jewelry' ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.05)",
        boxShadow: selectedCategory === 'Artificial jewelry' ? "0 10px 30px -10px rgba(230,187,119,0.15)" : "0 0 0px rgba(0,0,0,0)",
        backgroundColor: selectedCategory === 'Artificial jewelry' ? "rgba(0,0,0,0.6)" : "rgba(18,18,18,0.2)"
      }}
      variants={{
        hover: { 
          borderColor: selectedCategory === 'Artificial jewelry' ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.2)",
          y: 4 
        }
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full relative border overflow-hidden cursor-pointer bg-surface-container-low"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-20" />
      
      <motion.div 
        animate={{
          opacity: selectedCategory === 'Artificial jewelry' ? 0.8 : 0.4
        }}
        variants={{
          hover: { opacity: 0.7, scale: 1.04 }
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full z-10"
      >
        <Image 
          src="/moody_dark_portrait_of_a_model_wearing_premium_sculptural_jewelry._sharp_side.png" 
          alt="Avant-Garde artificial fashion jewelry selection archive" 
          fill
          sizes="33vw"
          priority
          className="object-cover"
        />
      </motion.div>

      <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-30 pointer-events-none flex flex-col items-start">
        <motion.h2 
          animate={{
            color: selectedCategory === 'Artificial jewelry' ? "rgba(230,187,119,1)" : "rgba(255,255,255,1)"
          }}
          className="font-headline-md font-bold leading-none mb-1 tracking-wide mobile-title-clamp md:text-[24px] lg:text-[28px]"
        >
          ARTIFICIAL
        </motion.h2>
        <p className="font-label-caps tracking-[0.1em] text-white/50 uppercase truncate w-full mobile-sub-clamp md:text-[10px]">
          Avant-Garde Style
        </p>
      </div>
      
      <div className="absolute top-4 right-4 z-30 hidden sm:block pointer-events-none">
        <motion.span 
          animate={{
            color: selectedCategory === 'Artificial jewelry' ? "rgba(230,187,119,0.2)" : "rgba(255,255,255,0.05)"
          }}
          className="font-display-hero text-2xl uppercase tracking-[0.2em]"
        >
          02
        </motion.span>
      </div>
    </motion.div>
  </motion.div>

  {/* Card 3: Leather Goods */}
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 25 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    }}
    whileHover="hover"
    whileTap={{ scale: 0.98 }}
    onClick={() => setSelectedCategory(selectedCategory === 'Leather Products' ? '' : 'Leather Products')}
    className="w-full h-[95%] relative z-10"
  >
    <motion.div
      animate={{
        borderColor: selectedCategory === 'Leather Products' ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.05)",
        boxShadow: selectedCategory === 'Leather Products' ? "0 10px 30px -10px rgba(230,187,119,0.15)" : "0 0 0px rgba(0,0,0,0)",
        backgroundColor: selectedCategory === 'Leather Products' ? "rgba(0,0,0,0.6)" : "rgba(18,18,18,0.2)"
      }}
      variants={{
        hover: { 
          borderColor: selectedCategory === 'Leather Products' ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.2)",
          y: -4 
        }
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full relative border overflow-hidden cursor-pointer bg-surface-container-low"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-20" />
      
      <motion.div 
        animate={{
          opacity: selectedCategory === 'Leather Products' ? 0.8 : 0.4
        }}
        variants={{
          hover: { opacity: 0.7, scale: 1.04 }
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full z-10"
      >
        <Image 
          src="/high_contrast_black_and_white_lifestyle_fashion_photography._close_up_of_a.png" 
          alt="Hand-stitched essential luxury leather goods archive" 
          fill
          sizes="33vw"
          priority
          className="object-cover"
        />
      </motion.div>

      <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-30 pointer-events-none flex flex-col items-start">
        <motion.h2 
          animate={{
            color: selectedCategory === 'Leather Products' ? "rgba(230,187,119,1)" : "rgba(255,255,255,1)"
          }}
          className="font-headline-md font-bold leading-none mb-1 tracking-wide mobile-title-clamp md:text-[24px] lg:text-[28px]"
        >
          LEATHER
        </motion.h2>
        <p className="font-label-caps tracking-[0.1em] text-white/50 uppercase truncate w-full mobile-sub-clamp md:text-[10px]">
          Hand-Stitched
        </p>
      </div>

      <div className="absolute top-4 right-4 z-30 hidden sm:block pointer-events-none">
        <motion.span 
          animate={{
            color: selectedCategory === 'Leather Products' ? "rgba(230,187,119,0.2)" : "rgba(255,255,255,0.05)"
          }}
          className="font-display-hero text-2xl uppercase tracking-[0.2em]"
        >
          03
        </motion.span>
      </div>
    </motion.div>
  </motion.div>

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
</motion.div>


</header>





  {/* Floating Filter Bar */}
<motion.section 
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-y border-white/10 px-4 md:px-12 py-4 md:py-5"
>
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
    
    {/* Left Utility Actions: Dynamic Selection Feedback Toggles */}
    <div className="flex flex-wrap justify-center md:justify-start items-center gap-5 sm:gap-8 md:gap-10">
      
      {/* 1. Category Indicator (Material) */}
      <motion.div 
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedCategory('')} // Fast reset switch
        className="group cursor-pointer flex flex-col items-center md:items-start select-none outline-none"
        title="Click to reset material filter"
      >
        <motion.span 
          animate={{
            color: selectedCategory ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.4)"
          }}
          variants={{
            hover: { color: "rgba(255,255,255,1)" }
          }}
          transition={{ duration: 0.3 }}
          className="font-label-caps text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase"
        >
          MATERIAL: {selectedCategory ? selectedCategory.split(' ')[0] : 'ALL'}
        </motion.span>
        
        {/* Centered Expanding Tracking Line */}
        <div className="relative w-full h-[1px] mt-0.5 overflow-hidden">
          <motion.div 
            animate={{
              width: selectedCategory ? "100%" : "0%",
              left: selectedCategory ? "0%" : "50%"
            }}
            variants={{
              hover: { width: "100%", left: "0%" }
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 h-full bg-antique-champagne"
          />
        </div>
      </motion.div>
      
      {/* 2. Interactive Price Ordering Switch */}
      <motion.div 
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        onClick={() => setPriceOrder(priceOrder === 'ASC' ? 'DESC' : 'ASC')}
        className="group cursor-pointer flex flex-col items-center md:items-start select-none outline-none"
        title={priceOrder === 'ASC' ? "Switch to: Price High to Low" : "Switch to: Price Low to High"}
      >
        <span className="font-label-caps text-[10px] tracking-[0.2em] md:tracking-[0.25em] text-white/40 group-hover:text-white transition-colors duration-300 uppercase flex items-center gap-1">
          PRICE:
          <AnimatePresence mode="wait">
            <motion.span
              key={priceOrder}
              initial={{ opacity: 0, y: priceOrder === 'ASC' ? 4 : -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: priceOrder === 'ASC' ? -4 : 4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-antique-champagne font-bold flex items-center gap-0.5"
            >
              {priceOrder === 'ASC' ? 'LOW TO HIGH' : 'HIGH TO LOW'}
              <span className="font-mono text-[12px]">{priceOrder === 'ASC' ? '↑' : '↓'}</span>
            </motion.span>
          </AnimatePresence>
        </span>
        
        <div className="relative w-full h-[1px] mt-0.5 overflow-hidden">
          <motion.div 
            variants={{
              hover: { width: "100%", left: "0%" }
            }}
            initial={{ width: "0%", left: "50%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 h-full bg-antique-champagne"
          />
        </div>
      </motion.div>

      {/* 3. Sub-Category*/}
      <motion.div 
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedSubCategory('')} 
        className="group cursor-pointer flex flex-col items-center md:items-start select-none outline-none"
        title="Click to reset sub-collection"
      >
        <motion.span 
          animate={{
            color: selectedSubCategory ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.4)"
          }}
          variants={{
            hover: { color: "rgba(255,255,255,1)" }
          }}
          transition={{ duration: 0.3 }}
          className="font-label-caps text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase"
        >
          Sub Category: {
            selectedSubCategory 
              ? (subCategories.find(s => s.id === selectedSubCategory)?.name || 'ACTIVE') 
              : 'ALL Products'
          }
        </motion.span>
        
        <div className="relative w-full h-[1px] mt-0.5 overflow-hidden">
          <motion.div 
            animate={{
              width: selectedSubCategory ? "100%" : "0%",
              left: selectedSubCategory ? "0%" : "50%"
            }}
            variants={{
              hover: { width: "100%", left: "0%" }
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 h-full bg-antique-champagne"
          />
        </div>
      </motion.div>
      
      {/* 4. Reset All Active Filters Token */}
      <AnimatePresence>
        {(selectedCategory || selectedSubCategory || selectedSize || selectedColor) && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ backgroundColor: "rgba(239, 68, 68, 1)", color: "rgba(255, 255, 255, 1)", borderColor: "rgba(239, 68, 68, 1)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              setSelectedCategory('');
              setSelectedSubCategory('');
              setSelectedSize('');
              setSelectedColor('');
            }}
            className="font-label-caps text-[9px] tracking-[0.15em] border border-error/30 text-error px-2 py-0.5 uppercase cursor-pointer bg-transparent"
          >
            Clear Active Filters [X]
          </motion.button>
        )}
      </AnimatePresence>
    </div>

    {/* Right Utility Actions: Counters & Main Drawer Trigger Toggle */}
    <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-6 border-t border-white/5 md:border-none pt-3 md:pt-0">
      <span className="font-label-caps text-[9px] md:text-[10px] tracking-[0.2em] text-white/30 uppercase font-mono">
        {products.length} {products.length === 1 ? 'ITEM' : 'ITEMS'} IDENTIFIED
      </span>
      
      <motion.button 
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
        className="relative flex items-center gap-2.5 border font-nav-link text-[10px] md:text-[11px] tracking-[0.15em] uppercase px-4 py-2 md:px-5 md:py-2.5 select-none cursor-pointer bg-transparent overflow-hidden"
      >
        {/* Premium background transition block layer */}
        <motion.span 
          animate={{
            y: isFilterDrawerOpen ? "0%" : "101%",
            backgroundColor: isFilterDrawerOpen ? "rgba(230,187,119,1)" : "rgba(255,255,255,1)"
          }}
          variants={{
            hover: { y: "0%" }
          }}
          initial={{ y: "101%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        />
        
        {/* Synchronized Text Fills */}
        <motion.span
          animate={{
            color: isFilterDrawerOpen ? "#000000" : "#ffffff"
          }}
          variants={{
            hover: { color: "#000000" }
          }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {isFilterDrawerOpen ? 'Close Drawer' : 'Filter Drawer'}
        </motion.span>
        
        {/* Animated Toggle Vector Arrow */}
        <motion.svg 
          animate={{ 
            rotate: isFilterDrawerOpen ? 180 : 0,
            color: isFilterDrawerOpen ? "#000000" : "#ffffff"
          }}
          variants={{
            hover: { color: "#000000" }
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-3.5 h-3.5 relative z-10" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </motion.svg>
      </motion.button>
    </div>

  </div>
</motion.section>
 {/* Filter Drawer */}
<AnimatePresence>
  {isFilterDrawerOpen && (
    <motion.div 
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={{
        hidden: { height: 0, opacity: 0 },
        show: { 
          height: "auto", 
          opacity: 1,
          transition: { 
            height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.4, ease: "linear" },
            staggerChildren: 0.08,
            delayChildren: 0.05
          }
        }
      }}
      className="w-full bg-neutral-950 border-b border-white/10 overflow-hidden py-8 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 relative">
        
        {/* COLUMN 1: MATERIAL (CONNECTED DYNAMICALLY TO URL ROUTER) */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 15 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="flex flex-col gap-3"
        >
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
                  onClick={() => updateFilterInUrl('category', isSelected ? '' : cat)}
                  className={`font-nav-link text-[11px] tracking-[0.1em] text-left uppercase transition-colors bg-transparent border-none cursor-pointer focus:outline-none block w-fit ${
                    isSelected ? 'text-antique-champagne font-bold' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {cat === 'Artificial jewelry' ? 'Artificial Pieces' : cat === 'Leather Products' ? 'Leather Goods' : cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* COLUMN 2: SUB-COLLECTIONS (LIVE PARAMETER BUFFER) */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 15 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="flex flex-col gap-3"
        >
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
                    className={`font-nav-link text-[11px] tracking-[0.1em] text-left uppercase transition-colors truncate bg-transparent border-none cursor-pointer focus:outline-none block w-fit ${
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
        </motion.div>

        {/* COLUMN 3: CONTEXT AWARE MATRIX SIZES */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 15 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="flex flex-col gap-3"
        >
          <h3 className="font-label-caps text-[10px] tracking-[0.25em] text-antique-champagne uppercase font-bold border-b border-white/5 pb-2">
            Filter By Sizing
          </h3>
          <div className="flex flex-wrap gap-1.5 max-w-full">
            {selectedCategory === 'Silver Jewelry' ? (
              <>
                <span className="font-label-caps text-[8px] text-white/30 tracking-widest block w-full uppercase mb-1 select-none">US Standard Matrix:</span>
                {['5', '6', '7', '8', '9', '10', '11'].map(size => {
                  const isSelected = selectedSize === size;
                  return (
                    <motion.button
                      key={size}
                      type="button"
                      whileHover={{ borderColor: "rgba(255,255,255,0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateFilterInUrl('size', isSelected ? '' : size)}
                      className={`px-2.5 py-1 text-[10px] font-mono border transition-all cursor-pointer focus:outline-none ${
                        isSelected ? 'bg-antique-champagne text-black border-antique-champagne font-bold' : 'border-white/10 text-white/50'
                      }`}
                    >
                      {size}
                    </motion.button>
                  );
                })}
              </>
            ) : (
              <div className="flex flex-wrap gap-1.5 w-full">
                {['Small', 'Medium', 'Large', 'X-Large'].map(size => {
                  const isSelected = selectedSize === size;
                  return (
                    <motion.button
                      key={size}
                      type="button"
                      whileHover={{ borderColor: "rgba(255,255,255,0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateFilterInUrl('size', isSelected ? '' : size)}
                      className={`px-3 py-1 font-label-caps text-[9px] tracking-widest border transition-all uppercase cursor-pointer focus:outline-none ${
                        isSelected ? 'bg-antique-champagne text-black border-antique-champagne font-bold' : 'border-white/10 text-white/50'
                      }`}
                    >
                      {size}
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>

        {/* COLUMN 4: TEXT ACCENTS FILTER & ABSOLUTE MASTER RESET BUTTON */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 15 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="flex flex-col gap-3 justify-between h-full"
        >
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
              <AnimatePresence>
                {selectedColor && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    type="button"
                    onClick={() => updateFilterInUrl('color', '')} 
                    className="absolute right-2 top-2.5 text-error text-[10px] uppercase font-bold hover:text-white bg-transparent border-none cursor-pointer"
                  >
                    Clear
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* DROP-DOWN MASTER RESET Shortcut */}
          <AnimatePresence>
            {(selectedCategory || selectedSubCategory || selectedSize || selectedColor) && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                whileHover={{ backgroundColor: "rgba(239, 68, 68, 1)", color: "#ffffff", borderColor: "rgba(239, 68, 68, 1)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                type="button"
                onClick={() => {
                  const cleanUrlParams = new URLSearchParams();
                  cleanUrlParams.set('order', priceOrder || 'ASC');
                  router.push(`${pathname}?${cleanUrlParams.toString()}`, { scroll: false });
                }}
                className="w-full border border-error/40 text-error transition-all font-label-caps text-[10px] tracking-widest uppercase py-2.5 mt-4 cursor-pointer font-bold bg-transparent text-center block"
              >
                Clear All Active Filters [X]
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </motion.div>
  )}
</AnimatePresence>





{/* ── UPDATED DATABASE DRIVEN STORE GRID SECTION ── */}
<main className="py-6 md:py-20 px-0 sm:px-4 md:px-12 max-w-7xl mx-auto selection:bg-antique-champagne selection:text-black">
  
  {/* Empty State Data Parameter Check */}
  {products.length === 0 && !loading && (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="text-center py-20 border border-white/[0.06] bg-gradient-to-b from-[#090909] to-[#121212] backdrop-blur-md p-8 mx-4"
    >
      <span className="font-label-caps text-[11px] tracking-[0.3em] text-white/30 block mb-2 uppercase font-medium">NO RESULTS IDENTIFIED</span>
      <p className="font-body-lg text-[13px] text-white/50 max-w-sm mx-auto">No handcrafted items match your selected filter matrices. Try resetting an active parameter tag above.</p>
    </motion.div>
  )}

  <motion.div 
    layout
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-5% 0px" }}
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.04 }
      }
    }}
    className="grid grid-cols-3 lg:grid-cols-4 gap-[3px] md:gap-6 w-full px-[3px] sm:px-0 bg-transparent"
  >

    {products.map((product, idx) => {
      // Retain layout asymmetry only on desktop sizes to prevent layout disruption on tiny mobile screens
      const isAsymmetricShift = idx % 4 === 2;

      return (
        <Link 
          href={`/products/${product.slug}`} 
          key={product.id}
          className="block w-full h-full"
        >
          <motion.div
            layout
            variants={{
              hidden: { opacity: 0, y: 25 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            whileHover="hover"
            animate={{
              y: isAsymmetricShift ? window.innerWidth >= 1024 ? 48 : 0 : 0
            }}
            className="group flex flex-col cursor-pointer w-full h-full justify-between select-none"
          >
            {/* Top content wrapper containing the image and the fluid header text block */}
            <div className="flex flex-col w-full">
              
              {/* FIXED CANVAS FRAME */}
              <motion.div 
                variants={{
                  hover: { 
                    borderColor: "rgba(230,187,119,0.2)",
                    boxShadow: "0 10px 30px -15px rgba(0,0,0,0.7)"
                  }
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#141414] border border-white/[0.03] w-full mb-3 md:mb-5 flex items-center justify-center p-3"
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
                    alt={`${product.name} - Handcrafted Premium Archive by Shomicore`}
                    fill
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
                    priority={idx < 4}
                    quality={95}
                    className="object-contain p-1.5 mix-blend-screen" 
                  />
                </motion.div>

                {/* Ambient Background Radial Glow */}
                <motion.div 
                  variants={{
                    hover: { opacity: 1.5 }
                  }}
                  initial={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_75%)] pointer-events-none" 
                />

                {/* Design indicator accent dot */}
                <motion.div 
                  variants={{
                    hover: { scale: 1.15 }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute top-2.5 right-2.5 md:top-4 md:right-4 h-1 md:h-1.5 w-1 md:w-1.5 rounded-full bg-antique-champagne z-10 shadow-[0_0_8px_rgba(230,187,119,0.5)]" 
                />
                
                {/* Action Hover Slide Reveal Layer */}
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

              {/* TEXT HEADERS — COMPLETELY UNBOUNDED VERTICAL FLOW */}
              <div className="flex flex-col w-full px-1 sm:px-0 text-left gap-2">
                <motion.h3 
                  variants={{
                    hover: { color: "rgba(230,187,119,1)" }
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-label-caps text-[9px] sm:text-[10px] md:text-[12px] uppercase tracking-[0.1em] md:tracking-[0.15em] text-white/90 font-bold leading-snug break-words whitespace-normal block w-full hyphens-auto" 
                  title={product.name}
                >
                  {product.name}
                </motion.h3>
                
                {/* Fine Separator Line */}
                <div className="relative w-full h-[1px] bg-white/[0.06] overflow-hidden mb-1">
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

            {/* BOTTOM METADATA BAR STRIP — LOCKED ON A UNIFIED BASELINE */}
            <div className="flex justify-between items-center gap-1.5 w-full pt-1 px-1 sm:px-0 mt-auto">
              <p className="font-body-lg text-[8px] sm:text-[9px] md:text-[10px] text-white/40 tracking-wider uppercase font-medium break-words whitespace-normal leading-normal max-w-[60%]">
                {product.parent_category?.toLowerCase().replace(' products', '').replace(' jewelry', '')}
              </p>
              <motion.p 
                variants={{
                  hover: { 
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(230,187,119,0.3)"
                  }
                }}
                transition={{ duration: 0.4 }}
                className="font-body-lg text-[10px] sm:text-[11px] md:text-[13px] text-antique-champagne font-semibold tracking-wide whitespace-nowrap bg-white/[0.02] px-1.5 py-0.5 border border-white/[0.05] rounded-none shrink-0"
              >
                €{parseFloat(product.price).toFixed(2)}
              </motion.p>
            </div>

          </motion.div>
        </Link>
      );
    })}
    
  </motion.div>

  {/* Bottom Action Footer Separator */}
  <div className="mt-16 md:mt-28 flex flex-col items-center">
    <motion.div 
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="h-12 md:h-16 w-px bg-white/10 mb-6 md:mb-8 origin-top"
    />
    <motion.button 
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className="font-label-caps text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-white/50 hover:text-antique-champagne transition-colors cursor-pointer group bg-transparent border-none outline-none focus:outline-none font-medium"
    >
      Continue Discovering
      <div className="relative w-12 h-[1px] mt-2.5 mx-auto overflow-hidden">
        <motion.div 
          variants={{
            hover: { left: "0%", width: "100%" }
          }}
          initial={{ left: "50%", width: "0%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 h-full bg-antique-champagne" 
        />
      </div>
    </motion.button>
  </div>

</main>





        </div>
    );
}



export default function ProductPage() {
  return (
    <Suspense 
      fallback={
        <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center font-label-caps text-[11px] tracking-[0.3em] uppercase select-none">
          <div className="flex flex-col items-center gap-4">
            {/* Elegant, high-fidelity micro-pulse asset */}
            <motion.div 
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                scale: [0.98, 1, 0.98]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-8 h-8 border border-white/10 flex items-center justify-center rounded-sm bg-white/[0.01]"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-antique-champagne shadow-[0_0_8px_rgba(230,187,119,0.5)]" />
            </motion.div>
            
            <motion.span
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="text-white/40 text-[9px] md:text-[10px]"
            >
              Mounting Secure Catalog Stream...
            </motion.span>
          </div>
        </div>
      }
    >
      <ProductPageContent />
    </Suspense>
  );
}

