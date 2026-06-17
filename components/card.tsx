"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type CardVariant = "modern" | "minimal" | "glass" | "macos" | "notion";

const CardContext = React.createContext<{ variant: CardVariant }>({
  variant: "modern",
});

export function useCardContext() {
  return React.useContext(CardContext);
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const cardVariants = cva(
  "overflow-hidden text-card-foreground transition-all duration-200 relative",
  {
    variants: {
      variant: {
        modern:
          "rounded-2xl border border-border/70 bg-card shadow-sm",
        minimal:
          "rounded-xl bg-muted/30 border border-transparent shadow-none",
        glass:
          "rounded-2xl border border-white/10 dark:border-white/5 bg-background/40 shadow-xl backdrop-blur-xl",
        macos:
          "rounded-2xl border border-[#d2d2d7]/50 dark:border-[#2d2d2f] bg-[#f5f5f7] dark:bg-[#1e1e1f] shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)] font-sans",
        notion:
          "rounded-lg border border-[#e9e9e8] dark:border-[#2e2e2e] bg-white dark:bg-[#191919] shadow-[0_1px_2px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.2)]",
      },
      hoverable: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: ["modern", "glass"],
        hoverable: true,
        class:
          "hover:shadow-xl hover:border-border/90 dark:hover:border-white/20",
      },
      {
        variant: "minimal",
        hoverable: true,
        class: "hover:bg-muted/50 hover:border-border/40",
      },
      {
        variant: "macos",
        hoverable: true,
        class: "hover:bg-[#fafafc] dark:hover:bg-[#232325]",
      },
      {
        variant: "notion",
        hoverable: true,
        class:
          "hover:bg-[#f7f6f3] dark:hover:bg-[#1f1f1f] hover:border-[#d9d8d5] dark:hover:border-[#3a3a3a]",
      },
    ],
    defaultVariants: {
      variant: "modern",
      hoverable: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: "div" | "section" | "article";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "modern", hoverable, as: Tag = "div", children, ...props }, ref) => {
    const Comp = motion[Tag as keyof typeof motion] as typeof motion.div;
    return (
      <CardContext.Provider value={{ variant: variant as CardVariant }}>
        <Comp
          ref={ref}
          className={cardVariants({ variant, hoverable, className })}
          whileHover={hoverable ? { y: -4, transition: { duration: 0.2, ease: EASE_OUT_EXPO } } : undefined}
          {...(props as any)}
        >
          {children}
        </Comp>
      </CardContext.Provider>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1 p-5 sm:p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-base font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-xs leading-relaxed text-muted-foreground/80",
        className
      )}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-5 pb-5 sm:px-6 sm:pb-6 text-sm leading-relaxed", className)}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-3 border-t border-border/40 px-5 py-3 sm:px-6 sm:py-3.5 bg-muted/5 text-xs font-medium",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";
