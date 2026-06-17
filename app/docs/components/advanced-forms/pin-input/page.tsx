"use client";

import React from "react";

import { PinInput } from "@/components/pin-input";
import { TableColumn, Table } from "@/components/table"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "PinInput Node Field",
  description: "A split input for entering verification codes or PINs.",
  version: "v1.0.1",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/pin-input.tsx",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
                    { name: "value", type: "string", default: "required", description: "The active tracked buffer sequence representing all combined entered input data elements." },
                    { name: "onChange", type: "(value: string) => void", default: "required", description: "Fired whenever an incremental input index undergoes mutation updates." },
                    { name: "length", type: "number", default: "4", description: "Defines the precise count bounding limits for the generated input box tracks array." },
                    { name: "variant", type: '"default" | "filled"', default: '"default"', description: "Alters block rendering architecture, canvas shading style lines, and hover borders." },
                    { name: "onComplete", type: "(value: string) => void", default: "undefined", description: "Execution loop fired immediately upon filling the final available digit array grid." },
                  ];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function PinInputDocsPage() {
  const exampleCode = `import { useState } from "react";
import { PinInput } from "@/components/pin-input";

export function VerificationForm() {
  const [otp, setOtp] = useState("");

  return (
    <PinInput
      value={otp}
      onChange={setOtp}
      length={6}
      variant="default"
      onComplete={(code) => console.log("Code complete: ", code)}
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
            { label: "PinInput Prop Specification Matrix", href: "#props-api" },
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
              { label: "PinInput Node Code", href: "/docs/components/forms/pin-input" },
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
              description: "Type in each box or paste a code.",
              code: exampleCode,
              render: () => {
                const [pinValue, setPinValue] = React.useState("");
                return (
                  <div className="w-full max-w-xs space-y-3 flex flex-col items-center">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60 text-center">
                      MFA Verification Checkpoint
                    </label>
                    <PinInput
                      value={pinValue}
                      onChange={setPinValue}
                      length={6}
                      onComplete={(val) => alert(`Token Completed: ${val}`)}
                    />
                    <span className="text-[10px] text-muted-foreground/40 font-mono mt-2">
                      Buffered Value: "{pinValue}"
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