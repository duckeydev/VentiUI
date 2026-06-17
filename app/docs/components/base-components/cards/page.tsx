"use client";

import { useState } from "react";
import {
  IconArrowRight,
  IconChartBar,
  IconCheck,
  IconCode,
  IconCopy,
  IconExternalLink,
  IconEye,
  IconPhoto,
  IconSparkles,
  IconLayersSubtract,
} from "@tabler/icons-react";

import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import {
  DocsBreadcrumbs,
  DocsOutline,
  DocsPageFrame,
  DocsPanel,
} from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import { Badge } from "@/components";
import { TableColumn, Table } from "@/components/table";
import CodeBlock from "@/app/components/codeblock";

const componentMeta = {
  title: "Card",
  description:
    "A flexible card container for content.",
  version: "v1.1.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/card.tsx",

  category: "base-components",
  apiDescription: "The Card component provides a versatile UI primitive.",
};

type CardVariantType = "modern" | "minimal" | "glass" | "macos";

const styleShowcase: { id: CardVariantType; label: string; desc: string }[] = [
  {
    id: "modern",
    label: "Modern",
    desc: "Crisp outline strokes with soft ambient drop styling.",
  },
  {
    id: "minimal",
    label: "Minimal",
    desc: "No shadow footprint. Implements tint zones over strict layouts.",
  },
  {
    id: "glass",
    label: "Glassmorphism",
    desc: "Heavy canvas background blur using premium specular borders.",
  },
  {
    id: "macos",
    label: "macOS Core",
    desc: "Continuous micro rounding curves paired with subtle scale animations.",
  },
];

