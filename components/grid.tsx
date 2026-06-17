"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

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
    variant: {
      modern: "",
      minimal: "",
      glass: "backdrop-blur-sm bg-white/5 dark:bg-black/10 rounded-xl",
      macos: "bg-card/30 backdrop-blur-sm rounded-xl",
    },
  },
  defaultVariants: {
    cols: "default",
    gap: "md",
    align: "stretch",
    variant: "modern",
  },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  as?: React.ElementType;
  staggerChildren?: boolean;
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, align, variant, as: Component = "div", staggerChildren = false, ...props }, ref) => {
    const combinedClassName = cn(gridVariants({ cols, gap, align, variant, className }));

    if (staggerChildren && Component === "div") {
      return (
        <motion.div
          ref={ref}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className={combinedClassName}
          {...(props as Record<string, unknown>)}
        />
      );
    }

    return (
      <Component
        ref={ref}
        className={combinedClassName}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  colSpan?: "auto" | "full" | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | 12;
}

const spanMaps: Record<NonNullable<GridItemProps["colSpan"]>, string> = {
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

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, colSpan, as: Component = "div", ...props }, ref) => {
    const spanClass = colSpan ? spanMaps[colSpan] : "";
    const combinedClassName = cn(spanClass, className);

    return (
      <Component
        ref={ref}
        className={combinedClassName}
        {...props}
      />
    );
  }
);
GridItem.displayName = "GridItem";
