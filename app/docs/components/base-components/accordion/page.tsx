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
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Accordion",
  description: "A highly customizable structural layout wrapper for organizing progressive disclosure text sections with hardware-accelerated Framer Motion state changes.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/accordion.tsx",
};

const examples = [
  {
    id: "default-variant",
    title: "Default Classic Layout",
    description: "The minimalist design system standard. Clean dividing vectors stack perfectly into sidebars, information resource logs, and secondary documentation footnotes.",
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
            Absolutely. Everything within our modular collection is distributed under the MIT license blueprint, permitting unlimited commercial redistribution, scaling, and private alterations.
          </AccordionItem>
          <AccordionItem title="Are layout templates dependency-locked to strict Next.js versions?">
            No. Our architectural models prioritize decoupled React components. You can migrate primitives directly across standard Vite layouts, Remix trees, or Next.js App Router configurations effortlessly.
          </AccordionItem>
          <AccordionItem title="Does the core system include deep layout accessibility support?">
            Yes. Triggers expose explicit native button nodes, track global state changes using proper aria-expanded variables, and leverage relative tracking ids for reliable assistive reader flows.
          </AccordionItem>
        </Accordion>
      </div>
    ),
  },
  {
    id: "carded-variant",
    title: "Carded Variant with Multi-Open",
    description: "Isolate complex layout records into structured container blocks. Enabling the allowMultiple variable permits users to stack multiple content pools open concurrently.",
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
            Primary server cluster arrays are fully responding across 24 edge routers. Dynamic load indicators present continuous metric distributions under a 2ms timeline window.
          </AccordionItem>
          <AccordionItem title="Database Sharding Metric Configurations">
            Horizontal read-replica routing configurations have synchronized global parameters. Hot caching layer extensions are currently preserving up to 94% optimization rates.
          </AccordionItem>
          <AccordionItem title="Edge Content Delivery Pipeline Security">
            End-to-end transport isolation policies enforce strict TLS 1.3 handshakes. Any legacy routing configurations are automatically dropped at our outer router border limits.
          </AccordionItem>
        </Accordion>
      </div>
    ),
  },
  {
    id: "animation-presets",
    title: "Dynamic Motion Presets",
    description: "Switch animation configurations seamlessly. Select from progressive dimensional shifts (slide), opacity fades (fade), or layout scaling mechanics (grow).",
    code: `<div className="space-y-6 w-full">
  {/* Grow Animation Preset */}
  <Accordion animation="grow" variant="carded">
    <AccordionItem title="Grow Preset Expansion Blueprint">
      This preset shifts scaling parameters dynamically alongside spatial dimensions to simulate natural component popping behaviors.
    </AccordionItem>
  </Accordion>

  {/* Fade Animation Preset */}
  <Accordion animation="fade">
    <AccordionItem title="Fade Preset Transition Layer">
      Locks structural layout alterations to soft alpha transparency curves, yielding modern and subtle disclosure workflows.
    </AccordionItem>
  </Accordion>
</div>`,
    render: () => (
      <div className="w-full max-w-xl space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 block mb-2">Preset: Grow + Carded</span>
          <Accordion animation="grow" variant="carded">
            <AccordionItem title="Grow Preset Expansion Blueprint">
              This preset shifts scaling parameters dynamically alongside spatial dimensions to simulate natural component popping behaviors.
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 block mb-2">Preset: Fade + Classic</span>
          <Accordion animation="fade">
            <AccordionItem title="Fade Preset Transition Layer">
              Locks structural layout alterations to soft alpha transparency curves, yielding modern and subtle disclosure workflows.
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    ),
  },
];

const apiProperties = [
  { name: "allowMultiple", type: "boolean", default: "false", description: "Enables multiple item disclosure blocks to remain structurally expanded at the same time." },
  { name: "animation", type: "'slide' | 'fade' | 'grow' | 'none'", default: "'slide'", description: "Dictates the framer-motion layout preset applied during height transition cycles." },
  { name: "variant", type: "'default' | 'carded'", default: "'default'", description: "Defines container aesthetics, switching between standard border rows or isolated container blocks." },
  { name: "openItems", type: "string[]", default: "undefined", description: "Pass an array of active string IDs to transform the accordion assembly into a controlled component environment." },
  { name: "onOpenChange", type: "(openItems: string[]) => void", default: "undefined", description: "Callback hook executed instantly when any header selection mutates the global layout array." },
  { name: "id", type: "string", default: "useId()", description: "Unique tracking indicator mapped to individual item nodes. Overrides automated fallback hashes." },
  { name: "defaultOpen", type: "boolean", default: "false", description: "Sets the initial unmounted state of individual accordion rows to expanded during cold page boots." },
];

