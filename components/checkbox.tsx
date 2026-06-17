'use client';

import * as React from "react";
import { IconCheck, IconMinus } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  indeterminate?: boolean;
  error?: string;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, indeterminate, error, onCheckedChange, ...props }, ref) => {
    const innerRef = React.useRef<HTMLInputElement | null>(null);
    const generatedId = React.useId();
    const id = props.id || generatedId;
    const errorId = error ? `${id}-error` : undefined;

    React.useImperativeHandle(ref, () => innerRef.current!);

    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate]);

    const isChecked = props.checked ?? props.defaultChecked ?? false;
    const showCheck = indeterminate || isChecked;

    return (
      <div className={cn("flex items-start gap-3", className)}>
        <div className="relative flex h-5 w-5 shrink-0 items-center justify-center pt-0.5">
          <input
            ref={innerRef}
            id={id}
            type="checkbox"
            className="peer sr-only"
            aria-checked={indeterminate ? "mixed" : isChecked}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={errorId}
            onChange={(e) => onCheckedChange?.(e.target.checked)}
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(
              "flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border-2 border-border bg-background transition-all",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
              "peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              error && "border-destructive"
            )}
          >
            <AnimatePresence mode="wait">
              {showCheck && (
                <motion.span
                  key={indeterminate ? "minus" : "check"}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {indeterminate ? (
                    <IconMinus className="h-3.5 w-3.5 text-primary-foreground" />
                  ) : (
                    <IconCheck className="h-3.5 w-3.5 text-primary-foreground" />
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </label>
        </div>
        <div className="space-y-1 leading-none">
          {label && (
            <label htmlFor={id} className="text-sm font-medium text-foreground cursor-pointer select-none">
              {label}
            </label>
          )}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
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
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";
