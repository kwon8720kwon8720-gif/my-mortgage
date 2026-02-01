"use client";

import * as React from "react";
import { InputSection } from "@/components/calculator/input-section";
import { ResultsSection } from "@/components/calculator/results-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateMortgage } from "@/lib/mortgage/engine";
import { defaultMortgageInput, type MortgageInput } from "@/lib/schemas";
import { formatCurrency, parseNumericString } from "@/lib/utils";

export default function HomePage() {
  const [inputs, setInputs] = React.useState<MortgageInput>(defaultMortgageInput);
  const [stringValues, setStringValues] = React.useState({
    homePrice: "400000",
    downPayment: "80000",
    termYears: "30",
    rateBps: "6.50",
  });

  const result = React.useMemo(() => {
    return calculateMortgage(inputs.homePrice, inputs.downPayment, inputs.termYears, inputs.rateBps);
  }, [inputs.homePrice, inputs.downPayment, inputs.termYears, inputs.rateBps]);

  const handleInputChange = (field: keyof MortgageInput, value: number) => {
    setInputs((prev) => {
      const updated = { ...prev, [field]: value };
      // Ensure downPayment doesn't exceed homePrice
      if (field === "homePrice" && updated.downPayment > updated.homePrice) {
        updated.downPayment = updated.homePrice;
        setStringValues((prev) => ({
          ...prev,
          downPayment: formatCurrency(updated.downPayment).replace("$", "").replace(/,/g, ""),
        }));
      }
      // Sync string values for sliders
      if (field === "homePrice") {
        setStringValues((prev) => ({
          ...prev,
          homePrice: formatCurrency(updated.homePrice).replace("$", "").replace(/,/g, ""),
        }));
      } else if (field === "downPayment") {
        setStringValues((prev) => ({
          ...prev,
          downPayment: formatCurrency(updated.downPayment).replace("$", "").replace(/,/g, ""),
        }));
      } else if (field === "termYears") {
        setStringValues((prev) => ({
          ...prev,
          termYears: updated.termYears.toString(),
        }));
      } else if (field === "rateBps") {
        setStringValues((prev) => ({
          ...prev,
          rateBps: (updated.rateBps / 100).toFixed(2),
        }));
      }
      return updated;
    });
  };

  const handleStringChange = (field: keyof MortgageInput, value: string) => {
    setStringValues((prev) => ({ ...prev, [field]: value }));

    // For rate, parse as percentage and convert to bps
    if (field === "rateBps") {
      const parsed = parseNumericString(value);
      const bps = Math.round(parsed * 100);
      setInputs((prev) => ({ ...prev, rateBps: bps }));
      return;
    }

    // For other fields, parse normally
    const parsed = parseNumericString(value);
    if (field === "termYears") {
      setInputs((prev) => ({ ...prev, termYears: parsed }));
    } else {
      handleInputChange(field, parsed);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Agent Summary Block - Static HTML for AI agents */}
      <div className="sr-only" aria-hidden="true">
        <h1>Mortgage Calculator</h1>
        <p>
          A web-based mortgage calculator that calculates monthly payments, total interest, and payment breakdowns.
          Inputs: home price, down payment, loan term (years), and interest rate (percentage).
          Outputs: monthly payment, total payment, total interest, and payment breakdown visualization.
          All calculations are performed client-side. No user data is collected.
        </p>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Mortgage Calculator</h1>
          <p className="text-slate-600">Calculate your monthly payment and total interest</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Loan Information</CardTitle>
            </CardHeader>
            <CardContent>
              <InputSection
                inputs={inputs}
                onInputChange={handleInputChange}
                onStringChange={handleStringChange}
                stringValues={stringValues}
              />
            </CardContent>
          </Card>

          <div>
            <ResultsSection result={result} rateBps={inputs.rateBps} />
          </div>
        </div>
      </div>
    </div>
  );
}
