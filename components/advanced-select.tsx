"use client";

import * as React from "react";
import { useMemo } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown, IconSearch, IconX, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const selectVariants = cva(
  "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-xs font-medium shadow-sm transition-all placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-left cursor-pointer select-none",
  {
    variants: {
      variant: {
        modern: "hover:bg-accent/40 hover:text-accent-foreground",
        minimal: "border-transparent shadow-none hover:bg-accent hover:text-accent-foreground",
        ghost: "border-transparent bg-transparent shadow-none hover:bg-accent hover:text-accent-foreground px-1.5",
        subtle: "border-border/40 bg-muted/30 hover:bg-muted/60",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);

export interface SelectOption {
  value: any;
  label: any;
  disabled?: boolean;
}

export interface AdvancedSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof selectVariants> {
  options: SelectOption[];
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  error?: string;
}

export const AdvancedSelect = React.forwardRef<HTMLDivElement, AdvancedSelectProps>(
  ({ className, variant, options, value, onChange, placeholder = "Select option...", searchable = false, clearable = false, error, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);
    
    const id = React.useId();
    const listboxId = `${id}-listbox`;
    const triggerId = `${id}-trigger`;
    const errorId = error ? `${id}-error` : undefined;

    const selectedOption = options.find((opt) => opt.value === value);

    const filteredOptions = useMemo(() => {
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [options, searchQuery]);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchQuery("");
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    React.useEffect(() => {
      if (isOpen) {
        setHighlightedIndex(-1);
        if (searchable) {
          setTimeout(() => searchInputRef.current?.focus(), 50);
        }
      } else {
        setSearchQuery("");
      }
    }, [isOpen, searchable]);

    React.useEffect(() => {
      if (highlightedIndex >= 0 && listRef.current) {
        const el = listRef.current.children[highlightedIndex] as HTMLElement;
        el?.scrollIntoView({ block: "nearest" });
      }
    }, [highlightedIndex]);

    const handleSelect = (val: string, disabled?: boolean) => {
      if (disabled) return;
      onChange?.(val);
      setIsOpen(false);
      setSearchQuery("");
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.("");
      setSearchQuery("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          if (isOpen && highlightedIndex >= 0) {
            const opt = filteredOptions[highlightedIndex];
            if (opt) handleSelect(opt.value, opt.disabled);
          } else {
            setIsOpen(true);
          }
          break;
        case "Escape":
          if (isOpen) {
            e.preventDefault();
            setIsOpen(false);
            setSearchQuery("");
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
      }
    };

    return (
      <div ref={containerRef} className={cn("relative w-full", className)} {...props}>
        <div
          ref={ref}
          id={triggerId}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={cn(selectVariants({ variant }), isOpen && "border-ring ring-1 ring-ring")}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-activedescendant={isOpen && highlightedIndex >= 0 ? `${id}-option-${highlightedIndex}` : undefined}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          tabIndex={0}
        >
          <span className={cn("truncate", !selectedOption ? "text-muted-foreground/70 font-normal" : "text-foreground")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <div className="flex items-center gap-1 ml-1 shrink-0 text-muted-foreground">
            {clearable && value && (
              <span onClick={handleClear} role="button" aria-label="Clear selection" className="p-0.5 hover:bg-accent rounded-sm transition-colors">
                <IconX className="w-3 h-3 hover:text-foreground transition-colors cursor-pointer" />
              </span>
            )}
            <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.12, ease: EASE_OUT_EXPO }}>
              <IconChevronDown className="w-3 h-3 opacity-60" />
            </motion.span>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              id={listboxId}
              role="listbox"
              aria-labelledby={triggerId}
              className="absolute top-full z-50 mt-1 min-w-[120px] w-full rounded-md border border-border bg-popover text-popover-foreground shadow-md overflow-hidden origin-top-left"
            >
              {searchable && (
                <div className="flex items-center gap-2 border-b border-border px-2.5 py-2 bg-muted/20">
                  <IconSearch className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setHighlightedIndex(-1);
                    }}
                    placeholder="Filter elements..."
                    className="w-full bg-transparent text-xs outline-none border-none placeholder:text-muted-foreground/50 text-foreground p-0 focus:ring-0 focus:outline-none"
                    onClick={(e) => e.stopPropagation()}
                    role="searchbox"
                    aria-label="Filter options"
                  />
                </div>
              )}

              <div ref={listRef} className="max-h-52 overflow-y-auto p-1 scrollbar-thin">
                {filteredOptions.length === 0 ? (
                  <div className="text-[11px] text-muted-foreground/70 text-center py-4 font-normal">
                    No results found
                  </div>
                ) : (
                  filteredOptions.map((option: SelectOption, idx: number) => {
                    const isSelected = option.value === value;
                    const isHighlighted = idx === highlightedIndex;
                    return (
                      <div
                        key={option.value}
                        id={`${id}-option-${idx}`}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                        onClick={() => handleSelect(option.value, option.disabled)}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                        className={cn(
                          "flex items-center justify-between text-xs rounded-sm px-2.5 py-1.5 transition-colors cursor-pointer relative",
                          option.disabled
                            ? "opacity-30 cursor-not-allowed bg-transparent"
                            : isHighlighted && !isSelected
                            ? "bg-accent text-accent-foreground"
                            : isSelected
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-foreground"
                        )}
                      >
                        <span className="truncate pr-4">{option.label}</span>
                        {isSelected && (
                          <IconCheck className="w-3.5 h-3.5 shrink-0" />
                        )}
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
              initial={{ opacity: 0, y: -2, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -2, height: 0 }}
              transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
              className="mt-1 text-xs font-medium text-destructive overflow-hidden"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AdvancedSelect.displayName = "AdvancedSelect";