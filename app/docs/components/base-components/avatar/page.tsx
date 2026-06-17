"use client";

import { useState } from "react";
import { Avatar } from "@/components/avatar";
import {
  DocsBreadcrumbs,
  DocsOutline,
  DocsPageFrame,
  DocsPanel,
} from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import { TableColumn, Table } from "@/components/table";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "Avatar",
  description:
    "Displays user profile images with text fallbacks.",
  version: "v1.2.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/avatar.tsx",

  category: "base-components",
  apiDescription: "The Avatar component provides a versatile UI primitive.",
};

const apiProperties = [
  {
    name: "src",
    type: "string",
    default: "undefined",
    description:
      "The targeted user profile image URL source. Tracks cross-origin handshakes safely.",
  },
  {
    name: "fallback",
    type: "React.ReactNode",
    default: "undefined",
    description:
      "Rendered fallback node injected automatically if image addresses return 404 or break loading sequences.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description:
      "Alters aspect locks and structural dimension frames uniformly across your interface maps.",
  },
  {
    name: "roundness",
    type: "'none' | 'sm' | 'md' | 'lg' | 'full'",
    default: "'full'",
    description:
      "Modifies border radius constraints to conform with modern, minimal, or system window aesthetics.",
  },
];

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const columns: TableColumn<ApiProperty>[] = [
  {
    key: "name",
    header: "Property",
    width: "20%",
    className: "font-mono font-bold text-primary p-4",
  },
  {
    key: "type",
    header: "Type",
    width: "30%",
    className:
      "font-mono text-[10px] text-muted-foreground leading-relaxed p-4",
  },
  {
    key: "default",
    header: "Default",
    width: "15%",
    className: "font-mono text-foreground/70 italic p-4",
    render: (row: ApiProperty) =>
      row.default || <span className="text-muted-foreground/30">—</span>,
  },
  {
    key: "description",
    header: "Description",
    width: "35%",
    className: "font-normal leading-relaxed text-muted-foreground p-4",
  },
];

export default function AvatarDocsPage() {
  const [activeSize, setActiveSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [activeRound, setActiveRound] = useState<
    "none" | "sm" | "md" | "lg" | "full"
  >("full");

  const playgroundCode = `<Avatar 
  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
  fallback="SJ" 
  size="${activeSize}"
  roundness="${activeRound}"
/>`;

  const fallbackExampleCode = `<Avatar 
  src="https://broken-link.com/asset.png" 
  fallback="UX" 
/>`;

  const outlineItems = [
    { label: "Interactive Playground", href: "#playground" },
    { label: "Fallbacks", href: "#fallbacks" },
    { label: "Properties API", href: "#props-api" },
  ];

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
              { label: "Base Primitives", href: "/docs/components#base" },
              { label: "Avatar", href: "/docs/components/avatar" },
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

          <p className="text-base leading-relaxed text-muted-foreground">
            {componentMeta.description}
          </p>
        </div>

        <section id="playground" className="space-y-4 scroll-mt-20">
          <div className="bg-secondary/20 border border-border/50 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                Scale Uniform
              </span>
              <div className="flex gap-1 bg-background border border-border/60 p-0.5 rounded-lg text-xs font-medium">
                {(["sm", "md", "lg", "xl"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveSize(s)}
                    className={`flex-1 py-1 rounded-md uppercase transition-all ${activeSize === s ? "bg-card text-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                Mask Roundness
              </span>
              <div className="flex gap-1 bg-background border border-border/60 p-0.5 rounded-lg text-xs font-medium">
                {(["none", "sm", "md", "lg", "full"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setActiveRound(r)}
                    className={`flex-1 py-1 rounded-md capitalize transition-all ${activeRound === r ? "bg-card text-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <CodeBlock
            example={{
              id: "playground-block",
              title: "Interactive Sandbox",
              description: "Use the controls below to change size and roundness.",
              code: playgroundCode,
              render: () => (
                <Avatar
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  fallback="SJ"
                  size={activeSize}
                  roundness={activeRound}
                />
              ),
            }}
          />
        </section>

        <section id="fallbacks" className="space-y-4 scroll-mt-20">
          <CodeBlock
            example={{
              id: "fallbacks-block",
              title: "Fallbacks",
              description: "The fallback displays when the image fails to load.",
              code: fallbackExampleCode,
              render: () => (
                <Avatar
                  src="https://broken-link.com/asset.png"
                  fallback="UX"
                  size="md"
                  roundness="full"
                />
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