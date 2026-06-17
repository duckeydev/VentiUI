"use client";

import * as React from "react";
import { IconChevronDown, IconCheck } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const selectVariants = cva(
  "flex w-full items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-border hover:border-border/80 focus-visible:border-primary/30",
        glass:
          "border-white/20 dark:border-white/10 bg-white/5 dark:bg-black/10 backdrop-blur-md hover:bg-white/10 dark:hover:bg-black/20 focus-visible:bg-white/10 dark:focus-visible:bg-black/20 focus-visible:border-white/30 dark:focus-visible:border-white/20",
        notion:
          "border-[#e9e9e8] dark:border-[#2e2e2e] bg-white dark:bg-[#1a1a1a] shadow-none hover:border-[#d9d8d5] dark:hover:border-[#3a3a3a] focus-visible:border-[#c9c9c5] dark:focus-visible:border-[#4a4a4a]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const selectListVariants = cva(
  "absolute z-50 mt-1 max-h-60 w-full min-w-[12rem] overflow-auto rounded-xl border p-1.5 shadow-lg",
  {
    variants: {
      variant: {
        default: "border-border/70 bg-card shadow-xl",
        glass:
          "backdrop-blur-2xl bg-white/80 dark:bg-black/60 border-white/20 dark:border-white/10 shadow-2xl",
        notion:
          "bg-white dark:bg-[#191919] border-[#e9e9e8] dark:border-[#2e2e2e] shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends VariantProps<typeof selectVariants> {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      placeholder = "Select an option...",
      options,
      value,
      defaultValue,
      onChange,
      disabled,
      error,
      className,
      variant = "default",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = value !== undefined;
    const selectedValue = isControlled ? value : internalValue;
    const selectedOption = options.find((o) => o.value === selectedValue);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
    const id = React.useId();
    const listboxId = `${id}-listbox`;
    const errorId = error ? `${id}-error` : undefined;

    React.useEffect(() => {
      if (!isOpen) return;
      const handleOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleOutside);
      return () => document.removeEventListener("mousedown", handleOutside);
    }, [isOpen]);

    React.useEffect(() => {
      if (isOpen) {
        const idx = options.findIndex((o) => o.value === selectedValue);
        setActiveIndex(idx >= 0 ? idx : 0);
      }
    }, [isOpen, options, selectedValue]);

    const selectOption = (option: SelectOption) => {
      if (option.disabled) return;
      if (!isControlled) setInternalValue(option.value);
      onChange?.(option.value);
      setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          selectOption(options[activeIndex]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const next =
            activeIndex < options.length - 1 ? activeIndex + 1 : 0;
          setActiveIndex(next);
          itemRefs.current[next]?.scrollIntoView({ block: "nearest" });
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const prev =
            activeIndex > 0 ? activeIndex - 1 : options.length - 1;
          setActiveIndex(prev);
          itemRefs.current[prev]?.scrollIntoView({ block: "nearest" });
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveIndex(0);
        itemRefs.current[0]?.scrollIntoView({ block: "nearest" });
      } else if (e.key === "End") {
        e.preventDefault();
        setActiveIndex(options.length - 1);
        itemRefs.current[options.length - 1]?.scrollIntoView({
          block: "nearest",
        });
      }
    };

    return (
      <div
        ref={containerRef}
        className={cn("relative w-full space-y-1.5", className)}
      >
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <button
          ref={ref}
          type="button"
          id={id}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={
            isOpen ? `${id}-option-${activeIndex}` : undefined
          }
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={cn(
            selectVariants({ variant }),
            isOpen && error
              ? "ring-2 ring-destructive/30 border-destructive"
              : isOpen && "ring-2 ring-primary/30",
            error && !isOpen && "border-destructive"
          )}
        >
          <span
            className={cn(
              "block truncate",
              !selectedOption && "text-muted-foreground"
            )}
          >
            {selectedOption?.label || placeholder}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
            className="shrink-0"
          >
            <IconChevronDown className="h-4 w-4 text-muted-foreground" />
          </motion.span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -4 }}
              transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
              id={listboxId}
              role="listbox"
              className={selectListVariants({ variant })}
            >
              {options.map((option, index) => (
                <div
                  key={option.value}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={selectedValue === option.value}
                  aria-disabled={option.disabled}
                  onClick={() => selectOption(option)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors duration-100",
                    "hover:bg-muted focus:bg-muted",
                    activeIndex === index && "bg-muted",
                    option.disabled && "cursor-not-allowed opacity-40",
                    selectedValue === option.value &&
                      "font-semibold text-primary"
                  )}
                >
                  <span>{option.label}</span>
                  {selectedValue === option.value && (
                    <IconCheck className="h-4 w-4 text-primary shrink-0" />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.p
              id={errorId}
              role="alert"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
              className="text-xs font-medium text-destructive"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
Select.displayName = "Select";
