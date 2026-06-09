import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { IconUpload, IconFile, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const fileInputVariants = cva(
  "relative flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 text-center transition-colors hover:bg-muted/50 hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
  {
    variants: {
      state: {
        idle: "",
        drag: "border-primary bg-primary/5",
        error: "border-destructive bg-destructive/5",
      },
    },
    defaultVariants: {
      state: "idle",
    },
  }
);

export interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  label?: string;
  description?: string;
  error?: string;
  onChange?: (files: FileList | null) => void;
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, label, description, error, onChange, ...props }, ref) => {
    const [isDragOver, setIsDragOver] = React.useState(false);
    const [files, setFiles] = React.useState<File[]>([]);
    const id = React.useId();
    const errorId = error ? `${id}-error` : undefined;

    const handleFiles = (fileList: FileList | null) => {
      if (!fileList) return;
      const newFiles = Array.from(fileList);
      setFiles((prev) => (props.multiple ? [...prev, ...newFiles] : newFiles));
      onChange?.(fileList);
    };

    const removeFile = (index: number) => {
      setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
      <div className="w-full space-y-3">
        <div
          className={cn(
            fileInputVariants({ state: isDragOver ? "drag" : error ? "error" : "idle", className })
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
        >
          <input
            ref={ref}
            id={id}
            type="file"
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={errorId}
            {...props}
          />
          <label htmlFor={id} className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="rounded-full bg-background p-2.5 shadow-sm border border-border/50">
              <IconUpload className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">
                {label || "Click to upload or drag and drop"}
              </p>
              {description && <p className="text-xs text-muted-foreground">{description}</p>}
            </div>
          </label>
        </div>

        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="space-y-2"
            >
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs"
                >
                  <IconFile className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="flex-1 truncate font-medium text-foreground">{file.name}</span>
                  <span className="text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="rounded p-1 text-muted-foreground hover:text-destructive transition-colors"
                    aria-label={`Remove ${file.name}`}
                  >
                    <IconX className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <p id={errorId} className="text-xs font-medium text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
FileInput.displayName = "FileInput";