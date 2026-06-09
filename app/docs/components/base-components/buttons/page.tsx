"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconLayoutGrid,
  IconArrowRight,
  IconSparkles,
  IconCloudDownload,
} from "@tabler/icons-react";

import { Button } from "@/components/button";
import {
  DocsBreadcrumbs,
  DocsOutline,
  DocsPageFrame,
  DocsPanel,
} from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Button",
  description:
    "An interactive polymorphic action primitive supporting standard state variables, icon injection layouts, and unified visual design tokens.",
  version: "v1.1.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/button.tsx",
};

type ButtonVariantType = "modern" | "minimal" | "glass" | "macos" | "destructive";

const buttonProperties = [
  {
    name: "variant",
    type: "'modern' | 'minimal' | 'glass' | 'macos' | 'destructive'",
    default: "'modern'",
    description: "Determines the background canvas depth layer, hover states, and structural border tokens.",
  },
  {
    name: "size",
    type: "'xs' | 'sm' | 'default' | 'lg' | 'icon'",
    default: "'default'",
    description: "Adjusts structural height variables, tracking gaps, inner paddings, and typographic sizes.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description: "Forces a disabled state while mounting a loading spinner and switching accessibility indicators.",
  },
  {
    name: "leftIcon / rightIcon",
    type: "React.ReactNode",
    default: "undefined",
    description: "Optional visual icons that auto-translate outward on button hover states.",
  },
];

