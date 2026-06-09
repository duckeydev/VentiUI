"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { IconChevronLeft, IconChevronRight, IconCalendar } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

export interface DatePickerProps {
  /** Currently selected date */
  value?: Date;
  /** Callback fired when a date is selected */
  onChange?: (date: Date) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Input placeholder text */
  placeholder?: string;
  /** Class name for the container wrapper */
  className?: string;
  /** Optional date formater */
  formatDate?: (date: Date) => string;
  /** Whether the calendar is rendered inline instead of as a popup */
  inline?: boolean;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const isSameDay = (d1?: Date, d2?: Date) => {
  if (!d1 || !d2) return false;
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "Pick a date",
  className = "",
  formatDate,
  inline = false,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize viewed month to the selected value or current date
  const initialViewDate = value || new Date();
  const [viewYear, setViewYear] = useState(initialViewDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialViewDate.getMonth());

  useEffect(() => {
    if (value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
    }
  }, [value]);

  useEffect(() => {
    if (inline) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inline]);

  const handlePrevMonth = () => {
    setViewMonth((prev) => {
      if (prev === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setViewMonth((prev) => {
      if (prev === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const handleDayClick = (day: number) => {
    const newDate = new Date(viewYear, viewMonth, day);
    if (minDate && newDate < new Date(minDate.setHours(0,0,0,0))) return;
    if (maxDate && newDate > new Date(maxDate.setHours(23,59,59,999))) return;
    
    onChange?.(newDate);
    if (!inline) {
      setIsOpen(false);
    }
  };

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

    const days = [];
    // Padding
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [viewYear, viewMonth]);

  const defaultFormat = (d: Date) => d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const displayValue = value ? (formatDate ? formatDate(value) : defaultFormat(value)) : "";

  const renderCalendar = () => (
    <div className={`w-72 bg-card border border-border rounded-xl shadow-lg p-4 z-50 ${inline ? '' : 'absolute top-full mt-2 left-0'}`}>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1.5 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground"
        >
          <IconChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-semibold text-foreground">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1.5 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground"
        >
          <IconChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-medium text-muted-foreground">
        {WEEKDAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, idx) => {
          if (!day) return <div key={idx} className="h-8" />;
          
          const currentDayObj = new Date(viewYear, viewMonth, day);
          const isSelected = isSameDay(currentDayObj, value);
          const isToday = isSameDay(currentDayObj, new Date());
          
          let isDisabled = false;
          if (minDate && currentDayObj < new Date(minDate.setHours(0,0,0,0))) isDisabled = true;
          if (maxDate && currentDayObj > new Date(maxDate.setHours(23,59,59,999))) isDisabled = true;

          return (
            <button
              key={idx}
              type="button"
              disabled={isDisabled}
              onClick={() => handleDayClick(day)}
              className={`
                h-8 w-8 mx-auto rounded-md flex items-center justify-center text-sm transition-all
                ${isDisabled ? "opacity-30 cursor-not-allowed" : "hover:bg-muted cursor-pointer"}
                ${isSelected ? "bg-primary text-primary-foreground hover:bg-primary/90 font-medium" : ""}
                ${isToday && !isSelected ? "ring-1 ring-primary/40 text-primary font-medium" : ""}
                ${!isSelected && !isToday && !isDisabled ? "text-foreground" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (inline) {
    return (
      <div className={className}>
        {renderCalendar()}
      </div>
    );
  }

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 px-3 py-2 flex items-center justify-between border border-border bg-background hover:bg-muted/30 transition-colors rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary/40 min-w-[240px]"
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {displayValue || placeholder}
        </span>
        <IconCalendar className="w-4 h-4 text-muted-foreground" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 mt-2 top-full"
          >
            {renderCalendar()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}