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
const [relatedProducts, setRelatedProducts] = useState([]);

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

 
  const businessPhoneNumber = "923085266965"; 

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

  const whatsappApiUrl = `https://wa.me/923085266965?text=${encodedText}`;

  window.open(whatsappApiUrl, '_blank');
};



  if (loading) return <div className="p-20 text-center text-white font-mono text-[11px] tracking-widest uppercase bg-matte-charcoal min-h-screen">Loading the Product.......</div>;
  if (!product) return <div className="p-20 text-center text-error font-mono text-[11px] tracking-widest uppercase bg-matte-charcoal min-h-screen">Product Is Not entered in the Data base !!!</div>;

  return (
    <div className="bg-matte-charcoal min-h-screen text-on-surface w-full py-4 md:py-20 select-none">
      
      {/* 2-Column Product Layout View System */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 lg:gap-x-24 mb-8 max-w-7xl mx-auto px-4 md:px-12">

{/* Left Column: Premium Interactive High-Res Media Gallery Stage */}
<div className="w-full flex justify-center items-start relative select-none">
  {/* Max-width wrapper prevents the square container from becoming too tall on large monitor viewports */}
  <div className="md:sticky md:top-32 flex flex-col gap-4 w-full max-w-[480px] md:max-w-[500px] mx-auto">
    
    {/* Main Primary View Stage Window Container */}

    <div className="relative aspect-square w-full overflow-hidden bg-neutral-950 border border-white/5 shadow-2xl flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none z-10 mix-blend-multiply"></div>
      
      {product.images && product.images[activeImageIndex] ? (
        <Image 
          src={product.images[activeImageIndex]}
          alt={`${product.name} - Handcrafted Premium Archive View`}
          fill
          priority
          unoptimized={true} 
        
          className="object-contain transition-transform duration-[800ms] cubic-bezier(0.25, 1, 0.5, 1) hover:scale-[1.03]" 
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
      <div className="flex gap-2.5 w-full overflow-x-auto scrollbar-none snap-x snap-mandatory pb-1 max-w-full">
        {product.images.map((imgUrl, index) => (
          <button 
            key={`${imgUrl}-${index}`}
            type="button"
            onClick={() => setActiveImageIndex(index)}
         
            className={`relative aspect-square w-[68px] sm:w-[80px] overflow-hidden bg-neutral-900 border transition-all duration-300 cursor-pointer focus:outline-none flex-shrink-0 snap-center p-1 flex items-center justify-center ${
              activeImageIndex === index 
                ? 'border-antique-champagne scale-[1.02] ring-1 ring-antique-champagne/40 bg-black/60 shadow-lg shadow-antique-champagne/5' 
                : 'border-white/5 opacity-40 hover:opacity-100'
            }`}
          >
            <Image 
              src={imgUrl} 
              alt={`${product.name} structural closeup profile angle ${index + 1}`} 
              fill 
              unoptimized={true} 
              sizes="80px" 
              className="object-contain p-0.5" 
            />
          </button>
        ))}
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



{/* EDITORIAL DESCRIPTION PANEL */}
<div className="w-full bg-gradient-to-b from-white/[0.01] to-transparent border-l border-white/[0.08] pl-4 md:pl-6 py-2 my-8">
  
  {/* Sub-label heading accent */}
  <span className="font-label-caps text-[10px] md:text-[11px] tracking-[0.25em] text-white/30 block mb-4 uppercase font-medium">
     Specifications & Description
  </span>

  {/* MAIN API DESCRIPTION OUTPUT */}
  <div className="flex flex-col gap-2 w-full text-left">
    {product.description
      ?.split('\n')
      ?.filter(line => line.trim() !== '')
      ?.map((line, index) => {
        // Strip out any dynamic markdown characters (* and -) coming from your live database strings
        const cleanLine = line.replace(/[\*\-]/g, '').trim();

        // Dynamically style lines that serve as titles or contain distinct tech specs (e.g., lines ending with colons)
        const isHeader = line.toLowerCase().includes('details');
        const isSpecification = cleanLine.includes(':');

        if (isHeader) {
          return (
            <h4 
              key={index} 
              className="font-label-caps text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-antique-champagne font-semibold mt-4 mb-2 first:mt-0"
            >
              {cleanLine}
            </h4>
          );
        }

        if (isSpecification) {
          const [label, ...valueParts] = cleanLine.split(':');
          const value = valueParts.join(':').trim();
          return (
            <p 
              key={index} 
              className="font-body-lg text-[13px] md:text-[15px] leading-relaxed tracking-wide text-white/90 break-words whitespace-normal font-light"
            >
              <span className="text-white/40 uppercase font-label-caps text-[11px] md:text-[12px] tracking-[0.1em] mr-2">
                {label.trim()}:
              </span>
              {value}
            </p>
          );
        }

        // Standard body lines format
        return (
          <p 
            key={index} 
            className="font-body-lg text-[13px] md:text-[15px] leading-relaxed tracking-wide text-white/80 break-words whitespace-normal font-light"
          >
            {cleanLine}
          </p>
        );
    })}
  </div>

  {/* Decorative Fine Theme Accent Line */}
  <div className="w-12 h-[1px] bg-antique-champagne/30 mt-6" />
</div>






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
        * Please pick an operational size  proceeding to checkout.
      </span>
    )}
  </div>
)}


  {/* ── HIGH PERFORMANCE ACTION BUTTONS ARRAYS BLOCK ── */}

