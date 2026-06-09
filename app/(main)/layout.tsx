import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransitionProvider from "@/components/PageTransitionProvider";
import AuthProvider from "@/components/AuthProvider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <PageTransitionProvider>
        <AuthProvider>
          <Header />
          <main className="flex-1 snap-y snap-proximity">{children}</main>
          <Footer />
        </AuthProvider>
      </PageTransitionProvider>
    </SmoothScroll>
  );
}
