"use client";

import { useState } from "react";
import { IconCode, IconExternalLink, IconSparkles } from "@tabler/icons-react";

import { Kbd } from "@/components/kbd";
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
  title: "Keyboard Indicator",
  description:
    "Renders keyboard shortcut visual indicators.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/kbd.tsx",
  category: "layout-and-content",
  apiDescription:
    "The Keyboard Indicator Core component provides a versatile UI primitive.",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const examples = [
  {
    id: "modifier-combinations",
    title: "System Macro Combinations",
    description:
      "Keyboard shortcuts with modifier keys.",
    code: `import { Kbd } from "@/components/kbd";

export function CommandBinding() {
  return (
    <div className="flex items-center gap-1">
      <Kbd modifier="cmd" />
      <Kbd>K</Kbd>
    </div>
  );
}`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-xl bg-card/40 backdrop-blur-sm text-left flex flex-col gap-4">
        <div className="flex items-center justify-between p-2 rounded-lg border border-border/30 bg-secondary/20 text-xs">
          <span className="text-muted-foreground font-medium">
            Global Command Finder
          </span>
          <div className="flex items-center gap-1">
            <Kbd modifier="cmd" />
            <Kbd>K</Kbd>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg border border-border/30 bg-secondary/20 text-xs">
          <span className="text-muted-foreground font-medium">
            Discard Draft State
          </span>
          <div className="flex items-center gap-1">
            <Kbd modifier="shift" />
            <Kbd modifier="alt" />
            <Kbd>D</Kbd>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg border border-border/30 bg-secondary/20 text-xs">
          <span className="text-muted-foreground font-medium">
            Submit Workspace Request
          </span>
          <div className="flex items-center gap-1">
            <Kbd modifier="enter">Enter</Kbd>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "visual-variants",
    title: "Mechanical Depths and Layout Sizes",
    description:
      "Different visual styles for keyboard indicators.",
    code: `<div className="flex gap-2">
  <Kbd variant="raised" size="lg">⌘</Kbd>
  <Kbd variant="outline">K</Kbd>
</div>`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-xl bg-card/40 backdrop-blur-sm flex flex-wrap gap-6 items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <span className="text-[10px] font-mono opacity-40">size="sm"</span>
          <div className="flex gap-1">
            <Kbd size="sm" modifier="cmd" />
            <Kbd size="sm">P</Kbd>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <span className="text-[10px] font-mono opacity-40">
            variant="raised"
          </span>
          <div className="flex gap-1">
            <Kbd variant="raised" modifier="ctrl" />
            <Kbd variant="raised">Tab</Kbd>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <span className="text-[10px] font-mono opacity-40">
            variant="outline"
          </span>
          <div className="flex gap-1">
            <Kbd variant="outline" modifier="alt" />
            <Kbd variant="outline">F4</Kbd>
          </div>
        </div>
      </div>
    ),
  },
];

const apiProperties: ApiProperty[] = [
  {
    name: "modifier",
    type: "'cmd' | 'shift' | 'alt' | 'ctrl' | 'enter' | 'caps'",
    default: "undefined",
    description:
      "Injects standardized structural notation character glyphs automatically into the text stream.",
  },
  {
    name: "size",
    type: "'sm' | 'default' | 'lg'",
    default: "'default'",
    description:
      "Controls spatial volume tracking, line heights, and padding parameters.",
  },
  {
    name: "variant",
    type: "'default' | 'raised' | 'outline'",
    default: "'default'",
    description:
      "Modifies border parameters and shadow offsets to construct mechanical 3D depth representations.",
  },
];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function KbdDocsPage() {
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
            { label: "Kbd API Reference", href: "#props-api" },
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
                label: "Data Display Primitives",
                href: "/docs/components#data-display",
              },
              {
                label: "Keyboard Component",
                href: "/docs/components/data-display/kbd",
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
                Kbd API Reference
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
