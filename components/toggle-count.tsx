"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";

export const toggleCountVariants = cva(
  "inline-flex items-center gap-2.5 rounded-full border px-3 py-1.5 text-xs font-semibold select-none shadow-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "border-border/80 bg-background/50 text-muted-foreground hover:bg-muted/30 hover:text-foreground data-[state=active]:border-primary/40 data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
        outline: "border-border/60 bg-transparent text-foreground/80 hover:border-border hover:bg-muted/20 data-[state=active]:border-foreground data-[state=active]:bg-foreground data-[state=active]:text-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ToggleCountProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleCountVariants> {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  count: number;
  showZero?: boolean;
}

export const ToggleCount = React.forwardRef<HTMLButtonElement, ToggleCountProps>(
  ({ className, variant, pressed, onPressedChange, count, showZero = false, children, ...props }, ref) => {
    
    const shouldRenderCount = showZero || count > 0;

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={pressed}
        data-state={pressed ? "active" : "inactive"}
        onClick={() => onPressedChange(!pressed)}
        className={toggleCountVariants({ variant, className })}
        {...props}
      >
        {/* Core Descriptor Node Content Label */}
        <span className="leading-none">{children}</span>

        {/* Scaled Micro-Badge Vector Element Container */}
        <AnimatePresence initial={false}>
          {shouldRenderCount && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`inline-flex items-center justify-center rounded-full px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-tight border leading-none transition-colors duration-200
                ${pressed 
                  ? "bg-primary/20 border-primary/20 text-primary data-[variant=outline]:bg-background data-[variant=outline]:text-foreground data-[variant=outline]:border-transparent" 
                  : "bg-muted border-border/60 text-muted-foreground"
                }
              `}
              data-variant={variant}
            >
              <motion.span
                key={count}
                initial={{ y: -4, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 4, opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                {count}
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    );
  }
);

ToggleCount.displayName = "ToggleCount";