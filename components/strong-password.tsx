"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconEye, IconEyeOff, IconCheck, IconX } from "@tabler/icons-react";

export const strongPasswordVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-lg border border-border/80 bg-background/50 px-3 py-2 text-sm shadow-sm transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "hover:border-border focus-within:border-border",
        ghost: "border-transparent bg-muted/20 focus-within:bg-background/80 focus-within:border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ValidationRequirement {
  id: string;
  label: string;
  test: (val: string) => boolean;
}

// Built-in industrial entropy criteria benchmarks
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
}

export const StrongPassword = React.forwardRef<HTMLInputElement, StrongPasswordProps>(
  ({ className, variant, value, onChange, requirements = defaultRequirements, onStrengthChange, showRequirementsPanel = true, placeholder = "Secure password string...", ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    // Evaluate valid metrics count against array constraints 
    const verifiedSpecs = requirements.filter((req) => req.test(value));
    const score = value ? verifiedSpecs.length : 0;
    const maxScore = requirements.length;
    const isFullyValid = score === maxScore;

    React.useEffect(() => {
      onStrengthChange?.(score, isFullyValid);
    }, [score, isFullyValid, onStrengthChange]);

    // Track dynamic aesthetic track rendering profiles
    const getMeterMeta = () => {
      if (score === 0) return { width: "0%", color: "bg-muted" };
      if (score <= 2) return { width: "33%", color: "bg-destructive" };
      if (score <= 4) return { width: "66%", color: "bg-warning" };
      return { width: "100%", color: "bg-emerald-500" };
    };

    const meter = getMeterMeta();

    return (
      <div className="w-full max-w-sm space-y-2">
        <div className={strongPasswordVariants({ variant, className })}>
          <input
            ref={ref}
            type={isVisible ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="w-full bg-transparent text-xs text-foreground outline-none border-none placeholder:text-muted-foreground/50 p-0"
            {...props}
          />

          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="text-muted-foreground/50 hover:text-foreground transition-colors p-0.5 outline-none shrink-0"
          >
            {isVisible ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
          </button>
        </div>

        {/* Real-time Smooth Entropy Bar Segment */}
        {value && (
          <div className="h-1 w-full bg-muted/40 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: meter.width }}
              className={`h-full transition-colors duration-300 ${meter.color}`}
            />
          </div>
        )}

        {/* Dynamic Criteria Checklist Drawer Layout */}
        <AnimatePresence>
          {showRequirementsPanel && isFocused && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden border border-border/40 bg-secondary/20 rounded-lg p-3 space-y-1.5"
            >
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/60 mb-2">
                Security Entropy Parameters
              </div>
              {requirements.map((req) => {
                const isPassed = req.test(value);
                return (
                  <div key={req.id} className="flex items-center gap-2 text-xs">
                    <span className={`p-0.5 rounded-full transition-colors ${isPassed ? "bg-emerald-500/10 text-emerald-500" : "bg-muted/60 text-muted-foreground/40"}`}>
                      {isPassed ? <IconCheck className="w-3 h-3" strokeWidth={3} /> : <IconX className="w-3 h-3" />}
                    </span>
                    <span className={`transition-colors ${isPassed ? "text-foreground/70 line-through decoration-muted-foreground/30" : "text-muted-foreground/80"}`}>
                      {req.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

StrongPassword.displayName = "StrongPassword";