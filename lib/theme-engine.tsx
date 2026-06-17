"use client";

import * as React from "react";

export type ThemeColors = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
};

export type ThemeDefinition = {
  name: string;
  radius: string;
  colors: ThemeColors;
};

export type ThemeMode = "light" | "dark";

export type Theme = {
  id: string;
  name: string;
  light: ThemeDefinition;
  dark: ThemeDefinition;
};

export type ThemeContextValue = {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  setTheme: (theme: Theme) => void;
  customThemes: Theme[];
  saveTheme: (theme: Theme) => void;
  deleteTheme: (id: string) => void;
  updateDefinition: (mode: ThemeMode, definition: ThemeDefinition) => void;
  resetToPreset: (presetId: string) => void;
  exportTheme: () => { json: string; css: string };
  importTheme: (json: string) => boolean;
};

const CSS_VARIABLE_MAP: Record<keyof ThemeColors, string> = {
  background: "--background",
  foreground: "--foreground",
  card: "--card",
  cardForeground: "--card-foreground",
  popover: "--popover",
  popoverForeground: "--popover-foreground",
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  secondary: "--secondary",
  secondaryForeground: "--secondary-foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  destructive: "--destructive",
  border: "--border",
  input: "--input",
  ring: "--ring",
  chart1: "--chart-1",
  chart2: "--chart-2",
  chart3: "--chart-3",
  chart4: "--chart-4",
  chart5: "--chart-5",
  sidebar: "--sidebar",
  sidebarForeground: "--sidebar-foreground",
  sidebarPrimary: "--sidebar-primary",
  sidebarPrimaryForeground: "--sidebar-primary-foreground",
  sidebarAccent: "--sidebar-accent",
  sidebarAccentForeground: "--sidebar-accent-foreground",
  sidebarBorder: "--sidebar-border",
  sidebarRing: "--sidebar-ring",
};

export function applyThemeToDocument(definition: ThemeDefinition, mode: ThemeMode) {
  const root = document.documentElement;
  const isDark = mode === "dark";

  root.classList.toggle("dark", isDark);

  root.style.setProperty("--radius", definition.radius);

  for (const [key, cssVar] of Object.entries(CSS_VARIABLE_MAP)) {
    const colorKey = key as keyof ThemeColors;
    root.style.setProperty(cssVar, definition.colors[colorKey]);
  }
}

export function themeToCSS(theme: Theme): string {
  const lightVars = Object.entries(theme.light.colors)
    .map(([key, val]) => `  ${CSS_VARIABLE_MAP[key as keyof ThemeColors]}: ${val};`)
    .join("\n");

  const darkVars = Object.entries(theme.dark.colors)
    .map(([key, val]) => `  ${CSS_VARIABLE_MAP[key as keyof ThemeColors]}: ${val};`)
    .join("\n");

  return `/* Theme: ${theme.name} */\n:root {\n${lightVars}\n  --radius: ${theme.light.radius};\n}\n\n.dark {\n${darkVars}\n  --radius: ${theme.dark.radius};\n}`;
}

function oklchToLinear(c: number): number {
  const abs = Math.abs(c);
  const sign = c >= 0 ? 1 : -1;
  return (abs <= 0.04045 ? abs / 12.92 : Math.pow((abs + 0.055) / 1.055, 2.4)) * sign;
}

function linearToOklchChannel(c: number): number {
  const abs = Math.abs(c);
  const sign = c >= 0 ? 1 : -1;
  return (abs <= 0.0031308 ? abs * 12.92 : 1.055 * Math.pow(abs, 1 / 2.4) - 0.055) * sign;
}

