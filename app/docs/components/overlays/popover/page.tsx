"use client";

import { useState } from "react";
import {
  IconCode,
  IconEye,
  IconExternalLink,
  IconLayersIntersect,
  IconSparkles,
  IconCheck,
  IconCopy,
  IconInfoCircle,
  IconAdjustmentsHorizontal
} from "@tabler/icons-react";

import { Popover } from "@/components/popover"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Popover Flyout Node",
  description: "A rich content overlay primitive anchored directly onto target component coordinates, supporting custom operational dashboards, parameters forms, or interactive tooltips.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/popover.tsx",
};

export default function PopoverDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  
  // Localized configuration parameters state examples
  const [analyticsActive, setAnalyticsActive] = useState(true);
  const [streamInterval, setStreamInterval] = useState("500ms");

  const exampleCode = `import { Popover } from "@/components/popover";

export function ConfigSettings() {
  return (
    <Popover
      align="center"
      trigger={<button className="px-3 py-1.5 bg-primary text-black rounded-lg">Adjust View</button>}
    >
      <div className="space-y-2">
        <h4 className="font-bold text-xs text-foreground">Layout Matrix Parameters</h4>
        <p className="text-[11px] text-muted-foreground">Modify local viewport render bounds manually.</p>
      </div>
    </Popover>
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
            { label: "Popover Specification Matrix", href: "#props-api" },
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
              { label: "Popover Flyout", href: "/docs/components/overlays/popover" },
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
            <IconLayersIntersect className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-bold tracking-tight text-foreground">Interactive Implementation</h3>
          </div>
          <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
            Click the anchor badge to scale open the inline control framework portal. Dismiss with an outer mask tap or by hitting Escape.
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
                <div className="w-full max-w-xs flex flex-col items-center gap-4">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60 text-center">
                    Dashboard Diagnostic Nodes
                  </label>
                  
                  <Popover
                    align="center"
                    trigger={
                      <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-xs font-bold shadow-sm transition-all hover:bg-muted/40 cursor-pointer select-none text-foreground active:scale-95">
                        <IconAdjustmentsHorizontal className="w-3.5 h-3.5 text-primary" />
                        <span>Filter Engine Meta</span>
                      </button>
                    }
                  >
                    <div className="space-y-4 w-56 text-left">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold tracking-tight text-foreground flex items-center gap-1">
                          <IconInfoCircle className="w-3.5 h-3.5 text-muted-foreground/70" />
                          <span>Stream Properties</span>
                        </h4>
                        <p className="text-[10px] text-muted-foreground/70 leading-relaxed">
                          Adjust tracing variables executed across local system runtime channels.
                        </p>
                      </div>

                      <div className="border-t border-border/40 pt-3 space-y-3">
                        <label className="flex items-center justify-between gap-2 cursor-pointer select-none">
                          <span className="text-[11px] font-medium text-foreground/80">Continuous Diagnostics</span>
                          <input 
                            type="checkbox" 
                            checked={analyticsActive}
                            onChange={(e) => setAnalyticsActive(e.target.checked)}
                            className="rounded border-border text-primary focus:ring-primary/40 h-3.5 w-3.5"
                          />
                        </label>

                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wide">Polling Resolution</span>
                          <select 
                            value={streamInterval}
                            onChange={(e) => setStreamInterval(e.target.value)}
                            className="w-full bg-background border border-border/80 rounded-md p-1 text-[11px] font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                          >
                            <option value="100ms">100ms Burst</option>
                            <option value="500ms">500ms Balanced</option>
                            <option value="2000ms">2000ms Eco</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </Popover>

                  <span className="text-[10px] text-muted-foreground/40 font-mono mt-2 text-center">
                    Active State: [Live tracking: {analyticsActive ? "ON" : "OFF"} @ {streamInterval}]
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
              <h2 className="text-lg font-bold tracking-tight text-foreground">Popover API Reference</h2>
              <p className="text-xs text-muted-foreground">
                Properties parameters and coordinate alignment tracking configurations accepted by the target Popover primitive.
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
                    { name: "trigger", type: "ReactNode", default: "required", description: "The stationary child anchor element configured to trigger flyout visibility hooks on user click." },
                    { name: "children", type: "ReactNode", default: "required", description: "The structural content nodes nested inside the context canvas popover container." },
                    { name: "align", type: '"left" | "right" | "center"', default: '"center"', description: "Controls horizontal alignment anchor offsets matching viewport clearance requirements." },
                    { name: "className", type: "string", default: "undefined", description: "Optional overrides passed directly to the absolute layout panel component container." },
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
          © 2026 Venti UI Labs. Non-modal coordinate popover layout overlay architectures.
        </footer>
      </main>
    </DocsPageFrame>
  );
}