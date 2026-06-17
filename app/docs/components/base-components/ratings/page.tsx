"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconStar,
  IconSparkles,
} from "@tabler/icons-react";

import { Ratings } from "@/components/ratings";
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
  title: "Ratings Input",
  description:
    "A star rating component with half-star support.",
  version: "v1.1.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/ratings.tsx",

  category: "base-components",
  apiDescription:
    "The Ratings Input component provides a versatile UI primitive.",
};

const examples = [
  {
    id: "interactive-demo",
    title: "Interactive Half-Increment Input",
    description:
      "Hover over the stars to rate with half-star precision.",
    code: `const [rating, setRating] = useState(3.5);

<div className="flex flex-col gap-1">
  <Ratings value={rating} onChange={setRating} size="lg" allowHalf />
  <span className="text-xs font-mono text-muted-foreground">Value: {rating} / 5.0</span>
</div>`,
    render: () => {
      const [rating, setRating] = useState<number>(3.5);
      return (
        <div className="p-6 border border-border/50 rounded-xl bg-card/40 flex flex-col items-center gap-2 min-w-64">
          <Ratings value={rating} onChange={setRating} size="lg" allowHalf />
          <span className="text-xs font-mono font-semibold text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded border border-border/40 mt-1">
            Active Metric: {rating.toFixed(1)} / 5.0
          </span>
        </div>
      );
    },
  },
  {
    id: "readonly-scales",
    title: "Read-Only Dimensional Layouts",
    description:
      "Display ratings in read-only mode for reviews.",
    code: `<div className="space-y-4">

  <Ratings value={4.2} readOnly size="sm" />

  <Ratings value={5} readOnly size="md" activeColorClass="text-indigo-500" />
</div>`,
    render: () => (
      <div className="p-5 border border-border/50 rounded-xl bg-card/40 space-y-4 text-left min-w-64 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between text-xs">
          <span className="text-muted-foreground font-medium">
            Catalog Index Value:
          </span>
          <Ratings value={4.5} readOnly size="sm" />
        </div>
        <div className="w-full flex items-center justify-between text-xs">
          <span className="text-muted-foreground font-medium">
            Premium User Status:
          </span>
          <Ratings
            value={5}
            readOnly
            size="md"
            activeColorClass="text-indigo-500 dark:text-indigo-400"
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
    name: "value",
    type: "number",
    default: "0",
    description:
      "The active fractional scalar progress value assigned onto the star grid system map.",
  },
  {
    name: "max",
    type: "number",
    default: "5",
    description:
      "Sets the absolute total volume count of rendered interface node arrays.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    description:
      "Locks internal event pipelines down completely, optimizing the block strictly for telemetry mapping.",
  },
  {
    name: "allowHalf",
    type: "boolean",
    default: "true",
    description:
      "Bifurcates hit tracking zones horizontally, enabling evaluation metrics based on half increments.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description:
      "Drives internal geometric height and width CSS parameters using clean localized inline variables.",
  },
  {
    name: "activeColorClass",
    type: "string",
    default: "'text-amber-400'",
    description:
      "Utility tailwind color string mapping directly into active, fully loaded svg path fills.",
  },
  {
    name: "onChange",
    type: "(value: number) => void",
    default: "undefined",
    description:
      "Callback hook capturing structural commits inside user interaction tracks.",
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

export default function RatingsDocsPage() {
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
              { label: "Form Elements", href: "/docs/components#forms" },
              {
                label: "Ratings Input",
                href: "/docs/components/forms/ratings",
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
