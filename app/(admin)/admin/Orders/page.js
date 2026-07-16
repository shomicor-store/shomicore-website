export default function OrdersPage() {
    return (
        <div className="bg-matte-charcoal min-h-screen text-on-surface font-body-lg flex flex-col w-full">

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col md:h-screen md:overflow-y-auto">

                {/* Topbar */}
                <header className="px-6 md:px-12 py-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center sticky top-0 bg-matte-charcoal/95 backdrop-blur-md z-10 gap-4 md:gap-0 w-full">
                    <div>
                        <h2 className="font-display-hero text-[32px] md:text-[40px] uppercase tracking-tighter leading-none">Order Management</h2>
                        <span className="font-label-caps text-[10px] tracking-[0.3em] text-antique-champagne uppercase mt-2 block">124 TOTAL RECORDS</span>
                    </div>

                    <div className="flex gap-6 items-center">
                        {/* Search Bar */}
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="SEARCH ORDERS..."
                                className="bg-transparent border-b border-white/20 text-white font-label-caps text-[10px] tracking-[0.2em] py-2 pr-8 focus:outline-none focus:border-antique-champagne w-64 transition-colors placeholder:text-white/30"
                            />
                            <span className="material-symbols-outlined text-white/40 absolute right-0 top-1 text-[18px]">search</span>
                        </div>

                        <button className="flex items-center gap-2 border border-antique-champagne px-4 py-2 hover:bg-antique-champagne hover:text-black transition-all group">
                            <span className="font-nav-link text-[10px] tracking-[0.2em] uppercase">Export CSV</span>
                        </button>

                        <div className="w-10 h-10 bg-surface-container border border-white/10 flex items-center justify-center cursor-pointer hover:border-antique-champagne transition-colors">
                            <span className="font-label-caps text-[10px] text-antique-champagne">AD</span>
                        </div>
                    </div>
                </header>

                <div className="px-6 md:px-12 py-12 max-w-full">

                    {/* Order Status Filters */}
                    <div className="flex flex-wrap gap-8 mb-12 border-b border-white/5 pb-4">
                        <div className="group cursor-pointer">
                            <span className="font-label-caps text-[11px] tracking-[0.3em] text-primary border-b-2 border-antique-champagne pb-4">ALL ORDERS</span>
                        </div>
                        <div className="group cursor-pointer">
                            <span className="font-label-caps text-[11px] tracking-[0.3em] text-on-surface/40 hover:text-on-surface transition-colors pb-4">PENDING</span>
                        </div>
                        <div className="group cursor-pointer">
                            <span className="font-label-caps text-[11px] tracking-[0.3em] text-on-surface/40 hover:text-on-surface transition-colors pb-4">PROCESSING</span>
                        </div>
                        <div className="group cursor-pointer">
                            <span className="font-label-caps text-[11px] tracking-[0.3em] text-on-surface/40 hover:text-on-surface transition-colors pb-4">SHIPPED</span>
                        </div>
                        <div className="group cursor-pointer">
                            <span className="font-label-caps text-[11px] tracking-[0.3em] text-on-surface/40 hover:text-on-surface transition-colors pb-4">COMPLETED</span>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="bg-surface-container border border-white/5 overflow-x-auto">
                        <div className="w-full min-w-[1000px]">

                            {/* Table Header */}
                            <div className="grid grid-cols-7 gap-4 px-8 py-4 border-b border-white/5 bg-black/20">
                                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase col-span-1">Order ID</span>
                                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase col-span-1">Date</span>
                                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase col-span-2">Customer</span>
                                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase col-span-1">Fulfillment</span>
                                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase col-span-1 text-right">Total</span>
                                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase col-span-1 text-right">Actions</span>
                            </div>

                            {/* Order Row 1 */}
                            <div className="grid grid-cols-7 gap-4 px-8 py-6 border-b border-white/5 group hover:bg-white/5 transition-colors items-center">
                                <span className="font-nav-link text-[11px] tracking-[0.1em] text-white col-span-1">#SHM-0492</span>
                                <span className="font-body-lg text-[14px] text-white/60 col-span-1">Oct 24, 2024</span>
                                <div className="col-span-2 flex flex-col">
                                    <span className="font-body-lg text-[14px] text-white/80">Elena Rostova</span>
                                    <span className="font-body-lg text-[12px] text-white/40">elena.r@example.com</span>
                                </div>
                                <div className="col-span-1 flex items-start">
                                    <span className="font-label-caps text-[9px] tracking-[0.2em] px-3 py-1 bg-antique-champagne text-black">UNFULFILLED</span>
                                </div>
                                <span className="font-body-lg text-[14px] text-primary col-span-1 text-right">€650.00</span>
                                <div className="col-span-1 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                                    <button className="text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                                </div>
                            </div>

                            {/* Order Row 2 */}
                            <div className="grid grid-cols-7 gap-4 px-8 py-6 border-b border-white/5 group hover:bg-white/5 transition-colors items-center">
                                <span className="font-nav-link text-[11px] tracking-[0.1em] text-white col-span-1">#SHM-0491</span>
                                <span className="font-body-lg text-[14px] text-white/60 col-span-1">Oct 24, 2024</span>
                                <div className="col-span-2 flex flex-col">
                                    <span className="font-body-lg text-[14px] text-white/80">Marcus V.</span>
                                    <span className="font-body-lg text-[12px] text-white/40">marcus.valerius@example.com</span>
                                </div>
                                <div className="col-span-1 flex items-start">
                                    <span className="font-label-caps text-[9px] tracking-[0.2em] px-3 py-1 border border-white/20 text-white/60">PROCESSING</span>
                                </div>
                                <span className="font-body-lg text-[14px] text-primary col-span-1 text-right">€1,240.00</span>
                                <div className="col-span-1 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                                    <button className="text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                                </div>
                            </div>

                            {/* Order Row 3 */}
                            <div className="grid grid-cols-7 gap-4 px-8 py-6 border-b border-white/5 group hover:bg-white/5 transition-colors items-center">
                                <span className="font-nav-link text-[11px] tracking-[0.1em] text-white col-span-1">#SHM-0490</span>
                                <span className="font-body-lg text-[14px] text-white/60 col-span-1">Oct 23, 2024</span>
                                <div className="col-span-2 flex flex-col">
                                    <span className="font-body-lg text-[14px] text-white/80">A. Dubois</span>
                                    <span className="font-body-lg text-[12px] text-white/40">a.dubois.studio@example.com</span>
                                </div>
                                <div className="col-span-1 flex items-start">
                                    <span className="font-label-caps text-[9px] tracking-[0.2em] px-3 py-1 border border-white/20 text-white/60">SHIPPED</span>
                                </div>
                                <span className="font-body-lg text-[14px] text-primary col-span-1 text-right">€280.00</span>
                                <div className="col-span-1 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                                    <button className="text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                                </div>
                            </div>

                            {/* Order Row 4 */}
                            <div className="grid grid-cols-7 gap-4 px-8 py-6 border-b border-white/5 group hover:bg-white/5 transition-colors items-center">
                                <span className="font-nav-link text-[11px] tracking-[0.1em] text-white col-span-1">#SHM-0489</span>
                                <span className="font-body-lg text-[14px] text-white/60 col-span-1">Oct 21, 2024</span>
                                <div className="col-span-2 flex flex-col">
                                    <span className="font-body-lg text-[14px] text-white/80">Jonathan Sterling</span>
                                    <span className="font-body-lg text-[12px] text-white/40">jsterling@example.com</span>
                                </div>
                                <div className="col-span-1 flex items-start">
                                    <span className="font-label-caps text-[9px] tracking-[0.2em] px-3 py-1 border border-white/20 text-white/60">COMPLETED</span>
                                </div>
                                <span className="font-body-lg text-[14px] text-primary col-span-1 text-right">€890.00</span>
                                <div className="col-span-1 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                                    <button className="text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Pagination Component */}
                    <div className="mt-8 flex justify-between items-center px-4">
                        <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40">SHOWING 1-4 OF 124</span>
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