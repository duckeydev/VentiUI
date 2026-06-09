"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconGridPattern,
  IconSparkles,
} from "@tabler/icons-react";

import { Grid, GridItem } from "@/components/grid"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Grid System Layout",
  description: "A declarative responsive layout engine built using fluid track ratios, structural gap properties, and explicit geometric sub-spans.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/grid.tsx",
};

const examples = [
  {
    id: "responsive-columns",
    title: "Responsive Grid Blueprint",
    description: "Automatically maps geometric tracks scaling gracefully across viewport configurations via declarative columns.",
    code: `import { Grid, GridItem } from "@/components/grid";

export function StandardLayout() {
  return (
    <Grid cols={3} gap="md">
      <div className="bg-primary/10 p-4 rounded-lg font-mono text-center">01</div>
      <div className="bg-primary/10 p-4 rounded-lg font-mono text-center">02</div>
      <div className="bg-primary/10 p-4 rounded-lg font-mono text-center">03</div>
    </Grid>
  );
}`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-xl bg-card/40 backdrop-blur-sm">
        <Grid cols={3} gap="md" className="w-full">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="bg-secondary/80 border border-border/60 text-foreground p-4 rounded-xl font-mono text-xs font-bold text-center">
              0{idx}
            </div>
          ))}
        </Grid>
      </div>
    ),
  },
  {
    id: "asymmetric-spans",
    title: "Asymmetric Column Spanning",
    description: "Combine GridItem sub-containers to design complex dash structures, asymmetrical hero splits, or sidebars.",
    code: `import { Grid, GridItem } from "@/components/grid";

export function DashboardSplit() {
  return (
    <Grid cols={4} gap="sm">
      <GridItem colSpan={1} className="bg-secondary p-4">Sidebar</GridItem>
      <GridItem colSpan={3} className="bg-secondary p-4">Main Panel</GridItem>
    </Grid>
  );
}`,
    render: () => (
      <div className="p-6 border border-border/40 rounded-xl bg-card/20 w-full max-w-xl">
        <Grid cols={4} gap="sm" className="w-full">
          <GridItem colSpan={1} className="bg-primary/10 border border-primary/20 text-primary p-4 rounded-xl font-mono text-xs font-bold text-center">
            Span 1 (Nav)
          </GridItem>
          <GridItem colSpan={3} className="bg-secondary/80 border border-border/60 text-foreground p-4 rounded-xl font-mono text-xs font-bold text-center">
            Span 3 (Workspace Canvas)
          </GridItem>
          <GridItem colSpan={12} className="bg-muted border border-border/40 text-muted-foreground p-2 rounded-lg font-mono text-[10px] text-center">
            Span Full (Footer Segment)
          </GridItem>
        </Grid>
      </div>
    ),
  },
];

const gridProperties = [
  { name: "cols", type: "1 | 2 | 3 | 4 | 5 | 6 | 12 | 'default'", default: "'default'", description: "Configures responsive CSS Grid columns across screen break breakpoints." },
  { name: "gap", type: "'none' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Applies standard margin pacing parameters between inner layout item nodes." },
  { name: "align", type: "'start' | 'center' | 'end' | 'stretch'", default: "'stretch'", description: "Sets element positioning configurations along the vertical layout track axes." },
  { name: "as", type: "React.ElementType", default: "'div'", description: "Overrides structural tag mappings to render custom container boxes (e.g. 'section', 'form')." },
];

export default function GridDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    "responsive-columns": "preview",
    "asymmetric-spans": "preview",
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
      rightBar={<DocsOutline title="On this page" items={[...examples.map(e => ({ label: e.title, href: `#${e.id}` })), { label: "Grid Reference API", href: "#props-api" }]} />}
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">
        {/* Core Header Content Section */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Structure Primitives", href: "/docs/components#structure" },
              { label: "Grid System", href: "/docs/components/structure/grid" },
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

        {/* Dynamic Interactive Playgrounds */}
        <div className="space-y-10">
          {examples.map((example) => {
            const currentTab = activeTabs[example.id] || "preview";

            return (
              <section key={example.id} id={example.id} className="space-y-3 scroll-mt-20">
                <div className="flex items-center gap-2">
                  <IconGridPattern className="h-4 w-4 text-primary" />
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

        {/* Component Configuration Properties Reference API Matrix */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconSparkles stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">Grid API Reference</h2>
              <p className="text-xs text-muted-foreground">
                Properties parameters and token definitions parsed by the central custom layout components.
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
                  {gridProperties.map((prop) => (
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
          © 2026 Venti UI Labs. Modular structural orchestration tools.
        </footer>
      </main>
    </DocsPageFrame>
  );
}