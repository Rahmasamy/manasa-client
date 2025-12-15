'use client'
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";


const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPassingHero,setPassHero] = useState(false)
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
    <div className={`w-full  shadow-md h-[95px]   fixed top-0 z-50
      ${isScrolled || isPassingHero ? "bg-white text-black shadow-md" : "bg-transparent text-white"}
    `}
    id="nav"
    >
      <div className="container mx-auto flex items-center justify-between ">
        <Image src="/icons/logo.png" alt="Logo" width={120} height={100}
        className="bg-white rounded-3xl w-28 h-24 object-cover"
        />
     
       <ul className="hidden md:flex items-center gap-8  font-medium">
          <li><Link href="/">الرئيسية</Link></li>
          <li><Link href="/acedemic">الإرشاد الأكاديمي</Link></li>
          <li><Link href="/courses">الدورات التدريبية</Link></li>
          <li><Link href="/articles">المقالات</Link></li>
          <li><Link href="/electronic-library">المكتبة الإلكترونية</Link></li>
          <li><Link href="/about">
          من نحن 
          </Link></li>
        </ul>
        <Link href="/auth/login">
            <Button className="hidden md:block px-11 py-3 text-[#0B72B9] bg-white rounded-md">
          انضم الآن
        </Button>
        </Link>
    </div>
     </div>
  );
};
export default NavBar;
