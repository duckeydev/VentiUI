import * as React from "react";
import { IconChevronDown, IconCheck } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
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
  ({ label, placeholder = "Select an option...", options, value, defaultValue, onChange, disabled, error, className }, ref) => {
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
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
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
          const next = activeIndex < options.length - 1 ? activeIndex + 1 : 0;
          setActiveIndex(next);
          itemRefs.current[next]?.scrollIntoView({ block: "nearest" });
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const prev = activeIndex > 0 ? activeIndex - 1 : options.length - 1;
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
        itemRefs.current[options.length - 1]?.scrollIntoView({ block: "nearest" });
      }
    };

    return (
      <div ref={containerRef} className={cn("w-full space-y-1.5", className)}>
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
          aria-activedescendant={isOpen ? `${id}-option-${activeIndex}` : undefined}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex w-full items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            "disabled:cursor-not-allowed disabled:opacity-50",
            isOpen && "ring-2 ring-primary/40",
            error ? "border-destructive" : "border-border"
          )}
        >
          <span className={cn("block truncate", !selectedOption && "text-muted-foreground")}>
            {selectedOption?.label || placeholder}
          </span>
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <IconChevronDown className="h-4 w-4 text-muted-foreground" />
          </motion.span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              id={listboxId}
              role="listbox"
              className="absolute z-50 mt-1 max-h-60 w-full min-w-[12rem] overflow-auto rounded-xl border border-border/70 bg-card p-1.5 shadow-lg"
            >
              {options.map((option, index) => (
                <div
                  key={option.value}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={selectedValue === option.value}
                  aria-disabled={option.disabled}
                  onClick={() => selectOption(option)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors",
                    "hover:bg-muted focus:bg-muted",
                    activeIndex === index && "bg-muted",
                    option.disabled && "cursor-not-allowed opacity-40",
                    selectedValue === option.value && "font-semibold text-primary"
                  )}
                >
                  <span>{option.label}</span>
                  {selectedValue === option.value && <IconCheck className="h-4 w-4 text-primary" />}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <p id={errorId} className="text-xs font-medium text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";