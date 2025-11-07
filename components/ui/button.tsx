"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "neon";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size, ...props }, ref) => {
          const baseStyles =
            "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

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
    
    // Only apply default padding if no custom padding and size is provided
    // Size only controls height and text size, NOT padding
    // If custom padding exists, don't apply any default padding
    const sizeStyles = size && !hasCustomPadding ? {
      default: "h-11 px-8 py-3",
      sm: "h-9 px-6 py-2.5 text-sm",
      lg: "h-14 px-12 py-4 text-lg",
    }[size] : size && hasCustomPadding ? {
      default: "h-11",
      sm: "h-9 text-sm",
      lg: "h-14 text-lg",
    }[size] : "";

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizeStyles,
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