export default function ButtonDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeVariant, setActiveVariant] = useState<ButtonVariantType>("modern");
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    playground: "preview",
    icons: "preview",
    loading: "preview",
  });

  const handleCopy = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const playgroundCode = `<Button variant="${activeVariant}" size="default">
  Execute Action
</Button>`;

  const iconsCode = `<Button variant="modern" rightIcon={<IconArrowRight />}>
  Get Started
</Button>`;

  const loadingCode = `<Button loading={${isLoadingDemo}} onClick={() => triggerRequest()}>
  Deploy Changes
</Button>`;

  const rightBarItems = [
    { label: "Interactive Playground", href: "#playground" },
    { label: "Icon Enhancements", href: "#icons" },
    { label: "Asynchronous States", href: "#loading" },
    { label: "Properties API", href: "#props-api" },
  ];

  return (
    <DocsPageFrame
      leftBar={
        <aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-border/40">
          <DocsSidebar />
        </aside>
      }
      rightBar={<DocsOutline title="On this page" items={rightBarItems} />}
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">
        {/* Header Block */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Base Components", href: "/docs/components#base-components" },
              { label: componentMeta.title, href: "/docs/components/base-components/button" },
            ]}
          />

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
              {componentMeta.title}
            </h1>
            <span className="mt-1.5 rounded bg-primary/10 border border-primary/20 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
              {componentMeta.version}
            </span>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            {componentMeta.description}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={componentMeta.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconCode className="h-3.5 w-3.5" /> View Source
              <IconExternalLink className="h-2.5 w-2.5 text-muted-foreground/60" />
            </a>
          </div>
        </div>

        {/* 1. VARIANT PLAYGROUND */}
        <section id="playground" className="space-y-4 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h3 className="text-lg font-bold tracking-tight text-foreground">Interactive Sandbox</h3>
              <p className="text-xs text-muted-foreground">Modify structural variations across your shared theme tracks.</p>
            </div>

            {/* Selection Pill Controls */}
            <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border/60 bg-muted/20 p-1 text-xs">
              {(["modern", "minimal", "glass", "macos", "destructive"] as ButtonVariantType[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setActiveVariant(v)}
                  className={`rounded-md px-2.5 py-1 font-semibold capitalize transition-all ${
                    activeVariant === v
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
              <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs font-medium">
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, playground: "preview" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    (activeTabs["playground"] || "preview") === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, playground: "code" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeTabs["playground"] === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Code
                </button>
              </div>
              <button
                onClick={() => handleCopy("playground", playgroundCode)}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {copiedId === "playground" ? <><IconCheck className="h-3.5 w-3.5 text-emerald-500" /> Copied</> : <><IconCopy className="h-3.5 w-3.5" /> Copy Code</>}
              </button>
            </div>

            <div className="flex min-h-[140px] items-center justify-center p-6 bg-gradient-to-br from-transparent to-muted/5">
              {(activeTabs["playground"] || "preview") === "preview" ? (
                <Button variant={activeVariant}>Execute Action</Button>
              ) : (
                <pre className="w-full overflow-x-auto rounded-xl border border-border/60 bg-background/60 p-4 font-mono text-xs text-foreground">
                  <code>{playgroundCode}</code>
                </pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* 2. ICON ENHANCEMENTS */}
        <section id="icons" className="space-y-3 scroll-mt-20">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold tracking-tight text-foreground">Icon Micro-Positioning</h3>
            <p className="text-xs text-muted-foreground">
              Pass nodes to icons. Intercept zones auto-animate horizontal directional offsets smoothly on hover events.
            </p>
          </div>

          <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
              <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs font-medium">
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, icons: "preview" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    (activeTabs["icons"] || "preview") === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, icons: "code" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeTabs["icons"] === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Code
                </button>
              </div>
              <button onClick={() => handleCopy("icons", iconsCode)} className="text-xs text-muted-foreground">{copiedId === "icons" ? "Copied" : "Copy"}</button>
            </div>
            <div className="p-6 flex justify-center">
              {(activeTabs["icons"] || "preview") === "preview" ? (
                <div className="flex flex-wrap gap-4 items-center justify-center">
                  <Button variant="modern" rightIcon={<IconArrowRight className="h-4 w-4" />}>
                    Get Started
                  </Button>
                  <Button variant="minimal" leftIcon={<IconCloudDownload className="h-4 w-4" />}>
                    Download Assets
                  </Button>
                </div>
              ) : (
                <pre className="w-full overflow-x-auto rounded-xl border border-border/60 bg-background/60 p-4 font-mono text-xs text-foreground"><code>{iconsCode}</code></pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* 3. LOADING REQUESTS */}
        <section id="loading" className="space-y-3 scroll-mt-20">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold tracking-tight text-foreground">Asynchronous Flow Control</h3>
            <p className="text-xs text-muted-foreground">
              Enabling loading injects an animated icon, forces layout constraints, and announces state variations to active screen readers.
            </p>
          </div>

          <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
              <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs font-medium">
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, loading: "preview" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    (activeTabs["loading"] || "preview") === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, loading: "code" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeTabs["loading"] === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Code
                </button>
              </div>
              <button onClick={() => handleCopy("loading", loadingCode)} className="text-xs text-muted-foreground">{copiedId === "loading" ? "Copied" : "Copy"}</button>
            </div>
            <div className="p-6 flex flex-col items-center gap-3">
              {(activeTabs["loading"] || "preview") === "preview" ? (
                <>
                  <Button 
                    loading={isLoadingDemo} 
                    variant="modern"
                    onClick={() => {
                      setIsLoadingDemo(true);
                      setTimeout(() => setIsLoadingDemo(false), 2500);
                    }}
                  >
                    {isLoadingDemo ? "Deploying..." : "Deploy Changes"}
                  </Button>
                  <p className="text-[10px] text-muted-foreground italic">Click button to trigger a mock 2.5-second network request delay.</p>
                </>
              ) : (
                <pre className="w-full overflow-x-auto rounded-xl border border-border/60 bg-background/60 p-4 font-mono text-xs text-foreground"><code>{loadingCode}</code></pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* 4. PROPERTIES REFERENCE */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconLayoutGrid stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">Properties API</h2>
              <p className="text-xs text-muted-foreground">Typing declarations and parameter definitions for the core Button primitive.</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/60 bg-card/30">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/30 font-semibold text-muted-foreground">
                  <th className="p-3 w-[22%]">Property</th>
                  <th className="p-3 w-[30%]">Type</th>
                  <th className="p-3 w-[12%]">Default</th>
                  <th className="p-3 w-[36%]">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-medium">
                {buttonProperties.map((prop) => (
                  <tr key={prop.name} className="transition-colors hover:bg-secondary/10 align-top">
                    <td className="p-3 font-mono font-bold text-primary">{prop.name}</td>
                    <td className="p-3 font-mono text-purple-600 dark:text-purple-400 leading-relaxed">{prop.type}</td>
                    <td className="p-3 font-mono text-foreground/70">{prop.default}</td>
                    <td className="p-3 font-normal leading-relaxed text-muted-foreground">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <DocsAdjacentNav />

        <footer className="border-t border-border/30 pt-4 text-center text-xs text-muted-foreground/40">
          © 2026 Venti UI Labs. System architecture primitives.
        </footer>
      </main>
    </DocsPageFrame>
  );
}