"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { formatCurrency, formatPercent, parseNumericString } from "@/lib/utils";
import type { MortgageInput } from "@/lib/schemas";

interface InputSectionProps {
  inputs: MortgageInput;
  onInputChange: (field: keyof MortgageInput, value: number) => void;
  onStringChange: (field: keyof MortgageInput, value: string) => void;
  stringValues: {
    homePrice: string;
    downPayment: string;
    termYears: string;
    rateBps: string;
  };
}

export function InputSection({
  inputs,
  onInputChange,
  onStringChange,
  stringValues,
}: InputSectionProps) {
  const handleInputBlur = (field: keyof MortgageInput, value: string) => {
    const parsed = parseNumericString(value);
    onInputChange(field, parsed);
    // Sync string value back
    if (field === "homePrice" || field === "downPayment") {
      onStringChange(field, formatCurrency(parsed).replace("$", "").replace(/,/g, ""));
    } else if (field === "termYears") {
      onStringChange(field, parsed.toString());
    } else if (field === "rateBps") {
      onStringChange(field, (parsed / 100).toFixed(2));
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: keyof MortgageInput) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const ratePercent = inputs.rateBps / 100;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="homePrice">Home Price</Label>
        <Input
          id="homePrice"
          type="text"
          value={stringValues.homePrice}
          onChange={(e) => onStringChange("homePrice", e.target.value)}
          onBlur={(e) => handleInputBlur("homePrice", e.target.value)}
          onKeyDown={(e) => handleInputKeyDown(e, "homePrice")}
          placeholder="400000"
        />
        <Slider
          min={50000}
          max={2000000}
          step={10000}
          value={inputs.homePrice}
          onChange={(e) => onInputChange("homePrice", Number(e.target.value))}
          valueLabel={formatCurrency(inputs.homePrice)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="downPayment">Down Payment</Label>
        <Input
          id="downPayment"
          type="text"
          value={stringValues.downPayment}
          onChange={(e) => onStringChange("downPayment", e.target.value)}
          onBlur={(e) => handleInputBlur("downPayment", e.target.value)}
          onKeyDown={(e) => handleInputKeyDown(e, "downPayment")}
          placeholder="80000"
        />
        <Slider
          min={0}
          max={inputs.homePrice}
          step={5000}
          value={inputs.downPayment}
          onChange={(e) => onInputChange("downPayment", Number(e.target.value))}
          valueLabel={formatCurrency(inputs.downPayment)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="termYears">Loan Term</Label>
        <Input
          id="termYears"
          type="text"
          value={stringValues.termYears}
          onChange={(e) => onStringChange("termYears", e.target.value)}
          onBlur={(e) => handleInputBlur("termYears", e.target.value)}
          onKeyDown={(e) => handleInputKeyDown(e, "termYears")}
          placeholder="30"
        />
        <Slider
          min={1}
          max={50}
          step={1}
          value={inputs.termYears}
          onChange={(e) => onInputChange("termYears", Number(e.target.value))}
          valueLabel={`${inputs.termYears} years`}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rateBps">Interest Rate</Label>
        <Input
          id="rateBps"
          type="text"
          value={stringValues.rateBps}
          onChange={(e) => onStringChange("rateBps", e.target.value)}
          onBlur={(e) => handleInputBlur("rateBps", e.target.value)}
          onKeyDown={(e) => handleInputKeyDown(e, "rateBps")}
          placeholder="6.50"
        />
        <Slider
          min={0}
          max={2000}
          step={5}
          value={ratePercent * 100}
          onChange={(e) => onInputChange("rateBps", Number(e.target.value) * 100)}
          valueLabel={formatPercent(ratePercent)}
        />
      </div>
    </div>
  );
}
