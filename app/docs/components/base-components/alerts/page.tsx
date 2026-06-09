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

import { Alert } from "@/components/alert"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Alert",
  description: "An accessible context banner used to draw immediate attention to system states, operational changes, warnings, or action results with native micro-exit animations.",
  version: "v1.2.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/alert.tsx",
};

const examples = [
  {
    id: "variants",
    title: "Variants",
    description: "Map visual accents cleanly onto your layout flow to denote neutral metrics, success confirmations, warnings, or critical application structural failures.",
    code: `<div className="space-y-3 w-full">
  <Alert title="Deployment Update" description="A new deployment iteration was initialized automatically by your web webhook provider pipeline." />
  <Alert variant="info" title="Beta Feature Configured" description="Hardware acceleration metrics can now be tracked in the infrastructure metrics panel tabs." />
  <Alert variant="success" title="Payment Processed" description="Your receipt and premium seat upgrade licenses have been synchronized onto your user record profile." />
  <Alert variant="warning" title="Subscription Expiring" description="Your payment instrument will expire in 48 hours. Please update your billing methods immediately." />
  <Alert variant="destructive" title="Connection Timed Out" description="The edge router cluster failed to return a proper heartbeat payload response. Retrying setup protocol sequence." />
</div>`,
    render: () => (
      <div className="space-y-3 w-full">
        <Alert 
          title="Deployment Update" 
          description="A new deployment iteration was initialized automatically by your web webhook provider pipeline." 
        />
        <Alert 
          variant="info" 
          title="Beta Feature Configured" 
          description="Hardware acceleration metrics can now be tracked in the infrastructure metrics panel tabs." 
        />
        <Alert 
          variant="success" 
          title="Payment Processed" 
          description="Your receipt and premium seat upgrade licenses have been synchronized onto your user record profile." 
        />
        <Alert 
          variant="warning" 
          title="Subscription Expiring" 
          description="Your payment instrument will expire in 48 hours. Please update your billing methods immediately." 
        />
        <Alert 
          variant="destructive" 
          title="Connection Timed Out" 
          description="The edge router cluster failed to return a proper heartbeat payload response. Retrying setup protocol sequence." 
        />
      </div>
    ),
  },
  {
    id: "dismissible",
    title: "Dismissible Exit Animations",
    description: "Manage programmatic element teardowns cleanly using native CSS transitions. Choose between soft fades, horizontal structural shifts, or immediate unmounting.",
    code: `<div className="space-y-3 w-full">
  <Alert 
    exitAnimation="fade-out" 
    title="Fade Out Exit" 
    description="Softly dissolves opacity layers into background vectors over a 300ms timeline step." 
    onClose={() => console.log('faded')} 
  />
  <Alert 
    exitAnimation="slide-out-right" 
    title="Slide Right Exit" 
    description="Transforms horizontal layout metrics to fly off the right side edge during unmounting." 
    onClose={() => console.log('slid-right')} 
  />
  <Alert 
    exitAnimation="slide-out-left" 
    title="Slide Left Exit" 
    description="Transforms horizontal layout metrics to fly off the left side edge during unmounting." 
    onClose={() => console.log('slid-left')} 
  />
</div>`,
    render: () => {
      const [resetKey, setResetKey] = useState(0);

      return (
        <div className="w-full space-y-4">
          <div key={resetKey} className="space-y-3 w-full">
            <Alert 
              exitAnimation="fade-out" 
              title="Fade Out Exit" 
              description="Softly dissolves opacity layers into background vectors over a 300ms timeline step." 
              onClose={() => console.log("Fade close handled")} 
            />
            <Alert 
              exitAnimation="slide-out-right" 
              title="Slide Right Exit" 
              description="Transforms horizontal layout metrics to fly off the right side edge during unmounting." 
              onClose={() => console.log("Slide right close handled")} 
            />
            <Alert 
              exitAnimation="slide-out-left" 
              title="Slide Left Exit" 
              description="Transforms horizontal layout metrics to fly off the left side edge during unmounting." 
              onClose={() => console.log("Slide left close handled")} 
            />
            <Alert 
              exitAnimation="none" 
              title="Immediate Unmount" 
              description="Disappears instantly from the active node tree layout sequence with zero processing delays." 
              onClose={() => console.log("None close handled")} 
            />
          </div>
          <div className="flex justify-center pt-2">
            <button 
              onClick={() => setResetKey(prev => prev + 1)}
              className="px-3 py-1.5 rounded-md border border-border bg-secondary/50 text-xs font-semibold text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              Reset Exit Animation Previews
            </button>
          </div>
        </div>
      );
    },
  },
  {
    id: "custom-icon",
    title: "Custom Icon Overrides",
    description: "Completely substitute the built-in automated semantic vector graphics with any customized design node blueprint.",
    code: `<Alert 
  icon={<IconSparkles className="h-5 w-5 text-purple-500" />}
  title="AI Optimization Complete"
  description="Vector index embedding structures have been clustered and fully cached to local database targets."
/>`,
    render: () => (
      <div className="w-full">
        <Alert 
          icon={<IconSparkles className="h-5 w-5 text-purple-500" />}
          title="AI Optimization Complete"
          description="Vector index embedding structures have been clustered and fully cached to local database targets."
        />
      </div>
    ),
  },
];

const apiProperties = [
  { name: "variant", type: "'default' | 'info' | 'success' | 'warning' | 'destructive'", default: "'default'", description: "Dictates structural background color combinations and shifts accessible live-region roles dynamically." },
  { name: "exitAnimation", type: "'fade-out' | 'slide-out-right' | 'slide-out-left' | 'none'", default: "'fade-out'", description: "Configures the specific unmounting visual transition path handled when executing close triggers." },
  { name: "title", type: "string", default: "undefined", description: "Bold header text emphasizing the primary announcement statement of the alert." },
  { name: "description", type: "string", default: "undefined", description: "Granular descriptive prose text providing secondary context, warnings, or next steps." },
  { name: "icon", type: "React.ReactNode", default: "Semantic Icon Base", description: "Overrides default built-in SVG vector elements with a custom asset blueprint." },
  { name: "onClose", type: "() => void", default: "undefined", description: "Appending a functional callback cleanly structures an absolute accessible dismiss button layout." },
  { name: "closeLabel", type: "string", default: "'Dismiss alert'", description: "Configures explicit hidden labels exposed to screen reader nodes identifying the target dismiss button action." },
];

const rightBarItems = [
  ...examples.map((example) => ({ label: example.title, href: `#${example.id}` })),
  { label: "Properties API", href: "#props-api" },
];

export default function ComponentDetailPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    variants: "preview",
    dismissible: "preview",
    "custom-icon": "preview",
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
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Base Components", href: "/docs/components#base-components" },
              { label: componentMeta.title, href: "/docs/components/base-components/alerts" },
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

        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconSparkles stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">API Reference</h2>
              <p className="text-xs text-muted-foreground">
                Properties, custom types, and default configurations mapped onto the alert container element.
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