"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconLoader,
  IconSparkles,
} from "@tabler/icons-react";

import { Spinner } from "@/components/spinners";
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
  title: "Spinner",
  description:
    "Loading indicators for async operations.",
  version: "v1.1.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/spinner.tsx",

  category: "base-components",
  apiDescription: "The Spinner component provides a versatile UI primitive.",
};

const examples = [
  {
    id: "variant-showcase",
    title: "Aesthetic Variants",
    description:
      "Six different spinner styles to choose from.",
    code: `<div className="grid grid-cols-2 gap-8">
  <Spinner variant="default" />
  <Spinner variant="dots" />
  <Spinner variant="pulse" />
  <Spinner variant="apple" />
  <Spinner variant="morph" />
  <Spinner variant="wave" />
</div>`,
    render: () => (
      <div className="grid grid-cols-3 gap-8 p-6 border border-border/50 rounded-2xl w-full max-w-sm bg-card/40 backdrop-blur-sm">
        {([
          { label: "default", val: "default" },
          { label: "dots", val: "dots" },
          { label: "pulse", val: "pulse" },
          { label: "apple", val: "apple" },
          { label: "morph", val: "morph" },
          { label: "wave", val: "wave" },
        ] as const).map((item) => (
          <div key={item.val} className="flex flex-col items-center gap-2">

            <Spinner variant={item.val} size="md" />
            <span className="text-[10px] font-mono text-muted-foreground">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "size-scales",
    title: "Dimensional Scale Grid",
    description:
      "Spinners come in four different sizes.",
    code: `<div className="flex items-center gap-6">
  <Spinner size="sm" />
  <Spinner size="md" />
  <Spinner size="lg" />
  <Spinner size="xl" className="text-indigo-500" />
</div>`,
    render: () => (
      <div className="flex items-end justify-center gap-8 p-6 border border-border/40 rounded-xl bg-card/20 w-full max-w-md">
        <div className="flex flex-col items-center gap-1.5">
          <Spinner size="sm" />
          <span className="text-[10px] font-mono text-muted-foreground">
            sm
          </span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Spinner size="md" />
          <span className="text-[10px] font-mono text-muted-foreground">
            md
          </span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Spinner size="lg" />
          <span className="text-[10px] font-mono text-muted-foreground">
            lg
          </span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Spinner size="xl" className="text-indigo-500 dark:text-indigo-400" />
          <span className="text-[10px] font-mono text-muted-foreground">
            xl
          </span>
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
    type: "'default' | 'dots' | 'pulse'",
    default: "'default'",
    description:
      "Sets the geometric composition structure and mechanical animation loop behavior.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description:
      "Drives internal element scaling via optimized design token tracking definitions.",
  },
  {
    name: "color",
    type: "string",
    default: "undefined",
    description:
      "Overrides current theme text colors directly with raw design parameters (e.g., #hex, rgb).",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description:
      "Standard utility string injection point, typically targeting text color profiles (e.g., 'text-primary').",
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

export default function SpinnerDocsPage() {
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
              { label: "Spinner", href: "/docs/components/feedback/spinner" },
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
