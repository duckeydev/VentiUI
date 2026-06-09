"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

export const progressVariants = cva(
  "w-full bg-secondary overflow-hidden rounded-full relative",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-3",
        lg: "h-4.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  /** The current numeric quantitative progress marker. */
  value: number;
  /** The maximum achievable value scale parameter. */
  max?: number;
  /** Appends a header metadata layout displaying calculated execution percentages. */
  showLabel?: boolean;
  /** Custom utility string appended straight onto the fill tracking indicator mask. */
  indicatorClassName?: string;
  /** Configures internal looping linear gradients to imply loading execution. */
  shimmer?: boolean;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      showLabel = false,
      size,
      shimmer = true,
      className = "",
      indicatorClassName = "bg-primary",
      ...props
    },
    ref
  ) => {
    // Standardize metrics safely within absolute boundary scales
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        className={`w-full flex flex-col gap-1.5 ${className}`}
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        {showLabel && (
          <div className="flex justify-between text-xs font-semibold tracking-tight text-foreground/90 select-none">
            <span className="text-muted-foreground font-medium">Task Progress</span>
            <span className="font-mono tabular-nums">{Math.round(percentage)}%</span>
          </div>
        )}

        <div className={progressVariants({ size })}>
          <motion.div
            className={`h-full rounded-full ${indicatorClassName} relative overflow-hidden`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Optimized Layered Glow Shimmer Effect */}
            {shimmer && percentage < 100 && (
              <div 
                className="absolute inset-0 w-full h-full animate-[shimmer_2.5s_infinite_linear]" 
                style={{
                  backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                }}
              />
            )}
          </motion.div>
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";