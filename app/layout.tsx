import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";

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
    default: "Trio Anime — India's First Original Anime | Vaibhavi Studios",
    template: "%s | Trio Anime",
  },
  description:
    "Trio is India's first original anime, brought to you by Vaibhavi Studios — a creative house specialising in animation, motion graphics, VFX, and design since 2018. Explore the manga, watch the trailer, and join the journey.",
  keywords: [
    "Trio anime",
    "India first anime",
    "original Indian anime",
    "Vaibhavi Studios",
    "Vaibhavi Enterprises",
    "animation studio India",
    "motion graphics India",
    "VFX studio India",
    "Indian animation",
    "manga India",
    "anime series",
    "2D animation",
    "3D modelling India",
  ],
  authors: [{ name: "Vaibhavi Studios" }],
  creator: "Vaibhavi Studios",
  publisher: "Vaibhavi Studios",
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
      "Trio is India's first original anime from Vaibhavi Studios — a creative house specialising in animation, motion graphics, VFX, and design since 2018.",
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
      "Trio is India's first original anime from Vaibhavi Studios — a creative house specialising in animation, motion graphics, VFX, and design since 2018.",
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
        {children}
      </body>
    </html>
  );
}
