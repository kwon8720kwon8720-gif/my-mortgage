import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Contact | Mortgage Calculator",
  description: "Contact information for the mortgage calculator.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-slate-700">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">About This Calculator</h2>
              <p>
                This mortgage calculator is designed to provide educational estimates of mortgage payments. It helps users understand how different factors like home price, down payment, interest rate, and loan terms affect monthly payments and total costs.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Important Notice</h2>
              <p>
                This calculator is for estimation purposes only. It does not provide financial advice, loan offers, or guarantees of any rates or terms. Actual mortgage rates and terms depend on your creditworthiness, lender policies, and current market conditions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Getting Accurate Quotes</h2>
              <p>
                For accurate mortgage quotes and loan terms, please consult with qualified mortgage professionals, lenders, or financial advisors. They can provide personalized rates based on your specific financial situation and credit profile.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Feedback</h2>
              <p>
                If you have questions, feedback, or notice any issues with the calculator, please note that this is an educational tool. For technical support or inquiries, please refer to your web hosting provider or development team.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

