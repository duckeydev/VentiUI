"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconListDetails,
  IconSettings,
  IconChevronRight,
  IconSparkles,
} from "@tabler/icons-react";

import { ListGroup, ListGroupItem } from "@/components/listGroup";
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
  title: "List Group",
  description:
    "A grouped list for navigation and settings.",
  version: "v1.1.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/list-group.tsx",

  category: "base-components",
  apiDescription: "The List Group component provides a versatile UI primitive.",
};

const examples = [
  {
    id: "boxed-variant",
    title: "Standard Carded Layout",
    description:
      "Items are displayed in a bordered card layout.",
    code: `<ListGroup>
  <ListGroupItem active>
    <span>Production Telemetry Pipeline Alpha</span>
    <span className="text-[10px] font-bold tracking-wider uppercase bg-primary-foreground/20 px-2 py-0.5 rounded">Active</span>
  </ListGroupItem>
  <ListGroupItem>
    <span>Secondary Edge Routing Cluster Beta</span>
    <IconChevronRight className="h-4 w-4 opacity-40" />
  </ListGroupItem>
  <ListGroupItem disabled>
    <span>Legacy Deprecated Aggregation Node</span>
    <span className="text-[10px] font-medium opacity-60">Disconnected</span>
  </ListGroupItem>
</ListGroup>`,
    render: () => (
      <div className="w-full max-w-xl">
        <ListGroup>
          <ListGroupItem active>
            <span>Production Telemetry Pipeline Alpha</span>
            <span className="text-[10px] font-bold tracking-wider uppercase bg-primary-foreground/20 px-2 py-0.5 rounded">
              Active
            </span>
          </ListGroupItem>
          <ListGroupItem>
            <span>Secondary Edge Routing Cluster Beta</span>
            <IconChevronRight className="h-4 w-4 opacity-40" />
          </ListGroupItem>
          <ListGroupItem disabled>
            <span>Legacy Deprecated Aggregation Node</span>
            <span className="text-[10px] font-medium opacity-60">
              Disconnected
            </span>
          </ListGroupItem>
        </ListGroup>
      </div>
    ),
  },
  {
    id: "flush-variant",
    title: "Flush Seamless Layout",
    description:
      "Items blend into the parent container seamlessly.",
    code: `<ListGroup flush>
  <ListGroupItem href="#profile" as="a">
    <div className="flex flex-col">
      <span className="font-semibold">User Access Control Configurations</span>
      <span className="text-xs text-muted-foreground">Modify identity parameters and cryptographical access tokens</span>
    </div>
    <IconSettings className="h-4 w-4 text-muted-foreground/60" />
  </ListGroupItem>
  <ListGroupItem href="#security" as="a">
    <div className="flex flex-col">
      <span className="font-semibold">Transport Layer Firewall Logs</span>
      <span className="text-xs text-muted-foreground">Inspect proxy routing anomalies and validation failure tables</span>
    </div>
    <IconChevronRight className="h-4 w-4 text-muted-foreground/40" />
  </ListGroupItem>
</ListGroup>`,
    render: () => (
      <div className="w-full max-w-xl border border-border/40 p-4 rounded-xl bg-card/40 backdrop-blur-sm">
        <ListGroup flush>
          <ListGroupItem href="#profile" as="a">
            <div className="flex flex-col text-left">
              <span className="font-semibold text-sm">
                User Access Control Configurations
              </span>
              <span className="text-xs text-muted-foreground leading-normal">
                Modify identity parameters and cryptographical access tokens
              </span>
            </div>
            <IconSettings className="h-4 w-4 text-muted-foreground/60 shrink-0 ml-4" />
          </ListGroupItem>
          <ListGroupItem href="#security" as="a">
            <div className="flex flex-col text-left">
              <span className="font-semibold text-sm">
                Transport Layer Firewall Logs
              </span>
              <span className="text-xs text-muted-foreground leading-normal">
                Inspect proxy routing anomalies and validation failure tables
              </span>
            </div>
            <IconChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0 ml-4" />
          </ListGroupItem>
        </ListGroup>
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
    name: "flush",
    type: "boolean",
    default: "false",
    description:
      "Forces the group frame to shed exterior boundaries, sitting perfectly tight to baseline surfaces.",
  },
  {
    name: "active",
    type: "boolean",
    default: "false",
    description:
      "Inverts component elements with high-visibility accent tones to highlight a focus selection state.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description:
      "Enforces full interaction locks, stripping tab indexing and reducing the element's overall opacity layer.",
  },
  {
    name: "href",
    type: "string",
    default: "undefined",
    description:
      "Supplying a target directory or link URL path automatically remaps the underlying tag definition to an HTML Anchor element.",
  },
  {
    name: "as",
    type: "React.ElementType",
    default: "'div' | 'a'",
    description:
      "Polymorphic layout injection property allowing manual override mapping of any valid HTML tag node.",
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

export default function ListGroupDocsPage() {
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
                label: componentMeta.title,
                href: "/docs/components/display/list-groups",
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
