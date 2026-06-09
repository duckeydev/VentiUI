"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconLoader,
  IconSparkles,
} from "@tabler/icons-react";

import { Spinner } from "@/components/spinners"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Spinner",
  description: "An indeterminate activity loading primitive that supports clean SVG rotation frames, fluid multi-dot offsets, and modular dimensional scaling.",
  version: "v1.1.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/spinner.tsx",
};

const examples = [
{
    id: "variant-showcase",
    title: "Aesthetic Variants",
    description: "Explore a variety of loading indicators, from traditional tracks to modern, physics-based animations.",
    code: `<div className="grid grid-cols-2 gap-8">
  <Spinner variant="default" />
  <Spinner variant="dots" />
  <Spinner variant="pulse" />
  <Spinner variant="apple" />
  <Spinner variant="morph" />
  <Spinner variant="wave" />
</div>`,
    render: () => (
      <div className="grid grid-cols-3 gap-8 p-6 border border-border/50 rounded-2xl w-full max-w-sm bg-card/40 backdrop-blur-sm">
        {[
          { label: "default", val: "default" },
          { label: "dots", val: "dots" },
          { label: "pulse", val: "pulse" },
          { label: "apple", val: "apple" },
          { label: "morph", val: "morph" },
          { label: "wave", val: "wave" },
        ].map((item) => (
          <div key={item.val} className="flex flex-col items-center gap-2">
            {/* @ts-ignore */}
            <Spinner variant={item.val} size="md" />
            <span className="text-[10px] font-mono text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "size-scales",
    title: "Dimensional Scale Grid",
    description: "Utilize localized dynamic CSS properties to adapt layout sizes fluidly across action bars, content areas, or overlay backdrops.",
    code: `<div className="flex items-center gap-6">
  <Spinner size="sm" />
  <Spinner size="md" />
  <Spinner size="lg" />
  <Spinner size="xl" className="text-indigo-500" />
</div>`,
    render: () => (
      <div className="flex items-end justify-center gap-8 p-6 border border-border/40 rounded-xl bg-card/20 w-full max-w-md">
        <div className="flex flex-col items-center gap-1.5">
          <Spinner size="sm" />
          <span className="text-[10px] font-mono text-muted-foreground">sm</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Spinner size="md" />
          <span className="text-[10px] font-mono text-muted-foreground">md</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Spinner size="lg" />
          <span className="text-[10px] font-mono text-muted-foreground">lg</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Spinner size="xl" className="text-indigo-500 dark:text-indigo-400" />
          <span className="text-[10px] font-mono text-muted-foreground">xl</span>
        </div>
      </div>
    ),
  },
];

const apiProperties = [
  { name: "variant", type: "'default' | 'dots' | 'pulse'", default: "'default'", description: "Sets the geometric composition structure and mechanical animation loop behavior." },
  { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Drives internal element scaling via optimized design token tracking definitions." },
  { name: "color", type: "string", default: "undefined", description: "Overrides current theme text colors directly with raw design parameters (e.g., #hex, rgb)." },
  { name: "className", type: "string", default: "''", description: "Standard utility string injection point, typically targeting text color profiles (e.g., 'text-primary')." },
];

const rightBarItems = [
  ...examples.map((example) => ({ label: example.title, href: `#${example.id}` })),
  { label: "Properties API", href: "#props-api" },
];

export default function SpinnerDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    "variant-showcase": "preview",
    "size-scales": "preview",
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
        {/* Component Title Documentation Header */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Feedback Elements", href: "/docs/components#feedback" },
              { label: "Spinner", href: "/docs/components/feedback/spinner" },
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

        {/* Dynamic Sandboxes */}
        <div className="space-y-10">
          {examples.map((example) => {
            const currentTab = activeTabs[example.id] || "preview";

            return (
              <section key={example.id} id={example.id} className="space-y-3 scroll-mt-20">
                <div className="flex items-center gap-2">
                  <IconLoader className="h-4 w-4 text-primary animate-spin [animation-duration:4s]" />
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

                  <div className="flex min-h-36 items-center justify-center bg-card/10 p-6 overflow-hidden">
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

        {/* Properties Table Matrix Reference */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconSparkles stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">API Reference</h2>
              <p className="text-xs text-muted-foreground">
                Properties parameters and configuration types accepted by the Spinner indicator block.
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