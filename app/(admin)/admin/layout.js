// app/(admin)/admin/layout.js
import "./globals.css";
import AdminSidebar from "@/Components/admins/Sidebar";

export const metadata = {
  title: "Admin Dashboard | Shomicore",
  description: "Shomicore Administration Panel",
};

export default function AdminLayout({ children }) {
  return (

    <div className="flex flex-col md:flex-row min-h-screen bg-black w-full overflow-x-hidden antialiased text-white">
      

      <AdminSidebar />

      <main className="flex-1 w-full bg-black min-h-screen p-6 md:p-10">
        {children}
      </main>

    </div>
  );
}
