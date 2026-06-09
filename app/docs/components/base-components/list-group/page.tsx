"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconListDetails,
  IconSettings,
  IconChevronRight,
  IconSparkles,
} from "@tabler/icons-react";

import { ListGroup, ListGroupItem } from "@/components/listGroup"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "List Group",
  description: "A cohesive item tracking wrapper framework optimized for rendering navigational lists, settings options arrays, and sequential information feed structures.",
  version: "v1.1.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/list-group.tsx",
};

const examples = [
  {
    id: "boxed-variant",
    title: "Standard Carded Layout",
    description: "The default encapsulated structure featuring integrated rounded perimeter borders and safe container content clipping lines.",
    code: `<ListGroup>
  <ListGroupItem active>
    <span>Production Telemetry Pipeline Alpha</span>
    <span className="text-[10px] font-bold tracking-wider uppercase bg-primary-foreground/20 px-2 py-0.5 rounded">Active</span>
  </ListGroupItem>
  <ListGroupItem>
    <span>Secondary Edge Routing Cluster Beta</span>
    <IconChevronRight className="h-4 w-4 opacity-40" />
  </ListGroupItem>
  <ListGroupItem disabled>
    <span>Legacy Deprecated Aggregation Node</span>
    <span className="text-[10px] font-medium opacity-60">Disconnected</span>
  </ListGroupItem>
</ListGroup>`,
    render: () => (
      <div className="w-full max-w-xl">
        <ListGroup>
          <ListGroupItem active>
            <span>Production Telemetry Pipeline Alpha</span>
            <span className="text-[10px] font-bold tracking-wider uppercase bg-primary-foreground/20 px-2 py-0.5 rounded">Active</span>
          </ListGroupItem>
          <ListGroupItem>
            <span>Secondary Edge Routing Cluster Beta</span>
            <IconChevronRight className="h-4 w-4 opacity-40" />
          </ListGroupItem>
          <ListGroupItem disabled>
            <span>Legacy Deprecated Aggregation Node</span>
            <span className="text-[10px] font-medium opacity-60">Disconnected</span>
          </ListGroupItem>
        </ListGroup>
      </div>
    ),
  },
  {
    id: "flush-variant",
    title: "Flush Seamless Layout",
    description: "Strips out the outer borders, margins, and external background definitions to let item fields blend directly into raw landing surfaces or complex custom panel blocks.",
    code: `<ListGroup flush>
  <ListGroupItem href="#profile" as="a">
    <div className="flex flex-col">
      <span className="font-semibold">User Access Control Configurations</span>
      <span className="text-xs text-muted-foreground">Modify identity parameters and cryptographical access tokens</span>
    </div>
    <IconSettings className="h-4 w-4 text-muted-foreground/60" />
  </ListGroupItem>
  <ListGroupItem href="#security" as="a">
    <div className="flex flex-col">
      <span className="font-semibold">Transport Layer Firewall Logs</span>
      <span className="text-xs text-muted-foreground">Inspect proxy routing anomalies and validation failure tables</span>
    </div>
    <IconChevronRight className="h-4 w-4 text-muted-foreground/40" />
  </ListGroupItem>
</ListGroup>`,
    render: () => (
      <div className="w-full max-w-xl border border-border/40 p-4 rounded-xl bg-card/40 backdrop-blur-sm">
        <ListGroup flush>
          <ListGroupItem href="#profile" as="a">
            <div className="flex flex-col text-left">
              <span className="font-semibold text-sm">User Access Control Configurations</span>
              <span className="text-xs text-muted-foreground leading-normal">Modify identity parameters and cryptographical access tokens</span>
            </div>
            <IconSettings className="h-4 w-4 text-muted-foreground/60 shrink-0 ml-4" />
          </ListGroupItem>
          <ListGroupItem href="#security" as="a">
            <div className="flex flex-col text-left">
              <span className="font-semibold text-sm">Transport Layer Firewall Logs</span>
              <span className="text-xs text-muted-foreground leading-normal">Inspect proxy routing anomalies and validation failure tables</span>
            </div>
            <IconChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0 ml-4" />
          </ListGroupItem>
        </ListGroup>
      </div>
    ),
  },
];

const apiProperties = [
  { name: "flush", type: "boolean", default: "false", description: "Forces the group frame to shed exterior boundaries, sitting perfectly tight to baseline surfaces." },
  { name: "active", type: "boolean", default: "false", description: "Inverts component elements with high-visibility accent tones to highlight a focus selection state." },
  { name: "disabled", type: "boolean", default: "false", description: "Enforces full interaction locks, stripping tab indexing and reducing the element's overall opacity layer." },
  { name: "href", type: "string", default: "undefined", description: "Supplying a target directory or link URL path automatically remaps the underlying tag definition to an HTML Anchor element." },
  { name: "as", type: "React.ElementType", default: "'div' | 'a'", description: "Polymorphic layout injection property allowing manual override mapping of any valid HTML tag node." },
];

const rightBarItems = [
  ...examples.map((example) => ({ label: example.title, href: `#${example.id}` })),
  { label: "Properties API", href: "#props-api" },
];

export default function ListGroupDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    "boxed-variant": "preview",
    "flush-variant": "preview",
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
        {/* Component Title Documentation Header */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Data Display", href: "/docs/components#display" },
              { label: componentMeta.title, href: "/docs/components/display/list-groups" },
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
              <IconCode className="h-3.5 w-3.5" /> View Package Source
              <IconExternalLink className="h-2.5 w-2.5 text-muted-foreground/60" />
            </a>
          </div>
        </div>

        {/* Dynamic Interactive Sandboxes */}
        <div className="space-y-10">
          {examples.map((example) => {
            const currentTab = activeTabs[example.id] || "preview";

            return (
              <section key={example.id} id={example.id} className="space-y-3 scroll-mt-20">
                <div className="flex items-center gap-2">
                  <IconListDetails className="h-4 w-4 text-primary" />
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{example.title}</h3>
                </div>
                <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">{example.description}</p>

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

        {/* Component Core Properties Table Matrix */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconSparkles stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">API Reference</h2>
              <p className="text-xs text-muted-foreground">
                Properties, configuration flags, and type definitions assigned to the unified ListGroup sub-elements.
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