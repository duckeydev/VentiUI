"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const cardVariants = cva(
  "overflow-hidden text-card-foreground transition-all duration-200 relative",
  {
    variants: {
      variant: {
        // Aligned directly with ChatBubble design profiles
        modern: "rounded-2xl border border-border/70 bg-card shadow-sm",
        minimal: "rounded-xl bg-muted/30 border border-transparent shadow-none",
        glass: "rounded-2xl border border-white/10 dark:border-white/5 bg-background/40 shadow-xl backdrop-blur-xl",
        macos: "rounded-2xl border border-[#d2d2d7]/50 dark:border-[#2d2d2f] bg-[#f5f5f7] dark:bg-[#1e1e1f] shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)] font-sans",
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
        class: "hover:-translate-y-1 hover:shadow-xl hover:border-border/90 dark:hover:border-white/20",
      },
      {
        variant: "minimal",
        hoverable: true,
        class: "hover:bg-muted/50 hover:border-border/40",
      },
      {
        variant: "macos",
        hoverable: true,
        class: "hover:scale-[1.01] hover:bg-[#fafafc] dark:hover:bg-[#232325] transition-transform ease-out",
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
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hoverable, ...props }, ref) => (
    <div ref={ref} className={cardVariants({ variant, hoverable, className })} {...props} />
  )
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`flex flex-col gap-1 p-6 ${className ?? ""}`.trim()} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={`text-base font-semibold tracking-tight text-foreground ${className ?? ""}`.trim()} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={`text-xs leading-relaxed text-muted-foreground/80 ${className ?? ""}`.trim()} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`px-6 pb-6 text-sm leading-relaxed ${className ?? ""}`.trim()} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`flex items-center justify-between gap-3 border-t border-border/40 px-6 py-3.5 bg-muted/5 text-xs font-medium ${className ?? ""}`.trim()} {...props} />
  )
);
CardFooter.displayName = "CardFooter";