"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

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

    // Synchronize error and load layouts dynamically if src parameters change
    React.useEffect(() => {
      setHasError(false);
      setIsLoaded(false);
    }, [src]);

    const shouldRenderFallback = !src || hasError;

    return (
      <div
        ref={ref}
        className={avatarVariants({ size, roundness, className })}
        {...props}
      >
        {src && !hasError && (
          <img
            src={src}
            alt={alt || "Profile image"}
            onError={() => setHasError(true)}
            onLoad={() => setIsLoaded(true)}
            className={`h-full w-full object-cover transition-all duration-300 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />
        )}

        {shouldRenderFallback && (
          <div
            className="flex h-full w-full items-center justify-center font-mono uppercase bg-secondary/60 text-muted-foreground select-none animate-in fade-in zoom-in-95 duration-200"
            role="img"
            aria-label={alt || "Profile placeholder"}
          >
            {fallback}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";