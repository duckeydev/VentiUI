"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

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
      <ListGroupContext.Provider value={{ flush: flush ?? false }}>
        <motion.div
          ref={ref}
          role="list"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.04 },
            },
          }}
          className={listGroupVariants({ flush, className })}
          {...(props as any)}
        >
          {children}
        </motion.div>
      </ListGroupContext.Provider>
    );
  }
);
ListGroup.displayName = "ListGroup";

export type ListGroupItemProps<T extends React.ElementType = "div"> = {
  active?: boolean;
  disabled?: boolean;
  href?: string;
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, "active" | "disabled" | "as" | "href">;

const ListGroupItemImpl = <T extends React.ElementType = "div">(
  { className, active = false, disabled = false, href, as, children, ...props }: ListGroupItemProps<T>,
  ref: React.ForwardedRef<HTMLElement>
) => {
  const { flush } = React.useContext(ListGroupContext);

  const Component = as || (href ? "a" : "div");

  const itemClasses = cn(
    "px-4 py-3 flex items-center justify-between w-full text-sm transition-all relative border-b border-border/60 last:border-b-0",
    flush && "first:pt-0 last:pb-0",
    active
      ? "bg-primary text-primary-foreground font-semibold shadow-inner shadow-black/5 z-10 border-b-primary/10"
      : disabled
      ? "opacity-50 pointer-events-none text-muted-foreground/60 bg-muted/30"
      : "text-foreground/90 hover:bg-secondary/60 dark:hover:bg-secondary/40 active:bg-secondary/80",
    !disabled && (href || as || Component !== "div") && "cursor-pointer select-none",
    className
  );

  const finalProps = {
    ref,
    className: itemClasses,
    href,
    role: "listitem",
    "aria-current": active ? ("page" as const) : undefined,
    "aria-disabled": disabled ? true : undefined,
    tabIndex: disabled ? -1 : (href || as ? 0 : undefined),
    ...props,
  } as any;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 6 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE_OUT_EXPO } },
      }}
    >
      <Component {...finalProps}>{children}</Component>
    </motion.div>
  );
};

export const ListGroupItem = React.forwardRef(ListGroupItemImpl as any) as unknown as <
  T extends React.ElementType = "div"
>(
  props: ListGroupItemProps<T> & { ref?: React.ComponentPropsWithRef<T>["ref"] }
) => React.ReactElement;

(ListGroupItem as unknown as { displayName: string }).displayName = "ListGroupItem";
