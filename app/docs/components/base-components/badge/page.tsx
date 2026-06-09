"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconLayoutGrid,
  IconTag,
  IconGitBranch,
  IconAlertCircle,
  IconCircleCheck,
} from "@tabler/icons-react";

import { Badge } from "@/components/badge";
import {
  DocsBreadcrumbs,
  DocsOutline,
  DocsPageFrame,
  DocsPanel,
} from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Badge",
  description:
    "A micro-indicator layout token designed to display static tags, contextual metadata properties, or system operation statuses.",
  version: "v1.1.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/badge.tsx",
};

type BadgeVariantType = "modern" | "minimal" | "glass" | "macos" | "info" | "success" | "warning" | "destructive";

const badgeProperties = [
  {
    name: "variant",
    type: "'modern' | 'minimal' | 'glass' | 'macos' | 'info' | 'success' | 'warning' | 'destructive'",
    default: "'modern'",
    description: "Configures background transparency scales, borders, and systemic alert states.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: "Adjusts padding balances, internal tracking gaps, and micro-typographic size levels.",
  },
  {
    name: "icon",
    type: "React.ReactNode",
    default: "undefined",
    description: "Optional iconography node injected inline prior to child labels. SVG strokes are self-managed.",
  },
];

export default function BadgeDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeVariant, setActiveVariant] = useState<BadgeVariantType>("modern");
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    playground: "preview",
    metadata: "preview",
  });

  const handleCopy = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const playgroundCode = `<Badge variant="${activeVariant}" size="md">
  Status Token
</Badge>`;

  const metadataCode = `<div className="flex gap-2">
  <Badge variant="minimal" icon={<IconGitBranch />}>main</Badge>
  <Badge variant="success" icon={<IconCircleCheck />}>Deployed</Badge>
  <Badge variant="destructive" icon={<IconAlertCircle />}>API Down</Badge>
</div>`;

  const rightBarItems = [
    { label: "Interactive Playground", href: "#playground" },
    { label: "Contextual Tags", href: "#metadata" },
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
        {/* Page Header */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Base Components", href: "/docs/components#base-components" },
              { label: componentMeta.title, href: "/docs/components/base-components/badges" },
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

        {/* 1. INTERACTIVE DESIGN PLAYGROUND */}
        <section id="playground" className="space-y-4 scroll-mt-20">
          <div className="flex flex-col gap-3">
            <div className="space-y-0.5">
              <h3 className="text-lg font-bold tracking-tight text-foreground">Token Sandbox</h3>
              <p className="text-xs text-muted-foreground">
                Toggle systemic variants to view custom tracking parameters and visual depth tokens live.
              </p>
            </div>

            {/* Design Tokens Selector Tab list */}
            <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border/60 bg-muted/20 p-1 text-xs max-w-fit">
              {(["modern", "minimal", "glass", "macos", "info", "success", "warning", "destructive"] as BadgeVariantType[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setActiveVariant(v)}
                  className={`rounded-md px-2.5 py-1 font-semibold capitalize transition-all ${
                    activeVariant === v
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
              <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs font-medium">
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, playground: "preview" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    (activeTabs["playground"] || "preview") === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, playground: "code" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeTabs["playground"] === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Code
                </button>
              </div>
              <button
                onClick={() => handleCopy("playground", playgroundCode)}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {copiedId === "playground" ? <><IconCheck className="h-3.5 w-3.5 text-emerald-500" /> Copied</> : <><IconCopy className="h-3.5 w-3.5" /> Copy Wrapper</>}
              </button>
            </div>

            <div className="flex min-h-[130px] items-center justify-center p-6 bg-gradient-to-br from-transparent to-muted/5">
              {(activeTabs["playground"] || "preview") === "preview" ? (
                <Badge variant={activeVariant}>Status Token</Badge>
              ) : (
                <pre className="w-full overflow-x-auto rounded-xl border border-border/60 bg-background/60 p-4 font-mono text-xs text-foreground">
                  <code>{playgroundCode}</code>
                </pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* 2. CONTEXTUAL METADATA CLUSTERS */}
        <section id="metadata" className="space-y-3 scroll-mt-20">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold tracking-tight text-foreground">Contextual Metadata Tags</h3>
            <p className="text-xs text-muted-foreground">
              Embed inner icon nodes smoothly to map clean branch metrics or operational errors.
            </p>
          </div>

          <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
              <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs font-medium">
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, metadata: "preview" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    (activeTabs["metadata"] || "preview") === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, metadata: "code" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeTabs["metadata"] === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Code
                </button>
              </div>
              <button onClick={() => handleCopy("metadata", metadataCode)} className="text-xs text-muted-foreground">{copiedId === "metadata" ? "Copied" : "Copy"}</button>
            </div>
            <div className="p-6 flex justify-center">
              {(activeTabs["metadata"] || "preview") === "preview" ? (
                <div className="flex flex-wrap gap-3 items-center justify-center">
                  <Badge variant="minimal" size="sm" icon={<IconGitBranch />}>
                    main
                  </Badge>
                  <Badge variant="success" size="md" icon={<IconCircleCheck />}>
                    Active
                  </Badge>
                  <Badge variant="destructive" size="lg" icon={<IconAlertCircle />}>
                    Overloaded
                  </Badge>
                </div>
              ) : (
                <pre className="w-full overflow-x-auto rounded-xl border border-border/60 bg-background/60 p-4 font-mono text-xs text-foreground"><code>{metadataCode}</code></pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* 3. API REFERENCE MATRIX */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconLayoutGrid stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">API Reference</h2>
              <p className="text-xs text-muted-foreground">Properties, size variables, and setup parameters applied to the Badge component.</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/60 bg-card/30">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/30 font-semibold text-muted-foreground">
                  <th className="p-3 w-[20%]">Property</th>
                  <th className="p-3 w-[32%]">Type</th>
                  <th className="p-3 w-[12%]">Default</th>
                  <th className="p-3 w-[36%]">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-medium">
                {badgeProperties.map((prop) => (
                  <tr key={prop.name} className="transition-colors hover:bg-secondary/10 align-top">
                    <td className="p-3 font-mono font-bold text-primary">{prop.name}</td>
                    <td className="p-3 font-mono text-purple-600 dark:text-purple-400 leading-relaxed">{prop.type}</td>
                    <td className="p-3 font-mono text-foreground/70">{prop.default}</td>
                    <td className="p-3 font-normal leading-relaxed text-muted-foreground">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <DocsAdjacentNav />

        <footer className="border-t border-border/30 pt-4 text-center text-xs text-muted-foreground/40">
          © 2026 Venti UI Labs. System architecture primitives.
        </footer>
      </main>
    </DocsPageFrame>
  );
}