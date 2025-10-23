import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4",
  lg: "h-12 px-6 text-lg"
};

const variantMap = {
  default: "bg-neon-green text-black hover:opacity-90 shadow-neon",
  outline: "border border-white/20 hover:bg-white/5",
  ghost: "hover:bg-white/5"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green/70 disabled:opacity-50 disabled:pointer-events-none",
          sizeMap[size],
          variantMap[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
