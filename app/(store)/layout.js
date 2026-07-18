// app/(store)/layout.js
import Navbar from "@/Components/Navbar";
import CartDrawer from "@/Components/CartDrawer";
import Footer from "@/Components/Footer";
import { CartProvider } from '@/context/CartContext';

// ⚡ SEO: Page-level metadata that automatically overrides/extends the root layout
export const metadata = {
  title: "Shop Luxury Handcrafted Jewelry & Leather Goods",
  description: "Browse the official Shomicore store in Spain. Premium Silver Jewelry and luxury leather goods handcrafted to perfection.",
};

export default function StoreLayout({ children }) {
  return (
    <CartProvider>
 
      <div className="min-h-full flex flex-col">
        <Navbar />
        
        {/* Main content wrapper to push footer down if page is short */}
        <main className="flex-1">
          {children}
        </main>

        <CartDrawer />
        <Footer />
      </div>
    </CartProvider>
  );
}
