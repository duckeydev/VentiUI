"use client";

import * as React from "react";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Speed coefficient calculating how many seconds it takes for a full translation loop. */
  speed?: number;
  /** Pauses the CSS animation timeline smoothly when the user's cursor intersects the container track. */
  pauseOnHover?: boolean;
  /** Flips the horizontal rolling direction. */
  direction?: "left" | "right";
  /** Injects a transparent soft linear mask fade on the left and right structural container bounds. */
  fadeEdges?: boolean;
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
    
    // Inline variable generation for cleaner CSS-driven layout transitions
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
        className={`group relative flex w-full overflow-hidden whitespace-nowrap p-1 ${
          fadeEdges 
            ? "[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,1)_8%,rgba(0,0,0,1)_92%,transparent_100%)]" 
            : ""
        } ${className}`}
        {...props}
      >
        {/* Track Assembly 1 */}
        <div className="flex shrink-0 items-center gap-[var(--gap)] min-w-full animate-[marquee_var(--duration)_linear_infinite_var(--direction)] group-hover:[animation-play-state:var(--play-state)]">
          {children}
        </div>

        {/* Track Assembly 2 (Seamless Mirror Clone) */}
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