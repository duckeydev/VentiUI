"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const marqueeContainerVariants = cva(
  "relative flex w-full overflow-hidden whitespace-nowrap p-1",
  {
    variants: {
      fadeEdges: {
        true: "[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,1)_8%,rgba(0,0,0,1)_92%,transparent_100%)]",
        false: "",
      },
    },
    defaultVariants: {
      fadeEdges: true,
    },
  }
);

export interface MarqueeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof marqueeContainerVariants> {
  speed?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
}

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  ({
    speed = 30,
    pauseOnHover = true,
    direction = "left",
    fadeEdges = true,
    className = "",
    children,
    ...props
  }, ref) => {
    const marqueeStyles = {
      "--gap": "2rem",
      "--duration": `${speed}s`,
      "--direction": direction === "left" ? "normal" : "reverse",
      "--play-state": pauseOnHover ? "paused" : "running",
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        style={marqueeStyles}
        className={cn(marqueeContainerVariants({ fadeEdges }), "group", className)}
        aria-label="Scrolling content"
        role="region"
        {...props}
      >
        <div
          aria-hidden="true"
          className="flex shrink-0 items-center gap-[var(--gap)] min-w-full animate-[marquee_var(--duration)_linear_infinite_var(--direction)] group-hover:[animation-play-state:var(--play-state)]"
        >
          {children}
        </div>

        <div
          aria-hidden="true"
          className="flex shrink-0 items-center gap-[var(--gap)] min-w-full animate-[marquee_var(--duration)_linear_infinite_var(--direction)] group-hover:[animation-play-state:var(--play-state)]"
        >
          {children}
        </div>
      </div>
    );
  }
);

Marquee.displayName = "Marquee";
