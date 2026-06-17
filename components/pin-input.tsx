"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const pinInputVariants = cva(
  "h-11 w-9 text-center font-mono text-sm font-bold border rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        modern: "bg-background border-border shadow-sm",
        minimal: "bg-transparent border-border/30 shadow-none hover:border-border/50",
        filled: "bg-secondary/60 border-transparent hover:bg-secondary/80 focus:bg-background",
        glass: "bg-white/5 border-white/10 backdrop-blur-xl shadow-glass hover:bg-white/10 focus:bg-white/15",
        macos: "bg-secondary/30 border-border/50 rounded-xl shadow-sm hover:bg-secondary/40",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);

// 1. Change from React.InputHTMLAttributes to HTMLMotionProps<"input">
// 2. We no longer need to Omit custom events because they now naturally align
export interface PinInputProps
  extends Omit<HTMLMotionProps<"input">, "onChange" | "value">,
    VariantProps<typeof pinInputVariants> {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
}

export const PinInput = React.forwardRef<HTMLInputElement, PinInputProps>(
  ({ className, variant, length = 4, value, onChange, onComplete, disabled, ...props }, ref) => {
    const inputRefs = React.useRef<HTMLInputElement[]>([]);
    const [focusedIndex, setFocusedIndex] = React.useState(0);

    React.useEffect(() => {
      inputRefs.current = inputRefs.current.slice(0, length);
    }, [length]);

    const items = value.split("").slice(0, length);
    while (items.length < length) {
      items.push("");
    }

    const focusIndex = (index: number) => {
      const clamped = Math.max(0, Math.min(index, length - 1));
      if (inputRefs.current[clamped]) {
        inputRefs.current[clamped].focus();
        inputRefs.current[clamped].select();
        setFocusedIndex(clamped);
      }
    };

    const updateValue = (newValueArray: string[]) => {
      const combined = newValueArray.join("").slice(0, length);
      onChange(combined);

      if (combined.length === length && onComplete) {
        onComplete(combined);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const val = e.target.value.replace(/[^0-9a-zA-Z]/g, "");
      if (!val) return;

      const newValue = [...items];
      newValue[index] = val.charAt(val.length - 1);
      updateValue(newValue);

      if (index < length - 1) {
        focusIndex(index + 1);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace") {
        if (items[index] === "") {
          if (index > 0) {
            const newValue = [...items];
            newValue[index - 1] = "";
            updateValue(newValue);
            focusIndex(index - 1);
          }
        } else {
          const newValue = [...items];
          newValue[index] = "";
          updateValue(newValue);
        }
        e.preventDefault();
      } else if (e.key === "ArrowLeft" && index > 0) {
        focusIndex(index - 1);
        e.preventDefault();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        focusIndex(index + 1);
        e.preventDefault();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (disabled) return;

      const pastedData = e.clipboardData.getData("text").trim().replace(/[^0-9a-zA-Z]/g, "");
      if (!pastedData) return;

      const newValue = pastedData.split("").slice(0, length);
      updateValue(newValue);

      const nextFocus = Math.min(newValue.length, length - 1);
      focusIndex(nextFocus);
    };

    return (
      <div className="flex items-center gap-2" role="group" aria-label="PIN security inputs group">
        {items.map((itemValue, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: idx * 0.05,
              ease: EASE_OUT_EXPO,
            }}
          >
            <motion.input
              type="text"
              inputMode="numeric"
              pattern="[0-9a-zA-Z]*"
              maxLength={1}
              ref={(el) => {
                if (el) inputRefs.current[idx] = el;
                if (idx === 0 && ref) {
                  if (typeof ref === "function") ref(el);
                  else (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
                }
              }}
              value={itemValue}
              disabled={disabled}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              onFocus={() => setFocusedIndex(idx)}
              animate={itemValue ? {
                scale: [1, 1.15, 1],
                borderColor: "var(--primary)",
              } : {
                scale: focusedIndex === idx ? 1.05 : 1,
              }}
              transition={{
                scale: { type: "spring", stiffness: 500, damping: 20 },
                borderColor: { duration: 0.3 },
              }}
              className={cn(pinInputVariants({ variant, className }))}
              aria-label={`Digit ${idx + 1} of ${length}`}
              {...props}
            />
          </motion.div>
        ))}
      </div>
    );
  }
);

PinInput.displayName = "PinInput";