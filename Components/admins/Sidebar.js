"use Client";

import Link from "next/link";


export default function AdminSidebar() {
    return (
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/5 flex flex-col pt-8 md:pt-12 pb-8 sticky top-0 md:h-screen bg-matte-charcoal/95 backdrop-blur-md z-20">
            <div className="px-8 mb-12 md:mb-16">
                <h1 className="font-headline-md text-[24px] uppercase tracking-widest text-white leading-none mb-2">
                    Shomicor
                </h1>
                <span className="text-antique-champagne text-[10px] tracking-[0.3em] font-label-caps block">ADMINISTRATION</span>
            </div>

            <nav className="flex-1 px-8 flex flex-col gap-6">
                <div className="group cursor-pointer">
                    <Link href="/admin" className="font-label-caps text-[10px] tracking-[0.3em] text-primary border-b border-antique-champagne pb-1 inline-block">OVERVIEW</Link>
                </div>
                <div className="group cursor-pointer">
                    <Link href="/admin/Orders" className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 group-hover:text-on-surface tr    ansition-colors">ORDERS (12)</Link>
                </div>
                <div className="group cursor-pointer">
                    <Link href="/admin/Inventory" className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 group-hover:text-on-surface transition-colors">INVENTORY</Link>
                </div>
                {/* <div className="group cursor-pointer">
                    <Link className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 group-hover:text-on-surface transition-colors">CUSTOMERS</Link>
                </div>
                <div className="group cursor-pointer">
                    <Link className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 group-hover:text-on-surface transition-colors">SETTINGS</Link>
                </div> */}
            </nav>

            <div className="px-8 mt-12 md:mt-0">
                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 cursor-pointer hover:text-white transition-colors">LOGOUT</span>
            </div>
        </aside>
    )
}