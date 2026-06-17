"use client";

import React from "react";

import { ToggleCount } from "@/components/toggle-count";
import { TableColumn, Table } from "@/components/table"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "ToggleCount Action Chip",
  description: "A toggle switch that shows a count badge.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/toggle-count.tsx",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
                    { name: "pressed", type: "boolean", default: "required", description: "Binds the active toggle state layout layer to a boolean validation wrapper." },
                    { name: "onPressedChange", type: "(pressed: boolean) => void", default: "required", description: "State handler updating selection hooks on client tapping interactions." },
                    { name: "count", type: "number", default: "required", description: "The explicit metric indicator tracking quantity data to render inside the trailing badge node." },
                    { name: "showZero", type: "boolean", default: "false", description: "Toggles whether to preserve badge rendering fields when count states fall straight to absolute zero." },
                    { name: "variant", type: '"default" | "outline"', default: '"default"', description: "Controls structural tokens adjustments modifying border parameters and layout transparencies." },
                  ];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function ToggleCountDocsPage() {
  const exampleCode = `import { useState } from "react";
import { ToggleCount } from "@/components/toggle-count";

export function TicketAssignmentFilter() {
  const [isActive, setIsActive] = useState(false);

  return (
    <ToggleCount
      pressed={isActive}
      onPressedChange={setIsActive}
      count={12}
      variant="default"
    >
      Active Sprint Items
    </ToggleCount>
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
            { label: "ToggleCount API Configuration", href: "#props-api" },
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
              { label: "ToggleCount Control Chip", href: "/docs/components/forms/toggle-count" },
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
              description: "Toggle the switch to see the count change.",
              code: exampleCode,
              render: () => {
                const [sprintPressed, setSprintPressed] = React.useState(false);
                const [backlogPressed, setBacklogPressed] = React.useState(true);
                return (
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <ToggleCount
                      pressed={sprintPressed}
                      onPressedChange={setSprintPressed}
                      count={4}
                      variant="modern"
                    >
                      Sprint Tasks
                    </ToggleCount>
                    <ToggleCount
                      pressed={backlogPressed}
                      onPressedChange={setBacklogPressed}
                      count={37}
                      variant="minimal"
                    >
                      Backlog Metrics
                    </ToggleCount>
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