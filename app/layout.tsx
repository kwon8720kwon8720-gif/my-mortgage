import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Mortgage Calculator | Calculate Your Monthly Payment",
  description: "Professional mortgage calculator to estimate your monthly payment, total interest, and total cost. Calculate principal, interest, property tax, home insurance, and HOA fees.",
  keywords: ["mortgage calculator", "home loan calculator", "monthly payment", "mortgage payment"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
