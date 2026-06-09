"use client";

import * as React from "react";

export type ChatBubbleVariant = "modern" | "minimal" | "glass" | "macos";

export type ChatMessage = {
  id: string;
  author?: string;
  text: React.ReactNode;
  time?: string;
  side?: "left" | "right";
  avatar?: React.ReactNode;
  variant?: ChatBubbleVariant; // New property per message
};

interface ChatBubblesProps {
  messages: ChatMessage[];
  className?: string;
  showTimestamps?: boolean;
  defaultVariant?: ChatBubbleVariant; // Global fallback variant
}

// Helper hook or function to resolve tailwind classes per variant
const getVariantClasses = (variant: ChatBubbleVariant, isRight: boolean) => {
  const styles: Record<ChatBubbleVariant, { left: string; right: string }> = {
    modern: {
      left: "rounded-2xl rounded-bl-sm bg-muted/40 border border-border/40 text-foreground shadow-sm",
      right: "rounded-2xl rounded-br-sm bg-primary text-primary-foreground font-medium shadow-sm",
    },
    minimal: {
      left: "rounded-xl bg-muted/25 text-foreground",
      right: "rounded-xl bg-foreground text-background",
    },
    glass: {
      left: "rounded-2xl backdrop-blur-md bg-background/40 border border-white/10 dark:border-white/5 text-foreground shadow-sm",
      right: "rounded-2xl backdrop-blur-md bg-primary/80 border border-primary/20 text-primary-foreground shadow-sm",
    },
    macos: {
      left: "rounded-2xl rounded-bl-lg bg-[#e9e9eb] dark:bg-[#262629] text-black dark:text-white px-3.5 py-1.5",
      right: "rounded-2xl rounded-br-lg bg-[#007aff] text-white px-3.5 py-1.5 font-normal tracking-wide shadow-sm",
    },
  };

  return styles[variant][isRight ? "right" : "left"];
};

export const ChatBubble = React.forwardRef<
  HTMLDivElement,
  { message: ChatMessage; showTimestamp?: boolean; fallbackVariant?: ChatBubbleVariant }
>(({ message, showTimestamp = false, fallbackVariant = "modern" }, ref) => {
  const isRight = message.side === "right";
  const activeVariant = message.variant || fallbackVariant;
  const bubbleStyles = getVariantClasses(activeVariant, isRight);

  return (
    <div 
      ref={ref} 
      className={`flex w-full items-end gap-2.5 ${isRight ? "justify-end" : "justify-start"}`}
    >
      {/* Left Avatar */}
      {!isRight && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center select-none">
          {message.avatar || <div className="h-full w-full rounded-full bg-muted/60" />}
        </div>
      )}

      {/* Message Core Container */}
      <div className={`flex max-w-[72%] flex-col gap-1 ${isRight ? "items-end" : "items-start"}`}>
        {/* Author Name */}
        {!isRight && message.author && (
          <span className="px-1 text-xs font-medium text-muted-foreground/70">
            {message.author}
          </span>
        )}

        {/* Bubble */}
        <div
          aria-live="polite"
          className={`break-words px-4 py-2.5 text-[14px] leading-relaxed transition-all duration-200 ${bubbleStyles}`}
        >
          {message.text}
        </div>

        {/* Timestamp */}
        {showTimestamp && message.time && (
          <time className="px-1 text-[10px] font-medium tracking-wide text-muted-foreground/50 uppercase">
            {message.time}
          </time>
        )}
      </div>

      {/* Right Avatar */}
      {isRight && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center select-none">
          {message.avatar || <div className="h-full w-full rounded-full bg-muted/60" />}
        </div>
      )}
    </div>
  );
});

ChatBubble.displayName = "ChatBubble";

export const ChatBubbles: React.FC<ChatBubblesProps> = ({ 
  messages, 
  className = "", 
  showTimestamps = false,
  defaultVariant = "modern"
}) => {
  return (
    <div className={`flex flex-col gap-4 p-4 w-full max-w-2xl mx-auto ${className}`}>
      {messages.map((m) => (
        <ChatBubble 
          key={m.id} 
          message={m} 
          showTimestamp={showTimestamps} 
          fallbackVariant={defaultVariant} 
        />
      ))}
    </div>
  );
};

export default ChatBubbles;