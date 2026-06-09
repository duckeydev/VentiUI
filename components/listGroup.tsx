"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const ListGroupContext = React.createContext<{ flush?: boolean }>({ flush: false });

export const listGroupVariants = cva(
  "flex flex-col w-full bg-card text-foreground transition-all overflow-hidden",
  {
    variants: {
      flush: {
        true: "border-0 bg-transparent rounded-none",
        false: "rounded-xl border border-border/80 shadow-sm",
      },
    },
    defaultVariants: {
      flush: false,
    },
  }
);

export interface ListGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listGroupVariants> {}

export const ListGroup = React.forwardRef<HTMLDivElement, ListGroupProps>(
  ({ className, flush = false, children, ...props }, ref) => {
    return (
      <ListGroupContext.Provider value={{ flush }}>
        <div
          ref={ref}
          className={listGroupVariants({ flush, className })}
          {...props}
        >
          {children}
        </div>
      </ListGroupContext.Provider>
    );
  }
);
ListGroup.displayName = "ListGroup";

// 1. Convert ListGroupItemProps into a generic type to support polymorphism cleanly
export type ListGroupItemProps<T extends React.ElementType = "div"> = {
  /** Highlights the item block with the primary identity theme accent color. */
  active?: boolean;
  /** Restricts interaction states, dimming alpha vectors and stripping link indicators. */
  disabled?: boolean;
  /** Supplying a string value automatically transforms the component node into an HTML Anchor link tag. */
  href?: string;
  /** Completely changes the underlying HTML container primitive to any valid polymorphic node type. */
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, "active" | "disabled" | "as" | "href">;

// 2. Base implementation utilizing a generic element ref assignment
const ListGroupItemImpl = <T extends React.ElementType = "div">(
  { className, active = false, disabled = false, href, as, children, ...props }: ListGroupItemProps<T>,
  ref: React.ComponentPropsWithRef<T>["ref"]
) => {
  const { flush } = React.useContext(ListGroupContext);
  
  const Component = as || (href ? "a" : "div");
  
  const itemClasses = [
    "px-4 py-3 flex items-center justify-between w-full text-sm transition-all relative border-b border-border/60 last:border-b-0",
    flush && "first:pt-0 last:pb-0",
    active
      ? "bg-primary text-primary-foreground font-semibold shadow-inner shadow-black/5 z-10 border-b-primary/10"
      : disabled
      ? "opacity-50 pointer-events-none text-muted-foreground/60 bg-muted/30"
      : "text-foreground/90 hover:bg-secondary/60 dark:hover:bg-secondary/40 active:bg-secondary/80",
    !disabled && (href || as || Component !== "div") ? "cursor-pointer select-none" : "",
    className || ""
  ].filter(Boolean).join(" ");

  const finalProps = {
    ref,
    className: itemClasses,
    href,
    "aria-current": active ? ("page" as const) : undefined,
    "aria-disabled": disabled ? true : undefined,
    tabIndex: disabled ? -1 : (href || as ? 0 : undefined),
    ...props,
  };

  return <Component {...finalProps}>{children}</Component>;
};

// 3. Cast the implementation to a brand definition that preserves generic types through forwardRef boundaries
export const ListGroupItem = React.forwardRef(ListGroupItemImpl) as <
  T extends React.ElementType = "div"
>(
  props: ListGroupItemProps<T> & { ref?: React.ComponentPropsWithRef<T>["ref"] }
) => React.ReactElement;

(ListGroupItem as any).displayName = "ListGroupItem";