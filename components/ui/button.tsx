import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variant === "default" &&
            "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800",
          variant === "outline" &&
            "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 active:bg-slate-100",
          variant === "ghost" &&
            "text-slate-900 hover:bg-slate-100 active:bg-slate-200",
          size === "default" && "h-11 px-6 text-base",
          size === "sm" && "h-9 px-4 text-sm",
          size === "lg" && "h-12 px-8 text-lg",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
