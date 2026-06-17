"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconSearch, IconX, IconLoader2 } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const searchBoxVariants = cva(
  "flex h-10 w-full items-center gap-2 rounded-lg border border-border/80 bg-background/50 px-3 py-2 text-sm shadow-sm transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        modern: "hover:border-border focus-within:border-border",
        minimal: "border-transparent shadow-none hover:border-border/50 focus-within:border-border",
        glass: "border-white/10 bg-white/5 backdrop-blur-xl shadow-glass hover:bg-white/10 focus-within:bg-white/15",
        macos: "border-border/50 bg-secondary/30 rounded-xl shadow-sm hover:bg-secondary/40 focus-within:bg-secondary/50",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export interface SearchBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">,
    VariantProps<typeof searchBoxVariants> {
  value: string;
  onChange: (value: string) => void;
  onDebounceSearch?: (value: string) => void;
  debounceDelay?: number;
  isLoading?: boolean;
  shortcutKey?: string;
  error?: string;
}

export const SearchBox = React.forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ className, variant, value, onChange, onDebounceSearch, debounceDelay = 300, isLoading = false, shortcutKey, placeholder = "Search parameters...", error, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const internalInputRef = React.useRef<HTMLInputElement>(null);
    const id = React.useId();
    const errorId = error ? `${id}-error` : undefined;

    React.useImperativeHandle(ref, () => internalInputRef.current!);

    const debouncedValue = useDebounce(value, debounceDelay);

    React.useEffect(() => {
      if (onDebounceSearch) {
        onDebounceSearch(debouncedValue);
      }
    }, [debouncedValue, onDebounceSearch]);

    React.useEffect(() => {
      if (!shortcutKey) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === shortcutKey && document.activeElement !== internalInputRef.current) {
          if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
          e.preventDefault();
          internalInputRef.current?.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [shortcutKey]);

    const handleClear = () => {
      onChange("");
      internalInputRef.current?.focus();
    };

    return (
      <div className="w-full">
        <motion.div
          className={cn(searchBoxVariants({ variant, className }), error && "border-destructive focus-within:ring-destructive/40")}
          animate={{
            scale: isFocused ? 1.01 : 1,
            boxShadow: isFocused
              ? "0 0 0 1px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.08)"
              : "0 1px 2px rgba(0,0,0,0.05)",
          }}
          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isLoading ? (
              <motion.span
                key="spinner"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: 360 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
                className="flex items-center justify-center shrink-0"
              >
                <IconLoader2 className="w-4 h-4 text-muted-foreground/50 animate-spin" />
              </motion.span>
            ) : (
              <motion.span
                key="search"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
                className="flex items-center justify-center shrink-0"
              >
                <IconSearch className="w-4 h-4 text-muted-foreground/60" />
              </motion.span>
            )}
          </AnimatePresence>

          <input
            ref={internalInputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            role="combobox"
            aria-expanded={false}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={errorId}
            className="w-full bg-transparent text-xs text-foreground outline-none border-none placeholder:text-muted-foreground/50 p-0"
            {...props}
          />

          <AnimatePresence>
            {value && !isLoading && (
              <motion.button
                type="button"
                onClick={handleClear}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
                className="text-muted-foreground/60 hover:text-foreground transition-colors p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded shrink-0"
                aria-label="Clear search"
              >
                <IconX className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </AnimatePresence>

          {shortcutKey && !value && (
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-border/80 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground/80 opacity-100 sm:flex shrink-0 uppercase">
              {shortcutKey}
            </kbd>
          )}
        </motion.div>

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

SearchBox.displayName = "SearchBox";
