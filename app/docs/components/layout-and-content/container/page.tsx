"use client";

import React from "react";
import { IconCode, IconCopy, IconEye, IconSparkles } from "@tabler/icons-react";
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

// Mock Container Component for localized Preview rendering inside the docs
const Container = ({ 
  children, 
  fluid = false, 
  clean = false,
  size = "lg",
  className = "" 
}: { 
  children: React.ReactNode; 
  fluid?: boolean; 
  clean?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}) => {
  const sizeClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
  };

  return (
    <div
      className={`w-full mx-auto ${clean ? "" : "px-4 sm:px-6 lg:px-8"} ${
        fluid ? "max-w-full" : sizeClasses[size]
      } ${className}`}
    >
      {children}
    </div>
  );
};

const componentMeta = {
  title: "Container",
  description: "The fundamental layout primitive used to center, pad, and constrain your application's viewport content safely across varying screen widths.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/container.tsx",
};

const examples = [
  {
    id: "default",
    title: "Default Container",
    description: "Centered, max-width bounded viewport wrapper with responsive horizontal side padding automatically injected.",
    code: `<Container size="lg">
  <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center text-sm font-medium text-primary">
    Responsive Fixed Content Box
  </div>
</Container>`,
    render: () => (
      <div className="w-full bg-muted/10 p-2 rounded-xl border border-border/40">
        <Container size="lg">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center text-sm font-medium text-primary">
            Centered Constrained Layout (Max-Width: 1024px)
          </div>
        </Container>
      </div>
    ),
  },
  {
    id: "fluid",
    title: "Fluid Width",
    description: "Spans across the entire viewport width edge-to-edge while maintaining standard structural horizontal edge gutters.",
    code: `<Container fluid>
  <div className="bg-secondary/40 border border-border/80 rounded-xl p-6 text-center text-sm font-medium text-foreground">
    Full-width Fluid Block
  </div>
</Container>`,
    render: () => (
      <div className="w-full bg-muted/10 p-2 rounded-xl border border-border/40">
        <Container fluid>
          <div className="bg-secondary/40 border border-border/80 rounded-xl p-6 text-center text-sm font-medium text-foreground">
            100% Width Edge-to-Edge Fluid Area
          </div>
        </Container>
      </div>
    ),
  },
  {
    id: "sizes",
    title: "Container Sizes",
    description: "Adjust spatial constraints easily via presets matching standard Tailwind media query break rings.",
    code: `<Container size="sm">Small Content</Container>
<Container size="xl">Extra Large Content</Container>`,
    render: () => (
      <div className="w-full space-y-3 bg-muted/10 p-4 rounded-xl border border-border/40">
        <Container size="sm">
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 text-center text-xs font-mono text-amber-600 dark:text-amber-400">
            size="sm" (Max: 640px)
          </div>
        </Container>
        <Container size="md">
          <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-3 text-center text-xs font-mono text-indigo-600 dark:text-indigo-400">
            size="md" (Max: 768px)
          </div>
        </Container>
        <Container size="xl">
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 text-center text-xs font-mono text-emerald-600 dark:text-emerald-400">
            size="xl" (Max: 1280px)
          </div>
        </Container>
      </div>
    ),
  },
  {
    id: "clean",
    title: "Clean Mode",
    description: "Strips out internal horizontal layout padding values so your children elements can map directly to structural grids cleanly.",
    code: `<Container clean size="lg">
  <div className="w-full bg-destructive/5 text-destructive border border-destructive/20 p-4 rounded-lg text-xs font-semibold">
    No Default Padding Applied
  </div>
</Container>`,
    render: () => (
      <div className="w-full bg-muted/10 p-2 rounded-xl border border-border/40">
        <Container clean size="lg">
          <div className="w-full bg-destructive/5 text-destructive border border-destructive/20 p-4 rounded-lg text-center text-xs font-semibold">
            Padding Removed (Flush Edge alignment)
          </div>
        </Container>
      </div>
    ),
  },
];

const apiProperties = [
  { name: "size", type: '"sm" | "md" | "lg" | "xl" | "2xl"', default: '"lg"', description: "Defines the max-width bounds configuration of the component layout block." },
  { name: "fluid", type: "boolean", default: "false", description: "Overrides preset sizing bounds to lock container layout to width: 100% infinitely." },
  { name: "clean", type: "boolean", default: "false", description: "Removes default responsive structural side gutters (px fields) from the layout primitive wrapper." },
  { name: "className", type: "string", default: '""', description: "Additional raw Tailwind or custom CSS fallback style hooks to attach onto the parent DOM element node." },
];