const examples = [
  {
    id: "simple",
    title: "Simple",
    description: "",
    code: `<Card className="max-w-md p-6" variant="modern">
  <div className="space-y-2">
    <CardTitle>Workspace Overview</CardTitle>
    <CardDescription>
      Track weekly progress, active projects, and the latest team notes in one focused surface.
    </CardDescription>
  </div>
  <div className="mt-6 flex items-center justify-between">
    <span className="text-xs text-muted-foreground font-medium">8 tasks completed</span>
    <Button size="sm">Open dashboard</Button>
  </div>
</Card>`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-xl bg-card/40 flex items-center justify-center min-h-[120px] text-sm text-muted-foreground">
        Live preview
      </div>
    ),
  },
  {
    id: "composed",
    title: "Composed",
    description: "",
    code: `<Card className="max-w-xl overflow-hidden" variant="macos">
  <div className="h-36 bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950" />
  <CardHeader>
    <CardTitle>Continuous Engine Updates</CardTitle>
    <CardDescription>Engine metrics and deployment state timelines.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">
      Pair the card layout with high contrast media frames to separate visual focus zones safely.
    </p>
  </CardContent>
  <CardFooter>
    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
      <IconLayersSubtract className="h-3.5 w-3.5" /> Core Framework
    </span>
    <Button variant="outline" size="sm">Review Logs</Button>
  </CardFooter>
</Card>`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-xl bg-card/40 flex items-center justify-center min-h-[120px] text-sm text-muted-foreground">
        Live preview
      </div>
    ),
  },
  {
    id: "stats",
    title: "Stats",
    description: "",
    code: `<div className="grid gap-4 sm:grid-cols-3 w-full">
  <Card className="p-5" variant="minimal" hoverable>
    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
      <span>Traffic Streams</span>
      <IconChartBar className="h-4 w-4 text-primary" />
    </div>
    <div className="mt-3 text-2xl font-bold tracking-tight">24.8k</div>
    <p className="mt-1 text-xs font-medium text-emerald-500">+12.4% vs last week</p>
  </Card>
</div>`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-xl bg-card/40 flex items-center justify-center min-h-[120px] text-sm text-muted-foreground">
        Live preview
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

const columns: TableColumn<ApiProperty>[] = [
  {
    key: "name",
    header: "Property",
    width: "20%",
    className: "font-mono font-bold text-primary p-4",
  },
  {
    key: "type",
    header: "Type",
    width: "30%",
    className:
      "font-mono text-[10px] text-muted-foreground leading-relaxed p-4",
  },
  {
    key: "default",
    header: "Default",
    width: "15%",
    className: "font-mono text-foreground/70 italic p-4",
    render: (row: ApiProperty) =>
      row.default || <span className="text-muted-foreground/30">—</span>,
  },
  {
    key: "description",
    header: "Description",
    width: "35%",
    className: "font-normal leading-relaxed text-muted-foreground p-4",
  },
];

const apiProperties = [
  {
    name: "variant",
    type: "'default' | 'minimal' | 'glass'",
    default: "'default'",
    description: "Controls the visual treatment and border styles of the card.",
  },
  {
    name: "hover",
    type: "boolean",
    default: "false",
    description: "Enables hover elevation and shadow transitions.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes applied to the card container.",
  },
  {
    name: "children",
    type: "ReactNode",
    default: "required",
    description: "Content rendered inside the card body.",
  },
];

export default function CardDocsPage() {
  const [showcaseVariant, setShowcaseVariant] =
    useState<CardVariantType>("modern");

  const showcaseCode = `<Card variant="${showcaseVariant}" hoverable className="max-w-sm">
  <CardHeader>
    <CardTitle>System Architecture</CardTitle>
    <CardDescription>Active variant sandbox overview profile.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      Experiment with active interface styles using the runtime token modifiers above.
    </p>
  </CardContent>
  <CardFooter className="justify-end">
    <Button size="sm">Configure</Button>
  </CardFooter>
</Card>`;

  const simpleCode = `<Card className="max-w-md p-6" variant="modern">
  <div className="space-y-2">
    <CardTitle>Workspace Overview</CardTitle>
    <CardDescription>
      Track weekly progress, active projects, and the latest team notes in one focused surface.
    </CardDescription>
  </div>
  <div className="mt-6 flex items-center justify-between">
    <span className="text-xs text-muted-foreground font-medium">8 tasks completed</span>
    <Button size="sm">Open dashboard</Button>
  </div>
</Card>`;

  const composedCode = `<Card className="max-w-xl overflow-hidden" variant="macos">
  <div className="h-36 bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950" />
  <CardHeader>
    <CardTitle>Continuous Engine Updates</CardTitle>
    <CardDescription>Engine metrics and deployment state timelines.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">
      Pair the card layout with high contrast media frames to separate visual focus zones safely.
    </p>
  </CardContent>
  <CardFooter>
    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
      <IconLayersSubtract className="h-3.5 w-3.5" /> Core Framework
    </span>
    <Button variant="outline" size="sm">Review Logs</Button>
  </CardFooter>
</Card>`;

  const statsCode = `<div className="grid gap-4 sm:grid-cols-3 w-full">
  <Card className="p-5" variant="minimal" hoverable>
    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
      <span>Traffic Streams</span>
      <IconChartBar className="h-4 w-4 text-primary" />
    </div>
    <div className="mt-3 text-2xl font-bold tracking-tight">24.8k</div>
    <p className="mt-1 text-xs font-medium text-emerald-500">+12.4% vs last week</p>
  </Card>
</div>`;

  const rightBarItems = [
    { label: "Interactive Playground", href: "#playground" },
    { label: "Compact Pattern", href: "#compact" },
    { label: "Composed Layout", href: "#composed" },
    { label: "Dashboard Metrics", href: "#metrics" },
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
                href: "/docs/components/base-components/cards",
              },
            ]}
          />

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
              {componentMeta.title}
            </h1>
            <span className="mt-1.5 rounded bg-primary/10 border border-primary/20 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
              {componentMeta.version}
            </span>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            {componentMeta.description}
          </p>
        </div>

        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Properties API
            </h2>
            <p className="text-sm text-muted-foreground">
              All available props for this component.
            </p>
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