<div className="flex flex-col gap-3 mt-5 w-full">
  
  {/* ROW 1: QUICK E-COMMERCE CART & DIRECT PURCHASE SHORTCUT CHEVRONS */}
  <div className="flex flex-col sm:flex-row gap-3 w-full">
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

    {/* Action 2: Premium Quick Checkout Direct Buy Now Trigger */}
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

  {/* ROW 2: WHATSAPP DIRECT HIGH-CONVERSION SALES ASSISTANT ANCHOR BUTTON */}
  <button 
    type="button"
    onClick={handleWhatsAppInquiry}
    className="w-full border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500 text-emerald-400 hover:text-black py-3.5 flex justify-center items-center gap-2 transition-all duration-300 cursor-pointer focus:outline-none font-semibold text-[10px] md:text-[11px] font-nav-link tracking-[0.2em] uppercase"
  >
    {/* Clean embedded inline vector graphic scales crisp without installing heavy weight font packages */}
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.059 11.948.059c3.173.001 6.155 1.236 8.397 3.479 2.242 2.243 3.475 5.224 3.474 8.393-.003 6.549-5.341 11.838-11.892 11.838-.002 0-.003 0-.005 0-2.001-.001-3.971-.51-5.713-1.478L0 24zm6.545-2.923c1.602.951 3.432 1.452 5.397 1.453H12c5.441 0 9.865-4.382 9.868-9.771.002-2.61-.1015-5.064-2.863-6.932A9.743 9.743 0 0 0 12 1.134c-5.441 0-9.865 4.382-9.868 9.771-.001 2.083.53 4.113 1.538 5.9l-.423 1.543-.45 1.644 1.683-.441 1.622-.425zM17.411 14.5c-.3-.15-1.776-.876-2.046-.975-.27-.099-.465-.15-.66.15-.195.3-.75.945-.921 1.125-.171.18-.345.21-.645.06-.3-.15-1.266-.466-2.412-1.485-.892-.795-1.493-1.777-1.668-2.077-.174-.3-.018-.463.132-.612.135-.133.3-.35.45-.525.15-.174.2-.299.3-.499.1-.2.05-.375-.025-.525-.075-.15-.66-1.59-.9-2.174-.234-.572-.493-.494-.66-.502-.158-.008-.34-.011-.52-.011-.18 0-.476.067-.726.39-.25.322-.953.932-.953 2.273s.975 2.63 1.11 2.81c.135.18 1.92 2.931 4.653 4.113.65.28 1.157.446 1.554.573.654.207 1.25.177 1.719.089.524-.099 1.62-.663 1.849-1.275.23-.611.23-1.137.16-1.248-.07-.11-.27-.16-.57-.31z" />
    </svg>
    <span>Customise or shop WhatsApp</span>
  </button>
  
