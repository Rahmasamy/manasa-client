// app/(root)/layout.tsx

import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <main className="container mx-auto p-4">{children}</main>
        </body>
        </html>
    );
}
