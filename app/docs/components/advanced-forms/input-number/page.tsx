"use client";

import React from "react";

import { InputNumber } from "@/components/input-number";
import { TableColumn, Table } from "@/components/table"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "InputNumber Engine Primitive",
  description: "A number input with increment and decrement buttons.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/input-number.tsx",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
                    { name: "value", type: "number", default: "undefined", description: "The active numeric value hook bound to input operations." },
                    { name: "onChange", type: "(value: number | undefined) => void", default: "undefined", description: "State callback function tracking valid key selections and step changes." },
                    { name: "min", type: "number", default: "-Infinity", description: "The minimum numeric threshold past which decrements are frozen." },
                    { name: "max", type: "number", default: "Infinity", description: "The maximum numeric threshold past which increments are frozen." },
                    { name: "step", type: "number", default: "1", description: "The incremental value multiplier added or deducted during steps operations." },
                    { name: "disabled", type: "boolean", default: "false", description: "Freezes calculation interactions and drops container layout transparencies." },
                  ];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function InputNumberDocsPage() {
  const exampleCode = `import { useState } from "react";
import { InputNumber } from "@/components/input-number";

export function TransactionCounter() {
  const [count, setCount] = useState<number | undefined>(1.5);

  return (
    <InputNumber
      value={count}
      onChange={setCount}
      min={0}
      max={10}
      step={0.25}
      placeholder="0.00"
      variant="default"
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
            { label: "Interactive Component Box", href: "#interactive-demo" },
            { label: "InputNumber API Metrics", href: "#props-api" },
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
              { label: "InputNumber Component Structure", href: "/docs/components/forms/input-number" },
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
              description: "Click and hold the buttons to change the value.",
              code: exampleCode,
              render: () => {
                const [numericValue, setNumericValue] = React.useState<number | undefined>(1.5);
                return (
                  <div className="w-full max-w-[180px] space-y-3">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60 block text-center">
                      Scale Factor Offset
                    </label>
                    <InputNumber
                      value={numericValue}
                      onChange={setNumericValue}
                      min={0}
                      max={10}
                      step={0.25}
                      placeholder="0.00"
                    />
                    <div className="pt-2 text-[10px] font-mono text-muted-foreground/50 text-center">
                      RAW_NUMERIC_OUT: <span className="text-primary font-bold">{numericValue !== undefined ? numericValue : "UNDEFINED"}</span>
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