export default function ContainersDocsPage() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [activeTabs, setActiveTabs] = React.useState<Record<string, "preview" | "code">>({
    default: "preview",
    fluid: "preview",
    sizes: "preview",
    clean: "preview",
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
      leftBar={<aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-border/40"><DocsSidebar /></aside>}
      rightBar={<DocsOutline title="On this page" items={[...examples.map((e) => ({ label: e.title, href: `#${e.id}` })), { label: "Properties API", href: "#props-api" }]} />}
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">
        {/* Header Block */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs items={[{ label: "Docs", href: "/docs" }, { label: "Base Components", href: "/docs/components#base-components" }, { label: componentMeta.title, href: "/docs/components/base-components/container" }]} />

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">{componentMeta.title}</h1>
            <span className="mt-1.5 rounded bg-primary/10 border border-primary/20 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">{componentMeta.version}</span>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">{componentMeta.description}</p>
          <div className="flex items-center gap-3 pt-2">
            <a href={componentMeta.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"><IconCode className="h-3.5 w-3.5" /> View Source</a>
          </div>
        </div>

        {/* Mapped Live Previews */}
        <div className="space-y-14">
          {examples.map((example) => {
            const currentTab = activeTabs[example.id] || "preview";

            return (
              <section key={example.id} id={example.id} className="space-y-4 scroll-mt-20">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">{example.title}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{example.description}</p>
                </div>

                <DocsPanel className="overflow-hidden rounded-xl border border-border/50 bg-card/20">
                  <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-3 py-2">
                    <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-1 text-[11px] font-medium">
                      <button onClick={() => toggleTab(example.id, "preview")} className={`flex items-center gap-1 rounded-md px-3 py-1 transition-all ${currentTab === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}><IconEye className="h-3.5 w-3.5" /> Preview</button>
                      <button onClick={() => toggleTab(example.id, "code")} className={`flex items-center gap-1 rounded-md px-3 py-1 transition-all ${currentTab === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}><IconCode className="h-3.5 w-3.5" /> Code</button>
                    </div>
                    <button onClick={() => handleCopy(example.id, example.code)} className="cursor-pointer rounded-md border border-border/60 bg-card/60 p-2 text-muted-foreground transition-all hover:border-border hover:text-foreground">{copiedId === example.id ? <IconSparkles className="h-3.5 w-3.5 text-emerald-500" /> : <IconCopy className="h-3.5 w-3.5" />}</button>
                  </div>

                  <div className="flex min-h-[160px] items-center justify-center bg-card/5 p-6">
                    {currentTab === "preview" ? (
                      <example.render />
                    ) : (
                      <pre className="w-full overflow-x-auto rounded-lg border border-border/40 bg-muted/20 p-5 font-mono text-xs leading-relaxed text-muted-foreground"><code>{example.code}</code></pre>
                    )}
                  </div>
                </DocsPanel>
              </section>
            );
          })}
        </div>

        {/* API Reference Table */}
        <section id="props-api" className="space-y-6 scroll-mt-20 pt-4">
          <div className="flex items-center gap-3 border-b border-border/40 pb-4">
            <div className="rounded-xl border border-border/50 bg-primary/5 p-2 text-primary"><IconSparkles stroke={2.5} className="h-5 w-5" /></div>
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">API Reference</h2>
              <p className="text-sm text-muted-foreground">Comprehensive property configurations and custom utility definitions for Layout Containers.</p>
            </div>
          </div>

          <DocsPanel className="overflow-hidden border border-border/40 bg-card/5 rounded-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/50 font-semibold text-muted-foreground">
                    <th className="w-[20%] p-4 font-bold uppercase tracking-wider">Property</th>
                    <th className="w-[30%] p-4 font-bold uppercase tracking-wider">Type</th>
                    <th className="w-[15%] p-4 font-bold uppercase tracking-wider">Default</th>
                    <th className="w-[35%] p-4 font-bold uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 font-medium">
                  {apiProperties.map((prop) => (
                    <tr key={prop.name} className="transition-colors hover:bg-muted/30">
                      <td className="p-4 font-mono font-bold text-primary">{prop.name}</td>
                      <td className="p-4 font-mono text-[10px] text-muted-foreground leading-relaxed">{prop.type}</td>
                      <td className="p-4 font-mono text-foreground/70 italic">{prop.default}</td>
                      <td className="p-4 font-normal leading-relaxed text-muted-foreground">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DocsPanel>
        </section>

        {/* Adjacent Layout Pagination Links */}
        <DocsAdjacentNav />

        {/* Micro Footer Note */}
        <footer className="border-t border-border/30 pt-8 pb-10 text-center text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/40">
            © 2026 Venti UI Labs. Layout foundations primitive.
        </footer>
      </main>
    </DocsPageFrame>
  );
}