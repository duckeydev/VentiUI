"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const skeletonVariants = cva(
  "animate-pulse bg-muted/70 dark:bg-muted/50 transition-all",
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
      <div
        ref={ref}
        className={skeletonVariants({ variant, className })}
        role="status"
        aria-live="polite"
        aria-busy="true"
        {...props}
      >
        <span className="sr-only">Loading composition structure...</span>
      </div>
    );
  }
);

Skeleton.displayName = "Skeleton";