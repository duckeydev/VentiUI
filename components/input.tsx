import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const inputVariants = cva(
  "flex w-full rounded-lg border bg-background text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border",
        error: "border-destructive focus-visible:ring-destructive/40",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-8 px-2 py-1 text-xs",
        lg: "h-12 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, error, "aria-describedby": ariaDescribedby, ...props }, ref) => {
    const id = React.useId();
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(inputVariants({ variant: error ? "error" : variant, size, className }))}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : ariaDescribedby}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1.5 text-xs font-medium text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";