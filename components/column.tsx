import React from "react";

// --- Types ---
export type GridGaps = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto" | "full";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Presets for row and column gutters */
  gap?: GridGaps;
}

export interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Responsive span constraints across media breakpoints */
  span?: ColumnSpan;
  sm?: ColumnSpan;
  md?: ColumnSpan;
  lg?: ColumnSpan;
  xl?: ColumnSpan;
}

// Helper utility to translate numerical presets smoothly to grid classes
const getSpanClass = (span: ColumnSpan | undefined, prefix: string = "") => {
  if (!span) return "";
  if (span === "full") return `${prefix}col-span-full`;
  if (span === "auto") return `${prefix}col-auto`;
  return `${prefix}col-span-${span}`;
};

// --- Grid Parent Component ---
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ children, gap = "md", className = "", ...props }, ref) => {
    const gapClasses: Record<GridGaps, string> = {
      none: "gap-0",
      xs: "gap-2",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-12",
    };

    return (
      <div
        ref={ref}
        className={`grid grid-cols-1 sm:grid-cols-12 ${gapClasses[gap]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Grid.displayName = "Grid";

// --- Column Child Component ---
export const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  ({ children, span = "full", sm, md, lg, xl, className = "", ...props }, ref) => {
    const classes = [
      getSpanClass(span),
      getSpanClass(sm, "sm:"),
      getSpanClass(md, "md:"),
      getSpanClass(lg, "lg:"),
      getSpanClass(xl, "xl:"),
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);
Column.displayName = "Column";