"use client";

import * as React from "react";
import {
  IconPalette,
  IconBorderRadius,
  IconEye,
  IconFileExport,
  IconWand,
  IconPlus,
  IconTrash,
  IconCopy,
  IconCheck,
  IconSun,
  IconMoon,
  IconDownload,
  IconUpload,
  IconArrowsShuffle,
  IconDeviceFloppy,
  IconPencil,
  IconX,
  IconChevronRight,
  IconSearch,
  IconRefresh,
  IconSparkles,
  IconTag,
  IconFolderOpen,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useTheme,
  PRESET_THEMES,
  oklchToHex,
  hexToOklch,
  generateThemeFromBase,
  type ThemeColors,
  type ThemeDefinition,
  type ThemeMode,
  type Theme,
} from "@/lib/theme-engine";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/card";
import { Input } from "@/components/input";
import { Badge } from "@/components/badge";
import { Alert } from "@/components/alert";
import { Progress } from "@/components/progress";
import { Switch } from "@/components/switch";
import { Checkbox } from "@/components/checkbox";
import { Radio, RadioGroup } from "@/components/radio";
import { Tabs } from "@/components/tabs";
import { Avatar } from "@/components/avatar";
import { Divider } from "@/components/divider";
import { Kbd } from "@/components/kbd";
import { Blockquote } from "@/components/blockquote";
import { Spinner } from "@/components/spinners";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const COLOR_GROUPS: { label: string; keys: (keyof ThemeColors)[]; description?: string }[] = [
  {
    label: "Surface",
    description: "Background layers and text on surfaces",
    keys: [
      "background",
      "foreground",
      "card",
      "cardForeground",
      "popover",
      "popoverForeground",
    ],
  },
  {
    label: "Brand",
    description: "Primary and secondary action colors",
    keys: [
      "primary",
      "primaryForeground",
      "secondary",
      "secondaryForeground",
    ],
  },
  {
    label: "States",
    description: "Interactive states and feedback colors",
    keys: [
      "muted",
      "mutedForeground",
      "accent",
      "accentForeground",
      "destructive",
    ],
  },
  {
    label: "Borders & Inputs",
    description: "Structural boundaries and form elements",
    keys: ["border", "input", "ring"],
  },
  {
    label: "Charts",
    description: "Data visualization color tokens",
    keys: ["chart1", "chart2", "chart3", "chart4", "chart5"],
  },
  {
    label: "Sidebar",
    description: "Navigation sidebar color tokens",
    keys: [
      "sidebar",
      "sidebarForeground",
      "sidebarPrimary",
      "sidebarPrimaryForeground",
      "sidebarAccent",
      "sidebarAccentForeground",
      "sidebarBorder",
      "sidebarRing",
    ],
  },
];

/* ─── Color Swatch ─── */
function ColorSwatch({ color, size = "md", ring = false }: { color: string; size?: "sm" | "md" | "lg" | "xl"; ring?: boolean }) {
  const hex = React.useMemo(() => {
    try { return oklchToHex(color); } catch { return "#000000"; }
  }, [color]);
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-7 w-7",
    lg: "h-10 w-10",
    xl: "h-14 w-14",
  };
  return (
    <div
      className={cn(
        sizeClasses[size],
        "shrink-0 rounded-lg border shadow-sm transition-transform duration-200",
        ring && "ring-2 ring-offset-2 ring-offset-background ring-primary/40"
      )}
      style={{ backgroundColor: hex, borderColor: hex + "40" }}
    />
  );
}

/* ─── Color Editor ─── */
function ColorEditor({
  label,
  value,
  onChange,
  index,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  index: number;
}) {
  const [copied, setCopied] = React.useState(false);
  const hex = React.useMemo(() => {
    try { return oklchToHex(value); } catch { return "#000000"; }
  }, [value]);

  const handleHexPick = (newHex: string) => {
    try { onChange(hexToOklch(newHex)); } catch {}
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const displayLabel = label
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase());

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3, ease: EASE_OUT_EXPO }}
      className="group relative flex items-center gap-3 rounded-xl border border-border/50 bg-card p-2.5 transition-all duration-200 hover:border-border hover:shadow-md hover:shadow-primary/5 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10"
    >
      <ColorSwatch color={value} size="md" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-foreground leading-tight">{displayLabel}</p>
        <p className="truncate font-mono text-[10px] text-muted-foreground/80 leading-tight mt-0.5">{value}</p>
      </div>
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          title="Copy OKLCH value"
        >
          {copied ? <IconCheck className="h-3.5 w-3.5 text-emerald-500" /> : <IconCopy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <div className="relative">
        <input
          type="color"
          value={hex}
          onChange={(e) => handleHexPick(e.target.value)}
          className="h-7 w-7 cursor-pointer rounded-lg border border-border/60 bg-transparent p-0.5 opacity-60 hover:opacity-100 transition-opacity"
          title="Pick color"
        />
      </div>
    </motion.div>
  );
}

