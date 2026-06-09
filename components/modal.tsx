"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

const maxWidthMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md",
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
          {/* Backdrop Blur Portal Base Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Center Shell Content Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title-node" : undefined}
            className={`relative w-full ${maxWidthMap[maxWidth]} rounded-xl border border-border/70 bg-card p-6 shadow-2xl z-10 focus:outline-none`}
          >
            {/* Structural Content Header Layer */}
            <div className="flex items-start justify-between gap-4 mb-4">
              {title && (
                <h2 id="modal-title-node" className="text-base font-bold tracking-tight text-foreground">
                  {title}
                </h2>
              )}
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1 ml-auto text-muted-foreground/50 hover:text-foreground hover:bg-muted/60 transition-colors outline-none cursor-pointer"
                aria-label="Dismiss Modal"
              >
                <IconX className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>

            {/* Core Display Body Children Track View */}
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