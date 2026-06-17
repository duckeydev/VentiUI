"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown, IconX, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const comboBoxVariants = cva(
  "flex min-h-10 w-full flex-wrap items-center justify-between rounded-lg border border-border/80 bg-background/50 p-1.5 text-sm shadow-sm transition-all focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-left cursor-text",
  {
    variants: {
      variant: {
        modern: "hover:border-border focus-within:border-border",
        minimal: "border-transparent shadow-none bg-transparent focus-within:border-border/50",
        glass: "border-white/10 bg-white/5 backdrop-blur-xl shadow-glass focus-within:bg-white/10",
        macos: "border-border/50 bg-secondary/30 rounded-xl shadow-sm focus-within:bg-secondary/40",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);

export interface ComboBoxOption {
  value: string;
  label: string;
}

export interface ComboBoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof comboBoxVariants> {
  options: ComboBoxOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string;
}

export const ComboBox = React.forwardRef<HTMLDivElement, ComboBoxProps>(
  ({ className, variant, options, value = [], onChange, placeholder = "Select items...", error, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);
    const id = React.useId();
    const listboxId = `${id}-listbox`;
    const inputId = `${id}-input`;
    const errorId = error ? `${id}-error` : undefined;

    const filteredOptions = options.filter(
      (option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()) &&
        !value.includes(option.value)
    );

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    React.useEffect(() => {
      setHighlightedIndex(-1);
    }, [inputValue]);

    React.useEffect(() => {
      if (highlightedIndex >= 0 && listRef.current) {
        const el = listRef.current.children[highlightedIndex] as HTMLElement;
        el?.scrollIntoView({ block: "nearest" });
      }
    }, [highlightedIndex]);

    const handleSelect = (val: string) => {
      onChange([...value, val]);
      setInputValue("");
      inputRef.current?.focus();
    };

    const handleRemove = (val: string, e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(value.filter((item) => item !== val));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          if (isOpen && highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
            handleSelect(filteredOptions[highlightedIndex].value);
          }
          break;
        case "Escape":
          if (isOpen) {
            e.preventDefault();
            setIsOpen(false);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : 0
            );
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (isOpen) {
            setHighlightedIndex((prev) =>
              prev > 0 ? prev - 1 : filteredOptions.length - 1
            );
          }
          break;
        case "Backspace":
          if (inputValue === "" && value.length > 0) {
            onChange(value.slice(0, -1));
          }
          break;
      }
    };

    const activeDescendant = isOpen && highlightedIndex >= 0
      ? `${id}-option-${highlightedIndex}`
      : undefined;

    return (
      <div ref={containerRef} className={cn("relative w-full max-w-sm", className)} {...props}>
        <div
          ref={ref}
          onClick={() => inputRef.current?.focus()}
          className={comboBoxVariants({ variant })}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-activedescendant={activeDescendant}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
        >
          <div className="flex flex-wrap gap-1.5 items-center flex-grow max-w-[90%]">
            <AnimatePresence>
              {value.map((val) => {
                const option = options.find((opt) => opt.value === val);
                return (
                  <motion.span
                    key={val}
                    layout
                    initial={{ scale: 0.8, opacity: 0, filter: "blur(4px)" }}
                    animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                    exit={{ scale: 0.8, opacity: 0, filter: "blur(4px)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="inline-flex items-center gap-1 bg-secondary border border-border/80 px-2 py-0.5 rounded-md font-medium text-xs text-foreground/90 shrink-0"
                  >
                    {option?.label || val}
                    <button
                      type="button"
                      onClick={(e) => handleRemove(val, e)}
                      className="text-muted-foreground/60 hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
                      aria-label={`Remove ${option?.label || val}`}
                    >
                      <IconX className="w-3 h-3" />
                    </button>
                  </motion.span>
                );
              })}
            </AnimatePresence>

            <input
              ref={inputRef}
              id={inputId}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={value.length === 0 ? placeholder : ""}
              className="flex-grow min-w-[60px] bg-transparent text-xs text-foreground outline-none border-none placeholder:text-muted-foreground/60 p-0.5"
            />
          </div>

          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}>
            <IconChevronDown
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
                inputRef.current?.focus();
              }}
              className="w-4 h-4 text-muted-foreground/50 mr-1 cursor-pointer shrink-0"
            />
          </motion.span>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -4 }}
              transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
              id={listboxId}
              role="listbox"
              aria-labelledby={inputId}
              className="absolute top-full z-50 mt-1.5 w-full rounded-xl border border-border bg-popover text-popover-foreground shadow-xl overflow-hidden backdrop-blur-md p-1"
            >
              <div ref={listRef} className="max-h-52 overflow-y-auto custom-scrollbar">
                {filteredOptions.length === 0 ? (
                  <div className="text-[11px] text-muted-foreground/50 text-center py-4 font-mono">
                    {inputValue ? "NO_MATCHING_RECORDS" : "ALL_ITEMS_SELECTED"}
                  </div>
                ) : (
                  filteredOptions.map((option, idx) => {
                    const isHighlighted = idx === highlightedIndex;
                    return (
                      <div
                        key={option.value}
                        id={`${id}-option-${idx}`}
                        role="option"
                        aria-selected={false}
                        onClick={() => handleSelect(option.value)}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                        className={cn(
                          "flex items-center justify-between text-xs rounded-md px-2.5 py-2 cursor-pointer transition-colors",
                          isHighlighted
                            ? "bg-secondary/60 text-foreground"
                            : "text-foreground/90"
                        )}
                      >
                        <span className="truncate">{option.label}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

ComboBox.displayName = "ComboBox";
