'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ringChartMatrix } from '@/lib/RingSizes';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function SingleProductPage({ params }) {
  const resolvedParams = use(params); 
  const slug = resolvedParams?.slug;
const router = useRouter();
const { addToCart, setIsCartOpen } = useCart();
const [relatedProducts, setRelatedProducts] = useState([]);
const [isImageLoading, setIsImageLoading] = useState(true);
  // Master Data Metrics Layout States
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);



const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Interactive Variant Tracking States
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  // UX Error & Animation Flags
  const [sizeError, setSizeError] = useState(false);

const [lightboxImage, setLightboxImage] = useState(null);

useEffect(() => {
  if (!slug) return;

  const loadProductAndRelated = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products/slug/${slug}`);
      const result = await res.json();
      
      if (result.success && result.data) {
        const mainItem = result.data;
        setProduct(mainItem);
        if (mainItem.colors?.length > 0) setSelectedColor(mainItem.colors[0]);

        // 🚀 FETCH RELATED: Queries your API using the main item's active category parameters
        const relatedRes = await fetch(`/api/products?category=${encodeURIComponent(mainItem.parent_category)}`);
        const relatedResult = await relatedRes.json();
        
        if (relatedResult.success) {
          // Filter out the active main product from the recommendation list array
          const filteredList = relatedResult.data.filter(item => item.id !== mainItem.id);
          setRelatedProducts(filteredList.slice(0, 4)); // Limit view array strictly to 4 items max
        }
      }
    } catch (err) {
      console.error("Data syncing issue identified inside details view:", err);
    } finally {
      setLoading(false);
    }
  };

  loadProductAndRelated();
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
const handleWhatsAppInquiry = () => {
  // 1. Mandatory variant check: Force user to pick a size if the product has size options
  if (product?.available_sizes?.length > 0 && !selectedSize) {
    setSizeError(true);
    setTimeout(() => setSizeError(false), 500);
    return;
  }

 


  const productName = product.name;
  const productPrice = parseFloat(product.price).toFixed(2);
  const productSize = selectedSize || "Standard Fit";
  const productColor = selectedColor || "Standard Finish";
  

  const currentProductUrl = window.location.href;


  const rawMessageText = 
`Hello Shomicore, I would like to place an order/inquiry for this piece:

⚜️ *Product:* ${productName}
💶 *Price:* €${productPrice}
📏 *Size Selected:* ${productSize}
🎨 *Finish/Color:* ${productColor}

🔗 *Product Link:* ${currentProductUrl}`;

  const encodedText = encodeURIComponent(rawMessageText);

  const whatsappApiUrl = `https://wa.me/923010544620?text=${encodedText}`;

  window.open(whatsappApiUrl, '_blank');
};

useEffect(() => {
  setIsImageLoading(true);
}, [activeImageIndex]);

if (loading) {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center font-label-caps select-none relative overflow-hidden">
      {/* Premium Ambient Background Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,187,119,0.02)_0%,transparent_65%)] pointer-events-none" />

      {/* Main Core Loading Geometry Assembly */}
      <div className="flex flex-col items-center gap-6 relative z-10">
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
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
            Resolving Product Spec Canvas...
          </span>
        </div>
      </div>
    </div>
  );
}

