"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconPhoto,
  IconSparkles,
} from "@tabler/icons-react";

import { Image } from "@/components/images";
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
  title: "Better Images™",
  description:
    "Displays images with aspect ratio and fallback support.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/image.tsx",

  category: "layout-and-content",
  apiDescription:
    "The Better Images™ component provides a versatile UI primitive.",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const examples = [
  {
    id: "standard-aspects",
    title: "Proportional Aspect Overlays",
    description:
      "Images with different aspect ratios.",
    code: `import { Image } from "@/components/image";

export function Gallery() {
  return (
    <Image
      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
      alt="Abstract Mesh Backdrop"
      ratio="video"
      roundness="lg"
      width={600}
      height={400}
    />
  );
}`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-2xl w-full max-w-md bg-card/40 backdrop-blur-sm">
        <Image
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
          alt="Abstract Mesh Backdrop Matrix Canvas"
          ratio="video"
          roundness="lg"
          width={600}
          height={337}
        />
      </div>
    ),
  },
  {
    id: "error-handling",
    title: "Fault Tolerant Containment",
    description:
      "How the component handles broken image links.",
    code: `import { Image } from "@/components/image";

export function DeadLink() {
  return (
    <Image
      src="/broken-source-target.png"
      alt="Missing Media Component Asset"
      ratio="square"
      width={200}
      height={200}
    />
  );
}`,
    render: () => (
      <div className="p-6 border border-border/40 rounded-xl bg-card/20 w-full max-w-xs">
        <Image
          src="/broken-path-destination-target.png"
          alt="Missing System Vector Illustration"
          ratio="square"
          roundness="md"
          width={200}
          height={200}
        />
      </div>
    ),
  },
];

const apiProperties: ApiProperty[] = [
  {
    name: "src",
    type: "string | StaticImport",
    default: "required",
    description:
      "Source link pointing cleanly toward internal paths or verified cross-domain remote CDNs.",
  },
  {
    name: "alt",
    type: "string",
    default: "required",
    description:
      "Accessibility alternative title string parsing screen readings directly for compliance vectors.",
  },
  {
    name: "ratio",
    type: "'auto' | 'square' | 'video' | 'portrait' | 'landscape'",
    default: "'auto'",
    description:
      "Locks responsive container dimensions to specific geometric aspect-ratios.",
  },
  {
    name: "roundness",
    type: "'none' | 'sm' | 'md' | 'lg' | 'full'",
    default: "'md'",
    description:
      "Applies unified design token border-radius structures smoothly onto outer framing borders.",
  },
  {
    name: "fallback",
    type: "React.ReactNode",
    default: "calculated",
    description:
      "Custom UI node view to display if an asset fails to fetch or parse correctly.",
  },
];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];


export default function ImageDocsPage() {
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
            { label: "Image API Reference", href: "#props-api" },
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
                label: "Image Component",
                href: "/docs/components/layout-and-content/images",
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
                Image API Reference
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