const rightBarItems = [
  ...examples.map((example) => ({ label: example.title, href: `#${example.id}` })),
  { label: "Properties API", href: "#props-api" },
];

export default function AccordionDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    "default-variant": "preview",
    "carded-variant": "preview",
    "animation-presets": "preview",
  });

  const handleCopy = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleTab = (id: string, tab: "preview" | "code") => {
    setActiveTabs((prev) => ({ ...prev, [id]: tab }));
  };

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
        {/* Component Header Area */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Base Components", href: "/docs/components#base-components" },
              { label: componentMeta.title, href: "/docs/components/base-components/accordions" },
            ]}
          />

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
              {componentMeta.title}
            </h1>
            <span className="mt-1.5 rounded bg-secondary border border-border/80 px-2 py-0.5 font-mono text-[11px] font-bold text-muted-foreground">
              {componentMeta.version}
            </span>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">{componentMeta.description}</p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={componentMeta.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconCode className="h-3.5 w-3.5" /> View Source
              <IconExternalLink className="h-2.5 w-2.5 text-muted-foreground/60" />
            </a>
          </div>
        </div>

        {/* Dynamic Interactive Code Sandboxes */}
        <div className="space-y-10">
          {examples.map((example) => {
            const currentTab = activeTabs[example.id] || "preview";

            return (
              <section key={example.id} id={example.id} className="space-y-3 scroll-mt-20">
                <div className="space-y-0.5">
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{example.title}</h3>
                  <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">{example.description}</p>
                </div>

                <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
                  <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
                    <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs font-medium">
                      <button
                        onClick={() => toggleTab(example.id, "preview")}
                        className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${currentTab === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <IconEye className="h-3.5 w-3.5" /> Preview
                      </button>
                      <button
                        onClick={() => toggleTab(example.id, "code")}
                        className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${currentTab === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <IconCode className="h-3.5 w-3.5" /> Code
                      </button>
                    </div>
                    <button
                      onClick={() => handleCopy(example.id, example.code)}
                      className="cursor-pointer rounded-md border border-border/60 bg-card/60 p-1.5 text-muted-foreground transition-all hover:border-border hover:text-foreground"
                    >
                      {copiedId === example.id ? (
                        <IconCheck className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <IconCopy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex min-h-35 items-center justify-center bg-card/10 p-6">
                    {currentTab === "preview" ? (
                      <example.render />
                    ) : (
                      <pre className="w-full overflow-x-auto rounded-lg border border-border/40 bg-muted/20 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                        <code>{example.code}</code>
                      </pre>
                    )}
                  </div>
                </DocsPanel>
              </section>
            );
          })}
        </div>

        {/* Global API Property Grid Sheet */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconSparkles stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">API Reference</h2>
              <p className="text-xs text-muted-foreground">
                Properties, declarative types, and context variables configuration schema for the structural accordion components.
              </p>
            </div>
          </div>

          <DocsPanel className="overflow-hidden bg-card/30 rounded-xl border border-border/60">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-border/60 bg-secondary/30 font-semibold text-muted-foreground">
                    <th className="w-[18%] p-3 font-semibold">Property</th>
                    <th className="w-[32%] p-3 font-semibold">Type</th>
                    <th className="w-[12%] p-3 font-semibold">Default</th>
                    <th className="w-[38%] p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 font-medium">
                  {apiProperties.map((prop) => (
                    <tr key={prop.name} className="transition-colors hover:bg-secondary/20 vertical-align-top">
                      <td className="p-3 font-mono font-bold text-primary">{prop.name}</td>
                      <td className="p-3 font-mono text-purple-600 dark:text-purple-400 leading-relaxed">{prop.type}</td>
                      <td className="p-3 font-mono text-foreground/70">{prop.default}</td>
                      <td className="p-3 font-normal leading-relaxed text-muted-foreground">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DocsPanel>
        </section>

        <DocsAdjacentNav />

        <footer className="border-t border-border/30 pt-4 text-center text-xs text-muted-foreground/40">
          © 2026 Venti UI Labs. Modular interface logic primitives.
        </footer>
      </main>
    </DocsPageFrame>
  );
}