"use client";

import * as React from "react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconPhotoOff, IconLoader2 } from "@tabler/icons-react";
import { cva, type VariantProps } from "class-variance-authority";

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
    },
    defaultVariants: {
      ratio: "auto",
      roundness: "md",
    },
  },
);

export interface ImageProps
  extends
    Omit<NextImageProps, "className">,
    VariantProps<typeof imageVariants> {
  className?: string;
  fallback?: React.ReactNode;
}

export const Image = React.forwardRef<HTMLDivElement, ImageProps>(
  ({ className, ratio, roundness, src, alt, fallback, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [hasError, setHasError] = React.useState(false);

    return (
      <div ref={ref} className={imageVariants({ ratio, roundness, className })}>
        <AnimatePresence mode="popLayout">
          {isLoading && !hasError && (
            <motion.div
              key="loading-overlay"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-secondary/60 backdrop-blur-[2px]"
            >
              <IconLoader2 className="w-5 h-5 animate-spin text-muted-foreground/60" />
            </motion.div>
          )}
          {hasError ? (
            <motion.div
              key="error-fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-border/40 bg-muted/30 p-4 text-center text-muted-foreground"
            >
              {fallback ? (
                fallback
              ) : (
                <>
                  <IconPhotoOff className="w-5 h-5 text-muted-foreground/40" />
                  <span className="text-[10px] font-mono font-medium opacity-60">
                    ASSET_LOAD_FAILURE
                  </span>
                </>
              )}
            </motion.div>
          ) : (
            <NextImage
              key="active-image"
              src={src}
              alt={alt || "Image content canvas node element"}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isLoading
                  ? "scale-105 blur-sm opacity-0"
                  : "scale-100 blur-0 opacity-100"
              }`}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setHasError(true);
                setIsLoading(false);
              }}
              {...props}
            />
          )}{" "}
        </AnimatePresence>
      </div>
    );
  },
);

Image.displayName = "Image";
