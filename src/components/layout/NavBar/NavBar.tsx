"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { navItems } from "@/src/lib/config/navigation";
import TopContactBar from "./TopContactBar";
import MobileMenu from "./MobileMenu";
import { LogOut, User } from "lucide-react";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const pathname = usePathname();

  // Determine if user is admin - check multiple sources for reliability
  const userIsAdmin = (() => {
    // First check context values
    if (isAdmin || user?.isAdmin === true) {
      return true;
    }

    // Fallback to localStorage check (for SSR/hydration cases)
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("auth_user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          return userData?.isAdmin === true;
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error);
      }
    }

    return false;
  })();

  // Debug logging - always log to help troubleshoot
  useEffect(() => {
    console.log("🔍 NavBar Admin Status Check:", {
      isAuthenticated,
      "isAdmin (context)": isAdmin,
      "user?.isAdmin": user?.isAdmin,
      "userIsAdmin (computed)": userIsAdmin,
      "Should show button": isAuthenticated && userIsAdmin,
      "localStorage check":
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("auth_user") || "null")
          : null,
    });
  }, [isAuthenticated, isAdmin, user?.isAdmin, userIsAdmin]);

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to home page after logout
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top Contact Bar */}
      <TopContactBar />

      {/* Main Navbar */}
      <nav
        className={`w-full fixed top-[38px] z-50 transition-all duration-300 ${
          isScrolled
            ? "h-[70px] bg-white/95 backdrop-blur-md shadow-lg"
            : "h-[70px] bg-white shadow-md"
        }`}
        id="nav"
      >
        <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/icons/logo.png"
              alt="بوابة العلوم الإنسانية"
              width={100}
              height={80}
              className="bg-white rounded-2xl w-16 h-14 sm:w-20 sm:h-16 object-cover transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative font-medium text-sm lg:text-base transition-colors duration-200 py-2 group ${
                      isActive
                        ? "text-[#0B72B9]"
                        : "text-[#27272A] hover:text-[#0B72B9]"
                    }`}
                  >
                    {item.label}
                    {/* Active/Hover underline */}
                    <span
                      className={`absolute bottom-0 right-0 h-0.5 bg-[#0B72B9] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Admin Dashboard Button - Only shows for admin users */}
            {isAuthenticated && userIsAdmin && (
              <Link href="/dashboard/analytics" className="flex items-center">
                <Button className="px-6 lg:px-8 py-2 rounded-lg font-medium transition-all duration-300 bg-[#0B72B9] text-white hover:bg-[#0B72B9]/90">
                  لوحة الإدارة
                </Button>
              </Link>
            )}

            {/* User Info & Logout - Desktop */}
            {isAuthenticated && user && (
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50">
                  <User className="w-5 h-5 text-[#0B72B9]" />
                  <span className="text-sm font-medium text-[#27272A]">
                    {user.name || user.email.split("@")[0]}
                  </span>
                </div>
                <p className="font-bold">|</p>
                <button
                  onClick={handleLogout}
                  className="text-[#0B72B9] flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="تسجيل الخروج"
                  aria-label="تسجيل الخروج"
                >
                  تسجيل الخروج
                  <LogOut className="w-7 h-7 text-[#0B72B9]" />
                </button>
              </div>
            )}

            {/* Auth Button - Desktop */}
            {!isAuthenticated && (
              <Link href="/auth/login" className="hidden md:block">
                <Button
                  className={`px-6 lg:px-8 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isScrolled
                      ? "bg-[#0B72B9] text-white hover:bg-[#0B72B9]/90"
                      : "bg-[#0B72B9] text-white hover:bg-[#0B72B9]/90"
                  }`}
                >
                  انضم الآن
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#27272A] hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B72B9]/50"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        isAdmin={userIsAdmin}
        user={user}
        onLogout={handleLogout}
      />

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-[108px]" />
    </>
  );
};

export default NavBar;
