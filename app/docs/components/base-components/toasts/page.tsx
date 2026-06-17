"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconNotification,
  IconSparkles,
} from "@tabler/icons-react";

import { useToast, ToastProvider } from "@/components/toasts";
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
  title: "Toast Notification",
  description:
    "Temporary notification messages.",
  version: "v1.2.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/toast.tsx",

  category: "base-components",
  apiDescription:
    "The Toast Notification component provides a versatile UI primitive.",
};

function ToastPlayground() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-6 border border-border/50 rounded-2xl w-full max-w-xl bg-card/40 backdrop-blur-sm">
      <button
        onClick={() =>
          toast({
            title: "Operation completed",
            description:
              "All database instances synchronizing securely on primary arrays.",
            type: "success",
          })
        }
        className="px-3.5 py-1.5 rounded-lg border border-border/80 bg-background text-xs font-semibold text-foreground hover:bg-secondary cursor-pointer transition-all"
      >
        Trigger Success
      </button>
      <button
        onClick={() =>
          toast({
            title: "Network drop detected",
            description:
              "Lost structural pipeline synchronization handshake protocols.",
            type: "error",
          })
        }
        className="px-3.5 py-1.5 rounded-lg border border-border/80 bg-background text-xs font-semibold text-foreground hover:bg-secondary cursor-pointer transition-all"
      >
        Trigger Error
      </button>
      <button
        onClick={() =>
          toast({
            title: "Security Threshold",
            description:
              "Unvalidated traffic vectors tracking outside normal parameters.",
            type: "warning",
          })
        }
        className="px-3.5 py-1.5 rounded-lg border border-border/80 bg-background text-xs font-semibold text-foreground hover:bg-secondary cursor-pointer transition-all"
      >
        Trigger Warning
      </button>
      <button
        onClick={() =>
          toast({
            title: "Update available",
            description:
              "Venti build core dependencies v1.2.0 pushing automatically.",
            type: "info",
          })
        }
        className="px-3.5 py-1.5 rounded-lg border border-border/80 bg-background text-xs font-semibold text-foreground hover:bg-secondary cursor-pointer transition-all"
      >
        Trigger Info
      </button>
    </div>
  );
}

const examples = [
  {
    id: "global-playground",
    title: "Global Trigger Sandboxes",
    description:
      "Click the buttons to trigger different toast types.",
    code: `import { useToast } from "@/components/toast";

const MyComponent = () => {
  const { toast } = useToast();

  return (
    <button onClick={() => toast({ 
      title: "Sync Finished", 
      description: "Database files correctly written.", 
      type: "success" 
    })}>
      Trigger Action
    </button>
  );
};`,
    render: () => <ToastPlayground />,
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
    name: "title",
    type: "string",
    default: "required",
    description:
      "The central textual message heading applied inside the notification box container.",
  },
  {
    name: "description",
    type: "string",
    default: "undefined",
    description:
      "Secondary contextual paragraph block describing finer execution metadata detail parameters.",
  },
  {
    name: "type",
    type: "'default' | 'success' | 'error' | 'warning' | 'info'",
    default: "'default'",
    description:
      "Drives internal color variant mappings and automatically appends system status vectors.",
  },
  {
    name: "duration",
    type: "number",
    default: "5000",
    description:
      "Milliseconds to wait before automated eviction. Feed 'Infinity' to force absolute persistence.",
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

export default function ToastDocsPage() {
  return (
    <ToastProvider>
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
                  label: "Overlay Triggers",
                  href: "/docs/components#overlays",
                },
                {
                  label: "Toast Notifications",
                  href: "/docs/components/overlays/toast",
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
              <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
                <IconSparkles stroke={2} className="h-4 w-4" />
              </div>
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
    </ToastProvider>
  );
}
