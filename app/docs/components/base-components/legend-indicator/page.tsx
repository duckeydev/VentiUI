"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconChartDonut,
  IconSparkles,
} from "@tabler/icons-react";

import { LegendIndicator } from "@/components/legendIndicator"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Legend Indicator",
  description: "A compact key layout component designed for describing tracking variables, charting datasets, data summaries, and multi-tier telemetry metrics.",
  version: "v1.1.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/legend-indicator.tsx",
};

const examples = [
  {
    id: "standard-legend",
    title: "Tailwind Color Mapping",
    description: "The conventional setup utilizing native theme utility declarations alongside quantitative scalar strings to map out cloud infrastructure distributions.",
    code: `<div className="space-y-1 w-full max-w-xs">
  <LegendIndicator color="bg-indigo-500" label="Active CDN Edge Requests" value="42,105" />
  <LegendIndicator color="bg-emerald-500" label="Cold Cache File Synchronizations" value="12,894" />
  <LegendIndicator color="bg-amber-500" label="Dropped Legacy Router Nodes" value="412" />
</div>`,
    render: () => (
      <div className="w-full max-w-xs border border-border/50 bg-card/40 p-4 rounded-xl shadow-sm">
        <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground block mb-2 px-1">Infrastructure Load</span>
        <div className="space-y-0.5">
          <LegendIndicator color="bg-indigo-500" label="Active CDN Edge Requests" value="42,105" />
          <LegendIndicator color="bg-emerald-500" label="Cold Cache File Synchronizations" value="12,894" />
          <LegendIndicator color="bg-amber-500" label="Dropped Legacy Router Nodes" value="412" />
        </div>
      </div>
    ),
  },
  {
    id: "custom-colors",
    title: "Raw Inline Hex Values",
    description: "Pass explicit hex, RGB, or HSL color strings directly into the component. Ideal when dealing with dynamic color palettes served directly from external databases.",
    code: `<div className="space-y-1 w-full max-w-xs">
  <LegendIndicator color="#FF007A" label="Customer Acquisition Spends" value="64.2%" />
  <LegendIndicator color="#7928CA" label="Organic Retention Metrics" value="28.5%" />
  <LegendIndicator color="#00DFD8" label="Affiliate Attribution Nodes" value="7.3%" />
</div>`,
    render: () => (
      <div className="w-full max-w-xs border border-border/50 bg-card/40 p-4 rounded-xl shadow-sm">
        <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground block mb-2 px-1">Budget Allocation Allocation</span>
        <div className="space-y-0.5">
          <LegendIndicator color="#FF007A" label="Customer Acquisition Spends" value="64.2%" />
          <LegendIndicator color="#7928CA" label="Organic Retention Metrics" value="28.5%" />
          <LegendIndicator color="#00DFD8" label="Affiliate Attribution Nodes" value="7.3%" />
        </div>
      </div>
    ),
  },
];

const apiProperties = [
  { name: "label", type: "string", default: "required", description: "The core classification header tracking parameter text output." },
  { name: "color", type: "string", default: "'bg-primary'", description: "Accepts utility compilation parameters (e.g., 'bg-sky-400') or direct hex hashes (e.g., '#00FF00')." },
  { name: "value", type: "string | number", default: "undefined", description: "Optional explicit alignment string or number metric displayed floating to the right border boundary." },
  { name: "className", type: "string", default: "''", description: "Bespoke style overrides appended straight down onto the text line wrapper node element." },
];

const rightBarItems = [
  ...examples.map((example) => ({ label: example.title, href: `#${example.id}` })),
  { label: "Properties API", href: "#props-api" },
];

export default function LegendIndicatorDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    "standard-legend": "preview",
    "custom-colors": "preview",
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
      leftBar={
        <aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-border/40">
          <DocsSidebar />
        </aside>
      }
      rightBar={<DocsOutline title="On this page" items={rightBarItems} />}
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">
        {/* Documentation Context Header Area */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Data Display", href: "/docs/components#display" },
              { label: "Legend Indicator", href: "/docs/components/display/legend-indicator" },
            ]}
          />

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
              {componentMeta.title}
            </h1>
            <span className="mt-1.5 rounded bg-secondary border border-border/80 px-2 py-0.5 font-mono text-[11px] font-bold text-muted-foreground">
              {componentMeta.version}
            </span>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">{componentMeta.description}</p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={componentMeta.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconCode className="h-3.5 w-3.5" /> View Package Source
              <IconExternalLink className="h-2.5 w-2.5 text-muted-foreground/60" />
            </a>
          </div>
        </div>

        {/* Interactive Workspace Sandboxes */}
        <div className="space-y-10">
          {examples.map((example) => {
            const currentTab = activeTabs[example.id] || "preview";

            return (
              <section key={example.id} id={example.id} className="space-y-3 scroll-mt-20">
                <div className="flex items-center gap-2">
                  <IconChartDonut className="h-4 w-4 text-primary" />
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{example.title}</h3>
                </div>
                <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">{example.description}</p>

                <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
                  <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
                    <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs font-medium">
                      <button
                        onClick={() => toggleTab(example.id, "preview")}
                        className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${currentTab === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <IconEye className="h-3.5 w-3.5" /> Preview
                      </button>
                      <button
                        onClick={() => toggleTab(example.id, "code")}
                        className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${currentTab === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <IconCode className="h-3.5 w-3.5" /> Code
                      </button>
                    </div>
                    <button
                      onClick={() => handleCopy(example.id, example.code)}
                      className="cursor-pointer rounded-md border border-border/60 bg-card/60 p-1.5 text-muted-foreground transition-all hover:border-border hover:text-foreground"
                    >
                      {copiedId === example.id ? (
                        <IconCheck className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <IconCopy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex min-h-32 items-center justify-center bg-card/10 p-6">
                    {currentTab === "preview" ? (
                      <example.render />
                    ) : (
                      <pre className="w-full overflow-x-auto rounded-lg border border-border/40 bg-muted/20 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                        <code>{example.code}</code>
                      </pre>
                    )}
                  </div>
                </DocsPanel>
              </section>
            );
          })}
        </div>

        {/* Parameter Attribute Matrix */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconSparkles stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">API Reference</h2>
              <p className="text-xs text-muted-foreground">
                Properties parameters and styling configuration structures assigned onto the LegendIndicator elements.
              </p>
            </div>
          </div>

          <DocsPanel className="overflow-hidden bg-card/30 rounded-xl border border-border/60">
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
                  {apiProperties.map((prop) => (
                    <tr key={prop.name} className="transition-colors hover:bg-secondary/20 vertical-align-top">
                      <td className="p-3 font-mono font-bold text-primary">{prop.name}</td>
                      <td className="p-3 font-mono text-purple-600 dark:text-purple-400 leading-relaxed">{prop.type}</td>
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
          © 2026 Venti UI Labs. Modular interface logic primitives.
        </footer>
      </main>
    </DocsPageFrame>
  );
}