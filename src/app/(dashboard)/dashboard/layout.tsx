// app/(dashboard)/layout.tsx
// import Sidebar from "@/components/dashboard/Sidebar";
// import DashboardNavbar from "@/components/dashboard/DashboardNavbar";



import DashboardNavbar from "@/app/(dashboard)/dashboard/dashboard-navbar/page";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="flex min-h-screen bg-gray-100">
        {/*<Sidebar />*/}
        <div className="flex flex-col flex-1">
            <DashboardNavbar />
            <main className="p-6">{children}</main>
        </div>
        </body>
        </html>
    );
}
