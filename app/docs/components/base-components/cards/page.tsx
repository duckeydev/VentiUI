"use client";

import { useState } from "react";
import {
  IconArrowRight,
  IconChartBar,
  IconCheck,
  IconCode,
  IconCopy,
  IconExternalLink,
  IconEye,
  IconPhoto,
  IconSparkles,
  IconLayersSubtract,
} from "@tabler/icons-react";

import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Card",
  description:
    "A surface architecture primitive mapped across cohesive modern design styles with fluid composable children regions.",
  version: "v1.1.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/card.tsx",
};

type CardVariantType = "modern" | "minimal" | "glass" | "macos";

const styleShowcase: { id: CardVariantType; label: string; desc: string }[] = [
  { id: "modern", label: "Modern", desc: "Crisp outline strokes with soft ambient drop styling." },
  { id: "minimal", label: "Minimal", desc: "No shadow footprint. Implements tint zones over strict layouts." },
  { id: "glass", label: "Glassmorphism", desc: "Heavy canvas background blur using premium specular borders." },
  { id: "macos", label: "macOS Core", desc: "Continuous micro rounding curves paired with subtle scale animations." },
];

export default function CardDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showcaseVariant, setShowcaseVariant] = useState<CardVariantType>("modern");
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    showcase: "preview",
    simple: "preview",
    composed: "preview",
    stats: "preview",
  });

  const handleCopy = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleTab = (id: string, tab: "preview" | "code") => {
    setActiveTabs((prev) => ({ ...prev, [id]: tab }));
  };

  const showcaseCode = `<Card variant="${showcaseVariant}" hoverable className="max-w-sm">
  <CardHeader>
    <CardTitle>System Architecture</CardTitle>
    <CardDescription>Active variant sandbox overview profile.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      Experiment with active interface styles using the runtime token modifiers above.
    </p>
  </CardContent>
  <CardFooter className="justify-end">
    <Button size="sm">Configure</Button>
  </CardFooter>
</Card>`;

  const simpleCode = `<Card className="max-w-md p-6" variant="modern">
  <div className="space-y-2">
    <CardTitle>Workspace Overview</CardTitle>
    <CardDescription>
      Track weekly progress, active projects, and the latest team notes in one focused surface.
    </CardDescription>
  </div>
  <div className="mt-6 flex items-center justify-between">
    <span className="text-xs text-muted-foreground font-medium">8 tasks completed</span>
    <Button size="sm">Open dashboard</Button>
  </div>
</Card>`;

  const composedCode = `<Card className="max-w-xl overflow-hidden" variant="macos">
  <div className="h-36 bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950" />
  <CardHeader>
    <CardTitle>Continuous Engine Updates</CardTitle>
    <CardDescription>Engine metrics and deployment state timelines.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">
      Pair the card layout with high contrast media frames to separate visual focus zones safely.
    </p>
  </CardContent>
  <CardFooter>
    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
      <IconLayersSubtract className="h-3.5 w-3.5" /> Core Framework
    </span>
    <Button variant="outline" size="sm">Review Logs</Button>
  </CardFooter>
</Card>`;

  const statsCode = `<div className="grid gap-4 sm:grid-cols-3 w-full">
  <Card className="p-5" variant="minimal" hoverable>
    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
      <span>Traffic Streams</span>
      <IconChartBar className="h-4 w-4 text-primary" />
    </div>
    <div className="mt-3 text-2xl font-bold tracking-tight">24.8k</div>
    <p className="mt-1 text-xs font-medium text-emerald-500">+12.4% vs last week</p>
  </Card>
</div>`;

  const rightBarItems = [
    { label: "Interactive Playground", href: "#playground" },
    { label: "Compact Pattern", href: "#compact" },
    { label: "Composed Layout", href: "#composed" },
    { label: "Dashboard Metrics", href: "#metrics" },
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
        {/* Component Header Block */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Base Components", href: "/docs/components#base-components" },
              { label: componentMeta.title, href: "/docs/components/base-components/cards" },
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
              <IconCode className="h-3.5 w-3.5" /> Component Source
              <IconExternalLink className="h-2.5 w-2.5 text-muted-foreground/60" />
            </a>
          </div>
        </div>

        {/* 1. INTERACTIVE DESIGN VARIANT PLAYGROUND */}
        <section id="playground" className="space-y-4 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h3 className="text-lg font-bold tracking-tight text-foreground">Aesthetic Core Playground</h3>
              <p className="text-xs text-muted-foreground">
                Toggle systemic component tokens dynamically to check rendering treatments.
              </p>
            </div>

            {/* Token Switcher */}
            <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/20 p-1 text-xs">
              {styleShowcase.map((variantItem) => (
                <button
                  key={variantItem.id}
                  onClick={() => setShowcaseVariant(variantItem.id)}
                  className={`rounded-md px-2.5 py-1 font-semibold capitalize transition-all ${
                    showcaseVariant === variantItem.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {variantItem.id}
                </button>
              ))}
            </div>
          </div>

          <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
              <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs font-medium">
                <button
                  onClick={() => toggleTab("showcase", "preview")}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${
                    (activeTabs["showcase"] || "preview") === "preview"
                      ? "bg-card font-semibold text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconEye className="h-3.5 w-3.5" /> Preview
                </button>
                <button
                  onClick={() => toggleTab("showcase", "code")}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${
                    activeTabs["showcase"] === "code"
                      ? "bg-card font-semibold text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconCode className="h-3.5 w-3.5" /> Code
                </button>
              </div>

              <button
                onClick={() => handleCopy("showcase", showcaseCode)}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {copiedId === "showcase" ? (
                  <><IconCheck className="h-3.5 w-3.5 text-emerald-500" /> Copied</>
                ) : (
                  <><IconCopy className="h-3.5 w-3.5" /> Copy Config</>
                )}
              </button>
            </div>

            <div className="p-8 bg-gradient-to-br from-transparent via-muted/5 to-primary/[0.02] flex flex-col items-center justify-center min-h-[220px]">
              {(activeTabs["showcase"] || "preview") === "preview" ? (
                <div className="w-full max-w-sm">
                  <Card variant={showcaseVariant} hoverable>
                    <CardHeader>
                      <CardTitle>System Architecture</CardTitle>
                      <CardDescription>
                        {styleShowcase.find((v) => v.id === showcaseVariant)?.desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Testing theme compliance states. This card structure updates responsively to match user-selected UI standards.
                      </p>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button size="sm" variant={showcaseVariant === "minimal" ? "modern" : "modern"}>
                        Configure Mode
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ) : (
                <pre className="w-full overflow-x-auto rounded-xl border border-border/60 bg-background/60 p-4 font-mono text-xs text-foreground">
                  <code>{showcaseCode}</code>
                </pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* 2. COMPACT PATTERN */}
        <section id="compact" className="space-y-3 scroll-mt-20">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold tracking-tight text-foreground">Compact Content Surface</h3>
            <p className="text-xs text-muted-foreground">
              Direct vanilla box rendering for minimalist notifications or uncoupled text blocks.
            </p>
          </div>

          <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
              <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs font-medium">
                <button
                  onClick={() => toggleTab("simple", "preview")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    (activeTabs["simple"] || "preview") === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => toggleTab("simple", "code")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeTabs["simple"] === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Code
                </button>
              </div>
              <button onClick={() => handleCopy("simple", simpleCode)} className="text-xs text-muted-foreground">
                {copiedId === "simple" ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="p-6">
              {(activeTabs["simple"] || "preview") === "preview" ? (
                <Card className="max-w-md p-6" variant="modern">
                  <div className="space-y-2">
                    <CardTitle>Workspace Overview</CardTitle>
                    <CardDescription>
                      Track weekly progress, active projects, and the latest team notes in one focused surface.
                    </CardDescription>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">8 tasks completed</span>
                    <Button size="sm" href="#">Open dashboard</Button>
                  </div>
                </Card>
              ) : (
                <pre className="overflow-x-auto p-4 text-xs bg-background/60 rounded-xl border border-border/60"><code>{simpleCode}</code></pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* 3. COMPOSED MEDIA CARD */}
        <section id="composed" className="space-y-3 scroll-mt-20">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold tracking-tight text-foreground">Composed Media Layout</h3>
            <p className="text-xs text-muted-foreground">
              Utilizing explicit bounding slots (`CardHeader`, `CardContent`, `CardFooter`) with hero splash dividers.
            </p>
          </div>

          <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
              <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs font-medium">
                <button
                  onClick={() => toggleTab("composed", "preview")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    (activeTabs["composed"] || "preview") === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => toggleTab("composed", "code")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeTabs["composed"] === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Code
                </button>
              </div>
              <button onClick={() => handleCopy("composed", composedCode)} className="text-xs text-muted-foreground">
                {copiedId === "composed" ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="p-6">
              {(activeTabs["composed"] || "preview") === "preview" ? (
                <Card className="max-w-xl overflow-hidden" variant="macos">
                  <div className="h-36 bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950" />
                  <CardHeader>
                    <CardTitle>Continuous Engine Updates</CardTitle>
                    <CardDescription>Engine metrics and deployment state timelines.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Pair the card layout with high contrast media frames to separate visual focus zones safely.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <IconLayersSubtract className="h-3.5 w-3.5" /> Core Framework
                    </span>
                    <Button variant="modern" size="sm" href="#">Review Logs</Button>
                  </CardFooter>
                </Card>
              ) : (
                <pre className="overflow-x-auto p-4 text-xs bg-background/60 rounded-xl border border-border/60"><code>{composedCode}</code></pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* 4. DASHBOARD GRID SPEC */}
        <section id="metrics" className="space-y-3 scroll-mt-20">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold tracking-tight text-foreground">Dashboard Metric Grids</h3>
            <p className="text-xs text-muted-foreground">
              Clean micro layout blocks ideal for displaying complex numbers and high-density tracking data.
            </p>
          </div>

          <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
              <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs font-medium">
                <button
                  onClick={() => toggleTab("stats", "preview")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    (activeTabs["stats"] || "preview") === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => toggleTab("stats", "code")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeTabs["stats"] === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Code
                </button>
              </div>
              <button onClick={() => handleCopy("stats", statsCode)} className="text-xs text-muted-foreground">
                {copiedId === "stats" ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="p-6">
              {(activeTabs["stats"] || "preview") === "preview" ? (
                <div className="grid gap-4 sm:grid-cols-3 w-full">
                  <Card className="p-5" variant="minimal" hoverable>
                    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <span>Traffic Streams</span>
                      <IconChartBar className="h-4 w-4 text-primary" />
                    </div>
                    <div className="mt-3 text-2xl font-bold tracking-tight">24.8k</div>
                    <p className="mt-1 text-xs font-medium text-emerald-500">+12.4% vs last week</p>
                  </Card>

                  <Card className="p-5" variant="minimal" hoverable>
                    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <span>Conversions</span>
                      <IconSparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="mt-3 text-2xl font-bold tracking-tight">91%</div>
                    <p className="mt-1 text-xs font-medium text-emerald-500">+4.1% vs last week</p>
                  </Card>

                  <Card className="p-5" variant="minimal" hoverable>
                    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <span>Vault Files</span>
                      <IconPhoto className="h-4 w-4 text-primary" />
                    </div>
                    <div className="mt-3 text-2xl font-bold tracking-tight">1.2k</div>
                    <p className="mt-1 text-xs font-medium text-emerald-500">+18 new units</p>
                  </Card>
                </div>
              ) : (
                <pre className="overflow-x-auto p-4 text-xs bg-background/60 rounded-xl border border-border/60"><code>{statsCode}</code></pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* 5. API PROP SPECIFICATION */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Properties API</h2>
            <p className="text-sm text-muted-foreground">
              Configuration matrices passed directly to subcomponent layout primitives.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/60 bg-card/30">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border/60 bg-secondary/30 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Prop</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Default</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-xs">
                <tr className="align-top">
                  <td className="px-4 py-3 font-semibold text-primary font-mono">variant</td>
                  <td className="px-4 py-3 font-mono text-purple-600 dark:text-purple-400">
                    "modern" | "minimal" | "glass" | "macos"
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">"modern"</td>
                  <td className="px-4 py-3 text-muted-foreground leading-relaxed">
                    Determines base container geometry, border variables, background layers, and backdrop blurs.
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="px-4 py-3 font-semibold text-primary font-mono">hoverable</td>
                  <td className="px-4 py-3 font-mono text-blue-600">boolean</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">false</td>
                  <td className="px-4 py-3 text-muted-foreground leading-relaxed">
                    Injects responsive physical translation scale animations safely matched to the selected layout variant.
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="px-4 py-3 font-semibold text-primary font-mono">className</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">string</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">""</td>
                  <td className="px-4 py-3 text-muted-foreground leading-relaxed">
                    Tailwind class extensions for modifying layout grids, width controls, padding levels, or custom layout overrides.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <DocsAdjacentNav />

        <footer className="border-t border-border/30 pt-4 text-center text-xs text-muted-foreground/40">
          © 2026 Venti UI Labs. Expressive architecture systems.
        </footer>
      </main>
    </DocsPageFrame>
  );
}