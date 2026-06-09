"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export const togglePasswordVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-lg border border-border/80 bg-background/50 px-3 py-2 text-sm shadow-sm transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "hover:border-border focus-within:border-border",
        filled: "border-transparent bg-muted/40 focus-within:bg-background focus-within:border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TogglePasswordProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">,
    VariantProps<typeof togglePasswordVariants> {
  value: string;
  onChange: (value: string) => void;
}

export const TogglePassword = React.forwardRef<HTMLInputElement, TogglePasswordProps>(
  ({ className, variant, value, onChange, placeholder = "Enter password...", ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const internalInputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => internalInputRef.current!);

    const handleToggleVisibility = () => {
      setIsVisible((prev) => !prev);
      // Prevent focus loss when swapping modes
      setTimeout(() => {
        internalInputRef.current?.focus();
      }, 0);
    };

    return (
      <div className={togglePasswordVariants({ variant, className })}>
        <input
          ref={internalInputRef}
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-xs text-foreground outline-none border-none placeholder:text-muted-foreground/50 p-0"
          {...props}
        />
        <button
          type="button"
          onClick={handleToggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="text-muted-foreground/50 hover:text-foreground transition-colors p-0.5 outline-none shrink-0 cursor-pointer"
        >
          {isVisible ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
        </button>
      </div>
    );
  }
);

TogglePassword.displayName = "TogglePassword";