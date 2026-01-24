"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PaymentBreakdownChart } from "@/components/PaymentBreakdownChart";
import { calculateMortgage, type MortgageInputs } from "@/lib/mortgage/engine";
import {
  formatMoney,
  formatPercent,
  formatMonthly,
  parseFormattedNumber,
  clamp,
  safeNumber,
} from "@/lib/utils";
import { mortgageInputSchema } from "@/lib/schemas";
import { Home, DollarSign, Calendar, Percent, Building2, Shield, Users } from "lucide-react";

interface MortgageCalculatorProps {
  initialHomePrice?: number;
  initialDownPaymentValue?: number;
  initialLoanTerm?: 10 | 15 | 20 | 30;
  initialInterestRate?: number;
  initialPropertyTax?: number;
  initialHomeInsurance?: number;
  initialHoaFees?: number;
}

export function MortgageCalculator({
  initialHomePrice = 500000,
  initialDownPaymentValue = 100000,
  initialLoanTerm = 30,
  initialInterestRate = 6.5,
  initialPropertyTax = 6000,
  initialHomeInsurance = 1200,
  initialHoaFees = 200,
}: MortgageCalculatorProps = {}) {
  // Canonical numeric state
  const [homePrice, setHomePrice] = useState<number>(initialHomePrice);
  const [downPaymentValue, setDownPaymentValue] = useState<number>(initialDownPaymentValue);
  const [loanTerm, setLoanTerm] = useState<10 | 15 | 20 | 30>(initialLoanTerm);
  const [interestRate, setInterestRate] = useState<number>(initialInterestRate);
  const [propertyTax, setPropertyTax] = useState<number>(initialPropertyTax);
  const [homeInsurance, setHomeInsurance] = useState<number>(initialHomeInsurance);
  const [hoaFees, setHoaFees] = useState<number>(initialHoaFees);

  // String state for inputs (to prevent typing jank)
  const [homePriceStr, setHomePriceStr] = useState<string>(formatMoney(homePrice).replace("$", "").replace(/,/g, ""));
  const [downPaymentValueStr, setDownPaymentValueStr] = useState<string>(
    formatMoney(downPaymentValue).replace("$", "").replace(/,/g, "")
  );
  const [interestRateStr, setInterestRateStr] = useState<string>(interestRate.toString());
  const [propertyTaxStr, setPropertyTaxStr] = useState<string>(
    formatMoney(propertyTax).replace("$", "").replace(/,/g, "")
  );
  const [homeInsuranceStr, setHomeInsuranceStr] = useState<string>(
    formatMoney(homeInsurance).replace("$", "").replace(/,/g, "")
  );
  const [hoaFeesStr, setHoaFeesStr] = useState<string>(
    formatMoney(hoaFees).replace("$", "").replace(/,/g, "")
  );

  // Derived down payment percent
  const downPaymentPercent = useMemo(() => {
    if (homePrice <= 0) return 0;
    return (downPaymentValue / homePrice) * 100;
  }, [homePrice, downPaymentValue]);

  // Validation and clamping
  const validatedInputs = useMemo((): MortgageInputs => {
    const validated = mortgageInputSchema.safeParse({
      homePrice: clamp(homePrice, 10000, 100000000),
      downPaymentValue: clamp(downPaymentValue, 0, homePrice),
      loanTerm,
      interestRate: clamp(interestRate, 0, 20),
      propertyTax: clamp(propertyTax, 0, 5000000),
      homeInsurance: clamp(homeInsurance, 0, 2000000),
      hoaFees: clamp(hoaFees, 0, 20000),
    });

    if (validated.success) {
      return validated.data;
    }

    // Fallback to clamped values
    return {
      homePrice: clamp(homePrice, 10000, 100000000),
      downPaymentValue: clamp(downPaymentValue, 0, homePrice),
      loanTerm,
      interestRate: clamp(interestRate, 0, 20),
      propertyTax: clamp(propertyTax, 0, 5000000),
      homeInsurance: clamp(homeInsurance, 0, 2000000),
      hoaFees: clamp(hoaFees, 0, 20000),
    };
  }, [homePrice, downPaymentValue, loanTerm, interestRate, propertyTax, homeInsurance, hoaFees]);

  const results = useMemo(() => calculateMortgage(validatedInputs), [validatedInputs]);

  // Input handlers
  const handleHomePriceBlur = useCallback(() => {
    const num = parseFormattedNumber(homePriceStr);
    const clamped = clamp(num, 10000, 100000000);
    setHomePrice(clamped);
    setHomePriceStr(clamped.toString().replace(/,/g, ""));
    
    // Maintain down payment percent when price changes
    const newDownPayment = Math.round(clamped * (downPaymentValue / homePrice));
    const clampedDownPayment = clamp(newDownPayment, 0, clamped);
    setDownPaymentValue(clampedDownPayment);
    setDownPaymentValueStr(clampedDownPayment.toString().replace(/,/g, ""));
  }, [homePriceStr, downPaymentValue, homePrice]);

  const handleHomePriceChange = useCallback((value: string) => {
    setHomePriceStr(value);
  }, []);

  const handleHomePriceSlider = useCallback((value: number) => {
    const clamped = clamp(value, 10000, 100000000);
    setHomePrice(clamped);
    setHomePriceStr(clamped.toString().replace(/,/g, ""));
    
    // Maintain down payment percent
    const newDownPayment = Math.round(clamped * (downPaymentValue / homePrice));
    const clampedDownPayment = clamp(newDownPayment, 0, clamped);
    setDownPaymentValue(clampedDownPayment);
    setDownPaymentValueStr(clampedDownPayment.toString().replace(/,/g, ""));
  }, [downPaymentValue, homePrice]);

  const handleDownPaymentPercentChange = useCallback((value: number) => {
    const percent = clamp(value, 0, 100);
    const dollar = Math.round(homePrice * percent / 100);
    const clampedDollar = clamp(dollar, 0, homePrice);
    setDownPaymentValue(clampedDollar);
    setDownPaymentValueStr(clampedDollar.toString().replace(/,/g, ""));
  }, [homePrice]);

  const handleDownPaymentDollarBlur = useCallback(() => {
    const num = parseFormattedNumber(downPaymentValueStr);
    const clamped = clamp(num, 0, homePrice);
    setDownPaymentValue(clamped);
    setDownPaymentValueStr(clamped.toString().replace(/,/g, ""));
  }, [downPaymentValueStr, homePrice]);

  const handleDownPaymentDollarChange = useCallback((value: string) => {
    setDownPaymentValueStr(value);
  }, []);

  const handleDownPaymentDollarSlider = useCallback((value: number) => {
    const clamped = clamp(value, 0, homePrice);
    setDownPaymentValue(clamped);
    setDownPaymentValueStr(clamped.toString().replace(/,/g, ""));
  }, [homePrice]);

  const handleInterestRateBlur = useCallback(() => {
    const num = safeNumber(interestRateStr, 0);
    const clamped = clamp(num, 0, 20);
    setInterestRate(clamped);
    setInterestRateStr(clamped.toString());
  }, [interestRateStr]);

  const handleInterestRateChange = useCallback((value: string) => {
    setInterestRateStr(value);
  }, []);

  const handleInterestRateSlider = useCallback((value: number) => {
    const clamped = clamp(value, 0, 20);
    setInterestRate(clamped);
    setInterestRateStr(clamped.toString());
  }, []);

  const handlePropertyTaxBlur = useCallback(() => {
    const num = parseFormattedNumber(propertyTaxStr);
    const clamped = clamp(num, 0, 5000000);
    setPropertyTax(clamped);
    setPropertyTaxStr(clamped.toString().replace(/,/g, ""));
  }, [propertyTaxStr]);

  const handlePropertyTaxChange = useCallback((value: string) => {
    setPropertyTaxStr(value);
  }, []);

  const handleHomeInsuranceBlur = useCallback(() => {
    const num = parseFormattedNumber(homeInsuranceStr);
    const clamped = clamp(num, 0, 2000000);
    setHomeInsurance(clamped);
    setHomeInsuranceStr(clamped.toString().replace(/,/g, ""));
  }, [homeInsuranceStr]);

  const handleHomeInsuranceChange = useCallback((value: string) => {
    setHomeInsuranceStr(value);
  }, []);

  const handleHoaFeesBlur = useCallback(() => {
    const num = parseFormattedNumber(hoaFeesStr);
    const clamped = clamp(num, 0, 20000);
    setHoaFees(clamped);
    setHoaFeesStr(clamped.toString().replace(/,/g, ""));
  }, [hoaFeesStr]);

  const handleHoaFeesChange = useCallback((value: string) => {
    setHoaFeesStr(value);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Inputs Section - Order 2 on mobile, 1 on desktop */}
        <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-indigo-600" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="home-price">Home Price</Label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Input
                    id="home-price"
                    type="text"
                    value={homePriceStr}
                    onChange={(e) => handleHomePriceChange(e.target.value)}
                    onBlur={handleHomePriceBlur}
                    placeholder="500000"
                    className="flex-1"
                  />
                  <Slider
                    value={homePrice}
                    onValueChange={handleHomePriceSlider}
                    min={100000}
                    max={2000000}
                    step={5000}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="down-payment-percent">Down Payment (%)</Label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Input
                    id="down-payment-percent"
                    type="number"
                    value={downPaymentPercent.toFixed(1)}
                    onChange={(e) => handleDownPaymentPercentChange(parseFloat(e.target.value) || 0)}
                    min={0}
                    max={100}
                    step={0.5}
                    className="w-32"
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
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Input
                    id="down-payment-dollar"
                    type="text"
                    value={downPaymentValueStr}
                    onChange={(e) => handleDownPaymentDollarChange(e.target.value)}
                    onBlur={handleDownPaymentDollarBlur}
                    placeholder="100000"
                    className="flex-1"
                  />
                  <Slider
                    value={downPaymentValue}
                    onValueChange={handleDownPaymentDollarSlider}
                    min={0}
                    max={homePrice}
                    step={100}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-indigo-600" />
                Loan Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="loan-term">Loan Term</Label>
                <div className="flex gap-3">
                  {([10, 15, 20, 30] as const).map((term) => (
                    <Button
                      key={term}
                      type="button"
                      variant={loanTerm === term ? "primary" : "secondary"}
                      onClick={() => setLoanTerm(term)}
                      className="flex-1"
                    >
                      {term} Years
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Input
                    id="interest-rate"
                    type="number"
                    value={interestRateStr}
                    onChange={(e) => handleInterestRateChange(e.target.value)}
                    onBlur={handleInterestRateBlur}
                    min={0}
                    max={20}
                    step={0.125}
                    className="w-32"
                  />
                  <Slider
                    value={interestRate}
                    onValueChange={handleInterestRateSlider}
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
                <Building2 className="h-5 w-5 text-indigo-600" />
                Additional Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="property-tax">Property Tax (Annual)</Label>
                <Input
                  id="property-tax"
                  type="text"
                  value={propertyTaxStr}
                  onChange={(e) => handlePropertyTaxChange(e.target.value)}
                  onBlur={handlePropertyTaxBlur}
                  placeholder="6000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="home-insurance">Home Insurance (Annual)</Label>
                <Input
                  id="home-insurance"
                  type="text"
                  value={homeInsuranceStr}
                  onChange={(e) => handleHomeInsuranceChange(e.target.value)}
                  onBlur={handleHomeInsuranceBlur}
                  placeholder="1200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoa-fees">HOA Fees (Monthly)</Label>
                <Input
                  id="hoa-fees"
                  type="text"
                  value={hoaFeesStr}
                  onChange={(e) => handleHoaFeesChange(e.target.value)}
                  onBlur={handleHoaFeesBlur}
                  placeholder="200"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section - Order 1 on mobile, 2 on desktop */}
        <div className="lg:col-span-1 space-y-6 order-1 lg:order-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-900 mb-6">
                {formatMonthly(results.monthlyPayment)}
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Principal & Interest</span>
                  <span className="font-medium text-slate-900">
                    {formatMoney(results.monthlyPrincipalAndInterest)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Property Tax</span>
                  <span className="font-medium text-slate-900">
                    {formatMoney(results.monthlyPropertyTax)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Home Insurance</span>
                  <span className="font-medium text-slate-900">
                    {formatMoney(results.monthlyHomeInsurance)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>HOA Fees</span>
                  <span className="font-medium text-slate-900">
                    {formatMoney(results.monthlyHoaFees)}
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
                  {formatMoney(results.principal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Total Interest</span>
                <span className="font-semibold text-slate-900">
                  {formatMoney(results.totalInterest)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Total Cost</span>
                <span className="font-semibold text-slate-900">
                  {formatMoney(results.totalCost)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Payoff Duration</span>
                <span className="font-semibold text-slate-900">
                  {results.payoffLabel}
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
