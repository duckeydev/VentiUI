"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconLayoutGrid,
  IconArrowRight,
  IconSparkles,
  IconCloudDownload,
} from "@tabler/icons-react";

import { Button } from "@/components/button";
import {
  DocsBreadcrumbs,
  DocsOutline,
  DocsPageFrame,
  DocsPanel,
} from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import { Badge } from "@/components";
import { TableColumn, Table } from "@/components/table";
import CodeBlock from "@/app/components/codeblock";

const componentMeta = {
  title: "Button",
  description:
    "A button component with multiple variants and states.",
  version: "v1.1.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/button.tsx",

  category: "base-components",
  apiDescription: "The Button component provides a versatile UI primitive.",
};

type ButtonVariantType =
  | "modern"
  | "minimal"
  | "glass"
  | "macos"
  | "destructive";

const apiProperties = [
  {
    name: "variant",
    type: "'modern' | 'minimal' | 'glass' | 'macos' | 'destructive'",
    default: "'modern'",
    description:
      "Determines the background canvas depth layer, hover states, and structural border tokens.",
  },
  {
    name: "size",
    type: "'xs' | 'sm' | 'default' | 'lg' | 'icon'",
    default: "'default'",
    description:
      "Adjusts structural height variables, tracking gaps, inner paddings, and typographic sizes.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description:
      "Forces a disabled state while mounting a loading spinner and switching accessibility indicators.",
  },
  {
    name: "leftIcon / rightIcon",
    type: "React.ReactNode",
    default: "undefined",
    description:
      "Optional visual icons that auto-translate outward on button hover states.",
  },
];

const examples = [
  {
    id: "icons",
    title: "Icons",
    description: "",
    code: `<Button variant="modern" rightIcon={<IconArrowRight />}>
  Get Started
</Button>`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-xl bg-card/40 flex items-center justify-center min-h-[120px] text-sm text-muted-foreground">
        Live preview
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

export default function ButtonDocsPage() {
  const [activeVariant, setActiveVariant] =
    useState<ButtonVariantType>("modern");
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);

  const playgroundCode = `<Button variant="${activeVariant}" size="default">
  Execute Action
</Button>`;

  const iconsCode = `<Button variant="modern" rightIcon={<IconArrowRight />}>
  Get Started
</Button>`;

  const loadingCode = `<Button loading={${isLoadingDemo}} onClick={() => triggerRequest()}>
  Deploy Changes
</Button>`;

  const rightBarItems = [
    { label: "Interactive Playground", href: "#playground" },
    { label: "Icon Enhancements", href: "#icons" },
    { label: "Asynchronous States", href: "#loading" },
    { label: "Properties API", href: "#props-api" },
  ];

  return (
    <DocsPageFrame
      leftBar={
        <aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-border/40">
          <DocsSidebar />
        </aside>
      }
      rightBar={<DocsOutline title="On this page" items={rightBarItems} />}
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
                href: "/docs/components/base-components/button",
              },
            ]}
          />

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
              {componentMeta.title}
            </h1>
            <Badge variant="modern" size="sm" className="mt-2">
              {componentMeta.version}
            </Badge>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            {componentMeta.description}
          </p>        </div>

        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconLayoutGrid stroke={2} className="h-4 w-4" />
            </div>
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
