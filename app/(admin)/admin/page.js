import Image from "next/image";
import Link from "next/link";


export default function AdminDashboard() {
  return (
    <div className="bg-matte-charcoal min-h-screen text-on-surface font-body-lg flex flex-col md:flex-row">

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:h-screen md:overflow-y-auto">
        {/* Topbar */}
        <header className="px-6 md:px-12 py-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center sticky top-0 bg-matte-charcoal/95 backdrop-blur-md z-10 gap-4 md:gap-0">
          <h2 className="font-display-hero text-[32px] md:text-[40px] uppercase tracking-tighter leading-none">Command Center</h2>
          <div className="flex gap-6 items-center">
            <button className="flex items-center gap-2 border border-antique-champagne px-4 py-2 hover:bg-antique-champagne hover:text-black transition-all group">
              <span className="font-nav-link text-[10px] tracking-[0.2em] uppercase">New Product</span>
            </button>
            <span className="material-symbols-outlined text-white/60 hover:text-white cursor-pointer hidden md:block">notifications</span>
            <div className="w-10 h-10 bg-surface-container border border-white/10 flex items-center justify-center cursor-pointer hover:border-antique-champagne transition-colors">
              <span className="font-label-caps text-[10px] text-antique-champagne">AD</span>
            </div>
          </div>
        </header>

        <div className="px-6 md:px-12 py-12 max-w-7xl">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Metric Card */}
            <div className="bg-surface-container border border-white/5 p-8 flex flex-col group hover:border-white/20 transition-colors">
              <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 mb-4">TODAY'S REVENUE</span>
              <span className="font-headline-md text-[32px] md:text-[40px] text-white leading-none">€4,250.00</span>
              <div className="mt-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px] text-antique-champagne">trending_up</span>
                <span className="font-label-caps text-[10px] tracking-[0.3em] text-antique-champagne">+12.5%</span>
              </div>
            </div>
            {/* Metric Card */}
            <div className="bg-surface-container border border-white/5 p-8 flex flex-col group hover:border-white/20 transition-colors">
              <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 mb-4">ACTIVE ORDERS</span>
              <span className="font-headline-md text-[32px] md:text-[40px] text-white leading-none">24</span>
              <div className="mt-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px] text-on-surface/40">pending_actions</span>
                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40">5 PENDING FULFILLMENT</span>
              </div>
            </div>
            {/* Metric Card */}
            <div className="bg-surface-container border border-white/5 p-8 flex flex-col group hover:border-error/50 transition-colors">
              <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 mb-4">LOW STOCK ALERTS</span>
              <span className="font-headline-md text-[32px] md:text-[40px] text-white leading-none">3</span>
              <div className="mt-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px] text-error">warning</span>
                <span className="font-label-caps text-[10px] tracking-[0.3em] text-error">REQUIRES ATTENTION</span>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-surface-container border border-white/5 overflow-x-auto">
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center min-w-[800px]">
              <h3 className="font-label-caps text-[12px] tracking-[0.3em] text-white uppercase">Recent Transactions</h3>
              <button className="font-nav-link text-[10px] tracking-[0.2em] text-antique-champagne uppercase hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">View All</button>
            </div>
            <div className="w-full min-w-[800px]">
              <div className="grid grid-cols-5 gap-4 px-8 py-4 border-b border-white/5 bg-black/20">
                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase">Order ID</span>
                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase">Client</span>
                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase">Date</span>
                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase">Total</span>
                <span className="font-label-caps text-[10px] tracking-[0.3em] text-on-surface/40 uppercase text-right">Status</span>
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-5 gap-4 px-8 py-6 border-b border-white/5 group hover:bg-white/5 transition-colors cursor-pointer items-center">
                <span className="font-nav-link text-[11px] tracking-[0.1em] text-white">#SHM-0492</span>
                <span className="font-body-lg text-[14px] text-white/80">Elena Rostova</span>
                <span className="font-body-lg text-[14px] text-white/60">Oct 24, 2024</span>
                <span className="font-body-lg text-[14px] text-primary">€650.00</span>
                <div className="flex justify-end">
                  <span className="font-label-caps text-[10px] tracking-[0.2em] px-4 py-2 bg-antique-champagne text-black">PAID</span>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-5 gap-4 px-8 py-6 border-b border-white/5 group hover:bg-white/5 transition-colors cursor-pointer items-center">
                <span className="font-nav-link text-[11px] tracking-[0.1em] text-white">#SHM-0491</span>
                <span className="font-body-lg text-[14px] text-white/80">Marcus V.</span>
                <span className="font-body-lg text-[14px] text-white/60">Oct 24, 2024</span>
                <span className="font-body-lg text-[14px] text-primary">€1,240.00</span>
                <div className="flex justify-end">
                  <span className="font-label-caps text-[10px] tracking-[0.2em] px-4 py-2 border border-white/20 text-white/60">PROCESSING</span>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-5 gap-4 px-8 py-6 group hover:bg-white/5 transition-colors cursor-pointer items-center">
                <span className="font-nav-link text-[11px] tracking-[0.1em] text-white">#SHM-0490</span>
                <span className="font-body-lg text-[14px] text-white/80">A. Dubois</span>
                <span className="font-body-lg text-[14px] text-white/60">Oct 23, 2024</span>
                <span className="font-body-lg text-[14px] text-primary">€280.00</span>
                <div className="flex justify-end">
                  <span className="font-label-caps text-[10px] tracking-[0.2em] px-4 py-2 bg-antique-champagne text-black">PAID</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
