'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

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
    <div className="fixed inset-0 z-[200] overflow-hidden select-none">
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 cursor-pointer"
      />
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-white/10 flex flex-col shadow-2xl h-full text-white">
          <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-black/20">
            <div>
              <h2 className="font-label-caps text-[12px] tracking-[0.25em] text-white uppercase font-bold">
                Archive Bag
              </h2>
              <span className="text-[9px] font-mono text-antique-champagne/60 mt-1 block uppercase">
                {cart.length} unique items logged
              </span>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-white/40 hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-6 px-6 scrollbar-none flex flex-col gap-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-3 opacity-30 py-20">
                <span className="font-label-caps text-[11px] tracking-[0.3em] block uppercase">Bag Canvas Vacant</span>
                <p className="font-body-lg text-[13px] max-w-xs leading-relaxed">No premium pieces have been pinned to your archive session streams yet.</p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="flex gap-4 border-b border-white/5 pb-6 last:border-none">
                  {/* Thumbnail frame view block */}
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
                      <div className="flex items-center border border-white/10 bg-black/20 h-7 text-[11px]">
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          className="w-7 text-white/40 hover:text-white transition-colors h-full font-mono cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono text-white select-none">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="w-7 text-white/40 hover:text-white transition-colors h-full font-mono cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="font-label-caps text-[9px] tracking-widest text-error/60 hover:text-error transition-colors uppercase bg-transparent border-none cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

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
                className="w-full bg-antique-champagne text-black text-center py-4 font-nav-link text-[11px] tracking-[0.25em] uppercase font-bold hover:bg-white transition-colors duration-300 flex justify-center items-center shadow-lg shadow-antique-champagne/5"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
