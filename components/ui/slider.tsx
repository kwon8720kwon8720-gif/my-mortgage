"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  valueLabel?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, valueLabel, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-slate-900">{label}</label>
            {valueLabel && <span className="text-sm text-slate-600">{valueLabel}</span>}
          </div>
        )}
        <input
          type="range"
          className={cn(
            "h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };
