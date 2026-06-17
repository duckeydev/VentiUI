"use client";

import React from "react";
import {
  IconMaximize,
  IconAlertTriangle,
  IconShieldHeart
} from "@tabler/icons-react";

import { Modal } from "@/components/modal";
import { TableColumn, Table } from "@/components/table"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "Modal Portal Frame",
  description: "A dialog that appears on top of the page content.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/modal.tsx",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
                    { name: "isOpen", type: "boolean", default: "required", description: "Binds the active conditional view layout visibility switch onto parent rendering states." },
                    { name: "onClose", type: "() => void", default: "required", description: "Callback triggered instantly upon choosing closure elements, overlay spaces, or pressing Escape." },
                    { name: "title", type: "ReactNode", default: "undefined", description: "Header section element serving as the definitive descriptive accessibility point for dialog tracks." },
                    { name: "children", type: "ReactNode", default: "required", description: "Core data markup structures packed inside the display frame container block." },
                    { name: "maxWidth", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Controls responsive boundary limits restricting scale tracking variables across desktops." },
                  ];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function ModalDocsPage() {
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
<Badge variant="info">
  {componentMeta.version}
</Badge>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">{componentMeta.description}</p>


        </div>

        <section id="interactive-demo" className="space-y-3 scroll-mt-20">
          <CodeBlock
            example={{
              id: "interactive-demo",
              title: "Interactive Implementation",
              description: "Click the button to open a modal dialog.",
              code: exampleCode,
              render: () => {
                const [modalOpen, setModalOpen] = React.useState(false);
                return (
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
                );
              },
            }}
          />
        </section>

        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Properties API
              </h2>
              <p className="text-xs text-muted-foreground">
                All available props for this component.
              </p>
            </div>
          </div>

          <DocsPanel className="overflow-hidden rounded-xl">
            <Table<ApiProperty>
              variant="modern"
              columns={columns}
              data={apiProperties}
              rowKey={(prop) => prop.name}
            />
          </DocsPanel>
        </section>

        <DocsAdjacentNav />

        <footer className="border-t border-border/30 pt-4 text-center text-xs text-muted-foreground/40">
          © 2026 Venti UI Labs. UI made right.
        </footer>
      </main>
    </DocsPageFrame>
  );
}