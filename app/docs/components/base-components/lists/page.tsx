"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconList,
  IconListNumbers,
  IconSparkles,
} from "@tabler/icons-react";

import { List, ListItem } from "@/components/list";
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
  title: "List",
  description:
    "Ordered and unordered list components.",
  version: "v1.1.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/list.tsx",
};

const examples = [
  {
    id: "unordered-list",
    title: "Unordered List Collection",
    description:
      "Use bullet points for unordered lists.",
    code: `<List marker="disc" spacing="normal">
  <ListItem>Core infrastructure token distribution models.</ListItem>
  <ListItem>
    Multi-region replica deployment nodes.
    <List marker="disc" spacing="condensed">
      <ListItem>AWS primary database clusters (us-east-1).</ListItem>
      <ListItem>GCP recovery cold caches (europe-west-3).</ListItem>
    </List>
  </ListItem>
  <ListItem>Edge routing proxy optimization limits.</ListItem>
</List>`,
    render: () => (
      <div className="w-full max-w-xl">
        <List marker="disc" spacing="normal">
          <ListItem>Core infrastructure token distribution models.</ListItem>
          <ListItem>
            Multi-region replica deployment nodes.
            <List marker="disc" spacing="condensed">
              <ListItem>AWS primary database clusters (us-east-1).</ListItem>
              <ListItem>GCP recovery cold caches (europe-west-3).</ListItem>
            </List>
          </ListItem>
          <ListItem>Edge routing proxy optimization limits.</ListItem>
        </List>
      </div>
    ),
  },
  {
    id: "ordered-list",
    title: "Ordered Step Indexing",
    description:
      "Use numbers for ordered step-by-step lists.",
    code: `<List as="ol" marker="decimal" spacing="loose">
  <ListItem>Pull down active repository packages via system terminals.</ListItem>
  <ListItem>Synchronize environment parameters locally inside root files.</ListItem>
  <ListItem>Initialize production distribution builds over target ports.</ListItem>
</List>`,
    render: () => (
      <div className="w-full max-w-xl">
        <List as="ol" marker="decimal" spacing="loose">
          <ListItem>
            Pull down active repository packages via system terminals.
          </ListItem>
          <ListItem>
            Synchronize environment parameters locally inside root files.
          </ListItem>
          <ListItem>
            Initialize production distribution builds over target ports.
          </ListItem>
        </List>
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
    name: "as",
    type: "'ul' | 'ol'",
    default: "'ul'",
    description:
      "Dictates the underlying HTML tag element structure rendered onto the DOM layout map.",
  },
  {
    name: "marker",
    type: "'disc' | 'decimal' | 'none'",
    default: "'disc'",
    description:
      "Sets the geometric styling properties appended to prefix text tracks.",
  },
  {
    name: "spacing",
    type: "'condensed' | 'normal' | 'loose'",
    default: "'normal'",
    description:
      "Adjusts structural vertical padding intervals running between item nodes.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description:
      "Standard utility string parameter for injection of bespoke layout adjustments.",
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

export default function ListDocsPage() {
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
              { label: "Typography", href: "/docs/components#typography" },
              {
                label: componentMeta.title,
                href: "/docs/components/typography/lists",
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
