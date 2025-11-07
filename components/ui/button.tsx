"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "neon";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default:
        "bg-gradient-to-r from-[#ff0066] to-[#00d4ff] text-white hover:scale-105 hover:shadow-lg hover:shadow-[#00d4ff]/50 transition-all duration-300 hover:-translate-y-0.5",
      outline:
        "bg-black/30 border-2 border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:scale-105 transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm",
      ghost: "text-[#00d4ff] hover:bg-[#00d4ff]/10",
      neon: "bg-transparent border-2 border-[#ff0066] text-[#ff0066] glow-red hover:bg-[#ff0066]/10 hover:scale-105 transition-all duration-300",
    };

    // Check if custom padding is provided in className
    const hasCustomPadding = className?.match(/\b(px-|py-|p-|pl-|pr-|pt-|pb-)/);

    const sizes = {
      default: hasCustomPadding ? "h-11" : "h-11 px-6 py-2.5",
      sm: hasCustomPadding ? "h-9 text-sm" : "h-9 px-5 py-2 text-sm",
      lg: hasCustomPadding ? "h-14 text-lg" : "h-14 px-10 py-4 text-lg",
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
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

