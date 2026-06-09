"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Avatar, type AvatarProps } from "./avatar";

const avatarGroupVariants = cva("flex items-center isolate w-fit", {
  variants: {
    orientation: {
      horizontal: "flex-row -space-x-3.5",
      vertical: "flex-col -space-y-3.5",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarGroupVariants> {
  size?: AvatarProps["size"];
  roundness?: AvatarProps["roundness"];
  max?: number;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      className,
      orientation = "horizontal",
      size = "md",
      roundness = "full",
      max = 4,
      children,
      ...props
    },
    ref
  ) => {
    // Structural Node Flattening: safely extracts only valid <Avatar /> instances
    const validChildren = React.Children.toArray(children).filter(
      (child) => React.isValidElement(child) && child.type === Avatar
    ) as React.ReactElement<AvatarProps>[];

    const totalCount = validChildren.length;
    const visibleAvatars = validChildren.slice(0, max);
    const remainingCount = totalCount - max;

    // Explicit dimensional locks mapped to your design track's placeholder counter
    const counterSizeClasses = {
      sm: "h-8 w-8 text-[10px] font-bold",
      md: "h-10 w-10 text-xs font-bold",
      lg: "h-12 w-12 text-sm font-bold",
      xl: "h-14 w-14 text-base font-black",
    };

    // Micro-interaction vectors calculated relative to direction paths
    const interactionTransform = orientation === "horizontal" 
      ? "hover:-translate-y-1 hover:scale-[1.04]" 
      : "hover:translate-x-1 hover:scale-[1.04]";

    return (
      <div
        ref={ref}
        className={avatarGroupVariants({ orientation, className })}
        {...props}
      >
        {visibleAvatars.map((avatar, idx) =>
          React.cloneElement(avatar, {
            size,
            roundness,
            className: `${avatar.props.className || ""} ring-2 ring-background transition-all duration-200 shadow-sm cursor-pointer select-none ${interactionTransform}`,
            style: {
              zIndex: totalCount - idx,
              ...avatar.props.style,
            },
          })
        )}

        {remainingCount > 0 && (
          <Avatar
            size={size}
            roundness={roundness}
            className={`ring-2 ring-background font-mono bg-muted text-muted-foreground border border-border/40 font-bold tracking-tight shadow-sm transition-transform duration-200 cursor-default ${interactionTransform} ${
              counterSizeClasses[size || "md"]
            }`}
            fallback={`+${remainingCount}`}
            aria-label={`${remainingCount} more team members`}
            style={{ zIndex: 0 }}
          />
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";