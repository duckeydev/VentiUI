"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const copyMarkupVariants = cva(
  "relative w-full rounded-xl border border-border/70 bg-muted/20 font-mono text-xs shadow-sm overflow-hidden",
  {
    variants: {
      variant: {
        modern: "bg-background/40 backdrop-blur-sm",
        minimal: "border-transparent bg-muted/10 shadow-none rounded-none",
        solid: "bg-secondary/40 border-border/40",
        glass: "bg-white/5 backdrop-blur-xl border-white/10 shadow-glass",
        macos: "bg-secondary/20 border-border/40 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);

export interface CopyMarkupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof copyMarkupVariants> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export const CopyMarkup = React.forwardRef<HTMLDivElement, CopyMarkupProps>(
  ({ className, variant, code, language = "bash", showLineNumbers = false, ...props }, ref) => {
    const [isCopied, setIsCopied] = React.useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy to clipboard: ", err);
      }
    };

    const lines = code.trim().split("\n");

    return (
      <div ref={ref} className={copyMarkupVariants({ variant, className })} {...props}>
        <div className="flex items-center justify-between border-b border-border/40 bg-secondary/30 px-4 py-2 font-sans text-[11px] font-medium text-muted-foreground">
          <span className="lowercase font-mono text-muted-foreground/60">{language}</span>

          <motion.button
            type="button"
            onClick={handleCopy}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-1.5 rounded-md border border-border/60 bg-background px-2.5 py-1 font-sans text-xs font-semibold text-foreground shadow-sm transition-all hover:bg-muted/50 outline-none cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label={isCopied ? "Copied" : "Copy code to clipboard"}
          >
            <span className="relative flex h-3 w-3 items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                {isCopied ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0, rotate: 45 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="flex items-center justify-center text-emerald-500"
                  >
                    <IconCheck className="h-3.5 w-3.5" strokeWidth={3} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.12, ease: EASE_OUT_EXPO }}
                    className="flex items-center justify-center"
                  >
                    <IconCopy className="h-3.5 w-3.5 text-muted-foreground/80" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span className="w-12 text-left">{isCopied ? "Copied" : "Copy"}</span>
          </motion.button>
        </div>

        <div className="overflow-x-auto p-4 leading-relaxed text-foreground/80 scrollbar-thin">
          <pre className="flex items-start gap-4">
            {showLineNumbers && (
              <div className="flex flex-col text-right text-muted-foreground/30 select-none font-mono text-[11px] unselectable">
                {lines.map((_, i) => (
                  <span key={i} className="block min-w-[16px]">{i + 1}</span>
                ))}
              </div>
            )}
            <code className="block flex-1 text-left whitespace-pre font-mono text-xs">
              {code.trim()}
            </code>
          </pre>
        </div>
      </div>
    );
  }
);

CopyMarkup.displayName = "CopyMarkup";
