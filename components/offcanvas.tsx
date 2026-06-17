"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const offcanvasVariants = cva(
  "fixed bg-card p-6 shadow-2xl z-50 overflow-y-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-ring h-full",
  {
    variants: {
      position: {
        left: "top-0 left-0 border-r w-80 sm:w-96",
        right: "top-0 right-0 border-l w-80 sm:w-96",
      },
      variant: {
        modern: "bg-card border-border",
        minimal: "bg-muted/20 border-border/40 backdrop-blur-md",
        glass: "backdrop-blur-xl bg-white/80 dark:bg-black/60 border-white/20 dark:border-white/10",
        macos: "bg-[#f5f5f7] dark:bg-[#2d2d2f] border-[#d1d1d6] dark:border-[#1c1c1e] shadow-[0_16px_64px_rgba(0,0,0,0.16)]",
      },
    },
    defaultVariants: {
      position: "right",
      variant: "modern",
    },
  }
);

const slideVariants = {
  left: {
    hidden: { x: "-100%", opacity: 0.8 },
    visible: { x: 0, opacity: 1 },
  },
  right: {
    hidden: { x: "100%", opacity: 0.8 },
    visible: { x: 0, opacity: 1 },
  },
};

export interface OffcanvasProps extends VariantProps<typeof offcanvasVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
}

export const Offcanvas: React.FC<OffcanvasProps> = ({
  isOpen,
  onClose,
  position = "right",
  variant = "modern",
  title,
  children,
}) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const previousActiveElement = React.useRef<HTMLElement | null>(null);
  const titleId = React.useId();

  React.useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        const focusable = contentRef.current?.querySelector<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      });
    } else {
      document.body.style.overflow = "";
      previousActiveElement.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !isOpen) return;
      e.preventDefault();
      onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  React.useEffect(() => {
    if (!isOpen) return;
    const container = contentRef.current;
    if (!container) return;

    const focusableSelectors = [
      'a[href]', 'button:not([disabled])', 'input:not([disabled])',
      'select:not([disabled])', 'textarea:not([disabled])', '[tabindex]:not([tabindex="-1"])',
    ].join(", ");

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener("keydown", handleFocusTrap);
    return () => container.removeEventListener("keydown", handleFocusTrap);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          <motion.div
            ref={contentRef}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideVariants[position || "right"]}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            tabIndex={-1}
            className={cn(offcanvasVariants({ position, variant }))}
          >
            <div className="flex items-center justify-between gap-4 border-b border-border/40 pb-4 mb-4">
              {title && (
                <h2 id={titleId} className="text-base font-bold tracking-tight text-foreground">
                  {title}
                </h2>
              )}
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "rounded-lg p-1.5 ml-auto transition-colors duration-150 outline-none cursor-pointer",
                  "text-muted-foreground/50 hover:text-foreground hover:bg-muted/60",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
                aria-label="Close panel"
              >
                <IconX className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>

            <div className="text-sm text-muted-foreground leading-relaxed h-[calc(100%-3rem)]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

Offcanvas.displayName = "Offcanvas";
