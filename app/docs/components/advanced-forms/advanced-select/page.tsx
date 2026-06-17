"use client";

import React from "react";

import { AdvancedSelect } from "@/components/advanced-select";
import { TableColumn, Table } from "@/components/table"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "Advanced Select Primitive",
  description: "A searchable select with keyboard navigation.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/advanced-select.tsx",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
                    { name: "options", type: "SelectOption[]", default: "required", description: "Array of selection entities matching value, label, and alternative disabled tracks." },
                    { name: "value", type: "string", default: "undefined", description: "The active tracking index matching a value parameter within the options array." },
                    { name: "placeholder", type: "string", default: "'Select option...'", description: "The typography fallback overlay displayed when the active value state resolves as empty." },
                    { name: "searchable", type: "boolean", default: "false", description: "Mounts an inline input channel filtering target options through keyword metrics in real-time." },
                    { name: "clearable", type: "boolean", default: "false", description: "Displays a contextual inline close vector to drop active selections back to zero states." },
                  ];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

const frameworkOptions = [
  { value: "next", label: "Next.js Web Framework" },
  { value: "react", label: "React Runtime Engine" },
  { value: "vue", label: "Vue Framework Module" },
  { value: "svelte", label: "Svelte Compiler Core" },
  { value: "astro", label: "Astro Static Engine", disabled: true },
];

export default function AdvancedSelectDocsPage() {
  const exampleCode = `import { useState } from "react";
import { AdvancedSelect } from "@/components/advanced-select";

const frameworks = [
  { value: "next", label: "Next.js Web Framework" },
  { value: "react", label: "React Runtime Engine" },
  { value: "astro", label: "Astro Static Engine", disabled: true },
];

export function SelectorHub() {
  const [value, setValue] = useState("");

  return (
    <AdvancedSelect
      options={frameworks}
      value={value}
      onChange={setValue}
      placeholder="Choose software pipeline..."
      searchable
      clearable
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
            { label: "Interactive Configuration", href: "#interactive-demo" },
            { label: "Select API Reference", href: "#props-api" },
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
              { label: "Advanced Select", href: "/docs/components/forms/advanced-select" },
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

          <p className="text-base leading-relaxed text-muted-foreground">{componentMeta.description}</p>

        </div>

        <section id="interactive-demo" className="space-y-3 scroll-mt-20">
          <CodeBlock
            example={{
              id: "interactive-demo",
              title: "Interactive Implementation",
              description: "Use the search box to filter options.",
              code: exampleCode,
              render: () => {
                const [selectedValue, setSelectedValue] = React.useState("");
                return (
                  <div className="w-full max-w-xs space-y-3">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60">
                      Active Environment Track
                    </label>
                    <AdvancedSelect
                      options={frameworkOptions}
                      value={selectedValue}
                      onChange={setSelectedValue}
                      placeholder="Choose software engine..."
                      searchable
                      clearable
                    />
                    <div className="pt-2 text-[10px] font-mono text-muted-foreground/50">
                      Selected Value Key: <span className="text-primary font-bold">{selectedValue || "NULL_EMPTY"}</span>
                    </div>
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
                Properties API
              </h2>
              <p className="text-xs text-muted-foreground">
                All available props for this component.
              </p>
            </div>
          </div>

          <DocsPanel className="overflow-hidden rounded-xl">
            <Table<ApiProperty>
              variant="modern"
              columns={columns}
              data={apiProperties}
              rowKey={(prop) => prop.name}
            />
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