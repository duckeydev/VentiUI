"use client";

import React from "react";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutGrid,
  IconBell,
  IconBolt,
  IconHelpCircle
} from "@tabler/icons-react";

import { Offcanvas } from "@/components/offcanvas";
import { TableColumn, Table } from "@/components/table"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "Offcanvas Panel Node",
  description: "A panel that slides in from the side of the screen.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/offcanvas.tsx",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
                    { name: "isOpen", type: "boolean", default: "required", description: "Binds the drawer viewport visibility conditional hook onto a state machine variable." },
                    { name: "onClose", type: "() => void", default: "required", description: "Execution handler triggered immediately upon selecting background spaces, close buttons, or pressing Escape." },
                    { name: "position", type: '"left" | "right"', default: '"right"', description: "Controls the screen border margin from which the drawer container executes slide-in layout transforms." },
                    { name: "title", type: "ReactNode", default: "undefined", description: "Optional title string or node element nested directly inside the upper bounding frame toolbar." },
                    { name: "children", type: "ReactNode", default: "required", description: "Core children nodes mapped and rendered straight within the scrolling utility viewport container." },
                  ];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function OffcanvasDocsPage() {
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
              description: "Click the buttons to open offcanvas panels from either side.",
              code: exampleCode,
              render: () => {
                const [isOpenRight, setIsOpenRight] = React.useState(false);
                const [isOpenLeft, setIsOpenLeft] = React.useState(false);
                return (
                  <div className="flex min-h-64 flex-col sm:flex-row items-center justify-center gap-4 bg-card/10 p-6 overflow-visible w-full">
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