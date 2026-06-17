"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const legendIndicatorVariants = cva(
  "flex items-center gap-2.5 text-xs font-medium text-foreground/90 py-1 px-1.5 rounded-lg transition-colors hover:bg-secondary/30 w-full",
  {
    variants: {
      variant: {
        modern: "hover:bg-primary/5",
        minimal: "hover:bg-transparent",
        glass: "backdrop-blur-md hover:bg-white/5 dark:hover:bg-black/10",
        macos: "hover:bg-secondary/20 rounded-md font-sans",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);

export interface LegendIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof legendIndicatorVariants> {
  label: string;
  color?: string;
  value?: string | number;
}

export const LegendIndicator = React.forwardRef<HTMLDivElement, LegendIndicatorProps>(
  ({ color = "bg-primary", label, value, variant, className, ...props }, ref) => {
    const isTailwindClass =
      !color.startsWith("#") && !color.startsWith("rgb") && !color.startsWith("hsl");

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
        className={cn(legendIndicatorVariants({ variant, className }))}
        {...(props as Record<string, unknown>)}
      >
        <span
          className={cn(
            "h-2.5 w-2.5 rounded-full shrink-0 ring-2 ring-background shadow-sm",
            isTailwindClass && color
          )}
          style={!isTailwindClass ? { backgroundColor: color } : undefined}
          aria-hidden="true"
        />

        <span className="text-muted-foreground truncate select-none">{label}</span>

        {value !== undefined && (
          <span className="font-mono font-bold text-foreground/90 ml-auto pl-4 tabular-nums tracking-tight">
            {value}
          </span>
        )}
      </motion.div>
    );
  }
);

LegendIndicator.displayName = "LegendIndicator";
