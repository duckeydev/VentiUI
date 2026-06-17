"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const dropdownVariants = cva(
  "inline-flex items-center justify-between gap-2 px-4 py-2 text-sm font-semibold border rounded-xl shadow-sm transition-all duration-150 select-none cursor-pointer active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        modern:
          "bg-primary text-primary-foreground border-primary/20 shadow-sm hover:bg-primary/90 hover:shadow",
        minimal:
          "bg-muted/40 text-foreground border-transparent hover:bg-muted/70 active:bg-muted/90",
        glass:
          "backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/10 dark:border-white/5 text-foreground shadow-sm hover:bg-white/20 dark:hover:bg-black/30 hover:shadow-md",
        macos:
          "bg-white dark:bg-[#2d2d2f] text-[#2c2c2e] dark:text-[#e3e3e6] border-[#d1d1d6] dark:border-[#1c1c1e] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-lg font-sans tracking-tight active:scale-100",
        notion:
          "bg-transparent text-foreground border-[#e9e9e8] dark:border-[#2e2e2e] hover:bg-[#00000006] dark:hover:bg-[#ffffff06] active:bg-[#0000000c] dark:active:bg-[#ffffff0c] rounded-lg shadow-none font-sans tracking-tight",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);

export const dropdownMenuVariants = cva(
  "rounded-xl border p-1.5 shadow-xl z-50 focus:outline-none",
  {
    variants: {
      variant: {
        modern: "bg-card border-border/70 shadow-xl",
        minimal: "bg-muted/30 border-border/40 shadow-lg backdrop-blur-sm",
        glass:
          "backdrop-blur-2xl bg-white/80 dark:bg-black/60 border-white/20 dark:border-white/10 shadow-2xl",
        macos:
          "bg-[#f5f5f7] dark:bg-[#2d2d2f] border-[#d1d1d6] dark:border-[#1c1c1e] shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-xl",
        notion:
          "bg-white dark:bg-[#191919] border-[#e9e9e8] dark:border-[#2e2e2e] shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] rounded-lg",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);

export const dropdownItemVariants = cva(
  "w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors duration-100 text-left outline-none select-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        modern:
          "text-foreground/80 hover:bg-muted focus:bg-muted hover:text-foreground",
        minimal:
          "text-foreground/70 hover:bg-muted/50 focus:bg-muted/50 hover:text-foreground",
        glass:
          "text-foreground/80 hover:bg-white/20 dark:hover:bg-white/10 focus:bg-white/20 dark:focus:bg-white/10",
        macos:
          "text-[#2c2c2e] dark:text-[#e3e3e6] hover:bg-[#e8e8ed] dark:hover:bg-[#38383a] focus:bg-[#e8e8ed] dark:focus:bg-[#38383a]",
        notion:
          "text-foreground/80 hover:bg-[#f2f1ef] dark:hover:bg-[#282828] focus:bg-[#f2f1ef] dark:focus:bg-[#282828] hover:text-foreground",
      },
      danger: {
        true: "text-destructive hover:bg-destructive/10 focus:bg-destructive/10",
        false: "",
      },
    },
    defaultVariants: {
      variant: "modern",
      danger: false,
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
  (
    {
      className,
      variant = "modern",
      label,
      items,
      onSelect,
      align = "left",
      disabled,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState<number>(-1);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    const menuId = React.useId();

    React.useEffect(() => {
      if (!isOpen) setActiveIndex(-1);
    }, [isOpen]);

    React.useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      if (isOpen) {
        document.addEventListener("mousedown", handleOutsideClick);
      }
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [isOpen]);

    React.useEffect(() => {
      if (isOpen && activeIndex >= 0) {
        itemRefs.current[activeIndex]?.focus();
      }
    }, [isOpen, activeIndex]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowDown": {
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setActiveIndex(0);
          } else {
            const next =
              activeIndex < items.length - 1 ? activeIndex + 1 : 0;
            setActiveIndex(next);
          }
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          if (isOpen) {
            const prev =
              activeIndex > 0 ? activeIndex - 1 : items.length - 1;
            setActiveIndex(prev);
          }
          break;
        }
        case "Home":
          if (isOpen) {
            e.preventDefault();
            setActiveIndex(0);
          }
          break;
        case "End":
          if (isOpen) {
            e.preventDefault();
            setActiveIndex(items.length - 1);
          }
          break;
        case "Tab":
          setIsOpen(false);
          break;
      }
    };

    return (
      <div
        ref={containerRef}
        className="relative inline-block text-left"
        onKeyDown={handleKeyDown}
      >
        <button
          ref={ref}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={isOpen ? menuId : undefined}
          disabled={disabled}
          className={cn(dropdownVariants({ variant, className }))}
          {...props}
        >
          <span>{label}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
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
              transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
              id={menuId}
              role="menu"
              aria-orientation="vertical"
              className={cn(
                "absolute mt-1.5 w-48",
                align === "right" ? "right-0" : "left-0",
                dropdownMenuVariants({ variant })
              )}
            >
              <div className="space-y-0.5">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    type="button"
                    role="menuitem"
                    aria-disabled={item.disabled}
                    tabIndex={activeIndex === index ? 0 : -1}
                    onClick={() => {
                      if (!item.disabled) {
                        onSelect(item);
                        setIsOpen(false);
                      }
                    }}
                    className={cn(
                      dropdownItemVariants({
                        variant,
                        danger: item.danger,
                      }),
                      activeIndex === index && "bg-muted text-foreground"
                    )}
                  >
                    {item.icon && (
                      <span
                        className="text-muted-foreground/70 shrink-0"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                    )}
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
