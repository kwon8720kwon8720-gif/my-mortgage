import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          variant === "primary"
            ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-600"
            : "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
