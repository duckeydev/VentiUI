"use client";

import React from "react";
// Imported the 'Variants' type from framer-motion
import { motion, AnimatePresence, Variants } from "framer-motion";

export interface CollapseProps {
  /** The controlled open/closed state of the collapse */
  isOpen: boolean;
  /** Content to be collapsed */
  children: React.ReactNode;
  /** Optional class name for the wrapper */
  className?: string;
  /** Whether to animate opacity alongside height. Default is true. */
  animateOpacity?: boolean;
  /** Whether to completely unmount the children when closed. Default is true. */
  unmountOnExit?: boolean;
}

export function Collapse({
  isOpen,
  children,
  className = "",
  animateOpacity = true,
  unmountOnExit = true,
}: CollapseProps) {
  
  // Explicitly typing this as 'Variants' resolves the height.ease typing error
  const motionVariants: Variants = {
    collapsed: {
      height: 0,
      opacity: animateOpacity ? 0 : 1,
      transition: {
        height: { duration: 0.2, ease: [0.25, 1, 0.5, 1] },
        opacity: { duration: 0.15 },
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
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
        className={
          // Disable pointer events when closed but not unmounted
          !unmountOnExit && !isOpen ? "pointer-events-none" : ""
        }
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