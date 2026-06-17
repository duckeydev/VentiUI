"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const switchVariants = cva(
  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default: "",
        glass:
          "backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/5",
        notion:
          "border-[#e9e9e8] dark:border-[#3a3a3a] bg-[#f2f1ef] dark:bg-[#282828]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "role" | "onChange">,
    VariantProps<typeof switchVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      variant = "default",
      checked,
      defaultChecked,
      onCheckedChange,
      label,
      description,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(
      defaultChecked || false
    );
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;
    const id = React.useId();

    const toggle = () => {
      if (disabled) return;
      const next = !isChecked;
      if (!isControlled) setInternalChecked(next);
      onCheckedChange?.(next);
    };

    return (
      <div className={cn("flex items-start gap-3", className)}>
        <button
          ref={ref}
          id={id}
          type="button"
          role="switch"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={toggle}
          className={cn(
            switchVariants({ variant }),
            isChecked
              ? variant === "notion"
                ? "bg-[#2383e2]"
                : "bg-primary"
              : "",
            disabled && "cursor-not-allowed opacity-50"
          )}
          {...props}
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={cn(
              "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-sm ring-0",
              isChecked ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>
        <div className="space-y-0.5 leading-none">
          {label && (
            <label
              htmlFor={id}
              className="text-sm font-medium text-foreground cursor-pointer select-none"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    );
  }
);
Switch.displayName = "Switch";
