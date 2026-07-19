'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form input field state trackers
  const [shippingForm, setShippingForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    addressLine1: '', addressLine2: '', city: '', state: '', postalCode: '', country: 'Spain'
  });

  const shippingCost = cartTotal > 100 || cartTotal === 0 ? 0.00 : 15.00; // Free on orders over €100
  const finalTotal = cartTotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmission = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your archive bag is currently empty.");

    setIsSubmitting(true);
    
    const checkoutPayload = {
      customerName: `${shippingForm.firstName} ${shippingForm.lastName}`.trim(),
      customerEmail: shippingForm.email,
      phone: shippingForm.phone,
      addressLine1: shippingForm.addressLine1,
      addressLine2: shippingForm.addressLine2,
      city: shippingForm.city,
      state: shippingForm.state,
      postalCode: shippingForm.postalCode,
      country: shippingForm.country,
      items: cart,
      subtotal: cartTotal,
      shippingCost: shippingCost,
      totalAmount: finalTotal
    };

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutPayload)
      });
      const result = await res.json();

      if (result.success) {
        alert(` Order successfully submitted!`);
        clearCart();
        router.push('/');
      } else {
        alert(result.message || "Transaction rejected by core pipeline.");
      }
    } catch (err) {
      console.error("Order submission fault:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-matte-charcoal min-h-[70vh] flex flex-col items-center justify-center gap-4 text-white font-label-caps text-center px-4">
        <span className="text-[11px] tracking-[0.3em] text-white/30 uppercase">CHECKOUT CONTAINER CANVASES VACANT</span>
        <Link href="/products" className="text-antique-champagne text-[10px] tracking-widest border-b border-antique-champagne pb-1 uppercase">Return to Archive</Link>
      </div>
    );
  }

  return (
    <div className="bg-matte-charcoal min-h-screen text-white py-12 md:py-20 select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* LEFT COMPONENT COLUMN: MINIMALIST SHIPPING DISPATCH REGISTRATION SHEET */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <h2 className="font-display-hero text-[32px] md:text-[40px] uppercase tracking-tighter leading-none mb-2">Checkout Dispatch</h2>
            <span className="font-label-caps text-[10px] tracking-[0.25em] text-antique-champagne uppercase font-bold block">Secure encrypted database serialization</span>
          </div>

          <form onSubmit={handleOrderSubmission} className="flex flex-col gap-5 border-t border-white/5 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-caps text-[9px] tracking-widest text-white/40 uppercase">First Name</label>
                <input required type="text" name="firstName" value={shippingForm.firstName} onChange={handleInputChange} className="bg-black/40 border border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-antique-champagne font-body-lg" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-caps text-[9px] tracking-widest text-white/40 uppercase">Last Name</label>
                <input required type="text" name="lastName" value={shippingForm.lastName} onChange={handleInputChange} className="bg-black/40 border border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-antique-champagne font-body-lg" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-caps text-[9px] tracking-widest text-white/40 uppercase">Contact Email</label>
                <input required type="email" name="email" value={shippingForm.email} onChange={handleInputChange} className="bg-black/40 border border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-antique-champagne font-body-lg" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-caps text-[9px] tracking-widest text-white/40 uppercase">Phone Number</label>
                <input required type="tel" name="phone" value={shippingForm.phone} onChange={handleInputChange} className="bg-black/40 border border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-antique-champagne font-mono" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-caps text-[9px] tracking-widest text-white/40 uppercase">Delivery Address</label>
              <input required type="text" name="addressLine1" value={shippingForm.addressLine1} onChange={handleInputChange} placeholder="Street Name, Unit/Suite number..." className="bg-black/40 border border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-antique-champagne placeholder:text-white/10 font-body-lg" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-caps text-[9px] tracking-widest text-white/40 uppercase">Apartment, Building, Suite (Optional)</label>
              <input type="text" name="addressLine2" value={shippingForm.addressLine2} onChange={handleInputChange} className="bg-black/40 border border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-antique-champagne font-body-lg" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                <label className="font-label-caps text-[9px] tracking-widest text-white/40 uppercase">City</label>
                <input required type="text" name="city" value={shippingForm.city} onChange={handleInputChange} className="bg-black/40 border border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-antique-champagne font-body-lg" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-caps text-[9px] tracking-widest text-white/40 uppercase">State / Region</label>
                <input required type="text" name="state" value={shippingForm.state} onChange={handleInputChange} className="bg-black/40 border border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-antique-champagne font-body-lg" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-caps text-[9px] tracking-widest text-white/40 uppercase">Postal Code</label>
                <input required type="text" name="postalCode" value={shippingForm.postalCode} onChange={handleInputChange} className="bg-black/40 border border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-antique-champagne font-mono" />
              </div>
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full bg-antique-champagne text-black py-4 mt-4 font-nav-link text-[11px] tracking-[0.25em] uppercase font-bold hover:bg-white transition-colors duration-300 disabled:bg-white/20 disabled:text-white/40 cursor-pointer border-none shadow-lg shadow-antique-champagne/5">
              {isSubmitting ? "AUTHORIZING ORDER LEDGERS..." : "Place Cash On Delivery Order"}
            </button>
          </form>
        </div>

        {/* RIGHT COMPONENT COLUMN: INTERACTIVE STREAM ORDER SUMMARY MATRIX */}
        <div className="lg:col-span-5 bg-black/20 border border-white/5 p-6 md:p-8 flex flex-col h-fit">
          <h3 className="font-label-caps text-[11px] tracking-[0.2em] text-white uppercase font-bold border-b border-white/5 pb-4 mb-6">Archive Summary</h3>
          
          <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto scrollbar-none border-b border-white/5 pb-6">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                <div className="relative aspect-square w-12 bg-neutral-900 border border-white/10 overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-label-caps text-[10px] text-white uppercase tracking-wider truncate">{item.name}</h4>
                  <span className="text-[8px] font-label-caps tracking-widest text-white/40 block mt-0.5 uppercase">Size: {item.size} / Qty: {item.quantity}</span>
                </div>
                <span className="font-body-lg text-[13px] text-antique-champagne font-semibold whitespace-nowrap">
                  €{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <div className="flex justify-between items-baseline text-sm">
              <span className="font-label-caps text-[10px] tracking-widest text-white/40 uppercase">Items Total</span>
              <span className="font-body-lg text-[14px] text-white font-medium">€{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-baseline text-sm border-b border-white/5 pb-3">
              <span className="font-label-caps text-[10px] tracking-widest text-white/40 uppercase">Premium Logistics Delivery</span>
              <span className="font-body-lg text-[14px] text-white font-medium">
                {shippingCost === 0 ? "FREE" : `€${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-2">
              <span className="font-label-caps text-[12px] tracking-widest text-white uppercase font-bold">Total Amount Due</span>
              <span className="font-display-hero text-[22px] text-antique-champagne font-bold">€{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Injected style helper for scrollbar hiding */}
      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}