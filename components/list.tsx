"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const listVariants = cva(
  "my-3 text-foreground transition-all duration-150 text-sm leading-relaxed",
  {
    variants: {
      marker: {
        disc: "list-disc pl-5 [&_list-disc]:list-[circle] [&_list-[circle]]:list-[square]",
        decimal: "list-decimal pl-5",
        none: "list-none pl-0",
      },
      spacing: {
        condensed: "space-y-1",
        normal: "space-y-2",
        loose: "space-y-3.5",
      },
    },
    defaultVariants: {
      marker: "disc",
      spacing: "normal",
    },
  }
);

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement>,
    VariantProps<typeof listVariants> {
  as?: "ul" | "ol";
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ as: Component = "ul", marker, spacing, className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={listVariants({ marker, spacing, className })}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
List.displayName = "List";

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.li
        ref={ref}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT_EXPO as any }}
        className={cn(
          "text-muted-foreground/90 transition-colors duration-150 hover:text-foreground [&_ul]:my-1.5 [&_ol]:my-1.5",
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.li>
    );
  }
);
ListItem.displayName = "ListItem";
