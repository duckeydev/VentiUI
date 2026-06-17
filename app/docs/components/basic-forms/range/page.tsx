"use client";

import React from "react";

import { Range } from "@/components/range";
import {
  DocsBreadcrumbs,
  DocsOutline,
  DocsPageFrame,
  DocsPanel,
} from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "Range Slider",
  description:
    "A slider for selecting a value within a range.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/range.tsx",
};

const exampleCode = `import { Range } from "@/components/range";

export function VolumeControl() {
  return (
    <Range
      label="Volume"
      min={0}
      max={100}
      step={1}
      showValue
      defaultValue={50}
      onChange={(value) => console.log(value)}
    />
  );
}`;

export default function RangeDocsPage() {

  return (
    <DocsPageFrame
      leftBar={
        <aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-border/40">
          <DocsSidebar />
        </aside>
      }
      rightBar={
        <DocsOutline
          title="On this page"
          items={[
            {
              label: "Interactive Component Layout",
              href: "#interactive-demo",
            },
            { label: "Range Specification Matrix", href: "#props-api" },
          ]}
        />
      }
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Form Primitives", href: "/docs/components#forms" },
              { label: "Range Slider", href: "/docs/components/forms/range" },
            ]}
          />
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
              {componentMeta.title}
            </h1>
            <Badge variant="info">
              {componentMeta.version}
            </Badge>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            {componentMeta.description}
          </p>

        </div>

        <section id="interactive-demo" className="space-y-3 scroll-mt-20">
          <CodeBlock
            example={{
              id: "interactive-demo",
              title: "Interactive Implementation",
              description: "Drag the slider to see the value change in real time.",
              code: exampleCode,
              render: () => {
                const [volume, setVolume] = React.useState(45);
                return (
                  <div className="w-full max-w-xs flex flex-col items-center gap-4">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60 text-center">
                      Audio Mixer
                    </label>
                    <Range
                      label="Master Volume"
                      min={0}
                      max={100}
                      step={1}
                      value={volume}
                      onChange={setVolume}
                      showValue
                    />
                    <span className="text-[10px] text-muted-foreground/40 font-mono">
                      Current dB: {Math.round((volume / 100) * 120 - 60)} dB
                    </span>
                  </div>
                );
              },
            }}
          />
        </section>

        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Range API Reference
              </h2>
              <p className="text-xs text-muted-foreground">
                All available props for this component.
              </p>
            </div>
          </div>

          <DocsPanel className="bg-card/30 rounded-xl border border-border/60">
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
                  {[
                    {
                      name: "label",
                      type: "string",
                      default: "undefined",
                      description: "Label rendered above the slider track.",
                    },
                    {
                      name: "showValue",
                      type: "boolean",
                      default: "false",
                      description:
                        "Renders a numeric badge showing the current slider value.",
                    },
                    {
                      name: "min",
                      type: "number",
                      default: "0",
                      description:
                        "Minimum allowed value for the slider range.",
                    },
                    {
                      name: "max",
                      type: "number",
                      default: "100",
                      description:
                        "Maximum allowed value for the slider range.",
                    },
                    {
                      name: "step",
                      type: "number",
                      default: "1",
                      description:
                        "Discrete increment between valid slider values.",
                    },
                    {
                      name: "onChange",
                      type: "(value: number) => void",
                      default: "undefined",
                      description:
                        "Callback triggered when the slider value changes.",
                    },
                    {
                      name: "error",
                      type: "string",
                      default: "undefined",
                      description:
                        "Error message rendered below the slider with destructive styling.",
                    },
                  ].map((prop) => (
                    <tr
                      key={prop.name}
                      className="transition-colors hover:bg-secondary/20 vertical-align-top"
                    >
                      <td className="p-3 font-mono font-bold text-primary">
                        {prop.name}
                      </td>
                      <td className="p-3 font-mono text-purple-600 dark:text-purple-400 leading-relaxed">
                        {prop.type}
                      </td>
                      <td className="p-3 font-mono text-foreground/70">
                        {prop.default}
                      </td>
                      <td className="p-3 font-normal leading-relaxed text-muted-foreground">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DocsPanel>
        </section>

        <DocsAdjacentNav />

        <footer className="border-t border-border/30 pt-4 text-center text-xs text-muted-foreground/40">
          © 2026 Venti UI Labs. UI made right.
        </footer>
      </main>
    </DocsPageFrame>
  );
}
