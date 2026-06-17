"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

type AnimationPreset = "slide" | "fade" | "grow" | "none";
type AccordionVariant = "default" | "carded";

interface AccordionProps {
  children: React.ReactNode;
  allowMultiple?: boolean;
  openItems?: string[];
  onOpenChange?: (openItems: string[]) => void;
  animation?: AnimationPreset;
  variant?: AccordionVariant;
  className?: string;
}

interface AccordionItemProps {
  id?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

interface AccordionContextType {
  activeIds: string[];
  toggleItem: (id: string) => void;
  animation: AnimationPreset;
  variant: AccordionVariant;
  itemIds: string[];
  registerItem: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("Accordion components must be wrapped in <Accordion />");
  return context;
};

export const Accordion: React.FC<AccordionProps> = ({
  children,
  allowMultiple = false,
  openItems,
  onOpenChange,
  animation = "slide",
  variant = "default",
  className = "",
}) => {
  const [internalActiveIds, setInternalActiveIds] = useState<string[]>([]);
  const [itemIds, setItemIds] = useState<string[]>([]);

  const activeIds = openItems !== undefined ? openItems : internalActiveIds;

  const toggleItem = useCallback((id: string) => {
    let nextActiveIds: string[];
    if (allowMultiple) {
      nextActiveIds = activeIds.includes(id)
        ? activeIds.filter((item) => item !== id)
        : [...activeIds, id];
    } else {
      nextActiveIds = activeIds.includes(id) ? [] : [id];
    }
    if (onOpenChange) {
      onOpenChange(nextActiveIds);
    } else {
      setInternalActiveIds(nextActiveIds);
    }
  }, [activeIds, allowMultiple, onOpenChange]);

  const registerItem = useCallback((id: string) => {
    setItemIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const containerClasses =
    variant === "carded"
      ? "space-y-3"
      : "divide-y divide-border border-b border-t border-border";

  return (
    <AccordionContext.Provider value={{ activeIds, toggleItem, animation, variant, itemIds, registerItem }}>
      <div className={cn(containerClasses, className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  children,
  defaultOpen = false,
  className = "",
}) => {
  const fallbackId = React.useId();
  const itemId = id || fallbackId;

  const { activeIds, toggleItem, animation, variant, registerItem } = useAccordion();
  const isOpen = activeIds.includes(itemId);

  useEffect(() => {
    registerItem(itemId);
  }, [itemId, registerItem]);

  useEffect(() => {
    if (defaultOpen && !activeIds.includes(itemId)) {
      toggleItem(itemId);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleItem(itemId);
    }
  };

  const motionVariants: Variants = {
    collapsed: {
      height: 0,
      opacity: animation === "fade" || animation === "grow" ? 0 : 1,
      scale: animation === "grow" ? 0.96 : 1,
      transition: {
        height: { duration: 0.2, ease: EASE_OUT_EXPO },
        opacity: { duration: 0.15 },
        scale: { duration: 0.15 },
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      scale: 1,
      transition: {
        height: { duration: 0.3, ease: EASE_OUT_EXPO },
        opacity: { duration: 0.25, delay: 0.05 },
        scale: { duration: 0.25 },
      },
    },
  };

  const itemStyles =
    variant === "carded"
      ? cn(
          "rounded-xl border transition-all duration-300 px-4",
          isOpen
            ? "border-primary/30 bg-card shadow-md shadow-primary/5 ring-1 ring-primary/10"
            : "border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-border"
        )
      : "overflow-hidden border-border";

  return (
    <div className={cn(itemStyles, className)}>
      <button
        type="button"
        onClick={() => toggleItem(itemId)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-4 text-left font-medium text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
      >
        <span className="text-sm font-semibold tracking-tight text-foreground">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="text-muted-foreground shrink-0"
        >
          <IconChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="accordion-content"
            initial={animation === "none" ? false : "collapsed"}
            animate="open"
            exit="collapsed"
            variants={animation === "none" ? {} : motionVariants}
            className="overflow-hidden"
            role="region"
          >
            <div className={cn("text-sm leading-relaxed text-muted-foreground", variant === "carded" ? "pb-4 pt-1" : "pb-4 pt-0")}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

AccordionItem.displayName = "AccordionItem";
Accordion.displayName = "Accordion";

export default Accordion;
