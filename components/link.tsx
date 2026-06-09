"use client";

import * as React from "react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowUpRight, IconLink } from "@tabler/icons-react";

export const linkVariants = cva(
  "inline-flex items-center gap-1 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm relative group",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary",
        muted: "text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-muted-foreground/20 hover:decoration-foreground",
        inline: "text-foreground font-semibold border-b border-border hover:border-primary transition-colors pb-[1px]",
        standalone: "text-foreground hover:text-primary no-underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    NextLinkProps,
    VariantProps<typeof linkVariants> {
  showIcon?: boolean;
  richPreview?: boolean;
  info?: string;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, showIcon, richPreview = false, info, href, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    
    const isExternal = typeof href === "string" && (href.startsWith("http://") || href.startsWith("https://"));
    
    const securityProps = isExternal 
      ? { target: "_blank", rel: "noopener noreferrer" } 
      : {};

    const urlString = typeof href === "string" ? href : href.pathname || "";

    return (
      <span 
        className="relative inline-flex items-center" // 🔥 FIXED: Changed from 'inline-relative' to establish absolute context
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <NextLink
          ref={ref}
          href={href}
          className={linkVariants({ variant, className })}
          {...securityProps}
          {...props}
        >
          {children}
          {showIcon && isExternal && (
            <IconArrowUpRight className="inline-block w-3 h-3 text-muted-foreground/70 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
        </NextLink>

        {/* Smart Hyperlink Metadata Micro-Tooltip Panel Overlay */}
        <AnimatePresence>
          {richPreview && isHovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0.96, y: 4, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, scale: 0.96, y: 4, x: "-50%" }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="absolute bottom-full left-1/2 mb-1.5 z-50 pointer-events-none flex flex-col gap-0.5 max-w-xs min-w-44 bg-popover text-popover-foreground border border-border px-2.5 py-1.5 rounded-lg shadow-xl backdrop-blur-md"
            >
              {/* 🔥 FIXED: Replaced 'break-all truncate' with a clean, un-broken text line truncation flow */}
              <span className="flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-tight text-foreground/90 w-full overflow-hidden">
                <IconLink className="w-3 h-3 text-primary shrink-0" />
                <span className="truncate block flex-1">{urlString}</span>
              </span>
              {info && (
                <span className="text-[10px] text-muted-foreground border-t border-border/40 mt-1 pt-1 block leading-normal">
                  <span className="font-semibold text-foreground/50">Redirects to:</span> {info}
                </span>
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    );
  }
);

Link.displayName = "Link";