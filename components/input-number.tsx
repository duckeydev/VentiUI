"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { IconPlus, IconMinus } from "@tabler/icons-react";

export const inputNumberVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-lg border border-border/80 bg-background/50 transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "hover:border-border focus-within:border-border",
        compact: "h-8 rounded-md bg-muted/30 focus-within:bg-background",
      },
    },
    defaultVariants: {
      variant: "default",
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
}

export const InputNumber = React.forwardRef<HTMLDivElement, InputNumberProps>(
  ({ className, variant, value, onChange, min = -Infinity, max = Infinity, step = 1, placeholder = "0", disabled = false, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState<string>(value !== undefined ? String(value) : "");
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    // Sync state when external value dependencies alter execution
    React.useEffect(() => {
      setInputValue(value !== undefined ? String(value) : "");
    }, [value]);

    // Handle floating-point precision math safely
    const getPrecision = (num: number) => {
      const parts = String(num).split(".");
      return parts[1] ? parts[1].length : 0;
    };

    const updateValue = (direction: "increment" | "decrement") => {
      if (disabled) return;
      
      const currentVal = value !== undefined ? value : 0;
      const precision = Math.max(getPrecision(currentVal), getPrecision(step));
      let newVal = direction === "increment" ? currentVal + step : currentVal - step;
      
      // Enforce edge constraints logic
      newVal = Math.max(min, Math.min(max, parseFloat(newVal.toFixed(precision))));
      
      onChange?.(newVal);
      setInputValue(String(newVal));
    };

    // Long press step optimization handler
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

    // Handle native key behaviors safely
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

      // Validate numeric patterns before propagation updates
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

      // Snap invalid text parameters inside closest numeric limits
      let normalized = Math.max(min, Math.min(max, Number(inputValue)));
      if (isNaN(normalized)) normalized = min !== -Infinity ? min : 0;

      onChange?.(normalized);
      setInputValue(String(normalized));
    };

    const isMinLimit = value !== undefined && value <= min;
    const isMaxLimit = value !== undefined && value >= max;

    return (
      <div ref={ref} className={inputNumberVariants({ variant, className })} {...props}>
        {/* Decrement Vector Click Area */}
        <button
          type="button"
          onMouseDown={() => startHolding("decrement")}
          onMouseUp={stopHolding}
          onMouseLeave={stopHolding}
          disabled={disabled || isMinLimit}
          className="flex h-full items-center justify-center px-2.5 text-muted-foreground/50 transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 border-r border-border/40 select-none outline-none"
        >
          <IconMinus className="h-3.5 w-3.5" />
        </button>

        {/* Core Content String Text Controller */}
        <input
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-transparent text-center text-xs font-medium text-foreground outline-none border-none placeholder:text-muted-foreground/40 p-0 disabled:cursor-not-allowed"
        />

        {/* Increment Vector Click Area */}
        <button
          type="button"
          onMouseDown={() => startHolding("increment")}
          onMouseUp={stopHolding}
          onMouseLeave={stopHolding}
          disabled={disabled || isMaxLimit}
          className="flex h-full items-center justify-center px-2.5 text-muted-foreground/50 transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 border-left border-l border-border/40 select-none outline-none"
        >
          <IconPlus className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }
);

InputNumber.displayName = "InputNumber";