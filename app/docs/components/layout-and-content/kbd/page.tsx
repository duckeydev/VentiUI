"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconKeyboard,
  IconSparkles,
} from "@tabler/icons-react";

import { Kbd } from "@/components/kbd"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Keyboard Indicator Core",
  description: "A compact typographic container designed to represent physical keyboard inputs, accelerator shortcuts, and macro navigation paths.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/kbd.tsx",
};

const examples = [
  {
    id: "modifier-combinations",
    title: "System Macro Combinations",
    description: "Map modifiers cleanly alongside alpha tags to illustrate complex workspace key bindings.",
    code: `import { Kbd } from "@/components/kbd";

export function CommandBinding() {
  return (
    <div className="flex items-center gap-1">
      <Kbd modifier="cmd" />
      <Kbd>K</Kbd>
    </div>
  );
}`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-xl bg-card/40 backdrop-blur-sm text-left flex flex-col gap-4">
        <div className="flex items-center justify-between p-2 rounded-lg border border-border/30 bg-secondary/20 text-xs">
          <span className="text-muted-foreground font-medium">Global Command Finder</span>
          <div className="flex items-center gap-1">
            <Kbd modifier="cmd" />
            <Kbd>K</Kbd>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg border border-border/30 bg-secondary/20 text-xs">
          <span className="text-muted-foreground font-medium">Discard Draft State</span>
          <div className="flex items-center gap-1">
            <Kbd modifier="shift" />
            <Kbd modifier="alt" />
            <Kbd>D</Kbd>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg border border-border/30 bg-secondary/20 text-xs">
          <span className="text-muted-foreground font-medium">Submit Workspace Request</span>
          <div className="flex items-center gap-1">
            <Kbd modifier="enter">Enter</Kbd>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "visual-variants",
    title: "Mechanical Depths and Layout Sizes",
    description: "Adjust sizing scaling bounds or shift over to realistic raised variants to represent deep tactile keycaps.",
    code: `<div className="flex gap-2">
  <Kbd variant="raised" size="lg">⌘</Kbd>
  <Kbd variant="outline">K</Kbd>
</div>`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-xl bg-card/40 backdrop-blur-sm flex flex-wrap gap-6 items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <span className="text-[10px] font-mono opacity-40">size="sm"</span>
          <div className="flex gap-1"><Kbd size="sm" modifier="cmd" /><Kbd size="sm">P</Kbd></div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <span className="text-[10px] font-mono opacity-40">variant="raised"</span>
          <div className="flex gap-1"><Kbd variant="raised" modifier="ctrl" /><Kbd variant="raised">Tab</Kbd></div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <span className="text-[10px] font-mono opacity-40">variant="outline"</span>
          <div className="flex gap-1"><Kbd variant="outline" modifier="alt" /><Kbd variant="outline">F4</Kbd></div>
        </div>
      </div>
    ),
  },
];

const kbdProperties = [
  { name: "modifier", type: "'cmd' | 'shift' | 'alt' | 'ctrl' | 'enter' | 'caps'", default: "undefined", description: "Injects standardized structural notation character glyphs automatically into the text stream." },
  { name: "size", type: "'sm' | 'default' | 'lg'", default: "'default'", description: "Controls spatial volume tracking, line heights, and padding parameters." },
  { name: "variant", type: "'default' | 'raised' | 'outline'", default: "'default'", description: "Modifies border parameters and shadow offsets to construct mechanical 3D depth representations." },
];

export default function KbdDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    "modifier-combinations": "preview",
    "visual-variants": "preview",
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
      rightBar={<DocsOutline title="On this page" items={[...examples.map(e => ({ label: e.title, href: `#${e.id}` })), { label: "Kbd API Reference", href: "#props-api" }]} />}
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">
        {/* Core Header Content Area Section */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Data Display Primitives", href: "/docs/components#data-display" },
              { label: "Keyboard Component", href: "/docs/components/data-display/kbd" },
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

        {/* Live Rendering Workspace Active Sandbox Previews */}
        <div className="space-y-10">
          {examples.map((example) => {
            const currentTab = activeTabs[example.id] || "preview";

            return (
              <section key={example.id} id={example.id} className="space-y-3 scroll-mt-20">
                <div className="flex items-center gap-2">
                  <IconKeyboard className="h-4 w-4 text-primary" />
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

        {/* Configurations Parameters Specifications API Matrices Area */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconSparkles stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">Kbd API Reference</h2>
              <p className="text-xs text-muted-foreground">
                Properties parameters and layout options supported natively by the Kbd typographic primitive.
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
                  {kbdProperties.map((prop) => (
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
          © 2026 Venti UI Labs. Accelerator framework tokens.
        </footer>
      </main>
    </DocsPageFrame>
  );
}