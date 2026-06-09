"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const kbdVariants = cva(
  "inline-flex items-center justify-center font-mono text-[10px] font-bold select-none shrink-0 rounded border bg-muted/40 text-muted-foreground/90 shadow-[0_1px_0_0_rgba(0,0,0,0.1)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]",
  {
    variants: {
      size: {
        sm: "h-4 min-w-[16px] px-1 text-[9px]",
        default: "h-5 min-w-[20px] px-1.5 text-[10px]",
        lg: "h-6 min-w-[24px] px-2 text-[11px]",
      },
      variant: {
        default: "bg-muted/40 border-border/80 text-muted-foreground",
        raised: "bg-secondary border-b-2 border-border/100 text-foreground",
        outline: "bg-transparent border-border/60 text-muted-foreground/80 shadow-none",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {
  /** Optional modifier key abbreviation mapping. Automatically converts 'cmd' to '⌘', 'shift' to '⇧', etc. */
  modifier?: "cmd" | "shift" | "alt" | "ctrl" | "enter" | "caps";
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, variant, modifier, children, ...props }, ref) => {
    
    // Cross-platform key symbol transformer dictionary
    const modifierSymbols: Record<string, string> = {
      cmd: "⌘",
      shift: "⇧",
      alt: "⌥",
      ctrl: "⌃",
      enter: "↵",
      caps: "⇪",
    };

    const displaySymbol = modifier ? modifierSymbols[modifier] : null;

    return (
      <kbd
        ref={ref}
        className={kbdVariants({ size, variant, className })}
        {...props}
      >
        {displaySymbol && (
          <span className={`font-sans tracking-wide ${children ? "mr-1" : ""}`}>
            {displaySymbol}
          </span>
        )}
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = "Kbd";