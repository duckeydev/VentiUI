'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const textareaVariants = cva(
  "flex w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default: "border-border",
        error: "border-destructive focus-visible:ring-destructive/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  error?: string;
  autoResize?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, error, autoResize, onInput, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const id = React.useId();
    const errorId = error ? `${id}-error` : undefined;
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);

    React.useImperativeHandle(ref, () => innerRef.current!);

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (autoResize && innerRef.current) {
        innerRef.current.style.height = "auto";
        innerRef.current.style.height = `${innerRef.current.scrollHeight}px`;
      }
      onInput?.(e as unknown as React.InputEvent<HTMLTextAreaElement>);
    };

    return (
      <div className="w-full">
        <motion.div
          animate={{ scale: isFocused ? 1.01 : 1 }}
          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
        >
          <textarea
            ref={innerRef}
            className={cn(textareaVariants({ variant: error ? "error" : variant, className }))}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={errorId}
            onInput={handleInput}
            onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
            onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
            rows={props.rows || 3}
            {...props}
          />
        </motion.div>
        <AnimatePresence>
          {error && (
            <motion.p
              id={errorId}
              role="alert"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
              className="mt-1.5 text-xs font-medium text-destructive"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
