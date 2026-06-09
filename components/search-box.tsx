"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { IconSearch, IconX, IconLoader2 } from "@tabler/icons-react";

export const searchBoxVariants = cva(
  "flex h-10 w-full items-center gap-2 rounded-lg border border-border/80 bg-background/50 px-3 py-2 text-sm shadow-sm transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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

// Custom lightweight debounce hook for local optimization
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
  shortcutKey?: string; // Optional single character like "/" or "k" to focus
}

export const SearchBox = React.forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ className, variant, value, onChange, onDebounceSearch, debounceDelay = 300, isLoading = false, shortcutKey, placeholder = "Search parameters...", ...props }, ref) => {
    const internalInputRef = React.useRef<HTMLInputElement>(null);
    // Combine forwarded refs with local ref safely
    React.useImperativeHandle(ref, () => internalInputRef.current!);

    const debouncedValue = useDebounce(value, debounceDelay);

    // Watch debounced changes to fire analytical hooks
    React.useEffect(() => {
      if (onDebounceSearch) {
        onDebounceSearch(debouncedValue);
      }
    }, [debouncedValue, onDebounceSearch]);

    // Mount shortcut listeners globally if parameters are active
    React.useEffect(() => {
      if (!shortcutKey) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === shortcutKey && document.activeElement !== internalInputRef.current) {
          // If using "CMD+K" style triggers or simple bare keys, safely override document paths
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
      <div className={searchBoxVariants({ variant, className })}>
        {isLoading ? (
          <IconLoader2 className="w-4 h-4 text-muted-foreground/50 animate-spin shrink-0" />
        ) : (
          <IconSearch className="w-4 h-4 text-muted-foreground/60 shrink-0" />
        )}

        <input
          ref={internalInputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-xs text-foreground outline-none border-none placeholder:text-muted-foreground/50 p-0"
          {...props}
        />

        {value && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className="text-muted-foreground/60 hover:text-foreground transition-colors p-0.5 outline-none"
          >
            <IconX className="w-3.5 h-3.5" />
          </button>
        )}

        {shortcutKey && !value && (
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-border/80 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground/80 opacity-100 sm:flex shrink-0 uppercase">
            {shortcutKey}
          </kbd>
        )}
      </div>
    );
  }
);

SearchBox.displayName = "SearchBox";