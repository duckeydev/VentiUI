"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconColumns,
  IconSparkles,
} from "@tabler/icons-react";
import { TreeView } from "@/components/treeView";
import { IconBrandTypescript, IconBrandReact } from "@tabler/icons-react";
import { TableColumn, Table } from "@/components/table";
import { LayoutSplitter } from "@/components/layoutSplitter";
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

const componentMeta = {
  title: "Layout Splitter Workspace",
  description:
    "A resizable split-panel layout container.",
  version: "v1.0.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/layout-splitter.tsx",

  category: "layout-and-content",
  apiDescription:
    "The Layout Splitter Workspace component provides a versatile UI primitive.",
};

const data = [
  {
    id: "lib",
    label: "lib",
    children: [
      {
        id: "utils.ts",
        label: "utils.ts",
        icon: <IconBrandTypescript className="w-4 h-4 text-blue-500" />,
      },
      {
        id: "button.tsx",
        label: "button.tsx",
        icon: <IconBrandReact className="w-4 h-4 text-sky-400" />,
      },
    ],
  },
];

const examples = [
  {
    id: "horizontal-workspace",
    title: "Horizontal Workspace Splitting",
    description:
      "Click and drag the divider to resize panels.",
    code: `import { LayoutSplitter } from "@/components/layout-splitter";
import { TreeView } from "@/components/tree-view";
import { IconBrandTypescript, IconBrandReact } from "@tabler/icons-react";
  
const data = [
    {
      id: "lib",
      label: "lib",
      children: [
        { id: "utils.ts", label: "utils.ts", icon: <IconBrandTypescript className="w-4 h-4 text-blue-500" /> },
        { id: "button.tsx", label: "button.tsx", icon: <IconBrandReact className="w-4 h-4 text-sky-400" /> },
      ]
    }
];

export function CodePlayground() {
  return (
    <LayoutSplitter
      direction="horizontal"
      initialSize={25}
      primaryPane={<TreeView className="mt-4" data={data} defaultExpanded={["lib"]} />}
      secondaryPane={<div className="p-4">Central Working Canvas</div>}
    />
  );
}`,
    render: () => (
      <div className="p-4 border border-border/50 rounded-2xl w-full max-w-2xl bg-card/40 backdrop-blur-sm">
        <div className="h-64 rounded-xl border border-border bg-background overflow-hidden">
          <LayoutSplitter
            direction="horizontal"
            initialSize={30}
            minSize={20}
            maxSize={80}
            primaryPane={
              <TreeView
                className="mt-4"
                data={data}
                defaultExpanded={["lib"]}
              />
            }
            secondaryPane={
              <div className="h-full p-4 text-xs flex flex-col gap-1 text-left">
                <h4 className="font-bold text-foreground">
                  Main Layout Workspace Panel
                </h4>
                <p className="text-muted-foreground leading-relaxed max-w-sm">
                  Drag the vertical line separator handle channel left or right
                  to re-scale the inner structural width tracking buffers.
                </p>
              </div>
            }
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
    name: "primaryPane",
    type: "React.ReactNode",
    default: "required",
    description:
      "Content tree rendered inside the variable-sized first slot (left or top).",
  },
  {
    name: "secondaryPane",
    type: "React.ReactNode",
    default: "required",
    description:
      "Content tree rendered inside the secondary expanding responsive filling box slot.",
  },
  {
    name: "direction",
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description:
      "Controls alignment vectors and matches pointer tracking vectors to matching axes streams.",
  },
  {
    name: "initialSize",
    type: "number",
    default: "30",
    description:
      "Initial split allocation percentage targeted directly at the primary container partition layer.",
  },
  {
    name: "minSize",
    type: "number",
    default: "15",
    description:
      "The lower boundary constraint floor percentage allowed by the drag interaction handler.",
  },
  {
    name: "maxSize",
    type: "number",
    default: "85",
    description:
      "The upper boundary ceiling percentage restriction allowed by the drag interaction handler.",
  },
];
const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function SplitterDocsPage() {
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
            { label: "Splitter API Reference", href: "#props-api" },
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
                label: "Layout Splitter",
                href: "/docs/components/layout-and-content/layout-splitter",
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
                Splitter API Reference
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
