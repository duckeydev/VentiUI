"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconEye, IconCode, IconCopy, IconCheck } from "@tabler/icons-react";
import { Highlight, themes } from "prism-react-renderer";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const codeBlockVariants = cva(
  "w-full rounded-xl border border-border/60 bg-background shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden",
  {
    variants: {
      variant: {
        modern: "",
        minimal: "shadow-none border-transparent",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);

export interface CodeBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeBlockVariants> {
  code: string;
  language?: string;
  children?: React.ReactNode;
  showLineNumbers?: boolean;
  fileName?: string;
  tab?: "preview" | "code";
  onTabChange?: (tab: "preview" | "code") => void;
}

export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      className,
      variant,
      code,
      language = "tsx",
      children,
      showLineNumbers = false,
      fileName,
      tab: controlledTab,
      onTabChange,
      ...props
    },
    ref
  ) => {
    const [internalTab, setInternalTab] = React.useState<"preview" | "code">("preview");
    const [copied, setCopied] = React.useState(false);

    const activeTab = controlledTab ?? internalTab;

    const setActiveTab = (t: "preview" | "code") => {
      if (onTabChange) {
        onTabChange(t);
      } else {
        setInternalTab(t);
      }
    };

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard not available
      }
    };

    return (
      <div
        ref={ref}
        className={codeBlockVariants({ variant, className })}
        {...props}
      >
        <div className="flex items-center justify-between border-b border-border/40 bg-muted/20 px-1 py-0.5">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={cn(
                "flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                activeTab === "preview"
                  ? "text-foreground bg-background shadow-sm"
                  : "text-muted-foreground/70 hover:text-foreground hover:bg-muted/40"
              )}
            >
              <IconEye className="h-3.5 w-3.5" strokeWidth={1.5} />
              Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              className={cn(
                "flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                activeTab === "code"
                  ? "text-foreground bg-background shadow-sm"
                  : "text-muted-foreground/70 hover:text-foreground hover:bg-muted/40"
              )}
            >
              <IconCode className="h-3.5 w-3.5" strokeWidth={1.5} />
              Code
            </button>
          </div>

          {activeTab === "code" && (
            <button
              type="button"
              onClick={handleCopy}
              className="mr-1.5 flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-[11px] font-medium text-muted-foreground/70 transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              {copied ? (
                <>
                  <IconCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-normal">Copied</span>
                </>
              ) : (
                <>
                  <IconCopy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "preview" ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
              className="flex min-h-32 w-full items-center justify-center bg-background p-6"
            >
              {children}
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
              className="bg-muted/10"
            >
              <Highlight
                theme={themes.vsDark}
                code={code.trim()}
                language={language}
              >
                {({ className: hlClassName, style, tokens, getLineProps, getTokenProps }) => (
                  <pre
                    className={cn(
                      "w-full overflow-x-auto p-4 font-mono text-[12px] leading-6",
                      hlClassName
                    )}
                    style={{ ...style, backgroundColor: "transparent" }}
                  >
                    <code>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

CodeBlock.displayName = "CodeBlock";
