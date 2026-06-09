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
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Tree View",
  description: "Hierarchical file directory abstractions recursively mapped using animated framer expansions securely.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/tree-view.tsx",
};

const examples = [
  {
    id: "default-tree",
    title: "Basic Tree",
    description: "Map JSON nodes gracefully enabling deep structured folder arrays.",
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
            { id: "app", label: "app", children: [{ id: "page", label: "page.tsx" }] },
            { id: "components", label: "components" },
          ]
        },
        { id: "package.json", label: "package.json" }
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
    description: "Attach explicit SVG react components overriding native mapping shapes.",
    code: `import { TreeView } from "@/components/tree-view";
import { IconBrandTypescript, IconBrandReact } from "@tabler/icons-react";

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
            { id: "utils.ts", label: "utils.ts", icon: <IconBrandTypescript className="w-4 h-4 text-blue-500" /> },
            { id: "button.tsx", label: "button.tsx", icon: <IconBrandReact className="w-4 h-4 text-sky-400" /> },
          ]
        }
      ];
      return (
        <div className="w-full max-w-sm py-3 px-1 border border-border/50 rounded-xl bg-card/60 backdrop-blur-sm text-left">
          <TreeView data={data} defaultExpanded={["lib"]} />
        </div>
      );
    },
  },
];

const apiProperties = [
  { name: "data", type: "TreeNodeData[]", default: "required", description: "Array nested configuration data map defining tree leaf parameters, text node titles, and custom icons." },
  { name: "defaultExpanded", type: "string[]", default: "[]", description: "Collects targeted string ID identifiers that populate the internal expansion state index on layout load." },
  { name: "className", type: "string", default: "''", description: "Standard inline style class hook to safely manipulate layout dimensions or layout padding constraints." },
];

export default function TreeViewDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    "default-tree": "preview",
    "icon-tree": "preview",
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
      rightBar={<DocsOutline title="On this page" items={[...examples.map(e => ({ label: e.title, href: `#${e.id}` })), { label: "Properties API", href: "#props-api" }]} />}
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">
        {/* Core Component Heading Elements */}
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

        {/* Dynamic Sandboxes */}
        <div className="space-y-10">
          {examples.map((example) => {
            const currentTab = activeTabs[example.id] || "preview";

            return (
              <section key={example.id} id={example.id} className="space-y-3 scroll-mt-20">
                <div className="flex items-center gap-2">
                  <IconFolderStar className="h-4 w-4 text-primary" />
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

                  <div className="flex min-h-36 items-center justify-center bg-card/10 p-6 overflow-hidden">
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

        {/* Global Component Properties Matrix Table Area */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconSparkles stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">API Reference</h2>
              <p className="text-xs text-muted-foreground">
                Properties parameters and recursive object interfaces accepted directly by the custom TreeView composite indicator.
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
          © 2026 Venti UI Labs. Hierarchical navigation abstractions.
        </footer>
      </main>
    </DocsPageFrame>
  );
}