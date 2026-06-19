"use client";

import { Typography } from "@/components/typography";
import { CodeBlock } from "@/components/codeblock";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import { TableColumn, Table } from "@/components/table";
import { IconArrowRight } from "@tabler/icons-react";

const componentMeta = {
  title: "CodeBlock",
  description: "A tabbed code display component that toggles between a live preview and highlighted source code with copy support.",
  version: "v1.0.0",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
  { name: "code", type: "string", default: "required", description: "The source code shown in the Code tab." },
  { name: "language", type: "string", default: '"tsx"', description: "Language for syntax highlighting (tsx, jsx, bash, etc.)." },
  { name: "children", type: "ReactNode", default: "—", description: "Content rendered in the Preview tab." },
  { name: "showLineNumbers", type: "boolean", default: "false", description: "Shows line numbers in the code view." },
  { name: "fileName", type: "string", default: "—", description: "File name shown in the code header." },
  { name: "variant", type: '"modern" | "minimal"', default: '"modern"', description: "Visual style variant." },
  { name: "tab", type: '"preview" | "code"', default: "—", description: "Controlled active tab." },
  { name: "onTabChange", type: "(tab) => void", default: "—", description: "Callback when the active tab changes." },
];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "25%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "40%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function CodeBlockDocsPage() {
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
            { label: "Overview", href: "#overview" },
            { label: "Examples", href: "#examples" },
            { label: "API", href: "#api" },
          ]}
        />
      }
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">
        <div className="space-y-3 border-b border-border pb-6" id="overview">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Layout & Content", href: "/docs/components/layout-and-content" },
              { label: "CodeBlock", href: "/docs/components/layout-and-content/codeblock" },
            ]}
          />

          <div className="flex items-center gap-3">
            <Typography variant="h1">{componentMeta.title}</Typography>
            <Badge variant="info">{componentMeta.version}</Badge>
          </div>
          <Typography variant="lead">{componentMeta.description}</Typography>
        </div>

        <section id="examples" className="space-y-8 scroll-mt-20">
          <Typography variant="h2">Examples</Typography>

          <div className="space-y-3">
            <Typography variant="h3">Basic usage</Typography>
            <CodeBlock
              code={`import { Button } from "@/components/button";

export default function Hello() {
  return <Button>Click me</Button>;
}`}
              language="tsx"
            >
              <Button>Click me</Button>
            </CodeBlock>
          </div>

          <div className="space-y-3">
            <Typography variant="h3">With icons and content</Typography>
            <CodeBlock
              code={`import { Button } from "@/components/button";
import { IconArrowRight } from "@tabler/icons-react";

export default function CTA() {
  return (
    <Button rightIcon={<IconArrowRight />}>
      Get Started
    </Button>
  );
}`}
              language="tsx"
            >
              <Button rightIcon={<IconArrowRight className="h-4 w-4" />}>
                Get Started
              </Button>
            </CodeBlock>
          </div>

          <div className="space-y-3">
            <Typography variant="h3">With complex children</Typography>
            <CodeBlock
              code={`<div className="flex items-center gap-2 rounded-xl border p-4">
  <Badge variant="success">Active</Badge>
  <span className="text-sm">Status indicator</span>
</div>`}
              language="tsx"
            >
              <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card p-4">
                <Badge variant="success">Active</Badge>
                <span className="text-sm text-foreground">Status indicator</span>
              </div>
            </CodeBlock>
          </div>

          <div className="space-y-3">
            <Typography variant="h3">Multiple code blocks</Typography>
            <div className="space-y-4">
              <CodeBlock
                code={`npm install framer-motion class-variance-authority`}
                language="bash"
              >
                <div className="rounded-lg bg-muted/30 border border-border/60 px-4 py-3 text-sm text-foreground font-mono">
                  $ npm install framer-motion class-variance-authority
                </div>
              </CodeBlock>
              <CodeBlock
                code={`import { Button } from "@/components/button";`}
                language="tsx"
              >
                <div className="rounded-lg bg-muted/30 border border-border/60 px-4 py-3 text-sm text-foreground font-mono">
                  {`import { Button } from "@/components/button";`}
                </div>
              </CodeBlock>
            </div>
          </div>
        </section>

        <section id="api" className="space-y-4 scroll-mt-20">
          <Typography variant="h2">API</Typography>
          <Typography variant="body">
            All available props for the CodeBlock component.
          </Typography>

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
          © 2026 Venti UI Labs.
        </footer>
      </main>
    </DocsPageFrame>
  );
}
