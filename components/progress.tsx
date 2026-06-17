"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

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
  value: number;
  max?: number;
  showLabel?: boolean;
  indicatorClassName?: string;
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
      className,
      indicatorClassName = "bg-primary",
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        className={cn("w-full flex flex-col gap-1.5", className)}
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        {showLabel && (
          <div className="flex justify-between text-xs font-semibold tracking-tight text-foreground/90 select-none">
            <span className="text-muted-foreground font-medium">Progress</span>
            <span className="font-mono tabular-nums">{Math.round(percentage)}%</span>
          </div>
        )}

        <div className={cn(progressVariants({ size }))}>
          <motion.div
            className={cn(
              "h-full rounded-full relative overflow-hidden",
              indicatorClassName
            )}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          >
            {shimmer && percentage > 0 && percentage < 100 && (
              <motion.div
                className="absolute inset-0 w-full h-full"
                animate={{
                  backgroundPosition: ["200% 0", "-200% 0"],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
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
