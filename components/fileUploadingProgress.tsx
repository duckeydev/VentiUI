"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconFile, IconX, IconCheck, IconAlertCircle } from "@tabler/icons-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const fileUploadVariants = cva(
  "p-4 border border-border/80 bg-card text-foreground rounded-xl flex flex-col gap-3 shadow-sm select-none transition-all",
  {
    variants: {
      status: {
        uploading: "",
        success: "border-emerald-500/30",
        error: "border-destructive/30",
      },
    },
    defaultVariants: {
      status: "uploading",
    },
  }
);

export interface FileUploadingProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fileUploadVariants> {
  fileName: string;
  fileSize?: string;
  progress: number;
  onCancel?: () => void;
}

export const FileUploadingProgress = React.forwardRef<HTMLDivElement, FileUploadingProgressProps>(
  ({ fileName, fileSize = "Unknown size", progress, status = "uploading", onCancel, className = "", ...props }, ref) => {
    const isError = status === "error";
    const isSuccess = status === "success" || progress >= 100;
    const safeProgress = Math.min(100, Math.max(0, progress));

    return (
      <motion.div
        ref={ref}
        role="progressbar"
        aria-valuenow={Math.round(safeProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Uploading ${fileName}: ${Math.round(safeProgress)}%`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
        className={cn(fileUploadVariants({ status }), className)}
        {...(props as Record<string, unknown>)}
      >
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              "p-2 rounded-lg transition-colors duration-200",
              isError
                ? "bg-destructive/10 text-destructive"
                : isSuccess
                ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400"
                : "bg-primary/10 text-primary"
            )}
          >
            <IconFile className="w-5 h-5 stroke-[1.8]" />
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-sm font-semibold text-foreground tracking-tight truncate pr-2">
                {fileName}
              </span>

              <AnimatePresence mode="wait">
                {isSuccess && (
                  <motion.div key="success" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}>
                    <IconCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  </motion.div>
                )}
                {isError && (
                  <motion.div key="error" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}>
                    <IconAlertCircle className="w-4 h-4 text-destructive shrink-0" />
                  </motion.div>
                )}
                {!isSuccess && !isError && onCancel && (
                  <motion.button
                    key="cancel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onCancel}
                    type="button"
                    className="text-muted-foreground/60 hover:text-foreground cursor-pointer transition-colors shrink-0 p-0.5 rounded-md hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Cancel file upload"
                  >
                    <IconX className="w-3.5 h-3.5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div className="flex justify-between items-center text-xs font-medium text-muted-foreground transition-all">
              <span>{fileSize}</span>
              <AnimatePresence mode="wait">
                {isError ? (
                  <motion.span key="err-txt" initial={{ y: 3, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-destructive font-semibold">
                    Upload failed
                  </motion.span>
                ) : isSuccess ? (
                  <motion.span key="succ-txt" initial={{ y: 3, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-emerald-500 dark:text-emerald-400 font-semibold">
                    Complete
                  </motion.span>
                ) : (
                  <motion.span key="prog-txt" className="font-mono tabular-nums">
                    {Math.round(safeProgress)}%
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="w-full bg-secondary/60 dark:bg-secondary/40 rounded-full h-1.5 overflow-hidden relative">
          <motion.div
            className={cn(
              "h-full rounded-full relative overflow-hidden transition-colors duration-300",
              isError ? "bg-destructive" : isSuccess ? "bg-emerald-500 dark:bg-emerald-400" : "bg-primary"
            )}
            initial={{ width: 0 }}
            animate={{ width: `${safeProgress}%` }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          >
            {!isError && !isSuccess && safeProgress > 0 && safeProgress < 100 && (
              <motion.div
                className="absolute inset-0 w-full h-full"
                animate={{
                  backgroundPosition: ["200% 0", "-200% 0"],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                }}
              />
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  }
);

FileUploadingProgress.displayName = "FileUploadingProgress";
