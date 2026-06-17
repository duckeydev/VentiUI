"use client";

import React from "react";

import { ComboBox } from "@/components/combo-box";
import { TableColumn, Table } from "@/components/table"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "Multi-Select ComboBox",
  description: "A multi-select input with search and tags.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/combo-box.tsx",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
                    { name: "options", type: "ComboBoxOption[]", default: "required", description: "Array list of key/value string pairs representing total selectable query items." },
                    { name: "value", type: "string[]", default: "[]", description: "Array collection strings mapping directly onto the currently active allocated tags selection array." },
                    { name: "onChange", type: "(value: string[]) => void", default: "required", description: "State handler tracking push changes and node pops over choice actions." },
                    { name: "placeholder", type: "string", default: "'Select items...'", description: "The typography overlay line visible when the selection tracking array is empty." },
                  ];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

const technologyOptions = [
  { value: "tailwind", label: "Tailwind CSS Engine" },
  { value: "typescript", label: "TypeScript Engine" },
  { value: "framer", label: "Framer Motion Module" },
  { value: "graphql", label: "GraphQL Data Graph" },
  { value: "prisma", label: "Prisma ORM Client" },
];

export default function ComboBoxDocsPage() {
  const exampleCode = `import { useState } from "react";
import { ComboBox } from "@/components/combo-box";

const skills = [
  { value: "tailwind", label: "Tailwind CSS Engine" },
  { value: "typescript", label: "TypeScript Engine" },
  { value: "framer", label: "Framer Motion Module" },
];

export function SkillSelector() {
  const [tags, setTags] = useState(["typescript"]);

  return (
    <ComboBox
      options={skills}
      value={tags}
      onChange={setTags}
      placeholder="Allocate architecture layers..."
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
            { label: "Interactive ComboBox", href: "#interactive-demo" },
            { label: "ComboBox API Matrix", href: "#props-api" },
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
              { label: "ComboBox Tagging Component", href: "/docs/components/forms/combo-box" },
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
              description: "Type to filter and select options.",
              code: exampleCode,
              render: () => {
                const [selectedTags, setSelectedTags] = React.useState<string[]>(["typescript", "tailwind"]);
                return (
                  <div className="w-full max-w-sm space-y-3">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60">
                      Stack Allocation Parameters
                    </label>
                    <ComboBox
                      options={technologyOptions}
                      value={selectedTags}
                      onChange={setSelectedTags}
                      placeholder="Search engineering packages..."
                    />
                    <div className="pt-2 text-[10px] font-mono text-muted-foreground/50">
                      Selected Collection Stack: [
                      <span className="text-primary font-semibold">
                        {selectedTags.length > 0 ? selectedTags.join(", ") : "EMPTY_ARRAY"}
                      </span>]
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