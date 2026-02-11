import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description: "Calculate your monthly mortgage payment and total interest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {







  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Mortgage Calculator",
    "description": "Calculate your monthly mortgage payment and total interest",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "featureList": [
      "Monthly payment calculation",
      "Total interest calculation",
      "Payment breakdown visualization",
      "Loan term analysis",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
  src="https://www.googletagmanager.com/gtag/js?id=G-QLSJ4X8WZ7"
  strategy="afterInteractive"
/>
<Script id="ga4" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-QLSJ4X8WZ7');
  `}
</Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
