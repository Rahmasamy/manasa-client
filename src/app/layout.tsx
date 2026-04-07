import type { Metadata } from "next";
import type { ReactNode } from "react";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Tajawal } from "next/font/google";
import Script from "next/script";

import AuthProvider from "../components/providers/AuthProvider";
import FloatingWhatsAppButton from "../components/domain/FloatingWhatsAppButton/FloatingWhatsAppButton";

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
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4Y31ZLGBG2"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4Y31ZLGBG2');
            `,
          }}
        />
      </head>
      <body className={` ${tajawal.variable} antialiased overflow-x-hidden`}>
        <AuthProvider>
          {children}
          <FloatingWhatsAppButton />
        </AuthProvider>
        <Script
          src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
