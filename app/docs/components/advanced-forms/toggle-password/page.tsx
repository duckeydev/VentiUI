"use client";

import React from "react";

import { TogglePassword } from "@/components/toggle-password";
import { TableColumn, Table } from "@/components/table"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "TogglePassword Input Field",
  description: "A password field with a toggle to show or hide the text.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/toggle-password.tsx",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
                    { name: "value", type: "string", default: "required", description: "The controlled baseline text string buffer managed across the visibility transformation layer." },
                    { name: "onChange", type: "(value: string) => void", default: "required", description: "Callback triggered dynamically upon downstream keystroke input changes." },
                    { name: "variant", type: '"default" | "filled"', default: '"default"', description: "Alters background node canvas depth structures and focus ring border variables." },
                    { name: "placeholder", type: "string", default: '"Enter password..."', description: "Dull textual masking string rendered whenever the reactive context input field remains clear." },
                  ];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function TogglePasswordDocsPage() {
  const exampleCode = `import { useState } from "react";
import { TogglePassword } from "@/components/toggle-password";

export function SimpleLoginForm() {
  const [password, setPassword] = useState("");

  return (
    <TogglePassword
      value={password}
      onChange={setPassword}
      variant="default"
      placeholder="Enter account security key..."
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
            { label: "TogglePassword API Configuration", href: "#props-api" },
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
              { label: "TogglePassword Input Node", href: "/docs/components/forms/toggle-password" },
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
              description: "Click the icon to toggle password visibility.",
              code: exampleCode,
              render: () => {
                const [passwordValue, setPasswordValue] = React.useState("secret_token_2026");
                return (
                  <div className="w-full max-w-xs space-y-1.5">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60">
                      System Entry Token
                    </label>
                    <TogglePassword
                      value={passwordValue}
                      onChange={setPasswordValue}
                      placeholder="Input security passphrase..."
                    />
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