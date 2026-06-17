"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const dividerVariants = cva("shrink-0 bg-border/60", {
  variants: {
    orientation: {
      horizontal: "w-full h-[1px]",
      vertical: "h-full w-[1px]",
    },
    variant: {
      modern: "bg-border/60",
      minimal:
        "bg-transparent border-t border-dashed border-border/80 horizontal-dashed vertical-dashed",
      glass: "bg-gradient-to-r from-transparent via-border/80 to-transparent",
      macos: "bg-border/40",
      default: "bg-border/60",
      dashed:
        "bg-transparent border-t border-dashed border-border/80 horizontal-dashed vertical-dashed",
      gradient: "bg-gradient-to-r from-transparent via-border/80 to-transparent",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "modern",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  children?: React.ReactNode;
  labelPosition?: "left" | "center" | "right";
  animate?: boolean;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      orientation = "horizontal",
      variant = "modern",
      labelPosition = "center",
      children,
      animate = false,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === "horizontal";
    const hasChildren = !!children;

    const dashedStyles =
      (variant === "minimal" || variant === "dashed") && !isHorizontal
        ? ({
            borderLeft: "1px dashed var(--border)",
            backgroundColor: "transparent",
          } as React.CSSProperties)
        : undefined;

    const motionProps = animate
      ? {
          initial: { scaleX: 0 },
          animate: { scaleX: 1 },
          transition: {
            duration: 0.6,
            ease: EASE_OUT_EXPO,
          },
          style: { transformOrigin: "left" } as React.CSSProperties,
        }
      : {};

    const isGradient = variant === "glass" || variant === "gradient";

    if (isHorizontal && hasChildren) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex w-full items-center text-muted-foreground",
            className
          )}
          role="separator"
          aria-orientation="horizontal"
          {...props}
        >
          <motion.div
            className={cn(
              dividerVariants({
                orientation: "horizontal",
                variant: isGradient ? "modern" : variant,
              })
            )}
            style={
              isGradient
                ? ({ backgroundImage: "linear-gradient(to right, transparent, var(--border))" } as React.CSSProperties)
                : undefined
            }
            {...(animate ? motionProps : {})}
          />
          <span
            className={cn(
              "px-3 font-mono text-[10px] font-bold uppercase tracking-widest shrink-0 text-muted-foreground/50",
              labelPosition === "left" && "order-first pr-3 pl-0",
              labelPosition === "right" && "order-last pl-3 pr-0"
            )}
          >
            {children}
          </span>
          <motion.div
            className={cn(
              dividerVariants({
                orientation: "horizontal",
                variant: isGradient ? "modern" : variant,
              })
            )}
            style={
              isGradient
                ? ({ backgroundImage: "linear-gradient(to right, var(--border), transparent)", transformOrigin: "right" } as React.CSSProperties)
                : animate
                  ? ({ transformOrigin: "right" } as React.CSSProperties)
                  : undefined
            }
            {...(animate ? { initial: { scaleX: 0 }, animate: { scaleX: 1 }, transition: { duration: 0.6, ease: EASE_OUT_EXPO } } : {})}
          />
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        role="separator"
        aria-orientation={orientation ?? undefined}
        style={dashedStyles}
        className={cn(dividerVariants({ orientation, variant, className }))}
        {...(animate ? motionProps : {})}
        {...(props as Record<string, unknown>)}
      />
    );
  }
);

Divider.displayName = "Divider";
