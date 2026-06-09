"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { IconCircle } from "@tabler/icons-react";

export const timelineVariants = cva("relative w-full flex flex-col", {
  variants: {
    align: {
      left: "items-start before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-border/70",
      right: "items-end before:absolute before:right-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-border/70",
      center: "items-center before:absolute before:left-1/2 before:-translate-x-1/2 before:top-2 before:bottom-2 before:w-[1px] before:bg-border/70",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

export interface TimelineItem {
  /** Explicit element tracker key string. */
  id: string;
  /** Primary bold task indicator or milestone heading text. */
  title: string;
  /** Informational description body associated with the milestone. */
  description?: string;
  /** Sequential stamp indicator displayed alongside the node. */
  date?: string;
  /** Custom structural vector node override replacing the native indicator circle. */
  icon?: React.ReactNode;
  /** Highlights the step to reflect active execution or complete state. */
  isActive?: boolean;
}

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  items: TimelineItem[];
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, align = "left", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={timelineVariants({ align, className })}
        {...props}
      >
        {items.map((item, index) => {
          const isLeft = align === "left";
          const isRight = align === "right";
          const isCenter = align === "center";

          // Calculate alternating side splits for the center layout configuration
          const isEvenCenter = isCenter && index % 2 === 0;

          return (
            <div
              key={item.id}
              className={`relative w-full flex mb-8 last:mb-0 ${
                isLeft ? "justify-start pl-12" : ""
              } ${isRight ? "justify-end pr-12 text-right" : ""} ${
                isCenter ? "justify-center" : ""
              }`}
            >
              {/* Central Geometric Node Point Marker Wrap */}
              <div
                className={`absolute top-1.5 z-10 w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center shadow-sm transition-colors ${
                  isLeft ? "left-0" : ""
                } ${isRight ? "right-0" : ""} ${
                  isCenter ? "left-1/2 -translate-x-1/2" : ""
                } ${
                  item.isActive
                    ? "ring-4 ring-primary/10 border-primary text-primary"
                    : "text-muted-foreground/60"
                }`}
              >
                {item.icon || (
                  <IconCircle
                    className={`w-3.5 h-3.5 ${
                      item.isActive ? "fill-primary/20 stroke-[2.5]" : "stroke-[2]"
                    }`}
                  />
                )}
              </div>

              {/* Sequential Content Blocks Grid Split Mapping */}
              {isCenter ? (
                <div className="grid grid-cols-2 w-full gap-8">
                  {/* Left Column Content Slot */}
                  <div className={`flex flex-col gap-1 pt-1 ${isEvenCenter ? "text-right items-end pr-4" : "opacity-0 pointer-events-none select-none"}`}>
                    {isEvenCenter && <TimelineContent item={item} />}
                  </div>
                  {/* Right Column Content Slot */}
                  <div className={`flex flex-col gap-1 pt-1 ${!isEvenCenter ? "text-left items-start pl-4" : "opacity-0 pointer-events-none select-none"}`}>
                    {!isEvenCenter && <TimelineContent item={item} />}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1 pt-0.5 max-w-xl">
                  <TimelineContent item={item} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

Timeline.displayName = "Timeline";

/* Internal isolated micro-structural display proxy wrapper */
function TimelineContent({ item }: { item: TimelineItem }) {
  return (
    <>
      {item.date && (
        <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-muted-foreground/60">
          {item.date}
        </span>
      )}
      <h4 className={`text-sm font-bold tracking-tight text-foreground`}>
        {item.title}
      </h4>
      {item.description && (
        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
          {item.description}
        </p>
      )}
    </>
  );
}