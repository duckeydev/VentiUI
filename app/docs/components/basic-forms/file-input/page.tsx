"use client";

import React from "react";
import {
  IconClick,
  IconSparkles,
} from "@tabler/icons-react";

import { FileInput } from "@/components/file-input";
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
  title: "File Input",
  description:
    "Lets users upload files by dragging or browsing.",
  version: "v1.0.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/file-input.tsx",
};

const exampleCode = `import { FileInput } from "@/components/file-input";

export function UploadZone() {
  return (
    <FileInput
      label="Upload assets"
      description="PNG, JPG or PDF up to 10MB"
      multiple
      accept="image/*,.pdf"
      onChange={(files) => console.log(files)}
    />
  );
}`;

export default function FileInputDocsPage() {

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
            { label: "File Input Specification Matrix", href: "#props-api" },
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
                label: "File Input",
                href: "/docs/components/forms/file-input",
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
              description: "Drag files onto the area or click to browse for them.",
              code: exampleCode,
              render: () => (
                <div className="w-full max-w-sm flex flex-col items-center gap-4">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60 text-center">
                    Asset Upload Portal
                  </label>
                  <FileInput
                    label="Drop files here"
                    description="Images or PDFs up to 5MB"
                    multiple
                    accept="image/*,.pdf"
                  />
                </div>
              ),
            }}
          />
        </section>

        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                File Input API Reference
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
                        "Primary call-to-action text rendered inside the drop zone.",
                    },
                    {
                      name: "description",
                      type: "string",
                      default: "undefined",
                      description:
                        "Secondary helper text describing accepted file types or limits.",
                    },
                    {
                      name: "error",
                      type: "string",
                      default: "undefined",
                      description:
                        "Error message rendered below the drop zone with destructive styling.",
                    },
                    {
                      name: "multiple",
                      type: "boolean",
                      default: "false",
                      description:
                        "Allows selection of multiple files in the file dialog.",
                    },
                    {
                      name: "accept",
                      type: "string",
                      default: "undefined",
                      description:
                        "Comma-separated list of accepted MIME types or extensions.",
                    },
                    {
                      name: "onChange",
                      type: "(files: FileList | null) => void",
                      default: "undefined",
                      description:
                        "Callback triggered when files are selected via drop or dialog.",
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
