"use client";

import { useState } from "react";
import {
  IconCode,
  IconEye,
  IconExternalLink,
  IconCursorText,
  IconSparkles,
  IconCheck,
  IconCopy,
  IconEdit,
  IconClipboard,
  IconDownload,
  IconTrash
} from "@tabler/icons-react";

import { ContextMenu, type ContextMenuItem } from "@/components/context-menu"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Context Menu Portal",
  description: "An alternate secondary overlay structural system overriding system native right-click arrays to bind semantic custom option parameters directly to node triggers.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/context-menu.tsx",
};

export default function ContextMenuDocsPage() {
  const [callbackLog, setCallbackLog] = useState<string>("None");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const contextualItems: ContextMenuItem[] = [
    { id: "edit-node", label: "Edit Entity Parameters", icon: <IconEdit className="w-3.5 h-3.5" /> },
    { id: "clone-node", label: "Clone Row Layout", icon: <IconClipboard className="w-3.5 h-3.5" /> },
    { id: "export-json", label: "Download Raw Schema JSON", icon: <IconDownload className="w-3.5 h-3.5" /> },
    { id: "lock-index", label: "Lock Structural State", disabled: true },
    { id: "purge-index", label: "Purge Context Node", icon: <IconTrash className="w-3.5 h-3.5" />, danger: true },
  ];

  const exampleCode = `import { ContextMenu } from "@/components/context-menu";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export function DesignCanvas() {
  const contextActions = [
    { id: "edit", label: "Modify Metadata", icon: <IconEdit className="w-4 h-4" /> },
    { id: "delete", label: "Purge Component", icon: <IconTrash className="w-4 h-4" />, danger: true },
  ];

  return (
    <ContextMenu
      items={contextActions}
      onSelect={(action) => console.log("Fired sequence: ", action.id)}
      className="w-full h-48 bg-card rounded-xl flex items-center justify-center border border-dashed"
    >
      <p className="text-sm text-muted-foreground">Right-click anywhere inside this sector container</p>
    </ContextMenu>
  );
}`;

  return (
    <DocsPageFrame
      leftBar={
        <aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-r-border/40">
          <DocsSidebar />
        </aside>
      }
      rightBar={
        <DocsOutline
          title="On this page"
          items={[
            { label: "Interactive Component Layout", href: "#interactive-demo" },
            { label: "ContextMenu Specification Matrix", href: "#props-api" },
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
              { label: "Context Menu Portal", href: "/docs/components/overlays/context-menu" },
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
            <IconCursorText className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-bold tracking-tight text-foreground">Interactive Implementation</h3>
          </div>
          <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
            Perform a secondary click action anywhere on the styled field pad region below to access options.
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

            <div className="flex min-h-[280px] flex-col items-center justify-center bg-card/10 p-6 overflow-visible">
              {activeTab === "preview" ? (
                <div className="w-full max-w-md flex flex-col items-center gap-3">
                  <ContextMenu
                    items={contextualItems}
                    onSelect={(item) => setCallbackLog(item.label)}
                    className="w-full h-44 border-2 border-dashed border-border rounded-xl bg-background/40 hover:bg-background/80 transition-colors flex flex-col items-center justify-center select-none cursor-context-menu p-4 group"
                  >
                    <span className="text-xs font-semibold tracking-tight text-foreground/80 group-hover:text-primary transition-colors text-center">
                      Right Click Inside This Workspace Panel
                    </span>
                    <span className="text-[10px] text-muted-foreground/50 font-mono mt-1 text-center">
                      (Viewport collision detection mechanics auto-adjust display tracking vectors)
                    </span>
                  </ContextMenu>

                  <span className="text-[10px] text-muted-foreground/40 font-mono mt-2">
                    Action Node Callback: "{callbackLog}"
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
              <h2 className="text-lg font-bold tracking-tight text-foreground">ContextMenu API Reference</h2>
              <p className="text-xs text-muted-foreground">
                Properties parameters and configuration flags accepted by the targeted context container interceptor.
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
                    { name: "children", type: "ReactNode", default: "required", description: "The content viewport frame node that acts as the mouse right-click gesture capture boundary." },
                    { name: "items", type: "ContextMenuItem[]", default: "required", description: "Array containing menu metrics mapping directly onto items displayed inside the structural floating grid." },
                    { name: "onSelect", type: "(item: ContextMenuItem) => void", default: "required", description: "Execution handler fired instantly upon clicking a valid row item configuration block." },
                    { name: "className", type: "string", default: "undefined", description: "Injected class definitions applied straight to the tracking viewport base node container." },
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
          © 2026 Venti UI Labs. Mouse interception layout overlay architecture layers.
        </footer>
      </main>
    </DocsPageFrame>
  );
}