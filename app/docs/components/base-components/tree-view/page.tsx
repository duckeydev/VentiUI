"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconFolderStar,
  IconSparkles,
  IconBrandTypescript,
  IconBrandReact,
} from "@tabler/icons-react";

import { TreeView } from "@/components/treeView";
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
import { Badge } from "@/components";

const componentMeta = {
  title: "Tree View",
  description:
    "A collapsible tree view for hierarchical data.",
  version: "v1.0.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/tree-view.tsx",

  category: "base-components",
  apiDescription: "The Tree View component provides a versatile UI primitive.",
};

const examples = [
  {
    id: "default-tree",
    title: "Basic Tree",
    description:
      "Click folders to expand and collapse nested items.",
    code: `import { TreeView } from "@/components/tree-view";

export function BasicTree() {
  const data = [
    {
      id: "src",
      label: "src",
      children: [
        { id: "app", label: "app", children: [{ id: "page", label: "page.tsx" }] },
        { id: "components", label: "components" },
      ]
    },
    { id: "package.json", label: "package.json" }
  ];

  return <TreeView data={data} defaultExpanded={["src", "app"]} />;
}`,
    render: () => {
      const data = [
        {
          id: "src",
          label: "src",
          children: [
            {
              id: "app",
              label: "app",
              children: [{ id: "page", label: "page.tsx" }],
            },
            { id: "components", label: "components" },
          ],
        },
        { id: "package.json", label: "package.json" },
      ];
      return (
        <div className="w-full max-w-sm py-3 px-1 border border-border/50 rounded-xl bg-card/60 backdrop-blur-sm text-left">
          <TreeView data={data} defaultExpanded={["src", "app"]} />
        </div>
      );
    },
  },
  {
    id: "icon-tree",
    title: "Custom Icons",
    description:
      "Add custom icons to tree nodes.",
    code: `import { TreeView } from "@/components/tree-view";
import { IconBrandTypescript, IconBrandReact } from "@tabler/icons-react";
import { TableColumn, Table } from "@/components/table";

export function IconTree() {
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

  return <TreeView data={data} defaultExpanded={["lib"]} />;
}`,
    render: () => {
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
      return (
        <div className="w-full max-w-sm py-3 px-1 border border-border/50 rounded-xl bg-card/60 backdrop-blur-sm text-left">
          <TreeView data={data} defaultExpanded={["lib"]} />
        </div>
      );
    },
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
    name: "data",
    type: "TreeNodeData[]",
    default: "required",
    description:
      "Array nested configuration data map defining tree leaf parameters, text node titles, and custom icons.",
  },
  {
    name: "defaultExpanded",
    type: "string[]",
    default: "[]",
    description:
      "Collects targeted string ID identifiers that populate the internal expansion state index on layout load.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description:
      "Standard inline style class hook to safely manipulate layout dimensions or layout padding constraints.",
  },
];
const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function TreeViewDocsPage() {
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
            { label: "Properties API", href: "#props-api" },
          ]}
        />
      }
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">

        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Data View", href: "/docs/components#data" },
              { label: "Tree View", href: "/docs/components/data/tree-view" },
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