</div>


{/* Accordion Layer Info */}
<div className="mt-8 pt-6 border-t border-white/5">
  <div className="flex flex-col gap-2">
    <h4 className="font-label-caps text-[9px] tracking-[0.2em] text-antique-champagne uppercase">
      Note
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
{/* ── HIGH UX INTERACTIVE RELATED PRODUCTS MATRIX SHOWCASE ── */}
{relatedProducts.length > 0 && (
  <section className="mt-20 md:mt-32 max-w-7xl mx-auto px-4 md:px-12 border-t border-white/10 pt-16 select-none animate-fadeIn">
    
    {/* Section Header Text Metrics */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-10 gap-3">
      <div>
        <span className="font-label-caps text-[9px] md:text-[10px] tracking-[0.3em] text-antique-champagne uppercase font-bold block mb-1">
          CURATED STYLING
        </span>
        <h2 className="font-display-hero text-[28px] md:text-[36px] uppercase tracking-tighter text-white leading-none">
          Complete The Archive Fit
        </h2>
      </div>
      <span className="font-label-caps text-[9px] md:text-[10px] tracking-[0.2em] text-white/30 uppercase font-mono">
        Discovering {relatedProducts.length} Matching Companions
      </span>
    </div>

    {/* ⚡ SYNCHRONIZED GRID: Uses your exact 2-column mobile layout to make items look bigger on phones, scaling up to 4 cards on desktop */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
      {relatedProducts.map((relProduct) => (
        <Link 
          href={`/products/${relProduct.slug}`}
          key={relProduct.id} 
          className="group flex flex-col cursor-pointer transition-all duration-300 w-full"
        >
          <div className="relative aspect-square overflow-hidden bg-neutral-950 border border-white/5 group-hover:border-white/20 transition-colors duration-500 w-full mb-3 md:mb-4 flex items-center justify-center p-2">
            <Image 
              src={relProduct.images?.[0] || "/product-placeholder.png"} 
              alt={`${relProduct.name} - Premium Complementary Piece by Shomicore`} 
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
              quality={95}
              className="object-contain transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]" 
            />

            {/* Premium visual design anchor accent dot */}
            <div className="absolute top-3 right-3 md:top-4 md:right-4 h-1.5 w-1.5 rounded-full bg-antique-champagne z-10"></div>
            
            {/* Action Hover Slide Reveal Layer */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-end justify-center pb-6 z-10">
              <span className="bg-white text-black font-nav-link px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] font-semibold text-center select-none">
                View Archive
              </span>
            </div>
          </div>

          {/* Left-Aligned Luxury Typography metadata tags block */}
          <h3 className="font-label-caps text-[10px] md:text-[11px] uppercase tracking-wider md:tracking-[0.2em] text-white truncate mb-1 pr-2 w-full text-left" title={relProduct.name}>
            {relProduct.name}
          </h3>
          
          <div className="flex justify-between items-baseline gap-2 w-full">
            <p className="font-body-lg text-[11px] md:text-[13px] text-white/40 italic truncate max-w-[60%] capitalize">
              {relProduct.parent_category?.toLowerCase().replace(' jewelry', '').replace(' products', '')}
            </p>
            <p className="font-body-lg text-[11px] md:text-[14px] text-antique-champagne font-bold whitespace-nowrap">
              €{parseFloat(relProduct.price).toFixed(2)}
            </p>
          </div>
        </Link>
      ))}
    </div>

  </section>
)}

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