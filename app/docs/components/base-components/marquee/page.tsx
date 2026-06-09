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
  IconBrandTypescript
} from "@tabler/icons-react";

import { Marquee } from "@/components/marquee"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Marquee",
  description: "A hardware-accelerated infinite horizontal rolling container track. Optimized with CSS animations and composited layers for zero-jank brand placement and data updates.",
  version: "v1.2.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/marquee.tsx",
};

const examples = [
  {
    id: "logo-cloud",
    title: "Brand Logo Cloud",
    description: "The classic enterprise landing banner layout. Leverages soft side edge transparencies to roll brand marks into production view ports.",
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
          <div className="flex items-center gap-2 font-semibold text-sm text-muted-foreground/80 bg-secondary/50 px-4 py-2 rounded-xl border border-border/40"><IconBrandNextjs className="h-4 w-4 text-foreground" /> Next.js</div>
          <div className="flex items-center gap-2 font-semibold text-sm text-muted-foreground/80 bg-secondary/50 px-4 py-2 rounded-xl border border-border/40"><IconBrandTailwind className="h-4 w-4 text-sky-400" /> Tailwind CSS</div>
          <div className="flex items-center gap-2 font-semibold text-sm text-muted-foreground/80 bg-secondary/50 px-4 py-2 rounded-xl border border-border/40"><IconBrandFramer className="h-4 w-4 text-pink-400" /> Framer Motion</div>
          <div className="flex items-center gap-2 font-semibold text-sm text-muted-foreground/80 bg-secondary/50 px-4 py-2 rounded-xl border border-border/40"><IconBrandReact className="h-4 w-4 text-blue-400" /> React Framework</div>
          <div className="flex items-center gap-2 font-semibold text-sm text-muted-foreground/80 bg-secondary/50 px-4 py-2 rounded-xl border border-border/40"><IconBrandTypescript className="h-4 w-4 text-blue-500" /> TypeScript</div>
        </Marquee>
      </div>
    ),
  },
  {
    id: "data-ticker",
    title: "Reverse Data Metric Feed",
    description: "Sets the scrolling speed coefficients into high overdrive while reversing the rolling vectors to capture server metrics dynamically.",
    code: `<Marquee speed={18} direction="right" fadeEdges={false}>
  <div className="text-xs font-mono font-bold text-emerald-500 flex items-center gap-1"><span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"/> NODE_ALPHA: OK [2ms]</div>
  <div className="text-xs font-mono font-bold text-emerald-500 flex items-center gap-1"><span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"/> DIST_METRIC_BETA: SYNC [99.4%]</div>
  <div className="text-xs font-mono font-bold text-amber-500 flex items-center gap-1"><span className="h-1.5 w-1.5 bg-amber-500 rounded-full"/> REGION_PROXY_GAMMA: COMPACTING</div>
</Marquee>`,
    render: () => (
      <div className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 overflow-hidden">
        <Marquee speed={18} direction="right" fadeEdges={false}>
          <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-md border border-neutral-800"><span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping"/> NODE_ALPHA: ONLINE [2ms]</div>
          <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-md border border-neutral-800"><span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping"/> DIST_METRIC_BETA: SYNC [99.8%]</div>
          <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-md border border-neutral-800"><span className="h-1.5 w-1.5 bg-amber-400 rounded-full" /> REGION_PROXY_GAMMA: FLUSHING</div>
          <div className="text-xs font-mono font-bold text-rose-400 flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-md border border-neutral-800"><span className="h-1.5 w-1.5 bg-rose-400 rounded-full" /> EDGE_ROUTER_DELTA: BLOCKING</div>
        </Marquee>
      </div>
    ),
  },
];

const apiProperties = [
  { name: "speed", type: "number", default: "30", description: "The time duration footprint (expressed cleanly in total seconds) required to cycle one loop iteration." },
  { name: "pauseOnHover", type: "boolean", default: "true", description: "Intercepts cursor bounds, stalling out the transform metrics cleanly without disrupting alignment parameters." },
  { name: "direction", type: "'left' | 'right'", default: "'left'", description: "Dictates the absolute horizontal vector coordinate path orientation mapping." },
  { name: "fadeEdges", type: "boolean", default: "true", description: "Appends a native WebKit CSS alpha boundary fade mask across terminal track boundaries." },
];

const rightBarItems = [
  ...examples.map((example) => ({ label: example.title, href: `#${example.id}` })),
  { label: "Properties API", href: "#props-api" },
];

export default function MarqueeDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    "logo-cloud": "preview",
    "data-ticker": "preview",
  });

  const handleCopy = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
        {/* Workspace Documentation Header Area */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Advanced Effects", href: "/docs/components#effects" },
              { label: componentMeta.title, href: "/docs/components/effects/marquee" },
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
                  <IconActivity className="h-4 w-4 text-primary" />
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{example.title}</h3>
                </div>
                <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">{example.description}</p>

                <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
                  <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
                    <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs font-medium">
                      <button
                        onClick={() => setActiveTabs(p => ({ ...p, [example.id]: "preview" }))}
                        className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${currentTab === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <IconEye className="h-3.5 w-3.5" /> Preview
                      </button>
                      <button
                        onClick={() => setActiveTabs(p => ({ ...p, [example.id]: "code" }))}
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

                  <div className="flex min-h-35 items-center justify-center bg-card/10 p-6 overflow-hidden">
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

        {/* Global Properties Data Matrix */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconSparkles stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">API Reference</h2>
              <p className="text-xs text-muted-foreground">
                Properties parameters and configuration flags accepted by the rolling infinite Marquee system layout track.
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