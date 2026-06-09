"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconLayoutGrid,
  IconSettings,
} from "@tabler/icons-react";

import { Button } from "@/components/button";
import { ButtonGroup } from "@/components/buttonGroup";
import {
  DocsBreadcrumbs,
  DocsOutline,
  DocsPageFrame,
  DocsPanel,
} from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Button Group",
  description:
    "A structural grouping track used to unify multiple related button operations into integrated single-radius rows or vertical column frameworks.",
  version: "v1.1.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/button-group.tsx",
};

type GroupVariantType = "modern" | "minimal" | "glass" | "macos";

const groupProperties = [
  {
    name: "variant",
    type: "'modern' | 'minimal' | 'glass' | 'macos'",
    default: "'modern'",
    description: "Defines the shared container style track and automated child micro-radius adjustments.",
  },
  {
    name: "orientation",
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: "Controls the structural axis alignment and localized border radius flatting layers.",
  },
  {
    name: "size",
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "undefined",
    description: "Propagates a uniform sizing layout down to all child action nodes automatically.",
  },
];

export default function ButtonGroupDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playgroundVariant, setPlaygroundVariant] = useState<GroupVariantType>("modern");
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    playground: "preview",
    "basic-row": "preview",
    "stepper-example": "preview",
    "vertical-flow": "preview",
  });

  const handleCopy = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const playgroundCode = `<ButtonGroup variant="${playgroundVariant}" size="sm">
  <Button>Dashboard</Button>
  <Button>Analytics</Button>
  <Button>Settings</Button>
</ButtonGroup>`;

  const rightBarItems = [
    { label: "Interactive Playground", href: "#playground" },
    { label: "Action Clusters", href: "#basic-row" },
    { label: "Segmented Adjusters", href: "#stepper-example" },
    { label: "Vertical Stack", href: "#vertical-flow" },
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
        {/* Page Header */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Base Components", href: "/docs/components#base-components" },
              { label: componentMeta.title, href: "/docs/components/base-components/button-groups" },
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

        {/* 1. GLOBAL INTERACTIVE PLAYGROUND */}
        <section id="playground" className="space-y-4 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h3 className="text-lg font-bold tracking-tight text-foreground">Aesthetic Track Playground</h3>
              <p className="text-xs text-muted-foreground">
                Toggle systemic variants to view custom track layouts and inheritances live.
              </p>
            </div>

            {/* Token Switcher Tabs */}
            <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-muted/20 p-1 text-xs">
              {(["modern", "minimal", "glass", "macos"] as GroupVariantType[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setPlaygroundVariant(v)}
                  className={`rounded-md px-2.5 py-1 font-semibold capitalize transition-all ${
                    playgroundVariant === v
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
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${
                    (activeTabs["playground"] || "preview") === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  <IconEye className="h-3.5 w-3.5" /> Preview
                </button>
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, playground: "code" }))}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${
                    activeTabs["playground"] === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  <IconCode className="h-3.5 w-3.5" /> Code
                </button>
              </div>
              <button
                onClick={() => handleCopy("playground", playgroundCode)}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {copiedId === "playground" ? (
                  <><IconCheck className="h-3.5 w-3.5 text-emerald-500" /> Copied</>
                ) : (
                  <><IconCopy className="h-3.5 w-3.5" /> Copy Wrapper</>
                )}
              </button>
            </div>

            <div className="flex min-h-[160px] items-center justify-center p-8 bg-gradient-to-br from-transparent to-primary/[0.01]">
              {(activeTabs["playground"] || "preview") === "preview" ? (
                <ButtonGroup variant={playgroundVariant} size="sm">
                  <Button className="px-3 py-1.5 font-medium text-xs">Dashboard</Button>
                  <Button className="px-3 py-1.5 font-medium text-xs">Analytics</Button>
                  <Button className="px-3 py-1.5 font-medium text-xs">Settings</Button>
                </ButtonGroup>
              ) : (
                <pre className="w-full overflow-x-auto rounded-xl border border-border/60 bg-background/60 p-4 font-mono text-xs text-foreground">
                  <code>{playgroundCode}</code>
                </pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* 2. STANDARD PATTERNS STACK */}
        <div className="space-y-10">
          {/* Action Clusters */}
          <section id="basic-row" className="space-y-3 scroll-mt-20">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold tracking-tight text-foreground">Action Clusters</h3>
              <p className="text-xs text-muted-foreground">Standard row groups using external boundary strokes for high clean visual parity.</p>
            </div>
            <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
              <div className="p-6 flex items-center justify-center">
                <ButtonGroup variant="modern" size="sm">
                  <Button className="px-3 py-1 text-xs">Left Align</Button>
                  <Button className="px-3 py-1 text-xs">Center Align</Button>
                  <Button className="px-3 py-1 text-xs">Right Align</Button>
                </ButtonGroup>
              </div>
              </DocsPanel>
            </section>

          {/* Segmented Adjusters */}
          <section id="stepper-example" className="space-y-3 scroll-mt-20">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold tracking-tight text-foreground">Segmented Adjusters</h3>
              <p className="text-xs text-muted-foreground">Mixing semantic button states natively within quantitative layouts.</p>
            </div>
            <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
              <div className="p-6 flex items-center justify-center">
                <ButtonGroup variant="minimal" size="sm">
                  <Button className="px-3 py-1 font-bold">-</Button>
                  <Button className="px-4 py-1 font-mono bg-background/80 pointer-events-none shadow-xs">12</Button>
                  <Button className="px-3 py-1 font-bold">+</Button>
                </ButtonGroup>
              </div>
              </DocsPanel>
            </section>

          {/* Vertical Stack Orientation */}
          <section id="vertical-flow" className="space-y-3 scroll-mt-20">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold tracking-tight text-foreground">Vertical Stack Orientation</h3>
              <p className="text-xs text-muted-foreground">Pivoting track systems safely along column layouts utilizing orientation options.</p>
            </div>
            <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
              <div className="p-6 flex items-center justify-center">
                <ButtonGroup orientation="vertical" variant="modern" className="w-44">
                  <Button className="px-4 py-2 text-left text-xs font-semibold">Top Command</Button>
                  <Button className="px-4 py-2 text-left text-xs font-semibold">Middle Options</Button>
                  <Button className="px-4 py-2 text-left text-xs font-semibold">Bottom Action</Button>
                </ButtonGroup>
              </div>
              </DocsPanel>
            </section>
        </div>

        {/* 3. API REFERENCE MATRIX */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconLayoutGrid stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">API Reference</h2>
              <p className="text-xs text-muted-foreground">Properties, tokens, and configuration bindings available on the wrapper track primitive.</p>
            </div>
          </div>

          <DocsPanel className="overflow-hidden bg-card/10">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-border/60 bg-secondary/30 font-semibold text-muted-foreground">
                    <th className="w-[18%] p-3 font-semibold">Property</th>
                    <th className="w-[32%] p-3 font-semibold">Type</th>
                    <th className="w-[12%] p-3 font-semibold">Default</th>
                    <th className="w-[38%] p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 font-medium">
                  {groupProperties.map((prop) => (
                    <tr key={prop.name} className="transition-colors hover:bg-secondary/10">
                      <td className="p-3 font-mono font-bold text-primary">{prop.name}</td>
                      <td className="p-3 font-mono text-[11px] text-purple-600 dark:text-purple-400 leading-relaxed">{prop.type}</td>
                      <td className="p-3 font-mono text-foreground/70">{prop.default}</td>
                      <td className="p-3 font-normal leading-relaxed text-muted-foreground">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DocsPanel>
        </section>

        <DocsAdjacentNav />

        <footer className="border-t border-border/30 pt-4 text-center text-xs text-muted-foreground/40">
          © 2026 Venti UI Labs. System architecture primitives.
        </footer>
      </main>
    </DocsPageFrame>
  );
}