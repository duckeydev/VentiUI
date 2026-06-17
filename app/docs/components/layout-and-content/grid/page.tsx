"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconGridPattern,
  IconSparkles,
} from "@tabler/icons-react";

import { Grid, GridItem } from "@/components/grid";
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
  title: "Grid System Layout",
  description:
    "A responsive CSS grid layout system.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/grid.tsx",
  category: "layout-and-content",
  apiDescription:
    "The Grid System Layout component provides a versatile UI primitive.",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const examples = [
  {
    id: "responsive-columns",
    title: "Responsive Grid Blueprint",
    description:
      "A simple example showing the default behavior.",
    code: `import { Grid, GridItem } from "@/components/grid";

export function StandardLayout() {
  return (
    <Grid cols={3} gap="md">
      <div className="bg-primary/10 p-4 rounded-lg font-mono text-center">01</div>
      <div className="bg-primary/10 p-4 rounded-lg font-mono text-center">02</div>
      <div className="bg-primary/10 p-4 rounded-lg font-mono text-center">03</div>
    </Grid>
  );
}`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-xl bg-card/40 backdrop-blur-sm">
        <Grid cols={3} gap="md" className="w-full">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="bg-secondary/80 border border-border/60 text-foreground p-4 rounded-xl font-mono text-xs font-bold text-center"
            >
              0{idx}
            </div>
          ))}
        </Grid>
      </div>
    ),
  },
  {
    id: "asymmetric-spans",
    title: "Asymmetric Column Spanning",
    description:
      "Use different column spans to create asymmetric layouts.",
    code: `import { Grid, GridItem } from "@/components/grid";

export function DashboardSplit() {
  return (
    <Grid cols={4} gap="sm">
      <GridItem colSpan={1} className="bg-secondary p-4">Sidebar</GridItem>
      <GridItem colSpan={3} className="bg-secondary p-4">Main Panel</GridItem>
    </Grid>
  );
}`,
    render: () => (
      <div className="p-6 border border-border/40 rounded-xl bg-card/20 w-full max-w-xl">
        <Grid cols={4} gap="sm" className="w-full">
          <GridItem
            colSpan={1}
            className="bg-primary/10 border border-primary/20 text-primary p-4 rounded-xl font-mono text-xs font-bold text-center"
          >
            Span 1 (Nav)
          </GridItem>
          <GridItem
            colSpan={3}
            className="bg-secondary/80 border border-border/60 text-foreground p-4 rounded-xl font-mono text-xs font-bold text-center"
          >
            Span 3 (Workspace Canvas)
          </GridItem>
          <GridItem
            colSpan={12}
            className="bg-muted border border-border/40 text-muted-foreground p-2 rounded-lg font-mono text-[10px] text-center"
          >
            Span Full (Footer Segment)
          </GridItem>
        </Grid>
      </div>
    ),
  },
];

const apiProperties: ApiProperty[] = [
  {
    name: "cols",
    type: "1 | 2 | 3 | 4 | 5 | 6 | 12 | 'default'",
    default: "'default'",
    description:
      "Configures responsive CSS Grid columns across screen break breakpoints.",
  },
  {
    name: "gap",
    type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description:
      "Applies standard margin pacing parameters between inner layout item nodes.",
  },
  {
    name: "align",
    type: "'start' | 'center' | 'end' | 'stretch'",
    default: "'stretch'",
    description:
      "Sets element positioning configurations along the vertical layout track axes.",
  },
  {
    name: "as",
    type: "React.ElementType",
    default: "'div'",
    description:
      "Overrides structural tag mappings to render custom container boxes (e.g. 'section', 'form').",
  },
];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function GridDocsPage() {
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
            { label: "Grid Reference API", href: "#props-api" },
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
                label: "Layout & Content",
                href: "/docs/components/layout-and-content",
              },
              {
                label: "Grid System",
                href: "/docs/components/layout-and-content/grid",
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
                Grid API Reference
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
