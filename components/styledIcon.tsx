"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const styledIconVariants = cva(
  "inline-flex items-center justify-center shrink-0 transition-all select-none border border-transparent",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        destructive: "",
        muted: "",
      },
      variant: {
        solid: "",
        outline: "bg-transparent",
        ghost: "",
        glass: "backdrop-blur-md",
      },
      size: {
        sm: "h-8 w-8 [--icon-size:1rem]",
        md: "h-10 w-10 [--icon-size:1.25rem]",
        lg: "h-12 w-12 [--icon-size:1.65rem]",
      },
      roundness: {
        none: "rounded-none",
        md: "rounded-xl",
        full: "rounded-full",
      },
    },
    compoundVariants: [
      // Primary Compound Variant Groups
      { color: "primary", variant: "solid", className: "bg-primary text-primary-foreground shadow-sm shadow-primary/20" },
      { color: "primary", variant: "outline", className: "border-primary/60 text-primary bg-background" },
      { color: "primary", variant: "ghost", className: "bg-primary/10 text-primary" },
      { color: "primary", variant: "glass", className: "bg-primary/15 dark:bg-primary/10 border-primary/20 text-primary shadow-inner" },
      
      // Secondary Compound Variant Groups
      { color: "secondary", variant: "solid", className: "bg-secondary text-secondary-foreground shadow-sm" },
      { color: "secondary", variant: "outline", className: "border-border text-foreground bg-background" },
      { color: "secondary", variant: "ghost", className: "bg-secondary text-secondary-foreground" },
      { color: "secondary", variant: "glass", className: "bg-secondary/40 dark:bg-secondary/20 border-secondary/20 text-foreground" },

      // Destructive Compound Variant Groups
      { color: "destructive", variant: "solid", className: "bg-destructive text-destructive-foreground shadow-sm shadow-destructive/10" },
      { color: "destructive", variant: "outline", className: "border-destructive/50 text-destructive bg-background" },
      { color: "destructive", variant: "ghost", className: "bg-destructive/10 text-destructive dark:text-rose-400" },
      { color: "destructive", variant: "glass", className: "bg-destructive/15 border-destructive/20 text-destructive dark:text-rose-400" },

      // Muted Compound Variant Groups
      { color: "muted", variant: "solid", className: "bg-muted text-muted-foreground" },
      { color: "muted", variant: "outline", className: "border-border/60 text-muted-foreground/80 bg-background" },
      { color: "muted", variant: "ghost", className: "bg-muted/40 text-muted-foreground/70" },
      { color: "muted", variant: "glass", className: "bg-muted/20 border-border/30 text-muted-foreground/70" },
    ],
    defaultVariants: {
      color: "primary",
      variant: "ghost",
      size: "md",
      roundness: "md",
    },
  }
);

export interface StyledIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styledIconVariants> {
  /** The core internal icon vector node to wrap. */
  icon: React.ReactNode;
}

export const StyledIcon = React.forwardRef<HTMLDivElement, StyledIconProps>(
  ({ className, color, variant, size, roundness, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={styledIconVariants({ color, variant, size, roundness, className })}
        {...props}
      >
        <span 
          className="flex items-center justify-center pointer-events-none [&_svg]:h-[var(--icon-size)] [&_svg]:w-[var(--icon-size)] [&_svg]:stroke-[1.8]"
        >
          {icon}
        </span>
      </div>
    );
  }
);

StyledIcon.displayName = "StyledIcon";