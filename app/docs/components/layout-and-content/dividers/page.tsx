"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconSeparator,
  IconSparkles,
} from "@tabler/icons-react";

import { Divider } from "@/components/divider"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Structural Divider Core",
  description: "An enhanced layout partitioning primitive extending the native thematic breakdown element with variable vector channels, styling masks, and integrated copy blocks.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/divider.tsx",
};

const examples = [
  {
    id: "divider-variants",
    title: "Structural Boundary Masks",
    description: "Cycle across clean solid rows, architectural layout dashed lines, or subtle decorative fade gradients to partition application interface windows.",
    code: `import { Divider } from "@/components/divider";

export function Interface() {
  return (
    <div className="space-y-4">
      <Divider variant="default" />
      <Divider variant="dashed" />
      <Divider variant="gradient" />
    </div>
  );
}`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-xl bg-card/40 backdrop-blur-sm flex flex-col gap-6">
        <div className="w-full text-left space-y-1">
          <span className="text-[10px] font-mono opacity-40">variant="default"</span>
          <Divider variant="default" />
        </div>
        <div className="w-full text-left space-y-1">
          <span className="text-[10px] font-mono opacity-40">variant="dashed"</span>
          <Divider variant="dashed" />
        </div>
        <div className="w-full text-left space-y-1">
          <span className="text-[10px] font-mono opacity-40">variant="gradient"</span>
          <Divider variant="gradient" />
        </div>
      </div>
    ),
  },
  {
    id: "labeled-tracks",
    title: "Embedded Text Content Labels",
    description: "Inject typography tags into horizontal separators cleanly, with left, center, or right alignment presets.",
    code: `<Divider variant="default" labelPosition="center">
  Security Authorization Required
</Divider>`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-xl bg-card/40 backdrop-blur-sm flex flex-col gap-6">
        <Divider labelPosition="left">Metadata Overview</Divider>
        <Divider labelPosition="center">System Breakpoint Area</Divider>
        <Divider labelPosition="right" variant="dashed">Terminal Configuration Logs</Divider>
      </div>
    ),
  },
  {
    id: "vertical-vectors",
    title: "Vertical Column Segmentation",
    description: "Explicitly pass orientation parameters to segment side-by-side toolbar utilities or multi-column layout flows.",
    code: `<div className="flex h-5 items-center gap-2">
  <span>Option Alpha</span>
  <Divider orientation="vertical" />
  <span>Option Beta</span>
</div>`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-xs bg-card/40 backdrop-blur-sm flex justify-center items-center gap-4 text-xs text-muted-foreground font-mono">
        <span>Edit Track</span>
        <Divider orientation="vertical" className="h-4" />
        <span>Staging Vault</span>
        <Divider orientation="vertical" variant="dashed" className="h-4" />
        <span>Deployment</span>
      </div>
    ),
  },
];

const dividerProperties = [
  { name: "orientation", type: "'horizontal' | 'vertical'", default: "'horizontal'", description: "Controls layout axis behavior, adapting constraints to fill height or stretch full width paths." },
  { name: "variant", type: "'default' | 'dashed' | 'gradient'", default: "'default'", description: "Alters visual formatting tokens, toggling border-style tracks or horizontal gradient masks." },
  { name: "labelPosition", type: "'left' | 'center' | 'right'", default: "'center'", description: "Aligns structural children node components contextually inside horizontal layouts." },
];

export default function DividerDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    "divider-variants": "preview",
    "labeled-tracks": "preview",
    "vertical-vectors": "preview",
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
      rightBar={<DocsOutline title="On this page" items={[...examples.map(e => ({ label: e.title, href: `#${e.id}` })), { label: "Divider API Reference", href: "#props-api" }]} />}
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">
        {/* Core Header Content Area */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Structure Primitives", href: "/docs/components#structure" },
              { label: "Divider Component", href: "/docs/components/structure/divider" },
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

        {/* Live Active Previews */}
        <div className="space-y-10">
          {examples.map((example) => {
            const currentTab = activeTabs[example.id] || "preview";

            return (
              <section key={example.id} id={example.id} className="space-y-3 scroll-mt-20">
                <div className="flex items-center gap-2">
                  <IconSeparator className="h-4 w-4 text-primary" />
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

        {/* Configurations Parameters Specifications API Area */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconSparkles stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">Divider API Reference</h2>
              <p className="text-xs text-muted-foreground">
                Properties parameters and token definitions accepted by the Divider element wrapper.
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
                  {dividerProperties.map((prop) => (
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
          © 2026 Venti UI Labs. Partition structural framework tokens.
        </footer>
      </main>
    </DocsPageFrame>
  );
}