/* ─── Tab Buttons ─── */
const TAB_BUTTONS = [
  { id: "colors", label: "Colors", icon: IconPalette, description: "Edit palette" },
  { id: "radius", label: "Radius", icon: IconBorderRadius, description: "Corner styles" },
  { id: "generator", label: "Generator", icon: IconSparkles, description: "Auto-generate" },
  { id: "preview", label: "Preview", icon: IconEye, description: "Live preview" },
  { id: "export", label: "Export", icon: IconFileExport, description: "Share theme" },
] as const;

type TabId = (typeof TAB_BUTTONS)[number]["id"];

const SWATCHES = [
  "#3b82f6", "#ef4444", "#10b981", "#f59e0b",
  "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16",
  "#f97316", "#a855f7", "#14b8a6", "#f43f5e",
];

/* ─── Theme Mini Preview ─── */
function ThemeMiniPreview({ theme, size = "sm" }: { theme: Theme; size?: "sm" | "md" }) {
  const c = theme.dark.colors;
  const colors = [c.primary, c.background, c.foreground, c.accent, c.destructive];
  const swatchSize = size === "md" ? "h-4 w-4" : "h-3 w-3";
  return (
    <div className="flex -space-x-1">
      {colors.map((col, i) => (
        <div
          key={i}
          className={cn(swatchSize, "rounded-full border-2 border-background ring-1 ring-border/30")}
          style={{ backgroundColor: oklchToHex(col) }}
        />
      ))}
    </div>
  );
}

