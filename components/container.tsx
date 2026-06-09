import React from "react";

// --- Types ---
export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Defines the maximum-width bounds of the content viewport wrapper.
   * @default "lg"
   */
  size?: ContainerSize;
  /**
   * When true, forces the layout canvas to span 100% width infinitely, ignoring size values.
   * @default false
   */
  fluid?: boolean;
  /**
   * Strips out responsive horizontal side paddings (gutters) for precise alignment layouts.
   * @default false
   */
  clean?: boolean;
}

// --- Component Definition ---
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      size = "lg",
      fluid = false,
      clean = false,
      className = "",
      ...props
    },
    ref
  ) => {
    // Sizing maps matching standard viewport breakdowns
    const sizeMaps: Record<ContainerSize, string> = {
      sm: "max-w-screen-sm",    // max-width: 640px
      md: "max-w-screen-md",    // max-width: 768px
      lg: "max-w-screen-lg",    // max-width: 1024px
      xl: "max-w-screen-xl",    // max-width: 1280px
      "2xl": "max-w-screen-2xl",// max-width: 1536px
    };

    // Responsive gutter paddings block config
    const basePaddings = clean ? "" : "px-4 sm:px-6 lg:px-8";
    
    // Choose dynamic max width bounds based on fluid boolean status
    const maxWidthConfig = fluid ? "max-w-full" : sizeMaps[size];

    return (
      <div
        ref={ref}
        className={`w-full mx-auto ${basePaddings} ${maxWidthConfig} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";