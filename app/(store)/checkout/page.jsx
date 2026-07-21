'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { motion } from 'framer-motion';
export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🚀 ACTIVE SELECTION TRACKER: Hardlocks to WhatsApp by default
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('whatsapp');

  // Form input field state trackers
  const [shippingForm, setShippingForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    addressLine1: '', addressLine2: '', city: '', state: '', postalCode: '', country: 'Spain'
  });

  const shippingCost = cartTotal > 100 || cartTotal === 0 ? 0.00 : 15.00;
  const finalTotal = cartTotal + shippingCost;

  // FIXED: Correct input value handler template assignment mapping
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
  };

  // 🚀 WHATSAPP CART INVOICE ENCODER ENGINE
  const handleWhatsAppOrderDispatch = () => {
    const businessPhoneNumber = "923085266965"; // Your operational brand number
    
    // 1. Unpack and itemize all product row array variants from the cart
    const itemsListString = cart.map((item, idx) => 
      `   ${idx + 1}. *${item.name}*\n` +
      `      🔹 Variant/Hue: ${item.color}\n` +
      `      🔹 Size/Fit: ${item.size}\n` +
      `      🔹 Quantity: ${item.quantity}x\n` +
      `      🔹 Subtotal: €${(item.price * item.quantity).toFixed(2)}`
    ).join('\n\n');

    // 2. Format delivery routing strings
    const customerName = `${shippingForm.firstName} ${shippingForm.lastName}`.trim();
    const fullAddress = `${shippingForm.addressLine1}${shippingForm.addressLine2 ? `, ${shippingForm.addressLine2}` : ''}, ${shippingForm.city}, ${shippingForm.state}, ${shippingForm.postalCode}, ${shippingForm.country}`;

    // 3. Compose clean, luxury-branded English ledger message
    const rawInvoiceText = 
`⚜️ *SHOMICORE NEW ORDER DISPATCH* ⚜️

👤 *Customer Details:*
   Name: ${customerName}
   Email: ${shippingForm.email}
   Phone: ${shippingForm.phone}

📦 *Itemized Archive Inventory Snapshot:*
${itemsListString}

──────────────────────
💵 *Financial Statement Summary:*
   Bag Subtotal: €${cartTotal.toFixed(2)}
   Premium Delivery: ${shippingCost === 0 ? "FREE" : `€${shippingCost.toFixed(2)}`}
   *Total Amount Due:* €${finalTotal.toFixed(2)}
   Payment Strategy: WhatsApp Cash On Delivery Checkout

📍 *Logistics Routing Coordinates:*
   ${fullAddress}

Thank you for choosing Shomicore. Please verify this draft to log your order into our system channels instantly.`;

    // 4. Safe network string URI character conversion
    const encodedInvoice = encodeURIComponent(rawInvoiceText);
    const destinationUrl = `https://wa.me/03010544620?text=${encodedInvoice}`;
    
    window.open(destinationUrl, '_blank');
  };

  // Core background database log synchronization pipeline
  const handleOrderSubmission = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your archive bag is currently vacant.");
    
    if (selectedPaymentMethod !== 'whatsapp') {
      return alert("The selected processing channel is temporarily unavailable.");
    }

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
      // 1. Log the transaction into your Neon database tables for admin tracking rows
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutPayload)
      });
      const result = await res.json();

      if (result.success) {
        // 2. If the data commits successfully to PostgreSQL, trigger the WhatsApp invoice overlay string
        alert("Your order has been successfully logged. You will now be redirected to WhatsApp to finalize the checkout.");
        handleWhatsAppOrderDispatch();
        clearCart();
        router.push('/'); 
      } else {
        alert(result.message || "Pipeline serialization error.");
      }
    } catch (err) {
      console.error(err);
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
        
{/* LEFT COMPONENT COLUMN */}
<motion.div 
  initial="hidden"
  animate="show"
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }}
  className="lg:col-span-7 flex flex-col gap-8 select-none text-white bg-black px-4 sm:px-6 md:px-8 py-6 md:py-8"