/* ─── Theme List Item ─── */
function ThemeListItem({
  theme: t,
  isActive,
  onSelect,
  onRename,
  onDuplicate,
  onDelete,
  renamingId,
  renameValue,
  setRenameValue,
  handleRename,
  setRenamingId,
}: {
  theme: Theme;
  isActive: boolean;
  onSelect: () => void;
  onRename: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  renamingId: string | null;
  renameValue: string;
  setRenameValue: (v: string) => void;
  handleRename: (id: string) => void;
  setRenamingId: (id: string | null) => void;
}) {
  if (renamingId === t.id) {
    return (
      <div className="flex items-center gap-1.5 rounded-lg bg-primary/5 border border-primary/20 px-2.5 py-2">
        <input
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleRename(t.id); if (e.key === "Escape") setRenamingId(null); }}
          className="flex-1 min-w-0 rounded-md border border-primary/30 bg-background px-2 py-1 text-xs text-foreground outline-none focus:ring-2 focus:ring-primary/20"
          autoFocus
        />
        <button onClick={() => handleRename(t.id)} className="p-1 rounded-md hover:bg-primary/10 text-primary transition-colors">
          <IconCheck className="h-3.5 w-3.5" />
        </button>
        <button onClick={() => setRenamingId(null)} className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <IconX className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all duration-200 cursor-pointer",
        isActive
          ? "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20"
          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground hover:shadow-sm"
      )}
      onClick={onSelect}
    >
      <ThemeMiniPreview theme={t} />
      <span className="flex-1 truncate">{t.name}</span>
      {isActive && (
        <Badge variant="minimal" size="sm" className="shrink-0 bg-primary/10 text-primary border-primary/20">Active</Badge>
      )}
      <div className={cn("shrink-0 flex items-center gap-0.5 transition-all duration-200", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100")} onClick={(e) => e.stopPropagation()}>
        <button onClick={onRename} className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Rename">
          <IconPencil className="h-3 w-3" />
        </button>
        <button onClick={onDuplicate} className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Duplicate">
          <IconCopy className="h-3 w-3" />
        </button>
        <button onClick={onDelete} className="p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" title="Delete">
          <IconTrash className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ThemesPage() {
  const {
    theme,
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
  } = useTheme();

  const [activeTab, setActiveTab] = React.useState<TabId>("colors");
  const [editingMode, setEditingMode] = React.useState<ThemeMode>(mode);
  const [copied, setCopied] = React.useState<"json" | "css" | null>(null);
  const [importError, setImportError] = React.useState<string | null>(null);
  const [importInput, setImportInput] = React.useState("");
  const [baseColor, setBaseColor] = React.useState("#3b82f6");
  const [newThemeName, setNewThemeName] = React.useState("");
  const [showImport, setShowImport] = React.useState(false);
  const [renamingId, setRenamingId] = React.useState<string | null>(null);
  const [renameValue, setRenameValue] = React.useState("");
  const [savingName, setSavingName] = React.useState("");
  const [showSaveDialog, setShowSaveDialog] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({
    Surface: true, Brand: true, States: true, "Borders & Inputs": true,
  });

  const definition = editingMode === "dark" ? theme.dark : theme.light;
  const isPreset = PRESET_THEMES.some((t) => t.id === theme.id);
  const isCustom = customThemes.some((t) => t.id === theme.id);

  const updateColor = (key: keyof ThemeColors, value: string) => {
    updateDefinition(editingMode, { ...definition, colors: { ...definition.colors, [key]: value } });
  };

  const updateRadius = (radius: string) => {
    updateDefinition(editingMode, { ...definition, radius });
  };

  const handleGenerate = () => {
    const name = newThemeName.trim() || `${baseColor} Theme`;
    const newDef = generateThemeFromBase(baseColor, name, editingMode);
    updateDefinition(editingMode, newDef);
  };

  const handleSaveAs = () => {
    if (!savingName.trim()) return;
    const newId = `custom_${Date.now()}`;
    const newTheme: Theme = {
      ...theme,
      id: newId,
      name: savingName.trim(),
      light: { ...theme.light, name: `${savingName.trim()} Light` },
      dark: { ...theme.dark, name: `${savingName.trim()} Dark` },
    };
    saveTheme(newTheme);
    setTheme(newTheme);
    setSavingName("");
    setShowSaveDialog(false);
  };

  const handleRename = (id: string) => {
    if (!renameValue.trim()) return;
    const target = customThemes.find((t) => t.id === id);
    if (!target) return;
    const updated = {
      ...target,
      name: renameValue.trim(),
      light: { ...target.light, name: `${renameValue.trim()} Light` },
      dark: { ...target.dark, name: `${renameValue.trim()} Dark` },
    };
    saveTheme(updated);
    setRenamingId(null);
    setRenameValue("");
  };

  const handleDuplicate = (t: Theme) => {
    const newId = `custom_${Date.now()}`;
    const dup: Theme = {
      ...t,
      id: newId,
      name: `${t.name} (Copy)`,
      light: { ...t.light, name: `${t.name} (Copy) Light` },
      dark: { ...t.dark, name: `${t.name} (Copy) Dark` },
    };
    saveTheme(dup);
    setTheme(dup);
  };

  const handleExport = () => {
    const { json } = exportTheme();
    navigator.clipboard.writeText(json);
    setCopied("json");
    setTimeout(() => setCopied(null), 2000);
  };

  const handleExportCSS = () => {
    const { css } = exportTheme();
    navigator.clipboard.writeText(css);
    setCopied("css");
    setTimeout(() => setCopied(null), 2000);
  };

  const handleImport = () => {
    setImportError(null);
    const success = importTheme(importInput);
    if (!success) {
      setImportError("Invalid theme JSON. Check the format and try again.");
    } else {
      setImportInput("");
      setShowImport(false);
    }
  };

  const handleExportDownload = (type: "json" | "css") => {
    const { json, css } = exportTheme();
    const content = type === "json" ? json : css;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${theme.name.toLowerCase().replace(/\s+/g, "-")}-theme.${type}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const filteredPresets = PRESET_THEMES.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredCustom = customThemes.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] bg-background">
      {/* ═══ Sidebar ═══ */}
      <aside className="hidden w-72 shrink-0 border-r border-border/40 bg-muted/20 flex-col lg:flex">
        {/* Header */}
        <div className="p-4 pb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <IconPalette className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-sm font-bold tracking-tight text-foreground">Theme Studio</h2>
          </div>
          <p className="text-[11px] text-muted-foreground pl-9">Design, preview & export</p>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search themes..."
              className="w-full rounded-lg border border-border/50 bg-background pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 pb-4 space-y-4">
          {/* Presets */}
          <div>
            <div className="flex items-center justify-between px-1.5 mb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Presets</p>
              <span className="text-[10px] text-muted-foreground/50 font-mono">{filteredPresets.length}</span>
            </div>
            <div className="space-y-0.5">
              {filteredPresets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => resetToPreset(t.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-all duration-200",
                    theme.id === t.id
                      ? "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground hover:shadow-sm"
                  )}
                >
                  <ThemeMiniPreview theme={t} size="md" />
                  <span className="truncate">{t.name}</span>
                  {theme.id === t.id && (
                    <Badge variant="minimal" size="sm" className="ml-auto shrink-0 bg-primary/10 text-primary border-primary/20">Active</Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Saved Themes */}
          {filteredCustom.length > 0 && (
            <div className="border-t border-border/30 pt-3">
              <div className="flex items-center justify-between px-1.5 mb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Saved</p>
                <span className="text-[10px] text-muted-foreground/50 font-mono">{filteredCustom.length}</span>
              </div>
              <div className="space-y-0.5">
                {filteredCustom.map((t) => (
                  <ThemeListItem
                    key={t.id}
                    theme={t}
                    isActive={theme.id === t.id}
                    onSelect={() => setTheme(t)}
                    onRename={() => { setRenamingId(t.id); setRenameValue(t.name); }}
                    onDuplicate={() => handleDuplicate(t)}
                    onDelete={() => deleteTheme(t.id)}
                    renamingId={renamingId}
                    renameValue={renameValue}
                    setRenameValue={setRenameValue}
                    handleRename={handleRename}
                    setRenamingId={setRenamingId}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="border-t border-border/40 bg-muted/10 p-3 space-y-1.5">
          <Button
            variant="minimal"
            size="sm"
            className="w-full justify-start gap-2 hover:bg-primary/5 hover:text-primary transition-colors"
            leftIcon={<IconPlus className="h-3.5 w-3.5" />}
            onClick={() => {
              const newId = `custom_${Date.now()}`;
              const base = PRESET_THEMES[0];
              const newTheme: Theme = {
                id: newId,
                name: `My Theme ${customThemes.length + 1}`,
                light: { ...base.light, name: `My Theme ${customThemes.length + 1} Light` },
                dark: { ...base.dark, name: `My Theme ${customThemes.length + 1} Dark` },
              };
              saveTheme(newTheme);
              setTheme(newTheme);
            }}
          >New Theme</Button>
          <Button
            variant="minimal"
            size="sm"
            className={cn("w-full justify-start gap-2 transition-colors", showImport && "bg-primary/5 text-primary")}
            leftIcon={<IconUpload className="h-3.5 w-3.5" />}
            onClick={() => setShowImport(!showImport)}
          >Import Theme</Button>

          <AnimatePresence>
            {showImport && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                <div className="mt-2 space-y-2">
                  <textarea
                    value={importInput}
                    onChange={(e) => setImportInput(e.target.value)}
                    placeholder="Paste theme JSON here..."
                    className="h-24 w-full rounded-lg border border-border/60 bg-background p-3 font-mono text-[11px] text-foreground placeholder:text-muted-foreground/40 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                  />
                  {importError && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] text-destructive flex items-center gap-1">
                      <IconX className="h-3 w-3" /> {importError}
                    </motion.p>
                  )}
                  <div className="flex gap-2">
                    <Button size="xs" variant="modern" className="flex-1" onClick={handleImport}>Import</Button>
                    <Button size="xs" variant="minimal" onClick={() => setShowImport(false)}>Cancel</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* ═══ Main Content ═══ */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl px-6 py-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-1.5">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">{theme.name}</h1>
                <div className="flex items-center gap-1.5">
                  {isPreset && (
                    <Badge variant="minimal" size="sm" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                      <IconTag className="h-3 w-3 mr-1" />Preset
                    </Badge>
                  )}
                  {isCustom && (
                    <Badge variant="modern" size="sm" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                      <IconSparkles className="h-3 w-3 mr-1" />Custom
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-muted/60 text-xs font-medium">
                  {editingMode === "dark" ? <IconMoon className="h-3 w-3" /> : <IconSun className="h-3 w-3" />}
                  {definition.name}
                </span>
                <span className="text-border">|</span>
                <span className="font-mono text-xs">Radius: {definition.radius}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap shrink-0">
              {(isPreset || (!isPreset && !isCustom)) && (
                <Button variant="modern" size="sm" className="shadow-sm" leftIcon={<IconDeviceFloppy className="h-3.5 w-3.5" />} onClick={() => setShowSaveDialog(true)}>Save As</Button>
              )}
              {isCustom && (
                <Button variant="modern" size="sm" className="shadow-sm" leftIcon={<IconDeviceFloppy className="h-3.5 w-3.5" />} onClick={() => { const updated: Theme = { ...theme, light: theme.light, dark: theme.dark }; saveTheme(updated); }}>Save</Button>
              )}
              <div className="flex items-center rounded-lg border border-border/60 bg-muted/30 p-0.5">
                <button
                  onClick={() => setEditingMode("light")}
                  className={cn("flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200", editingMode === "light" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
                ><IconSun className="h-3.5 w-3.5" /> Light</button>
                <button
                  onClick={() => setEditingMode("dark")}
                  className={cn("flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200", editingMode === "dark" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
                ><IconMoon className="h-3.5 w-3.5" /> Dark</button>
              </div>
              <button
                onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                className={cn(buttonVariants({ variant: "minimal", size: "sm" }), "gap-1.5 border border-border/60")}
                title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
              ><IconArrowsShuffle className="h-3.5 w-3.5" /> Preview {mode === "dark" ? "Light" : "Dark"}</button>
            </div>
          </motion.div>

          {/* Save As Dialog */}
          <AnimatePresence>
            {showSaveDialog && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                className="mb-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/[0.02] p-5 shadow-lg shadow-primary/5"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <IconDeviceFloppy className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-0.5">Save as new theme</h3>
                    <p className="text-xs text-muted-foreground">Create a copy with a custom name</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input value={savingName} onChange={(e) => setSavingName(e.target.value)} placeholder="Theme name..." className="w-56 font-medium" onKeyDown={(e) => { if (e.key === "Enter") handleSaveAs(); if (e.key === "Escape") setShowSaveDialog(false); }} autoFocus />
                    <Button size="sm" variant="modern" onClick={handleSaveAs}>Save</Button>
                    <Button size="sm" variant="minimal" onClick={() => setShowSaveDialog(false)}>Cancel</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex gap-1 p-1 rounded-xl bg-muted/40 border border-border/30">
              {TAB_BUTTONS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "relative flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-all duration-200",
                      isActive ? "text-foreground bg-background shadow-sm ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-primary" : "text-muted-foreground/60")} />
                    <span>{tab.label}</span>
                    {isActive && (
                      <motion.div layoutId="active-tab-indicator" className="absolute -bottom-px left-2 right-2 h-0.5 bg-primary rounded-full" transition={{ duration: 0.25, ease: EASE_OUT_EXPO }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            >
              {/* Colors Tab */}
              {activeTab === "colors" && (
                <div className="space-y-6">
                  {COLOR_GROUPS.map((group) => {
                    const isExpanded = expandedGroups[group.label] ?? true;
                    return (
                      <Card key={group.label} variant="minimal" className="overflow-hidden">
                        <button onClick={() => toggleGroup(group.label)} className="w-full flex items-center justify-between p-4 hover:bg-muted/20 transition-colors">
                          <div className="text-left">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                              {group.label}
                              <span className="text-[10px] font-normal normal-case text-muted-foreground/60 bg-muted/60 px-1.5 py-0.5 rounded-full">{group.keys.length}</span>
                            </h3>
                            {group.description && <p className="text-[11px] text-muted-foreground/60 mt-0.5">{group.description}</p>}
                          </div>
                          <IconChevronRight className={cn("h-4 w-4 text-muted-foreground/40 transition-transform duration-200", isExpanded && "rotate-90")} />
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: EASE_OUT_EXPO }} className="overflow-hidden">
                              <CardContent className="pt-0 pb-4 px-4">
                                <div className="grid gap-2 sm:grid-cols-2">
                                  {group.keys.map((key, i) => (
                                    <ColorEditor key={key} label={key} value={definition.colors[key]} onChange={(v) => updateColor(key, v)} index={i} />
                                  ))}
                                </div>
                              </CardContent>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* Radius Tab */}
              {activeTab === "radius" && (
                <div className="space-y-6">
                  <Card variant="minimal" className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                          <IconBorderRadius className="h-4.5 w-4.5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">Border Radius</CardTitle>
                          <CardDescription>Adjust the global corner roundness. All components scale proportionally.</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8 pt-2">
                      <div className="flex items-center gap-5">
                        <div className="flex-1 relative">
                          <input
                            type="range"
                            min="0"
                            max="1.5"
                            step="0.025"
                            value={parseFloat(definition.radius)}
                            onChange={(e) => updateRadius(`${e.target.value}rem`)}
                            className="w-full accent-primary h-2 cursor-pointer rounded-full bg-muted appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/30 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:cursor-pointer transition-all"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="min-w-[5.5rem] rounded-xl border border-border/60 bg-muted/40 px-4 py-2 font-mono text-sm text-foreground text-center font-semibold">{definition.radius}</span>
                          <button onClick={() => updateRadius("0.5rem")} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Reset to default"><IconRefresh className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Live Preview</p>
                          <span className="text-[10px] text-muted-foreground/50">Multiplier scale</span>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          {[
                            { label: "xs", mul: 0.4 }, { label: "sm", mul: 0.6 }, { label: "md", mul: 0.8 },
                            { label: "lg", mul: 1 }, { label: "xl", mul: 1.4 }, { label: "2xl", mul: 1.8 }, { label: "3xl", mul: 2.4 },
                          ].map((r) => (
                            <div key={r.label} className="flex flex-col items-center gap-1.5">
                              <div className="h-12 w-12 bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-sm" style={{ borderRadius: `calc(${definition.radius} * ${r.mul})` }}>{r.label}</div>
                              <span className="text-[9px] text-muted-foreground/50 font-mono">x{r.mul}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Generator Tab */}
              {activeTab === "generator" && (
                <div className="space-y-6">
                  <Card variant="minimal" className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-violet-500/10 flex items-center justify-center">
                          <IconSparkles className="h-4.5 w-4.5 text-violet-500" />
                        </div>
                        <div>
                          <CardTitle className="text-base">Color Palette Generator</CardTitle>
                          <CardDescription>Pick a base color to automatically generate a harmonious theme palette.</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-2">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="relative group">
                          <div className="h-14 w-14 rounded-2xl border-2 border-border/60 cursor-pointer transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg" style={{ backgroundColor: baseColor }} />
                          <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                        <div className="w-full sm:flex-1 space-y-3">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">Base Color</label>
                            <Input value={baseColor} onChange={(e) => setBaseColor(e.target.value)} placeholder="#3b82f6" className="font-mono" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">Theme Name (optional)</label>
                            <Input value={newThemeName} onChange={(e) => setNewThemeName(e.target.value)} placeholder="e.g. Ocean Breeze" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">Quick Presets</label>
                        <div className="flex gap-2 flex-wrap">
                          {SWATCHES.map((swatch) => (
                            <button
                              key={swatch}
                              onClick={() => setBaseColor(swatch)}
                              className={cn("h-9 w-9 rounded-xl border-2 transition-all duration-200", baseColor === swatch ? "border-foreground scale-110 shadow-lg ring-2 ring-primary/20" : "border-border/60 hover:scale-110 hover:shadow-md")}
                              style={{ backgroundColor: swatch }}
                              title={swatch}
                            />
                          ))}
                        </div>
                      </div>
                      <Button leftIcon={<IconSparkles className="h-4 w-4" />} onClick={handleGenerate} className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 border-0 shadow-lg shadow-violet-500/20">
                        Generate {editingMode === "dark" ? "Dark" : "Light"} Palette
                      </Button>
                    </CardContent>
                  </Card>
                  <Card variant="minimal">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Generated Preview</CardTitle>
                      <CardDescription>Key tokens from the current palette</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                        {(["primary", "secondary", "accent", "muted", "background", "foreground", "card", "destructive"] as const).map((key) => (
                          <div key={key} className="space-y-2">
                            <div className="h-14 w-full rounded-xl border border-border/40 shadow-sm transition-transform hover:scale-105" style={{ backgroundColor: oklchToHex(definition.colors[key]) }} />
                            <p className="text-[10px] font-semibold text-muted-foreground text-center capitalize">{key}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Preview Tab */}
              {activeTab === "preview" && <ComponentShowcase />}

              {/* Export Tab */}
              {activeTab === "export" && (
                <div className="space-y-6">
                  <Card variant="minimal" className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                          <IconFileExport className="h-4.5 w-4.5 text-emerald-500" />
                        </div>
                        <div>
                          <CardTitle className="text-base">Export Theme</CardTitle>
                          <CardDescription>Copy to clipboard or download your theme configuration.</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-2">
                        <Button variant="modern" size="sm" className="shadow-sm" leftIcon={copied === "json" ? <IconCheck className="h-3.5 w-3.5 text-emerald-500" /> : <IconCopy className="h-3.5 w-3.5" />} onClick={handleExport}>
                          {copied === "json" ? "Copied JSON!" : "Copy JSON"}
                        </Button>
                        <Button variant="modern" size="sm" className="shadow-sm" leftIcon={copied === "css" ? <IconCheck className="h-3.5 w-3.5 text-emerald-500" /> : <IconCopy className="h-3.5 w-3.5" />} onClick={handleExportCSS}>
                          {copied === "css" ? "Copied CSS!" : "Copy CSS"}
                        </Button>
                        <Button variant="minimal" size="sm" leftIcon={<IconDownload className="h-3.5 w-3.5" />} onClick={() => handleExportDownload("json")}>Download JSON</Button>
                        <Button variant="minimal" size="sm" leftIcon={<IconDownload className="h-3.5 w-3.5" />} onClick={() => handleExportDownload("css")}>Download CSS</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Card variant="minimal" className="overflow-hidden">
                      <CardHeader className="border-b border-border/30 bg-muted/20 pb-3">
                        <div className="flex items-center gap-2">
                          <IconFolderOpen className="h-4 w-4 text-primary" />
                          <CardTitle className="text-sm">JSON Format</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <pre className="max-h-96 overflow-auto p-4 text-[11px] leading-relaxed text-foreground custom-scrollbar font-mono">{JSON.stringify(theme, null, 2)}</pre>
                      </CardContent>
                    </Card>
                    <Card variant="minimal" className="overflow-hidden">
                      <CardHeader className="border-b border-border/30 bg-muted/20 pb-3">
                        <div className="flex items-center gap-2">
                          <IconPalette className="h-4 w-4 text-primary" />
                          <CardTitle className="text-sm">CSS Variables</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <pre className="max-h-96 overflow-auto p-4 text-[11px] leading-relaxed text-foreground custom-scrollbar font-mono whitespace-pre-wrap">
                          {`/* Theme: ${theme.name} */\n:root {\n${Object.entries(theme.light.colors).map(([key, val]) => `  --${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${val};`).join("\n")}\n  --radius: ${theme.light.radius};\n}\n\n.dark {\n${Object.entries(theme.dark.colors).map(([key, val]) => `  --${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${val};`).join("\n")}\n  --radius: ${theme.dark.radius};\n}`}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT SHOWCASE
   ═══════════════════════════════════════════════════════════════ */
function ComponentShowcase() {
  return (
    <div className="space-y-10 pb-8">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-1 rounded-full bg-primary/30" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Typography</h3>
        </div>
        <Card variant="minimal" className="overflow-hidden">
          <CardContent className="space-y-5 py-6">
            <div><h1 className="text-4xl font-extrabold tracking-tight text-foreground">Heading 1</h1><p className="text-[10px] text-muted-foreground mt-1 font-mono">text-4xl font-extrabold</p></div>
            <div><h2 className="text-2xl font-bold tracking-tight text-foreground">Heading 2</h2><p className="text-[10px] text-muted-foreground mt-1 font-mono">text-2xl font-bold</p></div>
            <div><h3 className="text-xl font-semibold text-foreground">Heading 3</h3><p className="text-[10px] text-muted-foreground mt-1 font-mono">text-xl font-semibold</p></div>
            <Divider />
            <div className="space-y-2">
              <p className="text-base text-foreground leading-relaxed">Body text with default styling. This is how paragraphs will look in your theme with comfortable line height and spacing.</p>
              <p className="text-sm text-muted-foreground">Secondary / muted text for descriptions, captions, and labels.</p>
            </div>
            <Blockquote variant="modern">Blockquote with the modern variant showing accent border styling and italic text.</Blockquote>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-1 rounded-full bg-primary/30" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Buttons</h3>
        </div>
        <Card variant="minimal" className="overflow-hidden">
          <CardContent className="space-y-6 py-6">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Variants</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="modern">Modern</Button>
                <Button variant="minimal">Minimal</Button>
                <Button variant="glass">Glass</Button>
                <Button variant="macos">macOS</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Sizes</p>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="modern" size="xs">Extra Small</Button>
                <Button variant="modern" size="sm">Small</Button>
                <Button variant="modern" size="default">Default</Button>
                <Button variant="modern" size="lg">Large</Button>
                <Button variant="modern" size="icon"><IconPalette className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">States</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="modern" loading>Loading</Button>
                <Button variant="modern" disabled>Disabled</Button>
                <Button variant="modern" leftIcon={<IconCheck className="h-4 w-4" />}>With Icon</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-1 rounded-full bg-primary/30" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Cards</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>A standard card with header, content, and footer areas.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground leading-relaxed">Card content area with primary text color. This demonstrates how content flows within the card component.</p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm" variant="minimal">Cancel</Button>
              <Button size="sm" variant="modern">Action</Button>
            </CardFooter>
          </Card>
          <Card variant="minimal" className="overflow-hidden">
            <CardHeader>
              <CardTitle>Minimal Card</CardTitle>
              <CardDescription>Alternative card style with softer borders and reduced visual weight.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground leading-relaxed">Minimal variant for reduced visual weight. Useful for secondary content or nested layouts.</p>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button size="sm" variant="minimal">Cancel</Button>
              <Button size="sm" variant="modern">Save</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-1 rounded-full bg-primary/30" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Form Elements</h3>
        </div>
        <Card variant="minimal" className="overflow-hidden">
          <CardContent className="space-y-8 py-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">Text Input <Badge variant="minimal" size="sm">Default</Badge></label>
                <Input placeholder="Type something..." />
                <p className="text-[11px] text-muted-foreground">Helper text for the input field</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Disabled Input</label>
                <Input placeholder="Disabled..." disabled />
                <p className="text-[11px] text-muted-foreground">This input is currently disabled</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Textarea</label>
              <textarea className="flex min-h-[100px] w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 resize-y transition-all" placeholder="Write something longer here..." />
            </div>
            <Divider />
            <div className="flex items-center gap-8 flex-wrap">
              <div className="flex items-center gap-3">
                <Checkbox id="preview-cb" />
                <label htmlFor="preview-cb" className="text-sm text-foreground cursor-pointer select-none">Checkbox option</label>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-foreground">Toggle</span>
                <Switch />
              </div>
              <RadioGroup name="preview-radio-2" className="flex gap-4">
                <Radio value="a" label="Option A" />
                <Radio value="b" label="Option B" />
                <Radio value="c" label="Option C" />
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-1 rounded-full bg-primary/30" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Badges & Alerts</h3>
        </div>
        <Card variant="minimal" className="overflow-hidden">
          <CardContent className="space-y-6 py-6">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Badge Variants</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="modern">Modern</Badge>
                <Badge variant="minimal">Minimal</Badge>
                <Badge variant="glass">Glass</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="destructive">Error</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Alert Variants</p>
              <Alert variant="default" title="Default Alert" description="This is a standard alert message for general information." />
              <Alert variant="info" title="Info Alert" description="This is an informational alert with a subtle blue accent." />
              <Alert variant="destructive" title="Destructive Alert" description="This is a destructive alert for critical warnings or errors." />
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-1 rounded-full bg-primary/30" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Components</h3>
        </div>
        <Card variant="minimal" className="overflow-hidden">
          <CardContent className="space-y-8 py-6">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Avatars</p>
              <div className="flex items-center gap-3">
                <Avatar fallback="JD" />
                <Avatar fallback="VU" />
                <Avatar fallback="AV" />
                <Avatar fallback="MK" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Progress</p>
              <div className="space-y-3">
                <Progress value={25} />
                <Progress value={65} />
                <Progress value={90} />
              </div>
            </div>
            <Divider />
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Keyboard Shortcuts</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-foreground">Press</span>
                <Kbd>Ctrl</Kbd>
                <span className="text-muted-foreground">+</span>
                <Kbd>K</Kbd>
                <span className="text-muted-foreground">+</span>
                <Kbd>Shift</Kbd>
                <span className="text-sm text-foreground">to open command palette</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Loading States</p>
              <div className="flex items-center gap-4">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <span className="text-sm text-muted-foreground">Loading content...</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Tabs</p>
              <Tabs variant="line" items={[
                { id: "tab1", label: "Overview", content: <div className="pt-3 space-y-2"><p className="text-sm text-foreground">Tab 1 content with your theme colors applied.</p></div> },
                { id: "tab2", label: "Settings", content: <div className="pt-3 space-y-2"><p className="text-sm text-foreground">Tab 2 content showing interactive states.</p></div> },
                { id: "tab3", label: "Details", content: <div className="pt-3 space-y-2"><p className="text-sm text-foreground">Tab 3 content with nested components.</p></div> },
              ]} />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
