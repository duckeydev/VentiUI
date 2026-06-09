import * as React from "react";
import { IconCheck, IconMinus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

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
    const id = props.id || React.useId();
    const errorId = error ? `${id}-error` : undefined;

    React.useImperativeHandle(ref, () => innerRef.current!);

    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate]);

    return (
      <div className={cn("flex items-start gap-3", className)}>
        <div className="relative flex h-5 w-5 shrink-0 items-center justify-center pt-0.5">
          <input
            ref={innerRef}
            id={id}
            type="checkbox"
            className="peer sr-only"
            onChange={(e) => onCheckedChange?.(e.target.checked)}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={errorId}
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
            {indeterminate ? (
              <IconMinus className="h-3.5 w-3.5 text-primary-foreground opacity-0 peer-checked:opacity-100" />
            ) : (
              <IconCheck className="h-3.5 w-3.5 text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity" />
            )}
          </label>
        </div>
        <div className="space-y-1 leading-none">
          {label && (
            <label htmlFor={id} className="text-sm font-medium text-foreground cursor-pointer select-none">
              {label}
            </label>
          )}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
          {error && (
            <p id={errorId} className="text-xs font-medium text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";