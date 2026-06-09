"use client";

import { useState } from "react";
import {
  IconCode,
  IconEye,
  IconExternalLink,
  IconMaximize,
  IconSparkles,
  IconCheck,
  IconCopy,
  IconAlertTriangle,
  IconShieldHeart
} from "@tabler/icons-react";

import { Modal } from "@/components/modal"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Modal Portal Frame",
  description: "An overlay element containing focal task blocks that intercepts client workflows to surface isolated confirmation pathways or specific actions.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/modal.tsx",
};

export default function ModalDocsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const exampleCode = `import { useState } from "react";
import { Modal } from "@/components/modal";

export function DeleteConfirmation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Trigger Layout</button>
      
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Destructive Database Warning"
        maxWidth="md"
      >
        <p>Are you certain you wish to purge cluster metrics? This choice cannot be undone.</p>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button className="bg-destructive">Confirm</button>
        </div>
      </Modal>
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
            { label: "Modal Specification Matrix", href: "#props-api" },
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
              { label: "Modal Portal Frame", href: "/docs/components/overlays/modal" },
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
            <IconMaximize className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-bold tracking-tight text-foreground">Interactive Implementation</h3>
          </div>
          <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
            Fire the live viewport trigger below to observe animation sequences and context masking variables.
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
                  <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-xs font-bold shadow-sm transition-all hover:bg-muted/40 cursor-pointer select-none active:scale-95 text-foreground"
                  >
                    Open Dialog Frame
                  </button>

                  <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={
                      <div className="flex items-center gap-2 text-amber-500">
                        <IconShieldHeart className="w-4 h-4" />
                        <span>Cluster Isolation Trigger</span>
                      </div>
                    }
                    maxWidth="sm"
                  >
                    <div className="space-y-3">
                      <p className="text-xs text-muted-foreground/80 leading-relaxed">
                        You are initiating a direct operational hold loop on microservices node targets inside section-b indices. System data pipelines will queue instantly.
                      </p>
                      
                      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 flex gap-2.5 items-start">
                        <IconAlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-[11px] font-medium text-amber-600/90 dark:text-amber-400/80 leading-relaxed">
                          Attention: Production environments require authorized supervisor overrides to pass terminal validation parameters.
                        </span>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/40">
                        <button
                          onClick={() => setModalOpen(false)}
                          className="px-3 py-1.5 rounded-lg border border-border/60 bg-transparent text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            alert("Cluster loop sequence initialized.");
                            setModalOpen(false);
                          }}
                          className="px-3 py-1.5 rounded-lg border border-transparent bg-amber-500 text-black text-xs font-bold hover:bg-amber-600 shadow-sm transition-colors cursor-pointer"
                        >
                          Execute Loop
                        </button>
                      </div>
                    </div>
                  </Modal>
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
              <h2 className="text-lg font-bold tracking-tight text-foreground">Modal API Reference</h2>
              <p className="text-xs text-muted-foreground">
                Properties parameters and visibility bounds configuration parameters accepted by the overlay Modal canvas.
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
                    { name: "isOpen", type: "boolean", default: "required", description: "Binds the active conditional view layout visibility switch onto parent rendering states." },
                    { name: "onClose", type: "() => void", default: "required", description: "Callback triggered instantly upon choosing closure elements, overlay spaces, or pressing Escape." },
                    { name: "title", type: "ReactNode", default: "undefined", description: "Header section element serving as the definitive descriptive accessibility point for dialog tracks." },
                    { name: "children", type: "ReactNode", default: "required", description: "Core data markup structures packed inside the display frame container block." },
                    { name: "maxWidth", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Controls responsive boundary limits restricting scale tracking variables across desktops." },
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
          © 2026 Venti UI Labs. Focus trap overlay viewport layout architectures.
        </footer>
      </main>
    </DocsPageFrame>
  );
}