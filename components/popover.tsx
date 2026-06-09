"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

export const popoverVariants = cva(
  "absolute z-50 rounded-xl border border-border/70 bg-card p-4 shadow-xl focus:outline-none min-w-[240px]",
  {
    variants: {
      align: {
        left: "left-0 top-full mt-2 origin-top-left",
        right: "right-0 top-full mt-2 origin-top-right",
        center: "left-1/2 -translate-x-1/2 top-full mt-2 origin-top",
      },
    },
    defaultVariants: {
      align: "center",
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
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // External click tracker handler loop
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
      e.preventDefault();
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative inline-block" 
      onKeyDown={handleKeyDown}
    >
      {/* Trigger Anchor Target */}
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="inline-flex"
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      {/* Floating Content Framework */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -2 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={popoverVariants({ align, className })}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Popover.displayName = "Popover";