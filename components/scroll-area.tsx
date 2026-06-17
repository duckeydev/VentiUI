"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal" | "both";
  preventShift?: boolean;
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      orientation = "vertical",
      preventShift = false,
      children,
      ...props
    },
    ref
  ) => {
    const overflowClass = {
      vertical: "overflow-y-auto overflow-x-hidden",
      horizontal: "overflow-x-auto overflow-y-hidden",
      both: "overflow-auto",
    }[orientation];

    return (
      <div
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label="Scrollable area"
        className={cn(
          "custom-scrollbar focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 scroll-smooth",
          overflowClass,
          className
        )}
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
