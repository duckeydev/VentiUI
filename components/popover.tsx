"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const popoverVariants = cva(
  "absolute z-50 rounded-xl border p-4 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring min-w-[240px]",
  {
    variants: {
      align: {
        left: "left-0 top-full mt-2 origin-top-left",
        right: "right-0 top-full mt-2 origin-top-right",
        center: "left-1/2 -translate-x-1/2 top-full mt-2 origin-top",
      },
      variant: {
        modern: "bg-card border-border/70 shadow-xl",
        minimal: "bg-muted/30 border-border/40 shadow-lg backdrop-blur-sm",
        glass: "backdrop-blur-xl bg-white/80 dark:bg-black/60 border-white/20 dark:border-white/10 shadow-2xl",
        macos: "bg-[#f5f5f7] dark:bg-[#2d2d2f] border-[#d1d1d6] dark:border-[#1c1c1e] shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-xl",
      },
    },
    defaultVariants: {
      align: "center",
      variant: "modern",
    },
  }
);

export interface PopoverProps extends VariantProps<typeof popoverVariants> {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  align = "center",
  variant = "modern",
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const popoverId = React.useId();

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
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onKeyDown={handleKeyDown}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className="inline-flex"
        role="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? popoverId : undefined}
        tabIndex={0}
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -2 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
            id={popoverId}
            role="dialog"
            aria-label="Popover content"
            className={cn(popoverVariants({ align, variant, className }))}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Popover.displayName = "Popover";
