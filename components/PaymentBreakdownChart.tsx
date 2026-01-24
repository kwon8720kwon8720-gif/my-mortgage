"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatMoney } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface PaymentBreakdownChartProps {
  principalAndInterest: number;
  propertyTax: number;
  homeInsurance: number;
  hoaFees: number;
}

export function PaymentBreakdownChart({
  principalAndInterest,
  propertyTax,
  homeInsurance,
  hoaFees,
}: PaymentBreakdownChartProps) {
  const data = [
    {
      name: "Principal & Interest",
      value: principalAndInterest,
      fill: "#4f46e5",
    },
    {
      name: "Property Tax",
      value: propertyTax,
      fill: "#64748b",
    },
    {
      name: "Home Insurance",
      value: homeInsurance,
      fill: "#475569",
    },
    {
      name: "HOA Fees",
      value: hoaFees,
      fill: "#334155",
    },
  ];

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; name: string }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          <p className="text-sm font-medium text-slate-900">{payload[0].name}</p>
          <p className="text-sm text-slate-600">{formatMoney(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Payment Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={{ stroke: "#cbd5e1" }}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={{ stroke: "#cbd5e1" }}
              tickFormatter={(value) => {
                const k = Math.round(value / 1000);
                return `$${k}k`;
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
