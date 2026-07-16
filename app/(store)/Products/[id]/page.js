import Image from "next/image";
import Link from "next/link";

export default function ProductDetails() {
    // Dummy related products to match the 'Noir Lux' product grid style
    const relatedProducts = [
        { id: 2, title: "Noir Minimalist Clutch", category: "Italian Calfskin", price: "€580.00" },
        { id: 3, title: "Forged Link Bracelet", category: "Volcanic Stone / Silver", price: "€310.00" },
        { id: 4, title: "Molten Drop Earrings", category: "Pure Silver", price: "€185.00" },
        { id: 5, title: "Fluid Band", category: "Industrial Finish", price: "€150.00" }
    ];

    return (
        <div className="bg-matte-charcoal min-h-screen text-on-surface font-body-lg pt-32 pb-section-gap">
            <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">

                {/* 2-Column Product Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-16 lg:gap-x-32 mb-section-gap">

                    {/* Left Column: Image Gallery (Sticky on Desktop) */}
                    <div className="relative">
                        <div className="sticky top-32 flex flex-col gap-6">
                            {/* Main Product Image Placeholder */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container border border-white/5 group">
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10"></div>
                                <div className="w-full h-full flex items-center justify-center opacity-30 transition-opacity duration-1000 group-hover:opacity-60">
                                    <span className="font-label-caps text-liquid-silver tracking-[0.3em] uppercase">Main Image</span>
                                </div>
                            </div>
                            {/* Thumbnails */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="relative aspect-square w-full overflow-hidden bg-surface-container border border-white/5">
                                    <div className="w-full h-full flex items-center justify-center opacity-20">
                                        <span className="font-label-caps text-liquid-silver tracking-[0.3em] uppercase text-[8px]">Detail 1</span>
                                    </div>
                                </div>
                                <div className="relative aspect-square w-full overflow-hidden bg-surface-container border border-white/5">
                                    <div className="w-full h-full flex items-center justify-center opacity-20">
                                        <span className="font-label-caps text-liquid-silver tracking-[0.3em] uppercase text-[8px]">Detail 2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="flex flex-col pt-10">
                        <nav className="mb-8">
                            <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase">
                                <Link href="/Products" className="hover:text-primary transition-colors">Collections</Link> / Silver Jewelry
                            </span>
                        </nav>

                        <h1 className="font-display-hero text-[48px] md:text-[64px] lg:text-[80px] leading-none tracking-tighter mb-6 uppercase">
                            Helix Ring No. 04
                        </h1>

                        <p className="font-body-lg text-primary text-2xl mb-10">€240.00</p>

                        <p className="font-body-lg text-on-surface/60 mb-12 leading-relaxed font-light">
                            A sculptural statement piece hand-forged from recycled sterling silver. Each curve captures the fluid motion of liquid metal, creating a dialogue between light and shadow.
                        </p>

                        {/* Add to Cart Button (Ghost Style) */}
                        <button className="w-full border border-antique-champagne py-5 mb-16 flex justify-center items-center group hover:bg-antique-champagne transition-all duration-300">
                            <span className="font-nav-link text-[11px] tracking-[0.2em] uppercase text-antique-champagne group-hover:text-black transition-colors duration-300">
                                Add To Archive
                            </span>
                        </button>

                        {/* Details Accordion / Sections */}
                        <div className="flex flex-col border-t border-white/10">
                            <div className="py-6 border-b border-white/10 flex flex-col gap-4 group cursor-pointer">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-label-caps text-[12px] tracking-[0.2em] text-white uppercase group-hover:text-antique-champagne transition-colors">Artisanal Process</h3>
                                    <span className="material-symbols-outlined text-white/40 group-hover:text-antique-champagne transition-colors">add</span>
                                </div>
                                <p className="font-body-lg text-[14px] text-on-surface/50 font-light pr-8">
                                    Every ring is individually forged by master craftsmen in our studio, ensuring that no two pieces are exactly alike.
                                </p>
                            </div>
                            <div className="py-6 border-b border-white/10 flex justify-between items-center group cursor-pointer">
                                <h3 className="font-label-caps text-[12px] tracking-[0.2em] text-white uppercase group-hover:text-antique-champagne transition-colors">Sustainable Luxury</h3>
                                <span className="material-symbols-outlined text-white/40 group-hover:text-antique-champagne transition-colors">add</span>
                            </div>
                            <div className="py-6 border-b border-white/10 flex justify-between items-center group cursor-pointer">
                                <h3 className="font-label-caps text-[12px] tracking-[0.2em] text-white uppercase group-hover:text-antique-champagne transition-colors">Shipping & Returns</h3>
                                <span className="material-symbols-outlined text-white/40 group-hover:text-antique-champagne transition-colors">add</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Pieces Grid */}
                <section className="pt-20 border-t border-glass-border">
                    <div className="flex justify-between items-end mb-16">
                        <h2 className="font-headline-md text-[32px] md:text-[40px] leading-none uppercase">Related Pieces</h2>
                        <Link href="/Products" className="font-nav-link text-[11px] tracking-[0.2em] uppercase text-on-surface/40 hover:text-primary transition-colors pb-2 border-b border-transparent hover:border-primary">
                            View All
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-gutter gap-y-16">
                        {relatedProducts.map((product) => (
                            <div key={product.id} className="flex flex-col group cursor-pointer">
                                <div className="relative aspect-[3/4] overflow-hidden bg-surface-container mb-stack-md border border-transparent hover:border-glass-border transition-colors duration-500">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="font-label-caps text-white/10 uppercase tracking-widest text-center px-4">
                                            Product Image
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-antique-champagne"></div>
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
                                        <button className="bg-white text-black font-nav-link px-8 py-3 text-[10px] uppercase tracking-[0.3em]">Quick View</button>
                                    </div>
                                </div>
                                <h3 className="font-label-caps text-[10px] uppercase tracking-[0.3em] text-on-surface mb-2">{product.title}</h3>
                                <div className="flex justify-between items-baseline">
                                    <p className="font-body-lg text-[14px] text-on-surface/40 italic">{product.category}</p>
                                    <p className="font-body-lg text-[14px] text-primary">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}