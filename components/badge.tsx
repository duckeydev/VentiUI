"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const badgeVariants = cva(
  "inline-flex items-center gap-1 font-semibold uppercase tracking-wider select-none border transition-all duration-200 w-fit whitespace-nowrap",
  {
    variants: {
      variant: {
        modern: "bg-primary text-primary-foreground border-primary/20 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-primary/95 hover:brightness-110",
        minimal: "bg-muted/40 text-foreground border-transparent hover:bg-muted/60 active:bg-muted/80",
        glass: "backdrop-blur-md bg-white/10 dark:bg-black/20 text-foreground border-white/10 dark:border-white/5 shadow-sm hover:bg-white/15 dark:hover:bg-black/35",
        macos: "bg-white dark:bg-[#2d2d2f] text-[#2c2c2e] dark:text-[#e3e3e6] border-[#d1d1d6] dark:border-[#1c1c1e] shadow-[0_0.5px_1px_rgba(0,0,0,0.05)] font-sans tracking-tight uppercase-none font-normal normal-case rounded-md",
        info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/40 dark:border-blue-900/30 hover:bg-blue-500/15",
        success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/40 dark:border-emerald-900/30 hover:bg-emerald-500/15",
        warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/40 dark:border-amber-900/30 hover:bg-amber-500/15",
        destructive: "bg-destructive/10 text-destructive border-destructive/20 dark:border-destructive/30 hover:bg-destructive/15",
      },
      size: {
        sm: "px-1.5 py-0.5 text-[9px] font-bold rounded-md gap-0.5 [&>span>svg]:h-2.5 [&>span>svg]:w-2.5",
        md: "px-2 py-0.5 text-[10px] font-bold rounded-lg gap-1 [&>span>svg]:h-3 [&>span>svg]:w-3",
        lg: "px-2.5 py-0.5 text-[11px] font-extrabold rounded-xl gap-1.5 [&>span>svg]:h-3.5 [&>span>svg]:w-3.5",
      },
    },
    defaultVariants: {
      variant: "modern",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
        whileTap={{ scale: 0.97 }}
        className={cn(badgeVariants({ variant, size, className }))}
        role="status"
        {...(props as Record<string, unknown>)}
      >
        {icon && (
          <span aria-hidden="true" className="inline-flex shrink-0 stroke-[2.5] items-center justify-center">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </motion.span>
    );
  }
);

Badge.displayName = "Badge";
