"use client";

import { IconCode, IconExternalLink } from "@tabler/icons-react";

import { ScrollArea } from "@/components/scroll-area";
import {
  DocsBreadcrumbs,
  DocsOutline,
  DocsPageFrame,
  DocsPanel,
} from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";
import { TableColumn, Table } from "@/components/table";

const componentMeta = {
  title: "ScrollArea Viewport",
  description:
    "A container with custom styled scrollbars.",
  version: "v1.0.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/scroll-area.tsx",

  category: "layout-and-content",
  apiDescription:
    "The ScrollArea Viewport component provides a versatile UI primitive.",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const examples = [
  {
    id: "standard-scroll",
    title: "Vertical Scroll Boundary Box",
    description:
      "Scrollable content area with custom scrollbar styling.",
    code: `import { ScrollArea } from "@/components/scroll-area";

export function TerminalLogs() {
  return (
    <ScrollArea className="h-44 w-full rounded-xl border p-4 bg-muted/20">
      {/* Heavy internal list item elements stream... */}
    </ScrollArea>
  );
}`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-sm bg-card/40 backdrop-blur-sm">
        <ScrollArea className="h-44 w-full rounded-xl border border-border/60 bg-muted/10 p-4 text-left">
          <div className="space-y-2">
            <h4 className="text-xs font-bold font-mono text-primary uppercase tracking-wider">
              Stuff Do'er...
            </h4>
            {Array.from({ length: 12 }).map((_, i) => (
              <p
                key={i}
                className="font-mono text-xs text-muted-foreground leading-relaxed"
              >
                <span className="text-emerald-500/70">[$]</span> Did stuff{" "}
                {i + 1} times.
              </p>
            ))}
          </div>
        </ScrollArea>
      </div>
    ),
  },
];

const apiProperties: ApiProperty[] = [
  {
    name: "orientation",
    type: "'vertical' | 'horizontal' | 'both'",
    default: "'vertical'",
    description:
      "Dictates which directional axis coordinates spawn clipping boundaries and track elements.",
  },
  {
    name: "preventShift",
    type: "boolean",
    default: "false",
    description:
      "Configures scrollbar-gutter assets to prevent container shifts when layout contents expand.",
  },
];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function ScrollAreaDocsPage() {
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
            ...examples.map((e) => ({ label: e.title, href: `#${e.id}` })),
            { label: "ScrollArea API Reference", href: "#props-api" },
          ]}
        />
      }
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              {
                label: "Structure Primitives",
                href: "/docs/components#structure",
              },
              {
                label: "ScrollArea Viewport",
                href: "/docs/components/structure/scroll-area",
              },
            ]}
          />

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
              {componentMeta.title}
            </h1>
            <Badge variant="info">{componentMeta.version}</Badge>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            {componentMeta.description}
          </p>
        </div>

        <div className="space-y-10">
          {examples.map((example) => (
            <CodeBlock key={example.id} example={example} />
          ))}
        </div>

        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                ScrollArea API Reference
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

        <footer className="border-t border-border/30 pt-8 pb-10 text-center text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/40">
          © 2026 Venti UI Labs. UI made right.
        </footer>
      </main>
    </DocsPageFrame>
  );
}
