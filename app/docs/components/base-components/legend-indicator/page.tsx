"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconChartDonut,
  IconSparkles,
} from "@tabler/icons-react";

import { LegendIndicator } from "@/components/legendIndicator";
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
  title: "Legend Indicator",
  description:
    "A key-value indicator for legends and metrics.",
  version: "v1.1.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/legend-indicator.tsx",

  category: "base-components",
  apiDescription:
    "The Legend Indicator component provides a versatile UI primitive.",
};

const examples = [
  {
    id: "standard-legend",
    title: "Tailwind Color Mapping",
    description:
      "Use Tailwind color classes to style the indicators.",
    code: `<div className="space-y-1 w-full max-w-xs">
  <LegendIndicator color="bg-indigo-500" label="Active CDN Edge Requests" value="42,105" />
  <LegendIndicator color="bg-emerald-500" label="Cold Cache File Synchronizations" value="12,894" />
  <LegendIndicator color="bg-amber-500" label="Dropped Legacy Router Nodes" value="412" />
</div>`,
    render: () => (
      <div className="w-full max-w-xs border border-border/50 bg-card/40 p-4 rounded-xl shadow-sm">
        <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground block mb-2 px-1">
          Infrastructure Load
        </span>
        <div className="space-y-0.5">
          <LegendIndicator
            color="bg-indigo-500"
            label="Active CDN Edge Requests"
            value="42,105"
          />
          <LegendIndicator
            color="bg-emerald-500"
            label="Cold Cache File Synchronizations"
            value="12,894"
          />
          <LegendIndicator
            color="bg-amber-500"
            label="Dropped Legacy Router Nodes"
            value="412"
          />
        </div>
      </div>
    ),
  },
  {
    id: "custom-colors",
    title: "Raw Inline Hex Values",
    description:
      "Pass hex or RGB values for dynamic colors.",
    code: `<div className="space-y-1 w-full max-w-xs">
  <LegendIndicator color="#FF007A" label="Customer Acquisition Spends" value="64.2%" />
  <LegendIndicator color="#7928CA" label="Organic Retention Metrics" value="28.5%" />
  <LegendIndicator color="#00DFD8" label="Affiliate Attribution Nodes" value="7.3%" />
</div>`,
    render: () => (
      <div className="w-full max-w-xs border border-border/50 bg-card/40 p-4 rounded-xl shadow-sm">
        <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground block mb-2 px-1">
          Budget Allocation Allocation
        </span>
        <div className="space-y-0.5">
          <LegendIndicator
            color="#FF007A"
            label="Customer Acquisition Spends"
            value="64.2%"
          />
          <LegendIndicator
            color="#7928CA"
            label="Organic Retention Metrics"
            value="28.5%"
          />
          <LegendIndicator
            color="#00DFD8"
            label="Affiliate Attribution Nodes"
            value="7.3%"
          />
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
    name: "label",
    type: "string",
    default: "required",
    description:
      "The core classification header tracking parameter text output.",
  },
  {
    name: "color",
    type: "string",
    default: "'bg-primary'",
    description:
      "Accepts utility compilation parameters (e.g., 'bg-sky-400') or direct hex hashes (e.g., '#00FF00').",
  },
  {
    name: "value",
    type: "string | number",
    default: "undefined",
    description:
      "Optional explicit alignment string or number metric displayed floating to the right border boundary.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description:
      "Bespoke style overrides appended straight down onto the text line wrapper node element.",
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

export default function LegendIndicatorDocsPage() {
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
              { label: "Data Display", href: "/docs/components#display" },
              {
                label: "Legend Indicator",
                href: "/docs/components/display/legend-indicator",
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
