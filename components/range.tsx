import * as React from "react";
import { cn } from "@/lib/utils";

export interface RangeProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string;
  description?: string;
  error?: string;
  showValue?: boolean;
  onChange?: (value: number) => void;
}

export const Range = React.forwardRef<HTMLInputElement, RangeProps>(
  ({ className, label, description, error, showValue, onChange, min = 0, max = 100, step = 1, value, defaultValue, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? min);
    const isControlled = value !== undefined;
    const currentValue = Number(isControlled ? value : internalValue);
    const id = React.useId();
    const errorId = error ? `${id}-error` : undefined;
    const percentage = ((currentValue - Number(min)) / (Number(max) - Number(min))) * 100;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
    };

    return (
      <div className={cn("w-full space-y-2", className)}>
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={id} className="text-sm font-medium text-foreground">
              {label}
            </label>
          )}
          {showValue && (
            <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs font-semibold text-secondary-foreground">
              {currentValue}
            </span>
          )}
        </div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}

        <div className="relative flex items-center py-2">
          <input
            ref={ref}
            id={id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={errorId}
            className={cn(
              "w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full",
              "[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-muted",
              "[&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110",
              "[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-muted",
              "[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-sm",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            style={{ accentColor: "hsl(var(--primary))" }}
            {...props}
          />
          <div
            className="pointer-events-none absolute left-0 h-2 rounded-full bg-primary opacity-50"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {error && (
          <p id={errorId} className="text-xs font-medium text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Range.displayName = "Range";