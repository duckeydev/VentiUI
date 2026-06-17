"use client";

import { IconCode, IconExternalLink } from "@tabler/icons-react";

import { Divider } from "@/components/divider";
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
import { TableColumn, Table } from "@/components/table";

const componentMeta = {
  title: "Dividers",
  description:
    "A visual divider with optional label support.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/divider.tsx",

  category: "layout-and-content",
  apiDescription:
    "The Structural Divider Core component provides a versatile UI primitive.",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const examples = [
  {
    id: "divider-variants",
    title: "Structural Boundary Masks",
    description:
      "Different divider visual styles.",
    code: `import { Divider } from "@/components/divider";

export function Interface() {
  return (
    <div className="space-y-4">
      <Divider variant="default" />
      <Divider variant="dashed" />
      <Divider variant="gradient" />
    </div>
  );
}`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-xl bg-card/40 backdrop-blur-sm flex flex-col gap-6">
        <div className="w-full text-left space-y-1">
          <span className="text-[10px] font-mono opacity-40">
            variant="default"
          </span>
          <Divider variant="default" />
        </div>
        <div className="w-full text-left space-y-1">
          <span className="text-[10px] font-mono opacity-40">
            variant="dashed"
          </span>
          <Divider variant="dashed" />
        </div>
        <div className="w-full text-left space-y-1">
          <span className="text-[10px] font-mono opacity-40">
            variant="gradient"
          </span>
          <Divider variant="gradient" />
        </div>
      </div>
    ),
  },
  {
    id: "labeled-tracks",
    title: "Embedded Text Content Labels",
    description:
      "Dividers with centered, left, or right aligned labels.",
    code: `<Divider variant="default" labelPosition="center">
  Security Authorization Required
</Divider>`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-xl bg-card/40 backdrop-blur-sm flex flex-col gap-6">
        <Divider labelPosition="left">Metadata Overview</Divider>
        <Divider labelPosition="center">System Breakpoint Area</Divider>
        <Divider labelPosition="right" variant="dashed">
          Terminal Configuration Logs
        </Divider>
      </div>
    ),
  },
  {
    id: "vertical-vectors",
    title: "Vertical Column Segmentation",
    description:
      "Vertical dividers for side-by-side content.",
    code: `<div className="flex h-5 items-center gap-2">
  <span>Option Alpha</span>
  <Divider orientation="vertical" />
  <span>Option Beta</span>
</div>`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-xs bg-card/40 backdrop-blur-sm flex justify-center items-center gap-4 text-xs text-muted-foreground font-mono">
        <span>Edit Track</span>
        <Divider orientation="vertical" className="h-4" />
        <span>Staging Vault</span>
        <Divider orientation="vertical" variant="dashed" className="h-4" />
        <span>Deployment</span>
      </div>
    ),
  },
];

const apiProperties: ApiProperty[] = [
  {
    name: "orientation",
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description:
      "Controls layout axis behavior, adapting constraints to fill height or stretch full width paths.",
  },
  {
    name: "variant",
    type: "'default' | 'dashed' | 'gradient'",
    default: "'default'",
    description:
      "Alters visual formatting tokens, toggling border-style tracks or horizontal gradient masks.",
  },
  {
    name: "labelPosition",
    type: "'left' | 'center' | 'right'",
    default: "'center'",
    description:
      "Aligns structural children node components contextually inside horizontal layouts.",
  },
];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function DividerDocsPage() {
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
            ...examples.map((e) => ({ label: e.title, href: `#${e.id}` })),
            { label: "Divider API Reference", href: "#props-api" },
          ]}
        />
      }
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              {
                label: "layout-and-content",
                href: "/docs/components/layout-and-content",
              },
              {
                label: "Divider",
                href: "/docs/components/layout-and-content/dividers",
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
          </p>
        </div>

        <div className="space-y-10">
          {examples.map((example) => (
            <CodeBlock key={example.id} example={example} />
          ))}
        </div>

        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Divider API Reference
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

        <footer className="border-t border-border/30 pt-8 pb-10 text-center text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/40">
          © 2026 Venti UI Labs. UI made right.
        </footer>
      </main>
    </DocsPageFrame>
  );
}
