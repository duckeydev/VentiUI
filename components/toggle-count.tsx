"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const toggleCountVariants = cva(
  "inline-flex items-center gap-2.5 rounded-full border px-3 py-1.5 text-xs font-semibold select-none shadow-sm transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        modern: "border-border/80 bg-background/50 text-muted-foreground hover:bg-muted/30 hover:text-foreground data-[state=active]:border-primary/40 data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
        minimal: "border-transparent bg-transparent text-muted-foreground hover:bg-muted/20 hover:text-foreground data-[state=active]:border-primary/30 data-[state=active]:bg-primary/5 data-[state=active]:text-primary",
        glass: "border-white/10 bg-white/5 backdrop-blur-xl text-muted-foreground hover:bg-white/10 hover:text-foreground data-[state=active]:border-white/20 data-[state=active]:bg-white/15 data-[state=active]:text-foreground",
        macos: "border-border/50 bg-secondary/30 rounded-2xl text-muted-foreground hover:bg-secondary/40 hover:text-foreground data-[state=active]:border-primary/40 data-[state=active]:bg-primary/15 data-[state=active]:text-primary",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);

// 1. Extend HTMLMotionProps<"button"> instead of React.ButtonHTMLAttributes
// 2. You can safely drop the manual event Omits now
export interface ToggleCountProps
  extends HTMLMotionProps<"button">,
    VariantProps<typeof toggleCountVariants> {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  count: number;
  showZero?: boolean;
  children?: React.ReactNode;
}

export const ToggleCount = React.forwardRef<HTMLButtonElement, ToggleCountProps>(
  ({ className, variant, pressed, onPressedChange, count, showZero = false, children, ...props }, ref) => {
    const shouldRenderCount = showZero || count > 0;

    return (
      <motion.button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={pressed}
        data-state={pressed ? "active" : "inactive"}
        onClick={() => onPressedChange(!pressed)}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
        className={cn(toggleCountVariants({ variant, className }))}
        {...props}
      >
        <span className="leading-none">{children}</span>

        <AnimatePresence initial={false}>
          {shouldRenderCount && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={cn(
                "inline-flex items-center justify-center rounded-full px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-tight border leading-none transition-colors duration-200 overflow-hidden",
                pressed
                  ? "bg-primary/20 border-primary/20 text-primary"
                  : "bg-muted border-border/60 text-muted-foreground"
              )}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={count}
                  initial={{ y: -12, opacity: 0, filter: "blur(2px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: 12, opacity: 0, filter: "blur(2px)" }}
                  transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                >
                  {count}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }
);

ToggleCount.displayName = "ToggleCount";