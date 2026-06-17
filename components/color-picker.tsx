'use client';

import * as React from "react";
import { IconColorPicker } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export interface ColorPickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange" | "defaultValue"> {
  label?: string;
  description?: string;
  error?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ className, label, description, error, value, defaultValue = "#3b82f6", onChange, disabled, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const id = React.useId();
    const errorId = error ? `${id}-error` : undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
    };

    return (
      <div className={cn("w-full space-y-1.5", className)}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        {description && <p className="text-xs text-muted-foreground">{description}</p>}

        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-border shadow-sm">
            <input
              ref={ref}
              id={id}
              type="color"
              value={currentValue}
              onChange={handleChange}
              disabled={disabled}
              className="absolute -top-2 -left-2 h-16 w-16 cursor-pointer p-0 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-invalid={error ? "true" : undefined}
              aria-describedby={errorId}
              {...props}
            />
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 shadow-sm transition-colors focus-within:ring-2 focus-within:ring-primary/40">
            <IconColorPicker className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono text-sm font-medium uppercase text-foreground">{currentValue}</span>
          </div>
        </div>

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
ColorPicker.displayName = "ColorPicker";
