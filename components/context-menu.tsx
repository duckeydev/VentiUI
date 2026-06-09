"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
}

export interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ContextMenuItem[];
  onSelect: (item: ContextMenuItem) => void;
  children: React.ReactNode;
}

export const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ className, items, onSelect, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [activeIndex, setActiveIndex] = React.useState<number>(-1);

    const menuRef = React.useRef<HTMLDivElement>(null);
    const itemRefs = React.useRef<HTMLButtonElement[]>([]);

    // Reset loop markers when overlay goes dark
    React.useEffect(() => {
      if (!isOpen) setActiveIndex(-1);
    }, [isOpen]);

    // Outer click dismissal monitor loop
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

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsOpen(true);

      // Boundary safety configuration layout engine checking client dimensions against overflow limits
      let posX = e.clientX;
      let posY = e.clientY;

      const menuWidth = 192; // Approximate width parameters (w-48 = 12rem = 192px)
      const menuHeight = items.length * 32 + 16; // Estimated stack height metrics

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

      if (e.key === "Escape") {
        setIsOpen(false);
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        const nextIdx = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
        setActiveIndex(nextIdx);
        itemRefs.current[nextIdx]?.focus();
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        const prevIdx = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
        setActiveIndex(prevIdx);
        itemRefs.current[prevIdx]?.focus();
        e.preventDefault();
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
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              style={{ top: position.y, left: position.x }}
              className="fixed w-48 rounded-xl border border-border/70 bg-card p-1.5 shadow-xl z-50 focus:outline-none"
              role="menu"
              aria-label="Context contextual configuration matrix"
              onKeyDown={handleKeyDown}
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

ContextMenu.displayName = "ContextMenu";