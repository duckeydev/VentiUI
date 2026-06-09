"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

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
  /** The current rating quantitative numeric value. */
  value?: number;
  /** Maximum rating value scale ceiling (i.e., Total count of star nodes to map). */
  max?: number;
  /** Strips out interaction triggers, locking input parameters into display-only mode. */
  readOnly?: boolean;
  /** Toggles high-precision split-node monitoring for half-increment selection. */
  allowHalf?: boolean;
  /** Injects a bespoke color string definition targeting filled active rating states. */
  activeColorClass?: string;
  /** Action intercept callback fired when a scalar segment is committed. */
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
        role={readOnly ? undefined : "slider"}
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
            <div
              key={index}
              className={`relative h-[var(--star-size)] w-[var(--star-size)] transition-transform ${
                readOnly ? "cursor-default" : "cursor-pointer active:scale-95 hover:scale-110"
              }`}
            >
              {/* Underlying Base Structure (Empty State) */}
              <IconStar className="absolute inset-0 h-full w-full text-muted-foreground/20 stroke-[1.5]" />

              {/* Mask Filling Layers */}
              <AnimatePresence>
                {isFullyActive && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className={`absolute inset-0 h-full w-full ${activeColorClass}`}
                  >
                    <IconStarFilled className="h-full w-full" />
                  </motion.div>
                )}
                {isHalfActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`absolute inset-y-0 left-0 w-1/2 overflow-hidden ${activeColorClass}`}
                  >
                    <IconStarFilled className="h-[var(--star-size)] w-[var(--star-size)] max-w-none" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interactive Hit Target Masks (Stripped when Read Only) */}
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
            </div>
          );
        })}
      </div>
    );
  }
);

Ratings.displayName = "Ratings";