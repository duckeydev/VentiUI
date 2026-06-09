"use client";

import * as React from "react";
import { motion, MotionProps } from "framer-motion";

// Strip out Framer Motion's conflicting event handlers
type CleanHTMLAttributes = Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps>;

// Explicitly extend React.PropsWithChildren to restore the 'children' property
export interface DeviceMockupProps extends React.PropsWithChildren<CleanHTMLAttributes> {
  /** The chassis form-factor geometry rendered around inner content viewports. */
  type?: "phone" | "tablet";
  /** Enables structural spring introductory orientation scaling animations. */
  animate?: boolean;
  /** Optional custom transition overrides for the introduction animation */
  transition?: MotionProps["transition"];
}

export const DeviceMockup = React.forwardRef<HTMLDivElement, DeviceMockupProps>(
  ({ type = "phone", children, className = "", animate = true, transition, ...props }, ref) => {
    const isPhone = type === "phone";

    return (
      <motion.div
        ref={ref}
        initial={animate ? { opacity: 0, y: 30, scale: 0.96, rotateX: 8 } : false}
        animate={animate ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : false}
        transition={transition || { type: "spring", stiffness: 140, damping: 22, mass: 1.1 }}
        style={{ transformStyle: "preserve-3d", perspective: 1200 }}
        className={`relative mx-auto border-neutral-900 dark:border-neutral-800 border-[12px] bg-neutral-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] select-none shrink-0 ${
          isPhone 
            ? "w-[290px] h-[580px] rounded-[2.75rem] after:absolute after:bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-28 after:h-1 after:bg-neutral-800/40 dark:after:bg-neutral-700/40 after:rounded-full" 
            : "w-[580px] h-[390px] rounded-[2.25rem]"
        } ${className}`}
        {...props}
      >
        {/* Dynamic Bezel Hardware Accents: Dynamic Island / Camera Array Matrix */}
        <div 
          className={`absolute left-1/2 -translate-x-1/2 bg-neutral-900 dark:bg-neutral-800 z-30 transition-colors ${
            isPhone 
              ? "top-3 w-28 h-5 rounded-full ring-1 ring-white/[0.03] dark:ring-white/[0.05] flex items-center justify-end pr-3 gap-1" 
              : "top-2 w-3 h-3 rounded-full"
          }`}
        >
          {isPhone && (
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-950 border border-white/5 opacity-40" />
          )}
        </div>

        {/* Tactile Hardware Click Buttons: Volume Rockers & Power Switches */}
        {isPhone && (
          <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
            {/* Ring/Silent Switch */}
            <div className="absolute top-20 -left-[15px] w-[3px] h-6 bg-neutral-900 dark:bg-neutral-800 rounded-l-md border-r border-black/20" />
            {/* Volume Up */}
            <div className="absolute top-32 -left-[15px] w-[3px] h-11 bg-neutral-900 dark:bg-neutral-800 rounded-l-md border-r border-black/20" />
            {/* Volume Down */}
            <div className="absolute top-[180px] -left-[15px] w-[3px] h-11 bg-neutral-900 dark:bg-neutral-800 rounded-l-md border-r border-black/20" />
            {/* Power Trigger */}
            <div className="absolute top-[144px] -right-[15px] w-[3px] h-16 bg-neutral-900 dark:bg-neutral-800 rounded-r-md border-l border-black/20" />
          </div>
        )}

        {/* Viewport Screen Clipping Mask */}
        <div 
          className={`relative w-full h-full overflow-hidden bg-background border border-neutral-950/60 transition-colors ${
            isPhone ? "rounded-[2.1rem]" : "rounded-[1.6rem]"
          }`}
        >
          {/* Internal Reflection Flare Mask */}
          <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-transparent via-white/[0.015] to-white/[0.04] dark:to-white/[0.02]" />
          <div className="w-full h-full relative z-10 select-text">
            {children}
          </div>
        </div>
      </motion.div>
    );
  }
);

DeviceMockup.displayName = "DeviceMockup";

export default DeviceMockup;