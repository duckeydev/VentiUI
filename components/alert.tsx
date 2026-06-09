"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { 
  IconInfoCircle, 
  IconCircleCheck, 
  IconAlertTriangle, 
  IconX, 
  IconBell 
} from "@tabler/icons-react";

export const alertVariants = cva(
  "relative w-full rounded-xl border p-4 flex gap-3 transition-all duration-300 ease-out select-text items-start",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border shadow-sm",
        info: "bg-blue-500/5 text-blue-900 dark:text-blue-200 border-blue-500/20 [&>span>svg]:text-blue-500",
        success: "bg-emerald-500/5 text-emerald-900 dark:text-emerald-200 border-emerald-500/20 [&>span>svg]:text-emerald-500",
        warning: "bg-amber-500/5 text-amber-900 dark:text-amber-200 border-amber-500/20 [&>span>svg]:text-amber-500",
        destructive: "bg-destructive/5 text-destructive border-destructive/10 dark:border-destructive/20 [&>span>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  exitAnimation?: "fade-out" | "slide-out-right" | "slide-out-left" | "none";
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "default",
      exitAnimation = "fade-out",
      title,
      description,
      icon,
      onClose,
      closeLabel = "Dismiss alert",
      children,
      ...props
    },
    ref
  ) => {
    const [isExiting, setIsExiting] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState(true);

    const handleDismiss = () => {
      if (exitAnimation === "none") {
        setIsMounted(false);
        onClose?.();
        return;
      }

      setIsExiting(true);
      setTimeout(() => {
        setIsMounted(false);
        onClose?.();
      }, 300); // Sychronized with animation duration
    };

    if (!isMounted) return null;

    // Automated fallback vector maps based on semantic states
    const defaultIcons = {
      default: <IconBell className="h-5 w-5 stroke-[2]" />,
      info: <IconInfoCircle className="h-5 w-5 stroke-[2]" />,
      success: <IconCircleCheck className="h-5 w-5 stroke-[2]" />,
      warning: <IconAlertTriangle className="h-5 w-5 stroke-[2]" />,
      destructive: <IconInfoCircle className="h-5 w-5 stroke-[2]" />,
    };

    // Transform vector paths matching configuration specs
    const exitAnimationClasses = {
      "fade-out": "opacity-0 scale-95",
      "slide-out-right": "opacity-0 translate-x-8",
      "slide-out-left": "opacity-0 -translate-x-8",
      none: "",
    };

    return (
      <div
        ref={ref}
        role={variant === "destructive" || variant === "warning" ? "alert" : "status"}
        aria-live={variant === "destructive" ? "assertive" : "polite"}
        className={alertVariants({
          variant,
          className: `${className || ""} ${isExiting ? exitAnimationClasses[exitAnimation] : "opacity-100 scale-100"}`,
        })}
        {...props}
      >
        {/* Leading Vector Element Area */}
        <span aria-hidden="true" className="shrink-0 pt-0.5 text-muted-foreground/80">
          {icon || defaultIcons[variant || "default"]}
        </span>

        {/* Text Presentation Frame */}
        <div className="flex-1 space-y-1 pr-6">
          {title && (
            <h5 className="font-bold text-sm tracking-tight leading-none text-foreground">
              {title}
            </h5>
          )}
          {description && (
            <p className="text-xs text-muted-foreground/90 leading-relaxed font-medium">
              {description}
            </p>
          )}
          {children}
        </div>

        {/* Absolute Safe Dismiss Trigger Node */}
        {onClose && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label={closeLabel}
            className="absolute top-3.5 right-3.5 rounded-lg p-1 text-muted-foreground/60 transition-all hover:bg-secondary hover:text-foreground active:scale-95 cursor-pointer"
          >
            <IconX className="h-4 w-4 stroke-[2.5]" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";