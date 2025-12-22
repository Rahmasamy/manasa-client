import NavBar from "@/src/components/layout/NavBar/NavBar";
import Footer from "@/src/components/layout/Footer/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="w-full mx-auto">{children}</main>
      <Footer />
    </>
  );
}
