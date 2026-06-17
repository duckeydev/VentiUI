"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconSparkles,
} from "@tabler/icons-react";

import { Carousel } from "@/components/carousel";
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
  title: "Carousel",
  description:
    "A sliding carousel for cycling through items.",
  version: "v1.0.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/carousel.tsx",

  category: "base-components",
  apiDescription: "The Carousel component provides a versatile UI primitive.",
};

const examples = [
  {
    id: "default-usage",
    title: "Default Usage",
    description:
      "Click the arrows to navigate through items.",
    code: `<Carousel className="h-64 w-full">
  <div className="w-full h-full bg-blue-500/20 flex items-center justify-center text-xl font-bold text-blue-500">Slide 1</div>
  <div className="w-full h-full bg-emerald-500/20 flex items-center justify-center text-xl font-bold text-emerald-500">Slide 2</div>
  <div className="w-full h-full bg-rose-500/20 flex items-center justify-center text-xl font-bold text-rose-500">Slide 3</div>
</Carousel>`,
    render: () => (
      <div className="w-full max-w-xl">
        <Carousel className="h-64 w-full border border-border/50">
          <div className="w-full h-full bg-blue-500/10 flex items-center justify-center text-xl font-bold text-blue-500">
            Slide 1
          </div>
          <div className="w-full h-full bg-emerald-500/10 flex items-center justify-center text-xl font-bold text-emerald-500">
            Slide 2
          </div>
          <div className="w-full h-full bg-rose-500/10 flex items-center justify-center text-xl font-bold text-rose-500">
            Slide 3
          </div>
        </Carousel>
      </div>
    ),
  },
  {
    id: "autoplay",
    title: "Autoplay",
    description:
      "Slides advance automatically on a timer.",
    code: `<Carousel autoPlay interval={3000} className="h-48 w-full">
  <div className="w-full h-full bg-purple-500/20 flex items-center justify-center text-xl font-bold text-purple-500">Fast 1</div>
  <div className="w-full h-full bg-orange-500/20 flex items-center justify-center text-xl font-bold text-orange-500">Fast 2</div>
  <div className="w-full h-full bg-yellow-500/20 flex items-center justify-center text-xl font-bold text-yellow-500">Fast 3</div>
</Carousel>`,
    render: () => (
      <div className="w-full max-w-xl">
        <Carousel
          autoPlay
          interval={3000}
          className="h-48 w-full border border-border/50"
        >
          <div className="w-full h-full bg-purple-500/10 flex items-center justify-center text-xl font-bold text-purple-500">
            Fast 1
          </div>
          <div className="w-full h-full bg-orange-500/10 flex items-center justify-center text-xl font-bold text-orange-500">
            Fast 2
          </div>
          <div className="w-full h-full bg-yellow-500/10 flex items-center justify-center text-xl font-bold text-yellow-500">
            Fast 3
          </div>
        </Carousel>
      </div>
    ),
  },
  {
    id: "image-gallery",
    title: "Image Gallery",
    description:
      "Perfect for image galleries and portfolios.",
    code: `<Carousel className="h-72 w-full" showIndicators={false} loop={false}>
  <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-300 font-medium">Image 1</div>
  <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-300 font-medium">Image 2</div>
  <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-300 font-medium">Image 3</div>
</Carousel>`,
    render: () => (
      <div className="w-full max-w-xl">
        <Carousel
          className="h-72 w-full border border-border/50"
          showIndicators={false}
          loop={false}
        >
          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-300 font-medium">
            Image 1
          </div>
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-300 font-medium">
            Image 2
          </div>
          <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-300 font-medium">
            Image 3
          </div>
        </Carousel>
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
    name: "children",
    type: "React.ReactNode",
    default: "undefined",
    description:
      "The content (slides) to be rendered. Best practice is utilizing an array of structural node elements.",
  },
  {
    name: "autoPlay",
    type: "boolean",
    default: "false",
    description:
      "Enables cyclical automated transitions without user input when unhovered.",
  },
  {
    name: "interval",
    type: "number",
    default: "5000",
    description:
      "Specifies the timeout metric between slides via milliseconds.",
  },
  {
    name: "showControls",
    type: "boolean",
    default: "true",
    description:
      "Displays dynamic Next/Previous overlapping directional float actions on hover state.",
  },
  {
    name: "showIndicators",
    type: "boolean",
    default: "true",
    description:
      "Injects page state pill markings at the bottom horizontal threshold layout.",
  },
  {
    name: "loop",
    type: "boolean",
    default: "true",
    description:
      "Controls whether scrolling past the final element index rotates back to initialization.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description:
      "A standard string vector parsed by structural layouts overriding element bounds.",
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

export default function CarouselDocsPage() {
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
              {
                label: "Base Components",
                href: "/docs/components#base-components",
              },
              {
                label: componentMeta.title,
                href: "/docs/components/base-components/carousel",
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
          </p>        </div>

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
