"use client";

import { useState } from "react";
import {
  IconCode,
  IconEye,
  IconExternalLink,
  IconMessageCircle,
  IconSparkles,
  IconCheck,
  IconCopy,
  IconPlus,
  IconTrash,
  IconCloudUpload,
  IconInfoCircle
} from "@tabler/icons-react";

import { Tooltip } from "@/components/tooltip"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Tooltip Hint Matrix",
  description: "A transient contextual message string overlay mapped onto elements via pointer tracking matrices to explain subtle structural control paths.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/tooltip.tsx",
};

export default function TooltipDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const exampleCode = `import { Tooltip } from "@/components/tooltip";
import { IconPlus } from "@tabler/icons-react";

export function QuickActions() {
  return (
    <Tooltip content="Provision New API Client Node" position="top">
      <button className="p-2 border rounded-lg bg-background">
        <IconPlus className="w-4 h-4" />
      </button>
    </Tooltip>
  );
}`;

  return (
    <DocsPageFrame
      leftBar={
        <aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-border/40">
          <DocsSidebar />
        </aside>
      }
      rightBar={
        <DocsOutline
          title="On this page"
          items={[
            { label: "Interactive Component Layout", href: "#interactive-demo" },
            { label: "Tooltip Specification Matrix", href: "#props-api" },
          ]}
        />
      }
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">
        {/* Core Header Section Workspace */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Overlay Primitives", href: "/docs/components#overlays" },
              { label: "Tooltip Hint", href: "/docs/components/overlays/tooltip" },
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

        {/* Live Active Rendering Interactive Sandbox */}
        <section id="interactive-demo" className="space-y-3 scroll-mt-20">
          <div className="flex items-center gap-2">
            <IconMessageCircle className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-bold tracking-tight text-foreground">Interactive Implementation</h3>
          </div>
          <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
            Hover over or focus on the variant anchor blocks below to trigger localized helper hints across the dimensional boundaries.
          </p>

          <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
              <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs font-medium">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${activeTab === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <IconEye className="h-3.5 w-3.5" /> Preview
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${activeTab === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <IconCode className="h-3.5 w-3.5" /> Code
                </button>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(exampleCode);
                  setCopiedId("demo");
                  setTimeout(() => setCopiedId(null), 2000);
                }}
                className="cursor-pointer rounded-md border border-border/60 bg-card/60 p-1.5 text-muted-foreground transition-all hover:border-border hover:text-foreground"
              >
                {copiedId === "demo" ? (
                  <IconCheck className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <IconCopy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            <div className="flex min-h-64 flex-col items-center justify-center bg-card/10 p-6 overflow-visible">
              {activeTab === "preview" ? (
                <div className="w-full max-w-md flex flex-col items-center gap-8">
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    
                    {/* Top Position Example Element */}
                    <Tooltip content="SYS: CREATE_NODE" position="top">
                      <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted/40 transition-colors shadow-sm cursor-pointer">
                        <IconPlus className="w-4 h-4" />
                      </button>
                    </Tooltip>

                    {/* Right Position Example Element */}
                    <Tooltip content="DESTRUCTIVE: FLUSH_CACHE" position="right">
                      <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10 transition-colors shadow-sm cursor-pointer">
                        <IconTrash className="w-4 h-4" />
                      </button>
                    </Tooltip>

                    {/* Bottom Position Example Element */}
                    <Tooltip content="UPSTREAM: PUSH_DOCKER_BIN" position="bottom">
                      <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted/40 transition-colors shadow-sm cursor-pointer">
                        <IconCloudUpload className="w-4 h-4" />
                      </button>
                    </Tooltip>

                    {/* Left Position Example Element */}
                    <Tooltip content="INFO: CLUSTER_STATUS_OK" position="left">
                      <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-primary hover:bg-muted/40 transition-colors shadow-sm cursor-pointer">
                        <IconInfoCircle className="w-4 h-4" />
                      </button>
                    </Tooltip>

                  </div>
                  <span className="text-[10px] text-muted-foreground/40 font-mono text-center">
                    (Hover cursor pointers elements to observe alternate spatial orientations)
                  </span>
                </div>
              ) : (
                <pre className="w-full overflow-x-auto rounded-lg border border-border/40 bg-muted/20 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                  <code>{exampleCode}</code>
                </pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* Configurations Parameters Specifications API Matrices Area */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconSparkles stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">Tooltip API Reference</h2>
              <p className="text-xs text-muted-foreground">
                Properties parameters and position variables accepted by the tracking micro-hint pop.
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
                  {[
                    { name: "content", type: "ReactNode", default: "required", description: "The descriptive text context or element structure packed inside the popping bubble panel." },
                    { name: "children", type: "ReactNode", default: "required", description: "The core active target node frame that tracks hover cursor coordinates to summon the tip." },
                    { name: "position", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Controls the spatial vector projection anchor alignment relative to its wrapped baseline target." },
                    { name: "className", type: "string", default: "undefined", description: "Optional overrides passed directly onto the layout element structure block configuration container." },
                  ].map((prop) => (
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
          © 2026 Venti UI Labs. Pointer event tracking helper interaction layouts.
        </footer>
      </main>
    </DocsPageFrame>
  );
}