"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BookOpen, Library, FileText, Info, Grid, LogOut } from 'lucide-react';

const menuItems = [
    {
        href: '/dashboard/analytics',
        icon: Grid,
        label: 'لوحة التحكم',
    },
    {
        href: '/dashboard/home',
        icon: Home,
        label: 'الصفحة الرئيسية',
    },
    {
        href: '/dashboard/AcademicGuide',
        icon: Users,
        label: 'الإرشاد الأكاديمي',
    },
    {
        href: '/dashboard/courses',
        icon: BookOpen,
        label: 'خدمات التدريب',
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
    {
        href: '/dashboard/about-us',
        icon: Info,
        label: 'عن الأكاديمية',
    },
    {
        href: '/dashboard/control-panel',
        icon: Grid,
        label: 'تنسيق الصفحة الرئيسية',
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
                </ul>
            </nav>

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