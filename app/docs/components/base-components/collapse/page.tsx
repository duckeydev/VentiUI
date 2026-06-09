"use client";

import { useState } from "react";
import { IconCheck, IconCode, IconCopy, IconEye, IconExternalLink, IconSparkles } from "@tabler/icons-react";

import { Collapse } from "@/components/collapse"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Collapse",
  description: "A smooth wrapper component that toggles the visibility of content using hardware-accelerated height transitions.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/collapse.tsx",
};

const examples = [
  {
    id: "default-usage",
    title: "Basic Toggle",
    description: "Wrap any content with Layout logic to trigger visibility states with smooth height calculations.",
    code: `import { useState } from "react";
import { Collapse } from "@/components/collapse";

export function BasicToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        {isOpen ? "Close Collapse" : "Open Collapse"}
      </button>

      <Collapse isOpen={isOpen} className="mt-4">
        <div className="p-4 rounded-xl border border-border bg-card text-card-foreground text-sm leading-relaxed">
          This content expands down smoothly calculating its automatic layout height dynamically. No hardcoded heights needed.
        </div>
      </Collapse>
    </div>
  );
}`,
    render: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div className="w-full max-w-xl">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {isOpen ? "Close Collapse" : "Open Collapse"}
          </button>

          <Collapse isOpen={isOpen} className="mt-4">
            <div className="p-4 rounded-xl border border-border bg-card text-card-foreground text-sm leading-relaxed">
              This content expands down smoothly calculating its automatic layout height dynamically. No hardcoded heights needed.
            </div>
          </Collapse>
        </div>
      );
    },
  },
  {
    id: "no-opacity",
    title: "Without Opacity Fade",
    description: "Disable the internal opacity layer to solely rely on dimensional scaling.",
    code: `import { useState } from "react";
import { Collapse } from "@/components/collapse";

export function NoOpacityToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border border-border bg-secondary text-secondary-foreground rounded-lg text-sm font-medium transition-colors hover:bg-secondary/70"
      >
        Toggle Rigid Scroll
      </button>

      <Collapse isOpen={isOpen} animateOpacity={false} className="mt-4">
        <div className="p-4 rounded-xl border-l-2 border-primary bg-primary/5 text-foreground text-sm">
          Notice how the text never changes alpha opacity, resulting in a firm structural shift without ghostly artifacting.
        </div>
      </Collapse>
    </div>
  );
}`,
    render: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div className="w-full max-w-xl">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 border border-border bg-secondary text-secondary-foreground rounded-lg text-sm font-medium transition-colors hover:bg-secondary/70"
          >
            Toggle Rigid Scroll
          </button>

          <Collapse isOpen={isOpen} animateOpacity={false} className="mt-4">
            <div className="p-4 rounded-xl border-l-2 border-primary bg-primary/5 text-foreground text-sm">
              Notice how the text never changes alpha opacity, resulting in a firm structural shift without ghostly artifacting.
            </div>
          </Collapse>
        </div>
      );
    },
  },
  {
    id: "persist-dom",
    title: "Unmount Constraints",
    description: "Toggle whether elements stay mounted while collapsed. Helpful for states that shouldn't re-render fully (e.g. keeping video buffers or heavy canvas contexts loaded).",
    code: `import { useState } from "react";
import { Collapse } from "@/components/collapse";

export function KeepMounted() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border border-border bg-secondary text-secondary-foreground rounded-lg text-sm font-medium transition-colors hover:bg-secondary/70"
      >
        Toggle Persistent Node
      </button>

      <Collapse isOpen={isOpen} unmountOnExit={false} className="mt-4">
        <div className="p-4 rounded-xl border border-border bg-card text-muted-foreground text-sm border-dashed">
          This element remains actively appended structurally to the DOM even when fully collapsed.
        </div>
      </Collapse>
    </div>
  );
}`,
    render: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div className="w-full max-w-xl">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 border border-border bg-secondary text-secondary-foreground rounded-lg text-sm font-medium transition-colors hover:bg-secondary/70"
          >
            Toggle Persistent Node
          </button>

          <Collapse isOpen={isOpen} unmountOnExit={false} className="mt-4">
            <div className="p-4 rounded-xl border border-border bg-card text-muted-foreground text-sm border-dashed">
              This element remains actively appended structurally to the DOM even when fully collapsed.
            </div>
          </Collapse>
        </div>
      );
    },
  },
];

const apiProperties = [
  { name: "isOpen", type: "boolean", default: "required", description: "The active controlled state dictating if the container expands to logical height limit." },
  { name: "children", type: "React.ReactNode", default: "required", description: "Content body to be managed inside the collapse boundaries." },
  { name: "animateOpacity", type: "boolean", default: "true", description: "Whether to animate children alphas seamlessly linked with dimension alterations." },
  { name: "unmountOnExit", type: "boolean", default: "true", description: "Dictates whether closed structural sections are wholly ripped from React memory contexts to optimize layer rendering." },
  { name: "className", type: "string", default: "''", description: "Optional explicit standard string variable mutating base wrapper classes." },
];

const rightBarItems = [
  ...examples.map((example) => ({ label: example.title, href: `#${example.id}` })),
  { label: "Properties API", href: "#props-api" },
];

export default function CollapseDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    "default-usage": "preview",
    "no-opacity": "preview",
    "persist-dom": "preview",
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
              { label: componentMeta.title, href: "/docs/components/base-components/collapse" },
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
                Properties and declarative types configuration schema for the collapse component.
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