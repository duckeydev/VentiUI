"use client";

import { useState } from "react";
import { IconCheck, IconCode, IconCopy, IconEye, IconExternalLink, IconSparkles } from "@tabler/icons-react";

import { Carousel } from "@/components/carousel"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Carousel",
  description: "A highly interactive, draggable carousel component built with Framer Motion natively for smooth hardware-accelerated transitions.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/carousel.tsx",
};

const examples = [
  {
    id: "default-usage",
    title: "Default Usage",
    description: "A simple swipeable carousel featuring indicators, arrow controls, and looping capabilities out of the box.",
    code: `<Carousel className="h-64 w-full">
  <div className="w-full h-full bg-blue-500/20 flex items-center justify-center text-xl font-bold text-blue-500">Slide 1</div>
  <div className="w-full h-full bg-emerald-500/20 flex items-center justify-center text-xl font-bold text-emerald-500">Slide 2</div>
  <div className="w-full h-full bg-rose-500/20 flex items-center justify-center text-xl font-bold text-rose-500">Slide 3</div>
</Carousel>`,
    render: () => (
      <div className="w-full max-w-xl">
        <Carousel className="h-64 w-full border border-border/50">
          <div className="w-full h-full bg-blue-500/10 flex items-center justify-center text-xl font-bold text-blue-500">Slide 1</div>
          <div className="w-full h-full bg-emerald-500/10 flex items-center justify-center text-xl font-bold text-emerald-500">Slide 2</div>
          <div className="w-full h-full bg-rose-500/10 flex items-center justify-center text-xl font-bold text-rose-500">Slide 3</div>
        </Carousel>
      </div>
    ),
  },
  {
    id: "autoplay",
    title: "Autoplay",
    description: "Slide automatically changes based on the configured interval. Hovering the carousel pauses autoplay gracefully.",
    code: `<Carousel autoPlay interval={3000} className="h-48 w-full">
  <div className="w-full h-full bg-purple-500/20 flex items-center justify-center text-xl font-bold text-purple-500">Fast 1</div>
  <div className="w-full h-full bg-orange-500/20 flex items-center justify-center text-xl font-bold text-orange-500">Fast 2</div>
  <div className="w-full h-full bg-yellow-500/20 flex items-center justify-center text-xl font-bold text-yellow-500">Fast 3</div>
</Carousel>`,
    render: () => (
      <div className="w-full max-w-xl">
        <Carousel autoPlay interval={3000} className="h-48 w-full border border-border/50">
          <div className="w-full h-full bg-purple-500/10 flex items-center justify-center text-xl font-bold text-purple-500">Fast 1</div>
          <div className="w-full h-full bg-orange-500/10 flex items-center justify-center text-xl font-bold text-orange-500">Fast 2</div>
          <div className="w-full h-full bg-yellow-500/10 flex items-center justify-center text-xl font-bold text-yellow-500">Fast 3</div>
        </Carousel>
      </div>
    ),
  },
  {
    id: "image-gallery",
    title: "Image Gallery",
    description: "A perfect choice for presenting a set of static assets using normal image tags or complex UI elements.",
    code: `<Carousel className="h-72 w-full" showIndicators={false} loop={false}>
  <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-300 font-medium">Image 1</div>
  <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-300 font-medium">Image 2</div>
  <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-300 font-medium">Image 3</div>
</Carousel>`,
    render: () => (
      <div className="w-full max-w-xl">
        <Carousel className="h-72 w-full border border-border/50" showIndicators={false} loop={false}>
          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-300 font-medium">Image 1</div>
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-300 font-medium">Image 2</div>
          <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-300 font-medium">Image 3</div>
        </Carousel>
      </div>
    ),
  },
];

const apiProperties = [
  { name: "children", type: "React.ReactNode", default: "undefined", description: "The content (slides) to be rendered. Best practice is utilizing an array of structural node elements." },
  { name: "autoPlay", type: "boolean", default: "false", description: "Enables cyclical automated transitions without user input when unhovered." },
  { name: "interval", type: "number", default: "5000", description: "Specifies the timeout metric between slides via milliseconds." },
  { name: "showControls", type: "boolean", default: "true", description: "Displays dynamic Next/Previous overlapping directional float actions on hover state." },
  { name: "showIndicators", type: "boolean", default: "true", description: "Injects page state pill markings at the bottom horizontal threshold layout." },
  { name: "loop", type: "boolean", default: "true", description: "Controls whether scrolling past the final element index rotates back to initialization." },
  { name: "className", type: "string", default: "''", description: "A standard string vector parsed by structural layouts overriding element bounds." },
];

const rightBarItems = [
  ...examples.map((example) => ({ label: example.title, href: `#${example.id}` })),
  { label: "Properties API", href: "#props-api" },
];

export default function CarouselDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    "default-usage": "preview",
    "autoplay": "preview",
    "image-gallery": "preview",
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
              { label: componentMeta.title, href: "/docs/components/base-components/carousel" },
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
                Properties, declarative types, and configuration schema for the carousel.
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