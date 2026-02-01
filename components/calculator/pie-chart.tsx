"use client";

import * as React from "react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface PieChartProps {
  principal: number;
  interest: number;
}

const COLORS = {
  principal: "#4f46e5", // indigo-600
  interest: "#64748b", // slate-500
};

export function PieChart({ principal, interest }: PieChartProps) {
  const data = [
    { name: "Principal", value: Math.max(0, principal), color: COLORS.principal },
    { name: "Interest", value: Math.max(0, interest), color: COLORS.interest },
  ].filter((item) => item.value > 0);

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-500">
        No data to display
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value) => value}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
