'use client';

import { useState, useEffect } from 'react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Receipt Invoice Modal Overlay Tracking States
  const [activeReceiptOrder, setActiveReceiptOrder] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const statusSequence = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];

  useEffect(() => {
    loadOrdersList();
  }, []);

  const loadOrdersList = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/orders');
      const result = await res.json();
      if (result.success) setOrders(result.data);
    } catch (err) {
      console.error("Order grid polling exception:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChangeDirect = async (id, targetStatus) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: targetStatus })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Fulfillment status synced smoothly to: ${targetStatus}`);
        loadOrdersList();
      }
    } catch (err) { 
      console.error("Fulfillment adjustment fault:", err); 
    }
  };

  const handleOpenReceiptModal = (order) => {
    setActiveReceiptOrder(order);
    setIsReceiptOpen(true);
  };

  const executeReceiptPrintSequence = () => {
    window.print();
  };

  return (
    <div className="bg-matte-charcoal min-h-screen text-white select-none w-full p-6 md:p-12 print:hidden">
      <div className="mb-10 border-b border-white/5 pb-6">
        <h2 className="font-display-hero text-[32px] md:text-[40px] uppercase tracking-tighter leading-none mb-1">Sales &amp; Incoming Orders</h2>
        <span className="font-label-caps text-[10px] tracking-[0.3em] text-antique-champagne uppercase font-bold">{orders.length} TOTAL SALES STREAM ENTRIES</span>
      </div>

      <div className="bg-neutral-950 border border-white/5 overflow-x-auto w-full">
        <div className="w-full min-w-[1200px]">
          {/* Main Grid Header Titles Row */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 bg-black/40 font-label-caps text-[10px] tracking-widest text-white/40 uppercase">
            <span className="col-span-1">Order #</span>
            <span className="col-span-2">Customer Client</span>
            <span className="col-span-4">Purchased Sub-Item Matrix Snapshot</span>
            <span className="col-span-2 text-right">Total Amount</span>
            <span className="col-span-2 text-center">Fulfillment Status</span>
            <span className="col-span-1 text-right">Invoice</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-white/30 font-mono text-[12px] tracking-widest uppercase">Querying Transaction Pools...</div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center text-white/20 font-mono text-[12px] tracking-widest uppercase">No Transaction Entries Logged</div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-white/5 hover:bg-white/5 transition-colors items-center font-body-lg text-[13px] text-white/80">
                <span className="col-span-1 font-mono font-bold text-white text-[14px]">#{order.order_number}</span>
                <div className="col-span-2 flex flex-col truncate pr-2">
                  <span className="font-bold text-white truncate">{order.customer_name}</span>
                  <span className="text-[10px] font-mono text-white/40 truncate">{order.customer_email}</span>
                </div>
                
                {/* Product Snapshot Layout Row List */}
                <div className="col-span-4 flex flex-col gap-1.5 max-h-[100px] overflow-y-auto pr-2 scrollbar-none">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="text-[12px] bg-black/20 p-2 border border-white/5 rounded flex justify-between items-center">
                      <span className="font-medium text-white/90 truncate max-w-[180px]">{item.name}</span>
                      <span className="font-mono text-[9px] text-antique-champagne/80 font-semibold bg-white/5 px-2 py-0.5">
                        {item.color} / FIT {item.size} × {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <span className="col-span-2 text-right font-mono font-bold text-[14px] text-primary">€{parseFloat(order.total_amount).toFixed(2)}</span>
                
                {/* 🚀 SELECTABLE FULFILLMENT SELECTOR STATUS BOX */}
                <div className="col-span-2 flex justify-center px-2">
                  <select
                    value={order.order_status}
                    onChange={(e) => handleStatusChangeDirect(order.id, e.target.value)}
                    className={`w-full max-w-[140px] px-3 py-2 rounded font-label-caps text-[10px] tracking-wider font-bold bg-neutral-900 border focus:outline-none transition-all cursor-pointer ${
                      order.order_status === 'PENDING' ? 'border-error/40 text-error' :
                      order.order_status === 'PROCESSING' ? 'border-antique-champagne text-antique-champagne' :
                      order.order_status === 'SHIPPED' ? 'border-blue-400 text-blue-400' :
                      'border-green-400 text-green-400 bg-green-400/5'
                    }`}
                  >
                    {statusSequence.map(status => (
                      <option key={status} value={status} className="bg-neutral-950 text-white font-label-caps">{status}</option>
                    ))}
                  </select>
                </div>

                {/* 🚀 INTERACTIVE RECEIPT MODAL LAUNCH ACTION BUTTON */}
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleOpenReceiptModal(order)}
                    className="border border-white/10 hover:border-antique-champagne px-3 py-1.5 font-label-caps text-[9px] tracking-widest text-white/60 hover:text-antique-champagne transition-all bg-transparent cursor-pointer flex items-center gap-1 focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                    <span>VIEW</span>
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

      {/* ── LUXURY BRANDED DIGITAL INVOICE RECEIPT MODAL OVERLAY ── */}
      {isReceiptOpen && activeReceiptOrder && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[200] flex items-center justify-center p-4 overflow-y-auto print:absolute print:inset-0 print:bg-white print:text-black print:p-0 print:m-0">
          
          <div className="bg-neutral-950 border border-white/10 w-full max-w-2xl p-8 flex flex-col gap-6 shadow-2xl relative animate-fadeIn print:border-none print:bg-white print:p-0 print:shadow-none print:w-full print:text-black">
            
            {/* Branded Receipt Title Header Section */}
            <div className="flex justify-between items-start border-b border-white/10 pb-6 print:border-black/10">
              <div>
                <h1 className="font-headline-md text-[28px] uppercase tracking-[0.2em] text-white leading-none mb-1.5 print:text-black">
                  SHOMICORE
                </h1>
                <span className="font-label-caps text-[9px] tracking-[0.25em] text-antique-champagne font-bold block uppercase print:text-neutral-500">
                  PREMIUM LUXURY ARCHIVE INVOICE
                </span>
              </div>
              <div className="text-right flex flex-col font-mono text-[11px] text-white/50 print:text-neutral-600 gap-0.5">
                <span className="text-white font-bold text-[13px] print:text-black uppercase tracking-wider font-label-caps">Receipt Ledger</span>
                <span>Order Reference: #{activeReceiptOrder.order_number}</span>
                <span>Date: {new Date(activeReceiptOrder.created_at).toLocaleDateString('es-ES')}</span>
              </div>
            </div>

            {/* Client Metadata Mapping Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-black/30 border border-white/5 p-4 rounded print:bg-transparent print:border-black/5 print:text-black">
              <div className="flex flex-col gap-1">
                <span className="font-label-caps text-[8px] tracking-widest text-white/30 uppercase print:text-neutral-400">Shipment Destinee</span>
                <span className="font-bold text-[14px] text-white print:text-black">{activeReceiptOrder.customer_name}</span>
                <span className="text-[12px] text-white/70 print:text-neutral-700 font-mono mt-0.5">{activeReceiptOrder.phone}</span>
                <span className="text-[12px] text-white/50 print:text-neutral-500 font-mono truncate">{activeReceiptOrder.customer_email}</span>
              </div>
              <div className="flex flex-col gap-1 font-body-lg text-[13px] text-white/70 print:text-neutral-700">
                <span className="font-label-caps text-[8px] tracking-widest text-white/30 uppercase block mb-0.5 print:text-neutral-400">Logistic Destination</span>
                <p className="leading-tight">{activeReceiptOrder.address_line1}</p>
                {activeReceiptOrder.address_line2 && <p className="leading-tight mt-0.5">{activeReceiptOrder.address_line2}</p>}
                <p className="mt-1 font-mono text-[12px] text-white/90 print:text-black font-semibold">
                  {activeReceiptOrder.postal_code} — {activeReceiptOrder.city?.toUpperCase()}, {activeReceiptOrder.state?.toUpperCase()}
                  {activeReceiptOrder.country || 'ESPAÑA'}
                </p>
              </div>
            </div>

            {/* Itemized Grid Layout Rows */}
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-12 gap-2 border-b border-white/10 pb-2 print:border-black/10">
                <span className="col-span-7 font-label-caps text-[8px] tracking-widest text-white/30 uppercase print:text-neutral-400">Specification Item Description</span>
                <span className="col-span-2 font-label-caps text-[8px] tracking-widest text-white/30 uppercase text-center print:text-neutral-400">Qty</span>
                <span className="col-span-3 font-label-caps text-[8px] tracking-widest text-white/30 uppercase text-right print:text-neutral-400">Row Total</span>
              </div>
              
              {activeReceiptOrder.items?.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center border-b border-white/5 pb-2 print:border-black/5">
                  <div className="col-span-7 flex flex-col">
                    <span className="font-bold text-[13px] text-white print:text-black">{item.name}</span>
                    <span className="text-[10px] text-white/50 print:text-neutral-500 font-mono">Hue Variant: {item.color} / fit scale: {item.size}</span>
                  </div>
                  <span className="col-span-2 text-center font-mono text-[13px] text-white/80 print:text-black">×{item.quantity}</span>
                  <span className="col-span-3 text-right font-mono font-bold text-[14px] text-antique-champagne print:text-black">
                    €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Balance Calculations Segment */}
            <div className="border-t border-white/10 pt-4 flex flex-col gap-2 print:border-black/10">
              <div className="flex justify-between text-[13px]">
                <span className="text-white/50 print:text-neutral-500">Catalog Subtotal</span>
                <span className="font-mono text-white print:text-black">€{parseFloat(activeReceiptOrder.subtotal || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[13px] border-b border-white/5 pb-2 print:border-black/5">
                <span className="text-white/50 print:text-neutral-500">Premium Delivery</span>
                <span className="font-mono text-white print:text-black">
                  {parseFloat(activeReceiptOrder.shipping_cost || 0) === 0 ? "FREE" : `€${parseFloat(activeReceiptOrder.shipping_cost).toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-[18px] font-bold pt-2">
                <span className="text-white print:text-black">Balance Due</span>
                <span className="font-mono text-antique-champagne print:text-black">€{parseFloat(activeReceiptOrder.total_amount || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-end text-[11px] text-white/40 print:text-neutral-400 font-label-caps tracking-widest uppercase">
                Payment: Cash On Delivery
              </div>
            </div>

            {/* Print & Dismiss Modal Buttons Control Tray */}
            <div className="flex justify-end gap-4 pt-4 border-t border-white/10 print:hidden">
              <button
                type="button"
                onClick={() => { setIsReceiptOpen(false); setActiveReceiptOrder(null); }}
                className="px-6 py-2.5 border border-white/10 text-white font-nav-link text-[10px] tracking-widest uppercase hover:bg-white/5 cursor-pointer bg-transparent focus:outline-none transition-colors"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={executeReceiptPrintSequence}
                className="px-6 py-2.5 bg-antique-champagne text-black font-nav-link text-[10px] tracking-widest uppercase hover:bg-white transition-colors cursor-pointer focus:outline-none"
              >
                Print Ledger
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Injected style helper for scrollbar hiding and print */}
      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        
        @media print {
          body * { visibility: hidden; }
          .print\\:absolute { visibility: visible !important; }
          .print\\:absolute * { visibility: visible !important; }
        }
      `}</style>
    </div>
  );
}