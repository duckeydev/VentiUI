"use client";

import * as React from "react";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The direction axis orientation of the scroll area track. */
  orientation?: "vertical" | "horizontal" | "both";
  /** Forces the scroll gutter layout mechanism to preserve screen spacing, eliminating layout shifts. */
  preventShift?: boolean;
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className = "", orientation = "vertical", preventShift = false, children, ...props }, ref) => {
    
    // Compute targeted axis vectors
    const overflowClass = {
      vertical: "overflow-y-auto overflow-x-hidden",
      horizontal: "overflow-x-auto overflow-y-hidden",
      both: "overflow-auto",
    }[orientation];

    return (
      <div
        ref={ref}
        className={`custom-scrollbar ${overflowClass} ${className}`}
        style={{
          scrollbarGutter: preventShift ? "stable" : "auto",
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = "ScrollArea";