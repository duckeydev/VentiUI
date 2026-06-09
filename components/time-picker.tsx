import * as React from "react";
import { IconClock } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange" | "defaultValue"> {
  label?: string;
  description?: string;
  error?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  use12Hours?: boolean;
}

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, label, description, error, value, defaultValue, onChange, use12Hours, disabled, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
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

        <div className="relative">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <IconClock className="h-4 w-4" />
          </div>
          <input
            ref={ref}
            id={id}
            type="time"
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            className={cn(
              "flex w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm text-foreground shadow-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error ? "border-destructive focus-visible:ring-destructive/40" : "border-border"
            )}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={errorId}
            {...(use12Hours ? { step: 1 } : {})}
            {...props}
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
TimePicker.displayName = "TimePicker";