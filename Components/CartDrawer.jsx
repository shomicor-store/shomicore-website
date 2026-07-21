'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal 
  } = useCart();

  if (!isCartOpen) return null;

  return (
   <AnimatePresence>
  {isCartOpen && (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 z-[200] overflow-hidden select-none"
    >
      {/* Smooth Backdrop Overlay Layer */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, backdropFilter: "blur(0px)" },
          visible: { opacity: 1, backdropFilter: "blur(4px)" }
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 cursor-pointer"
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Animated Sliding Archive Panel Container */}
        <motion.div 
          variants={{
            hidden: { x: "101%" },
            visible: { x: "0%", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="w-screen max-w-md bg-neutral-950 border-l border-white/10 flex flex-col shadow-2xl h-full text-white relative z-10"
        >
          {/* Header Panel segment */}
          <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-black/20">
            <div>
              <h2 className="font-label-caps text-[12px] tracking-[0.25em] text-white uppercase font-bold">
                Archive Bag
              </h2>
              <span className="text-[9px] font-mono text-antique-champagne/60 mt-1 block uppercase">
                {cart.length} unique items logged
              </span>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsCartOpen(false)}
              className="text-white/40 hover:text-white cursor-pointer bg-transparent border-none outline-none p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Core Dynamic Content Track Panel Grid */}
          <div className="flex-1 overflow-y-auto py-6 px-6 scrollbar-none flex flex-col gap-6">
            {cart.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="h-full flex flex-col items-center justify-center text-center gap-3 opacity-30 py-20"
              >
                <span className="font-label-caps text-[11px] tracking-[0.3em] block uppercase">Bag Canvas Vacant</span>
                <p className="font-body-lg text-[13px] max-w-xs leading-relaxed">No premium pieces have been pinned to your archive session streams yet.</p>
              </motion.div>
            ) : (
              <motion.div layout className="flex flex-col gap-6 w-full">
                {cart.map((item, index) => {
                  const itemKey = `${item.id}-${item.size}-${item.color}-${index}`;
                  return (
                    <motion.div 
                      layout
                      key={itemKey}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 30, transition: { duration: 0.3 } }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="flex gap-4 border-b border-white/5 pb-6 last:border-none w-full"
                    >
                      {/* Thumbnail Frame View Block */}
                      <div className="relative w-16 h-20 bg-neutral-900 border border-white/5 overflow-hidden flex-shrink-0">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill 
                          sizes="64px" 
                          className="object-cover" 
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-label-caps text-[10px] md:text-[11px] uppercase tracking-wider text-white truncate max-w-[180px]">
                              {item.name}
                            </h4>
                            <span className="font-mono text-[12px] text-antique-champagne font-semibold whitespace-nowrap">
                              €{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 font-label-caps text-[8px] tracking-widest text-white/40 uppercase">
                            <span>Fit: <span className="text-white/70 font-mono">{item.size}</span></span>
                            <span>Hue: <span className="text-white/70">{item.color}</span></span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          {/* Quantity Multiplier Block Vector */}
                          <div className="flex items-center border border-white/10 bg-black/20 h-7 text-[11px]">
                            <motion.button 
                              whileTap={{ scale: 0.85 }}
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                              className="w-7 text-white/40 hover:text-white transition-colors h-full font-mono cursor-pointer bg-transparent border-none outline-none"
                            >
                              -
                            </motion.button>
                            <span className="w-8 text-center font-mono text-white select-none">{item.quantity}</span>
                            <motion.button 
                              whileTap={{ scale: 0.85 }}
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                              className="w-7 text-white/40 hover:text-white transition-colors h-full font-mono cursor-pointer bg-transparent border-none outline-none"
                            >
                              +
                            </motion.button>
                          </div>

                          <motion.button 
                            whileHover={{ scale: 1.02, color: "rgba(239, 68, 68, 1)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                            className="font-label-caps text-[9px] tracking-widest text-error/60 transition-colors uppercase bg-transparent border-none cursor-pointer p-1"
                          >
                            Remove
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Stable Horizon Transaction Summary Panel Base */}
          {cart.length > 0 && (
            <div className="px-6 py-6 border-t border-white/5 bg-black/40 flex flex-col gap-4">
              <div className="flex justify-between items-baseline">
                <span className="font-label-caps text-[10px] tracking-[0.2em] text-white/40 uppercase">Subtotal Summary</span>
                <span className="font-mono text-[18px] text-antique-champagne font-bold">€{cartTotal.toFixed(2)}</span>
              </div>
              
              <p className="text-[10px] font-body-lg text-white/30 leading-normal">
                Logistics, localized country taxes, and final shipment metrics calculated securely at order layout dispatch.
              </p>

              <Link 
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="relative block w-full overflow-hidden uppercase font-bold text-center py-4 font-nav-link text-[11px] tracking-[0.25em] bg-antique-champagne text-black group/btn shadow-lg shadow-antique-champagne/5"
              >
                {/* Secondary Background Overlay Slide Interaction Layer */}
                <motion.span 
                  initial={{ y: "101%" }}
                  whileHover={{ y: "0%" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-white z-0"
                />
                <span className="relative z-10 block pointer-events-none">
                  Proceed to Checkout
                </span>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
   
</motion.div>
  )}
  </AnimatePresence>
  );
}
