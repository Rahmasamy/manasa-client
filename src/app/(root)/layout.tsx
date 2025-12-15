// app/(root)/layout.tsx

import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full  mx-auto">{children}</main>;
}