>
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 15 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    }}
    className="relative"
  >
    {/* DECORATIVE LINE ACCENT */}
    <div className="absolute -top-4 left-0 w-12 h-0.5 bg-antique-champagne/30" />
    
    <h2 className="font-display-hero text-[28px] sm:text-[32px] md:text-[40px] uppercase tracking-tighter leading-none mb-2 text-white">
      Checkout Dispatch
    </h2>
    <span className="font-label-caps text-[9px] sm:text-[10px] tracking-[0.25em] text-antique-champagne uppercase font-bold block">
      Secure encrypted database serialization
    </span>
  </motion.div>

  <form onSubmit={handleOrderSubmission} className="flex flex-col gap-5 border-t border-white/5 pt-6">
    
    {/* Row 1: Name Fields */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className="flex flex-col gap-1.5 group"
      >
        <label className="font-label-caps text-[10px] tracking-widest text-white/50 uppercase font-semibold pl-0.5 group-focus-within:text-antique-champagne transition-colors duration-300">
          First Name
        </label>
        <input 
          required 
          type="text" 
          name="firstName" 
          value={shippingForm.firstName} 
          onChange={handleInputChange} 
          className="bg-neutral-900/40 border border-white/10 p-3.5 text-[13px] text-white focus:outline-none focus:border-antique-champagne focus:bg-neutral-900/80 focus:shadow-[0_0_20px_-10px_rgba(230,187,119,0.2)] transition-all duration-300 font-body-lg rounded-none w-full placeholder:text-white/20 hover:border-white/20" 
          placeholder="John"
        />
      </motion.div>
      
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className="flex flex-col gap-1.5 group"
      >
        <label className="font-label-caps text-[10px] tracking-widest text-white/50 uppercase font-semibold pl-0.5 group-focus-within:text-antique-champagne transition-colors duration-300">
          Last Name
        </label>
        <input 
          required 
          type="text" 
          name="lastName" 
          value={shippingForm.lastName} 
          onChange={handleInputChange} 
          className="bg-neutral-900/40 border border-white/10 p-3.5 text-[13px] text-white focus:outline-none focus:border-antique-champagne focus:bg-neutral-900/80 focus:shadow-[0_0_20px_-10px_rgba(230,187,119,0.2)] transition-all duration-300 font-body-lg rounded-none w-full placeholder:text-white/20 hover:border-white/20" 
          placeholder="Doe"
        />
      </motion.div>
    </div>

    {/* Row 2: Contact Fields */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className="flex flex-col gap-1.5 group"
      >
        <label className="font-label-caps text-[10px] tracking-widest text-white/50 uppercase font-semibold pl-0.5 group-focus-within:text-antique-champagne transition-colors duration-300">
          Contact Email
        </label>
        <input 
          required 
          type="email" 
          name="email" 
          value={shippingForm.email} 
          onChange={handleInputChange} 
          className="bg-neutral-900/40 border border-white/10 p-3.5 text-[13px] text-white focus:outline-none focus:border-antique-champagne focus:bg-neutral-900/80 focus:shadow-[0_0_20px_-10px_rgba(230,187,119,0.2)] transition-all duration-300 font-body-lg rounded-none w-full placeholder:text-white/20 hover:border-white/20" 
          placeholder="john@example.com"
        />
      </motion.div>
      
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className="flex flex-col gap-1.5 group"
      >
        <label className="font-label-caps text-[10px] tracking-widest text-white/50 uppercase font-semibold pl-0.5 group-focus-within:text-antique-champagne transition-colors duration-300">
          Phone Number
        </label>
        <input 
          required 
          type="tel" 
          name="phone" 
          value={shippingForm.phone} 
          onChange={handleInputChange} 
          className="bg-neutral-900/40 border border-white/10 p-3.5 text-[13px] text-white focus:outline-none focus:border-antique-champagne focus:bg-neutral-900/80 focus:shadow-[0_0_20px_-10px_rgba(230,187,119,0.2)] transition-all duration-300 font-mono rounded-none w-full placeholder:text-white/20 hover:border-white/20" 
          placeholder="+92 300 1234567"
        />
      </motion.div>
    </div>

    {/* Row 3: Main Address Line */}
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className="flex flex-col gap-1.5 group"
    >
      <label className="font-label-caps text-[10px] tracking-widest text-white/50 uppercase font-semibold pl-0.5 group-focus-within:text-antique-champagne transition-colors duration-300">
        Delivery Address
      </label>
      <input 
        required 
        type="text" 
        name="addressLine1" 
        value={shippingForm.addressLine1} 
        onChange={handleInputChange} 
        placeholder="Street Name, Unit/Suite number..." 
        className="bg-neutral-900/40 border border-white/10 p-3.5 text-[13px] text-white focus:outline-none focus:border-antique-champagne focus:bg-neutral-900/80 focus:shadow-[0_0_20px_-10px_rgba(230,187,119,0.2)] transition-all duration-300 placeholder:text-white/10 font-body-lg rounded-none w-full hover:border-white/20" 
      />
    </motion.div>

    {/* Row 4: Secondary Address Line */}
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className="flex flex-col gap-1.5 group"
    >
      <label className="font-label-caps text-[10px] tracking-widest text-white/50 uppercase font-semibold pl-0.5 group-focus-within:text-antique-champagne transition-colors duration-300">
        Apartment, Building, Suite <span className="text-white/30">(Optional)</span>
      </label>
      <input 
        type="text" 
        name="addressLine2" 
        value={shippingForm.addressLine2} 
        onChange={handleInputChange} 
        className="bg-neutral-900/40 border border-white/10 p-3.5 text-[13px] text-white focus:outline-none focus:border-antique-champagne focus:bg-neutral-900/80 focus:shadow-[0_0_20px_-10px_rgba(230,187,119,0.2)] transition-all duration-300 font-body-lg rounded-none w-full placeholder:text-white/20 hover:border-white/20" 
        placeholder="Apartment 4B, Floor 2"
      />
    </motion.div>

    {/* Row 5: Regional Grid Locations */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className="flex flex-col gap-1.5 col-span-2 sm:col-span-1 group"
      >
        <label className="font-label-caps text-[10px] tracking-widest text-white/50 uppercase font-semibold pl-0.5 group-focus-within:text-antique-champagne transition-colors duration-300">
          City
        </label>
        <input 
          required 
          type="text" 
          name="city" 
          value={shippingForm.city} 
          onChange={handleInputChange} 
          className="bg-neutral-900/40 border border-white/10 p-3.5 text-[13px] text-white focus:outline-none focus:border-antique-champagne focus:bg-neutral-900/80 focus:shadow-[0_0_20px_-10px_rgba(230,187,119,0.2)] transition-all duration-300 font-body-lg rounded-none w-full placeholder:text-white/20 hover:border-white/20" 
          placeholder="New York"
        />
      </motion.div>
      
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className="flex flex-col gap-1.5 group"
      >
        <label className="font-label-caps text-[10px] tracking-widest text-white/50 uppercase font-semibold pl-0.5 group-focus-within:text-antique-champagne transition-colors duration-300">
          State / Region
        </label>
        <input 
          required 
          type="text" 
          name="state" 
          value={shippingForm.state} 
          onChange={handleInputChange} 
          className="bg-neutral-900/40 border border-white/10 p-3.5 text-[13px] text-white focus:outline-none focus:border-antique-champagne focus:bg-neutral-900/80 focus:shadow-[0_0_20px_-10px_rgba(230,187,119,0.2)] transition-all duration-300 font-body-lg rounded-none w-full placeholder:text-white/20 hover:border-white/20" 
          placeholder="NY"
        />
      </motion.div>
      
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className="flex flex-col gap-1.5 group"
      >
        <label className="font-label-caps text-[10px] tracking-widest text-white/50 uppercase font-semibold pl-0.5 group-focus-within:text-antique-champagne transition-colors duration-300">
          Postal Code
        </label>
        <input 
          required 
          type="text" 
          name="postalCode" 
          value={shippingForm.postalCode} 
          onChange={handleInputChange} 
          className="bg-neutral-900/40 border border-white/10 p-3.5 text-[13px] text-white focus:outline-none focus:border-antique-champagne focus:bg-neutral-900/80 focus:shadow-[0_0_20px_-10px_rgba(230,187,119,0.2)] transition-all duration-300 font-mono rounded-none w-full placeholder:text-white/20 hover:border-white/20" 
          placeholder="10001"
        />
      </motion.div>
    </div>

    {/* LUXURY GATEWAY SELECTOR */}
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      className="flex flex-col gap-4 mt-4 border-t border-white/5 pt-6"
    >
      <label className="font-label-caps text-[10px] tracking-widest text-white/40 uppercase mb-1 block select-none">
        Select Premium Settlement Strategy
      </label>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Method 1: WhatsApp Checkout - Active */}
        <motion.button
          key="whatsapp-method"
          type="button"
          onClick={() => setSelectedPaymentMethod('whatsapp')}
          whileHover={{ y: -3, borderColor: "rgba(230,187,119,0.5)" }}
          whileTap={{ scale: 0.97 }}
          animate={{
            borderColor: selectedPaymentMethod === 'whatsapp' ? "rgba(230,187,119,1)" : "rgba(255,255,255,0.08)",
            backgroundColor: selectedPaymentMethod === 'whatsapp' ? "rgba(230,187,119,0.08)" : "rgba(255,255,255,0.02)"
          }}
          transition={{ duration: 0.3 }}
          className="p-4 border flex flex-col items-start text-left group/gate relative cursor-pointer focus:outline-none rounded-sm w-full block hover:border-antique-champagne/30"
        >
          {selectedPaymentMethod === 'whatsapp' && (
            <motion.div 
              layoutId="paymentActive"
              className="absolute inset-0 bg-antique-champagne/5"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <div className="relative z-10 w-full">
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] font-bold tracking-wider uppercase text-white/80 flex items-center gap-2">
                <svg className="w-4 h-4 text-antique-champagne" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.133-1.346a9.946 9.946 0 0 0 4.873 1.277h.005c5.505 0 9.99-4.477 9.99-9.985C22.004 6.478 17.519 2 12.012 2zm5.836 14.166c-.24.674-1.398 1.285-1.922 1.344-.457.05-1.055.078-1.696-.125-.403-.127-.923-.314-1.573-.595-2.76-1.194-4.545-4.004-4.682-4.188-.136-.184-1.114-1.482-1.114-2.827 0-1.346.702-2.008.952-2.262.25-.255.55-.319.734-.319h.523c.165 0 .388-.063.606.462.224.54.767 1.865.833 1.996.066.13.11.283.022.463-.087.18-.13.29-.261.442-.131.152-.275.339-.392.455-.13.13-.267.271-.115.532.152.26.677 1.115 1.452 1.807.997.89 1.835 1.165 2.096 1.295.26.13.413.11.566-.065.152-.174.654-.761.828-1.02.174-.26.348-.218.587-.13.24.087 1.523.718 1.785.848.26.13.435.196.499.305.066.11.066.63-.174 1.304z"/>
                </svg>
                WhatsApp Link
              </span>
              {selectedPaymentMethod === 'whatsapp' && (
                <span className="text-[8px] text-antique-champagne font-bold tracking-widest uppercase bg-antique-champagne/10 px-2 py-0.5 border border-antique-champagne/20">
                  Active
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2.5">
              <div className={`w-1.5 h-1.5 rounded-full ${selectedPaymentMethod === 'whatsapp' ? 'bg-antique-champagne shadow-[0_0_10px_rgba(230,187,119,0.3)]' : 'bg-white/10'}`} />
              <span className="text-[11px] text-white/40 leading-relaxed">Transmit invoice ledgers to chat channel instantly.</span>
            </div>
          </div>
        </motion.button>

        {/* Method 2: Credit Card - Disabled */}
        <motion.button
          key="credit-method"
          type="button"
          onClick={() => setSelectedPaymentMethod('credit')}
          whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.97 }}
          animate={{
            borderColor: selectedPaymentMethod === 'credit' ? "rgba(230,187,119,0.6)" : "rgba(255,255,255,0.08)",
            backgroundColor: selectedPaymentMethod === 'credit' ? "rgba(230,187,119,0.05)" : "rgba(255,255,255,0.02)"
          }}
          transition={{ duration: 0.3 }}
          className="p-4 border flex flex-col items-start text-left group/gate relative cursor-pointer focus:outline-none rounded-sm w-full block opacity-60 hover:opacity-80 transition-opacity"
        >
          <div className="relative z-10 w-full">
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] font-bold tracking-wider uppercase text-white/60 flex items-center gap-2">
                <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
                Credit / Debit
              </span>
              <span className="text-[8px] text-antique-champagne/40 font-bold tracking-widest uppercase bg-white/5 px-2 py-0.5 border border-white/5">
                Soon
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2.5">
              <span className="text-[11px] text-white/30 leading-relaxed">Secure payment gateway integrations pending activation.</span>
            </div>
          </div>
        </motion.button>

        {/* Method 3: COD - Disabled */}
        <motion.button
          key="cod-method"
          type="button"
          onClick={() => setSelectedPaymentMethod('cod')}
          whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.97 }}
          animate={{
            borderColor: selectedPaymentMethod === 'cod' ? "rgba(230,187,119,0.6)" : "rgba(255,255,255,0.08)",
            backgroundColor: selectedPaymentMethod === 'cod' ? "rgba(230,187,119,0.05)" : "rgba(255,255,255,0.02)"
          }}
          transition={{ duration: 0.3 }}
          className="p-4 border flex flex-col items-start text-left group/gate relative cursor-pointer focus:outline-none rounded-sm w-full block opacity-60 hover:opacity-80 transition-opacity"
        >
          <div className="relative z-10 w-full">
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] font-bold tracking-wider uppercase text-white/60 flex items-center gap-2">
                <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Standard COD
              </span>
              <span className="text-[8px] text-antique-champagne/40 font-bold tracking-widest uppercase bg-white/5 px-2 py-0.5 border border-white/5">
                Soon
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2.5">
              <span className="text-[11px] text-white/30 leading-relaxed">Direct home terminal collection routes currently locked.</span>
            </div>
          </div>
        </motion.button>
      </div>
    </motion.div>

    {/* Master Form Trigger Submit Button */}
    <motion.button
      disabled={isSubmitting}
      type="submit"
      whileHover={!isSubmitting ? { scale: 1.01, boxShadow: "0 0 40px -10px rgba(230,187,119,0.2)" } : {}}
      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
      className="w-full bg-antique-champagne text-black py-4.5 mt-2 font-nav-link text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-bold disabled:bg-white/10 disabled:text-white/30 cursor-pointer border-none shadow-lg shadow-antique-champagne/10 hover:shadow-antique-champagne/20 transition-all duration-300 relative overflow-hidden rounded-none group"
    >
      {/* HOVER OVERLAY EFFECT */}
      <motion.span
        variants={{ hover: { y: "0%" } }}
        initial={{ y: "101%" }}
        whileHover={!isSubmitting ? "hover" : {}}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-white/10 z-0"
      />
      
      {/* LOADING SPINNER */}
      {isSubmitting && (
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-black/20 border-t-black rounded-full"
        />
      )}
      
      <span className="relative z-10 flex items-center justify-center gap-3">
        {isSubmitting ? (
          "SERIALIZING ARCHIVE TRANSACTIONS..."
        ) : (
          <>
            Complete & Open Invoice on WhatsApp
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </>
        )}
      </span>
    </motion.button>

    {/* SECURITY BADGE */}
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex items-center justify-center gap-2 mt-4 text-[10px] text-white/20 font-medium"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <span>Your information is encrypted and secure</span>
    </motion.div>

  </form>