if (!product) {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center font-label-caps select-none relative overflow-hidden px-4">
      {/* Premium Ambient Background Error Overlay Halo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.01)_0%,transparent_65%)] pointer-events-none" />

      {/* Main Core Error Layout Container */}
      <motion.div 
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0, y: 15 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
        }}
        className="flex flex-col items-center gap-6 max-w-sm text-center relative z-10"
      >
        {/* Architectural Broken Grid Accent Box Icon */}
        <div className="w-12 h-12 border border-error/20 bg-error/[0.02] flex items-center justify-center rounded-sm text-error/60 relative">
          <span className="font-mono text-base font-bold">!</span>
          <div className="absolute inset-1 border border-error/5 pointer-events-none" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-label-caps text-[11px] tracking-[0.3em] text-error uppercase font-semibold">
            Archive Entry Absent
          </span>
          <p className="font-body-lg text-[13px] text-white/50 leading-relaxed max-w-xs font-light select-text">
            This premium piece is not registered in the Shomicor database log sheets. It may have been unpinned or relocated.
          </p>
        </div>

        {/* Home Routing Safe Return Button Link */}
        <Link href="/" className="block mt-2">
          <motion.div 
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="relative inline-block border border-white/20 text-white font-label-caps tracking-[0.2em] text-[10px] uppercase px-6 py-3 bg-transparent overflow-hidden group/errbtn cursor-pointer outline-none rounded-none"
          >
            {/* Sliding interaction background mask */}
            <motion.span 
              variants={{
                hover: { y: "0%" }
              }}
              initial={{ y: "101%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-white z-0"
            />
            
            <motion.span 
              variants={{
                hover: { color: "#000000" }
              }}
              initial={{ color: "#ffffff" }}
              transition={{ duration: 0.3 }}
              className="relative z-10 block font-medium pointer-events-none"
            >
              Return To Home Showcase
            </motion.span>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}


  return (
    <div className="bg-matte-charcoal min-h-screen text-on-surface w-full py-4 md:py-20 select-none">
      
      {/* 2-Column Product Layout View System */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 lg:gap-x-24 mb-8 max-w-7xl mx-auto px-4 md:px-12">

{/* Left Column: Premium Interactive High-Res Media Gallery Stage */}
<div className="w-full flex justify-center items-start relative select-none">
  {/* Local State Variable Setup Reminder: Add this to the top of your component code block if not present:
      const [isImageLoading, setIsImageLoading] = useState(true);
      useEffect(() => { setIsImageLoading(true); }, [activeImageIndex]);
  */}
  <div className="md:sticky md:top-32 flex flex-col gap-4 w-full max-w-[480px] md:max-w-[500px] mx-auto">
    <div className="relative aspect-square w-full overflow-hidden bg-neutral-950 border border-white/5 shadow-2xl flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none z-10 mix-blend-multiply"></div>
      
      {/* Dynamic Luxury Shimmer Loading Screen Asset */}
      <AnimatePresence>
        {isImageLoading && product.images && product.images[activeImageIndex] && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 bg-neutral-900 z-20 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Animated Shimmer Stripe */}
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
            />
            <div className="flex flex-col items-center gap-3 relative z-10">
              <motion.div 
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.98, 1, 0.98] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-6 border border-white/10 flex items-center justify-center rounded-sm"
              >
                <div className="h-1 w-1 rounded-full bg-antique-champagne shadow-[0_0_8px_rgba(230,187,119,0.5)]" />
              </motion.div>
              <span className="font-label-caps text-[9px] tracking-[0.25em] text-white/30 uppercase">Resolving Archive Asset...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {product.images && product.images[activeImageIndex] ? (
        <motion.div
          key={activeImageIndex}
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: isImageLoading ? 0 : 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          <Image 
            src={product.images[activeImageIndex]}
            alt={`${product.name} - Handcrafted Premium Archive View`}
            fill
            priority
            unoptimized={true} 
            onLoadingComplete={() => setIsImageLoading(false)}
            className="object-contain transition-transform duration-[800ms] cubic-bezier(0.25, 1, 0.5, 1) hover:scale-[1.03]" 
          />
        </motion.div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-neutral-900 text-white/20">
          <span className="material-symbols-outlined text-[24px]">broken_image</span>
          <span className="font-label-caps text-[9px] tracking-[0.3em] uppercase">Specification Asset Absent</span>
        </div>
      )}
    </div>

    {/* Navigation Thumbnails Grid */}
    {product.images && product.images.length > 1 && (
      <div className="flex gap-2.5 w-full overflow-x-auto scrollbar-none snap-x snap-mandatory pb-1 max-w-full">
        {product.images.map((imgUrl, index) => {
          const isSelected = activeImageIndex === index;
          return (
            <motion.button 
              key={`${imgUrl}-${index}`}
              type="button"
              onClick={() => setActiveImageIndex(index)}
              whileHover={{ scale: isSelected ? 1.02 : 1.05, opacity: 1 }}
              whileTap={{ scale: 0.96 }}
              animate={{
                borderColor: isSelected ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.05)",
                boxShadow: isSelected ? "0 8px 20px -10px rgba(230,187,119,0.2)" : "0 0 0px rgba(0,0,0,0)",
                scale: isSelected ? 1.02 : 1,
                opacity: isSelected ? 1 : 0.4
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square w-[68px] sm:w-[80px] overflow-hidden bg-neutral-900 border cursor-pointer focus:outline-none flex-shrink-0 snap-center p-1 flex items-center justify-center rounded-none"
            >
              <Image 
                src={imgUrl} 
                alt={`${product.name} structural closeup profile angle ${index + 1}`} 
                fill 
                unoptimized={true} 
                sizes="80px" 
                className="object-contain p-0.5" 
              />
            </motion.button>
          );
        })}
      </div>
    )}
  </div>
  <style jsx global>{`
    .scrollbar-none::-webkit-scrollbar { display: none; }
    .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
</div>

 {/* Right Column: Dynamic Text Product Specification Summary */}
<div className="flex flex-col pt-2 md:pt-4">
<motion.div 
  initial="hidden"
  animate="show"
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 }
    }
  }}
  className="w-full flex flex-col items-start select-none"
>
  {/* Dynamic Breadcrumbs Track */}
  <motion.nav 
    variants={{
      hidden: { opacity: 0, y: 10 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    }}
    className="mb-4 md:mb-6"
  >
    <span className="font-label-caps text-[9px] md:text-[10px] tracking-[0.25em] text-white/40 uppercase">
      <Link href="/products" className="hover:text-antique-champagne transition-colors duration-300">
        The Archive
      </Link>{" "}
      / {product.parent_category}
    </span>
  </motion.nav>

  {/* Bold Archetypal Product Identity Header Title */}
  <motion.h1 
    variants={{
      hidden: { opacity: 0, y: 15 },
      show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
    }}
    className="font-display-hero text-2xl sm:text-4xl md:text-[44px] lg:text-[56px] leading-tight tracking-tighter mb-3 md:mb-4 uppercase text-white break-words w-full"
  >
    {product.name}
  </motion.h1>

  {/* Premium Financial Marker Box */}
  <motion.p 
    variants={{
      hidden: { opacity: 0, y: 10 },
      show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
    }}
    className="font-body-lg text-antique-champagne text-xl md:text-2xl mb-5 md:mb-6 font-bold leading-none select-text"
  >
    €{parseFloat(product.price).toFixed(2)}
  </motion.p>
</motion.div>

  <div className="w-12 h-[1px] bg-white/10 mb-5 md:mb-6"></div>

{/* EDITORIAL DESCRIPTION PANEL */}
<motion.div 
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-10% 0px" }}
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }}
  className="w-full bg-gradient-to-b from-white/[0.01] to-transparent pl-4 md:pl-6 py-2 my-8 relative"
>
  {/* Hardware-Accelerated Dynamic Left Accent Line */}
  <motion.div 
    variants={{
      hidden: { scaleY: 0 },
      show: { scaleY: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
    }}
    className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.08] origin-top"
  />

  <motion.span 
    variants={{
      hidden: { opacity: 0, x: -8 },
      show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }}
    className="font-label-caps text-[10px] md:text-[11px] tracking-[0.25em] text-white/30 block mb-4 uppercase font-medium select-none"
  >
     Specifications & Description
  </motion.span>
  
  {/* MAIN API DESCRIPTION OUTPUT */}
  <div className="flex flex-col gap-2 w-full text-left">
    {product.description
      ?.split('\n')
      ?.filter(line => line.trim() !== '')
      ?.map((line, index) => {
        const cleanLine = line.replace(/[\*\-]/g, '').trim();
        const isHeader = line.toLowerCase().includes('details');
        const isSpecification = cleanLine.includes(':');
        
        if (isHeader) {
          return (
            <motion.h4 
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              key={index} 
              className="font-label-caps text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-antique-champagne font-semibold mt-4 mb-2 first:mt-0 select-none"
            >
              {cleanLine}
            </motion.h4>
          );
        }
        
        if (isSpecification) {
          const [label, ...valueParts] = cleanLine.split(':');
          const value = valueParts.join(':').trim();
          return (
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              key={index} 
              className="font-body-lg text-[13px] md:text-[15px] leading-relaxed tracking-wide text-white/90 break-words whitespace-normal font-light select-text"
            >
              <span className="text-white/40 uppercase font-label-caps text-[11px] md:text-[12px] tracking-[0.1em] mr-2 select-none">
                {label.trim()}:
              </span>
              {value}
            </motion.p>
          );
        }
        
        // Standard body lines format
        return (
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            key={index} 
            className="font-body-lg text-[13px] md:text-[15px] leading-relaxed tracking-wide text-white/80 break-words whitespace-normal font-light select-text"
          >
            {cleanLine}
          </motion.p>
        );
    })}
  </div>

  {/* Bottom line accent */}
  <div className="relative w-12 h-[1px] mt-6 overflow-hidden">
    <motion.div 
      variants={{
        hidden: { scaleX: 0 },
        show: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } }
      }}
      className="absolute inset-0 bg-antique-champagne/30 origin-left"
    />
  </div>
</motion.div>







{/* 1. Dynamic Color Variation Tags Output */}
{product.colors && product.colors.length > 0 && (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="mb-6 md:mb-8 w-full select-none"
  >
    <h3 className="font-label-caps text-[9px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase mb-2.5 block">
      Available Accent Finishes:{" "}
      <AnimatePresence mode="wait">
        <motion.span 
          key={selectedColor}
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          transition={{ duration: 0.2 }}
          className="text-antique-champagne font-bold inline-block"
        >
          {selectedColor}
        </motion.span>
      </AnimatePresence>
    </h3>
    
    <div className="flex flex-wrap gap-1.5">
      {product.colors.map((color) => {
        const isSelected = selectedColor === color;
        return (
          <motion.button
            key={color}
            type="button"
            onClick={() => setSelectedColor(color)}
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            animate={{
              borderColor: isSelected ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.1)",
              color: isSelected ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.4)",
              backgroundColor: isSelected ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0)"
            }}
            variants={{
              hover: {
                borderColor: isSelected ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.3)",
                color: isSelected ? "rgba(230,187,119,1)" : "rgba(255,255,255,1)"
              }
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`px-3 py-2 font-label-caps text-[9px] md:text-[10px] tracking-wider border uppercase cursor-pointer focus:outline-none rounded-none block font-medium`}
          >
            {color}
          </motion.button>
        );
      })}
    </div>
  </motion.div>
)}


{/* 2. Context-Aware Size Variant Selection Hub with Complete International Table Display */}
{product.available_sizes && product.available_sizes.length > 0 && (
  <motion.div 
    animate={sizeError ? { x: [-6, 6, -4, 4, -2, 2, 0] } : { x: 0 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="mb-6 md:mb-8 w-full select-none"
  >
    <div className="flex justify-between items-baseline mb-3 border-b border-white/10 pb-2">
      <motion.h3 
        animate={{
          color: sizeError ? "rgba(239, 68, 68, 1)" : "rgba(255, 255, 255, 0.5)"
        }}
        className={`font-label-caps text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-medium`}
      >
        {sizeError ? 'Selection Required: Choose a Size Option' : 'Select Size Fit:'} 
      </motion.h3>
      
      <span className="font-label-caps text-[10px] text-antique-champagne/50 uppercase font-mono tracking-wider">
        {product.parent_category === 'Silver Jewelry' ? 'Available Sizes (Scroll for more Sizes)' : 'Standard Sizes'}
      </span>
    </div>
    
    {product.parent_category !== 'Silver Jewelry' ? (
      /* Regular Standard Buttons Row View */
      <motion.div 
        animate={{
          borderColor: sizeError ? "rgba(239, 68, 68, 0.2)" : "rgba(0,0,0,0)",
          backgroundColor: sizeError ? "rgba(239, 68, 68, 0.05)" : "rgba(0,0,0,0)"
        }}
        className="flex flex-wrap gap-2 p-1 border"
      >
        {product.available_sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <motion.button
              key={size}
              type="button"
              onClick={() => { setSelectedSize(size); setSizeError(false); }}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              animate={{
                backgroundColor: isSelected ? "rgba(230, 187, 119, 1)" : "rgba(0, 0, 0, 0)",
                color: isSelected ? "#000000" : sizeError ? "rgba(248, 113, 113, 1)" : "rgba(255, 255, 255, 0.6)",
                borderColor: isSelected ? "rgba(230, 187, 119, 1)" : sizeError ? "rgba(239, 68, 68, 0.3)" : "rgba(255, 255, 255, 0.1)",
                scale: isSelected ? 1.02 : 1
              }}
              variants={{
                hover: {
                  borderColor: isSelected ? "rgba(230, 187, 119, 1)" : sizeError ? "rgba(239, 68, 68, 1)" : "rgba(255, 255, 255, 0.4)",
                  color: isSelected ? "#000000" : "rgba(255, 255, 255, 1)"
                }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="min-w-[44px] h-[40px] px-3 flex items-center justify-center border focus:outline-none font-label-caps text-[10px] tracking-widest uppercase rounded-none cursor-pointer"
            >
              {size}
            </motion.button>
          );
        })}
      </motion.div>
    ) : (
      <motion.div 
        animate={{
          borderColor: sizeError ? "rgba(239, 68, 68, 0.3)" : "rgba(255, 255, 255, 0.1)",
          backgroundColor: sizeError ? "rgba(239, 68, 68, 0.02)" : "rgba(10, 10, 10, 0.4)"
        }}
        className="flex flex-col w-full border p-2 max-h-[300px] overflow-y-auto scrollbar-none rounded-none"
      >
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
                <motion.button
                  type="button"
                  key={row.us}
                  onClick={() => { setSelectedSize(row.us); setSizeError(false); }}
                  whileHover="hover"
                  whileTap={{ scale: 0.99 }}
                  animate={{
                    backgroundColor: isSelected ? "rgba(230, 187, 119, 1)" : "rgba(0, 0, 0, 0)",
                    color: isSelected ? "#000000" : sizeError ? "rgba(252, 165, 165, 0.7)" : "rgba(255, 255, 255, 0.6)",
                    borderColor: isSelected ? "rgba(230, 187, 119, 1)" : "rgba(0, 0, 0, 0)",
                    scale: isSelected ? 1.01 : 1
                  }}
                  variants={{
                    hover: {
                      backgroundColor: isSelected ? "rgba(230, 187, 119, 1)" : "rgba(255, 255, 255, 0.03)",
                      borderColor: isSelected ? "rgba(230, 187, 119, 1)" : sizeError ? "rgba(239, 68, 68, 0.3)" : "rgba(255, 255, 255, 0.1)",
                      color: isSelected ? "#000000" : "rgba(255, 255, 255, 1)"
                    }
                  }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-5 items-center py-3 text-center font-mono text-[13px] border rounded-none focus:outline-none cursor-pointer"
                >
                  <span className="font-bold">{row.us}</span>
                  <span>{row.uk}</span>
                  <span>{row.fr}</span>
                  <span>{row.de}</span>
                  <motion.span 
                    animate={{ color: isSelected ? "rgba(0, 0, 0, 0.7)" : "rgba(230, 187, 119, 0.7)" }}
                    className="text-[11px] font-medium"
                  >
                    {row.mm}
                  </motion.span>
                </motion.button>
              );
          })}
        </div>
      </motion.div>
    )}
    
    {/* Error messaging text alert container */}
    <AnimatePresence>
      {sizeError && (
        <motion.span 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="font-label-caps text-[9px] tracking-widest text-red-500 uppercase mt-2 block font-semibold overflow-hidden"
        >
          * Please pick an operational size proceeding to checkout.
        </motion.span>
      )}
    </AnimatePresence>
  </motion.div>
)}



  {/* ── HIGH PERFORMANCE ACTION BUTTONS ARRAYS BLOCK ── */}

<div className="flex flex-col gap-3 mt-5 w-full">
{/* Add to cart button */}
<div className="flex flex-col sm:flex-row gap-3 w-full select-none">
  
  {/* Standard Cart Append */}
  <motion.button 
    whileHover="hover"
    whileTap={{ scale: 0.98 }}
    type="button"
    onClick={handleAddToCart}
    className="flex-1 border border-antique-champagne py-4 flex justify-center items-center relative overflow-hidden cursor-pointer bg-transparent focus:outline-none rounded-none"
  >
    {/* Sliding background color layer for premium interaction */}
    <motion.div 
      variants={{
        hover: { y: "0%" }
      }}
      initial={{ y: "101%" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 bg-antique-champagne z-0"
    />
    
    <motion.span 
      variants={{
        hover: { color: "#000000" }
      }}
      initial={{ color: "rgba(230, 187, 119, 1)" }}
      transition={{ duration: 0.3 }}
      className="font-nav-link text-[10px] md:text-[11px] tracking-[0.2em] uppercase transition-colors font-semibold relative z-10 block pointer-events-none"
    >
      Add To Archive
    </motion.span>
  </motion.button>

  {/* Buy Now / Instant Purchase */}
  <motion.button 
    whileHover="hover"
    whileTap={{ scale: 0.98 }}
    type="button"
    onClick={handleBuyNow}
    className="flex-1 bg-antique-champagne text-black py-4 flex justify-center items-center relative overflow-hidden border border-antique-champagne cursor-pointer focus:outline-none font-semibold rounded-none group/btn"
  >
    {/* Sliding white accent layer on top of gold for instant purchase call-to-action */}
    <motion.div 
      variants={{
        hover: { y: "0%" }
      }}
      initial={{ y: "101%" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 bg-white z-0"
    />

    <span className="font-nav-link text-[10px] md:text-[11px] tracking-[0.25em] uppercase relative z-10 block pointer-events-none group-hover/btn:text-black transition-colors duration-300">
      Instant Purchase
    </span>
  </motion.button>
</div>


{/* WHATSAPP */}
<motion.button 
  whileHover="hover"
  whileTap={{ scale: 0.98 }}
  type="button"
  onClick={handleWhatsAppInquiry}
  className="w-full relative overflow-hidden bg-gradient-to-r from-[rgba(16,185,129,0.02)] to-[rgba(5,150,105,0.06)] border border-emerald-500/[0.15] py-4 px-6 flex justify-center items-center gap-3 cursor-pointer focus:outline-none font-medium text-[11px] md:text-[12px] font-nav-link tracking-[0.22em] uppercase select-none rounded-none shadow-[0_4px_12px_rgba(0,0,0,0.5)] group/wa"
>
  {/* Fluid Emerald Background Slide Layer */}
  <motion.div 
    variants={{
      hover: { y: "0%" }
    }}
    initial={{ y: "101%" }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="absolute inset-0 bg-gradient-to-r from-[rgba(16,185,129,0.95)] to-[rgba(5,150,105,0.95)] z-0"
  />

  {/* Premium Shimmer Beam Accent */}
  <motion.div 
    variants={{
      hover: { x: ["-100%", "100%"] }
    }}
    transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
    initial={{ x: "-100%" }}
    className="absolute top-0 bottom-0 w-1/3 z-5 pointer-events-none skew-x-12 bg-gradient-to-r from-transparent via-white/[0.2] to-transparent hidden group-hover/wa:block"
  />

  {/* Icon Vector Layer */}
  <motion.svg 
    variants={{
      hover: { scale: 1.1, rotate: -6, color: "#000000" }
    }}
    initial={{ color: "rgba(52, 211, 153, 1)" }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="w-4 h-4 fill-current shrink-0 relative z-10" 
    viewBox="0 0 24 24"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.059 11.948.059c3.173.001 6.155 1.236 8.397 3.479 2.242 2.243 3.475 5.224 3.474 8.393-.003 6.549-5.341 11.838-11.892 11.838-.002 0-.003 0-.005 0-2.001-.001-3.971-.51-5.713-1.478L0 24zm6.545-2.923c1.602.951 3.432 1.452 5.397 1.453H12c5.441 0 9.865-4.382 9.868-9.771.002-2.61-.1015-5.064-2.863-6.932A9.743 9.743 0 0 0 12 1.134c-5.441 0-9.865 4.382-9.868 9.771-.001 2.083.53 4.113 1.538 5.9l-.423 1.543-.45 1.644 1.683-.441 1.622-.425zM17.411 14.5c-.3-.15-1.776-.876-2.046-.975-.27-.099-.465-.15-.66.15-.195.3-.75.945-.921 1.125-.171.18-.345.21-.645.06-.3-.15-1.266-.466-2.412-1.485-.892-.795-1.493-1.777-1.668-2.077-.174-.3-.018-.463.132-.612.135-.133.3-.35.45-.525.15-.174.2-.299.3-.499.1-.2.05-.375-.025-.525-.075-.15-.66-1.59-.9-2.174-.234-.572-.493-.494-.66-.502-.158-.008-.34-.011-.52-.011-.18 0-.476.067-.726.39-.25.322-.953.932-.953 2.273s.975 2.63 1.11 2.81c.135.18 1.92 2.931 4.653 4.113.65.28 1.157.446 1.554.573.654.207 1.25.177 1.719.089.524-.099 1.62-.663 1.849-1.275.23-.611.23-1.137.16-1.248-.07-.11-.27-.16-.57-.31z" />
  </motion.svg>

  {/* Text Label Layer */}
  <motion.span 
    variants={{
      hover: { x: 2, color: "#000000" }
    }}
    initial={{ color: "rgba(52, 211, 153, 1)" }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="relative z-10 pointer-events-none block"
  >
    Customize via WhatsApp
  </motion.span>
</motion.button>


  
</div>

{/* Accordion Layer Info */}
<motion.div 
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-10% 0px" }}
  variants={{
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } }
  }}
  className="mt-8 pt-4 border-t border-white/5 select-none w-full"
>
  <div className="flex flex-col w-full">
    
    {/* Interactive Accordion Trigger Header */}
    <button
      type="button"
      onClick={() => setIsAccordionOpen(!isAccordionOpen)}
      className="w-full flex justify-between items-center py-2 bg-transparent border-none outline-none cursor-pointer group text-left"
      aria-expanded={isAccordionOpen}
    >
      <div className="flex items-center gap-2">
        {/* Pulsing high-fidelity active micro-dot marker */}
        <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
          <motion.span 
            animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inline-flex h-full w-full rounded-full bg-antique-champagne/40 opacity-75"
          />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-antique-champagne" />
        </span>
        
        <span className="font-label-caps text-[10px] md:text-[11px] tracking-[0.25em] text-antique-champagne uppercase font-semibold group-hover:text-white transition-colors duration-300">
          Craftsmanship Notes &amp; Logistics
        </span>
      </div>

      {/* Rotating Vector Plus/Minus Cross Sign */}
      <div className="relative w-3.5 h-3.5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
        <motion.div 
          animate={{ rotate: isAccordionOpen ? 90 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-3.5 h-[1px] bg-current"
        />
        <motion.div 
          animate={{ rotate: isAccordionOpen ? 90 : 90, scaleY: isAccordionOpen ? 0 : 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute h-3.5 w-[1px] bg-current"
        />
      </div>
    </button>

    {/* Dynamic Content Panel Section - Sizable, Fast, and SEO Friendly */}
    <motion.div
      initial={false}
      animate={{
        height: isAccordionOpen ? "auto" : 0,
        opacity: isAccordionOpen ? 1 : 0
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <div className="pt-2 pb-4 pr-4">
        <p className="font-body-lg text-white/50 text-[12px] md:text-[13px] leading-relaxed tracking-wide font-light select-text">
          Every piece inside the Shomicor archive is individually handled, sculpted, and handcrafted by master craftsmen. Due to the bespoke nature of our studio production pipeline, minor architectural variations are inherent signatures of pure raw metal authenticity.
        </p>
      </div>
    </motion.div>

  </div>
</motion.div>



{/* Ring Sizes image shown */}
{product.parent_category === 'Silver Jewelry' && (
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
    className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-6 w-full select-none"
  >
    
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
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 15 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
        }}
        whileHover="hover"
        className="flex flex-col gap-2.5 group"
      >
        <motion.div 
          onClick={() => setLightboxImage("/ring_size_guide.png")}
          variants={{
            hover: { borderColor: "rgba(255,255,255,0.2)" }
          }}
          transition={{ duration: 0.4 }}
          className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950 border border-white/10 cursor-zoom-in"
        >
          <motion.div
            variants={{ hover: { scale: 1.02 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image 
              src="/ring_size_guide.png" 
              alt="Step-by-step instructions on how to measure your finger for Shomicor rings"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              loading="lazy"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
        <motion.span 
          variants={{ hover: { color: "rgba(255,255,255,0.8)" } }}
          transition={{ duration: 0.3 }}
          className="font-label-caps text-[9px] tracking-widest text-white/40 uppercase font-medium pl-0.5"
        >
          How to Measure Your Finger for a Perfect Fit Ring
        </motion.span>
      </motion.div>

      {/* CARD 2: INTERNATIONAL SIZE REFERENCE GUIDE */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 15 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
        }}
        whileHover="hover"
        className="flex flex-col gap-2.5 group"
      >
        <motion.div 
          onClick={() => setLightboxImage("/ring_sizes.png")}
          variants={{
            hover: { borderColor: "rgba(255,255,255,0.2)" }
          }}
          transition={{ duration: 0.4 }}
          className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950 border border-white/10 cursor-zoom-in"
        >
          <motion.div
            variants={{ hover: { scale: 1.02 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image 
              src="/ring_sizes.png" 
              alt="International ring size conversion scale chart diagram"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              loading="lazy"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
        <motion.span 
          variants={{ hover: { color: "rgba(255,255,255,0.8)" } }}
          transition={{ duration: 0.3 }}
          className="font-label-caps text-[9px] tracking-widest text-white/40 uppercase font-medium pl-0.5"
        >
          All International Ring Size Conversion Reference Chart
        </motion.span>
      </motion.div>

    </div>

    {/* ── LUXURY LIGHTBOX MODAL OVERLAY EXTENSION ── */}
    <AnimatePresence>
      {lightboxImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200] flex items-center justify-center p-4 md:p-12 cursor-zoom-out select-none"
        >
          {/* Close Button UI Shortcut element */}
          <motion.button 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white/40 hover:text-white font-label-caps text-[10px] tracking-widest uppercase bg-transparent border-none focus:outline-none cursor-pointer p-2 z-30"
          >
            [ Click Anywhere To Close ]
          </motion.button>
          
          {/* Center Target Scaled Frame */}
          <motion.div 
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()} 
            className="relative w-full max-w-4xl h-[70vh] max-h-[600px] border border-white/10 bg-neutral-950 p-2 z-10"
          >
            <Image 
              src={lightboxImage} 
              alt="Expanded Size Resource View" 
              fill
              sizes="100vw"
              priority
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

  </motion.div>
)}
 


</div>

      </div>
{/* RELATED PRODUCTS */}
{relatedProducts.length > 0 && (
  <motion.section 
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-10% 0px" }}
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
      }
    }}
    className="mt-20 md:mt-32 max-w-7xl mx-auto px-4 md:px-12 border-t border-white/10 pt-16 select-none"
  >
    
    {/* Section Header Text Metrics */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-10 gap-3">
      <div className="flex flex-col items-start text-left">
        <motion.span 
          variants={{
            hidden: { opacity: 0, x: -10 },
            show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
          className="font-label-caps text-[9px] md:text-[10px] tracking-[0.3em] text-antique-champagne uppercase font-bold block mb-1"
        >
          CURATED STYLING
        </motion.span>
        <motion.h2 
          variants={{
            hidden: { opacity: 0, y: 15 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="font-display-hero text-[28px] md:text-[36px] uppercase tracking-tighter text-white leading-none"
        >
          Complete The Archive Fit
        </motion.h2>
      </div>
      <motion.span 
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 1, delay: 0.2 } }
        }}
        className="font-label-caps text-[9px] md:text-[10px] tracking-[0.2em] text-white/30 uppercase font-mono"
      >
        Discovering {relatedProducts.length} Matching Companions
      </motion.span>
    </div>

    {/* ⚡ SYNCHRONIZED GRID: 2-column mobile scaling up to 4 cards on desktop */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
      {relatedProducts.map((relProduct) => (
        <Link 
          href={`/products/${relProduct.slug}`}
          key={relProduct.id} 
          className="block w-full h-full"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            whileHover="hover"
            className="group flex flex-col cursor-pointer w-full h-full justify-between"
          >
            <div className="flex flex-col w-full">
              {/* Image box wrap frame wrapper */}
              <motion.div 
                variants={{
                  hover: { 
                    borderColor: "rgba(255,255,255,0.2)",
                    boxShadow: "0 10px 30px -15px rgba(0,0,0,0.8)"
                  }
                }}
                transition={{ duration: 0.4 }}
                className="relative aspect-square overflow-hidden bg-neutral-950 border border-white/5 w-full mb-3 md:mb-4 flex items-center justify-center p-2"
              >
                <motion.div
                  variants={{
                    hover: { scale: 1.04 }
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative"
                >
                  <Image 
                    src={relProduct.images?.[0] || "/product-placeholder.png"} 
                    alt={`${relProduct.name} - Premium Complementary Piece by Shomicore`} 
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                    quality={95}
                    className="object-contain" 
                  />
                </motion.div>

                {/* Premium visual design anchor accent dot */}
                <motion.div 
                  variants={{
                    hover: { scale: 1.2 }
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-3 right-3 md:top-4 md:right-4 h-1.5 w-1.5 rounded-full bg-antique-champagne z-10 shadow-[0_0_6px_rgba(230,187,119,0.4)]" 
                />
                
                {/* Action Hover Slide Reveal Layer */}
                <motion.div 
                  variants={{
                    hover: { opacity: 1, backdropFilter: "blur(2px)" }
                  }}
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-black/40 hidden md:flex items-end justify-center pb-6 z-10"
                >
                  <motion.span 
                    variants={{
                      hover: { y: 0, opacity: 1 }
                    }}
                    initial={{ y: 8, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white text-black font-nav-link px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] font-semibold text-center select-none shadow-xl block"
                  >
                    View Archive
                  </motion.span>
                </motion.div>
              </motion.div>

              {/* Left-Aligned Luxury Typography metadata tags block */}
              <motion.h3 
                variants={{
                  hover: { color: "rgba(230,187,119,1)" }
                }}
                transition={{ duration: 0.3 }}
                className="font-label-caps text-[10px] md:text-[11px] uppercase tracking-wider md:tracking-[0.2em] text-white truncate mb-1 pr-2 w-full text-left font-bold" 
                title={relProduct.name}
              >
                {relProduct.name}
              </motion.h3>
            </div>
            
            <div className="flex justify-between items-baseline gap-2 w-full mt-auto">
              <p className="font-body-lg text-[11px] md:text-[13px] text-white/40 italic truncate max-w-[60%] capitalize text-left">
                {relProduct.parent_category?.toLowerCase().replace(' jewelry', '').replace(' products', '')}
              </p>
              <p className="font-body-lg text-[11px] md:text-[14px] text-antique-champagne font-bold whitespace-nowrap">
                €{parseFloat(relProduct.price).toFixed(2)}
              </p>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>

  </motion.section>
)}


{/* Optimized CSS Shake Animation */}
<style >{`
  @keyframes luxuryShake {
    0%, 100% { transform: translate3d(0, 0, 0); }
    15%, 45%, 75% { transform: translate3d(-3px, 0, 0); }
    30%, 60%, 90% { transform: translate3d(3px, 0, 0); }
  }
  .animate-shake {
    animation: luxuryShake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    will-change: transform;
    backface-visibility: hidden;
  }
`}</style>

    </div>
  );
}