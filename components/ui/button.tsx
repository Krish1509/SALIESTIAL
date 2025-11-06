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
        "bg-gradient-to-r from-[#ff0066] to-[#00d4ff] text-white hover:scale-105 hover:shadow-lg hover:shadow-[#00d4ff]/50",
      outline:
        "border-2 border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:scale-105",
      ghost: "text-[#00d4ff] hover:bg-[#00d4ff]/10",
      neon: "bg-transparent border-2 border-[#ff0066] text-[#ff0066] glow-red hover:bg-[#ff0066]/10 hover:scale-105",
    };

    const sizes = {
      default: "h-11 px-6 py-2",
      sm: "h-9 px-4 text-sm",
      lg: "h-14 px-8 text-lg",
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

