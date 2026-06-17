"use client";

import * as React from "react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconPhotoOff, IconLoader2 } from "@tabler/icons-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const imageVariants = cva(
  "relative overflow-hidden bg-muted/40 transition-all duration-300",
  {
    variants: {
      ratio: {
        auto: "aspect-auto",
        square: "aspect-square",
        video: "aspect-video",
        portrait: "aspect-[3/4]",
        landscape: "aspect-[4/3]",
      },
      roundness: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-full",
      },
      variant: {
        modern: "",
        minimal: "",
        glass: "backdrop-blur-md bg-white/5 dark:bg-black/10 border border-white/10 dark:border-white/5",
        macos: "bg-card/50 backdrop-blur-sm border border-border/30 shadow-sm",
      },
    },
    defaultVariants: {
      ratio: "auto",
      roundness: "md",
      variant: "modern",
    },
  }
);

export interface ImageProps
  extends Omit<NextImageProps, "className">,
    VariantProps<typeof imageVariants> {
  className?: string;
  fallback?: React.ReactNode;
}

export const Image = React.forwardRef<HTMLDivElement, ImageProps>(
  ({ className, ratio, roundness, variant, src, alt, fallback, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [hasError, setHasError] = React.useState(false);

    return (
      <div
        ref={ref}
        role="img"
        aria-label={alt || "Image content"}
        className={cn(imageVariants({ ratio, roundness, variant, className }))}
      >
        <AnimatePresence mode="popLayout">
          {isLoading && !hasError && (
            <motion.div
              key="loading-overlay"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-secondary/60 backdrop-blur-[2px]"
            >
              <IconLoader2 className="w-5 h-5 animate-spin text-muted-foreground/60" aria-hidden="true" />
            </motion.div>
          )}
          {hasError ? (
            <motion.div
              key="error-fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-border/40 bg-muted/30 p-4 text-center text-muted-foreground"
              role="alert"
            >
              {fallback || (
                <>
                  <IconPhotoOff className="w-5 h-5 text-muted-foreground/40" aria-hidden="true" />
                  <span className="text-[10px] font-mono font-medium opacity-60">
                    ASSET_LOAD_FAILURE
                  </span>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="active-image"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              className="absolute inset-0"
            >
              <NextImage
                src={src}
                alt={alt || "Image content"}
                className={cn(
                  "w-full h-full object-cover transition-all duration-500",
                  isLoading ? "blur-sm" : "blur-0"
                )}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setHasError(true);
                  setIsLoading(false);
                }}
                sizes="100%"
                {...props}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Image.displayName = "Image";
