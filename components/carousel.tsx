"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const carouselVariants = cva(
  "relative overflow-hidden rounded-xl",
  {
    variants: {
      variant: {
        modern: "",
        minimal: "rounded-none",
        glass: "bg-white/5 backdrop-blur-xl border border-white/10 shadow-glass",
        macos: "bg-secondary/20 border border-border/40 shadow-sm",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);

export interface CarouselProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof carouselVariants> {
  children: React.ReactNode;
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  loop?: boolean;
}

export function Carousel({
  children,
  autoPlay = false,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  className,
  variant,
  loop = true,
  ...props
}: CarouselProps) {
  const items = React.Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    if (!loop && currentIndex === items.length - 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length, loop, currentIndex]);

  const prevSlide = useCallback(() => {
    if (!loop && currentIndex === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length, loop, currentIndex]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || isHovered) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, nextSlide, isHovered]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      zIndex: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      className={cn(carouselVariants({ variant, className }), "group")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Content carousel"
      {...props}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                nextSlide();
              } else if (swipe > swipeConfidenceThreshold) {
                prevSlide();
              }
            }}
            className="absolute inset-0 w-full h-full"
            aria-roledescription="slide"
            aria-label={`Slide ${currentIndex + 1} of ${items.length}`}
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {showControls && items.length > 1 && (
        <>
          <motion.button
            title="Previous slide"
            onClick={prevSlide}
            disabled={!loop && currentIndex === 0}
            aria-label="Previous slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/60 backdrop-blur-md border border-border/50 text-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-background/90 shadow-md disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <IconChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            title="Next slide"
            onClick={nextSlide}
            disabled={!loop && currentIndex === items.length - 1}
            aria-label="Next slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/60 backdrop-blur-md border border-border/50 text-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-background/90 shadow-md disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <IconChevronRight className="w-5 h-5" />
          </motion.button>
        </>
      )}

      {showIndicators && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10" role="tablist" aria-label="Carousel navigation">
          {items.map((_, idx) => (
            <button
              key={idx}
              title={`Go to slide ${idx + 1}`}
              onClick={() => goToSlide(idx)}
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "transition-all duration-300 rounded-full shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                idx === currentIndex ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-foreground/40 hover:bg-foreground/70"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
