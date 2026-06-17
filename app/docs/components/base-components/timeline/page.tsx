"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconGitCommit,
  IconSparkles,
  IconGitBranch,
  IconCloudUpload,
  IconRocket,
} from "@tabler/icons-react";

import { Timeline, type TimelineItem } from "@/components/timeline";
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
  title: "Timeline Chronology",
  description:
    "A vertical timeline for displaying events.",
  version: "v1.1.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/timeline.tsx",

  category: "base-components",
  apiDescription:
    "The Timeline Chronology component provides a versatile UI primitive.",
};

const mockDeploymentStream: TimelineItem[] = [
  {
    id: "step-1",
    title: "Branch Hook Intercepted",
    description:
      "Web hook validated successfully for main distribution trunk arrays. Launching transient container isolation environments.",
    date: "14:22 PM",
    icon: <IconGitBranch className="w-4 h-4" />,
    isActive: false,
  },
  {
    id: "step-2",
    title: "Optimizing Asset Artifacts",
    description:
      "Injecting global design system tokens. Minifying bundle size payload maps down below structural target indicators.",
    date: "14:24 PM",
    icon: <IconCloudUpload className="w-4 h-4" />,
    isActive: true,
  },
  {
    id: "step-3",
    title: "Distribution Edge Sync",
    description:
      "Awaiting cluster health initialization verification tracks. Edge proxies staging upcoming system variations.",
    date: "Pending",
    icon: <IconRocket className="w-4 h-4" />,
    isActive: false,
  },
];

const examples = [
  {
    id: "left-aligned-stream",
    title: "Default Action Streams",
    description:
      "Items are aligned to the left side.",
    code: `<Timeline items={mockDeploymentStream} align="left" />`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-md bg-card/40 backdrop-blur-sm text-left">
        <Timeline items={mockDeploymentStream} align="left" />
      </div>
    ),
  },
  {
    id: "center-split-stream",
    title: "Alternating Center Splits",
    description:
      "Items alternate on each side of the center line.",
    code: `<Timeline items={mockDeploymentStream} align="center" />`,
    render: () => (
      <div className="p-6 border border-border/40 rounded-xl bg-card/20 w-full max-w-xl">
        <Timeline items={mockDeploymentStream} align="center" />
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
    name: "items",
    type: "TimelineItem[]",
    default: "required",
    description:
      "Array collection parsing sequential milestone parameters containing unique titles, logs, and dates.",
  },
  {
    name: "align",
    type: "'left' | 'right' | 'center'",
    default: "'left'",
    description:
      "Dictates structural placement of vertical axis markers and changes text orientation behaviors.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description:
      "Standard utility string injection point targeting custom spacer properties or padding modifications.",
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

export default function TimelineDocsPage() {
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
              { label: "Timeline", href: "/docs/components/display/timeline" },
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
