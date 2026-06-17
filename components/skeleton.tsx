"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const skeletonVariants = cva(
  "bg-muted/70 dark:bg-muted/50 transition-all",
  {
    variants: {
      variant: {
        circular: "rounded-full shrink-0",
        rectangular: "rounded-xl",
        text: "rounded-md h-3.5 w-full my-1",
      },
    },
    defaultVariants: {
      variant: "rectangular",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        role="status"
        aria-busy="true"
        aria-live="polite"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className={cn(skeletonVariants({ variant, className }))}
        {...(props as Record<string, unknown>)}
      >
        <span className="sr-only">Loading...</span>
      </motion.div>
    );
  }
);

Skeleton.displayName = "Skeleton";