export function oklchToHex(oklch: string): string {
  const match = oklch.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*[\d.]+)?\s*\)/);
  if (!match) return "#000000";

  const L = parseFloat(match[1]);
  const C = parseFloat(match[2]);
  const H = (parseFloat(match[3]) * Math.PI) / 180;

  const a = C * Math.cos(H);
  const b = C * Math.sin(H);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${clamp(linearToOklchChannel(r) * 255).toString(16).padStart(2, "0")}${clamp(linearToOklchChannel(g) * 255).toString(16).padStart(2, "0")}${clamp(linearToOklchChannel(bb) * 255).toString(16).padStart(2, "0")}`;
}

export function hexToOklch(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;

  const rLin = oklchToLinear(r);
  const gLin = oklchToLinear(g);
  const bLin = oklchToLinear(b);

  const l_ = 0.4122214708 * rLin + 0.5363325363 * gLin + 0.0514459929 * bLin;
  const m_ = 0.2119034982 * rLin + 0.6806995451 * gLin + 0.1073969566 * bLin;
  const s_ = 0.0883024619 * rLin + 0.2817188376 * gLin + 0.6299787005 * bLin;

  const lCubed = Math.cbrt(l_);
  const mCubed = Math.cbrt(m_);
  const sCubed = Math.cbrt(s_);

  const L = 0.2104542553 * lCubed + 0.793617785 * mCubed - 0.0040720468 * sCubed;
  const aa = 1.9779984951 * lCubed - 2.428592205 * mCubed + 0.4505937099 * sCubed;
  const bb = 0.0259040371 * lCubed + 0.7827717662 * mCubed - 0.808675766 * sCubed;

  const C = Math.sqrt(aa * aa + bb * bb);
  const H = ((Math.atan2(bb, aa) * 180) / Math.PI + 360) % 360;

  return `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(3)})`;
}

export function generateThemeFromBase(
  baseHex: string,
  name: string,
  mode: ThemeMode,
  existing?: ThemeDefinition
): ThemeDefinition {
  const baseOklch = hexToOklch(baseHex);
  const match = baseOklch.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*[\d.]+)?\s*\)/);
  const baseL = match ? parseFloat(match[1]) : 0.5;
  const baseC = match ? parseFloat(match[2]) : 0.15;
  const baseH = match ? parseFloat(match[3]) : 150;

  const dark = mode === "dark";
  const l = (v: number) => `oklch(${v} ${baseC} ${baseH})`;
  const lHue = (v: number, h: number) => `oklch(${v} ${baseC} ${(baseH + h + 360) % 360})`;
  const lCH = (v: number, c: number, h: number) => `oklch(${v} ${c} ${(baseH + h + 360) % 360})`;

  if (existing) {
    return {
      ...existing,
      name,
      colors: {
        ...existing.colors,
        primary: lCH(dark ? 0.5 : 0.527, dark ? 0.15 : 0.154, dark ? 20 : 0),
      },
    };
  }

  if (dark) {
    return {
      name,
      radius: "0.625rem",
      colors: {
        background: "oklab(15.309% -0.00185 0.00598)",
        foreground: "oklch(0.988 0.003 106.5)",
        card: "oklch(0.228 0.013 107.4)",
        cardForeground: "oklch(0.988 0.003 106.5)",
        popover: "oklch(0.228 0.013 107.4)",
        popoverForeground: "oklch(0.988 0.003 106.5)",
        primary: lCH(0.5, 0.15, 20),
        primaryForeground: "oklch(0.982 0.018 155.826)",
        secondary: "oklch(0.274 0.006 286.033)",
        secondaryForeground: "oklch(0.985 0 0)",
        muted: "oklch(0.286 0.016 107.4)",
        mutedForeground: "oklch(0.737 0.021 106.9)",
        accent: lCH(0.35, 0.08, 20),
        accentForeground: "oklch(0.988 0.003 106.5)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: lCH(0.6, 0.1, 10),
        chart1: l(0.6),
        chart2: lHue(0.55, 60),
        chart3: lHue(0.5, 120),
        chart4: lHue(0.45, 180),
        chart5: lHue(0.4, 240),
        sidebar: "oklch(0.228 0.013 107.4)",
        sidebarForeground: "oklch(0.988 0.003 106.5)",
        sidebarPrimary: lCH(0.55, 0.15, 20),
        sidebarPrimaryForeground: "oklch(0.982 0.018 155.826)",
        sidebarAccent: "oklch(0.286 0.016 107.4)",
        sidebarAccentForeground: "oklch(0.988 0.003 106.5)",
        sidebarBorder: "oklch(1 0 0 / 10%)",
        sidebarRing: lCH(0.6, 0.1, 10),
      },
    };
  }

  return {
    name,
    radius: "0.625rem",
    colors: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.153 0.006 107.1)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.153 0.006 107.1)",
      popover: "oklch(1 0 0)",
      popoverForeground: "oklch(0.153 0.006 107.1)",
      primary: lCH(0.527, 0.154, 0),
      primaryForeground: "oklch(0.982 0.018 155.826)",
      secondary: "oklch(0.967 0.001 286.375)",
      secondaryForeground: "oklch(0.21 0.006 285.885)",
      muted: "oklch(0.966 0.005 106.5)",
      mutedForeground: "oklch(0.58 0.031 107.3)",
      accent: lCH(0.9, 0.05, 20),
      accentForeground: "oklch(0.228 0.013 107.4)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.93 0.007 106.5)",
      input: "oklch(0.93 0.007 106.5)",
      ring: lCH(0.6, 0.1, 10),
      chart1: l(0.6),
      chart2: lHue(0.55, 60),
      chart3: lHue(0.5, 120),
      chart4: lHue(0.45, 180),
      chart5: lHue(0.4, 240),
      sidebar: "oklch(0.988 0.003 106.5)",
      sidebarForeground: "oklch(0.153 0.006 107.1)",
      sidebarPrimary: lCH(0.55, 0.15, 20),
      sidebarPrimaryForeground: "oklch(0.982 0.018 155.826)",
      sidebarAccent: "oklch(0.966 0.005 106.5)",
      sidebarAccentForeground: "oklch(0.228 0.013 107.4)",
      sidebarBorder: "oklch(0.93 0.007 106.5)",
      sidebarRing: lCH(0.6, 0.1, 10),
    },
  };
}

const STORAGE_KEY = "venti-ui-themes";
const ACTIVE_THEME_KEY = "venti-ui-active-theme";
const ACTIVE_MODE_KEY = "venti-ui-active-mode";

export const PRESET_THEMES: Theme[] = [
  {
    id: "venti",
    name: "Venti",
    light: {
      name: "Venti Light",
      radius: "0.625rem",
      colors: {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.153 0.006 107.1)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.153 0.006 107.1)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.153 0.006 107.1)",
        primary: "oklch(0.527 0.154 150.069)",
        primaryForeground: "oklch(0.982 0.018 155.826)",
        secondary: "oklch(0.967 0.001 286.375)",
        secondaryForeground: "oklch(0.21 0.006 285.885)",
        muted: "oklch(0.966 0.005 106.5)",
        mutedForeground: "oklch(0.58 0.031 107.3)",
        accent: "oklch(0.966 0.005 106.5)",
        accentForeground: "oklch(0.228 0.013 107.4)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.93 0.007 106.5)",
        input: "oklch(0.93 0.007 106.5)",
        ring: "oklch(0.737 0.021 106.9)",
        chart1: "oklch(0.88 0.011 106.6)",
        chart2: "oklch(0.58 0.031 107.3)",
        chart3: "oklch(0.466 0.025 107.3)",
        chart4: "oklch(0.394 0.023 107.4)",
        chart5: "oklch(0.286 0.016 107.4)",
        sidebar: "oklch(0.988 0.003 106.5)",
        sidebarForeground: "oklch(0.153 0.006 107.1)",
        sidebarPrimary: "oklch(0.627 0.194 149.214)",
        sidebarPrimaryForeground: "oklch(0.982 0.018 155.826)",
        sidebarAccent: "oklch(0.966 0.005 106.5)",
        sidebarAccentForeground: "oklch(0.228 0.013 107.4)",
        sidebarBorder: "oklch(0.93 0.007 106.5)",
        sidebarRing: "oklch(0.737 0.021 106.9)",
      },
    },
    dark: {
      name: "Venti Dark",
      radius: "0.625rem",
      colors: {
        background: "oklab(15.309000000000001% -0.00185 0.00598)",
        foreground: "oklch(0.988 0.003 106.5)",
        card: "oklch(0.228 0.013 107.4)",
        cardForeground: "oklch(0.988 0.003 106.5)",
        popover: "oklch(0.228 0.013 107.4)",
        popoverForeground: "oklch(0.988 0.003 106.5)",
        primary: "oklch(0.448 0.119 151.328)",
        primaryForeground: "oklch(0.982 0.018 155.826)",
        secondary: "oklch(0.274 0.006 286.033)",
        secondaryForeground: "oklch(0.985 0 0)",
        muted: "oklch(0.286 0.016 107.4)",
        mutedForeground: "oklch(0.737 0.021 106.9)",
        accent: "oklch(0.286 0.016 107.4)",
        accentForeground: "oklch(0.988 0.003 106.5)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.58 0.031 107.3)",
        chart1: "oklch(0.88 0.011 106.6)",
        chart2: "oklch(0.58 0.031 107.3)",
        chart3: "oklch(0.466 0.025 107.3)",
        chart4: "oklch(0.394 0.023 107.4)",
        chart5: "oklch(0.286 0.016 107.4)",
        sidebar: "oklch(0.228 0.013 107.4)",
        sidebarForeground: "oklch(0.988 0.003 106.5)",
        sidebarPrimary: "oklch(0.723 0.219 149.579)",
        sidebarPrimaryForeground: "oklch(0.982 0.018 155.826)",
        sidebarAccent: "oklch(0.286 0.016 107.4)",
        sidebarAccentForeground: "oklch(0.988 0.003 106.5)",
        sidebarBorder: "oklch(1 0 0 / 10%)",
        sidebarRing: "oklch(0.58 0.031 107.3)",
      },
    },
  },
  {
    id: "midnight",
    name: "Midnight",
    light: {
      name: "Midnight Light",
      radius: "0.75rem",
      colors: {
        background: "oklch(0.995 0.01 275)",
        foreground: "oklch(0.15 0.03 275)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.15 0.03 275)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.15 0.03 275)",
        primary: "oklch(0.45 0.18 275)",
        primaryForeground: "oklch(0.985 0.01 275)",
        secondary: "oklch(0.94 0.02 275)",
        secondaryForeground: "oklch(0.25 0.04 275)",
        muted: "oklch(0.96 0.01 275)",
        mutedForeground: "oklch(0.55 0.03 275)",
        accent: "oklch(0.94 0.02 275)",
        accentForeground: "oklch(0.25 0.04 275)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.9 0.015 275)",
        input: "oklch(0.9 0.015 275)",
        ring: "oklch(0.55 0.15 275)",
        chart1: "oklch(0.55 0.15 275)",
        chart2: "oklch(0.5 0.12 295)",
        chart3: "oklch(0.45 0.1 255)",
        chart4: "oklch(0.5 0.1 315)",
        chart5: "oklch(0.45 0.12 235)",
        sidebar: "oklch(0.985 0.005 275)",
        sidebarForeground: "oklch(0.15 0.03 275)",
        sidebarPrimary: "oklch(0.45 0.18 275)",
        sidebarPrimaryForeground: "oklch(0.985 0.01 275)",
        sidebarAccent: "oklch(0.94 0.02 275)",
        sidebarAccentForeground: "oklch(0.25 0.04 275)",
        sidebarBorder: "oklch(0.9 0.015 275)",
        sidebarRing: "oklch(0.55 0.15 275)",
      },
    },
    dark: {
      name: "Midnight Dark",
      radius: "0.75rem",
      colors: {
        background: "oklch(0.12 0.02 275)",
        foreground: "oklch(0.95 0.01 275)",
        card: "oklch(0.18 0.025 275)",
        cardForeground: "oklch(0.95 0.01 275)",
        popover: "oklch(0.18 0.025 275)",
        popoverForeground: "oklch(0.95 0.01 275)",
        primary: "oklch(0.6 0.18 275)",
        primaryForeground: "oklch(0.12 0.02 275)",
        secondary: "oklch(0.25 0.03 275)",
        secondaryForeground: "oklch(0.95 0.01 275)",
        muted: "oklch(0.22 0.02 275)",
        mutedForeground: "oklch(0.6 0.03 275)",
        accent: "oklch(0.25 0.03 275)",
        accentForeground: "oklch(0.95 0.01 275)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.6 0.15 275)",
        chart1: "oklch(0.6 0.15 275)",
        chart2: "oklch(0.55 0.12 295)",
        chart3: "oklch(0.5 0.1 255)",
        chart4: "oklch(0.55 0.1 315)",
        chart5: "oklch(0.5 0.12 235)",
        sidebar: "oklch(0.15 0.02 275)",
        sidebarForeground: "oklch(0.95 0.01 275)",
        sidebarPrimary: "oklch(0.6 0.18 275)",
        sidebarPrimaryForeground: "oklch(0.12 0.02 275)",
        sidebarAccent: "oklch(0.22 0.02 275)",
        sidebarAccentForeground: "oklch(0.95 0.01 275)",
        sidebarBorder: "oklch(1 0 0 / 10%)",
        sidebarRing: "oklch(0.6 0.15 275)",
      },
    },
  },
  {
    id: "sunset",
    name: "Sunset",
    light: {
      name: "Sunset Light",
      radius: "0.5rem",
      colors: {
        background: "oklch(0.995 0.01 70)",
        foreground: "oklch(0.15 0.03 30)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.15 0.03 30)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.15 0.03 30)",
        primary: "oklch(0.55 0.18 35)",
        primaryForeground: "oklch(0.985 0.01 35)",
        secondary: "oklch(0.94 0.02 35)",
        secondaryForeground: "oklch(0.25 0.04 35)",
        muted: "oklch(0.96 0.01 35)",
        mutedForeground: "oklch(0.55 0.03 35)",
        accent: "oklch(0.92 0.04 35)",
        accentForeground: "oklch(0.25 0.04 35)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.9 0.015 35)",
        input: "oklch(0.9 0.015 35)",
        ring: "oklch(0.6 0.15 35)",
        chart1: "oklch(0.6 0.15 35)",
        chart2: "oklch(0.55 0.12 15)",
        chart3: "oklch(0.5 0.1 55)",
        chart4: "oklch(0.55 0.1 75)",
        chart5: "oklch(0.5 0.12 0)",
        sidebar: "oklch(0.985 0.005 35)",
        sidebarForeground: "oklch(0.15 0.03 30)",
        sidebarPrimary: "oklch(0.55 0.18 35)",
        sidebarPrimaryForeground: "oklch(0.985 0.01 35)",
        sidebarAccent: "oklch(0.94 0.02 35)",
        sidebarAccentForeground: "oklch(0.25 0.04 35)",
        sidebarBorder: "oklch(0.9 0.015 35)",
        sidebarRing: "oklch(0.6 0.15 35)",
      },
    },
    dark: {
      name: "Sunset Dark",
      radius: "0.5rem",
      colors: {
        background: "oklch(0.12 0.02 35)",
        foreground: "oklch(0.95 0.01 35)",
        card: "oklch(0.18 0.025 35)",
        cardForeground: "oklch(0.95 0.01 35)",
        popover: "oklch(0.18 0.025 35)",
        popoverForeground: "oklch(0.95 0.01 35)",
        primary: "oklch(0.6 0.18 35)",
        primaryForeground: "oklch(0.12 0.02 35)",
        secondary: "oklch(0.25 0.03 35)",
        secondaryForeground: "oklch(0.95 0.01 35)",
        muted: "oklch(0.22 0.02 35)",
        mutedForeground: "oklch(0.6 0.03 35)",
        accent: "oklch(0.28 0.04 35)",
        accentForeground: "oklch(0.95 0.01 35)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.6 0.15 35)",
        chart1: "oklch(0.6 0.15 35)",
        chart2: "oklch(0.55 0.12 15)",
        chart3: "oklch(0.5 0.1 55)",
        chart4: "oklch(0.55 0.1 75)",
        chart5: "oklch(0.5 0.12 0)",
        sidebar: "oklch(0.15 0.02 35)",
        sidebarForeground: "oklch(0.95 0.01 35)",
        sidebarPrimary: "oklch(0.6 0.18 35)",
        sidebarPrimaryForeground: "oklch(0.12 0.02 35)",
        sidebarAccent: "oklch(0.22 0.02 35)",
        sidebarAccentForeground: "oklch(0.95 0.01 35)",
        sidebarBorder: "oklch(1 0 0 / 10%)",
        sidebarRing: "oklch(0.6 0.15 35)",
      },
    },
  },
  {
    id: "ocean",
    name: "Ocean",
    light: {
      name: "Ocean Light",
      radius: "0.625rem",
      colors: {
        background: "oklch(0.995 0.01 200)",
        foreground: "oklch(0.15 0.03 230)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.15 0.03 230)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.15 0.03 230)",
        primary: "oklch(0.5 0.16 220)",
        primaryForeground: "oklch(0.985 0.01 220)",
        secondary: "oklch(0.94 0.02 220)",
        secondaryForeground: "oklch(0.25 0.04 220)",
        muted: "oklch(0.96 0.01 220)",
        mutedForeground: "oklch(0.55 0.03 220)",
        accent: "oklch(0.93 0.025 220)",
        accentForeground: "oklch(0.25 0.04 220)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.9 0.015 220)",
        input: "oklch(0.9 0.015 220)",
        ring: "oklch(0.55 0.14 220)",
        chart1: "oklch(0.55 0.14 220)",
        chart2: "oklch(0.5 0.12 240)",
        chart3: "oklch(0.45 0.1 200)",
        chart4: "oklch(0.5 0.1 260)",
        chart5: "oklch(0.45 0.12 180)",
        sidebar: "oklch(0.985 0.005 200)",
        sidebarForeground: "oklch(0.15 0.03 230)",
        sidebarPrimary: "oklch(0.5 0.16 220)",
        sidebarPrimaryForeground: "oklch(0.985 0.01 220)",
        sidebarAccent: "oklch(0.94 0.02 220)",
        sidebarAccentForeground: "oklch(0.25 0.04 220)",
        sidebarBorder: "oklch(0.9 0.015 220)",
        sidebarRing: "oklch(0.55 0.14 220)",
      },
    },
    dark: {
      name: "Ocean Dark",
      radius: "0.625rem",
      colors: {
        background: "oklch(0.1 0.025 220)",
        foreground: "oklch(0.95 0.01 220)",
        card: "oklch(0.16 0.03 220)",
        cardForeground: "oklch(0.95 0.01 220)",
        popover: "oklch(0.16 0.03 220)",
        popoverForeground: "oklch(0.95 0.01 220)",
        primary: "oklch(0.6 0.16 220)",
        primaryForeground: "oklch(0.1 0.025 220)",
        secondary: "oklch(0.24 0.035 220)",
        secondaryForeground: "oklch(0.95 0.01 220)",
        muted: "oklch(0.2 0.025 220)",
        mutedForeground: "oklch(0.6 0.03 220)",
        accent: "oklch(0.24 0.035 220)",
        accentForeground: "oklch(0.95 0.01 220)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.55 0.14 220)",
        chart1: "oklch(0.55 0.14 220)",
        chart2: "oklch(0.5 0.12 240)",
        chart3: "oklch(0.45 0.1 200)",
        chart4: "oklch(0.5 0.1 260)",
        chart5: "oklch(0.45 0.12 180)",
        sidebar: "oklch(0.13 0.025 220)",
        sidebarForeground: "oklch(0.95 0.01 220)",
        sidebarPrimary: "oklch(0.6 0.16 220)",
        sidebarPrimaryForeground: "oklch(0.1 0.025 220)",
        sidebarAccent: "oklch(0.2 0.025 220)",
        sidebarAccentForeground: "oklch(0.95 0.01 220)",
        sidebarBorder: "oklch(1 0 0 / 10%)",
        sidebarRing: "oklch(0.55 0.14 220)",
      },
    },
  },
  {
    id: "forest",
    name: "Forest",
    light: {
      name: "Forest Light",
      radius: "0.5rem",
      colors: {
        background: "oklch(0.995 0.01 130)",
        foreground: "oklch(0.15 0.03 130)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.15 0.03 130)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.15 0.03 130)",
        primary: "oklch(0.5 0.16 145)",
        primaryForeground: "oklch(0.985 0.01 145)",
        secondary: "oklch(0.94 0.02 130)",
        secondaryForeground: "oklch(0.25 0.04 130)",
        muted: "oklch(0.96 0.01 130)",
        mutedForeground: "oklch(0.55 0.03 130)",
        accent: "oklch(0.93 0.025 130)",
        accentForeground: "oklch(0.25 0.04 130)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.9 0.015 130)",
        input: "oklch(0.9 0.015 130)",
        ring: "oklch(0.55 0.14 145)",
        chart1: "oklch(0.55 0.14 145)",
        chart2: "oklch(0.5 0.12 165)",
        chart3: "oklch(0.45 0.1 125)",
        chart4: "oklch(0.5 0.1 185)",
        chart5: "oklch(0.45 0.12 105)",
        sidebar: "oklch(0.985 0.005 130)",
        sidebarForeground: "oklch(0.15 0.03 130)",
        sidebarPrimary: "oklch(0.5 0.16 145)",
        sidebarPrimaryForeground: "oklch(0.985 0.01 145)",
        sidebarAccent: "oklch(0.94 0.02 130)",
        sidebarAccentForeground: "oklch(0.25 0.04 130)",
        sidebarBorder: "oklch(0.9 0.015 130)",
        sidebarRing: "oklch(0.55 0.14 145)",
      },
    },
    dark: {
      name: "Forest Dark",
      radius: "0.5rem",
      colors: {
        background: "oklch(0.1 0.025 130)",
        foreground: "oklch(0.95 0.01 130)",
        card: "oklch(0.16 0.03 130)",
        cardForeground: "oklch(0.95 0.01 130)",
        popover: "oklch(0.16 0.03 130)",
        popoverForeground: "oklch(0.95 0.01 130)",
        primary: "oklch(0.6 0.16 145)",
        primaryForeground: "oklch(0.1 0.025 130)",
        secondary: "oklch(0.24 0.035 130)",
        secondaryForeground: "oklch(0.95 0.01 130)",
        muted: "oklch(0.2 0.025 130)",
        mutedForeground: "oklch(0.6 0.03 130)",
        accent: "oklch(0.24 0.035 130)",
        accentForeground: "oklch(0.95 0.01 130)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.55 0.14 145)",
        chart1: "oklch(0.55 0.14 145)",
        chart2: "oklch(0.5 0.12 165)",
        chart3: "oklch(0.45 0.1 125)",
        chart4: "oklch(0.5 0.1 185)",
        chart5: "oklch(0.45 0.12 105)",
        sidebar: "oklch(0.13 0.025 130)",
        sidebarForeground: "oklch(0.95 0.01 130)",
        sidebarPrimary: "oklch(0.6 0.16 145)",
        sidebarPrimaryForeground: "oklch(0.1 0.025 130)",
        sidebarAccent: "oklch(0.2 0.025 130)",
        sidebarAccentForeground: "oklch(0.95 0.01 130)",
        sidebarBorder: "oklch(1 0 0 / 10%)",
        sidebarRing: "oklch(0.55 0.14 145)",
      },
    },
  },
  {
    id: "monochrome",
    name: "Monochrome",
    light: {
      name: "Monochrome Light",
      radius: "0.375rem",
      colors: {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.15 0 0)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.15 0 0)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.15 0 0)",
        primary: "oklch(0.25 0 0)",
        primaryForeground: "oklch(0.95 0 0)",
        secondary: "oklch(0.92 0 0)",
        secondaryForeground: "oklch(0.25 0 0)",
        muted: "oklch(0.95 0 0)",
        mutedForeground: "oklch(0.5 0 0)",
        accent: "oklch(0.92 0 0)",
        accentForeground: "oklch(0.25 0 0)",
        destructive: "oklch(0.5 0.15 30)",
        border: "oklch(0.85 0 0)",
        input: "oklch(0.85 0 0)",
        ring: "oklch(0.35 0 0)",
        chart1: "oklch(0.5 0 0)",
        chart2: "oklch(0.4 0 0)",
        chart3: "oklch(0.6 0 0)",
        chart4: "oklch(0.35 0 0)",
        chart5: "oklch(0.55 0 0)",
        sidebar: "oklch(0.985 0 0)",
        sidebarForeground: "oklch(0.15 0 0)",
        sidebarPrimary: "oklch(0.25 0 0)",
        sidebarPrimaryForeground: "oklch(0.95 0 0)",
        sidebarAccent: "oklch(0.92 0 0)",
        sidebarAccentForeground: "oklch(0.25 0 0)",
        sidebarBorder: "oklch(0.85 0 0)",
        sidebarRing: "oklch(0.35 0 0)",
      },
    },
    dark: {
      name: "Monochrome Dark",
      radius: "0.375rem",
      colors: {
        background: "oklch(0.12 0 0)",
        foreground: "oklch(0.92 0 0)",
        card: "oklch(0.17 0 0)",
        cardForeground: "oklch(0.92 0 0)",
        popover: "oklch(0.17 0 0)",
        popoverForeground: "oklch(0.92 0 0)",
        primary: "oklch(0.85 0 0)",
        primaryForeground: "oklch(0.12 0 0)",
        secondary: "oklch(0.22 0 0)",
        secondaryForeground: "oklch(0.92 0 0)",
        muted: "oklch(0.2 0 0)",
        mutedForeground: "oklch(0.6 0 0)",
        accent: "oklch(0.22 0 0)",
        accentForeground: "oklch(0.92 0 0)",
        destructive: "oklch(0.65 0.15 30)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.75 0 0)",
        chart1: "oklch(0.65 0 0)",
        chart2: "oklch(0.55 0 0)",
        chart3: "oklch(0.75 0 0)",
        chart4: "oklch(0.5 0 0)",
        chart5: "oklch(0.7 0 0)",
        sidebar: "oklch(0.14 0 0)",
        sidebarForeground: "oklch(0.92 0 0)",
        sidebarPrimary: "oklch(0.85 0 0)",
        sidebarPrimaryForeground: "oklch(0.12 0 0)",
        sidebarAccent: "oklch(0.2 0 0)",
        sidebarAccentForeground: "oklch(0.92 0 0)",
        sidebarBorder: "oklch(1 0 0 / 10%)",
        sidebarRing: "oklch(0.75 0 0)",
      },
    },
  },
  {
    id: "rose",
    name: "Rose",
    light: {
      name: "Rose Light",
      radius: "0.75rem",
      colors: {
        background: "oklch(0.995 0.01 10)",
        foreground: "oklch(0.15 0.03 350)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.15 0.03 350)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.15 0.03 350)",
        primary: "oklch(0.5 0.18 350)",
        primaryForeground: "oklch(0.985 0.01 350)",
        secondary: "oklch(0.94 0.02 355)",
        secondaryForeground: "oklch(0.25 0.04 350)",
        muted: "oklch(0.96 0.01 355)",
        mutedForeground: "oklch(0.55 0.03 350)",
        accent: "oklch(0.93 0.04 355)",
        accentForeground: "oklch(0.25 0.04 350)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.9 0.015 355)",
        input: "oklch(0.9 0.015 355)",
        ring: "oklch(0.55 0.15 350)",
        chart1: "oklch(0.55 0.15 350)",
        chart2: "oklch(0.5 0.12 10)",
        chart3: "oklch(0.45 0.1 330)",
        chart4: "oklch(0.5 0.1 30)",
        chart5: "oklch(0.45 0.12 310)",
        sidebar: "oklch(0.985 0.005 355)",
        sidebarForeground: "oklch(0.15 0.03 350)",
        sidebarPrimary: "oklch(0.5 0.18 350)",
        sidebarPrimaryForeground: "oklch(0.985 0.01 350)",
        sidebarAccent: "oklch(0.94 0.02 355)",
        sidebarAccentForeground: "oklch(0.25 0.04 350)",
        sidebarBorder: "oklch(0.9 0.015 355)",
        sidebarRing: "oklch(0.55 0.15 350)",
      },
    },
    dark: {
      name: "Rose Dark",
      radius: "0.75rem",
      colors: {
        background: "oklch(0.12 0.02 355)",
        foreground: "oklch(0.95 0.01 355)",
        card: "oklch(0.18 0.025 355)",
        cardForeground: "oklch(0.95 0.01 355)",
        popover: "oklch(0.18 0.025 355)",
        popoverForeground: "oklch(0.95 0.01 355)",
        primary: "oklch(0.6 0.18 350)",
        primaryForeground: "oklch(0.12 0.02 355)",
        secondary: "oklch(0.25 0.03 355)",
        secondaryForeground: "oklch(0.95 0.01 355)",
        muted: "oklch(0.22 0.02 355)",
        mutedForeground: "oklch(0.6 0.03 355)",
        accent: "oklch(0.26 0.04 355)",
        accentForeground: "oklch(0.95 0.01 355)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.6 0.15 350)",
        chart1: "oklch(0.6 0.15 350)",
        chart2: "oklch(0.55 0.12 10)",
        chart3: "oklch(0.5 0.1 330)",
        chart4: "oklch(0.55 0.1 30)",
        chart5: "oklch(0.5 0.12 310)",
        sidebar: "oklch(0.15 0.02 355)",
        sidebarForeground: "oklch(0.95 0.01 355)",
        sidebarPrimary: "oklch(0.6 0.18 350)",
        sidebarPrimaryForeground: "oklch(0.12 0.02 355)",
        sidebarAccent: "oklch(0.22 0.02 355)",
        sidebarAccentForeground: "oklch(0.95 0.01 355)",
        sidebarBorder: "oklch(1 0 0 / 10%)",
        sidebarRing: "oklch(0.6 0.15 350)",
      },
    },
  },
  {
    id: "amber",
    name: "Amber",
    light: {
      name: "Amber Light",
      radius: "0.5rem",
      colors: {
        background: "oklch(0.995 0.01 80)",
        foreground: "oklch(0.15 0.03 60)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.15 0.03 60)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.15 0.03 60)",
        primary: "oklch(0.55 0.18 65)",
        primaryForeground: "oklch(0.985 0.01 65)",
        secondary: "oklch(0.94 0.02 70)",
        secondaryForeground: "oklch(0.25 0.04 65)",
        muted: "oklch(0.96 0.01 70)",
        mutedForeground: "oklch(0.55 0.03 65)",
        accent: "oklch(0.92 0.05 70)",
        accentForeground: "oklch(0.25 0.04 65)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.9 0.015 70)",
        input: "oklch(0.9 0.015 70)",
        ring: "oklch(0.6 0.15 65)",
        chart1: "oklch(0.6 0.15 65)",
        chart2: "oklch(0.55 0.12 85)",
        chart3: "oklch(0.5 0.1 45)",
        chart4: "oklch(0.55 0.1 105)",
        chart5: "oklch(0.5 0.12 25)",
        sidebar: "oklch(0.985 0.005 75)",
        sidebarForeground: "oklch(0.15 0.03 60)",
        sidebarPrimary: "oklch(0.55 0.18 65)",
        sidebarPrimaryForeground: "oklch(0.985 0.01 65)",
        sidebarAccent: "oklch(0.94 0.02 70)",
        sidebarAccentForeground: "oklch(0.25 0.04 65)",
        sidebarBorder: "oklch(0.9 0.015 70)",
        sidebarRing: "oklch(0.6 0.15 65)",
      },
    },
    dark: {
      name: "Amber Dark",
      radius: "0.5rem",
      colors: {
        background: "oklch(0.12 0.02 70)",
        foreground: "oklch(0.95 0.01 70)",
        card: "oklch(0.18 0.025 70)",
        cardForeground: "oklch(0.95 0.01 70)",
        popover: "oklch(0.18 0.025 70)",
        popoverForeground: "oklch(0.95 0.01 70)",
        primary: "oklch(0.6 0.18 65)",
        primaryForeground: "oklch(0.12 0.02 70)",
        secondary: "oklch(0.25 0.03 70)",
        secondaryForeground: "oklch(0.95 0.01 70)",
        muted: "oklch(0.22 0.02 70)",
        mutedForeground: "oklch(0.6 0.03 70)",
        accent: "oklch(0.27 0.04 70)",
        accentForeground: "oklch(0.95 0.01 70)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.6 0.15 65)",
        chart1: "oklch(0.6 0.15 65)",
        chart2: "oklch(0.55 0.12 85)",
        chart3: "oklch(0.5 0.1 45)",
        chart4: "oklch(0.55 0.1 105)",
        chart5: "oklch(0.5 0.12 25)",
        sidebar: "oklch(0.15 0.02 70)",
        sidebarForeground: "oklch(0.95 0.01 70)",
        sidebarPrimary: "oklch(0.6 0.18 65)",
        sidebarPrimaryForeground: "oklch(0.12 0.02 70)",
        sidebarAccent: "oklch(0.22 0.02 70)",
        sidebarAccentForeground: "oklch(0.95 0.01 70)",
        sidebarBorder: "oklch(1 0 0 / 10%)",
        sidebarRing: "oklch(0.6 0.15 65)",
      },
    },
  },
  {
    id: "slate",
    name: "Slate",
    light: {
      name: "Slate Light",
      radius: "0.375rem",
      colors: {
        background: "oklch(0.995 0.003 240)",
        foreground: "oklch(0.15 0.01 240)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.15 0.01 240)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.15 0.01 240)",
        primary: "oklch(0.35 0.02 240)",
        primaryForeground: "oklch(0.95 0.005 240)",
        secondary: "oklch(0.93 0.005 240)",
        secondaryForeground: "oklch(0.25 0.01 240)",
        muted: "oklch(0.95 0.005 240)",
        mutedForeground: "oklch(0.5 0.01 240)",
        accent: "oklch(0.92 0.008 240)",
        accentForeground: "oklch(0.25 0.01 240)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.88 0.005 240)",
        input: "oklch(0.88 0.005 240)",
        ring: "oklch(0.4 0.02 240)",
        chart1: "oklch(0.5 0.02 240)",
        chart2: "oklch(0.45 0.015 260)",
        chart3: "oklch(0.55 0.02 220)",
        chart4: "oklch(0.4 0.018 280)",
        chart5: "oklch(0.6 0.025 200)",
        sidebar: "oklch(0.985 0.002 240)",
        sidebarForeground: "oklch(0.15 0.01 240)",
        sidebarPrimary: "oklch(0.35 0.02 240)",
        sidebarPrimaryForeground: "oklch(0.95 0.005 240)",
        sidebarAccent: "oklch(0.93 0.005 240)",
        sidebarAccentForeground: "oklch(0.25 0.01 240)",
        sidebarBorder: "oklch(0.88 0.005 240)",
        sidebarRing: "oklch(0.4 0.02 240)",
      },
    },
    dark: {
      name: "Slate Dark",
      radius: "0.375rem",
      colors: {
        background: "oklch(0.12 0.005 240)",
        foreground: "oklch(0.93 0.005 240)",
        card: "oklch(0.17 0.008 240)",
        cardForeground: "oklch(0.93 0.005 240)",
        popover: "oklch(0.17 0.008 240)",
        popoverForeground: "oklch(0.93 0.005 240)",
        primary: "oklch(0.85 0.01 240)",
        primaryForeground: "oklch(0.12 0.005 240)",
        secondary: "oklch(0.22 0.008 240)",
        secondaryForeground: "oklch(0.93 0.005 240)",
        muted: "oklch(0.2 0.006 240)",
        mutedForeground: "oklch(0.6 0.008 240)",
        accent: "oklch(0.23 0.01 240)",
        accentForeground: "oklch(0.93 0.005 240)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.7 0.01 240)",
        chart1: "oklch(0.65 0.015 240)",
        chart2: "oklch(0.6 0.012 260)",
        chart3: "oklch(0.7 0.015 220)",
        chart4: "oklch(0.55 0.015 280)",
        chart5: "oklch(0.75 0.02 200)",
        sidebar: "oklch(0.14 0.005 240)",
        sidebarForeground: "oklch(0.93 0.005 240)",
        sidebarPrimary: "oklch(0.85 0.01 240)",
        sidebarPrimaryForeground: "oklch(0.12 0.005 240)",
        sidebarAccent: "oklch(0.2 0.006 240)",
        sidebarAccentForeground: "oklch(0.93 0.005 240)",
        sidebarBorder: "oklch(1 0 0 / 10%)",
        sidebarRing: "oklch(0.7 0.01 240)",
      },
    },
  },
  {
    id: "violet",
    name: "Violet",
    light: {
      name: "Violet Light",
      radius: "0.75rem",
      colors: {
        background: "oklch(0.995 0.01 290)",
        foreground: "oklch(0.15 0.03 290)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.15 0.03 290)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.15 0.03 290)",
        primary: "oklch(0.48 0.18 290)",
        primaryForeground: "oklch(0.985 0.01 290)",
        secondary: "oklch(0.94 0.02 295)",
        secondaryForeground: "oklch(0.25 0.04 290)",
        muted: "oklch(0.96 0.01 295)",
        mutedForeground: "oklch(0.55 0.03 290)",
        accent: "oklch(0.93 0.035 295)",
        accentForeground: "oklch(0.25 0.04 290)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.9 0.015 295)",
        input: "oklch(0.9 0.015 295)",
        ring: "oklch(0.55 0.15 290)",
        chart1: "oklch(0.55 0.15 290)",
        chart2: "oklch(0.5 0.12 310)",
        chart3: "oklch(0.45 0.1 270)",
        chart4: "oklch(0.5 0.1 330)",
        chart5: "oklch(0.45 0.12 250)",
        sidebar: "oklch(0.985 0.005 295)",
        sidebarForeground: "oklch(0.15 0.03 290)",
        sidebarPrimary: "oklch(0.48 0.18 290)",
        sidebarPrimaryForeground: "oklch(0.985 0.01 290)",
        sidebarAccent: "oklch(0.94 0.02 295)",
        sidebarAccentForeground: "oklch(0.25 0.04 290)",
        sidebarBorder: "oklch(0.9 0.015 295)",
        sidebarRing: "oklch(0.55 0.15 290)",
      },
    },
    dark: {
      name: "Violet Dark",
      radius: "0.75rem",
      colors: {
        background: "oklch(0.12 0.025 295)",
        foreground: "oklch(0.95 0.01 295)",
        card: "oklch(0.18 0.03 295)",
        cardForeground: "oklch(0.95 0.01 295)",
        popover: "oklch(0.18 0.03 295)",
        popoverForeground: "oklch(0.95 0.01 295)",
        primary: "oklch(0.6 0.18 290)",
        primaryForeground: "oklch(0.12 0.025 295)",
        secondary: "oklch(0.25 0.03 295)",
        secondaryForeground: "oklch(0.95 0.01 295)",
        muted: "oklch(0.22 0.02 295)",
        mutedForeground: "oklch(0.6 0.03 295)",
        accent: "oklch(0.26 0.04 295)",
        accentForeground: "oklch(0.95 0.01 295)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.6 0.15 290)",
        chart1: "oklch(0.6 0.15 290)",
        chart2: "oklch(0.55 0.12 310)",
        chart3: "oklch(0.5 0.1 270)",
        chart4: "oklch(0.55 0.1 330)",
        chart5: "oklch(0.5 0.12 250)",
        sidebar: "oklch(0.15 0.02 295)",
        sidebarForeground: "oklch(0.95 0.01 295)",
        sidebarPrimary: "oklch(0.6 0.18 290)",
        sidebarPrimaryForeground: "oklch(0.12 0.025 295)",
        sidebarAccent: "oklch(0.22 0.02 295)",
        sidebarAccentForeground: "oklch(0.95 0.01 295)",
        sidebarBorder: "oklch(1 0 0 / 10%)",
        sidebarRing: "oklch(0.6 0.15 290)",
      },
    },
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    light: {
      name: "Cyberpunk Light",
      radius: "0.25rem",
      colors: {
        background: "oklch(0.995 0.01 300)",
        foreground: "oklch(0.15 0.03 320)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.15 0.03 320)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.15 0.03 320)",
        primary: "oklch(0.55 0.2 330)",
        primaryForeground: "oklch(0.985 0.01 330)",
        secondary: "oklch(0.92 0.05 280)",
        secondaryForeground: "oklch(0.25 0.04 280)",
        muted: "oklch(0.94 0.03 300)",
        mutedForeground: "oklch(0.55 0.04 300)",
        accent: "oklch(0.85 0.15 180)",
        accentForeground: "oklch(0.15 0.03 180)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.88 0.04 300)",
        input: "oklch(0.88 0.04 300)",
        ring: "oklch(0.55 0.2 330)",
        chart1: "oklch(0.6 0.18 330)",
        chart2: "oklch(0.55 0.15 280)",
        chart3: "oklch(0.5 0.12 180)",
        chart4: "oklch(0.55 0.15 30)",
        chart5: "oklch(0.5 0.12 120)",
        sidebar: "oklch(0.985 0.008 300)",
        sidebarForeground: "oklch(0.15 0.03 320)",
        sidebarPrimary: "oklch(0.55 0.2 330)",
        sidebarPrimaryForeground: "oklch(0.985 0.01 330)",
        sidebarAccent: "oklch(0.92 0.05 280)",
        sidebarAccentForeground: "oklch(0.25 0.04 280)",
        sidebarBorder: "oklch(0.88 0.04 300)",
        sidebarRing: "oklch(0.55 0.2 330)",
      },
    },
    dark: {
      name: "Cyberpunk Dark",
      radius: "0.25rem",
      colors: {
        background: "oklch(0.1 0.04 300)",
        foreground: "oklch(0.95 0.02 300)",
        card: "oklch(0.16 0.05 300)",
        cardForeground: "oklch(0.95 0.02 300)",
        popover: "oklch(0.16 0.05 300)",
        popoverForeground: "oklch(0.95 0.02 300)",
        primary: "oklch(0.65 0.2 330)",
        primaryForeground: "oklch(0.1 0.04 300)",
        secondary: "oklch(0.25 0.06 280)",
        secondaryForeground: "oklch(0.95 0.02 300)",
        muted: "oklch(0.2 0.04 300)",
        mutedForeground: "oklch(0.6 0.05 300)",
        accent: "oklch(0.5 0.15 180)",
        accentForeground: "oklch(0.95 0.02 300)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 15%)",
        input: "oklch(1 0 0 / 20%)",
        ring: "oklch(0.65 0.2 330)",
        chart1: "oklch(0.65 0.18 330)",
        chart2: "oklch(0.6 0.15 280)",
        chart3: "oklch(0.55 0.12 180)",
        chart4: "oklch(0.6 0.15 30)",
        chart5: "oklch(0.55 0.12 120)",
        sidebar: "oklch(0.13 0.04 300)",
        sidebarForeground: "oklch(0.95 0.02 300)",
        sidebarPrimary: "oklch(0.65 0.2 330)",
        sidebarPrimaryForeground: "oklch(0.1 0.04 300)",
        sidebarAccent: "oklch(0.25 0.06 280)",
        sidebarAccentForeground: "oklch(0.95 0.02 300)",
        sidebarBorder: "oklch(1 0 0 / 15%)",
        sidebarRing: "oklch(0.65 0.2 330)",
      },
    },
  },
  {
    id: "coffee",
    name: "Coffee",
    light: {
      name: "Coffee Light",
      radius: "0.625rem",
      colors: {
        background: "oklch(0.995 0.008 80)",
        foreground: "oklch(0.18 0.03 50)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.18 0.03 50)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.18 0.03 50)",
        primary: "oklch(0.4 0.08 50)",
        primaryForeground: "oklch(0.98 0.005 50)",
        secondary: "oklch(0.93 0.01 55)",
        secondaryForeground: "oklch(0.25 0.02 50)",
        muted: "oklch(0.95 0.008 55)",
        mutedForeground: "oklch(0.5 0.02 50)",
        accent: "oklch(0.9 0.015 55)",
        accentForeground: "oklch(0.25 0.02 50)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.88 0.01 55)",
        input: "oklch(0.88 0.01 55)",
        ring: "oklch(0.45 0.07 50)",
        chart1: "oklch(0.5 0.07 50)",
        chart2: "oklch(0.45 0.05 70)",
        chart3: "oklch(0.55 0.06 30)",
        chart4: "oklch(0.4 0.05 90)",
        chart5: "oklch(0.6 0.08 10)",
        sidebar: "oklch(0.985 0.005 55)",
        sidebarForeground: "oklch(0.18 0.03 50)",
        sidebarPrimary: "oklch(0.4 0.08 50)",
        sidebarPrimaryForeground: "oklch(0.98 0.005 50)",
        sidebarAccent: "oklch(0.93 0.01 55)",
        sidebarAccentForeground: "oklch(0.25 0.02 50)",
        sidebarBorder: "oklch(0.88 0.01 55)",
        sidebarRing: "oklch(0.45 0.07 50)",
      },
    },
    dark: {
      name: "Coffee Dark",
      radius: "0.625rem",
      colors: {
        background: "oklch(0.14 0.015 50)",
        foreground: "oklch(0.92 0.008 50)",
        card: "oklch(0.2 0.02 50)",
        cardForeground: "oklch(0.92 0.008 50)",
        popover: "oklch(0.2 0.02 50)",
        popoverForeground: "oklch(0.92 0.008 50)",
        primary: "oklch(0.65 0.1 50)",
        primaryForeground: "oklch(0.14 0.015 50)",
        secondary: "oklch(0.26 0.02 50)",
        secondaryForeground: "oklch(0.92 0.008 50)",
        muted: "oklch(0.22 0.015 50)",
        mutedForeground: "oklch(0.6 0.02 50)",
        accent: "oklch(0.28 0.025 50)",
        accentForeground: "oklch(0.92 0.008 50)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.65 0.08 50)",
        chart1: "oklch(0.65 0.08 50)",
        chart2: "oklch(0.6 0.06 70)",
        chart3: "oklch(0.7 0.07 30)",
        chart4: "oklch(0.55 0.06 90)",
        chart5: "oklch(0.75 0.09 10)",
        sidebar: "oklch(0.17 0.015 50)",
        sidebarForeground: "oklch(0.92 0.008 50)",
        sidebarPrimary: "oklch(0.65 0.1 50)",
        sidebarPrimaryForeground: "oklch(0.14 0.015 50)",
        sidebarAccent: "oklch(0.22 0.015 50)",
        sidebarAccentForeground: "oklch(0.92 0.008 50)",
        sidebarBorder: "oklch(1 0 0 / 10%)",
        sidebarRing: "oklch(0.65 0.08 50)",
      },
    },
  },
];

function loadThemes(): Theme[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

function saveThemes(themes: Theme[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(themes));
  } catch {}
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme?: Theme;
}) {
  const [mode, setModeState] = React.useState<ThemeMode>("dark");
  const [themeId, setThemeId] = React.useState<string>(
    initialTheme?.id ?? "venti"
  );
  const [customThemes, setCustomThemes] = React.useState<Theme[]>([]);

  React.useEffect(() => {
    setCustomThemes(loadThemes());
    const storedMode = localStorage.getItem(ACTIVE_MODE_KEY) as ThemeMode | null;
    const storedThemeId = localStorage.getItem(ACTIVE_THEME_KEY);
    if (storedMode) setModeState(storedMode);
    if (storedThemeId) setThemeId(storedThemeId);
  }, []);

  const allThemes = React.useMemo(
    () => [...PRESET_THEMES, ...customThemes],
    [customThemes]
  );

  const currentTheme = React.useMemo(
    () => allThemes.find((t) => t.id === themeId) ?? allThemes[0],
    [allThemes, themeId]
  );

  const currentDefinition = React.useMemo(
    () => (mode === "dark" ? currentTheme.dark : currentTheme.light),
    [currentTheme, mode]
  );

  React.useEffect(() => {
    applyThemeToDocument(currentDefinition, mode);
  }, [currentDefinition, mode]);

  const setMode = React.useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem(ACTIVE_MODE_KEY, newMode);
  }, []);

  const setTheme = React.useCallback((theme: Theme) => {
    setThemeId(theme.id);
    localStorage.setItem(ACTIVE_THEME_KEY, theme.id);
  }, []);

  const saveTheme = React.useCallback((theme: Theme) => {
    setCustomThemes((prev) => {
      const existing = prev.findIndex((t) => t.id === theme.id);
      let next: Theme[];
      if (existing >= 0) {
        next = [...prev];
        next[existing] = theme;
      } else {
        next = [...prev, theme];
      }
      saveThemes(next);
      return next;
    });
  }, []);

  const deleteTheme = React.useCallback((id: string) => {
    setCustomThemes((prev) => {
      const next = prev.filter((t) => t.id !== id);
      saveThemes(next);
      return next;
    });
  }, []);

  const updateDefinition = React.useCallback(
    (updatedMode: ThemeMode, definition: ThemeDefinition) => {
      setThemeId(currentTheme.id);
      const updated: Theme = {
        ...currentTheme,
        [updatedMode]: definition,
      };
      if (currentTheme.id.startsWith("preset_") || PRESET_THEMES.some((t) => t.id === currentTheme.id)) {
        const newId = `custom_${Date.now()}`;
        const newTheme: Theme = {
          ...updated,
          id: newId,
          name: `${updated.name} (Custom)`,
        };
        setCustomThemes((prev) => {
          const next = [...prev, newTheme];
          saveThemes(next);
          return next;
        });
        setThemeId(newId);
        localStorage.setItem(ACTIVE_THEME_KEY, newId);
      } else {
        saveTheme(updated);
      }
    },
    [currentTheme, saveTheme]
  );

  const resetToPreset = React.useCallback(
    (presetId: string) => {
      const preset = PRESET_THEMES.find((t) => t.id === presetId);
      if (preset) {
        setThemeId(preset.id);
        localStorage.setItem(ACTIVE_THEME_KEY, preset.id);
      }
    },
    []
  );

  const exportTheme = React.useCallback(() => {
    return {
      json: JSON.stringify(currentTheme, null, 2),
      css: themeToCSS(currentTheme),
    };
  }, [currentTheme]);

  const importTheme = React.useCallback((json: string): boolean => {
    try {
      const parsed: Theme = JSON.parse(json);
      if (!parsed.id || !parsed.name || !parsed.light || !parsed.dark)
        return false;
      parsed.id = `imported_${Date.now()}`;
      saveTheme(parsed);
      setThemeId(parsed.id);
      localStorage.setItem(ACTIVE_THEME_KEY, parsed.id);
      return true;
    } catch {
      return false;
    }
  }, [saveTheme]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme: currentTheme,
      mode,
      setMode,
      setTheme,
      customThemes,
      saveTheme,
      deleteTheme,
      updateDefinition,
      resetToPreset,
      exportTheme,
      importTheme,
    }),
    [
      currentTheme,
      mode,
      setMode,
      setTheme,
      customThemes,
      saveTheme,
      deleteTheme,
      updateDefinition,
      resetToPreset,
      exportTheme,
      importTheme,
    ]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
