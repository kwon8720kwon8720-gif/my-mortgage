"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "./pie-chart";
import { formatCurrency, formatPercent } from "@/lib/utils";
import type { MortgageResult } from "@/lib/mortgage/engine";

interface ResultsSectionProps {
  result: MortgageResult;
  rateBps: number;
}

export function ResultsSection({ result, rateBps }: ResultsSectionProps) {
  const ratePercent = rateBps / 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-900">
            {formatCurrency(result.monthlyPayment)}
          </div>
          <p className="mt-2 text-sm text-slate-600">
            For {result.payoffLabel} at {formatPercent(ratePercent)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Loan Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-slate-600">Loan Amount</span>
            <span className="font-semibold text-slate-900">{formatCurrency(result.loanAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Total Payment</span>
            <span className="font-semibold text-slate-900">{formatCurrency(result.totalPayment)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Total Interest</span>
            <span className="font-semibold text-slate-900">{formatCurrency(result.totalInterest)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart principal={result.principal} interest={result.totalInterest} />
        </CardContent>
      </Card>
    </div>
  );
}
