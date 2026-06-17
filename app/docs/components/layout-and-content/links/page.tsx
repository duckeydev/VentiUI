"use client";

import { Link } from "@/components/link";
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
  title: "Links",
  description:
    "An enhanced link component with tooltip previews.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/link.tsx",

  category: "layout-and-content",
  apiDescription:
    "The Navigation Link Core component provides a versatile UI primitive.",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const examples = [
  {
    id: "rich-metadata-previews",
    title: "Rich Metadata Hover Tooltips",
    description:
      "Hover over the link to see a rich tooltip preview.",
    code: `<Link 
  href="https://google.com" 
  richPreview 
  info="Google Search Canvas Portal"
>
  Search Center
</Link>`,
    render: () => (
      <div className="p-12 border border-border/50 rounded-2xl w-full max-w-xl bg-card/40 backdrop-blur-sm text-center flex flex-col justify-center items-center gap-6 text-sm min-h-40">
        <p className="text-muted-foreground">
          Hover over this specialized link path to verify destination
          parameters:{" "}
          <Link
            href="https://google.com"
            richPreview
            info="Google Search Canvas Portal"
            variant="default"
          >
            Search Center
          </Link>
        </p>
      </div>
    ),
  },
];

const apiProperties: ApiProperty[] = [
  {
    name: "href",
    type: "string | UrlObject",
    default: "required",
    description:
      "Destination target path framework tracking route parameters or external global endpoints.",
  },
  {
    name: "variant",
    type: "'default' | 'muted' | 'inline' | 'standalone'",
    default: "'default'",
    description:
      "Configures alignment, visual color balances, and line interaction tokens.",
  },
  {
    name: "richPreview",
    type: "boolean",
    default: "false",
    description:
      "Toggles the deployment matrix of the embedded route tracing micro-tooltip layer.",
  },
  {
    name: "info",
    type: "string",
    default: "undefined",
    description:
      "Appends extra semantic destination titles below the primary trace row within the preview tooltip.",
  },
];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function LinkDocsPage() {
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
            { label: "Link API Reference", href: "#props-api" },
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
                label: "Links",
                href: "/docs/components/layout-and-content/links",
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
                Link API Reference
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
