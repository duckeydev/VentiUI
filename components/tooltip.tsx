"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const tooltipVariants = cva(
  "absolute z-50 pointer-events-none rounded-lg px-2.5 py-1 text-[11px] font-bold font-mono tracking-wide border bg-card text-foreground shadow-md whitespace-nowrap",
  {
    variants: {
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-1.5 origin-bottom",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-1.5 origin-top",
        left: "right-full top-1/2 -translate-y-1/2 mr-1.5 origin-right",
        right: "left-full top-1/2 -translate-y-1/2 ml-1.5 origin-left",
      },
      variant: {
        modern: "bg-card border-border/70 shadow-md",
        minimal: "bg-muted/50 border-border/40 shadow-sm backdrop-blur-sm",
        glass: "backdrop-blur-xl bg-white/90 dark:bg-black/70 border-white/20 dark:border-white/10 shadow-lg",
        macos: "bg-[#f5f5f7] dark:bg-[#2d2d2f] border-[#d1d1d6] dark:border-[#1c1c1e] shadow-[0_4px_16px_rgba(0,0,0,0.1)] rounded-md",
      },
    },
    defaultVariants: {
      position: "top",
      variant: "modern",
    },
  }
);

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  variant = "modern",
  className,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const tooltipId = React.useId();

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <div
        className="inline-flex select-none"
        aria-describedby={isVisible ? tooltipId : undefined}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1, ease: EASE_OUT_EXPO }}
            id={tooltipId}
            role="tooltip"
            className={cn(tooltipVariants({ position, variant, className }))}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Tooltip.displayName = "Tooltip";
