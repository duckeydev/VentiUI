"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const inputNumberVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-lg border border-border/80 bg-background/50 transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        modern: "hover:border-border focus-within:border-border",
        minimal: "border-transparent hover:border-border/50 focus-within:border-border",
        glass: "border-white/10 bg-white/5 backdrop-blur-xl shadow-glass hover:bg-white/10 focus-within:bg-white/15",
        macos: "border-border/50 bg-secondary/30 rounded-xl shadow-sm hover:bg-secondary/40 focus-within:bg-secondary/50",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);

export interface InputNumberProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof inputNumberVariants> {
  value?: number;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

export const InputNumber = React.forwardRef<HTMLDivElement, InputNumberProps>(
  ({ className, variant, value, onChange, min = -Infinity, max = Infinity, step = 1, placeholder = "0", disabled = false, error, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState<string>(value !== undefined ? String(value) : "");
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);
    const inputId = React.useId();
    const errorId = error ? `${inputId}-error` : undefined;

    React.useEffect(() => {
      setInputValue(value !== undefined ? String(value) : "");
    }, [value]);

    const getPrecision = (num: number) => {
      const parts = String(num).split(".");
      return parts[1] ? parts[1].length : 0;
    };

    const updateValue = (direction: "increment" | "decrement") => {
      if (disabled) return;

      const currentVal = value !== undefined ? value : 0;
      const precision = Math.max(getPrecision(currentVal), getPrecision(step));
      let newVal = direction === "increment" ? currentVal + step : currentVal - step;

      newVal = Math.max(min, Math.min(max, parseFloat(newVal.toFixed(precision))));

      onChange?.(newVal);
      setInputValue(String(newVal));
    };

    const startHolding = (direction: "increment" | "decrement") => {
      if (disabled) return;
      updateValue(direction);
      timerRef.current = setTimeout(() => {
        timerRef.current = setInterval(() => updateValue(direction), 60);
      }, 400);
    };

    const stopHolding = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        clearInterval(timerRef.current);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        updateValue("increment");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        updateValue("decrement");
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawString = e.target.value;
      setInputValue(rawString);

      if (rawString === "" || rawString === "-") {
        onChange?.(undefined);
        return;
      }

      const parsedNum = Number(rawString);
      if (!isNaN(parsedNum)) {
        onChange?.(parsedNum);
      }
    };

    const handleBlur = () => {
      if (inputValue === "" || inputValue === "-") {
        onChange?.(undefined);
        return;
      }

      let normalized = Math.max(min, Math.min(max, Number(inputValue)));
      if (isNaN(normalized)) normalized = min !== -Infinity ? min : 0;

      onChange?.(normalized);
      setInputValue(String(normalized));
    };

    const isMinLimit = value !== undefined && value <= min;
    const isMaxLimit = value !== undefined && value >= max;

    return (
      <div className="w-full">
        <div ref={ref} className={cn(inputNumberVariants({ variant, className }), error && "border-destructive focus-within:ring-destructive/40")} {...props}>
          <motion.button
            type="button"
            onMouseDown={() => startHolding("decrement")}
            onMouseUp={stopHolding}
            onMouseLeave={stopHolding}
            disabled={disabled || isMinLimit}
            aria-label="Decrement"
            whileTap={{ scale: 0.85 }}
            transition={{ duration: 0.1 }}
            className="flex h-full items-center justify-center px-2.5 text-muted-foreground/50 transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 border-r border-border/40 select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <IconMinus className="h-3.5 w-3.5" />
          </motion.button>

          <input
            id={inputId}
            type="text"
            inputMode="decimal"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={errorId}
            className="w-full bg-transparent text-center text-xs font-medium text-foreground outline-none border-none placeholder:text-muted-foreground/40 p-0 disabled:cursor-not-allowed"
          />

          <motion.button
            type="button"
            onMouseDown={() => startHolding("increment")}
            onMouseUp={stopHolding}
            onMouseLeave={stopHolding}
            disabled={disabled || isMaxLimit}
            aria-label="Increment"
            whileTap={{ scale: 0.85 }}
            transition={{ duration: 0.1 }}
            className="flex h-full items-center justify-center px-2.5 text-muted-foreground/50 transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 border-l border-border/40 select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <IconPlus className="h-3.5 w-3.5" />
          </motion.button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              id={errorId}
              role="alert"
              initial={{ opacity: 0, y: -4, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
              className="mt-1.5 text-xs font-medium text-destructive overflow-hidden"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

InputNumber.displayName = "InputNumber";
