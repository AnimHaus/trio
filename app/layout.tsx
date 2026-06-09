import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransitionProvider from "@/components/PageTransitionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Trio Anime — India's First Original Anime | Vaibhav Studios",
    template: "%s | Trio Anime",
  },
  description:
    "Trio is India's first original anime, brought to you by Vaibhav Studios — the only Indian animation studio with an International Emmy nomination. Explore the manga, watch the trailer, and join the journey.",
  keywords: [
    "Trio anime",
    "India first anime",
    "original Indian anime",
    "Vaibhav Studios",
    "Lamput",
    "anime studio India",
    "Indian animation",
    "manga India",
    "anime series",
    "International Emmy animation",
  ],
  authors: [{ name: "Vaibhav Studios" }],
  creator: "Vaibhav Studios",
  publisher: "Vaibhav Studios",
  metadataBase: new URL("https://trioanime.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Trio Anime",
    title: "Trio Anime — India's First Original Anime",
    description:
      "Trio is India's first original anime from Vaibhav Studios — the Emmy-nominated studio behind Lamput.",
    url: "https://trioanime.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Trio Anime",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trio Anime — India's First Original Anime",
    description:
      "Trio is India's first original anime from Vaibhav Studios — the Emmy-nominated studio behind Lamput.",
    images: ["/og-image.png"],
    site: "@trioanime",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "entertainment",
  applicationName: "Trio Anime",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Trio Anime",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  other: {
    "og:country-name": "India",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <SmoothScroll>
          <PageTransitionProvider>
            <Header />
            <main className="flex-1 snap-y snap-proximity">{children}</main>
            <Footer />
          </PageTransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
