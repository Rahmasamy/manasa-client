'use client'
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "@/src/contexts/AuthContext";


const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPassingHero,setPassHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    const heroSection = document.querySelector("#hero");

    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // setIsScrolled(entry.isIntersecting);
        setPassHero(!entry.isIntersecting)
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div className={`w-full shadow-md h-[95px] fixed top-0 z-50
        ${isScrolled || isPassingHero ? "bg-white text-black shadow-md" : "bg-transparent text-white"}
      `}
      id="nav"
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <Image src="/icons/logo.png" alt="Logo" width={120} height={100}
          className="bg-white rounded-3xl w-20 h-16 sm:w-24 sm:h-20 lg:w-28 lg:h-24 object-cover"
          />
       
         <ul className="hidden md:flex items-center gap-8 font-medium">
            <li><Link href="/">الرئيسية</Link></li>
            <li><Link href="/acedemic">الإرشاد الأكاديمي</Link></li>
            <li><Link href="/courses">الدورات التدريبية</Link></li>
            <li><Link href="/articles">المقالات</Link></li>
            <li><Link href="/electronic-library">المكتبة الإلكترونية</Link></li>
            <li><Link href="/about">
            من نحن 
            </Link></li>
          </ul>
          <div className="flex items-center gap-4">
            {!isAuthenticated && (
              <Link href="/auth/login">
                <Button className="hidden md:block px-8 lg:px-11 py-2 lg:py-3 text-[#0B72B9] bg-white rounded-md text-sm lg:text-base">
                  انضم الآن
                </Button>
              </Link>
            )}
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B72B9]"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden top-[95px]"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="bg-white shadow-lg w-full max-h-[calc(100vh-95px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <ul className="flex flex-col py-4">
              <li>
                <Link 
                  href="/" 
                  className="block px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link 
                  href="/acedemic" 
                  className="block px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  الإرشاد الأكاديمي
                </Link>
              </li>
              <li>
                <Link 
                  href="/courses" 
                  className="block px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  الدورات التدريبية
                </Link>
              </li>
              <li>
                <Link 
                  href="/articles" 
                  className="block px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  المقالات
                </Link>
              </li>
              <li>
                <Link 
                  href="/electronic-library" 
                  className="block px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  المكتبة الإلكترونية
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="block px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  من نحن
                </Link>
              </li>
              {!isAuthenticated && (
                <li className="px-6 py-3 mt-2">
                  <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full px-11 py-3 text-[#0B72B9] bg-white border-2 border-[#0B72B9] rounded-md hover:bg-[#0B72B9] hover:text-white transition-colors">
                      انضم الآن
                    </Button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
export default NavBar;
