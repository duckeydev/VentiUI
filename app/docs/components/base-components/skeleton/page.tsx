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

import { Skeleton } from "@/components/skeleton";
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
  title: "Skeleton",
  description:
    "Placeholder shapes that mimic content layout.",
  version: "v1.1.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/skeleton.tsx",

  category: "base-components",
  apiDescription: "The Skeleton component provides a versatile UI primitive.",
};

const examples = [
  {
    id: "profile-card-loading",
    title: "Composite Interface Mockup",
    description:
      "Combine skeleton variants for realistic placeholders.",
    code: `<div className="flex items-center gap-3 p-4 border border-border/50 rounded-2xl max-w-sm w-full bg-card">
  <Skeleton variant="circular" className="h-10 w-10" />
  <div className="flex-1 space-y-2">
    <Skeleton variant="text" className="w-[45%]" />
    <Skeleton variant="text" className="w-[85%]" />
  </div>
</div>`,
    render: () => (
      <div className="flex items-center gap-3 p-4 border border-border/50 rounded-2xl max-w-sm w-full bg-card/60 backdrop-blur-sm">
        <Skeleton variant="circular" className="h-10 w-10" />
        <div className="flex-1 space-y-1.5">
          <Skeleton variant="text" className="w-[45%]" />
          <Skeleton variant="text" className="w-[85%]" />
        </div>
      </div>
    ),
  },
  {
    id: "standalone-variants",
    title: "Base Variants",
    description:
      "Circular, rectangular, and text skeleton shapes.",
    code: `<div className="flex flex-col gap-4 w-full max-w-sm">

  <Skeleton variant="circular" className="h-12 w-12" />

  <Skeleton variant="rectangular" className="h-24 w-full" />

  <Skeleton variant="text" />
</div>`,
    render: () => (
      <div className="flex flex-col gap-4 w-full max-w-sm p-4 border border-border/40 rounded-xl bg-card/40 text-left">
        <div className="flex items-center gap-2">
          <Skeleton variant="circular" className="h-8 w-8" />
          <span className="text-xs font-mono font-bold text-muted-foreground">
            circular
          </span>
        </div>
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-muted-foreground">
            rectangular
          </span>
          <Skeleton variant="rectangular" className="h-16 w-full" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-muted-foreground">
            text
          </span>
          <Skeleton variant="text" />
        </div>
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

const apiProperties: ApiProperty[] = [
  {
    name: "variant",
    type: "'circular' | 'rectangular' | 'text'",
    default: "'rectangular'",
    description:
      "Dictates the basic architectural geometry configuration and applied border-radiuses.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description:
      "Bespoke classes used to apply strict sizing declarations (e.g., width, height) onto placeholders.",
  },
];
const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

const outlineItems = [
  ...examples.map((example) => ({
    label: example.title,
    href: `#${example.id}`,
  })),
  { label: "Properties API", href: "#props-api" },
];

export default function SkeletonDocsPage() {
  return (
    <DocsPageFrame
      leftBar={
        <aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-border/40">
          <DocsSidebar />
        </aside>
      }
      rightBar={<DocsOutline title="On this page" items={outlineItems} />}
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">

        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Feedback Elements", href: "/docs/components#feedback" },
              { label: "Skeleton", href: "/docs/components/feedback/skeleton" },
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
