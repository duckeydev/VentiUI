"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconFile, IconX, IconCheck, IconAlertCircle } from "@tabler/icons-react";

export interface FileUploadingProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Explicit filename string for the staging attachment asset. */
  fileName: string;
  /** Expressed document footprint dimensions (e.g., '4.2 MB'). */
  fileSize?: string;
  /** Quantitative fractional loading progress scalar scaled cleanly between 0 and 100. */
  progress: number;
  /** Current state tracker defining underlying visual presentation matrices. */
  status?: "uploading" | "success" | "error";
  /** Intercept callback fired when the structural cancel trigger is engaged. */
  onCancel?: () => void;
}

export const FileUploadingProgress = React.forwardRef<HTMLDivElement, FileUploadingProgressProps>(
  ({ fileName, fileSize = "Unknown size", progress, status = "uploading", onCancel, className = "", ...props }, ref) => {
    const isError = status === "error";
    const isSuccess = status === "success" || progress >= 100;
    const safeProgress = Math.min(100, Math.max(0, progress));

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={Math.round(safeProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`p-4 border border-border/80 bg-card text-foreground rounded-xl flex flex-col gap-3 shadow-sm select-none transition-all ${className}`}
        {...props}
      >
        <div className="flex items-center gap-3">
          {/* Hardware-styled Document Context Badge */}
          <div
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isError
                ? "bg-destructive/10 text-destructive"
                : isSuccess
                ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400"
                : "bg-primary/10 text-primary"
            }`}
          >
            <IconFile className="w-5 h-5 stroke-[1.8]" />
          </div>

          {/* Context Matrix Track */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-sm font-semibold text-foreground tracking-tight truncate pr-2">
                {fileName}
              </span>
              
              {/* Dynamic Action Trigger Status Zone */}
              <AnimatePresence mode="wait">
                {isSuccess && (
                  <motion.div key="success" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <IconCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  </motion.div>
                )}
                {isError && (
                  <motion.div key="error" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
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
                    className="text-muted-foreground/60 hover:text-foreground cursor-pointer transition-colors shrink-0 p-0.5 rounded-md hover:bg-secondary"
                    aria-label="Cancel file upload"
                  >
                    <IconX className="w-3.5 h-3.5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Meta Metric Labels */}
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

        {/* Tracking Slider Fill Assembly */}
        <div className="w-full bg-secondary/60 dark:bg-secondary/40 rounded-full h-1.5 overflow-hidden relative">
          <motion.div
            className={`h-full rounded-full transition-colors duration-300 ${
              isError ? "bg-destructive" : isSuccess ? "bg-emerald-500 dark:bg-emerald-400" : "bg-primary"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${safeProgress}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
          />
        </div>
      </div>
    );
  }
);

FileUploadingProgress.displayName = "FileUploadingProgress";