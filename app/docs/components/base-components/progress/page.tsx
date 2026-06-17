"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconCircleDashed,
  IconSparkles,
} from "@tabler/icons-react";

import { Progress } from "@/components/progress";
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
  title: "Progress Bar",
  description:
    "Shows progress along a tracked path.",
  version: "v1.1.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/progress.tsx",

  category: "base-components",
  apiDescription:
    "The Progress Bar component provides a versatile UI primitive.",
};

const examples = [
  {
    id: "standard-progress",
    title: "Standard With Metadata",
    description:
      "A standard progress bar with percentage label.",
    code: `<Progress value={68} max={100} showLabel size="md" />`,
    render: () => (
      <div className="w-full max-w-md p-4 border border-border/50 rounded-xl bg-card/40">
        <Progress value={68} max={100} showLabel size="md" />
      </div>
    ),
  },
  {
    id: "variant-scales",
    title: "Color Layout Scales",
    description:
      "Different sizes and color variants for progress bars.",
    code: `<div className="space-y-4 w-full max-w-md">

  <Progress value={92} size="sm" indicatorClassName="bg-emerald-500" shimmer={false} />

  <Progress value={41} size="lg" indicatorClassName="bg-rose-500" />
</div>`,
    render: () => (
      <div className="w-full max-w-md p-5 border border-border/50 rounded-xl bg-card/40 space-y-4 text-left">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-1">
            Asset Asset Optimization
          </span>
          <Progress
            value={92}
            size="sm"
            indicatorClassName="bg-emerald-500"
            shimmer={false}
          />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-1">
            Cluster Buffer Overflow
          </span>
          <Progress value={41} size="lg" indicatorClassName="bg-rose-500" />
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
    name: "value",
    type: "number",
    default: "0",
    description:
      "The present numeric quantity tracking parameters indicating total completed volume fractions.",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    description:
      "The maximum ceiling limits marking operational completeness calibrations.",
  },
  {
    name: "showLabel",
    type: "boolean",
    default: "false",
    description:
      "Appends an accessible textual metadata string above the track element display canvas.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description:
      "Sets the geometric height thickness properties applied down onto the tracking tracks.",
  },
  {
    name: "indicatorClassName",
    type: "string",
    default: "'bg-primary'",
    description:
      "Tailwind utility color flags mapping directly to the front foreground progress metric indicator mask layer.",
  },
  {
    name: "shimmer",
    type: "boolean",
    default: "true",
    description:
      "Enables continuous internal opacity shifting highlight gradients running underneath the tracking mask bounds.",
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

export default function ProgressDocsPage() {
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
              { label: "Data Feedback", href: "/docs/components#feedback" },
              {
                label: "Progress Bar",
                href: "/docs/components/feedback/progress",
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
