"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 8, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE_OUT_EXPO },
  },
};

const avatarGroupVariants = cva("flex items-center isolate w-fit", {
  variants: {
    orientation: {
      horizontal: "flex-row -space-x-3.5",
      vertical: "flex-col -space-y-3.5",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarGroupVariants> {
  size?: "sm" | "md" | "lg" | "xl";
  roundness?: "none" | "sm" | "md" | "lg" | "full";
  max?: number;
}

const counterSizeClasses: Record<string, string> = {
  sm: "h-8 w-8 text-[10px] font-bold",
  md: "h-10 w-10 text-xs font-bold",
  lg: "h-12 w-12 text-sm font-bold",
  xl: "h-14 w-14 text-base font-black",
};

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      className,
      orientation = "horizontal",
      size = "md",
      roundness = "full",
      max = 4,
      children,
      ...props
    },
    ref
  ) => {
    const validChildren = React.Children.toArray(children).filter(
      (child) => React.isValidElement(child)
    );

    const totalCount = validChildren.length;
    const visibleAvatars = validChildren.slice(0, max);
    const remainingCount = totalCount - max;

    const hoverDirection =
      orientation === "horizontal" ? { y: -4, scale: 1.04 } : { x: 4, scale: 1.04 };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className={cn(avatarGroupVariants({ orientation, className }))}
        {...(props as Record<string, unknown>)}
      >
        {visibleAvatars.map((child, idx) => (
          <motion.div
            key={idx}
            variants={staggerItem}
            whileHover={hoverDirection}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ zIndex: totalCount - idx }}
          >
            {React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
              size,
              roundness,
              className: cn(
                (child.props as Record<string, unknown>).className as string,
                "ring-2 ring-background shadow-sm cursor-pointer select-none"
              ),
            })}
          </motion.div>
        ))}

        {remainingCount > 0 && (
          <motion.div
            variants={staggerItem}
            whileHover={hoverDirection}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ zIndex: 0 }}
          >
            <div
              className={cn(
                "relative flex shrink-0 overflow-hidden items-center justify-center ring-2 ring-background bg-muted text-muted-foreground border border-border/40 font-bold tracking-tight shadow-sm cursor-default font-mono",
                counterSizeClasses[size || "md"],
                roundness === "full" && "rounded-full",
                roundness === "lg" && "rounded-2xl",
                roundness === "md" && "rounded-xl",
                roundness === "sm" && "rounded-lg",
                !roundness && "rounded-full"
              )}
              role="img"
              aria-label={`${remainingCount} more team members`}
            >
              +{remainingCount}
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";
