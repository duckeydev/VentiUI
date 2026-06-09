"use client";

import { useState } from "react";
import { IconCheck, IconCode, IconCopy, IconEye, IconExternalLink, IconSparkles } from "@tabler/icons-react";

import { DatePicker } from "@/components/datepicker"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "DatePicker",
  description: "A fast, dependency-free logical date selector implementing responsive drop-down popovers and highly accurate grid mappings.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/datepicker.tsx",
};

const examples = [
  {
    id: "default-usage",
    title: "Standard Selector",
    description: "Initialize the default selector. It maps inherently to an absolute pop-down module utilizing native frame motion boundaries.",
    code: `import { useState } from "react";
import { DatePicker } from "@/components/datepicker";

export function BasicDate() {
  const [date, setDate] = useState<Date>();

  return (
    <DatePicker 
      value={date} 
      onChange={setDate} 
      placeholder="Select launch date..."
    />
  );
}`,
    render: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [date, setDate] = useState<Date | undefined>();
      return (
        <div className="w-full flex justify-center py-10">
          <DatePicker 
            value={date} 
            onChange={setDate} 
            placeholder="Select launch date..."
          />
        </div>
      );
    },
  },
  {
    id: "inline-calendar",
    title: "Inline View Container",
    description: "Render the matrix immediately inside standard DOM hierarchy utilizing the inline flag, bypassing input triggers entire.",
    code: `import { useState } from "react";
import { DatePicker } from "@/components/datepicker";

export function InlineDate() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="p-4 rounded-xl border border-border/50 bg-secondary/20 inline-block">
      <DatePicker 
        inline
        value={date} 
        onChange={setDate} 
      />
    </div>
  );
}`,
    render: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [date, setDate] = useState<Date | undefined>();
      return (
        <div className="w-full flex justify-center">
          <div className="p-4 rounded-xl border border-border/50 bg-secondary/20 inline-block shadow-sm">
            <DatePicker 
              inline
              value={date} 
              onChange={setDate} 
            />
          </div>
        </div>
      );
    },
  },
  {
    id: "min-max-bounds",
    title: "Min / Max Range Bounds",
    description: "Restrict date availability safely by configuring logical limits blocking specific date array structures mathematically.",
    code: `import { useState } from "react";
import { DatePicker } from "@/components/datepicker";

export function BoundedDate() {
  const [date, setDate] = useState<Date>();
  
  // Set boundaries from today up to exactly 14 days outwards.
  const today = new Date();
  const maxLimit = new Date();
  maxLimit.setDate(today.getDate() + 14);

  return (
    <DatePicker 
      value={date} 
      onChange={setDate} 
      minDate={today}
      maxDate={maxLimit}
      placeholder="Select delivery window..."
    />
  );
}`,
    render: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [date, setDate] = useState<Date | undefined>();
      
      const today = new Date();
      const maxLimit = new Date();
      maxLimit.setDate(today.getDate() + 14);

      return (
        <div className="w-full flex justify-center py-10">
          <DatePicker 
            value={date} 
            onChange={setDate} 
            minDate={today}
            maxDate={maxLimit}
            placeholder="Select delivery window..."
          />
        </div>
      );
    },
  },
];

const apiProperties = [
  { name: "value", type: "Date", default: "undefined", description: "Currently active date object controlling standard internal selection matrix states." },
  { name: "onChange", type: "(date: Date) => void", default: "undefined", description: "Standard execution trigger hook fired immediately upon calendar integer interaction." },
  { name: "minDate", type: "Date", default: "undefined", description: "Enforces a mathematical floor preventing selection vectors before defined logical timestamp limits." },
  { name: "maxDate", type: "Date", default: "undefined", description: "Enforces a mathematical ceiling disabling interface inputs targeting out-of-bounds ranges." },
  { name: "inline", type: "boolean", default: "false", description: "Forces structural component rendering into relative block grids voiding Popover input mechanics." },
  { name: "placeholder", type: "string", default: "'Pick a date'", description: "Dictates input fallback parameters if undefined initialization state occurs." },
  { name: "formatDate", type: "(date: Date) => string", default: "undefined", description: "Overrides default English timestamp formatting with direct string output mapping." },
  { name: "className", type: "string", default: "''", description: "Appends extra CSS variables immediately onto outer hierarchy wrapper tags." },
];

const rightBarItems = [
  ...examples.map((example) => ({ label: example.title, href: `#${example.id}` })),
  { label: "Properties API", href: "#props-api" },
];

export default function DatePickerDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    "default-usage": "preview",
    "inline-calendar": "preview",
    "min-max-bounds": "preview",
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
              { label: componentMeta.title, href: "/docs/components/base-components/datepicker" },
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

                  <div className="flex min-h-35 flex-col items-center justify-center bg-card/10 p-6 overflow-visible">
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
                Properties, limits syntax, and declarative layout primitives configuration schema for the date picking system.
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