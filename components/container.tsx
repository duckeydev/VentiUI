"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const containerVariants = cva(
  "w-full mx-auto transition-all duration-300",
  {
    variants: {
      size: {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
      },
      gutter: {
        true: "px-4 sm:px-6 lg:px-8",
        false: "",
      },
      variant: {
        modern: "",
        minimal: "",
        glass: "backdrop-blur-md bg-white/5 dark:bg-black/10",
        macos: "bg-card/50 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      size: "lg",
      gutter: true,
      variant: "modern",
    },
  }
);

export type ContainerSize = VariantProps<typeof containerVariants>["size"];

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  children: React.ReactNode;
  size?: ContainerSize;
  fluid?: boolean;
  clean?: boolean;
  animate?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      size = "lg",
      fluid = false,
      clean = false,
      className,
      animate = true,
      variant = "modern",
      ...props
    },
    ref
  ) => {
    const resolvedSize = fluid ? undefined : size;

    const resolvedClassName = cn(
      containerVariants({ size: resolvedSize, gutter: !clean, variant }),
      fluid && "max-w-full",
      className
    );

    if (animate) {
      return (
        <motion.section
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className={resolvedClassName}
          {...(props as Record<string, unknown>)}
        >
          {children}
        </motion.section>
      );
    }

    return (
      <section
        ref={ref}
        className={resolvedClassName}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Container.displayName = "Container";
