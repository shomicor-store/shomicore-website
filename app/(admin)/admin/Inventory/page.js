export default function InventoryPage() {
    return (
        <div className="bg-matte-charcoal min-h-screen text-on-surface font-body-lg flex flex-col w-full">

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col md:h-screen md:overflow-y-auto">

                {/* Topbar */}
                <header className="px-6 md:px-12 py-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center sticky top-0 bg-matte-charcoal/95 backdrop-blur-md z-10 gap-4 md:gap-0 w-full">
                    <div>
                        <h2 className="font-display-hero text-[32px] md:text-[40px] uppercase tracking-tighter leading-none">Inventory Management</h2>
                        <span className="font-label-caps text-[10px] tracking-[0.3em] text-antique-champagne uppercase mt-2 block">86 TOTAL SKUS</span>
                    </div>

                    <div className="flex gap-6 items-center">
                        {/* Search Bar */}
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="SEARCH SKUS..."
                                className="bg-transparent border-b border-white/20 text-white font-label-caps text-[10px] tracking-[0.2em] py-2 pr-8 focus:outline-none focus:border-antique-champagne w-64 transition-colors placeholder:text-white/30"
                            />
                            <span className="material-symbols-outlined text-white/40 absolute right-0 top-1 text-[18px]">search</span>
                        </div>

                        <button className="flex items-center gap-2 border border-antique-champagne px-4 py-2 hover:bg-antique-champagne hover:text-black transition-all group">
                            <span className="font-nav-link text-[10px] tracking-[0.2em] uppercase">Add Product</span>
                        </button>

                        <div className="w-10 h-10 bg-surface-container border border-white/10 flex items-center justify-center cursor-pointer hover:border-antique-champagne transition-colors">
                            <span className="font-label-caps text-[10px] text-antique-champagne">AD</span>
                        </div>
                    </div>
                </header>

                <div className="px-6 md:px-12 py-12 max-w-full">

                    {/* Inventory Status Filters */}
                    <div className="flex flex-wrap gap-8 mb-12 border-b border-white/5 pb-4">
                        <div className="group cursor-pointer">
                            <span className="font-label-caps text-[11px] tracking-[0.3em] text-primary border-b-2 border-antique-champagne pb-4">ALL PRODUCTS</span>
                        </div>
                        <div className="group cursor-pointer">
                            <span className="font-label-caps text-[11px] tracking-[0.3em] text-on-surface/40 hover:text-on-surface transition-colors pb-4">IN STOCK</span>
                        </div>
                        <div className="group cursor-pointer">
                            <span className="font-label-caps text-[11px] tracking-[0.3em] text-on-surface/40 hover:text-on-surface transition-colors pb-4">LOW STOCK</span>
                        </div>
                        <div className="group cursor-pointer">
                            <span className="font-label-caps text-[11px] tracking-[0.3em] text-error hover:text-error/80 transition-colors pb-4">OUT OF STOCK</span>
                        </div>
                    </div>

                    {/* Inventory Table */}
                    <div className="bg-surface-container border border-white/5 overflow-x-auto">
                        <div className="w-full min-w-[1000px]">

                            {/* Table Header */}
                            <div className="grid grid-cols-7 gap-4 px-8 py-4 border-b border-white/5 bg-black/20">
                                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase col-span-2">Product Info</span>
                                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase col-span-1">SKU</span>
                                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase col-span-1">Category</span>
                                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase col-span-1">Stock Level</span>
                                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase col-span-1 text-right">Price</span>
                                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase col-span-1 text-right">Actions</span>
                            </div>

                            {/* Inventory Row 1 */}
                            <div className="grid grid-cols-7 gap-4 px-8 py-4 border-b border-white/5 group hover:bg-white/5 transition-colors items-center">
                                <div className="col-span-2 flex items-center gap-4">
                                    <div className="w-12 h-16 bg-black/40 border border-white/10 flex flex-shrink-0 items-center justify-center">
                                        <span className="material-symbols-outlined text-white/20 text-[16px]">image</span>
                                    </div>
                                    <span className="font-body-lg text-[14px] text-white">Helix Ring No. 04</span>
                                </div>
                                <span className="font-nav-link text-[11px] tracking-[0.1em] text-white/60 col-span-1">SKU-HR04</span>
                                <span className="font-label-caps text-[10px] tracking-[0.2em] text-white/40 uppercase col-span-1">Silver Jewelry</span>
                                <div className="col-span-1 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-antique-champagne"></div>
                                    <span className="font-nav-link text-[11px] tracking-[0.1em] text-white">42 IN STOCK</span>
                                </div>
                                <span className="font-body-lg text-[14px] text-primary col-span-1 text-right">€240.00</span>
                                <div className="col-span-1 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                                    <button className="text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                                </div>
                            </div>

                            {/* Inventory Row 2 */}
                            <div className="grid grid-cols-7 gap-4 px-8 py-4 border-b border-white/5 group hover:bg-white/5 transition-colors items-center">
                                <div className="col-span-2 flex items-center gap-4">
                                    <div className="w-12 h-16 bg-black/40 border border-white/10 flex flex-shrink-0 items-center justify-center">
                                        <span className="material-symbols-outlined text-white/20 text-[16px]">image</span>
                                    </div>
                                    <span className="font-body-lg text-[14px] text-white">Noir Minimalist Clutch</span>
                                </div>
                                <span className="font-nav-link text-[11px] tracking-[0.1em] text-white/60 col-span-1">SKU-NC01</span>
                                <span className="font-label-caps text-[10px] tracking-[0.2em] text-white/40 uppercase col-span-1">Leather Goods</span>
                                <div className="col-span-1 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-error"></div>
                                    <span className="font-nav-link text-[11px] tracking-[0.1em] text-error">3 LOW STOCK</span>
                                </div>
                                <span className="font-body-lg text-[14px] text-primary col-span-1 text-right">€580.00</span>
                                <div className="col-span-1 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                                    <button className="text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                                </div>
                            </div>

                            {/* Inventory Row 3 */}
                            <div className="grid grid-cols-7 gap-4 px-8 py-4 border-b border-white/5 group hover:bg-white/5 transition-colors items-center">
                                <div className="col-span-2 flex items-center gap-4">
                                    <div className="w-12 h-16 bg-black/40 border border-white/10 flex flex-shrink-0 items-center justify-center">
                                        <span className="material-symbols-outlined text-white/20 text-[16px]">image</span>
                                    </div>
                                    <span className="font-body-lg text-[14px] text-white">Forged Link Bracelet</span>
                                </div>
                                <span className="font-nav-link text-[11px] tracking-[0.1em] text-white/60 col-span-1">SKU-FB02</span>
                                <span className="font-label-caps text-[10px] tracking-[0.2em] text-white/40 uppercase col-span-1">Silver Jewelry</span>
                                <div className="col-span-1 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 border border-white/40"></div>
                                    <span className="font-nav-link text-[11px] tracking-[0.1em] text-white/40">0 OUT OF STOCK</span>
                                </div>
                                <span className="font-body-lg text-[14px] text-primary col-span-1 text-right">€310.00</span>
                                <div className="col-span-1 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                                    <button className="text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                                </div>
                            </div>

                            {/* Inventory Row 4 */}
                            <div className="grid grid-cols-7 gap-4 px-8 py-4 border-b border-white/5 group hover:bg-white/5 transition-colors items-center">
                                <div className="col-span-2 flex items-center gap-4">
                                    <div className="w-12 h-16 bg-black/40 border border-white/10 flex flex-shrink-0 items-center justify-center">
                                        <span className="material-symbols-outlined text-white/20 text-[16px]">image</span>
                                    </div>
                                    <span className="font-body-lg text-[14px] text-white">Molten Drop Earrings</span>
                                </div>
                                <span className="font-nav-link text-[11px] tracking-[0.1em] text-white/60 col-span-1">SKU-ME08</span>
                                <span className="font-label-caps text-[10px] tracking-[0.2em] text-white/40 uppercase col-span-1">Silver Jewelry</span>
                                <div className="col-span-1 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-antique-champagne"></div>
                                    <span className="font-nav-link text-[11px] tracking-[0.1em] text-white">14 IN STOCK</span>
                                </div>
                                <span className="font-body-lg text-[14px] text-primary col-span-1 text-right">€185.00</span>
                                <div className="col-span-1 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                                    <button className="text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Pagination Component */}
                    <div className="mt-8 flex justify-between items-center px-4">
                        <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40">SHOWING 1-4 OF 86</span>
                        <div className="flex items-center gap-4">
                            <button className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px]">chevron_left</span> PREV
                            </button>
                            <div className="h-4 w-px bg-white/20"></div>
                            <button className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                                NEXT <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}