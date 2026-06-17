"use client";

import React from "react";
import {
  IconClick,
  IconSparkles,
} from "@tabler/icons-react";

import { Textarea } from "@/components/textarea";
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
  title: "Textarea",
  description:
    "A multi-line text input that can auto-resize.",
  version: "v1.0.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/textarea.tsx",
};

const exampleCode = `import { Textarea } from "@/components/textarea";

export function BioForm() {
  return (
    <Textarea
      placeholder="Tell us about yourself..."
      autoResize
      rows={4}
      error="Bio must be at least 50 characters."
    />
  );
}`;

export default function TextareaDocsPage() {

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
            { label: "Textarea Specification Matrix", href: "#props-api" },
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
              { label: "Textarea", href: "/docs/components/forms/textarea" },
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
              description: "Type into the area below to see auto-resize in action.",
              code: exampleCode,
              render: () => {
                const [bio, setBio] = React.useState("");
                return (
                  <div className="w-full max-w-xs flex flex-col items-center gap-4">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60 text-center">
                      Profile Biography
                    </label>
                    <Textarea
                      placeholder="Tell us about your project..."
                      autoResize
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      error={bio.length > 0 && bio.length < 20 ? "Bio is too short." : undefined}
                    />
                    <span className="text-[10px] text-muted-foreground/40 font-mono">
                      Characters: {bio.length}
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
                Textarea API Reference
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
                      name: "variant",
                      type: '"default" | "error"',
                      default: '"default"',
                      description:
                        "Visual validation state affecting border and focus ring colors.",
                    },
                    {
                      name: "error",
                      type: "string",
                      default: "undefined",
                      description:
                        "Error message rendered below the field with destructive styling.",
                    },
                    {
                      name: "autoResize",
                      type: "boolean",
                      default: "false",
                      description:
                        "Automatically adjusts height to match content scroll height on input.",
                    },
                    {
                      name: "rows",
                      type: "number",
                      default: "3",
                      description:
                        "Default visible row count for the textarea canvas.",
                    },
                    {
                      name: "className",
                      type: "string",
                      default: "undefined",
                      description:
                        "Additional utility classes merged into the root element.",
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
