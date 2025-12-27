"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BackgroundWrapper from "@/src/components/domain/BackgroundWrapper/BackgroundWrapper";
import BoxAuth from "@/src/components/domain/BoxAuth/BoxAuth";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/src/infrastructure/api/authApi";
import { useAuth } from "@/src/contexts/AuthContext";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("كلمات السر غير متطابقة");
      return;
    }

    if (password.length < 6) {
      setError("كلمة السر يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.signup({ email, password });
      
      console.log("Signup response:", response); // Debug log
      
      // Handle different response structures
      const token = response.token || (response as any).data?.token || (response as any).accessToken || (response as any).access_token;
      const userData = response.user || (response as any).data?.user || { 
        id: (response as any).data?.id || (response as any).id || "", 
        email: (response as any).data?.email || email 
      };
      
      if (token) {
        login(token, userData);
        setTimeout(() => {
          router.push("/");
          setTimeout(() => {
            if (window.location.pathname === "/auth/signup") {
              window.location.href = "/";
            }
          }, 500);
        }, 100);
      } else {
        // If response is successful but no token, check if it's a session-based auth
        console.warn("No token in response, but request succeeded:", response);
        if (response.message && response.message.toLowerCase().includes("success")) {
          login("session", userData);
          setTimeout(() => {
            router.push("/");
            setTimeout(() => {
              if (window.location.pathname === "/auth/signup") {
                window.location.href = "/";
              }
            }, 500);
          }, 100);
        } else {
          setError("فشل إنشاء الحساب. لم يتم استلام رمز الدخول.");
        }
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundWrapper>
      <BoxAuth>
        <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center w-full h-full min-h-0 overflow-y-auto">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            width={110}
            height={110}
            className="bg-white rounded-3xl w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover flex-shrink-0"
          />
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-3 justify-start w-full min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-center sm:text-right">إنشاء حساب جديد</h1>
            <label htmlFor="email" className="text-sm sm:text-md font-bold">بريدك الالكتروني</label>
            <Input
              placeholder="أدخل بريدك الالكتروني"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-200 rounded-sm p-2 sm:p-3 w-full min-w-0"
            />
            <label htmlFor="pass" className="text-sm sm:text-md font-bold">كلمة السر</label>
            <Input
              placeholder="أدخل كلمة السر"
              id="pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-200 rounded-sm p-2 sm:p-3 w-full min-w-0"
            />
            <label htmlFor="confirmPass" className="text-sm sm:text-md font-bold">تأكيد كلمة السر</label>
            <Input
              placeholder="أعد إدخال كلمة السر"
              id="confirmPass"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-gray-200 rounded-sm p-2 sm:p-3 w-full min-w-0"
            />

            {error && (
              <div className="text-red-600 text-xs sm:text-sm bg-red-50 p-2 rounded w-full">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full text-white text-center bg-[#2885AC] py-2 sm:py-3 disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
            </Button>

            <div className="text-center mt-1 sm:mt-2 text-xs sm:text-sm">
              <span className="text-gray-600">لديك حساب بالفعل؟ </span>
              <Link href="/auth/login" className="text-[#2885AC] font-semibold hover:underline">
                تسجيل الدخول
              </Link>
            </div>
          </form>
        </div>
      </BoxAuth>
    </BackgroundWrapper>
  );
}

