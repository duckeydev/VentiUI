"use client";

import { Typography } from "@/components/typography";
import { CopyMarkup } from "@/components/copy-markup";
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import { TableColumn, Table } from "@/components/table";
import { Badge } from "@/components";

const componentMeta = {
  title: "CopyMarkup",
  description: "Displays code snippets with syntax highlighting, line numbers, and a one-click copy button.",
  version: "v1.1.0",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
  { name: "code", type: "string", default: "required", description: "The source code to display and copy." },
  { name: "language", type: "string", default: '"bash"', description: "Language identifier used for syntax highlighting." },
  { name: "showLineNumbers", type: "boolean", default: "false", description: "Shows line numbers in the left gutter." },
  { name: "fileName", type: "string", default: "—", description: "Optional file name shown in the header bar." },
  { name: "variant", type: '"modern" | "minimal" | "solid" | "glass" | "macos"', default: '"modern"', description: "Visual style variant for the code block wrapper." },
  { name: "theme", type: "PrismTheme", default: "vsDark", description: "Prism theme object for syntax highlighting colors." },
];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function CopyMarkupDocsPage() {
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
              { label: "Advanced Forms", href: "/docs/components/advanced-forms" },
              { label: "CopyMarkup", href: "/docs/components/advanced-forms/copy-markup" },
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
            <CopyMarkup
              code={`import { CopyMarkup } from "@/components/copy-markup";

export function InstallGuide() {
  return (
    <CopyMarkup
      code="npm install framer-motion"
      language="bash"
    />
  );
}`}
              language="tsx"
              fileName="install.tsx"
            />
          </div>

          <div className="space-y-3">
            <Typography variant="h3">With line numbers</Typography>
            <CopyMarkup
              code={`function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`}
              language="typescript"
              showLineNumbers
              fileName="fib.ts"
            />
          </div>

          <div className="space-y-3">
            <Typography variant="h3">Shell commands</Typography>
            <CopyMarkup
              code={`# Install dependencies
npm install framer-motion class-variance-authority clsx tailwind-merge

# Dev dependencies
npm install -D tailwindcss @tailwindcss/postcss

# Start dev server
npm run dev`}
              language="bash"
              showLineNumbers
            />
          </div>

          <div className="space-y-3">
            <Typography variant="h3">Variants</Typography>
            <div className="space-y-3">
              {(["modern", "minimal", "solid", "glass", "macos"] as const).map((v) => (
                <div key={v} className="space-y-1">
                  <Typography variant="small" className="capitalize">{v}</Typography>
                  <CopyMarkup
                    code={`echo "Variant: ${v}"`}
                    language="bash"
                    variant={v}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="api" className="space-y-4 scroll-mt-20">
          <Typography variant="h2">API</Typography>
          <Typography variant="body">
            All available props for the CopyMarkup component.
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