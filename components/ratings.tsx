"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export const ratingVariants = cva("flex items-center gap-1 select-none", {
  variants: {
    size: {
      sm: "[--star-size:1rem]",
      md: "[--star-size:1.5rem]",
      lg: "[--star-size:2.25rem]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface RatingsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof ratingVariants> {
  value?: number;
  max?: number;
  readOnly?: boolean;
  allowHalf?: boolean;
  activeColorClass?: string;
  onChange?: (value: number) => void;
}

export const Ratings = React.forwardRef<HTMLDivElement, RatingsProps>(
  (
    {
      value = 0,
      max = 5,
      readOnly = false,
      allowHalf = true,
      size,
      activeColorClass = "text-amber-400 dark:text-amber-500",
      className = "",
      onChange,
      ...props
    },
    ref
  ) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);
    const displayedValue = hoverValue !== null ? hoverValue : value;

    const handleSelect = (val: number) => {
      if (!readOnly && onChange) onChange(val);
    };

    return (
      <div
        ref={ref}
        role={readOnly ? "img" : "radiogroup"}
        aria-label={readOnly ? `Rating: ${value} out of ${max}` : "Rating"}
        aria-valuenow={displayedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-readonly={readOnly}
        onMouseLeave={() => !readOnly && setHoverValue(null)}
        className={ratingVariants({ size, className })}
        {...props}
      >
        {Array.from({ length: max }).map((_, index) => {
          const starPosition = index + 1;
          const isFullyActive = displayedValue >= starPosition;
          const isHalfActive = allowHalf && !isFullyActive && displayedValue >= starPosition - 0.5;

          return (
            <motion.div
              key={index}
              whileHover={readOnly ? undefined : { scale: 1.1 }}
              whileTap={readOnly ? undefined : { scale: 0.95 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative h-[var(--star-size)] w-[var(--star-size)]",
                readOnly ? "cursor-default" : "cursor-pointer"
              )}
              role={readOnly ? undefined : "radio"}
              aria-checked={readOnly ? undefined : value === starPosition}
              aria-label={`${starPosition} star${starPosition !== 1 ? "s" : ""}`}
              tabIndex={readOnly ? undefined : 0}
            >
              <IconStar className="absolute inset-0 h-full w-full text-muted-foreground/20 stroke-[1.5]" />

              <AnimatePresence>
                {isFullyActive && (
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className={cn("absolute inset-0 h-full w-full", activeColorClass)}
                  >
                    <IconStarFilled className="h-full w-full" />
                  </motion.div>
                )}
                {isHalfActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn("absolute inset-y-0 left-0 w-1/2 overflow-hidden", activeColorClass)}
                  >
                    <IconStarFilled className="h-[var(--star-size)] w-[var(--star-size)] max-w-none" />
                  </motion.div>
                )}
              </AnimatePresence>

              {!readOnly && (
                <div className="absolute inset-0 flex h-full w-full z-10">
                  {allowHalf ? (
                    <>
                      <div
                        className="w-1/2 h-full"
                        onMouseEnter={() => setHoverValue(starPosition - 0.5)}
                        onClick={() => handleSelect(starPosition - 0.5)}
                      />
                      <div
                        className="w-1/2 h-full"
                        onMouseEnter={() => setHoverValue(starPosition)}
                        onClick={() => handleSelect(starPosition)}
                      />
                    </>
                  ) : (
                    <div
                      className="w-full h-full"
                      onMouseEnter={() => setHoverValue(starPosition)}
                      onClick={() => handleSelect(starPosition)}
                    />
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  }
);

Ratings.displayName = "Ratings";
