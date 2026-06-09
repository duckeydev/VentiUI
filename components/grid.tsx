"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const gridVariants = cva("grid", {
  variants: {
    cols: {
      default: "grid-cols-1",
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
      5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
      6: "grid-cols-2 sm:grid-cols-4 md:grid-cols-6",
      12: "grid-cols-4 sm:grid-cols-8 md:grid-cols-12",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    cols: "default",
    gap: "md",
    align: "stretch",
  },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /** Renders the inner element wrapper layout as a matching `GridItem` child tree. */
  as?: React.ElementType;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, align, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={gridVariants({ cols, gap, align, className })}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";

/* Separate structural primitive to manage complex track spans cleanly */
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  /** Explicit column span allocations mapping cleanly across standard grid tiers. */
  colSpan?: "auto" | "full" | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | 12;
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, colSpan, as: Component = "div", ...props }, ref) => {
    const spanMaps = {
      auto: "col-auto",
      full: "col-span-full",
      1: "col-span-1",
      2: "col-span-1 sm:col-span-2",
      3: "col-span-1 sm:col-span-3",
      4: "col-span-2 sm:col-span-4",
      5: "col-span-2 sm:col-span-5",
      6: "col-span-3 sm:col-span-6",
      8: "col-span-4 sm:col-span-8",
      9: "col-span-4 sm:col-span-9",
      10: "col-span-4 sm:col-span-10",
      12: "col-span-full",
    };

    const spanClass = colSpan ? spanMaps[colSpan] : "";

    return (
      <Component
        ref={ref}
        className={`${spanClass} ${className || ""}`}
        {...props}
      />
    );
  }
);
GridItem.displayName = "GridItem";