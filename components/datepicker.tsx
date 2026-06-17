"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconCalendar,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { AdvancedSelect } from "./advanced-select";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  className?: string;
  formatDate?: (date: Date) => string;
  inline?: boolean;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = [
  { short: "S", full: "Sunday" },
  { short: "M", full: "Monday" },
  { short: "T", full: "Tuesday" },
  { short: "W", full: "Wednesday" },
  { short: "T", full: "Thursday" },
  { short: "F", full: "Friday" },
  { short: "S", full: "Saturday" },
];

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 1).getDay();

const isSameDay = (d1?: Date, d2?: Date) => {
  if (!d1 || !d2) return false;
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

const startOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

interface CalendarDayItem {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -20 : 20,
    opacity: 0,
  }),
};

export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "Select date",
  className = "",
  formatDate,
  inline = false,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const initialViewDate = value || new Date();
  const [viewYear, setViewYear] = useState(initialViewDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialViewDate.getMonth());
  const [focusedDay, setFocusedDay] = useState<number | null>(null);

  useEffect(() => {
    if (value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
      setFocusedDay(value.getDate());
    }
  }, [value]);

  useEffect(() => {
    if (inline) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inline]);

  useEffect(() => {
    if (isOpen && !inline && gridRef.current) {
      const activeEl = gridRef.current.querySelector(
        '[tabindex="0"]',
      ) as HTMLElement;
      activeEl?.focus();
    }
  }, [isOpen, inline]);

  const handlePrevMonth = () => {
    setDirection(-1);
    setViewMonth((prev) => {
      if (prev === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setDirection(1);
    setViewMonth((prev) => {
      if (prev === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const handleDayClick = (item: CalendarDayItem) => {
    const newDate = new Date(item.year, item.month, item.day);
    if (minDate && startOfDay(newDate) < startOfDay(minDate)) return;
    if (maxDate && startOfDay(newDate) > startOfDay(maxDate)) return;

    onChange?.(newDate);
    if (!inline) setIsOpen(false);
  };

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDayIndex = getFirstDayOfMonth(viewYear, viewMonth);

    const prevMonthIdx = viewMonth === 0 ? 11 : viewMonth - 1;
    const prevYearIdx = viewMonth === 0 ? viewYear - 1 : viewYear;
    const daysInPrevMonth = getDaysInMonth(prevYearIdx, prevMonthIdx);

    const nextMonthIdx = viewMonth === 11 ? 0 : viewMonth + 1;
    const nextYearIdx = viewMonth === 11 ? viewYear + 1 : viewYear;

    const matrix: CalendarDayItem[] = [];

    for (let i = firstDayIndex - 1; i >= 0; i--) {
      matrix.push({
        day: daysInPrevMonth - i,
        month: prevMonthIdx,
        year: prevYearIdx,
        isCurrentMonth: false,
      });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      matrix.push({
        day: i,
        month: viewMonth,
        year: viewYear,
        isCurrentMonth: true,
      });
    }
    const remainingSlots = 42 - matrix.length;
    for (let i = 1; i <= remainingSlots; i++) {
      matrix.push({
        day: i,
        month: nextMonthIdx,
        year: nextYearIdx,
        isCurrentMonth: false,
      });
    }

    return matrix;
  }, [viewYear, viewMonth]);

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = minDate ? minDate.getFullYear() : currentYear - 20;
    const endYear = maxDate ? maxDate.getFullYear() : currentYear + 20;
    const years = [];
    for (let y = startYear; y <= endYear; y++) years.push(y);
    return years;
  }, [minDate, maxDate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalDays = getDaysInMonth(viewYear, viewMonth);
    let currentFocus = focusedDay || value?.getDate() || 1;

    switch (e.key) {
      case "Escape":
        if (!inline) {
          setIsOpen(false);
          containerRef.current?.querySelector("button")?.focus();
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (currentFocus < totalDays) {
          setFocusedDay(currentFocus + 1);
        } else {
          handleNextMonth();
          setFocusedDay(1);
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (currentFocus > 1) {
          setFocusedDay(currentFocus - 1);
        } else {
          handlePrevMonth();
          const targetDays = getDaysInMonth(
            viewMonth === 0 ? viewYear - 1 : viewYear,
            viewMonth === 0 ? 11 : viewMonth - 1,
          );
          setFocusedDay(targetDays);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (currentFocus + 7 <= totalDays) {
          setFocusedDay(currentFocus + 7);
        } else {
          handleNextMonth();
          setFocusedDay(currentFocus + 7 - totalDays);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (currentFocus - 7 > 0) {
          setFocusedDay(currentFocus - 7);
        } else {
          handlePrevMonth();
          const targetDays = getDaysInMonth(
            viewMonth === 0 ? viewYear - 1 : viewYear,
            viewMonth === 0 ? 11 : viewMonth - 1,
          );
          setFocusedDay(targetDays + (currentFocus - 7));
        }
        break;
      case "PageUp":
        e.preventDefault();
        handlePrevMonth();
        break;
      case "PageDown":
        e.preventDefault();
        handleNextMonth();
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        const activeDayItem = calendarDays.find(
          (d) => d.isCurrentMonth && d.day === currentFocus,
        );
        if (activeDayItem) handleDayClick(activeDayItem);
        break;
    }
  };

  useEffect(() => {
    if (focusedDay && gridRef.current) {
      const activeBtn = gridRef.current.querySelector(
        `[data-day="${focusedDay}"][data-current="true"]`,
      ) as HTMLElement;
      activeBtn?.focus();
    }
  }, [focusedDay]);

  const defaultFormat = (d: Date) =>
    d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const displayValue = value
    ? formatDate
      ? formatDate(value)
      : defaultFormat(value)
    : "";

  const renderCalendar = () => (
    <div
      className={`w-64 bg-popover text-popover-foreground select-none overflow-hidden ${inline ? "w-full" : "p-3 border border-border rounded-md shadow-md"}`}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center justify-between mb-2">
        <div
          className="flex items-center gap-1 mb-3 mt-1 min-w-0 flex-1 mr-2"
          role="live-region"
          aria-live="polite"
        >
          <AdvancedSelect
            variant="ghost"
            className="w-[100px] shrink-0"
            value={viewMonth.toString()}
            onChange={(val) => setViewMonth(parseInt(val, 10))}
            options={MONTH_NAMES.map((name, idx) => ({
              label: name,
              value: idx.toString(),
            }))}
            placeholder={MONTH_NAMES[viewMonth]}
          />
          <AdvancedSelect
            variant="ghost"
            className="w-[75px] shrink-0"
            value={viewYear.toString()}
            onChange={(val) => setViewYear(parseInt(val, 10))}
            options={yearOptions.map((year) => ({
              label: year.toString(),
              value: year.toString(),
            }))}
            placeholder={viewYear.toString()}
          />
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Previous Month"
            className="p-1 hover:bg-accent hover:text-accent-foreground rounded transition-colors text-muted-foreground focus:outline-none"
          >
            <IconChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next Month"
            className="p-1 hover:bg-accent hover:text-accent-foreground rounded transition-colors text-muted-foreground focus:outline-none"
          >
            <IconChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-7 gap-0.5 mb-1 text-center text-[11px] font-medium text-muted-foreground"
        role="row"
      >
        {WEEKDAYS.map((day, idx) => (
          <div
            key={idx}
            className="h-5 flex items-center justify-center"
            aria-label={day.full}
          >
            {day.short}
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden min-h-[216px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={`${viewYear}-${viewMonth}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            className="grid grid-cols-7 gap-0.5 w-full"
            ref={gridRef}
            role="grid"
          >
            {calendarDays.map((item, idx) => {
              const currentDayObj = new Date(item.year, item.month, item.day);
              const isSelected = isSameDay(currentDayObj, value);
              const isToday = isSameDay(currentDayObj, new Date());
              const isCurrentlyFocusedTarget =
                (focusedDay === item.day || (!focusedDay && item.day === 1)) &&
                item.isCurrentMonth;

              let isDisabled = false;
              if (minDate && startOfDay(currentDayObj) < startOfDay(minDate))
                isDisabled = true;
              if (maxDate && startOfDay(currentDayObj) > startOfDay(maxDate))
                isDisabled = true;

              const fullFormattedAriaLabel = currentDayObj.toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                },
              );

              return (
                <button
                  key={`${item.year}-${item.month}-${idx}`}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleDayClick(item)}
                  onFocus={() => item.isCurrentMonth && setFocusedDay(item.day)}
                  data-day={item.day}
                  data-current={item.isCurrentMonth}
                  tabIndex={isCurrentlyFocusedTarget ? 0 : -1}
                  aria-label={`${isSelected ? "Selected. " : ""}${fullFormattedAriaLabel}`}
                  aria-selected={isSelected}
                  role="gridcell"
                  className={`
                    h-8 w-full rounded text-xs font-normal transition-all focus:outline-none flex items-center justify-center relative
                    focus:ring-1 focus:ring-ring focus:ring-offset-1 focus:bg-accent
                    ${isDisabled ? "opacity-20 cursor-not-allowed" : "cursor-pointer"}
                    ${!isDisabled && item.isCurrentMonth && !isSelected ? "text-foreground hover:bg-accent hover:text-accent-foreground" : ""}
                    ${!isDisabled && !item.isCurrentMonth && !isSelected ? "text-muted-foreground/40 hover:bg-accent/50 hover:text-accent-foreground" : ""}
                    ${isSelected ? "bg-primary text-primary-foreground font-medium hover:bg-primary/90 focus:bg-primary focus:text-primary-foreground" : ""}
                  `}
                >
                  <span>{item.day}</span>
                  {isToday && !isSelected && (
                    <span
                      className="absolute bottom-1 w-1 h-1 rounded-full bg-destructive"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );

  if (inline) {
    return (
      <div className={`inline-block bg-background ${className}`}>
        {renderCalendar()}
      </div>
    );
  }

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={
          value
            ? `Change date, currently selected ${displayValue}`
            : "Choose Date"
        }
        className={`
          w-full h-9 px-2.5 flex items-center justify-between gap-3 border transition-all rounded-md text-xs font-medium text-left
          bg-background border-input text-foreground hover:bg-accent hover:text-accent-foreground
          focus:outline-none focus:ring-1 focus:ring-ring min-w-[180px] shadow-sm
          ${isOpen ? "border-ring ring-1 ring-ring" : ""}
        `}
      >
        <span
          className={
            value ? "text-foreground" : "text-muted-foreground font-normal"
          }
        >
          {displayValue || placeholder}
        </span>
        <IconCalendar
          className="w-3.5 h-3.5 text-muted-foreground shrink-0"
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.99 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 mt-1 top-full left-0 origin-top-left"
            role="dialog"
            aria-modal="true"
          >
            {renderCalendar()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}