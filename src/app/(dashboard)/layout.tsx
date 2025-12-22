// app/(dashboard)/layout.tsx
import DashboardNavbar from "../../../components/ui/DashboardNavbar";
import DashboardSidebar from "@/components/ui/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <DashboardNavbar />

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
