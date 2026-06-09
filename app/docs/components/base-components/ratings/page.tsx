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
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Ratings Input",
  description: "An advanced, highly precise feedback primitive featuring seamless hover states, interactive half-increment mapping, and strict ARIA accessibility support.",
  version: "v1.1.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/ratings.tsx",
};

const examples = [
  {
    id: "interactive-demo",
    title: "Interactive Half-Increment Input",
    description: "The default interactive configuration with half-star targeting enabled. Hover over individual nodes to trigger smooth micro-animation scaling overrides.",
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
    description: "Enforce static feedback states by using the readOnly parameter flag. This setup strips cursor modifications and input listeners to safely map reviews within card headers.",
    code: `<div className="space-y-4">
  {/* Small Product Catalog Index Card */}
  <Ratings value={4.2} readOnly size="sm" />
  
  {/* Custom Indigo Tint Core Evaluation Mark */}
  <Ratings value={5} readOnly size="md" activeColorClass="text-indigo-500" />
</div>`,
    render: () => (
      <div className="p-5 border border-border/50 rounded-xl bg-card/40 space-y-4 text-left min-w-64 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between text-xs">
          <span className="text-muted-foreground font-medium">Catalog Index Value:</span>
          <Ratings value={4.5} readOnly size="sm" />
        </div>
        <div className="w-full flex items-center justify-between text-xs">
          <span className="text-muted-foreground font-medium">Premium User Status:</span>
          <Ratings value={5} readOnly size="md" activeColorClass="text-indigo-500 dark:text-indigo-400" />
        </div>
      </div>
    ),
  },
];

const apiProperties = [
  { name: "value", type: "number", default: "0", description: "The active fractional scalar progress value assigned onto the star grid system map." },
  { name: "max", type: "number", default: "5", description: "Sets the absolute total volume count of rendered interface node arrays." },
  { name: "readOnly", type: "boolean", default: "false", description: "Locks internal event pipelines down completely, optimizing the block strictly for telemetry mapping." },
  { name: "allowHalf", type: "boolean", default: "true", description: "Bifurcates hit tracking zones horizontally, enabling evaluation metrics based on half increments." },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Drives internal geometric height and width CSS parameters using clean localized inline variables." },
  { name: "activeColorClass", type: "string", default: "'text-amber-400'", description: "Utility tailwind color string mapping directly into active, fully loaded svg path fills." },
  { name: "onChange", type: "(value: number) => void", default: "undefined", description: "Callback hook capturing structural commits inside user interaction tracks." },
];

const rightBarItems = [
  ...examples.map((example) => ({ label: example.title, href: `#${example.id}` })),
  { label: "Properties API", href: "#props-api" },
];

export default function RatingsDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    "interactive-demo": "preview",
    "readonly-scales": "preview",
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
              { label: "Form Elements", href: "/docs/components#forms" },
              { label: "Ratings Input", href: "/docs/components/forms/ratings" },
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

        {/* Dynamic Sandbox Examples */}
        <div className="space-y-10">
          {examples.map((example) => {
            const currentTab = activeTabs[example.id] || "preview";

            return (
              <section key={example.id} id={example.id} className="space-y-3 scroll-mt-20">
                <div className="flex items-center gap-2">
                  <IconStar className="h-4 w-4 text-primary fill-primary/10" />
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

                  <div className="flex min-h-32 items-center justify-center bg-card/10 p-6 overflow-hidden">
                    <example.render />
                  </div>
                  
                  {currentTab === "code" && (
                    <div className="border-t border-border/40">
                      <pre className="w-full overflow-x-auto bg-muted/20 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  )}
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
                Properties parameters, styling parameters, and layout events assigned directly onto the core Ratings component.
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