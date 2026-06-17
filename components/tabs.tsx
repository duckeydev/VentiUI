"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const tabsTrackVariants = cva(
  "inline-flex items-center justify-start transition-all outline-none",
  {
    variants: {
      variant: {
        // Notion Document Style: Thin simple line under headers
        line: "w-full border-b border-border/50 bg-transparent p-0 gap-4",
        pill: "w-full bg-muted/30 rounded-lg border border-border/40 p-1 gap-1",
        segmented: "w-full bg-muted/40 rounded-md p-1 border border-border/40 gap-0.5",
        // Notion Sidebar Switcher Look: Completely flat container
        small: "w-fit bg-transparent p-0.5 gap-0.5",
        // Glass frosted look
        glass: "w-full backdrop-blur-xl bg-white/10 dark:bg-black/10 rounded-xl border border-white/10 dark:border-white/5 p-1 gap-1 shadow-sm",
      },
    },
    defaultVariants: {
      variant: "line",
    },
  }
);

export const tabTriggerVariants = cva(
  "relative flex items-center justify-center text-xs font-normal transition-all outline-none select-none cursor-pointer text-muted-foreground/80 hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none rounded-md",
  {
    variants: {
      variant: {
        line: "px-1 py-2 border-b-2 border-transparent -mb-[1px] rounded-none data-[state=active]:text-foreground data-[state=active]:font-medium",
        pill: "flex-1 px-3 py-1.5 data-[state=active]:text-foreground data-[state=active]:font-medium",
        segmented: "flex-1 px-3 py-1 rounded-sm data-[state=active]:text-foreground data-[state=active]:font-medium",
        // Tiny structural toggle text
        small: "px-2.5 py-1 text-[12px] hover:bg-muted/40 data-[state=active]:text-foreground data-[state=active]:font-medium",
        glass: "flex-1 px-3 py-1.5 data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:bg-white/20 dark:data-[state=active]:bg-black/20 data-[state=active]:backdrop-blur-md",
      },
    },
    defaultVariants: {
      variant: "line",
    },
  }
);

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends VariantProps<typeof tabsTrackVariants> {
  items: TabItem[];
  defaultActiveId?: string;
  activeId?: string;
  onValueChange?: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  variant = "line",
  defaultActiveId,
  activeId: controlledId,
  onValueChange,
  className,
}) => {
  const isControlled = controlledId !== undefined;
  const [localActiveId, setLocalActiveId] = React.useState(defaultActiveId || items[0]?.id);
  const activeId = isControlled ? controlledId : localActiveId;

  const layoutId = React.useId();

  const enabledItems = items.filter((i) => !i.disabled);

  const handleSelect = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (!isControlled) setLocalActiveId(id);
    onValueChange?.(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentId: string) => {
    const currentIndex = enabledItems.findIndex((i) => i.id === currentId);
    let nextIndex: number | null = null;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % enabledItems.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
    }

    if (nextIndex !== null) {
      handleSelect(enabledItems[nextIndex].id, enabledItems[nextIndex].disabled);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div role="tablist" className={tabsTrackVariants({ variant })}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              id={`tab-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              data-state={isActive ? "active" : "inactive"}
              onClick={() => handleSelect(item.id, item.disabled)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              className={tabTriggerVariants({ variant })}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId={`indicator-${layoutId}`}
                  className={cn(
                    "absolute inset-0 z-0",
                    variant === "line" && "bottom-0 top-auto h-0.5 bg-foreground",
                    variant !== "line" && "bg-background border border-border/40 rounded-[inherit] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                  )}
                  // Linear-leaning animation curves; Notion rarely uses high bounce spring configurations
                  transition={{ type: "tween", duration: 0.12, ease: "easeInOut" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Render panel only if content explicitly exists */}
      {items.some((i) => i.content !== null) && (
        <div className="mt-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              id={`panel-${activeId}`}
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`tab-${activeId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.08 }}
              className="focus-visible:outline-none rounded-md"
            >
              {items.find((i) => i.id === activeId)?.content}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

Tabs.displayName = "Tabs";