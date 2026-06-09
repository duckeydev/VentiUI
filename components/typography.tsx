"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const typographyVariants = cva("text-foreground font-normal tracking-normal", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl balance text-foreground",
      h2: "scroll-m-20 border-b border-border/40 pb-2 text-2xl font-bold tracking-tight first:mt-0 balance text-foreground",
      h3: "scroll-m-20 text-xl font-semibold tracking-tight balance text-foreground",
      h4: "scroll-m-20 text-base font-bold tracking-tight balance text-foreground",
      body: "text-sm text-muted-foreground leading-relaxed",
      lead: "text-base text-muted-foreground/90 font-medium leading-normal",
      small: "text-xs font-medium leading-none text-muted-foreground/80",
      code: "relative rounded bg-secondary/60 border border-border/40 px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold text-foreground/90",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  /** Explicit element tag override to decouple visual styles from document hierarchy. */
  as?: React.ElementType;
  /** When true, evaluates the text string for inline markdown notation symbols (**bold**, *italics*, `code`). */
  markdown?: boolean;
}

/**
 * Safe client-side inline markdown compiler tokenization parser.
 * Converts syntax chunks directly into valid React elements rather than raw dangerous HTML strings.
 */
function parseInlineMarkdown(text: string): React.ReactNode[] {
  const tokenRegex = /(\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={index} className="italic text-foreground/90">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="relative rounded bg-secondary/80 border border-border/50 px-[0.25rem] py-[0.15rem] font-mono text-[11px] font-semibold text-foreground"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "body", as, markdown = false, children, ...props }, ref) => {
    
    const defaultTagMap: Record<string, React.ElementType> = {
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      body: "p",
      lead: "p",
      small: "small",
      code: "code",
    };

    const Component = as || defaultTagMap[variant] || "p";

    const processedChildren = React.useMemo(() => {
      if (markdown && typeof children === "string") {
        return parseInlineMarkdown(children);
      }
      return children;
    }, [markdown, children]);

    return (
      <Component
        ref={ref}
        className={typographyVariants({ variant, className })}
        {...props}
      >
        {processedChildren}
      </Component>
    );
  }
);

Typography.displayName = "Typography";