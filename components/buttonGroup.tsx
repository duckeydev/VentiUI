"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const buttonGroupVariants = cva("inline-flex items-center isolate rounded-xl transition-all", {
  variants: {
    variant: {
      modern: [
        "bg-background p-0.5 border border-border/80 shadow-sm",
        "[&>button,&>a]:border-transparent [&>button,&>a]:shadow-none",
        "[&>button:hover,&>a:hover]:bg-muted/60 [&>button:hover,&>a:hover]:text-foreground",
        "orientation-horizontal:[&>button+button]:before:content-[''] orientation-horizontal:[&>button+button]:before:absolute orientation-horizontal:[&>button+button]:before:left-0 orientation-horizontal:[&>button+button]:before:top-2 orientation-horizontal:[&>button+button]:before:bottom-2 orientation-horizontal:[&>button+button]:before:w-px orientation-horizontal:[&>button+button]:before:bg-border/60",
      ],
      minimal: [
        "bg-muted/40 p-1",
        "[&>button,&>a]:border-transparent [&>button,&>a]:bg-transparent [&>button,&>a]:shadow-none",
        "[&>button:hover,&>a:hover]:bg-muted/80",
      ],
      glass: [
        "backdrop-blur-md bg-background/30 border border-white/10 dark:border-white/5 p-1 shadow-md",
        "[&>button,&>a]:bg-transparent [&>button,&>a]:border-transparent [&>button,&>a]:text-foreground/90 [&>button,&>a]:shadow-none",
        "[&>button:hover,&>a:hover]:bg-white/10 dark:[&>button:hover,&>a:hover]:bg-white/5 [&>button:hover,&>a:hover]:text-foreground",
      ],
      macos: [
        "bg-[#e3e3e6] dark:bg-[#28282a] p-0.5 rounded-lg border border-[#d1d1d6] dark:border-[#1c1c1e] shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-none",
        "[&>button,&>a]:font-sans [&>button,&>a]:text-xs [&>button,&>a]:rounded-[6px] [&>button,&>a]:border-transparent [&>button,&>a]:shadow-none [&>button,&>a]:text-[#2c2c2e] dark:[&>button,&>a]:text-[#e3e3e6]",
        "[&>button:hover,&>a:hover]:bg-white/40 dark:[&>button:hover,&>a:hover]:bg-white/5",
      ],
    },
    orientation: {
      horizontal: [
        "flex-row",
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

    const getChildRadiusClass = () => {
      if (variant === "macos") return "[&>button,&>a]:rounded-[6px]";
      if (variant === "minimal" || variant === "glass") return "[&>button,&>a]:rounded-lg";
      return "[&>button,&>a]:rounded-xl";
    };

    return (
      <motion.div
        ref={ref}
        role="group"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.05 },
          },
        }}
        className={cn(buttonGroupVariants({ variant, orientation }), getChildRadiusClass(), className)}
      >
        {validChildren.map((child, index) => {
          const isFirst = index === 0;
          const isLast = index === validChildren.length - 1;

          return (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT_EXPO } },
              }}
            >
              {React.cloneElement(child, {
                size: child.props.size || size,
                className: cn(
                  child.props.className,
                  "relative focus:z-10 transition-all duration-150",
                  !isFirst && orientation === "horizontal" && "!rounded-l-none",
                  !isLast && orientation === "horizontal" && "!rounded-r-none",
                  !isFirst && orientation === "vertical" && "!rounded-t-none",
                  !isLast && orientation === "vertical" && "!rounded-b-none"
                ),
              })}
            </motion.div>
          );
        })}
      </motion.div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";
