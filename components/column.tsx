"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export type GridGaps = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto" | "full";

const gapClasses: Record<GridGaps, string> = {
  none: "gap-0",
  xs: "gap-2",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
};

const getSpanClass = (span: ColumnSpan | undefined, prefix: string = "") => {
  if (!span) return "";
  if (span === "full") return `${prefix}col-span-full`;
  if (span === "auto") return `${prefix}col-auto`;
  return `${prefix}col-span-${span}`;
};

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gap?: GridGaps;
  animate?: boolean;
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
  ({ children, gap = "md", className, animate = true, staggerChildren = false, ...props }, ref) => {
    const resolvedClassName = cn(
      "grid grid-cols-1 sm:grid-cols-12",
      gapClasses[gap],
      className
    );

    if (animate) {
      return (
        <motion.div
          ref={ref}
          initial={staggerChildren ? "hidden" : undefined}
          animate={staggerChildren ? "visible" : undefined}
          variants={staggerChildren ? staggerContainer : undefined}
          className={resolvedClassName}
          {...(props as Record<string, unknown>)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={resolvedClassName}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Grid.displayName = "Grid";

export interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  span?: ColumnSpan;
  sm?: ColumnSpan;
  md?: ColumnSpan;
  lg?: ColumnSpan;
  xl?: ColumnSpan;
  animate?: boolean;
}

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_OUT_EXPO },
  },
};

export const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  ({ children, span = "full", sm, md, lg, xl, className, animate = false, ...props }, ref) => {
    const classes = cn(
      getSpanClass(span),
      getSpanClass(sm, "sm:"),
      getSpanClass(md, "md:"),
      getSpanClass(lg, "lg:"),
      getSpanClass(xl, "xl:"),
      className
    );

    if (animate) {
      return (
        <motion.div
          ref={ref}
          variants={staggerItem}
          className={classes}
          {...(props as Record<string, unknown>)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);
Column.displayName = "Column";
