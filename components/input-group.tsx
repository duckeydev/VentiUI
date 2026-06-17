'use client';

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  children: React.ReactElement;
}

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, leftAddon, rightAddon, leftElement, rightElement, children, ...props }, ref) => {
    const input = React.Children.only(children) as React.ReactElement<{ className?: string }>;
    const clonedInput = React.cloneElement(input, {
      className: cn(
        input.props.className,
        leftAddon && "rounded-l-none border-l-0",
        rightAddon && "rounded-r-none border-r-0",
        leftElement && "pl-9",
        rightElement && "pr-9"
      ),
    });

    return (
      <div ref={ref} className={cn("flex w-full", className)} {...props}>
        {leftAddon && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="inline-flex items-center rounded-l-lg border border-r-0 border-border bg-muted px-3 text-xs font-medium text-muted-foreground"
          >
            {leftAddon}
          </motion.span>
        )}
        <div className="relative flex-1">
          {leftElement && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {leftElement}
            </span>
          )}
          {clonedInput}
          {rightElement && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {rightElement}
            </span>
          )}
        </div>
        {rightAddon && (
          <motion.span
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="inline-flex items-center rounded-r-lg border border-l-0 border-border bg-muted px-3 text-xs font-medium text-muted-foreground"
          >
            {rightAddon}
          </motion.span>
        )}
      </div>
    );
  }
);
InputGroup.displayName = "InputGroup";
