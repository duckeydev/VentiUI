"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { cva, type VariantProps } from "class-variance-authority";

export const offcanvasVariants = cva(
  "fixed bg-card border-border p-6 shadow-2xl z-50 overflow-y-auto focus:outline-none h-full transition-colors duration-200",
  {
    variants: {
      position: {
        left: "top-0 left-0 border-r w-80 sm:w-96",
        right: "top-0 right-0 border-l w-80 sm:w-96",
      },
    },
    defaultVariants: {
      position: "right",
    },
  }
);

export interface OffcanvasProps extends VariantProps<typeof offcanvasVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
}

// Map animation slide states based on placement parameters
const slideVariants = {
  left: {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  },
  right: {
    hidden: { x: "100%" },
    visible: { x: 0 },
  },
};

export const Offcanvas: React.FC<OffcanvasProps> = ({
  isOpen,
  onClose,
  position = "right",
  title,
  children,
}) => {
  // Lock baseline scrolling when viewport frame opens
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key global listener key hooks
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur Portal Base Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Core Sliding Content Sheet Node */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideVariants[position || "right"]}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "offcanvas-title-node" : undefined}
            className={offcanvasVariants({ position })}
          >
            {/* Header Title Layer Utilities */}
            <div className="flex items-center justify-between gap-4 border-b border-border/40 pb-4 mb-4">
              {title && (
                <h2 id="offcanvas-title-node" className="text-base font-bold tracking-tight text-foreground">
                  {title}
                </h2>
              )}
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1 ml-auto text-muted-foreground/50 hover:text-foreground hover:bg-muted/60 transition-colors honesty outline-none cursor-pointer"
                aria-label="Dismiss Sheet Panel"
              >
                <IconX className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>

            {/* Core Body Container Frame */}
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