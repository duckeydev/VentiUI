"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const pinInputVariants = cva(
  "h-11 w-9 text-center font-mono text-sm font-bold border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-background border-border shadow-sm",
        filled: "bg-secondary/60 border-transparent hover:bg-secondary/80 focus:bg-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface PinInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">,
    VariantProps<typeof pinInputVariants> {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
}

export const PinInput = React.forwardRef<HTMLInputElement, PinInputProps>(
  ({ className, variant, length = 4, value, onChange, onComplete, disabled, ...props }, ref) => {
    const inputRefs = React.useRef<HTMLInputElement[]>([]);

    // Sync input refs length array
    React.useEffect(() => {
      inputRefs.current = inputRefs.current.slice(0, length);
    }, [length]);

    const items = value.split("").slice(0, length);
    // Fill remaining elements with blank strings
    while (items.length < length) {
      items.push("");
    }

    const focusIndex = (index: number) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].focus();
        inputRefs.current[index].select();
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
      const val = e.target.value.replace(/[^0-9a-zA-Z]/g, ""); // Keep alpha-numeric
      if (!val) return;

      const newValue = [...items];
      // Capture only the last character dropped if field already had content
      newValue[index] = val.charAt(val.length - 1);
      updateValue(newValue);

      // Shift focus to the right if we aren't at the end
      if (index < length - 1) {
        focusIndex(index + 1);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace") {
        if (items[index] === "") {
          // If current field is empty, clear preceding block and focus leftward
          if (index > 0) {
            const newValue = [...items];
            newValue[index - 1] = "";
            updateValue(newValue);
            focusIndex(index - 1);
          }
        } else {
          // Wipe current item content
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

      // Target focusing index layout metrics
      const nextFocus = Math.min(newValue.length, length - 1);
      focusIndex(nextFocus);
    };

    return (
      <div className="flex items-center gap-2" role="group" aria-label="PIN security inputs group">
        {items.map((itemValue, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            pattern="[0-9a-zA-Z]*"
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
            className={pinInputVariants({ variant, className })}
            aria-label={`Digit ${idx + 1} of ${length}`}
            maxLength={length}
            {...props}
          />
        ))}
      </div>
    );
  }
);

PinInput.displayName = "PinInput";