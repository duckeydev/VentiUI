"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const modalVariants = cva(
  "relative w-full rounded-2xl border p-6 shadow-2xl z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring overflow-y-auto max-h-[85vh]",
  {
    variants: {
      variant: {
        modern: "bg-card border-border/70",
        minimal: "bg-muted/20 border-border/40 backdrop-blur-md",
        glass:
          "backdrop-blur-2xl bg-white/80 dark:bg-black/60 border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
        macos:
          "bg-[#f5f5f7] dark:bg-[#2d2d2f] border-[#d1d1d6] dark:border-[#1c1c1e] shadow-[0_16px_64px_rgba(0,0,0,0.16)] rounded-2xl",
        notion:
          "bg-white dark:bg-[#191919] border-[#e9e9e8] dark:border-[#2e2e2e] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] rounded-xl",
      },
      maxWidth: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
      },
    },
    defaultVariants: {
      variant: "modern",
      maxWidth: "md",
    },
  }
);

export interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  showClose?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  variant = "modern",
  maxWidth = "md",
  showClose = true,
}) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const previousActiveElement = React.useRef<HTMLElement | null>(null);
  const titleId = React.useId();

  React.useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        contentRef.current?.focus();
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
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(", ");

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = Array.from(
        container.querySelectorAll(focusableSelectors)
      ) as HTMLElement[];
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
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-x-hidden overflow-y-auto">
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
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.9,
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            tabIndex={-1}
            className={cn(
              modalVariants({ variant, maxWidth }),
              "mt-8 sm:mt-0"
            )}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              {title && (
                <h2
                  id={titleId}
                  className="text-base font-bold tracking-tight text-foreground"
                >
                  {title}
                </h2>
              )}
              {showClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    "rounded-lg p-1.5 ml-auto transition-colors duration-150 outline-none cursor-pointer",
                    "text-muted-foreground/50 hover:text-foreground hover:bg-muted/60",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  )}
                  aria-label="Close dialog"
                >
                  <IconX className="w-4 h-4" strokeWidth={2.5} />
                </button>
              )}
            </div>

            <div className="text-sm text-muted-foreground leading-relaxed">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

Modal.displayName = "Modal";
