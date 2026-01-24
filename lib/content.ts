import { stableHash } from "./utils";
import type { CreditTier } from "./config";

const TEMPLATES = [
  {
    intro: "Understanding mortgage rates in {state} for {tier} credit can help you estimate your monthly payment. Mortgage rates vary based on creditworthiness, with {tier} credit borrowers typically seeing rates that reflect their risk profile.",
    body: "When calculating your mortgage payment, consider that rates are illustrative and based on general market conditions. Actual rates depend on multiple factors including your credit score, debt-to-income ratio, loan-to-value ratio, and lender policies. Use this calculator to explore different scenarios and understand how changes in interest rates affect your monthly payment.",
  },
  {
    intro: "Mortgage rates in {state} fluctuate based on economic conditions and borrower profiles. For borrowers with {tier} credit, rates may differ from those with excellent credit. This calculator provides estimates to help you plan your home purchase.",
    body: "Remember that mortgage rates are not guaranteed and can change daily. The rates shown are for educational purposes only. Always consult with multiple lenders to get current rate quotes. Your actual rate will depend on your complete financial profile and the specific loan program you choose.",
  },
  {
    intro: "If you're considering a home purchase in {state} with {tier} credit, understanding potential mortgage rates is important. Rates vary by lender, loan type, and borrower qualifications.",
    body: "This calculator helps you estimate monthly payments based on illustrative rates. Property taxes, insurance costs, and HOA fees vary significantly by location within {state}. Be sure to research local costs and consult with real estate and mortgage professionals for accurate estimates.",
  },
  {
    intro: "Homebuyers in {state} with {tier} credit should explore multiple mortgage options. Interest rates impact both your monthly payment and total interest paid over the life of the loan.",
    body: "The calculations provided are estimates for educational purposes. Your actual mortgage terms will depend on lender requirements, market conditions at the time of application, and your complete financial situation. Consider working with a mortgage broker to compare offers from multiple lenders.",
  },
  {
    intro: "Mortgage rates in {state} reflect local market conditions and national economic factors. Borrowers with {tier} credit may see different rates than those with higher credit scores.",
    body: "Use this calculator as a starting point for understanding mortgage payments. Keep in mind that rates are illustrative and actual rates may be higher or lower. Additionally, property taxes and insurance costs can vary significantly within {state}, so local research is essential.",
  },
  {
    intro: "When planning a home purchase in {state}, understanding how {tier} credit affects mortgage rates helps set realistic expectations. Rates are one component of your total monthly housing cost.",
    body: "This calculator provides estimates based on standard mortgage formulas. Actual rates and terms depend on your credit history, income stability, down payment amount, and lender policies. Always get pre-approved with actual lenders before making an offer on a home.",
  },
  {
    intro: "Mortgage rates for {tier} credit borrowers in {state} can vary by lender and loan program. Understanding these rates helps you estimate your monthly payment and total loan cost.",
    body: "The rates and calculations shown are for educational and estimation purposes only. Real mortgage rates change daily and depend on many factors beyond credit score. Work with qualified mortgage professionals to get current rate quotes and understand all loan options available to you.",
  },
  {
    intro: "Homebuyers in {state} with {tier} credit should understand how interest rates affect their mortgage payment. Even small rate differences can significantly impact monthly payments and total interest paid.",
    body: "This calculator uses illustrative rates to demonstrate payment calculations. Actual rates will depend on your complete financial profile, the loan program you choose, and current market conditions. Property taxes and insurance costs also vary by location within {state}, so local estimates are important.",
  },
  {
    intro: "Mortgage rates in {state} are influenced by national economic trends and local market conditions. For borrowers with {tier} credit, rates may reflect additional risk factors considered by lenders.",
    body: "Use this calculator to explore different scenarios and understand how changes in interest rates, loan terms, and down payments affect your monthly payment. Remember that all rates and calculations are estimates. Consult with mortgage professionals for current rates and personalized loan options.",
  },
  {
    intro: "Understanding mortgage rates for {tier} credit in {state} helps you plan your home purchase budget. Rates vary by lender, loan type, and borrower qualifications.",
    body: "The calculations provided are educational estimates. Actual mortgage rates change frequently and depend on many factors including your credit score, debt-to-income ratio, employment history, and the specific loan program. Always verify rates with actual lenders and consider getting pre-approved before house hunting.",
  },
];

export function getContentForPage(state: string, tier: CreditTier): { intro: string; body: string } {
  const stateTitle = state
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  
  const tierTitle = tier.charAt(0).toUpperCase() + tier.slice(1);
  
  const hash = stableHash(`${state}-${tier}`);
  const templateIndex = hash % TEMPLATES.length;
  const template = TEMPLATES[templateIndex];
  
  return {
    intro: template.intro.replace(/{state}/g, stateTitle).replace(/{tier}/g, tierTitle),
    body: template.body.replace(/{state}/g, stateTitle).replace(/{tier}/g, tierTitle),
  };
}
