"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconLoaderQuarter,
  IconActivity,
  IconSparkles,
  IconBrandNextjs,
  IconBrandTailwind,
  IconBrandFramer,
  IconBrandReact,
  IconBrandTypescript,
} from "@tabler/icons-react";

import { Marquee } from "@/components/marquee";
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
  title: "Marquee",
  description:
    "An infinite horizontal scrolling marquee.",
  version: "v1.2.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/marquee.tsx",

  category: "base-components",
  apiDescription: "The Marquee component provides a versatile UI primitive.",
};

const examples = [
  {
    id: "logo-cloud",
    title: "Brand Logo Cloud",
    description:
      "Brand logos scroll across the screen seamlessly.",
    code: `<Marquee speed={35} pauseOnHover>
  <div className="flex items-center gap-2 font-semibold text-sm text-muted-foreground bg-secondary/40 px-4 py-2 rounded-xl border border-border/40"><IconBrandNextjs className="h-4 w-4" /> Next.js</div>
  <div className="flex items-center gap-2 font-semibold text-sm text-muted-foreground bg-secondary/40 px-4 py-2 rounded-xl border border-border/40"><IconBrandTailwind className="h-4 w-4" /> Tailwind CSS</div>
  <div className="flex items-center gap-2 font-semibold text-sm text-muted-foreground bg-secondary/40 px-4 py-2 rounded-xl border border-border/40"><IconBrandFramer className="h-4 w-4" /> Framer Motion</div>
  <div className="flex items-center gap-2 font-semibold text-sm text-muted-foreground bg-secondary/40 px-4 py-2 rounded-xl border border-border/40"><IconBrandReact className="h-4 w-4" /> React Framework</div>
  <div className="flex items-center gap-2 font-semibold text-sm text-muted-foreground bg-secondary/40 px-4 py-2 rounded-xl border border-border/40"><IconBrandTypescript className="h-4 w-4" /> TypeScript</div>
</Marquee>`,
    render: () => (
      <div className="w-full bg-card/40 backdrop-blur-sm border border-border/40 rounded-xl p-6 overflow-hidden">
        <Marquee speed={35} pauseOnHover>
          <div className="flex items-center gap-2 font-semibold text-sm text-muted-foreground/80 bg-secondary/50 px-4 py-2 rounded-xl border border-border/40">
            <IconBrandNextjs className="h-4 w-4 text-foreground" /> Next.js
          </div>
          <div className="flex items-center gap-2 font-semibold text-sm text-muted-foreground/80 bg-secondary/50 px-4 py-2 rounded-xl border border-border/40">
            <IconBrandTailwind className="h-4 w-4 text-sky-400" /> Tailwind CSS
          </div>
          <div className="flex items-center gap-2 font-semibold text-sm text-muted-foreground/80 bg-secondary/50 px-4 py-2 rounded-xl border border-border/40">
            <IconBrandFramer className="h-4 w-4 text-pink-400" /> Framer Motion
          </div>
          <div className="flex items-center gap-2 font-semibold text-sm text-muted-foreground/80 bg-secondary/50 px-4 py-2 rounded-xl border border-border/40">
            <IconBrandReact className="h-4 w-4 text-blue-400" /> React Framework
          </div>
          <div className="flex items-center gap-2 font-semibold text-sm text-muted-foreground/80 bg-secondary/50 px-4 py-2 rounded-xl border border-border/40">
            <IconBrandTypescript className="h-4 w-4 text-blue-500" /> TypeScript
          </div>
        </Marquee>
      </div>
    ),
  },
  {
    id: "data-ticker",
    title: "Reverse Data Metric Feed",
    description:
      "Data metrics scroll in reverse direction.",
    code: `<Marquee speed={18} direction="right" fadeEdges={false}>
  <div className="text-xs font-mono font-bold text-emerald-500 flex items-center gap-1"><span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"/> NODE_ALPHA: OK [2ms]</div>
  <div className="text-xs font-mono font-bold text-emerald-500 flex items-center gap-1"><span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"/> DIST_METRIC_BETA: SYNC [99.4%]</div>
  <div className="text-xs font-mono font-bold text-amber-500 flex items-center gap-1"><span className="h-1.5 w-1.5 bg-amber-500 rounded-full"/> REGION_PROXY_GAMMA: COMPACTING</div>
</Marquee>`,
    render: () => (
      <div className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 overflow-hidden">
        <Marquee speed={18} direction="right" fadeEdges={false}>
          <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-md border border-neutral-800">
            <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" />{" "}
            NODE_ALPHA: ONLINE [2ms]
          </div>
          <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-md border border-neutral-800">
            <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" />{" "}
            DIST_METRIC_BETA: SYNC [99.8%]
          </div>
          <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-md border border-neutral-800">
            <span className="h-1.5 w-1.5 bg-amber-400 rounded-full" />{" "}
            REGION_PROXY_GAMMA: FLUSHING
          </div>
          <div className="text-xs font-mono font-bold text-rose-400 flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-md border border-neutral-800">
            <span className="h-1.5 w-1.5 bg-rose-400 rounded-full" />{" "}
            EDGE_ROUTER_DELTA: BLOCKING
          </div>
        </Marquee>
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
    name: "speed",
    type: "number",
    default: "30",
    description:
      "The time duration footprint (expressed cleanly in total seconds) required to cycle one loop iteration.",
  },
  {
    name: "pauseOnHover",
    type: "boolean",
    default: "true",
    description:
      "Intercepts cursor bounds, stalling out the transform metrics cleanly without disrupting alignment parameters.",
  },
  {
    name: "direction",
    type: "'left' | 'right'",
    default: "'left'",
    description:
      "Dictates the absolute horizontal vector coordinate path orientation mapping.",
  },
  {
    name: "fadeEdges",
    type: "boolean",
    default: "true",
    description:
      "Appends a native WebKit CSS alpha boundary fade mask across terminal track boundaries.",
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

export default function MarqueeDocsPage() {
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
              { label: "Advanced Effects", href: "/docs/components#effects" },
              {
                label: componentMeta.title,
                href: "/docs/components/effects/marquee",
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
