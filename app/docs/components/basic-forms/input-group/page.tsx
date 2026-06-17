"use client";

import React from "react";
import {
  IconMail,
  IconWorld,
} from "@tabler/icons-react";

import { Input } from "@/components/input";
import { InputGroup } from "@/components/input-group";
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
  title: "Input Group",
  description:
    "Wraps an input with icons or text addons on either side.",
  version: "v1.0.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/input-group.tsx",
};

const exampleCode = `import { InputGroup } from "@/components/input-group";
import { Input } from "@/components/input";
import { IconMail } from "@tabler/icons-react";

export function EmailField() {
  return (
    <InputGroup
      leftElement={<IconMail className="h-4 w-4" />}
      rightAddon=".com"
    >
      <Input placeholder="username" />
    </InputGroup>
  );
}`;
export default function InputGroupDocsPage() {

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
            { label: "Input Group Specification Matrix", href: "#props-api" },
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
                label: "Input Group",
                href: "/docs/components/forms/input-group",
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
              description: "Type in the field to see the input group with addons in action.",
              code: exampleCode,
              render: () => {
                const [url, setUrl] = React.useState("");
                return (
                  <div className="w-full max-w-xs flex flex-col items-center gap-4">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60 text-center">
                      Domain Registration
                    </label>
                    <InputGroup
                      leftAddon="https://"
                      rightAddon=".com"
                      leftElement={<IconWorld className="h-4 w-4" />}
                    >
                      <Input
                        placeholder="venti-ui"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </InputGroup>
                    <span className="text-[10px] text-muted-foreground/40 font-mono">
                      Constructed URL: https://{url || "venti-ui"}.com
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
                Input Group API Reference
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
                      name: "leftAddon",
                      type: "React.ReactNode",
                      default: "undefined",
                      description:
                        "Static text or element rendered inside the left border addon region.",
                    },
                    {
                      name: "rightAddon",
                      type: "React.ReactNode",
                      default: "undefined",
                      description:
                        "Static text or element rendered inside the right border addon region.",
                    },
                    {
                      name: "leftElement",
                      type: "React.ReactNode",
                      default: "undefined",
                      description:
                        "Decorative icon or element positioned inside the input left padding.",
                    },
                    {
                      name: "rightElement",
                      type: "React.ReactNode",
                      default: "undefined",
                      description:
                        "Decorative icon or element positioned inside the input right padding.",
                    },
                    {
                      name: "children",
                      type: "React.ReactElement",
                      default: "required",
                      description:
                        "Single Input element to be cloned and augmented with spacing classes.",
                    },
                    {
                      name: "className",
                      type: "string",
                      default: "undefined",
                      description:
                        "Additional utility classes merged into the flex wrapper.",
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
