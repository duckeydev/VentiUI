"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconLayoutGrid,
  IconTag,
  IconGitBranch,
  IconAlertCircle,
  IconCircleCheck,
} from "@tabler/icons-react";

import { Badge } from "@/components/badge";
import {
  DocsBreadcrumbs,
  DocsOutline,
  DocsPageFrame,
  DocsPanel,
} from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import { TableColumn, Table } from "@/components/table";
import CodeBlock from "@/app/components/codeblock";

const componentMeta = {
  title: "Badge",
  description:
    "A small label for statuses, tags, and counts.",
  version: "v1.1.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/badge.tsx",

  category: "base-components",
  apiDescription: "The Badge component provides a versatile UI primitive.",
};

type BadgeVariantType =
  | "modern"
  | "minimal"
  | "glass"
  | "macos"
  | "info"
  | "success"
  | "warning"
  | "destructive";

const apiProperties = [
  {
    name: "variant",
    type: "'modern' | 'minimal' | 'glass' | 'macos' | 'info' | 'success' | 'warning' | 'destructive'",
    default: "'modern'",
    description:
      "Configures background transparency scales, borders, and systemic alert states.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description:
      "Adjusts padding balances, internal tracking gaps, and micro-typographic size levels.",
  },
  {
    name: "icon",
    type: "React.ReactNode",
    default: "undefined",
    description:
      "Optional iconography node injected inline prior to child labels. SVG strokes are self-managed.",
  },
];

const examples = [
  {
    id: "metadata",
    title: "Metadata",
    description: "",
    code: `<div className="flex gap-2">
  <Badge variant="minimal" icon={<IconGitBranch />}>main</Badge>
  <Badge variant="success" icon={<IconCircleCheck />}>Deployed</Badge>
  <Badge variant="destructive" icon={<IconAlertCircle />}>API Down</Badge>
</div>`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-xl bg-card/40 flex items-center justify-center min-h-30 text-sm text-muted-foreground">
        Live preview
      </div>
    ),
  },
];

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const columns: TableColumn<ApiProperty>[] = [
  {
    key: "name",
    header: "Property",
    width: "20%",
    className: "font-mono font-bold text-primary p-4",
  },
  {
    key: "type",
    header: "Type",
    width: "30%",
    className:
      "font-mono text-[10px] text-muted-foreground leading-relaxed p-4",
  },
  {
    key: "default",
    header: "Default",
    width: "15%",
    className: "font-mono text-foreground/70 italic p-4",
    render: (row: ApiProperty) =>
      row.default || <span className="text-muted-foreground/30">—</span>,
  },
  {
    key: "description",
    header: "Description",
    width: "35%",
    className: "font-normal leading-relaxed text-muted-foreground p-4",
  },
];

export default function BadgeDocsPage() {
  const [activeVariant, setActiveVariant] =
    useState<BadgeVariantType>("modern");

  const playgroundCode = `<Badge variant="${activeVariant}" size="md">
  Status Token
</Badge>`;

  const metadataCode = `<div className="flex gap-2">
  <Badge variant="minimal" icon={<IconGitBranch />}>main</Badge>
  <Badge variant="success" icon={<IconCircleCheck />}>Deployed</Badge>
  <Badge variant="destructive" icon={<IconAlertCircle />}>API Down</Badge>
</div>`;

  const rightBarItems = [
    { label: "Interactive Playground", href: "#playground" },
    { label: "Contextual Tags", href: "#metadata" },
    { label: "Properties API", href: "#props-api" },
  ];

  return (
    <DocsPageFrame
      leftBar={
        <aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-border/40">
          <DocsSidebar />
        </aside>
      }
      rightBar={<DocsOutline title="On this page" items={rightBarItems} />}
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">

        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              {
                label: "Base Components",
                href: "/docs/components#base-components",
              },
              {
                label: componentMeta.title,
                href: "/docs/components/base-components/badges",
              },
            ]}
          />

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
              {componentMeta.title}
            </h1>
            <span className="mt-1.5 rounded bg-primary/10 border border-primary/20 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
              {componentMeta.version}
            </span>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            {componentMeta.description}
          </p>        </div>

        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconLayoutGrid stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                API Reference
              </h2>
              <p className="text-xs text-muted-foreground">All available props for this component.</p>
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
