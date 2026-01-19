"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PaymentBreakdownChart } from "@/components/PaymentBreakdownChart";
import {
  calculateMortgage,
  syncDownPayment,
  type MortgageInputs,
} from "@/lib/mortgage-logic";
import {
  formatCurrency,
  formatNumber,
  parseFormattedNumber,
} from "@/lib/utils";
import { Home, DollarSign, Calendar, Percent, Building2, Shield, Users } from "lucide-react";

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState<string>("500000");
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [downPaymentDollar, setDownPaymentDollar] = useState<string>("100000");
  const [downPaymentMode, setDownPaymentMode] = useState<"percent" | "dollar">("percent");
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [propertyTax, setPropertyTax] = useState<string>("6000");
  const [homeInsurance, setHomeInsurance] = useState<string>("1200");
  const [hoaFees, setHoaFees] = useState<string>("200");

  const homePriceNum = useMemo(() => parseFormattedNumber(homePrice), [homePrice]);
  const downPaymentDollarNum = useMemo(
    () => parseFormattedNumber(downPaymentDollar),
    [downPaymentDollar]
  );
  const interestRateNum = useMemo(() => parseFloat(interestRate) || 0, [interestRate]);
  const propertyTaxNum = useMemo(() => parseFormattedNumber(propertyTax), [propertyTax]);
  const homeInsuranceNum = useMemo(
    () => parseFormattedNumber(homeInsurance),
    [homeInsurance]
  );
  const hoaFeesNum = useMemo(() => parseFormattedNumber(hoaFees), [hoaFees]);

  const handleHomePriceChange = useCallback((value: string) => {
    const numValue = parseFormattedNumber(value);
    setHomePrice(formatNumber(numValue));
    
    if (downPaymentMode === "percent") {
      const synced = syncDownPayment(numValue, downPaymentPercent, 0, "percent");
      setDownPaymentDollar(formatNumber(synced.downPaymentDollar));
    } else {
      const synced = syncDownPayment(numValue, 0, downPaymentDollarNum, "dollar");
      setDownPaymentPercent(synced.downPaymentPercent);
    }
  }, [downPaymentPercent, downPaymentDollarNum, downPaymentMode]);

  const handleDownPaymentPercentChange = useCallback((value: number) => {
    setDownPaymentPercent(value);
    setDownPaymentMode("percent");
    const synced = syncDownPayment(homePriceNum, value, 0, "percent");
    setDownPaymentDollar(formatNumber(synced.downPaymentDollar));
  }, [homePriceNum]);

  const handleDownPaymentDollarChange = useCallback((value: string) => {
    const numValue = parseFormattedNumber(value);
    setDownPaymentDollar(formatNumber(numValue));
    setDownPaymentMode("dollar");
    const synced = syncDownPayment(homePriceNum, 0, numValue, "dollar");
    setDownPaymentPercent(synced.downPaymentPercent);
  }, [homePriceNum]);

  const handleInterestRateChange = useCallback((value: string) => {
    const numValue = parseFloat(value) || 0;
    setInterestRate(numValue.toString());
  }, []);

  const inputs: MortgageInputs = useMemo(
    () => ({
      homePrice: homePriceNum,
      downPaymentPercent,
      downPaymentDollar: downPaymentDollarNum,
      loanTerm,
      interestRate: interestRateNum,
      propertyTax: propertyTaxNum,
      homeInsurance: homeInsuranceNum,
      hoaFees: hoaFeesNum,
    }),
    [
      homePriceNum,
      downPaymentPercent,
      downPaymentDollarNum,
      loanTerm,
      interestRateNum,
      propertyTaxNum,
      homeInsuranceNum,
      hoaFeesNum,
    ]
  );

  const results = useMemo(() => calculateMortgage(inputs), [inputs]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          Mortgage Calculator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Calculate your monthly payment and total cost
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-600" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="home-price">Home Price</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="home-price"
                    type="text"
                    value={homePrice}
                    onChange={(e) => handleHomePriceChange(e.target.value)}
                    placeholder="500,000"
                    className="flex-1"
                  />
                  <Slider
                    value={homePriceNum}
                    onValueChange={(value) => handleHomePriceChange(formatNumber(value))}
                    min={100000}
                    max={2000000}
                    step={10000}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="down-payment-percent">Down Payment (%)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="down-payment-percent"
                    type="number"
                    value={downPaymentPercent}
                    onChange={(e) =>
                      handleDownPaymentPercentChange(parseFloat(e.target.value) || 0)
                    }
                    min={0}
                    max={100}
                    step={0.1}
                    className="w-24"
                  />
                  <Slider
                    value={downPaymentPercent}
                    onValueChange={handleDownPaymentPercentChange}
                    min={0}
                    max={100}
                    step={0.5}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="down-payment-dollar">Down Payment ($)</Label>
                <Input
                  id="down-payment-dollar"
                  type="text"
                  value={downPaymentDollar}
                  onChange={(e) => handleDownPaymentDollarChange(e.target.value)}
                  placeholder="100,000"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                Loan Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="loan-term">Loan Term</Label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setLoanTerm(15)}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                      loanTerm === 15
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    15 Years
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoanTerm(30)}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                      loanTerm === 30
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    30 Years
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="interest-rate"
                    type="number"
                    value={interestRate}
                    onChange={(e) => handleInterestRateChange(e.target.value)}
                    min={0}
                    max={20}
                    step={0.125}
                    className="w-32"
                  />
                  <Slider
                    value={interestRateNum}
                    onValueChange={(value) => handleInterestRateChange(value.toString())}
                    min={0}
                    max={15}
                    step={0.125}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                Additional Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="property-tax">Property Tax (Annual)</Label>
                <Input
                  id="property-tax"
                  type="text"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(formatNumber(parseFormattedNumber(e.target.value)))}
                  placeholder="6,000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="home-insurance">Home Insurance (Annual)</Label>
                <Input
                  id="home-insurance"
                  type="text"
                  value={homeInsurance}
                  onChange={(e) =>
                    setHomeInsurance(formatNumber(parseFormattedNumber(e.target.value)))
                  }
                  placeholder="1,200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoa-fees">HOA Fees (Monthly)</Label>
                <Input
                  id="hoa-fees"
                  type="text"
                  value={hoaFees}
                  onChange={(e) =>
                    setHoaFees(formatNumber(parseFormattedNumber(e.target.value)))
                  }
                  placeholder="200"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-900 mb-6">
                {formatCurrency(results.totalMonthlyPayment)}
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Principal & Interest</span>
                  <span className="font-medium text-slate-900">
                    {formatCurrency(results.monthlyPrincipalAndInterest)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Property Tax</span>
                  <span className="font-medium text-slate-900">
                    {formatCurrency(results.monthlyPropertyTax)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Home Insurance</span>
                  <span className="font-medium text-slate-900">
                    {formatCurrency(results.monthlyHomeInsurance)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>HOA Fees</span>
                  <span className="font-medium text-slate-900">
                    {formatCurrency(results.monthlyHoaFees)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loan Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-600">Loan Amount</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(results.principal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Total Interest</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(results.totalInterestPaid)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Total Cost</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(results.totalCost)}
                </span>
              </div>
            </CardContent>
          </Card>

          <PaymentBreakdownChart
            principalAndInterest={results.monthlyPrincipalAndInterest}
            propertyTax={results.monthlyPropertyTax}
            homeInsurance={results.monthlyHomeInsurance}
            hoaFees={results.monthlyHoaFees}
          />
        </div>
      </div>
    </div>
  );
}

