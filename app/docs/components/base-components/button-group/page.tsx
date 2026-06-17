"use client";

import React from "react";
import {
  IconExternalLink,
  IconLayoutGrid,
  IconSettings,
} from "@tabler/icons-react";

import { Button } from "@/components/button";
import { ButtonGroup } from "@/components/buttonGroup";
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
  title: "Button Group",
  description:
    "Groups related buttons into a cohesive row.",
  version: "v1.1.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/button-group.tsx",

  category: "base-components",
  apiDescription:
    "The Button Group component provides a versatile UI primitive.",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

type GroupVariantType = "modern" | "minimal" | "glass" | "macos";

const apiProperties: ApiProperty[] = [
  {
    name: "variant",
    type: "'modern' | 'minimal' | 'glass' | 'macos'",
    default: "'modern'",
    description:
      "Defines the shared container style track and automated child micro-radius adjustments.",
  },
  {
    name: "orientation",
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description:
      "Controls the structural axis alignment and localized border radius flatting layers.",
  },
  {
    name: "size",
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "undefined",
    description:
      "Propagates a uniform sizing layout down to all child action nodes automatically.",
  },
];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function ButtonGroupDocsPage() {
  const [playgroundVariant, setPlaygroundVariant] =
    React.useState<GroupVariantType>("modern");

  const playgroundCode = `<ButtonGroup variant="${playgroundVariant}" size="sm">
  <Button>Dashboard</Button>
  <Button>Analytics</Button>
  <Button>Settings</Button>
</ButtonGroup>`;

  const rightBarItems = [
    { label: "Interactive Playground", href: "#playground" },
    { label: "Action Clusters", href: "#basic-row" },
    { label: "Segmented Adjusters", href: "#stepper-example" },
    { label: "Vertical Stack", href: "#vertical-flow" },
    { label: "Properties API", href: "#props-api" },
  ];

  return (
    <DocsPageFrame
      leftBar={
        <aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-border/40">
          <DocsSidebar />
        </aside>
      }
      rightBar={<DocsOutline title="On this page" items={rightBarItems} />}
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">

        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              {
                label: "Base Components",
                href: "/docs/components#base-components",
              },
              {
                label: componentMeta.title,
                href: "/docs/components/base-components/button-groups",
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

        <section id="playground" className="space-y-4 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h3 className="text-lg font-bold tracking-tight text-foreground">
                Aesthetic Track Playground
              </h3>
              <p className="text-xs text-muted-foreground">
                Toggle systemic variants to view custom track layouts and inheritances live.
              </p>
            </div>

            <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-muted/20 p-1 text-xs">
              {(
                ["modern", "minimal", "glass", "macos"] as GroupVariantType[]
              ).map((v) => (
                <button
                  key={v}
                  onClick={() => setPlaygroundVariant(v)}
                  className={`rounded-md px-2.5 py-1 font-semibold capitalize transition-all ${
                    playgroundVariant === v
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <CodeBlock
            example={{
              id: "playground",
              title: "",
              code: playgroundCode,
              render: () => (
                <div className="flex min-h-[160px] items-center justify-center p-8 bg-gradient-to-br from-transparent to-primary/[0.01] w-full">
                  <ButtonGroup variant={playgroundVariant} size="sm">
                    <Button className="px-3 py-1.5 font-medium text-xs">Dashboard</Button>
                    <Button className="px-3 py-1.5 font-medium text-xs">Analytics</Button>
                    <Button className="px-3 py-1.5 font-medium text-xs">Settings</Button>
                  </ButtonGroup>
                </div>
              ),
            }}
          />
        </section>

        <div className="space-y-10">

          <section id="basic-row" className="space-y-3 scroll-mt-20">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold tracking-tight text-foreground">
                Action Clusters
              </h3>
              <p className="text-xs text-muted-foreground">
                Standard row groups using external boundary strokes for high clean visual parity.
              </p>
            </div>
            <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
              <div className="p-6 flex items-center justify-center">
                <ButtonGroup variant="modern" size="sm">
                  <Button className="px-3 py-1 text-xs">Left Align</Button>
                  <Button className="px-3 py-1 text-xs">Center Align</Button>
                  <Button className="px-3 py-1 text-xs">Right Align</Button>
                </ButtonGroup>
              </div>
            </DocsPanel>
          </section>

          <section id="stepper-example" className="space-y-3 scroll-mt-20">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold tracking-tight text-foreground">
                Segmented Adjusters
              </h3>
              <p className="text-xs text-muted-foreground">
                Mixing semantic button states natively within quantitative layouts.
              </p>
            </div>
            <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
              <div className="p-6 flex items-center justify-center">
                <ButtonGroup variant="minimal" size="sm">
                  <Button className="px-3 py-1 font-bold">-</Button>
                  <Button className="px-4 py-1 font-mono bg-background/80 pointer-events-none shadow-xs">
                    12
                  </Button>
                  <Button className="px-3 py-1 font-bold">+</Button>
                </ButtonGroup>
              </div>
            </DocsPanel>
          </section>

          <section id="vertical-flow" className="space-y-3 scroll-mt-20">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold tracking-tight text-foreground">
                Vertical Stack Orientation
              </h3>
              <p className="text-xs text-muted-foreground">
                Pivoting track systems safely along column layouts utilizing orientation options.
              </p>
            </div>
            <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
              <div className="p-6 flex items-center justify-center">
                <ButtonGroup
                  orientation="vertical"
                  variant="modern"
                  className="w-44"
                >
                  <Button className="px-4 py-2 text-left text-xs font-semibold">
                    Top Command
                  </Button>
                  <Button className="px-4 py-2 text-left text-xs font-semibold">
                    Middle Options
                  </Button>
                  <Button className="px-4 py-2 text-left text-xs font-semibold">
                    Bottom Action
                  </Button>
                </ButtonGroup>
              </div>
            </DocsPanel>
          </section>
        </div>

        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconLayoutGrid stroke={2} className="h-4 w-4" />
            </div>
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
