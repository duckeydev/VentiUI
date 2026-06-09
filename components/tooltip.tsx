"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

export const tooltipVariants = cva(
  "absolute z-50 pointer-events-none rounded-md px-2 py-1 text-[11px] font-bold font-mono tracking-wide border bg-card text-foreground shadow-md whitespace-nowrap",
  {
    variants: {
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-1.5 origin-bottom",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-1.5 origin-top",
        left: "right-full top-1/2 -translate-y-1/2 mr-1.5 origin-right",
        right: "left-full top-1/2 -translate-y-1/2 ml-1.5 origin-left",
      },
    },
    defaultVariants: {
      position: "top",
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
  className,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {/* Target Anchor Trigger wrapper element */}
      <div className="inline-flex select-none">{children}</div>

      {/* Micro-scale contextual tooltip pop up */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className={tooltipVariants({ position, className })}
            role="tooltip"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Tooltip.displayName = "Tooltip";