import { MortgageCalculator } from "@/components/MortgageCalculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { faqData } from "@/lib/pseo/templates";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-12 sm:py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            US Premium Mortgage Calculator
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Estimate your monthly mortgage payment with our comprehensive calculator. 
            This tool is for educational and estimation purposes only and does not constitute 
            a loan offer, financial advice, or guarantee of any rates or terms.
          </p>
        </section>

        <section className="py-8">
          <MortgageCalculator />
        </section>

        <section className="py-12 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>How to Use This Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Step 1: Enter Property Details</h3>
                <p>
                  Start by entering the home price and your down payment amount. You can specify the down payment as either a percentage or dollar amount. The calculator will automatically sync both values for your convenience.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Step 2: Set Loan Terms</h3>
                <p>
                  Choose your loan term (15 or 30 years) and enter the interest rate. The interest rate significantly impacts your monthly payment and total interest paid over the life of the loan.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Step 3: Add Additional Costs</h3>
                <p>
                  Include annual property taxes, annual home insurance costs, and monthly HOA fees if applicable. These costs are added to your principal and interest to calculate your total monthly payment.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Understanding Mortgage Payments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-slate-700">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Principal and Interest (P&I)</h3>
                <p>
                  The principal is the amount you borrow to purchase the home. Interest is the cost of borrowing that money. Your monthly P&I payment is calculated using a standard amortization formula that ensures your loan is paid off over the selected term. Early payments consist mostly of interest, while later payments include more principal.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Property Taxes</h3>
                <p>
                  Property taxes are annual fees paid to local governments based on your home's assessed value and local tax rates. These vary significantly by location. Most lenders require you to pay property taxes through an escrow account, which means you pay one-twelfth of the annual amount each month.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Home Insurance</h3>
                <p>
                  Homeowners insurance protects your property from damage and is typically required by lenders. The cost depends on your home's value, location, and coverage level. Like property taxes, insurance is often paid monthly through an escrow account.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">HOA Fees</h3>
                <p>
                  If your property is part of a homeowners association (HOA), you'll pay monthly fees for shared amenities and maintenance. Not all homes have HOA fees, but when they do, they're included in your total monthly housing cost.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Interest Rate vs. APR</h3>
                <p>
                  The interest rate is the base cost of borrowing the principal amount. APR (Annual Percentage Rate) includes the interest rate plus other loan costs like origination fees and points. This calculator uses the interest rate to calculate your monthly payment. When comparing actual loan offers, pay attention to both the interest rate and APR to understand the full cost.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Down Payment Impact</h3>
                <p>
                  A larger down payment reduces your loan amount, which lowers both your monthly payment and the total interest you'll pay over the life of the loan. Additionally, putting down 20% or more typically allows you to avoid private mortgage insurance (PMI), which can save hundreds of dollars per month. Use the calculator to see how different down payment amounts affect your payments.
                </p>
              </div>
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
        </section>

        <footer className="py-12 border-t border-slate-200 mt-12">
          <div className="space-y-4 text-sm text-slate-600">
            <div>
              <p className="font-semibold text-slate-900 mb-2">Disclaimer</p>
              <p>
                This mortgage calculator is for educational and estimation purposes only. It does not constitute a loan offer, financial advice, or guarantee of any rates or terms. Actual mortgage rates, terms, and payments depend on your creditworthiness, lender policies, and current market conditions. Always consult with qualified mortgage professionals for accurate quotes and loan terms.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              <a href="/contact" className="text-blue-600 hover:underline">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
