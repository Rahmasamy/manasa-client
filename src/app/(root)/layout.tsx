// app/(root)/layout.tsx

import Footer from "@/src/components/layout/Footer/Footer";
import NavBar from "@/src/components/layout/NavBar/NavBar";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full  mx-auto">
       <NavBar />
      <main className="w-full mx-auto">{children}</main>
      <Footer />
    </main>
  );
}
