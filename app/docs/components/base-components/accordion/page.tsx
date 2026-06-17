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

import { Accordion, AccordionItem } from "@/components/accordion";
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
  title: "Accordion",
  description:
    "Expandable sections for showing and hiding content.",
  version: "v1.0.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/accordion.tsx",

  category: "base-components",
  apiDescription: "The Accordion component provides a versatile UI primitive.",
};

const examples = [
  {
    id: "default-variant",
    title: "Default Classic Layout",
    description:
      "Click any item to expand its content.",
    code: `<Accordion>
  <AccordionItem title="Can I use Venti UI for commercial SaaS products?">
    Absolutely. Everything within our modular collection is distributed under the MIT license blueprint, permitting unlimited commercial redistribution, scaling, and private alterations.
  </AccordionItem>
  <AccordionItem title="Are layout templates dependency-locked to strict Next.js versions?">
    No. Our architectural models prioritize decoupled React components. You can migrate primitives directly across standard Vite layouts, Remix trees, or Next.js App Router configurations effortlessly.
  </AccordionItem>
  <AccordionItem title="Does the core system include deep layout accessibility support?">
    Yes. Triggers expose explicit native button nodes, track global state changes using proper aria-expanded variables, and leverage relative tracking ids for reliable assistive reader flows.
  </AccordionItem>
</Accordion>`,
    render: () => (
      <div className="w-full max-w-xl">
        <Accordion>
          <AccordionItem title="Can I use Venti UI for commercial SaaS products?">
            Absolutely. Everything within our modular collection is distributed
            under the MIT license blueprint, permitting unlimited commercial
            redistribution, scaling, and private alterations.
          </AccordionItem>
          <AccordionItem title="Are layout templates dependency-locked to strict Next.js versions?">
            No. Our architectural models prioritize decoupled React components.
            You can migrate primitives directly across standard Vite layouts,
            Remix trees, or Next.js App Router configurations effortlessly.
          </AccordionItem>
          <AccordionItem title="Does the core system include deep layout accessibility support?">
            Yes. Triggers expose explicit native button nodes, track global
            state changes using proper aria-expanded variables, and leverage
            relative tracking ids for reliable assistive reader flows.
          </AccordionItem>
        </Accordion>
      </div>
    ),
  },
  {
    id: "carded-variant",
    title: "Carded Variant with Multi-Open",
    description:
      "Multiple items can be open at the same time.",
    code: `<Accordion variant="carded" allowMultiple>
  <AccordionItem title="Infrastructure Node Vector Cluster Alpha">
    Primary server cluster arrays are fully responding across 24 edge routers. Dynamic load indicators present continuous metric distributions under a 2ms timeline window.
  </AccordionItem>
  <AccordionItem title="Database Sharding Metric Configurations">
    Horizontal read-replica routing configurations have synchronized global parameters. Hot caching layer extensions are currently preserving up to 94% optimization rates.
  </AccordionItem>
  <AccordionItem title="Edge Content Delivery Pipeline Security">
    End-to-end transport isolation policies enforce strict TLS 1.3 handshakes. Any legacy routing configurations are automatically dropped at our outer router border limits.
  </AccordionItem>
</Accordion>`,
    render: () => (
      <div className="w-full max-w-xl">
        <Accordion variant="carded" allowMultiple>
          <AccordionItem title="Infrastructure Node Vector Cluster Alpha">
            Primary server cluster arrays are fully responding across 24 edge
            routers. Dynamic load indicators present continuous metric
            distributions under a 2ms timeline window.
          </AccordionItem>
          <AccordionItem title="Database Sharding Metric Configurations">
            Horizontal read-replica routing configurations have synchronized
            global parameters. Hot caching layer extensions are currently
            preserving up to 94% optimization rates.
          </AccordionItem>
          <AccordionItem title="Edge Content Delivery Pipeline Security">
            End-to-end transport isolation policies enforce strict TLS 1.3
            handshakes. Any legacy routing configurations are automatically
            dropped at our outer router border limits.
          </AccordionItem>
        </Accordion>
      </div>
    ),
  },
  {
    id: "animation-presets",
    title: "Dynamic Motion Presets",
    description:
      "Toggle between different animation styles.",
    code: `<div className="space-y-6 w-full">

  <Accordion animation="grow" variant="carded">
    <AccordionItem title="Grow Preset Expansion Blueprint">
      This preset shifts scaling parameters dynamically alongside spatial dimensions to simulate natural component popping behaviors.
    </AccordionItem>
  </Accordion>

  <Accordion animation="fade">
    <AccordionItem title="Fade Preset Transition Layer">
      Locks structural layout alterations to soft alpha transparency curves, yielding modern and subtle disclosure workflows.
    </AccordionItem>
  </Accordion>
</div>`,
    render: () => (
      <div className="w-full max-w-xl space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 block mb-2">
            Preset: Grow + Carded
          </span>
          <Accordion animation="grow" variant="carded">
            <AccordionItem title="Grow Preset Expansion Blueprint">
              This preset shifts scaling parameters dynamically alongside
              spatial dimensions to simulate natural component popping
              behaviors.
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 block mb-2">
            Preset: Fade + Classic
          </span>
          <Accordion animation="fade">
            <AccordionItem title="Fade Preset Transition Layer">
              Locks structural layout alterations to soft alpha transparency
              curves, yielding modern and subtle disclosure workflows.
            </AccordionItem>
          </Accordion>
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
    name: "allowMultiple",
    type: "boolean",
    default: "false",
    description:
      "Enables multiple item disclosure blocks to remain structurally expanded at the same time.",
  },
  {
    name: "animation",
    type: "'slide' | 'fade' | 'grow' | 'none'",
    default: "'slide'",
    description:
      "Dictates the framer-motion layout preset applied during height transition cycles.",
  },
  {
    name: "variant",
    type: "'default' | 'carded'",
    default: "'default'",
    description:
      "Defines container aesthetics, switching between standard border rows or isolated container blocks.",
  },
  {
    name: "openItems",
    type: "string[]",
    default: "undefined",
    description:
      "Pass an array of active string IDs to transform the accordion assembly into a controlled component environment.",
  },
  {
    name: "onOpenChange",
    type: "(openItems: string[]) => void",
    default: "undefined",
    description:
      "Callback hook executed instantly when any header selection mutates the global layout array.",
  },
  {
    name: "id",
    type: "string",
    default: "useId()",
    description:
      "Unique tracking indicator mapped to individual item nodes. Overrides automated fallback hashes.",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    default: "false",
    description:
      "Sets the initial unmounted state of individual accordion rows to expanded during cold page boots.",
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

export default function AccordionDocsPage() {
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
                href: "/docs/components/base-components/accordions",
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

        <div className="space-y-14">
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
