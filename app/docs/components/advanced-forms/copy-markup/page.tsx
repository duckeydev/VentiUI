"use client";

import { CopyMarkup } from "@/components/copy-markup"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import { TableColumn, Table } from "@/components/table";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "CopyMarkup Engine Block",
  description: "Shows code with line numbers and a copy button.",
  version: "v1.0.2",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/copy-markup.tsx",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
                    { name: "code", type: "string", default: "required", description: "The raw multi-line code script parameters or text payload layout tracking to render." },
                    { name: "language", type: "string", default: '"bash"', description: "Semantic identifier printed on the header layout toolbar representing target syntax tracks." },
                    { name: "showLineNumbers", type: "boolean", default: "false", description: "Injects sequential numeric column labels alongside the code string margins." },
                    { name: "variant", type: '"default" | "solid"', default: '"default"', description: "Adjusts structural density parameters, box canvas depth, and background border attributes." },
                  ];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function CopyMarkupDocsPage() {
  const sampleSnippet = `npm install @venti-ui/primitives framer-motion
core-pack init --target=./components/ui
venti compile copy-markup --optimize`;

  const documentationSourceCode = `import { CopyMarkup } from "@/components/copy-markup";

export function InstallationGuide() {
  const codeBlock = \`npm install @venti-ui/primitives
venti compile copy-markup\`;

  return (
    <CopyMarkup
      code={codeBlock}
      language="bash"
      showLineNumbers={true}
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
            { label: "Interactive Component Layout", href: "#interactive-demo" },
            { label: "CopyMarkup Specification Matrix", href: "#props-api" },
          ]}
        />
      }
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">

        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Utility Primitives", href: "/docs/components#utilities" },
              { label: "CopyMarkup Code Node", href: "/docs/components/utilities/copy-markup" },
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
              description: "Click the copy button to copy the code.",
              code: documentationSourceCode,
              render: () => (
                <div className="w-full max-w-md space-y-2.5">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60 block">
                    Core Terminal Manifest
                  </label>
                  <CopyMarkup
                    code={sampleSnippet}
                    language="bash"
                    showLineNumbers={true}
                  />
                </div>
              ),
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