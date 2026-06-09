"use client";

import * as React from "react";

export interface LegendIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The designation string describing the metric track. */
  label: string;
  /** Background utility class (e.g., 'bg-primary') or a valid raw hex/rgb color string. */
  color?: string;
  /** An optional scalar total, numeric metric, or percentage layout value. */
  value?: string | number;
}

export const LegendIndicator = React.forwardRef<HTMLDivElement, LegendIndicatorProps>(
  ({ color = "bg-primary", label, value, className = "", ...props }, ref) => {
    // Determine if the string passed is a Tailwind class pattern or a raw inline hex color code
    const isTailwindClass = !color.startsWith("#") && !color.startsWith("rgb") && !color.startsWith("hsl");

    return (
      <div
        ref={ref}
        className={`flex items-center gap-2.5 text-xs font-medium text-foreground/90 py-1 px-1.5 rounded-lg transition-colors hover:bg-secondary/30 w-full ${className}`}
        {...props}
      >
        {/* Color Pill Node Vector */}
        <span
          className={`h-2.5 w-2.5 rounded-full shrink-0 ring-2 ring-background shadow-sm ${
            isTailwindClass ? color : ""
          }`}
          style={!isTailwindClass ? { backgroundColor: color } : undefined}
          aria-hidden="true"
        />

        {/* Text Assignment Description Track */}
        <span className="text-muted-foreground truncate select-none">{label}</span>

        {/* Optional Data Metric Highlight Node */}
        {value !== undefined && (
          <span className="font-mono font-bold text-foreground/90 ml-auto pl-4 tabular-nums tracking-tight">
            {value}
          </span>
        )}
      </div>
    );
  }
);

LegendIndicator.displayName = "LegendIndicator";