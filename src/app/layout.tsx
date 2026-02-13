import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    default: "Uche & Mmesoma Foundation | Empowering Children Through Education",
    template: "%s | Uche & Mmesoma Foundation"
  },
  description: "The Uche & Mmesoma Foundation empowers children through education in Nigeria, with possible expansions to other african countries. We provide school supplies, backpacks, and educational resources to ensure no child is denied access to quality education.",
  keywords: [
    "Uche & Mmesoma Foundation",
    "children education",
    "Nigeria charity",
    "african education",
    "school supplies",
    "backpacks",
    "educational resources",
    "child education",
    "empowerment",
    "community support",
    "RC 7359601",
  ],
  authors: [{ name: "Uche & Mmesoma Foundation" }],
  creator: "Uche & Mmesoma Foundation",
  publisher: "Uche & Mmesoma Foundation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Uche & Mmesoma Foundation",
    description: "The Uche & Mmesoma Foundation empowers children through education in Nigeria, with possible expansions to other african countries. We provide school supplies, backpacks, and educational resources to ensure no child is denied access to quality education.",
    url: "https://uchemmesomafoundation.com",
    siteName: "Uche & Mmesoma Foundation",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uche & Mmesoma Foundation",
    description: "Empowering children through education in Nigeria and potentially other african countries",
    creator: "@uchemmesomafoundation",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/icon-512.png" sizes="512x512" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1E56A0" />
        <meta name="msapplication-TileColor" content="#1E56A0" />
        <meta name="msapplication-TileImage" content="/favicon-32x32.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
