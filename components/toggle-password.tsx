"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const togglePasswordVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-lg border border-border/80 bg-background/50 px-3 py-2 text-sm shadow-sm transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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

export interface TogglePasswordProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">,
    VariantProps<typeof togglePasswordVariants> {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const TogglePassword = React.forwardRef<HTMLInputElement, TogglePasswordProps>(
  ({ className, variant, value, onChange, placeholder = "Enter password...", error, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const internalInputRef = React.useRef<HTMLInputElement>(null);
    const id = React.useId();
    const errorId = error ? `${id}-error` : undefined;

    React.useImperativeHandle(ref, () => internalInputRef.current!);

    const handleToggleVisibility = () => {
      setIsVisible((prev) => !prev);
      setTimeout(() => {
        internalInputRef.current?.focus();
      }, 0);
    };

    return (
      <div className="w-full">
        <div className={cn(togglePasswordVariants({ variant, className }), error && "border-destructive focus-within:ring-destructive/40")}>
          <input
            ref={internalInputRef}
            id={id}
            type={isVisible ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={errorId}
            className="w-full bg-transparent text-xs text-foreground outline-none border-none placeholder:text-muted-foreground/50 p-0"
            {...props}
          />
          <motion.button
            type="button"
            onClick={handleToggleVisibility}
            whileTap={{ scale: 0.9 }}
            aria-label={isVisible ? "Hide password" : "Show password"}
            className="text-muted-foreground/50 hover:text-foreground transition-colors p-0.5 outline-none shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isVisible ? (
                <motion.span
                  key="eye-off"
                  initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
                  className="flex items-center justify-center"
                >
                  <IconEyeOff className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="eye"
                  initial={{ scale: 0.5, opacity: 0, rotate: 90 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
                  className="flex items-center justify-center"
                >
                  <IconEye className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
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

TogglePassword.displayName = "TogglePassword";
