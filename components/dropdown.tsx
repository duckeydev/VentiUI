// Component Example
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";

export const dropdownVariants = cva(
  "inline-flex items-center justify-between gap-2 px-4 py-2 text-sm font-semibold border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all select-none cursor-pointer active:scale-[0.99]",
  {
    variants: {
      variant: {
        default: "bg-background border-border text-foreground hover:bg-muted/40",
        secondary: "bg-secondary/60 border-transparent text-secondary-foreground hover:bg-secondary/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
}

export interface DropdownProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect">,
    VariantProps<typeof dropdownVariants> {
  label: React.ReactNode;
  items: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
  align?: "left" | "right";
}

export const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  ({ className, variant, label, items, onSelect, align = "left", disabled, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState<number>(-1);
    
    const containerRef = React.useRef<HTMLDivElement>(null);
    const itemRefs = React.useRef<HTMLButtonElement[]>([]);

    // Reset active index tracker whenever drop state resets
    React.useEffect(() => {
      if (!isOpen) setActiveIndex(-1);
    }, [isOpen]);

    // Handle cross-layout pointer interaction dismissals
    React.useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      if (isOpen) {
        document.addEventListener("mousedown", handleOutsideClick);
      }
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      if (e.key === "Escape") {
        setIsOpen(false);
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const nextIdx = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
          setActiveIndex(nextIdx);
          itemRefs.current[nextIdx]?.focus();
        }
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        if (isOpen) {
          const prevIdx = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
          setActiveIndex(prevIdx);
          itemRefs.current[prevIdx]?.focus();
        }
        e.preventDefault();
      }
    };

    return (
      <div ref={containerRef} className="relative inline-block text-left" onKeyDown={handleKeyDown}>
        <button
          ref={ref}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          aria-haspopup="true"
          aria-expanded={isOpen}
          disabled={disabled}
          className={dropdownVariants({ variant, className })}
          {...props}
        >
          <span>{label}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="text-muted-foreground/80"
          >
            <IconChevronDown className="h-4 w-4" strokeWidth={2.5} />
          </motion.span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={`absolute mt-1.5 w-48 rounded-xl border border-border/70 bg-card p-1.5 shadow-lg z-50 focus:outline-none ${
                align === "right" ? "right-0" : "left-0"
              }`}
              role="menu"
              aria-orientation="vertical"
            >
              <div className="space-y-0.5">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    ref={(el) => { if (el) itemRefs.current[index] = el; }}
                    type="button"
                    role="menuitem"
                    disabled={item.disabled}
                    onClick={() => {
                      if (!item.disabled) {
                        onSelect(item);
                        setIsOpen(false);
                      }
                    }}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors text-left outline-none select-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                      item.danger 
                        ? "text-destructive hover:bg-destructive/10 focus:bg-destructive/10" 
                        : "text-foreground/80 hover:bg-muted focus:bg-muted hover:text-foreground"
                    } ${activeIndex === index ? "bg-muted text-foreground" : ""}`}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    {item.icon && <span className="text-muted-foreground/70 shrink-0">{item.icon}</span>}
                    <span className="flex-1 truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";