"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const contextMenuVariants = cva(
  "w-48 rounded-xl border border-border/70 bg-card p-1.5 shadow-xl z-50 focus:outline-none",
  {
    variants: {
      variant: {
        modern: "bg-card border-border/70 shadow-xl",
        minimal: "bg-muted/30 border-border/40 shadow-lg backdrop-blur-sm",
        glass: "backdrop-blur-xl bg-white/80 dark:bg-black/60 border-white/20 dark:border-white/10 shadow-2xl",
        macos: "bg-[#f5f5f7] dark:bg-[#2d2d2f] border-[#d1d1d6] dark:border-[#1c1c1e] shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-xl",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);

export const contextMenuItemVariants = cva(
  "w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150 text-left outline-none select-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        modern: "text-foreground/80 hover:bg-muted focus:bg-muted hover:text-foreground",
        minimal: "text-foreground/70 hover:bg-muted/50 focus:bg-muted/50 hover:text-foreground",
        glass: "text-foreground/80 hover:bg-white/20 dark:hover:bg-white/10 focus:bg-white/20 dark:focus:bg-white/10",
        macos: "text-[#2c2c2e] dark:text-[#e3e3e6] hover:bg-[#e8e8ed] dark:hover:bg-[#38383a] focus:bg-[#e8e8ed] dark:focus:bg-[#38383a]",
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

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
}

export interface ContextMenuProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">,
    VariantProps<typeof contextMenuVariants> {
  items: ContextMenuItem[];
  onSelect: (item: ContextMenuItem) => void;
  children: React.ReactNode;
}

export const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ className, variant, items, onSelect, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [activeIndex, setActiveIndex] = React.useState<number>(-1);

    const menuRef = React.useRef<HTMLDivElement>(null);
    const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    const menuId = React.useId();

    React.useEffect(() => {
      if (!isOpen) setActiveIndex(-1);
    }, [isOpen]);

    React.useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsOpen(true);

      let posX = e.clientX;
      let posY = e.clientY;

      const menuWidth = 192;
      const menuHeight = items.length * 32 + 16;

      if (posX + menuWidth > window.innerWidth) {
        posX = window.innerWidth - menuWidth - 8;
      }
      if (posY + menuHeight > window.innerHeight) {
        posY = window.innerHeight - menuHeight - 8;
      }

      setPosition({ x: posX, y: posY });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowDown": {
          e.preventDefault();
          const next = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
          setActiveIndex(next);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const prev = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
          setActiveIndex(prev);
          break;
        }
        case "Home":
          e.preventDefault();
          setActiveIndex(0);
          break;
        case "End":
          e.preventDefault();
          setActiveIndex(items.length - 1);
          break;
        case "Tab":
          setIsOpen(false);
          break;
      }
    };

    return (
      <div
        ref={ref}
        onContextMenu={handleContextMenu}
        className={className}
        {...props}
      >
        {children}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
              style={{ top: position.y, left: position.x }}
              id={menuId}
              role="menu"
              aria-label="Context menu"
              onKeyDown={handleKeyDown}
              className={cn("fixed", contextMenuVariants({ variant }))}
            >
              <div className="space-y-0.5">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    ref={(el) => { itemRefs.current[index] = el; }}
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
                      contextMenuItemVariants({ variant, danger: item.danger }),
                      activeIndex === index && "bg-muted text-foreground"
                    )}
                  >
                    {item.icon && <span className="text-muted-foreground/70 shrink-0" aria-hidden="true">{item.icon}</span>}
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

ContextMenu.displayName = "ContextMenu";
