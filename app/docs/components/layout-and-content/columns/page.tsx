"use client";

import React from "react";
import { IconCode, IconCopy, IconEye, IconSparkles } from "@tabler/icons-react";
import { Grid, Column } from "@/components/column";
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Column & Grid",
  description: "A flexible, 12-column responsive grid layout matrix built with native CSS Grids for orchestrating structural dashboard dashboard layouts.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/column.tsx",
};

const examples = [
  {
    id: "basic",
    title: "12-Column Track Basics",
    description: "Demonstrating clean 12-column subdivisions across various custom spans.",
    code: `<Grid gap="md">
  <Column span={4}>One Third Block</Column>
  <Column span={8}>Two Thirds Block</Column>
</Grid>`,
    render: () => (
      <div className="w-full bg-muted/10 p-4 rounded-xl border border-border/40">
        <Grid gap="sm">
          <Column span={4}>
            <div className="bg-primary/5 border border-primary/20 text-primary p-4 rounded-lg text-center text-xs font-mono font-bold">span={4}</div>
          </Column>
          <Column span={8}>
            <div className="bg-primary/5 border border-primary/20 text-primary p-4 rounded-lg text-center text-xs font-mono font-bold">span={8}</div>
          </Column>
        </Grid>
      </div>
    ),
  },
  {
    id: "responsive",
    title: "Responsive Breakpoint Inheritances",
    description: "Stacks layout items cleanly on mobile screens while automatically expanding into structural multi-column cards on larger viewports.",
    code: `<Grid gap="md">
  <Column span={12} md={6} lg={3}>Card A</Column>
  <Column span={12} md={6} lg={3}>Card B</Column>
</Grid>`,
    render: () => (
      <div className="w-full bg-muted/10 p-4 rounded-xl border border-border/40">
        <Grid gap="sm">
          {[1, 2, 3, 4].map((i) => (
            <Column key={i} span={12} md={6} lg={3}>
              <div className="bg-indigo-500/5 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 p-4 rounded-lg text-center text-xs font-mono font-bold">
                span=12 md=6 lg=3
              </div>
            </Column>
          ))}
        </Grid>
      </div>
    ),
  },
  {
    id: "gaps",
    title: "Visual Gutter Scaling",
    description: "Adjust track separation spacing distances effortlessly via the parent container's gap prop ecosystem.",
    code: `<Grid gap="xl">
  <Column span={6}>Left Block Element</Column>
  <Column span={6}>Right Block Element</Column>
</Grid>`,
    render: () => (
      <div className="w-full bg-muted/10 p-4 rounded-xl border border-border/40">
        <Grid gap="xl">
          <Column span={6}>
            <div className="bg-amber-500/5 border border-amber-500/20 text-amber-600 p-4 rounded-lg text-center text-xs font-mono">Extra Large Gap</div>
          </Column>
          <Column span={6}>
            <div className="bg-amber-500/5 border border-amber-500/20 text-amber-600 p-4 rounded-lg text-center text-xs font-mono">Extra Large Gap</div>
          </Column>
        </Grid>
      </div>
    ),
  },
];

