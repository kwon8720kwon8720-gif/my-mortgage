export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question: "What is included in my monthly mortgage payment?",
    answer: "Your monthly mortgage payment typically includes principal and interest (P&I), property taxes, home insurance, and HOA fees if applicable. The principal is the amount you borrowed, while interest is the cost of borrowing. Property taxes and insurance are usually escrowed and paid monthly.",
  },
  {
    question: "What is the difference between interest rate and APR?",
    answer: "The interest rate is the cost of borrowing the principal loan amount. APR (Annual Percentage Rate) includes the interest rate plus other loan costs like origination fees and points. This calculator shows the interest rate, which is the base cost of your loan.",
  },
  {
    question: "How does down payment affect my mortgage?",
    answer: "A larger down payment reduces your loan amount, which lowers your monthly payment and total interest paid over the life of the loan. It also helps you avoid private mortgage insurance (PMI) if you put down 20% or more. This calculator allows you to adjust the down payment to see its impact.",
  },
  {
    question: "Should I choose a 15-year or 30-year mortgage?",
    answer: "A 15-year mortgage has higher monthly payments but significantly less total interest paid and builds equity faster. A 30-year mortgage has lower monthly payments, making it more affordable, but you'll pay more interest over time. Use this calculator to compare both options based on your financial situation.",
  },
  {
    question: "Are the calculations accurate?",
    answer: "This calculator provides estimates based on standard mortgage formulas. Actual rates and terms depend on your credit score, lender policies, and market conditions. Always consult with a qualified mortgage professional for precise quotes and loan terms.",
  },
  {
    question: "What are property taxes and how are they calculated?",
    answer: "Property taxes are annual fees paid to local governments based on your home's assessed value and local tax rates. They vary by location and are typically paid monthly through an escrow account. This calculator uses your annual property tax estimate to calculate the monthly portion.",
  },
  {
    question: "Do I need home insurance?",
    answer: "Most lenders require homeowners insurance to protect their investment. Even if not required, insurance protects your property from damage. The cost varies by location, home value, and coverage level. This calculator includes annual insurance costs in your monthly payment estimate.",
  },
  {
    question: "What are HOA fees?",
    answer: "HOA (Homeowners Association) fees are monthly payments for shared community amenities and maintenance. Not all homes have HOA fees. If your property is part of an HOA, these fees are included in your total monthly housing cost.",
  },
];

export function getPageTitle(priceK: number, rate: number, region: string): string {
  const regionName = region
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return `${priceK}k Home Mortgage Payment Calculator - ${rate}% Rate in ${regionName}`;
}

export function getPageDescription(priceK: number, rate: number, region: string): string {
  const regionName = region
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return `Calculate your estimated monthly mortgage payment for a $${priceK.toLocaleString("en-US")},000 home in ${regionName} with a ${rate}% interest rate. Includes principal, interest, taxes, insurance, and HOA fees.`;
}

