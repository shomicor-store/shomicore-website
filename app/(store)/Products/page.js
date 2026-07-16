"use client "
import Image from "next/image";

import Link from "next/link"
export default function ProductPage() {
    const dummyProducts = [
        { id: 1, title: "Helix Ring", category: "Sterling Silver", price: "$420" },
        { id: 2, title: "Monolith Wallet", category: "Italian Calfskin", price: "$280" },
        { id: 3, title: "Obsidian Link", category: "Volcanic Stone / Silver", price: "$650" },
        { id: 4, title: "Forged Studs", category: "Pure Silver", price: "$195" },
        { id: 5, title: "Brutalist Cuff", category: "Industrial Finish", price: "$580" },
        { id: 6, title: "Etched Clip", category: "Matte Silver", price: "$150" },
    ];

    return (
        <div className="bg-matte-charcoal min-h-screen text-on-surface font-body-lg">
            {/* <!-- Hero Content --> */}
            <header className="pt-40 pb-20 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-baseline gap-4 mb-20">
                    <h1 className="font-display-hero text-[80px] leading-none tracking-tighter uppercase">The Archive</h1>
                    <span className="font-label-caps text-[10px] tracking-[0.3em] text-antique-champagne">EST. 2024 / EDITION 01</span>
                </div>

                {/* <!-- Editorial Category Entry Points --> */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter h-auto md:h-[716px]">
                    {/* <!-- Silver Jewelry --> */}
                    <div className="relative group overflow-hidden cursor-pointer h-[400px] md:h-full bg-surface-container-low border border-white/5">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10"></div>
                        <div className="w-full h-full flex items-center justify-center opacity-30 transition-opacity duration-1000 group-hover:opacity-60">
                            <span className="font-label-caps text-liquid-silver tracking-[0.3em] uppercase">Category Image</span>
                        </div>
                        <div className="absolute bottom-10 left-10 z-20">
                            <h2 className="font-headline-md text-[32px] text-white mb-2">SILVER JEWELRY</h2>
                            <p className="font-label-caps text-[10px] tracking-[0.3em] text-white/60">Forged &amp; Sculpted</p>
                        </div>
                        <div className="absolute top-10 right-10 z-20">
                            <span className="font-display-hero text-white/5 text-4xl uppercase">Artisanal</span>
                        </div>
                    </div>

                    {/* <!-- Artificial Jewelry --> */}
                    <div className="relative group overflow-hidden cursor-pointer h-[400px] md:h-full md:translate-y-12 bg-surface-container-low border border-white/5">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10"></div>
                        <div className="w-full h-full flex items-center justify-center opacity-30 transition-opacity duration-1000 group-hover:opacity-60">
                            <span className="font-label-caps text-liquid-silver tracking-[0.3em] uppercase">Category Image</span>
                        </div>
                        <div className="absolute bottom-10 left-10 z-20">
                            <h2 className="font-headline-md text-[32px] text-white mb-2">ARTIFICIAL</h2>
                            <p className="font-label-caps text-[10px] tracking-[0.3em] text-white/60">Avant-Garde Selection</p>
                        </div>
                    </div>

                    {/* <!-- Leather Products --> */}
                    <div className="relative group overflow-hidden cursor-pointer h-[400px] md:h-full bg-surface-container-low border border-white/5">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10"></div>
                        <div className="w-full h-full flex items-center justify-center opacity-30 transition-opacity duration-1000 group-hover:opacity-60">
                            <span className="font-label-caps text-liquid-silver tracking-[0.3em] uppercase">Category Image</span>
                        </div>
                        <div className="absolute bottom-10 left-10 z-20">
                            <h2 className="font-headline-md text-[32px] text-white mb-2">LEATHER</h2>
                            <p className="font-label-caps text-[10px] tracking-[0.3em] text-white/60">Hand-Stitched Essentials</p>
                        </div>
                        <div className="absolute bottom-10 right-10 z-20">
                            <span className="font-display-hero text-white/5 text-4xl uppercase">Craft</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* <!-- Floating Filter Bar --> */}
            <section className="sticky top-0 md:top-24 z-40 px-margin-mobile md:px-margin-desktop py-8 bg-matte-charcoal/95 backdrop-blur-md border-y border-glass-border">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 md:gap-10">
                        <div className="group cursor-pointer">
                            <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 group-hover:text-on-surface transition-colors">MATERIAL: ALL</span>
                            <div className="h-px w-0 group-hover:w-full bg-antique-champagne transition-all duration-300"></div>
                        </div>
                        <div className="group cursor-pointer">
                            <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 group-hover:text-on-surface transition-colors">PRICE: ASC</span>
                            <div className="h-px w-0 group-hover:w-full bg-antique-champagne transition-all duration-300"></div>
                        </div>
                        <div className="group cursor-pointer">
                            <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 group-hover:text-on-surface transition-colors">ATMOSPHERE: FORGED</span>
                            <div className="h-px w-0 group-hover:w-full bg-antique-champagne transition-all duration-300"></div>
                        </div>
                        <div className="group cursor-pointer">
                            <span className="font-label-caps text-[10px] tracking-[0.3em] text-primary border-b border-antique-champagne pb-1">COLLECTION: NOIR</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40">68 ITEMS FOUND</span>
                        <button className="flex items-center gap-2 border border-antique-champagne px-6 py-2 hover:bg-antique-champagne hover:text-black transition-all group">
                            <span className="font-nav-link text-[11px] tracking-[0.2em] uppercase">Filter Drawer</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* <!-- Product Grid Section --> */}
            <main className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-gutter gap-y-32">

                    {dummyProducts.slice(0, 4).map((product, idx) => (
                        <div key={product.id} className={`flex flex-col group cursor-pointer ${idx === 2 ? 'md:translate-y-16' : ''}`}>
                            <Link href={`/Products/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-surface-container mb-stack-md border border-transparent hover:border-glass-border transition-colors duration-500">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="font-label-caps text-white/10 uppercase tracking-widest text-center px-4">
                                        Product Image<br />(From Database)
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-antique-champagne"></div>
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
                                    <button className="bg-white text-black font-nav-link px-8 py-3 text-[10px] uppercase tracking-[0.3em]">Quick View</button>
                                </div>
                            </Link>
                            <h3 className="font-label-caps text-[10px] uppercase tracking-[0.3em] text-on-surface mb-2">{product.title}</h3>
                            <div className="flex justify-between items-baseline">
                                <p className="font-body-lg text-[14px] text-on-surface/40 italic">{product.category}</p>
                                <p className="font-body-lg text-[14px] text-primary">{product.price}</p>
                            </div>
                        </div>
                    ))}

                    {/* <!-- Row 2 Starts with Product 5 --> */}
                    <div className="flex flex-col group cursor-pointer">
                        <div className="relative aspect-[3/4] overflow-hidden bg-surface-container mb-stack-md border border-transparent hover:border-glass-border transition-colors duration-500">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-label-caps text-white/10 uppercase tracking-widest text-center px-4">
                                    Product Image<br />(From Database)
                                </span>
                            </div>
                        </div>
                        <h3 className="font-label-caps text-[10px] uppercase tracking-[0.3em] text-on-surface mb-2">{dummyProducts[4].title}</h3>
                        <div className="flex justify-between items-baseline">
                            <p className="font-body-lg text-[14px] text-on-surface/40 italic">{dummyProducts[4].category}</p>
                            <p className="font-body-lg text-[14px] text-primary">{dummyProducts[4].price}</p>
                        </div>
                    </div>

                    {/* <!-- Featured Banner (Asymmetric Grid Filler) --> */}
                    <div className="col-span-1 lg:col-span-2 relative group overflow-hidden bg-surface-container flex flex-col justify-center p-12 border border-glass-border">
                        <div className="relative z-10">
                            <span className="font-label-caps text-[10px] tracking-[0.3em] text-antique-champagne mb-4 block uppercase">LIMITED RELEASE</span>
                            <h2 className="font-display-hero text-[40px] leading-none mb-6 uppercase">The Onyx Capsule</h2>
                            <p className="max-w-xs font-body-lg text-[14px] text-on-surface/60 mb-8">A curated selection of five unique pieces exploring the relationship between light and absolute darkness.</p>
                            <a className="inline-block border border-white px-8 py-4 font-nav-link text-[11px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all" href="#">Explore the Drop</a>
                        </div>
                        <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 group-hover:opacity-50 transition-opacity bg-black">
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="font-label-caps text-liquid-silver tracking-[0.3em] uppercase">Banner Image</span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Product 6 --> */}
                    <div className="flex flex-col group cursor-pointer">
                        <div className="relative aspect-[3/4] overflow-hidden bg-surface-container mb-stack-md border border-transparent hover:border-glass-border transition-colors duration-500">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-label-caps text-white/10 uppercase tracking-widest text-center px-4">
                                    Product Image<br />(From Database)
                                </span>
                            </div>
                        </div>
                        <h3 className="font-label-caps text-[10px] uppercase tracking-[0.3em] text-on-surface mb-2">{dummyProducts[5].title}</h3>
                        <div className="flex justify-between items-baseline">
                            <p className="font-body-lg text-[14px] text-on-surface/40 italic">{dummyProducts[5].category}</p>
                            <p className="font-body-lg text-[14px] text-primary">{dummyProducts[5].price}</p>
                        </div>
                    </div>

                </div>

                {/* <!-- Load More CTA --> */}
                <div className="mt-section-gap flex flex-col items-center">
                    <div className="h-16 w-px bg-glass-border mb-8"></div>
                    <button className="font-label-caps text-[10px] uppercase tracking-[0.5em] text-on-surface/40 hover:text-primary transition-colors cursor-pointer group">
                        Continue Discovering
                        <div className="h-px w-0 group-hover:w-full bg-antique-champagne transition-all duration-500 mt-2 mx-auto"></div>
                    </button>
                </div>
            </main>
        </div>
    );
}