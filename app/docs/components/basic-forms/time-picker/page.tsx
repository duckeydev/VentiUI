"use client";

import React from "react";
import {
  IconClick,
  IconSparkles,
} from "@tabler/icons-react";

import { TimePicker } from "@/components/time-picker";
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
  title: "Time Picker",
  description:
    "Lets users pick a time using the native time selector.",
  version: "v1.0.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/time-picker.tsx",
};

export default function TimePickerDocsPage() {
  const exampleCode = `import { TimePicker } from "@/components/time-picker";

export function ScheduleForm() {
  return (
    <TimePicker
      label="Meeting Time"
      defaultValue="09:00"
      use12Hours
      onChange={(value) => console.log(value)}
    />
  );
}`;

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
            { label: "Time Picker Specification Matrix", href: "#props-api" },
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
              {
                label: "Time Picker",
                href: "/docs/components/forms/time-picker",
              },
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
              description: "Click the input to open the time picker and select a time.",
              code: exampleCode,
              render: () => {
                const [time, setTime] = React.useState("14:30");
                return (
                  <div className="w-full max-w-xs flex flex-col items-center gap-4">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60 text-center">
                      Schedule Configuration
                    </label>
                    <TimePicker
                      label="Meeting Start Time"
                      value={time}
                      onChange={setTime}
                    />
                    <span className="text-[10px] text-muted-foreground/40 font-mono">
                      Selected Time: {time || "--:--"}
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
                Time Picker API Reference
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
                      description:
                        "Label rendered above the time input control.",
                    },
                    {
                      name: "description",
                      type: "string",
                      default: "undefined",
                      description:
                        "Secondary helper text rendered below the label.",
                    },
                    {
                      name: "value",
                      type: "string",
                      default: "undefined",
                      description: "Controlled time value in HH:MM format.",
                    },
                    {
                      name: "defaultValue",
                      type: "string",
                      default: '""',
                      description:
                        "Uncontrolled initial time value on first render.",
                    },
                    {
                      name: "onChange",
                      type: "(value: string) => void",
                      default: "undefined",
                      description:
                        "Callback triggered when the time value changes.",
                    },
                    {
                      name: "use12Hours",
                      type: "boolean",
                      default: "false",
                      description:
                        "Enables 12-hour AM/PM format in the native picker.",
                    },
                    {
                      name: "error",
                      type: "string",
                      default: "undefined",
                      description:
                        "Error message rendered below the control with destructive styling.",
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
