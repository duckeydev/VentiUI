"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const dividerVariants = cva("shrink-0 bg-border/60", {
  variants: {
    orientation: {
      horizontal: "w-full h-[1px]",
      vertical: "h-full w-[1px]",
    },
    variant: {
      default: "bg-border/60",
      dashed: "bg-transparent border-t border-dashed border-border/80 horizontal-dashed vertical-dashed",
      gradient: "bg-gradient-to-r from-transparent via-border/80 to-transparent",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  /** Optional layout label node content injected directly into the separator track. */
  children?: React.ReactNode;
  /** Positional label placement bounds inside horizontal separators. */
  labelPosition?: "left" | "center" | "right";
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = "horizontal", variant = "default", labelPosition = "center", children, ...props }, ref) => {
    const isHorizontal = orientation === "horizontal";
    const hasChildren = !!children;

    // Custom CSS utility injectors to transform vertical lines into dashed borders if requested
    const dashedStyles = variant === "dashed" && !isHorizontal
      ? { borderLeft: "1px dashed var(--border)", backgroundColor: "transparent" }
      : {};

    if (isHorizontal && hasChildren) {
      return (
        <div
          ref={ref}
          className={`flex w-full items-center text-muted-foreground ${className || ""}`}
          {...props}
        >
          <div 
            className={dividerVariants({ 
              orientation: "horizontal", 
              variant: variant === "gradient" ? "default" : variant 
            })} 
            style={variant === "gradient" ? { backgroundImage: "linear-gradient(to right, transparent, var(--border))" } : {}}
          />
          <span 
            className={`px-3 font-mono text-[10px] font-bold uppercase tracking-widest shrink-0 text-muted-foreground/50 ${
              labelPosition === "left" ? "order-first pr-3 pl-0" : ""
            } ${labelPosition === "right" ? "order-last pl-3 pr-0" : ""}`}
          >
            {children}
          </span>
          <div 
            className={dividerVariants({ 
              orientation: "horizontal", 
              variant: variant === "gradient" ? "default" : variant 
            })} 
            style={variant === "gradient" ? { backgroundImage: "linear-gradient(to right, var(--border), transparent)" } : {}}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        style={dashedStyles}
        className={dividerVariants({ orientation, variant, className })}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";