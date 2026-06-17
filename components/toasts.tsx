"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { IconX, IconInfoCircle, IconAlertTriangle, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export type ToastType = "default" | "success" | "error" | "warning" | "info";

export const toastVariants = cva(
  "bg-card border border-border/80 shadow-xl rounded-xl p-4 min-w-[320px] max-w-[420px] flex items-start gap-3 pointer-events-auto relative overflow-hidden group select-none",
  {
    variants: {
      type: {
        default: "text-foreground",
        success: "text-foreground [&_svg]:text-emerald-500",
        error: "text-foreground [&_svg]:text-destructive",
        warning: "text-foreground [&_svg]:text-amber-500 dark:[&_svg]:text-amber-400",
        info: "text-foreground [&_svg]:text-blue-500 dark:[&_svg]:text-blue-400",
      },
    },
    defaultVariants: {
      type: "default",
    },
  }
);

export interface ToastProps extends VariantProps<typeof toastVariants> {
  id: string;
  title: string;
  description?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const icons: Record<ToastType, React.ReactNode | null> = {
  default: null,
  success: <IconCheck className="w-5 h-5 stroke-[2]" />,
  error: <IconX className="w-5 h-5 stroke-[2]" />,
  warning: <IconAlertTriangle className="w-5 h-5 stroke-[2]" />,
  info: <IconInfoCircle className="w-5 h-5 stroke-[2]" />,
};

export function ToastMessage({ id, title, description, type = "default", duration = 5000, onClose }: ToastProps) {
  const [remaining, setRemaining] = React.useState(duration);
  const [isPaused, setIsPaused] = React.useState(false);
  const startTimeRef = React.useRef(Date.now());
  const pausedAtRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (duration === Infinity || isPaused) return;

    const elapsed = pausedAtRef.current ? Date.now() - pausedAtRef.current : 0;
    const remainingMs = remaining - elapsed;
    if (remainingMs <= 0) {
      onClose(id);
      return;
    }

    startTimeRef.current = Date.now();
    const timer = setTimeout(() => onClose(id), remainingMs);
    return () => clearTimeout(timer);
  }, [id, duration, onClose, isPaused, remaining]);

  const handleMouseEnter = () => {
    if (duration === Infinity) return;
    setIsPaused(true);
    pausedAtRef.current = Date.now();
  };

  const handleMouseLeave = () => {
    if (duration === Infinity) return;
    setIsPaused(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      role="status"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={toastVariants({ type })}
    >
      {icons[type as ToastType] && (
        <div className="mt-0.5 shrink-0 flex items-center justify-center p-1 rounded-lg bg-secondary/50 border border-border/40">
          {icons[type as ToastType]}
        </div>
      )}

      <div className="flex-1 flex flex-col gap-0.5 pr-2">
        <h4 className="text-sm font-bold text-foreground tracking-tight">{title}</h4>
        {description && (
          <p className="text-xs font-medium text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <button
        onClick={() => onClose(id)}
        type="button"
        className="text-muted-foreground/50 hover:text-foreground cursor-pointer transition-colors shrink-0 p-1 hover:bg-secondary rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Dismiss toast"
      >
        <IconX className="w-3.5 h-3.5" />
      </button>

      {duration !== Infinity && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/20"
          initial={{ width: "100%" }}
          animate={{ width: isPaused ? undefined : "0%" }}
          transition={{ duration: remaining / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
}

type ToastCtxType = {
  toast: (props: Omit<ToastProps, "id" | "onClose">) => void;
};

const ToastCtx = React.createContext<ToastCtxType | undefined>(undefined);

export const useToast = () => {
  const context = React.useContext(ToastCtx);
  if (!context) throw new Error("useToast hook requires installation context inside a ToastProvider.");
  return context;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Omit<ToastProps, "onClose">[]>([]);

  const addToast = React.useCallback((props: Omit<ToastProps, "id" | "onClose">) => {
    const id = `toast-${Math.random().toString(36).substring(4, 11)}`;
    setToasts((prev) => [...prev, { ...props, id }]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastCtx.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[999] flex flex-col gap-2.5 pointer-events-none w-full max-w-[420px] px-4 md:px-0">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <ToastMessage key={t.id} {...t} onClose={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}
