"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown, IconSearch, IconX, IconCheck } from "@tabler/icons-react";

export const selectVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-lg border border-border/80 bg-background/50 px-3 py-2 text-sm shadow-sm transition-all placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-left cursor-pointer",
  {
    variants: {
      variant: {
        default: "hover:border-border hover:bg-muted/20",
        ghost: "border-transparent shadow-none hover:bg-muted/40",
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

export interface AdvancedSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof selectVariants> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
}

export const AdvancedSelect = React.forwardRef<HTMLDivElement, AdvancedSelectProps>(
  ({ className, variant, options, value, onChange, placeholder = "Select option...", searchable = false, clearable = false, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Sync baseline selections closures
    const selectedOption = options.find((opt) => opt.value === value);

    // Close on click layout departures
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter collection via query strings
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    return (
      <div ref={containerRef} className="relative w-full max-w-xs" {...props}>
        {/* Trigger Button Anchor */}
        <div
          ref={ref}
          onClick={() => setIsOpen(!isOpen)}
          className={selectVariants({ variant, className })}
        >
          <span className={`truncate ${!selectedOption ? "text-muted-foreground/70" : "text-foreground"}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          
          <div className="flex items-center gap-1.5 ml-2 shrink-0 text-muted-foreground/60">
            {clearable && value && (
              <IconX
                onClick={handleClear}
                className="w-3.5 h-3.5 hover:text-foreground transition-colors cursor-pointer"
              />
            )}
            <IconChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        {/* Dropdown Options Drawer Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 3 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="absolute top-full z-50 mt-1.5 w-full rounded-xl border border-border bg-popover text-popover-foreground shadow-xl overflow-hidden backdrop-blur-md"
            >
              {searchable && (
                <div className="flex items-center gap-2 border-b border-border/40 px-2.5 py-2 bg-muted/10">
                  <IconSearch className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search query..."
                    className="w-full bg-transparent text-xs outline-none border-none placeholder:text-muted-foreground/40 text-foreground p-0"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              <div className="max-h-56 overflow-y-auto p-1 custom-scrollbar">
                {filteredOptions.length === 0 ? (
                  <div className="text-[11px] text-muted-foreground/60 text-center py-4 font-mono">
                    NO_ENTRIES_FOUND
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = option.value === value;
                    return (
                      <div
                        key={option.value}
                        onClick={() => handleSelect(option.value, option.disabled)}
                        className={`flex items-center justify-between text-xs rounded-md px-2.5 py-2 transition-colors cursor-pointer ${
                          option.disabled
                            ? "opacity-40 cursor-not-allowed bg-transparent"
                            : isSelected
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "hover:bg-secondary/60 text-foreground/90"
                        }`}
                      >
                        <span className="truncate pr-4">{option.label}</span>
                        {isSelected && <IconCheck className="w-3.5 h-3.5 shrink-0" />}
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AdvancedSelect.displayName = "AdvancedSelect";