import type { ClassValue } from "clsx";
import type { Variants, Transition } from "framer-motion";
import { cn } from "./utils";

export { cn } from "./utils";

export const theme = {
  radius: {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  },
  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
    none: "shadow-none",
  },
} as const;

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const disabledStyles =
  "disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40";

export const interactive =
  "transition-all duration-200 active:scale-[0.97] select-none cursor-pointer";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SPRING = [0.32, 0.72, 0, 1] as const;
export const EASE_NOTION = [0.4, 0, 0.2, 1] as const;

export const transition: Record<string, Transition> = {
  fast: { duration: 0.15, ease: EASE_OUT_EXPO },
  normal: { duration: 0.2, ease: EASE_OUT_EXPO },
  smooth: { duration: 0.3, ease: EASE_OUT_EXPO },
  notion: { duration: 0.2, ease: EASE_NOTION },
  spring: { type: "spring", stiffness: 500, damping: 30 },
  springSoft: { type: "spring", stiffness: 300, damping: 26 },
  springNotion: { type: "spring", stiffness: 400, damping: 28, mass: 0.8 },
  layout: { type: "spring", stiffness: 400, damping: 30 },
  springBouncy: { type: "spring", stiffness: 500, damping: 20 },
};

export const motion: Record<string, { initial: object; animate: object; exit: object; transition?: Transition }> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: transition.normal,
  },
  fadeUp: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: transition.smooth,
  },
  fadeDown: {
    initial: { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
    transition: transition.smooth,
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: transition.spring,
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: transition.smooth,
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: transition.smooth,
  },
  height: {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: transition.smooth,
  },
  notionPop: {
    initial: { opacity: 0, scale: 0.96, y: -4 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.96, y: -4 },
    transition: transition.springNotion,
  },
} as const;

export const stagger = (delayBetween = 0.05, delayStart = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: delayBetween, delayChildren: delayStart },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: transition.smooth },
};

export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15, ease: EASE_OUT_EXPO },
};

export const hoverGlow = {
  whileHover: { scale: 1.02, boxShadow: "0 0 20px rgba(var(--primary), 0.15)" },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2, ease: EASE_NOTION },
};

export function composeClassNames(...inputs: ClassValue[]) {
  return cn(inputs);
}

export const glassBase =
  "backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/10 dark:border-white/5 shadow-sm";

export const glassHeavy =
  "backdrop-blur-2xl bg-white/15 dark:bg-black/30 border border-white/15 dark:border-white/5 shadow-lg";

export const notionBorder =
  "border border-[#e9e9e8] dark:border-[#2e2e2e]";

export const notionHover =
  "transition-all duration-150 hover:bg-[#00000008] dark:hover:bg-[#ffffff08] cursor-pointer select-none";

export const notionCard =
  "bg-white dark:bg-[#191919] rounded-xl border border-[#e9e9e8] dark:border-[#2e2e2e] shadow-[0_1px_2px_rgba(0,0,0,0.03)]";

export const notionSelectable =
  "transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#00000006] dark:hover:bg-[#ffffff06] active:bg-[#0000000c] dark:active:bg-[#ffffff0c] cursor-pointer select-none rounded-lg";
