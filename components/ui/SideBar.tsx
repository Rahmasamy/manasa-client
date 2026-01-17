"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BookOpen, Library, FileText, Info, Grid, LogOut, ArrowLeft } from 'lucide-react';

const menuItems = [
    {
        href: '/dashboard/analytics',
        icon: Grid,
        label: 'لوحة التحكم',
    },
    {
        href: '/dashboard/AcademicGuide',
        icon: Users,
        label: 'الإرشاد الأكاديمي',
    },
    {
        href: '/dashboard/courses',
        icon: BookOpen,
        label: 'الدورات التدريبية',
    },
    {
        href: '/dashboard/electronic-library',
        icon: Library,
        label: 'المكتبة الإلكترونية',
    },
    {
        href: '/dashboard/articles',
        icon: FileText,
        label: 'المقالات',
    },
];

export default function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-36 bg-white border-l border-gray-200 flex flex-col"
        
        style={{width : "20%"}}
        >
            {/* Logo */}
            {/* <div className="p-6 border-b border-gray-200">
                <Link href="/dashboard" className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">ISD</span>
                    </div>
                </Link>
            </div> */}

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        isActive
                                            ? 'text-[#2885AC] bg-blue-50 font-medium'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className={isActive ? 'font-medium' : ''}>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                    {/* Home Page Button */}
                    <li className="pt-4 border-t border-gray-200">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                        >
                            <Home className="w-5 h-5" />
                            <span>الصفحة الرئيسية</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Exit Admin Panel Button */}
            <div className="p-4 border-t border-gray-200">
                <Link href="/">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">الخروج من لوحة الإدارة</span>
                    </button>
                </Link>
            </div>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-200">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#2885AC] text-white rounded-lg hover:bg-[#2885AC] transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">تسجيل خروج</span>
                </button>
            </div>
        </aside>
    );
}