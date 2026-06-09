"use client";

import { useState } from "react";
import {
  IconCode,
  IconEye,
  IconExternalLink,
  IconLayoutSidebarLeftCollapse,
  IconSparkles,
  IconCheck,
  IconCopy,
  IconLayoutGrid,
  IconBell,
  IconBolt,
  IconHelpCircle
} from "@tabler/icons-react";

import { Offcanvas } from "@/components/offcanvas"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Offcanvas Panel Node",
  description: "A flexible overlay drawer that slides into view from viewport screen margins, accommodating complex navigation architectures, settings grids, or activity feeds.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/offcanvas.tsx",
};

export default function OffcanvasDocsPage() {
  const [isOpenRight, setIsOpenRight] = useState(false);
  const [isOpenLeft, setIsOpenLeft] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const exampleCode = `import { useState } from "react";
import { Offcanvas } from "@/components/offcanvas";

export function AdminControlPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Configurations</button>
      
      <Offcanvas
        isOpen={open}
        onClose={() => setOpen(false)}
        position="right"
        title="Workspace Infrastructure"
      >
        <p>Manage localized engine properties and variables here.</p>
      </Offcanvas>
    </>
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
            { label: "Offcanvas Specification Matrix", href: "#props-api" },
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
              { label: "Offcanvas Sheet", href: "/docs/components/overlays/offcanvas" },
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
            <IconLayoutSidebarLeftCollapse className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-bold tracking-tight text-foreground">Interactive Implementation</h3>
          </div>
          <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
            Test both edge-docking alignment properties below to observe contextual spring transition profiles.
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

            <div className="flex min-h-64 flex-col sm:flex-row items-center justify-center gap-4 bg-card/10 p-6 overflow-visible">
              {activeTab === "preview" ? (
                <>
                  <button
                    onClick={() => setIsOpenLeft(true)}
                    className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-xs font-bold shadow-sm transition-all hover:bg-muted/40 cursor-pointer select-none active:scale-95 text-foreground"
                  >
                    Slide Out Left
                  </button>

                  <button
                    onClick={() => setIsOpenRight(true)}
                    className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-xs font-bold shadow-sm transition-all hover:bg-muted/40 cursor-pointer select-none active:scale-95 text-foreground"
                  >
                    Slide Out Right
                  </button>

                  {/* LEFT ALIGNED PREVIEW */}
                  <Offcanvas
                    isOpen={isOpenLeft}
                    onClose={() => setIsOpenLeft(false)}
                    position="left"
                    title="Main Dashboard Indexes"
                  >
                    <div className="space-y-4 pt-2">
                      {[
                        { icon: <IconLayoutGrid className="w-4 h-4" />, name: "Metrics Cluster Overview" },
                        { icon: <IconBell className="w-4 h-4" />, name: "Notification Hub" },
                        { icon: <IconBolt className="w-4 h-4" />, name: "Pipeline Automations" },
                        { icon: <IconHelpCircle className="w-4 h-4" />, name: "Support Ledger Documentation" }
                      ].map((node, i) => (
                        <div 
                          key={i} 
                          className="flex items-center gap-3 p-2.5 rounded-lg border border-border/50 bg-secondary/20 hover:bg-secondary/60 cursor-pointer transition-colors text-foreground/80 hover:text-foreground text-xs font-semibold"
                        >
                          <span className="text-primary">{node.icon}</span>
                          <span>{node.name}</span>
                        </div>
                      ))}
                    </div>
                  </Offcanvas>

                  {/* RIGHT ALIGNED PREVIEW */}
                  <Offcanvas
                    isOpen={isOpenRight}
                    onClose={() => setIsOpenRight(false)}
                    position="right"
                    title="Control System Node Meta"
                  >
                    <div className="space-y-4">
                      <p className="text-xs text-muted-foreground/80 leading-relaxed">
                        Modify active localized memory layers. Changes applied to these properties variables compile instantly across child viewport processes.
                      </p>
                      
                      <div className="rounded-xl bg-muted/30 border border-border p-4 space-y-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60">Cluster Identifier</span>
                          <span className="text-xs font-mono font-bold text-foreground">us-east-matrix-2026</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60">State Integrity</span>
                          <span className="text-xs font-semibold text-emerald-500">Synchronized Node Operational</span>
                        </div>
                      </div>
                    </div>
                  </Offcanvas>
                </>
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
              <h2 className="text-lg font-bold tracking-tight text-foreground">Offcanvas API Reference</h2>
              <p className="text-xs text-muted-foreground">
                Properties parameters and slide animation variables accepted by the edge-docked Offcanvas overlay container.
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
                    { name: "isOpen", type: "boolean", default: "required", description: "Binds the drawer viewport visibility conditional hook onto a state machine variable." },
                    { name: "onClose", type: "() => void", default: "required", description: "Execution handler triggered immediately upon selecting background spaces, close buttons, or pressing Escape." },
                    { name: "position", type: '"left" | "right"', default: '"right"', description: "Controls the screen border margin from which the drawer container executes slide-in layout transforms." },
                    { name: "title", type: "ReactNode", default: "undefined", description: "Optional title string or node element nested directly inside the upper bounding frame toolbar." },
                    { name: "children", type: "ReactNode", default: "required", description: "Core children nodes mapped and rendered straight within the scrolling utility viewport container." },
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
          © 2026 Venti UI Labs. Edge alignment drawer interaction architecture layers.
        </footer>
      </main>
    </DocsPageFrame>
  );
}