"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonGroupVariants = cva("inline-flex items-center isolate rounded-xl transition-all", {
  variants: {
    variant: {
      // 1. Modern: Clean, unified crisp border layout with subtle separation lines
      modern: [
        "bg-background p-0.5 border border-border/80 shadow-sm",
        "[&>button,&>a]:border-transparent [&>button,&>a]:shadow-none",
        "[&>button:hover,&>a:hover]:bg-muted/60 [&>button:hover,&>a:hover]:text-foreground",
        // Soft border dividers between buttons
        "orientation-horizontal:[&>button+button]:before:content-[''] orientation-horizontal:[&>button+button]:before:absolute orientation-horizontal:[&>button+button]:before:left-0 orientation-horizontal:[&>button+button]:before:top-2 orientation-horizontal:[&>button+button]:before:bottom-2 orientation-horizontal:[&>button+button]:before:w-px orientation-horizontal:[&>button+button]:before:bg-border/60",
      ],
      // 2. Minimal: Clean, flat, borderless background track with high contrast active tabs
      minimal: [
        "bg-muted/40 p-1",
        "[&>button,&>a]:border-transparent [&>button,&>a]:bg-transparent [&>button,&>a]:shadow-none",
        "[&>button:hover,&>a:hover]:bg-muted/80",
      ],
      // 3. Glassmorphism: Frosted background plate with translucent buttons
      glass: [
        "backdrop-blur-md bg-background/30 border border-white/10 dark:border-white/5 p-1 shadow-md",
        "[&>button,&>a]:bg-transparent [&>button,&>a]:border-transparent [&>button,&>a]:text-foreground/90 [&>button,&>a]:shadow-none",
        "[&>button:hover,&>a:hover]:bg-white/10 dark:[&>button:hover,&>a:hover]:bg-white/5 [&>button:hover,&>a:hover]:text-foreground",
      ],
      // 4. macOS: Apple Segmented Control aesthetic (Pill tabs inside an aluminum channel)
      macos: [
        "bg-[#e3e3e6] dark:bg-[#28282a] p-0.5 rounded-lg border border-[#d1d1d6] dark:border-[#1c1c1e] shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-none",
        "[&>button,&>a]:font-sans [&>button,&>a]:text-xs [&>button,&>a]:rounded-[6px] [&>button,&>a]:border-transparent [&>button,&>a]:shadow-none [&>button,&>a]:text-[#2c2c2e] dark:[&>button,&>a]:text-[#e3e3e6]",
        "[&>button:hover,&>a:hover]:bg-white/40 dark:[&>button:hover,&>a:hover]:bg-white/5",
      ],
    },
    orientation: {
      horizontal: [
        "flex-row",
        // Negative margin to stack active borders cleanly if needed
        "[&>button+button]:-ml-px [&>a+a]:-ml-px",
        "[&>*:not(:first-child)]:rounded-l-none",
        "[&>*:not(:last-child)]:rounded-r-none",
      ],
      vertical: [
        "flex-col items-stretch",
        "[&>button+button]:-mt-px [&>a+a]:-mt-px",
        "[&>*:not(:first-child)]:rounded-t-none",
        "[&>*:not(:last-child)]:rounded-b-none",
      ],
    },
  },
  defaultVariants: {
    variant: "modern",
    orientation: "horizontal",
  },
});

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  size?: "xs" | "sm" | "md" | "lg";
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", variant = "modern", size, children, ...props }, ref) => {
    const validChildren = React.Children.toArray(children).filter(React.isValidElement<any>);

    // Micro radius compensation adjustments depending on the parent wrapper design variant
    const getChildRadiusClass = () => {
      if (variant === "macos") return "[&>button,&>a]:rounded-[6px]";
      if (variant === "minimal" || variant === "glass") return "[&>button,&>a]:rounded-lg";
      return "[&>button,&>a]:rounded-xl"; // Modern
    };

    return (
      <div
        ref={ref}
        className={buttonGroupVariants({ variant, orientation, className }) + " " + getChildRadiusClass()}
        role="group"
        {...props}
      >
        {validChildren.map((child, index) => {
          // Adjust specific styles for children if the parent overrides layout behavior
          const isFirst = index === 0;
          const isLast = index === validChildren.length - 1;

          return React.cloneElement(child, {
            size: child.props.size || size,
            // Pass standard layout parameters downward
            className: `
              ${child.props.className || ""} 
              relative focus:z-10 transition-all duration-150
              ${!isFirst && orientation === "horizontal" ? "!rounded-l-none" : ""}
              ${!isLast && orientation === "horizontal" ? "!rounded-r-none" : ""}
              ${!isFirst && orientation === "vertical" ? "!rounded-t-none" : ""}
              ${!isLast && orientation === "vertical" ? "!rounded-b-none" : ""}
            `.trim(),
          });
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";