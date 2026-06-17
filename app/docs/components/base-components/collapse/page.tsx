"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconSparkles,
} from "@tabler/icons-react";

import { Collapse } from "@/components/collapse";
import { TableColumn, Table } from "@/components/table";
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
  title: "Collapse",
  description:
    "A collapsible content panel.",
  version: "v1.0.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/collapse.tsx",

  category: "base-components",
  apiDescription: "The Collapse component provides a versatile UI primitive.",
};

const examples = [
  {
    id: "default-usage",
    title: "Basic Toggle",
    description:
      "Click the button to toggle the content visibility.",
    code: `import { useState } from "react";
import { Collapse } from "@/components/collapse";

export function BasicToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        {isOpen ? "Close Collapse" : "Open Collapse"}
      </button>

      <Collapse isOpen={isOpen} className="mt-4">
        <div className="p-4 rounded-xl border border-border bg-card text-card-foreground text-sm leading-relaxed">
          This content expands down smoothly calculating its automatic layout height dynamically. No hardcoded heights needed.
        </div>
      </Collapse>
    </div>
  );
}`,
    render: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div className="w-full max-w-xl">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {isOpen ? "Close Collapse" : "Open Collapse"}
          </button>

          <Collapse isOpen={isOpen} className="mt-4">
            <div className="p-4 rounded-xl border border-border bg-card text-card-foreground text-sm leading-relaxed">
              This content expands down smoothly calculating its automatic
              layout height dynamically. No hardcoded heights needed.
            </div>
          </Collapse>
        </div>
      );
    },
  },
  {
    id: "no-opacity",
    title: "Without Opacity Fade",
    description:
      "Disable the opacity fade for a rigid transition.",
    code: `import { useState } from "react";
import { Collapse } from "@/components/collapse";

export function NoOpacityToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border border-border bg-secondary text-secondary-foreground rounded-lg text-sm font-medium transition-colors hover:bg-secondary/70"
      >
        Toggle Rigid Scroll
      </button>

      <Collapse isOpen={isOpen} animateOpacity={false} className="mt-4">
        <div className="p-4 rounded-xl border-l-2 border-primary bg-primary/5 text-foreground text-sm">
          Notice how the text never changes alpha opacity, resulting in a firm structural shift without ghostly artifacting.
        </div>
      </Collapse>
    </div>
  );
}`,
    render: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div className="w-full max-w-xl">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 border border-border bg-secondary text-secondary-foreground rounded-lg text-sm font-medium transition-colors hover:bg-secondary/70"
          >
            Toggle Rigid Scroll
          </button>

          <Collapse isOpen={isOpen} animateOpacity={false} className="mt-4">
            <div className="p-4 rounded-xl border-l-2 border-primary bg-primary/5 text-foreground text-sm">
              Notice how the text never changes alpha opacity, resulting in a
              firm structural shift without ghostly artifacting.
            </div>
          </Collapse>
        </div>
      );
    },
  },
  {
    id: "persist-dom",
    title: "Unmount Constraints",
    description:
      "Content stays mounted in the DOM when collapsed.",
    code: `import { useState } from "react";
import { Collapse } from "@/components/collapse";

export function KeepMounted() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border border-border bg-secondary text-secondary-foreground rounded-lg text-sm font-medium transition-colors hover:bg-secondary/70"
      >
        Toggle Persistent Node
      </button>

      <Collapse isOpen={isOpen} unmountOnExit={false} className="mt-4">
        <div className="p-4 rounded-xl border border-border bg-card text-muted-foreground text-sm border-dashed">
          This element remains actively appended structurally to the DOM even when fully collapsed.
        </div>
      </Collapse>
    </div>
  );
}`,
    render: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div className="w-full max-w-xl">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 border border-border bg-secondary text-secondary-foreground rounded-lg text-sm font-medium transition-colors hover:bg-secondary/70"
          >
            Toggle Persistent Node
          </button>

          <Collapse isOpen={isOpen} unmountOnExit={false} className="mt-4">
            <div className="p-4 rounded-xl border border-border bg-card text-muted-foreground text-sm border-dashed">
              This element remains actively appended structurally to the DOM
              even when fully collapsed.
            </div>
          </Collapse>
        </div>
      );
    },
  },
];

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
  {
    name: "isOpen",
    type: "boolean",
    default: "required",
    description:
      "The active controlled state dictating if the container expands to logical height limit.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "required",
    description: "Content body to be managed inside the collapse boundaries.",
  },
  {
    name: "animateOpacity",
    type: "boolean",
    default: "true",
    description:
      "Whether to animate children alphas seamlessly linked with dimension alterations.",
  },
  {
    name: "unmountOnExit",
    type: "boolean",
    default: "true",
    description:
      "Dictates whether closed structural sections are wholly ripped from React memory contexts to optimize layer rendering.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description:
      "Optional explicit standard string variable mutating base wrapper classes.",
  },
];
const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

const outlineItems = [
  ...examples.map((example) => ({
    label: example.title,
    href: `#${example.id}`,
  })),
  { label: "Properties API", href: "#props-api" },
];

export default function CollapseDocsPage() {
  return (
    <DocsPageFrame
      leftBar={
        <aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-border/40">
          <DocsSidebar />
        </aside>
      }
      rightBar={<DocsOutline title="On this page" items={outlineItems} />}
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">

        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              {
                label: "Base Components",
                href: "/docs/components#base-components",
              },
              {
                label: componentMeta.title,
                href: "/docs/components/base-components/collapse",
              },
            ]}
          />

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
              {componentMeta.title}
            </h1>
            <Badge variant="info">{componentMeta.version}</Badge>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            {componentMeta.description}
          </p>        </div>

        <div className="space-y-10">
          {examples.map((example) => (
            <CodeBlock key={example.id} example={example} />
          ))}
        </div>

        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                API Reference
              </h2>
              <p className="text-xs text-muted-foreground">All available props for this component.</p>
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

        <footer className="border-t border-border/30 pt-8 pb-10 text-center text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/40">
          © 2026 Venti UI Labs. UI made right.
        </footer>
      </main>
    </DocsPageFrame>
  );
}
