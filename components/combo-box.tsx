"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown, IconX, IconCheck } from "@tabler/icons-react";

export const comboBoxVariants = cva(
  "flex min-h-10 w-full flex-wrap items-center justify-between rounded-lg border border-border/80 bg-background/50 p-1.5 text-sm shadow-sm transition-all focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-left cursor-text",
  {
    variants: {
      variant: {
        default: "hover:border-border focus-within:border-border",
        ghost: "border-transparent shadow-none bg-muted/20 focus-within:bg-background",
      },
    },
    defaultVariants: {
      variant: "default",
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
}

export const ComboBox = React.forwardRef<HTMLDivElement, ComboBoxProps>(
  ({ className, variant, options, value = [], onChange, placeholder = "Select items...", ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Click outside handler to dismiss menu drawer safely
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter unselected remaining tracks via text input search strings
    const filteredOptions = options.filter(
      (option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()) &&
        !value.includes(option.value)
    );

    const handleSelect = (val: string) => {
      onChange([...value, val]);
      setInputValue("");
      inputRef.current?.focus();
    };

    const handleRemove = (val: string, e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(value.filter((item) => item !== val));
    };

    return (
      <div ref={containerRef} className="relative w-full max-w-sm" {...props}>
        {/* Active Structural Input Box Canvas Frame */}
        <div
          ref={ref}
          onClick={() => inputRef.current?.focus()}
          className={comboBoxVariants({ variant, className })}
        >
          <div className="flex flex-wrap gap-1.5 items-center flex-grow max-w-[90%]">
            {value.map((val) => {
              const option = options.find((opt) => opt.value === val);
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 bg-secondary border border-border/80 px-2 py-0.5 rounded-md font-medium text-xs text-foreground/90 shrink-0"
                >
                  {option?.label || val}
                  <button
                    type="button"
                    onClick={(e) => handleRemove(val, e)}
                    className="text-muted-foreground/60 hover:text-foreground transition-colors outline-none"
                  >
                    <IconX className="w-3 h-3" />
                  </button>
                </span>
              );
            })}

            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder={value.length === 0 ? placeholder : ""}
              className="flex-grow min-w-[60px] bg-transparent text-xs text-foreground outline-none border-none placeholder:text-muted-foreground/60 p-0.5"
            />
          </div>

          <IconChevronDown
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className={`w-4 h-4 text-muted-foreground/50 mr-1 cursor-pointer transition-transform duration-200 shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Dynamic Context Menu Options Box Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 3 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="absolute top-full z-50 mt-1.5 w-full rounded-xl border border-border bg-popover text-popover-foreground shadow-xl overflow-hidden backdrop-blur-md p-1"
            >
              <div className="max-h-52 overflow-y-auto custom-scrollbar">
                {filteredOptions.length === 0 ? (
                  <div className="text-[11px] text-muted-foreground/50 text-center py-4 font-mono">
                    {inputValue ? "NO_MATCHING_RECORDS" : "ALL_ITEMS_SELECTED"}
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className="flex items-center justify-between text-xs rounded-md px-2.5 py-2 text-foreground/90 hover:bg-secondary/60 cursor-pointer transition-colors"
                    >
                      <span className="truncate">{option.label}</span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ComboBox.displayName = "ComboBox";