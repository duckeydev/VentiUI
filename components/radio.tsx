'use client';

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({});

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  label?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, defaultValue, onValueChange, name, disabled, label, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const generatedName = React.useId();

    return (
      <RadioGroupContext.Provider
        value={{
          value: currentValue,
          onValueChange: (v) => {
            if (!isControlled) setInternalValue(v);
            onValueChange?.(v);
          },
          name: name || generatedName,
          disabled,
        }}
      >
        <div
          ref={ref}
          className={cn("space-y-3", className)}
          role="radiogroup"
          aria-label={label}
          {...props}
        >
          {label && <span className="text-sm font-semibold text-foreground">{label}</span>}
          <div className="space-y-2">{children}</div>
        </div>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, value, disabled, error, ...props }, ref) => {
    const ctx = React.useContext(RadioGroupContext);
    const id = React.useId();
    const isChecked = ctx.value === value;
    const isDisabled = disabled || ctx.disabled;
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className={cn("flex items-start gap-3", className)}>
        <div className="relative flex h-5 w-5 shrink-0 items-center justify-center pt-0.5">
          <input
            ref={ref}
            id={id}
            type="radio"
            role="radio"
            name={ctx.name}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={() => ctx.onValueChange?.(value)}
            aria-checked={isChecked}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={errorId}
            className="peer sr-only"
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(
              "flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 border-border bg-background transition-all",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
              "peer-checked:border-primary peer-checked:bg-background",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              error && "border-destructive"
            )}
          >
            <motion.span
              initial={false}
              animate={{ scale: isChecked ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, duration: 0.2 }}
              className="h-2.5 w-2.5 rounded-full bg-primary"
            />
          </label>
        </div>
        <div className="space-y-0.5 leading-none">
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
Radio.displayName = "Radio";
