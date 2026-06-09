"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { IconLoader2 } from "@tabler/icons-react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl cursor-pointer text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40 active:scale-[0.97] select-none group relative",
  {
    variants: {
      variant: {
        modern: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow border border-primary/20",
        minimal: "bg-muted/40 text-foreground border border-transparent hover:bg-muted/70 active:bg-muted/90",
        glass: "backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/10 dark:border-white/5 text-foreground shadow-sm hover:bg-white/20 dark:hover:bg-black/30",
        macos: "bg-white dark:bg-[#2d2d2f] text-[#2c2c2e] dark:text-[#e3e3e6] border border-[#d1d1d6] dark:border-[#1c1c1e] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-lg font-sans tracking-tight active:bg-[#f5f5f7] dark:active:bg-[#232325] active:scale-100",
        outline: "border border-border text-foreground hover:bg-secondary/60 dark:hover:bg-secondary/40 active:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-md gap-1.5",
        sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
        default: "h-9.5 px-4 py-2",
        lg: "h-11 px-5 text-base rounded-xl gap-2.5",
        icon: "h-9 w-9 p-0 aspect-square",
      },
    },
    defaultVariants: {
      variant: "modern",
      size: "default",
    },
  }
);

interface BaseButtonProps extends VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

type HTMLButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

type HTMLLinkProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export type ButtonProps = HTMLButtonProps | HTMLLinkProps;

export const Button = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, loading = false, leftIcon, rightIcon, children, ...props }, ref) => {
    
    const isDisabled = "disabled" in props ? props.disabled : false;
    const isCurrentlyDisabled = loading || isDisabled;

    const renderInnerContent = () => (
      <>
        <span
          className="sr-only"
          {...(loading ? { "aria-live": "assertive", "aria-atomic": "true" } : {})}
        >
          {loading ? "Loading, please wait..." : ""}
        </span>

        {loading && (
          <IconLoader2 
            className="h-4 w-4 animate-spin stroke-[2.5] shrink-0" 
            aria-hidden="true" 
          />
        )}

        {!loading && leftIcon && (
          <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {typeof children === "string" ? <span>{children}</span> : children}

        {!loading && rightIcon && (
          <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </>
    );

    const computedClass = buttonVariants({ variant, size, className });
    const isLink = "href" in props && props.href !== undefined;

    if (isLink) {
      const { href, ...linkProps } = props as HTMLLinkProps;
      
      return (
        <Link
          href={isCurrentlyDisabled ? "" : href}
          role="link"
          aria-disabled={isCurrentlyDisabled ? "true" : undefined}
          tabIndex={isCurrentlyDisabled ? -1 : undefined}
          className={computedClass}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...linkProps}
        >
          {renderInnerContent()}
        </Link>
      );
    }

    const { type = "button", ...buttonProps } = props as HTMLButtonProps;
    return (
      <button
        type={type}
        disabled={isCurrentlyDisabled}
        aria-disabled={isCurrentlyDisabled ? "true" : undefined}
        className={computedClass}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...buttonProps}
      >
        {renderInnerContent()}
      </button>
    );
  }
);

Button.displayName = "Button";