"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const splitterVariants = cva("flex w-full h-full overflow-hidden select-none", {
  variants: {
    direction: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    variant: {
      modern: "",
      minimal: "",
      glass: "backdrop-blur-md bg-white/5 dark:bg-black/10",
      macos: "bg-card/50 backdrop-blur-sm",
    },
  },
  defaultVariants: {
    direction: "horizontal",
    variant: "modern",
  },
});

export interface LayoutSplitterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof splitterVariants> {
  initialSize?: number;
  minSize?: number;
  maxSize?: number;
  primaryPane: React.ReactNode;
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
      variant = "modern",
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
        className={cn(splitterVariants({ direction, variant, className }))}
        {...props}
      >
        <div
          style={{ [isHorizontal ? "width" : "height"]: `${size}%` }}
          className="overflow-auto pointer-events-auto shrink-0 select-text"
          role="region"
          aria-label="Primary pane"
        >
          {primaryPane}
        </div>

        <motion.div
          onMouseDown={startResize}
          onTouchStart={startResize}
          whileHover={isHorizontal ? { scaleX: 1.5 } : { scaleY: 1.5 }}
          transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
          className={cn(
            "flex shrink-0 items-center justify-center bg-border/40 hover:bg-primary/40 dark:hover:bg-primary/60 transition-colors z-20 select-none",
            isHorizontal
              ? "w-1.5 h-full cursor-col-resize"
              : "h-1.5 w-full cursor-row-resize",
            isDragging && "bg-primary text-primary"
          )}
          role="separator"
          aria-orientation={direction === "vertical" ? "vertical" : "horizontal"}
          aria-valuenow={Math.round(size)}
          aria-valuemin={minSize}
          aria-valuemax={maxSize}
          tabIndex={0}
          onKeyDown={(e) => {
            const step = 1;
            if (isHorizontal) {
              if (e.key === "ArrowLeft") setSize((s) => Math.max(minSize, s - step));
              if (e.key === "ArrowRight") setSize((s) => Math.min(maxSize, s + step));
            } else {
              if (e.key === "ArrowUp") setSize((s) => Math.max(minSize, s - step));
              if (e.key === "ArrowDown") setSize((s) => Math.min(maxSize, s + step));
            }
          }}
        >
          <div
            className={cn(
              isHorizontal ? "w-[2px] h-4" : "h-[2px] w-4",
              "bg-muted-foreground/30 rounded-full"
            )}
            aria-hidden="true"
          />
        </motion.div>

        <div
          className="flex-1 overflow-auto pointer-events-auto select-text"
          role="region"
          aria-label="Secondary pane"
        >
          {secondaryPane}
        </div>
      </div>
    );
  }
);
LayoutSplitter.displayName = "LayoutSplitter";
