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
  title: "Uche & Mmesoma Foundation | Empowering Education",
  description: "Enhancing education for the less privileged. Making sure no child is denied the opportunity to acquire good education. Operating in Nigeria and USA.",
  keywords: ["charity", "education", "Nigeria", "foundation", "children", "school supplies", "nonprofit"],
  openGraph: {
    title: "Uche & Mmesoma Foundation",
    description: "Empowering children through education in Nigeria and USA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
