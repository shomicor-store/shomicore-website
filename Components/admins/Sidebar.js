"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const links = [
    { name: "OVERVIEW", href: "/admin" },
    { name: "ORDERS", href: "/admin/orders" },
    { name: "INVENTORY", href: "/admin/Inventory" },
  ];

  return (
    <>
      {/* MOBILE HUD BAR - SEPARATED CLOCK BLOCK FRAME */}
      <div className="md:hidden w-full bg-neutral-950 border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-40 select-none h-16">
        <div className="flex flex-col">
          <span className="font-headline-md text-[16px] uppercase tracking-widest text-white leading-none font-bold">
            SHOMICORE
          </span>
          <span className="text-antique-champagne text-[8px] tracking-[0.2em] font-label-caps block mt-1">
            ADMINISTRATION
          </span>
        </div>
        
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation drawer"
          className="text-white hover:text-antique-champagne transition-colors focus:outline-none p-2 cursor-pointer bg-transparent border-none"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* BACKGROUND DRAWER DISMISSAL OVERLAY SHIELD */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden cursor-pointer"
        />
      )}

      {/* SYSTEM MAIN CONTROL ASIDE BAR MODULE */}
      <aside 
        className={`
          fixed inset-y-0 left-0 md:sticky md:top-0 h-screen w-64 border-r border-white/10 flex flex-col pt-8 md:pt-12 pb-8 bg-neutral-950 select-none z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header Block Panel - Hidden completely on mobile to prevent layout duplication */}
        <div className="px-8 mb-12 hidden md:block">
          <h1 className="font-headline-md text-[22px] uppercase tracking-widest text-white leading-none mb-2 font-bold">
            SHOMICORE
          </h1>
          <span className="text-antique-champagne text-[9px] tracking-[0.25em] font-label-caps block">ADMINISTRATION</span>
        </div>

        {/* Dynamic Mapping Layout */}
        <nav className="flex-1 px-8 flex flex-col gap-4 pt-10 md:pt-0">
          {links.map((link) => {
            const isActive = link.href === "/admin" 
              ? pathname === "/admin" 
              : pathname.startsWith(link.href);

            return (
              <div key={link.href} className="w-full">
                <Link 
                  href={link.href} 
                  className={`font-label-caps text-[11px] tracking-[0.2em] uppercase transition-all duration-300 block py-2 border-b
                    ${isActive 
                      ? 'text-antique-champagne border-antique-champagne font-bold pl-1' 
                      : 'text-white/40 hover:text-white border-transparent'
                    }`}
                >
                  {link.name}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Logout Control Trigger Block */}
        <div className="px-8 mt-auto pt-6 border-t border-white/10">
          <span className="font-label-caps text-[10px] tracking-[0.2em] text-white/30 hover:text-red-400 cursor-pointer transition-colors duration-300 block uppercase font-medium">
            LOGOUT BACKEND
          </span>
        </div>
      </aside>
    </>
  );
}