const apiProperties = [
  { name: "gap", type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Alters the internal row/column separation tracks gutter spacing metrics on the main Grid wrapper." },
  { name: "span", type: "ColumnSpan (1-12 | 'auto' | 'full')", default: '"full"', description: "Fallback standard mobile or uniform breakpoint span constraint value." },
  { name: "md", type: "ColumnSpan", default: "-", description: "The span scale calculation initialized at the medium layout viewport layer (768px+)." },
  { name: "lg", type: "ColumnSpan", default: "-", description: "The span scale calculation initialized at the large layout viewport layer (1024px+)." },
];

export default function ColumnDocsPage() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [activeTabs, setActiveTabs] = React.useState<Record<string, "preview" | "code">>({
    basic: "preview", responsive: "preview", gaps: "preview"
  });

  const handleCopy = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleTab = (id: string, tab: "preview" | "code") => {
    setActiveTabs((prev) => ({ ...prev, [id]: tab }));
  };

  return (
    <DocsPageFrame
      leftBar={<aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-border/40"><DocsSidebar /></aside>}
      rightBar={<DocsOutline title="On this page" items={[...examples.map((e) => ({ label: e.title, href: `#${e.id}` })), { label: "Properties API", href: "#props-api" }]} />}
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">
        {/* Header Block */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs items={[{ label: "Docs", href: "/docs" }, { label: "Base Components", href: "/docs/components#base-components" }, { label: componentMeta.title, href: "/docs/components/base-components/columns" }]} />
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">{componentMeta.title}</h1>
            <span className="mt-1.5 rounded bg-primary/10 border border-primary/20 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">{componentMeta.version}</span>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">{componentMeta.description}</p>
          <div className="flex items-center gap-3 pt-2">
            <a href={componentMeta.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"><IconCode className="h-3.5 w-3.5" /> View Source</a>
          </div>
        </div>

        {/* Mapped Live Previews */}
        <div className="space-y-14">
          {examples.map((example) => {
            const currentTab = activeTabs[example.id] || "preview";
            return (
              <section key={example.id} id={example.id} className="space-y-4 scroll-mt-20">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">{example.title}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{example.description}</p>
                </div>

                <DocsPanel className="overflow-hidden rounded-xl border border-border/50 bg-card/20">
                  <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-3 py-2">
                    <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-1 text-[11px] font-medium">
                      <button onClick={() => toggleTab(example.id, "preview")} className={`flex items-center gap-1 rounded-md px-3 py-1 transition-all ${currentTab === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}><IconEye className="h-3.5 w-3.5" /> Preview</button>
                      <button onClick={() => toggleTab(example.id, "code")} className={`flex items-center gap-1 rounded-md px-3 py-1 transition-all ${currentTab === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}><IconCode className="h-3.5 w-3.5" /> Code</button>
                    </div>
                    <button onClick={() => handleCopy(example.id, example.code)} className="cursor-pointer rounded-md border border-border/60 bg-card/60 p-2 text-muted-foreground transition-all hover:border-border hover:text-foreground">{copiedId === example.id ? <IconSparkles className="h-3.5 w-3.5 text-emerald-500" /> : <IconCopy className="h-3.5 w-3.5" />}</button>
                  </div>

                  <div className="flex min-h-[160px] items-center justify-center bg-card/5 p-6">
                    {currentTab === "preview" ? <example.render /> : <pre className="w-full overflow-x-auto rounded-lg border border-border/40 bg-muted/20 p-5 font-mono text-xs leading-relaxed text-muted-foreground"><code>{example.code}</code></pre>}
                  </div>
                </DocsPanel>
              </section>
            );
          })}
        </div>

        {/* API Table */}
        <section id="props-api" className="space-y-6 scroll-mt-20 pt-4">
          <div className="flex items-center gap-3 border-b border-border/40 pb-4">
            <div className="rounded-xl border border-border/50 bg-primary/5 p-2 text-primary"><IconSparkles stroke={2.5} className="h-5 w-5" /></div>
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">API Reference</h2>
              <p className="text-sm text-muted-foreground">Comprehensive property configurations and custom utility definitions for Layout Grids.</p>
            </div>
          </div>

          <DocsPanel className="overflow-hidden border border-border/40 bg-card/5 rounded-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/50 font-semibold text-muted-foreground">
                    <th className="w-[20%] p-4 font-bold uppercase tracking-wider">Property</th>
                    <th className="w-[30%] p-4 font-bold uppercase tracking-wider">Type</th>
                    <th className="w-[15%] p-4 font-bold uppercase tracking-wider">Default</th>
                    <th className="w-[35%] p-4 font-bold uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 font-medium">
                  {apiProperties.map((prop) => (
                    <tr key={prop.name} className="transition-colors hover:bg-muted/30">
                      <td className="p-4 font-mono font-bold text-primary">{prop.name}</td>
                      <td className="p-4 font-mono text-[10px] text-muted-foreground leading-relaxed">{prop.type}</td>
                      <td className="p-4 font-mono text-foreground/70 italic">{prop.default}</td>
                      <td className="p-4 font-normal leading-relaxed text-muted-foreground">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DocsPanel>
        </section>

        <DocsAdjacentNav />
        <footer className="border-t border-border/30 pt-8 pb-10 text-center text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/40">© 2026 Venti UI Labs. Layout foundations primitive.</footer>
      </main>
    </DocsPageFrame>
  );
}