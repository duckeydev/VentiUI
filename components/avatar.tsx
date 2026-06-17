"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden bg-muted/40 select-none items-center justify-center border border-border/40 transition-all duration-200 after:absolute after:pointer-events-none after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-black/[0.06] dark:after:ring-white/[0.06]",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-[11px] font-bold",
        md: "h-10 w-10 text-xs font-bold",
        lg: "h-12 w-12 text-sm font-bold",
        xl: "h-14 w-14 text-base font-black tracking-tight",
      },
      roundness: {
        none: "rounded-none",
        sm: "rounded-lg",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      roundness: "full",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, roundness, src, alt, fallback, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
      setHasError(false);
      setIsLoaded(false);
    }, [src]);

    const shouldRenderFallback = !src || hasError;

    return (
      <div
        ref={ref}
        role="img"
        aria-label={alt || "Profile image"}
        className={cn(avatarVariants({ size, roundness, className }))}
        {...props}
      >
        <AnimatePresence mode="wait">
          {src && !hasError && (
            <motion.img
              key="avatar-image"
              src={src}
              alt={alt || "Profile image"}
              onError={() => setHasError(true)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              onLoad={() => setIsLoaded(true)}
              className="h-full w-full object-cover"
            />
          )}

          {shouldRenderFallback && (
            <motion.div
              key="avatar-fallback"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex h-full w-full items-center justify-center font-mono uppercase bg-secondary/60 text-muted-foreground select-none"
            >
              {fallback}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
