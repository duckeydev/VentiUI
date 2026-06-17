"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconMarkdown,
  IconSparkles,
} from "@tabler/icons-react";

import { Typography } from "@/components/typography";
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
  title: "Typography",
  description:
    "Renders text with consistent typographic styles.",
  version: "v1.2.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/typography.tsx",

  category: "layout-and-content",
  apiDescription:
    "The Typography Core component provides a versatile UI primitive.",
};

const examples = [
  {
    id: "semantic-decoupling",
    title: "Structural Hierarchy Escape Hatch",
    description:
      "Render a heading with one visual style but a different HTML tag.",
    code: `<Typography variant="h1" as="h2">
  Looks like an H1, but parses as an H2
</Typography>`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-xl bg-card/40 backdrop-blur-sm text-left space-y-3">
        <Typography variant="h1" as="h2">
          Sub-Section Title Box
        </Typography>
        <p className="text-xs font-mono text-muted-foreground/60 bg-secondary/40 p-2 border border-border/40 rounded-lg">
          {`Visual Style: variant="h1"  |  HTML Target: Rendered as <h2>`}
        </p>
      </div>
    ),
  },
  {
    id: "embedded-markdown",
    title: "Inline Markdown Compiling",
    description:
      "Use markdown syntax inside typography components.",
    code: `<Typography markdown variant="body">
  Execute \`pnpm setup\` to activate **production distribution arrays** immediately.
</Typography>`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-xl bg-card/40 backdrop-blur-sm text-left space-y-4">
        <Typography markdown variant="lead">
          We can easily append **bold core strings**, *italic emphasis notes*,
          or standard `inline code blocks` cleanly.
        </Typography>
        <Typography markdown variant="body">
          This feature safely parses symbols without relying on dangerous inner
          HTML rendering tracks, keeping your application secure.
        </Typography>
      </div>
    ),
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
    name: "variant",
    type: "'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'lead' | 'small' | 'code'",
    default: "'body'",
    description:
      "Controls structural styling parameters like weight, font sizing, tracking, and default colors.",
  },
  {
    name: "as",
    type: "React.ElementType",
    default: "calculated",
    description:
      "Explicit element override tag used to decouple design values from strict structural layout trees.",
  },
  {
    name: "markdown",
    type: "boolean",
    default: "false",
    description:
      "Enables safe scanning for inline markup syntax, converting patterns into stylized text nodes.",
  },
];
const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function TypographyDocsPage() {
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
            { label: "Properties API", href: "#props-api" },
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
                label: "Layout & Content",
                href: "/docs/components/layout-and-content",
              },
              {
                label: "Typography",
                href: "/docs/components/layout-and-content/typography",
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
                Typography API Reference
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