</motion.div>


     {/* RIGHT COMPONENT COLUMN: INTERACTIVE STREAM ORDER SUMMARY MATRIX */}
<motion.div 
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-5% 0px" }}
  variants={{
    hidden: { opacity: 0, x: 20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1], 
        staggerChildren: 0.05, 
        delayChildren: 0.1 
      }
    }
  }}
  className="lg:col-span-5 bg-neutral-950/40 border border-white/5 p-6 md:p-8 flex flex-col h-fit select-none"
>
  <motion.h3 
    variants={{
      hidden: { opacity: 0, y: -10 },
      show: { opacity: 1, y: 0 }
    }}
    className="font-label-caps text-xs md:text-[13px] tracking-[0.25em] text-white uppercase font-bold border-b border-white/5 pb-4 mb-6 text-left"
  >
    Archive Summary
  </motion.h3>
  
  {/* Dynamic Logs Track Scroll Area */}
  <div className="flex flex-col gap-5 max-h-[380px] overflow-y-auto scrollbar-none border-b border-white/5 pb-6">
    {cart.map((item, index) => (
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 12 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
        }}
        key={`${item.id}-${item.size}-${index}`} 
        className="flex gap-4 items-center w-full"
      >
        {/* Upscaled high-fidelity thumbnail profile casing */}
        <div className="relative aspect-square w-14 bg-neutral-900 border border-white/10 overflow-hidden flex-shrink-0 shadow-xl">
          <Image 
            src={item.image} 
            alt={item.name} 
            fill
            sizes="56px"
            className="object-cover transition-transform duration-500 hover:scale-105" 
          />
        </div>
        
        <div className="flex-1 min-w-0 pr-2 text-left">
          <h4 className="font-label-caps text-[11px] md:text-xs text-white uppercase tracking-wider truncate font-semibold">
            {item.name}
          </h4>
          <span className="text-[9px] font-label-caps tracking-widest text-white/40 block mt-1 uppercase font-medium">
            Size: <span className="font-mono text-white/70">{item.size}</span> &nbsp;/&nbsp; Qty: <span className="font-mono text-white/70">{item.quantity}</span>
          </span>
        </div>
        
        <span className="font-body-lg text-sm md:text-base text-antique-champagne font-bold whitespace-nowrap select-text">
          €{(item.price * item.quantity).toFixed(2)}
        </span>
      </motion.div>
    ))}
  </div>

  {/* Financial Cost Ledger Sheet */}
  <motion.div 
    variants={{
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } }
    }}
    className="flex flex-col gap-3.5 pt-6 text-left"
  >
    <div className="flex justify-between items-baseline">
      <span className="font-label-caps text-[10px] md:text-[11px] tracking-widest text-white/40 uppercase">
        Items Total
      </span>
      <span className="font-body-lg text-[15px] text-white font-medium select-text">
        €{cartTotal.toFixed(2)}
      </span>
    </div>
    
    <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
      <span className="font-label-caps text-[10px] md:text-[11px] tracking-widest text-white/40 uppercase">
        Premium Logistics Delivery
      </span>
      <span className={`font-body-lg text-[14px] font-semibold select-text ${shippingCost === 0 ? 'text-emerald-400 font-mono tracking-widest text-xs' : 'text-white'}`}>
        {shippingCost === 0 ? "FREE" : `€${shippingCost.toFixed(2)}`}
      </span>
    </div>
    
    <div className="flex justify-between items-baseline pt-3">
      <span className="font-label-caps text-[12px] md:text-[13px] tracking-widest text-white uppercase font-bold">
        Total Amount Due
      </span>
      <motion.span 
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="font-display-hero text-[24px] md:text-[26px] text-antique-champagne font-bold select-text tracking-wide"
      >
        €{finalTotal.toFixed(2)}
      </motion.span>
    </div>
  </motion.div>
</motion.div>

      </div>

      {/* Injected style helper for scrollbar hiding */}
      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}