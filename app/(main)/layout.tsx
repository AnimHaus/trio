import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransitionProvider from "@/components/PageTransitionProvider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <PageTransitionProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </PageTransitionProvider>
    </SmoothScroll>
  );
}
