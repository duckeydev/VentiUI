import * as React from "react";
import { cn } from "@/lib/utils";

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

    return (
      <RadioGroupContext.Provider
        value={{
          value: currentValue,
          onValueChange: (v) => {
            if (!isControlled) setInternalValue(v);
            onValueChange?.(v);
          },
          name: name || React.useId(),
          disabled,
        }}
      >
        <div ref={ref} className={cn("space-y-3", className)} role="radiogroup" aria-label={label} {...props}>
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
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, value, disabled, ...props }, ref) => {
    const ctx = React.useContext(RadioGroupContext);
    const id = React.useId();
    const isChecked = ctx.value === value;
    const isDisabled = disabled || ctx.disabled;

    return (
      <div className={cn("flex items-start gap-3", className)}>
        <div className="relative flex h-5 w-5 shrink-0 items-center justify-center pt-0.5">
          <input
            ref={ref}
            id={id}
            type="radio"
            name={ctx.name}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={() => ctx.onValueChange?.(value)}
            className="peer sr-only"
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(
              "flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 border-border bg-background transition-all",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
              "peer-checked:border-primary peer-checked:bg-background",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
            )}
          >
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full bg-primary transition-transform",
                isChecked ? "scale-100" : "scale-0"
              )}
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
        </div>
      </div>
    );
  }
);
Radio.displayName = "Radio";