import AuthProvider from "@/components/AuthProvider";
import PageTransitionProvider from "@/components/PageTransitionProvider";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageTransitionProvider>
      <AuthProvider>{children}</AuthProvider>
    </PageTransitionProvider>
  );
}
