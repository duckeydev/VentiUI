"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const inputVariants = cva(
  "flex w-full rounded-lg border bg-background text-sm text-foreground shadow-sm transition-all duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-border focus-visible:border-primary/40",
        error:
          "border-destructive focus-visible:border-destructive/40 focus-visible:ring-destructive/30",
        glass:
          "border-white/20 dark:border-white/10 bg-white/5 dark:bg-black/10 backdrop-blur-md focus-visible:bg-white/10 dark:focus-visible:bg-black/20 focus-visible:border-white/30 dark:focus-visible:border-white/20",
        notion:
          "border-[#e9e9e8] dark:border-[#2e2e2e] bg-white dark:bg-[#1a1a1a] shadow-none focus-visible:border-[#c9c9c5] dark:focus-visible:border-[#4a4a4a] focus-visible:ring-[#c9c9c5]/20 dark:focus-visible:ring-[#4a4a4a]/20",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-8 px-2 py-1 text-xs",
        lg: "h-12 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: string;
  label?: string;
  description?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      error,
      label,
      description,
      "aria-describedby": ariaDescribedby,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const id = React.useId();
    const errorId = error ? `${id}-error` : undefined;
    const descId = description ? `${id}-desc` : undefined;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        {description && (
          <p id={descId} className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
        <motion.div
          animate={{ scale: isFocused ? 1.005 : 1 }}
          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
        >
          <input
            ref={ref}
            id={id}
            className={cn(
              inputVariants({
                variant: error ? "error" : variant,
                size,
                className,
              })
            )}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={
              [error ? errorId : null, description ? descId : null]
                .filter(Boolean)
                .join(" ") || ariaDescribedby
            }
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
        </motion.div>
        <AnimatePresence>
          {error && (
            <motion.p
              id={errorId}
              role="alert"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
              className="text-xs font-medium text-destructive"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
Input.displayName = "Input";
