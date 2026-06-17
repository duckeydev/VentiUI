"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const spinnerVariants = cva(
  "inline-flex items-center justify-center text-primary",
  {
    variants: {
      size: {
        sm: "[--spinner-size:1rem] [--dot-size:0.25rem] gap-0.5",
        md: "[--spinner-size:1.5rem] [--dot-size:0.375rem] gap-1",
        lg: "[--spinner-size:2.25rem] [--dot-size:0.5rem] gap-1.5",
        xl: "[--spinner-size:3.5rem] [--dot-size:0.75rem] gap-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  variant?: "default" | "dots" | "pulse" | "apple" | "morph" | "wave";
  color?: string;
}

const dotVariants: Variants = {
  animate: (i: number) => ({
    y: ["0%", "-60%", "0%"],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: i * 0.15,
    },
  }),
};

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant = "default", color, ...props }, ref) => {
    const customStyle = color ? { color } : undefined;

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(spinnerVariants({ size, className }))}
        style={customStyle}
        {...props}
      >
        <span className="sr-only">Loading...</span>

        {variant === "dots" && (
          <div className="flex items-center h-[var(--spinner-size)]">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                custom={i}
                animate="animate"
                variants={dotVariants}
                className="rounded-full bg-current"
                style={{ width: "var(--dot-size)", height: "var(--dot-size)" }}
              />
            ))}
          </div>
        )}

        {variant === "pulse" && (
          <span className="relative flex h-[var(--spinner-size)] w-[var(--spinner-size)]">
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full bg-current"
              animate={{ scale: [1, 1.5], opacity: [0.75, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative inline-flex rounded-full h-full w-full bg-current" />
          </span>
        )}

        {variant === "apple" && (
          <div className="relative h-[var(--spinner-size)] w-[var(--spinner-size)]">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-0 h-1/4 w-[10%] origin-[50%_200%] rounded-full bg-current"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 1, 0.1] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.1,
                }}
                style={{ transform: `rotate(${i * 30}deg)` }}
              />
            ))}
          </div>
        )}

        {variant === "morph" && (
          <motion.div
            className="h-[var(--spinner-size)] w-[var(--spinner-size)] bg-current"
            animate={{
              scale: [1, 0.7, 1],
              rotate: [0, 180, 360],
              borderRadius: ["50%", "25%", "50%"],
            }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
        )}

        {variant === "wave" && (
          <div className="flex items-end gap-1 h-[var(--spinner-size)]">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-[var(--dot-size)] bg-current"
                initial={{ height: "20%" }}
                animate={{ height: ["20%", "100%", "20%"] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {variant === "default" && (
          <motion.svg
            className="h-[var(--spinner-size)] w-[var(--spinner-size)]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3.5"
            />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </motion.svg>
        )}
      </div>
    );
  }
);

Spinner.displayName = "Spinner";
