import React from "react";
import clsx from "clsx";

// Utility function to combine class names
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

// Button Variants and Sizes
const variantClasses = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
} as const;

const sizeClasses = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
} as const;

// Explicit types for variants and sizes
type Variant = keyof typeof variantClasses;
type Size = keyof typeof sizeClasses;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; // Strongly typed to keys of `variantClasses`
  size?: Size; // Strongly typed to keys of `sizeClasses`
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "div" : "button";
    return (
      <Comp
        className={clsx(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref as any}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
