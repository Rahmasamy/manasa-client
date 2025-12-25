import type { Metadata } from "next";
import type { ReactNode } from "react";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Tajawal } from "next/font/google";

import AuthProvider from "../components/providers/AuthProvider";
import NavBar from "../components/layout/NavBar/NavBar";
import Footer from "../components/layout/Footer/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "بوابة العلوم الانسانية",
  description:
    "انضم إلى بوابة العلوم الإنسانية، حيث الإرشاد الأكاديمي والتدريب النوعي بأيدي خبراء معتمدين، لتمكينك من تطوير مهاراتك وتحقيق إنجازات أكاديمية تواكب المستقبل.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={` ${tajawal.variable} antialiased overflow-x-hidden`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
