"use client";

import {
  IconMessageCircle,
  IconPlus,
  IconTrash,
  IconCloudUpload,
  IconInfoCircle
} from "@tabler/icons-react";

import { Tooltip } from "@/components/tooltip"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import { TableColumn, Table } from "@/components/table";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "Tooltip Hint Matrix",
  description: "Shows a small message when you hover over an element.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/tooltip.tsx",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
                    { name: "content", type: "ReactNode", default: "required", description: "The descriptive text context or element structure packed inside the popping bubble panel." },
                    { name: "children", type: "ReactNode", default: "required", description: "The core active target node frame that tracks hover cursor coordinates to summon the tip." },
                    { name: "position", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Controls the spatial vector projection anchor alignment relative to its wrapped baseline target." },
                    { name: "className", type: "string", default: "undefined", description: "Optional overrides passed directly onto the layout element structure block configuration container." },
                  ];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function TooltipDocsPage() {
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
              description: "Hover the buttons below to see tooltips in action.",
              code: exampleCode,
              render: () => (
                <div className="w-full max-w-md flex flex-col items-center gap-8">
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Tooltip content="SYS: CREATE_NODE" position="top">
                      <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted/40 transition-colors shadow-sm cursor-pointer">
                        <IconPlus className="w-4 h-4" />
                      </button>
                    </Tooltip>
                    <Tooltip content="DESTRUCTIVE: FLUSH_CACHE" position="right">
                      <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10 transition-colors shadow-sm cursor-pointer">
                        <IconTrash className="w-4 h-4" />
                      </button>
                    </Tooltip>
                    <Tooltip content="UPSTREAM: PUSH_DOCKER_BIN" position="bottom">
                      <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted/40 transition-colors shadow-sm cursor-pointer">
                        <IconCloudUpload className="w-4 h-4" />
                      </button>
                    </Tooltip>
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
              ),
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