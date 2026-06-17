"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconEye, IconEyeOff, IconCheck, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const strongPasswordVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-lg border border-border/80 bg-background/50 px-3 py-2 text-sm shadow-sm transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        modern: "hover:border-border focus-within:border-border",
        minimal: "border-transparent hover:border-border/50 focus-within:border-border",
        glass: "border-white/10 bg-white/5 backdrop-blur-xl shadow-glass hover:bg-white/10 focus-within:bg-white/15",
        macos: "border-border/50 bg-secondary/30 rounded-xl shadow-sm hover:bg-secondary/40 focus-within:bg-secondary/50",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);

export interface ValidationRequirement {
  id: string;
  label: string;
  test: (val: string) => boolean;
}

export const defaultRequirements: ValidationRequirement[] = [
  { id: "length", label: "At least 8 characters", test: (val) => val.length >= 8 },
  { id: "uppercase", label: "Contains uppercase letter", test: (val) => /[A-Z]/.test(val) },
  { id: "lowercase", label: "Contains lowercase letter", test: (val) => /[a-z]/.test(val) },
  { id: "number", label: "Contains a number", test: (val) => /[0-9]/.test(val) },
  { id: "special", label: "Contains special symbol (e.g., @, #, $)", test: (val) => /[^A-Za-z0-9]/.test(val) },
];

export interface StrongPasswordProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">,
    VariantProps<typeof strongPasswordVariants> {
  value: string;
  onChange: (value: string) => void;
  requirements?: ValidationRequirement[];
  onStrengthChange?: (score: number, isValid: boolean) => void;
  showRequirementsPanel?: boolean;
  error?: string;
}

export const StrongPassword = React.forwardRef<HTMLInputElement, StrongPasswordProps>(
  ({ className, variant, value, onChange, requirements = defaultRequirements, onStrengthChange, showRequirementsPanel = true, placeholder = "Secure password string...", error, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const id = React.useId();
    const errorId = error ? `${id}-error` : undefined;

    const verifiedSpecs = requirements.filter((req) => req.test(value));
    const score = value ? verifiedSpecs.length : 0;
    const maxScore = requirements.length;
    const isFullyValid = score === maxScore;

    React.useEffect(() => {
      onStrengthChange?.(score, isFullyValid);
    }, [score, isFullyValid, onStrengthChange]);

    const getMeterMeta = () => {
      if (score === 0) return { width: "0%", color: "bg-muted" };
      if (score <= 2) return { width: "33%", color: "bg-destructive" };
      if (score <= 4) return { width: "66%", color: "bg-warning" };
      return { width: "100%", color: "bg-emerald-500" };
    };

    const meter = getMeterMeta();

    return (
      <div className="w-full max-w-sm space-y-2">
        <div className={cn(strongPasswordVariants({ variant, className }), error && "border-destructive focus-within:ring-destructive/40")}>
          <input
            ref={ref}
            id={id}
            type={isVisible ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={errorId}
            className="w-full bg-transparent text-xs text-foreground outline-none border-none placeholder:text-muted-foreground/50 p-0"
            {...props}
          />

          <motion.button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            whileTap={{ scale: 0.9 }}
            aria-label={isVisible ? "Hide password" : "Show password"}
            className="text-muted-foreground/50 hover:text-foreground transition-colors p-0.5 outline-none shrink-0 focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isVisible ? (
                <motion.span
                  key="eye-off"
                  initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
                  className="flex items-center justify-center"
                >
                  <IconEyeOff className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="eye"
                  initial={{ scale: 0.5, opacity: 0, rotate: 90 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
                  className="flex items-center justify-center"
                >
                  <IconEye className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {value && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
              className="h-1 w-full bg-muted/40 rounded-full overflow-hidden origin-left"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: meter.width }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className={`h-full transition-colors duration-300 ${meter.color}`}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showRequirementsPanel && isFocused && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
              className="overflow-hidden border border-border/40 bg-secondary/20 rounded-lg p-3"
            >
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/60 mb-2">
                Security Entropy Parameters
              </div>
              {requirements.map((req, i) => {
                const isPassed = req.test(value);
                return (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04, ease: EASE_OUT_EXPO }}
                    className="flex items-center gap-2 text-xs py-0.5"
                  >
                    <motion.span
                      animate={{
                        scale: isPassed ? [1, 1.3, 1] : 0.8,
                        rotate: isPassed ? [0, -10, 0] : 0,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className={cn(
                        "flex items-center justify-center w-4 h-4 rounded-full transition-colors",
                        isPassed ? "bg-emerald-500/10 text-emerald-500" : "bg-muted/60 text-muted-foreground/40"
                      )}
                    >
                      {isPassed ? <IconCheck className="w-3 h-3" strokeWidth={3} /> : <IconX className="w-3 h-3" />}
                    </motion.span>
                    <span className={cn("transition-colors", isPassed ? "text-foreground/70 line-through decoration-muted-foreground/30" : "text-muted-foreground/80")}>
                      {req.label}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.p
              id={errorId}
              role="alert"
              initial={{ opacity: 0, y: -4, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
              className="text-xs font-medium text-destructive overflow-hidden"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

StrongPassword.displayName = "StrongPassword";
