"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const splitterVariants = cva("flex w-full h-full overflow-hidden select-none", {
  variants: {
    direction: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    direction: "horizontal",
  },
});

export interface LayoutSplitterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof splitterVariants> {
  /** Initial split percentage allocation targeting the left/top pane node item (e.g. 30). */
  initialSize?: number;
  /** Constrains the size scaling array minimum boundary limit down to a floor value percentage. */
  minSize?: number;
  /** Constrains the size scaling array maximum boundary limit up to a ceiling value percentage. */
  maxSize?: number;
  /** Left or upper panel view content node track. */
  primaryPane: React.ReactNode;
  /** Right or lower panel view content node track. */
  secondaryPane: React.ReactNode;
}

export const LayoutSplitter = React.forwardRef<HTMLDivElement, LayoutSplitterProps>(
  (
    {
      direction = "horizontal",
      initialSize = 30,
      minSize = 15,
      maxSize = 85,
      primaryPane,
      secondaryPane,
      className,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [size, setSize] = React.useState<number>(initialSize);
    const [isDragging, setIsDragging] = React.useState<boolean>(false);

    const isHorizontal = direction === "horizontal";

    const startResize = React.useCallback((e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      setIsDragging(true);
    }, []);

    const stopResize = React.useCallback(() => {
      setIsDragging(false);
    }, []);

    const resize = React.useCallback(
      (clientX: number, clientY: number) => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        let currentOffset = 0;
        let totalSpan = 0;

        if (isHorizontal) {
          currentOffset = clientX - containerRect.left;
          totalSpan = containerRect.width;
        } else {
          currentOffset = clientY - containerRect.top;
          totalSpan = containerRect.height;
        }

        const calculatedPercentage = (currentOffset / totalSpan) * 100;
        const boundedPercentage = Math.max(minSize, Math.min(maxSize, calculatedPercentage));

        setSize(boundedPercentage);
      },
      [isHorizontal, minSize, maxSize]
    );

    // Watch global interaction events across document layouts during dragging sequence
    React.useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        resize(e.clientX, e.clientY);
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) return;
        if (e.touches.length === 0) return;
        resize(e.touches[0].clientX, e.touches[0].clientY);
      };

      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", stopResize);
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", stopResize);
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", stopResize);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", stopResize);
      };
    }, [isDragging, resize, stopResize]);

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={splitterVariants({ direction, className })}
        {...props}
      >
        {/* Primary Input Tracking Window */}
        <div 
          style={{ [isHorizontal ? "width" : "height"]: `${size}%` }}
          className="overflow-auto pointer-events-auto shrink-0 select-text"
        >
          {primaryPane}
        </div>

        {/* Resizable Intercept Divider Gutter Track */}
        <div
          onMouseDown={startResize}
          onTouchStart={startResize}
          className={`flex shrink-0 items-center justify-center bg-border/40 hover:bg-primary/40 dark:hover:bg-primary/60 transition-colors z-20 select-none ${
            isHorizontal 
              ? "w-1.5 h-full cursor-col-resize horizontal-divider" 
              : "h-1.5 w-full cursor-row-resize vertical-divider"
          } ${isDragging ? "bg-primary text-primary" : ""}`}
        >
          {/* Subtle visual utility node indicators */}
          <div className={`${isHorizontal ? "w-[2px] h-4" : "h-[2px] w-4"} bg-muted-foreground/30 rounded-full`} />
        </div>

        {/* Secondary Output Tracking Window */}
        <div className="flex-1 overflow-auto pointer-events-auto select-text">
          {secondaryPane}
        </div>
      </div>
    );
  }
);
LayoutSplitter.displayName = "LayoutSplitter";