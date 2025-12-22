import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Tajawal } from "next/font/google";


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
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={` ${tajawal.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
