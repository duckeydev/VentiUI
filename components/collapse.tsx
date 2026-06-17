"use client";

import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export interface CollapseProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  animateOpacity?: boolean;
  unmountOnExit?: boolean;
}

export function Collapse({
  isOpen,
  children,
  className = "",
  animateOpacity = true,
  unmountOnExit = true,
}: CollapseProps) {
  const motionVariants: Variants = {
    collapsed: {
      height: 0,
      opacity: animateOpacity ? 0 : 1,
      transition: {
        height: { duration: 0.2, ease: EASE_OUT_EXPO },
        opacity: { duration: 0.15 },
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: EASE_OUT_EXPO },
        opacity: { duration: 0.25, delay: 0.05 },
      },
    },
  };

  const renderContent = () => (
    <motion.div
      initial="collapsed"
      animate={isOpen ? "open" : "collapsed"}
      exit="collapsed"
      variants={motionVariants}
      className={`overflow-hidden ${className}`}
      aria-hidden={!isOpen}
    >
      <div
        className={!unmountOnExit && !isOpen ? "pointer-events-none" : ""}
      >
        {children}
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence initial={false}>
      {unmountOnExit ? (isOpen && renderContent()) : renderContent()}
    </AnimatePresence>
  );
}

Collapse.displayName = "Collapse";
