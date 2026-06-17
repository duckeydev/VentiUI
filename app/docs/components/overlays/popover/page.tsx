"use client";

import React from "react";
import {
  IconLayersIntersect,
  IconInfoCircle,
  IconAdjustmentsHorizontal
} from "@tabler/icons-react";

import { Popover } from "@/components/popover"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import { TableColumn, Table } from "@/components/table";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "Popover Flyout Node",
  description: "A rich popup panel triggered by clicking an element.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/popover.tsx",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
                    { name: "trigger", type: "ReactNode", default: "required", description: "The stationary child anchor element configured to trigger flyout visibility hooks on user click." },
                    { name: "children", type: "ReactNode", default: "required", description: "The structural content nodes nested inside the context canvas popover container." },
                    { name: "align", type: '"left" | "right" | "center"', default: '"center"', description: "Controls horizontal alignment anchor offsets matching viewport clearance requirements." },
                    { name: "className", type: "string", default: "undefined", description: "Optional overrides passed directly to the absolute layout panel component container." },
                  ];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function PopoverDocsPage() {
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
              description: "Click the button to open a popover panel.",
              code: exampleCode,
              render: () => {
                const [analyticsActive, setAnalyticsActive] = React.useState(true);
                const [streamInterval, setStreamInterval] = React.useState("500ms");
                return (
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