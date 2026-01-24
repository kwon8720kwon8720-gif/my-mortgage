import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { STATES, CREDIT_TIERS, POST_COUNT, type CreditTier } from "@/lib/config";
import { getContentForPage } from "@/lib/content";
import { stableHash, clamp } from "@/lib/utils";
import { ServerEstimateSentence } from "@/components/seo/ServerEstimateSentence";
import { calculateMortgage, type MortgageInputs } from "@/lib/mortgage/engine";
import { faqData } from "@/lib/pseo/templates";

interface PageProps {
  params: Promise<{ state: string; tier: string }>;
}

function generateJsonLd(state: string, tier: string, stateDisplay: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const pageUrl = `${baseUrl}/mortgage-rates/${state}/${tier}`;

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
        name: `Mortgage Rates ${stateDisplay}`,
        item: pageUrl,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [faqSchema, breadcrumbSchema],
  };
}

function getDefaultInputs(state: string, tier: CreditTier): MortgageInputs {
  const hash = stableHash(`${state}-${tier}`);
  
  // Deterministic defaults based on hash
  const homePriceBase = 300000 + ((hash % 70) * 10000);
  const homePrice = clamp(homePriceBase, 100000, 2000000);
  
  const downPaymentPercentBase = 10 + ((hash % 20) * 2);
  const downPaymentPercent = clamp(downPaymentPercentBase, 5, 50);
  const downPaymentValue = Math.round(homePrice * downPaymentPercent / 100);
  
  const interestRateBase = 4.0 + ((hash % 40) * 0.125);
  const interestRate = clamp(interestRateBase, 3.0, 10.0);
  
  const termOptions: (10 | 15 | 20 | 30)[] = [10, 15, 20, 30];
  const loanTerm = termOptions[hash % 4];
  
  const propertyTaxBase = homePrice * 0.01 + ((hash % 10) * 500);
  const propertyTax = clamp(propertyTaxBase, 0, 50000);
  
  const homeInsuranceBase = 1000 + ((hash % 20) * 100);
  const homeInsurance = clamp(homeInsuranceBase, 500, 5000);
  
  const hoaFeesBase = (hash % 10) * 50;
  const hoaFees = clamp(hoaFeesBase, 0, 500);
  
  return {
    homePrice,
    downPaymentValue,
    loanTerm,
    interestRate,
    propertyTax,
    homeInsurance,
    hoaFees,
  };
}

export async function generateStaticParams() {
  const params: Array<{ state: string; tier: string }> = [];
  
  // Generate exactly POST_COUNT pages
  let count = 0;
  for (const state of STATES) {
    if (count >= POST_COUNT) break;
    for (const tier of CREDIT_TIERS) {
      if (count >= POST_COUNT) break;
      params.push({ state: state.slug, tier });
      count++;
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, tier } = await params;
  
  const stateObj = STATES.find((s) => s.slug === state);
  const tierValid = CREDIT_TIERS.includes(tier as CreditTier);
  
  if (!stateObj || !tierValid) {
    return {
      title: "Mortgage Calculator",
      description: "Calculate your mortgage payment",
    };
  }
  
  const stateDisplay = stateObj.displayName;
  const tierDisplay = tier.charAt(0).toUpperCase() + tier.slice(1);
  
  const title = `Mortgage Rates for ${tierDisplay} Credit in ${stateDisplay} | Mortgage Calculator`;
  const description = `Calculate your estimated mortgage payment for ${stateDisplay} with ${tierDisplay} credit. Explore mortgage rates, monthly payments, and loan terms. Educational estimates only.`;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const canonical = `${baseUrl}/mortgage-rates/${state}/${tier}`;
  
  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Mortgage Calculator",
    },
  };
}

export default async function MortgageRatesPage({ params }: PageProps) {
  const { state, tier } = await params;
  
  const stateObj = STATES.find((s) => s.slug === state);
  const tierValid = CREDIT_TIERS.includes(tier as CreditTier);
  
  if (!stateObj || !tierValid) {
    notFound();
  }
  
  const stateDisplay = stateObj.displayName;
  const tierDisplay = tier.charAt(0).toUpperCase() + tier.slice(1);
  const content = getContentForPage(state, tier as CreditTier);
  const defaultInputs = getDefaultInputs(state, tier as CreditTier);
  const jsonLd = generateJsonLd(state, tier, stateDisplay);
  
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
              Mortgage Rates for {tierDisplay} Credit in {stateDisplay}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Estimate your monthly mortgage payment with illustrative rates for {tierDisplay} credit in {stateDisplay}
            </p>
          </div>

          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl mb-8">
            <p className="text-sm text-slate-700">
              <strong className="font-semibold text-slate-900">Disclaimer:</strong> This calculator is for educational and estimation purposes only. It does not constitute a loan offer, financial advice, or guarantee of any rates or terms. Actual mortgage rates, terms, and payments depend on your creditworthiness, lender policies, and current market conditions. Always consult with qualified mortgage professionals for accurate quotes and loan terms.
            </p>
          </div>

          <div className="mb-8">
            <MortgageCalculator
              initialHomePrice={defaultInputs.homePrice}
              initialDownPaymentValue={defaultInputs.downPaymentValue}
              initialLoanTerm={defaultInputs.loanTerm}
              initialInterestRate={defaultInputs.interestRate}
              initialPropertyTax={defaultInputs.propertyTax}
              initialHomeInsurance={defaultInputs.homeInsurance}
              initialHoaFees={defaultInputs.hoaFees}
            />
          </div>

          <div className="mt-12 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Understanding Mortgage Rates in {stateDisplay}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-700">
                <p>{content.intro}</p>
                <p>{content.body}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion items={faqData} />
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
