"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconCopy, IconCheck, IconFile } from "@tabler/icons-react";
import { Highlight, themes } from "prism-react-renderer";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const copyMarkupVariants = cva(
  "relative w-full rounded-xl border font-mono text-xs shadow-sm overflow-hidden",
  {
    variants: {
      variant: {
        modern:
          "border-border/70 bg-background/40 backdrop-blur-sm",
        minimal:
          "border-transparent bg-muted/10 shadow-none rounded-none",
        solid: "border-border/40 bg-secondary/40",
        glass:
          "border-white/10 bg-white/5 backdrop-blur-xl shadow-glass",
        macos:
          "border-border/40 bg-secondary/20 rounded-2xl",
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
  fileName?: string;
  theme?: typeof themes.vsDark;
}

export const CopyMarkup = React.forwardRef<HTMLDivElement, CopyMarkupProps>(
  (
    {
      className,
      variant,
      code,
      language = "bash",
      showLineNumbers = false,
      fileName,
      theme = themes.vsDark,
      ...props
    },
    ref
  ) => {
    const [isCopied, setIsCopied] = React.useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch {
        // clipboard not available
      }
    };

    const lines = code.trim().split("\n");

    return (
      <div
        ref={ref}
        className={copyMarkupVariants({ variant, className })}
        {...props}
      >
        <div className="flex items-center justify-between border-b border-border/40 bg-secondary/30 px-4 py-2 font-sans text-[11px] font-medium text-muted-foreground">
          <div className="flex items-center gap-2 min-w-0">
            {fileName && (
              <span className="flex items-center gap-1.5 truncate text-foreground/80">
                <IconFile className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                <span className="truncate">{fileName}</span>
              </span>
            )}
            {!fileName && (
              <span className="lowercase font-mono text-muted-foreground/60">
                {language}
              </span>
            )}
          </div>

          <motion.button
            type="button"
            onClick={handleCopy}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-1.5 shrink-0 rounded-md border border-border/60 bg-background px-2.5 py-1 font-sans text-xs font-semibold text-foreground shadow-sm transition-all hover:bg-muted/50 outline-none cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label={isCopied ? "Copied" : "Copy code"}
          >
            <span className="relative flex h-3 w-3 items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                {isCopied ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0, rotate: 45 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                    }}
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
            <span className="w-12 text-left">
              {isCopied ? "Copied" : "Copy"}
            </span>
          </motion.button>
        </div>

        <Highlight
          theme={theme}
          code={code.trim()}
          language={language === "sh" || language === "shell" ? "bash" : language}
        >
          {({ className: hlClassName, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cn(
                "flex items-start gap-4 overflow-x-auto p-4 leading-relaxed",
                hlClassName
              )}
              style={{ ...style, backgroundColor: "transparent" }}
            >
              {showLineNumbers && (
                <div className="flex flex-col text-right text-muted-foreground/30 select-none font-mono text-[11px] shrink-0">
                  {lines.map((_, i) => (
                    <span key={i} className="block min-w-[16px]">
                      {i + 1}
                    </span>
                  ))}
                </div>
              )}
              <code className="block flex-1 text-left whitespace-pre font-mono text-xs">
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
    );
  }
);

CopyMarkup.displayName = "CopyMarkup";
