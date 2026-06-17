"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const tableVariants = cva("w-full text-left text-sm text-foreground", {
  variants: {
    variant: {
      // Notion Default: Minimal borders, mostly white/background canvas, clean corners
      modern: "border border-border/60 bg-background rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden",
      // Notion Sidebar/Inline style: borderless, blends completely with the canvas
      minimal: "border-none bg-transparent shadow-none",
      // Notion Database View (Compact): Tight padding, clear row markers
      compact: "border border-border/80 bg-background rounded-md shadow-sm",
    },
  },
  defaultVariants: {
    variant: "modern",
  },
});

const rowVariants = cva("transition-colors border-b border-border/40 last:border-0", {
  variants: {
    variant: {
      modern: "hover:bg-muted/50 data-[state=selected]:bg-muted",
      minimal: "hover:bg-muted/40",
      compact: "hover:bg-muted/60 h-7",
    },
  },
  defaultVariants: {
    variant: "modern",
  },
});

export interface TableColumn<T> {
  key: string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
  width?: string;
}

export interface TableProps<T> extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tableVariants> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
}

export function Table<T>({
  className,
  variant,
  columns,
  data,
  rowKey,
  emptyMessage = "No pages or entries found",
  onRowClick,
  isLoading = false,
  ...props
}: TableProps<T>) {
  return (
    <div className={cn("relative w-full overflow-x-scroll selection:bg-muted", className)} {...props}>
      <div className={tableVariants({ variant })}>
        <table className="w-full text-left border-collapse table-auto" role="grid">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30 font-medium text-muted-foreground select-none">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  style={{ width: col.width }}
                  className={cn(
                    // Notion style headers: Smaller text, subtle weights, clean spacing
                    "p-2.5 px-3 font-normal text-xs text-muted-foreground/70 tracking-wide border-r border-border/30 last:border-r-0",
                    variant === "compact" && "p-1.5 px-2 text-[11px]",
                    col.className
                  )}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    {col.header}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border/20 relative">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                // Notion-esque skeleton loading state
                Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={`loading-${idx}`} className="border-b border-border/20 last:border-0">
                    {columns.map((col) => (
                      <td key={col.key} className={cn("p-2.5 px-3 border-r border-border/10 last:border-r-0", variant === "compact" && "p-1.5 px-2")}>
                        <div className="h-3.5 bg-muted/70 rounded-sm w-3/4 animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : data.length === 0 ? (
                // Blank State matching Notion's minimalist empty views
                <tr>
                  <td colSpan={columns.length} className="p-12 text-center text-muted-foreground/50 text-sm font-normal">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-muted-foreground/40 text-xs">{emptyMessage}</span>
                    </div>
                  </td>
                </tr>
              ) : (
                // Data Row Presentation
                data.map((row, index) => (
                  <motion.tr
                    key={rowKey(row)}
                    layoutId={rowKey(row).toString()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      rowVariants({ variant }),
                      onRowClick && "cursor-pointer active:bg-muted/80"
                    )}
                    role="row"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        role="gridcell"
                        className={cn(
                          "p-2.5 px-3 text-sm text-foreground/90 border-r border-border/20 last:border-r-0 truncate max-w-75",
                          variant === "compact" && "p-1.5 px-2 text-xs",
                          col.className
                        )}
                      >
                        {col.render ? col.render(row, index) : (String((row as any)[col.key]) || "")}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

Table.displayName = "Table";