"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const kbdVariants = cva(
  "inline-flex items-center justify-center font-mono text-[10px] font-bold select-none shrink-0 rounded border bg-muted/40 text-muted-foreground/90 shadow-[0_1px_0_0_rgba(0,0,0,0.1)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-150",
  {
    variants: {
      size: {
        sm: "h-4 min-w-[16px] px-1 text-[9px]",
        default: "h-5 min-w-[20px] px-1.5 text-[10px]",
        lg: "h-6 min-w-[24px] px-2 text-[11px]",
      },
      variant: {
        modern: "bg-muted/40 border-border/80 text-muted-foreground",
        minimal: "bg-secondary border-b-2 border-border/100 text-foreground",
        glass: "bg-transparent border-border/60 text-muted-foreground/80 shadow-none backdrop-blur-sm",
        macos: "bg-white dark:bg-[#2d2d2f] text-[#2c2c2e] dark:text-[#e3e3e6] border border-[#d1d1d6] dark:border-[#1c1c1e] shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
        raised: "bg-secondary border-b-2 border-border/100 text-foreground",
        outline: "bg-transparent border-border/60 text-muted-foreground/80 shadow-none",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "modern",
    },
  }
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {
  modifier?: "cmd" | "shift" | "alt" | "ctrl" | "enter" | "caps";
}

const modifierSymbols: Record<string, string> = {
  cmd: "\u2318",
  shift: "\u21E7",
  alt: "\u2325",
  ctrl: "\u2303",
  enter: "\u21B5",
  caps: "\u21EA",
};

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, variant, modifier, children, ...props }, ref) => {
    const displaySymbol = modifier ? modifierSymbols[modifier] : null;

    return (
      <motion.kbd
        ref={ref}
        role="keyboard"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
        className={cn(kbdVariants({ size, variant, className }))}
        {...(props as Record<string, unknown>)}
      >
        {displaySymbol && (
          <span className={cn("font-sans tracking-wide", children && "mr-1")}>
            {displaySymbol}
          </span>
        )}
        {children}
      </motion.kbd>
    );
  }
);

Kbd.displayName = "Kbd";
