"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { navItems } from "@/src/lib/config/navigation";
import { User, LogOut } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  user?: { id: string; email: string; name?: string } | null;
  onLogout: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  isAuthenticated,
  isAdmin,
  user,
  onLogout,
}: MobileMenuProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "108px" }}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`fixed top-[108px] right-0 w-full sm:w-80 h-[calc(100vh-108px)] bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        dir="rtl"
      >
        <nav className="h-full overflow-y-auto">
          <ul className="flex flex-col py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-6 py-4 transition-all duration-200 border-r-4 ${
                      isActive
                        ? "bg-[#0B72B9]/10 text-[#0B72B9] border-r-[#0B72B9] font-semibold"
                        : "text-[#27272A] hover:bg-gray-50 hover:text-[#0B72B9] border-r-transparent"
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* Admin Dashboard Button */}
            {isAuthenticated && isAdmin && (
              <li className="px-6 py-4 mt-4 border-t border-gray-100">
                <Link href="/dashboard/analytics" onClick={onClose}>
                  <Button className="w-full py-3 bg-[#0B72B9] text-white rounded-lg hover:bg-[#0B72B9]/90 transition-colors font-medium">
                    لوحة الإدارة
                  </Button>
                </Link>
              </li>
            )}

            {/* User Info & Logout */}
            {isAuthenticated && user && (
              <>
                <li className="px-6 py-4 mt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50">
                    <User className="w-5 h-5 text-[#0B72B9]" />
                    <span className="text-sm font-medium text-[#27272A]">
                      {user.name || user.email.split("@")[0]}
                    </span>
                  </div>
                </li>
                <li className="px-6 py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>تسجيل الخروج</span>
                  </button>
                </li>
              </>
            )}

            {/* Auth Button */}
            {!isAuthenticated && (
              <li className="px-6 py-4 mt-4 border-t border-gray-100">
                <Link href="/auth/login" onClick={onClose}>
                  <Button className="w-full py-3 bg-[#0B72B9] text-white rounded-lg hover:bg-[#0B72B9]/90 transition-colors font-medium">
                    انضم الآن
                  </Button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
