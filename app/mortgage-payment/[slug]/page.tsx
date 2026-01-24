import type { Metadata } from "next";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { parseSlug } from "@/lib/pseo/slug";
import { getPageTitle, getPageDescription, faqData } from "@/lib/pseo/templates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { notFound } from "next/navigation";
import { pagesCache } from "@/lib/pseo/pagesCache";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = pagesCache.getSlugsForBuild();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parts = parseSlug(slug);
  
  if (!parts) {
    return {
      title: "Mortgage Calculator",
      description: "Calculate your mortgage payment",
    };
  }

  const { priceK, rate, region } = parts;
  const title = getPageTitle(priceK, rate, region);
  const description = getPageDescription(priceK, rate, region);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const canonical = `${baseUrl}/mortgage-payment/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
  };
}

function generateJsonLd(parts: { priceK: number; rate: number; region: string }) {
  const { priceK, rate, region } = parts;
  const regionName = region
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const pageUrl = `${baseUrl}/mortgage-payment/${parts.priceK}k-${region}-${rate.toFixed(1).replace(".", "-")}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${priceK}k Mortgage - ${regionName}`,
        item: pageUrl,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [faqSchema, breadcrumbSchema],
  };
}

export default async function MortgagePaymentPage({ params }: PageProps) {
  const { slug } = await params;
  const parts = parseSlug(slug);

  if (!parts) {
    notFound();
  }

  const { priceK, rate, region } = parts;
  const regionName = region
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const jsonLd = generateJsonLd(parts);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
              Mortgage Payment Calculator
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Estimate your monthly payment for a ${priceK.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")},000 home in {regionName} with a {rate}% interest rate
            </p>
          </div>

          <div className="mb-8">
            <MortgageCalculator key={slug} />
          </div>

          <div className="mt-12 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Understanding Your Mortgage Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-700">
                <p>
                  Your monthly mortgage payment consists of several components. The principal and interest (P&I) portion is calculated using a standard amortization formula based on your loan amount, interest rate, and loan term. Property taxes and home insurance are typically escrowed and paid monthly, while HOA fees are added if applicable.
                </p>
                <p>
                  This calculator provides estimates for educational purposes. Actual rates and terms depend on your credit score, lender policies, and current market conditions. Always consult with a qualified mortgage professional for precise quotes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqData.map((faq, index) => (
                    <div key={index} className="border-b border-slate-200 last:border-0 pb-4 last:pb-0">
                      <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                      <p className="text-slate-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-slate-600 space-y-2">
                  <p className="font-semibold text-slate-900">Disclaimer</p>
                  <p>
                    This calculator is for educational and estimation purposes only. It does not constitute a loan offer, financial advice, or guarantee of any rates or terms. Actual mortgage rates, terms, and payments depend on your creditworthiness, lender policies, and market conditions. Always consult with qualified mortgage professionals for accurate quotes and loan terms.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

