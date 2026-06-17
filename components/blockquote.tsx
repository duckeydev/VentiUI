"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const blockquoteVariants = cva(
  "relative w-full text-foreground border-l-4 pl-4 transition-all duration-200 select-text",
  {
    variants: {
      variant: {
        modern: "bg-muted/30 border-primary rounded-r-xl py-3 pr-4 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.05)]",
        minimal: "border-border bg-transparent py-1 pl-4 pr-0",
        glass: "backdrop-blur-md bg-white/5 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-r-xl py-3.5 pr-4 shadow-sm",
        macos: "bg-secondary/40 border-[#d1d1d6] dark:border-[#3a3a3c] rounded-lg py-2.5 pr-3.5 font-sans tracking-tight text-[13px] leading-relaxed",
        info: "bg-blue-500/5 border-blue-500 text-blue-900 dark:text-blue-200 rounded-r-lg py-3 pr-4",
        success: "bg-emerald-500/5 border-emerald-500 text-emerald-900 dark:text-emerald-200 rounded-r-lg py-3 pr-4",
        warning: "bg-amber-500/5 border-amber-500 text-amber-900 dark:text-amber-200 rounded-r-lg py-3 pr-4",
        destructive: "bg-destructive/5 border-destructive text-destructive dark:text-red-200 rounded-r-lg py-3 pr-4",
      },
      size: {
        sm: "text-xs pl-3 py-1.5",
        md: "text-sm",
        lg: "text-base md:text-lg pl-5 py-4 font-normal tracking-wide",
      },
    },
    defaultVariants: {
      variant: "modern",
      size: "md",
    },
  }
);

export interface BlockquoteProps
  extends React.HTMLAttributes<HTMLQuoteElement>,
    VariantProps<typeof blockquoteVariants> {
  author?: string;
  source?: string;
  cite?: string;
}

export const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, variant, size, author, source, cite, children, ...props }, ref) => {
    return (
      <motion.blockquote
        ref={ref}
        cite={cite}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        className={cn(blockquoteVariants({ variant, size, className }))}
        {...(props as Record<string, unknown>)}
      >
        <div className="leading-relaxed text-foreground/90 font-medium">
          {children}
        </div>

        {(author || source) && (
          <footer className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground/80 font-normal">
            {author && (
              <cite className="not-italic font-semibold text-foreground/80">
                {author}
              </cite>
            )}
            {author && source && (
              <span className="opacity-40" aria-hidden="true">
                —
              </span>
            )}
            {source && (
              <span className="italic opacity-90 text-muted-foreground">
                {source}
              </span>
            )}
          </footer>
        )}
      </motion.blockquote>
    );
  }
);

Blockquote.displayName = "Blockquote";
