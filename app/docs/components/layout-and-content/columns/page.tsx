"use client";

import React from "react";
import { Badge } from "@/components";
import { Grid, Column } from "@/components/column";
import {
  DocsBreadcrumbs,
  DocsOutline,
  DocsPageFrame,
  DocsPanel,
} from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import CodeBlock from "@/app/components/codeblock";

const componentMeta = {
  title: "Column & Grid",
  description:
    "A responsive 12-column grid layout.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/column.tsx",
};

const examples = [
  {
    id: "basic",
    title: "12-Column Track Basics",
    description:
      "A simple example showing the default grid behavior.",
    code: `<Grid gap="md">
  <Column span={4}>One Third Block</Column>
  <Column span={8}>Two Thirds Block</Column>
</Grid>`,
    render: () => (
      <div className="w-full bg-muted/10 p-4 rounded-xl border border-border/40">
        <Grid gap="sm">
          <Column span={4}>
            <div className="bg-primary/5 border border-primary/20 text-primary p-4 rounded-lg text-center text-xs font-mono font-bold">
              span={4}
            </div>
          </Column>
          <Column span={8}>
            <div className="bg-primary/5 border border-primary/20 text-primary p-4 rounded-lg text-center text-xs font-mono font-bold">
              span={8}
            </div>
          </Column>
        </Grid>
      </div>
    ),
  },
  {
    id: "responsive",
    title: "Responsive Breakpoint Inheritances",
    description:
      "See how the layout responds to different widths.",
    code: `<Grid gap="md">
  <Column span={12} md={6} lg={3}>Card A</Column>
  <Column span={12} md={6} lg={3}>Card B</Column>
</Grid>`,
    render: () => (
      <div className="w-full bg-muted/10 p-4 rounded-xl border border-border/40">
        <Grid gap="sm">
          {[1, 2, 3, 4].map((i) => (
            <Column key={i} span={12} md={6} lg={3}>
              <div className="bg-indigo-500/5 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 p-4 rounded-lg text-center text-xs font-mono font-bold">
                span=12 md=6 lg=3
              </div>
            </Column>
          ))}
        </Grid>
      </div>
    ),
  },
  {
    id: "gaps",
    title: "Visual Gutter Scaling",
    description:
      "Try different gap sizes between columns.",
    code: `<Grid gap="xl">
  <Column span={6}>Left Block Element</Column>
  <Column span={6}>Right Block Element</Column>
</Grid>`,
    render: () => (
      <div className="w-full bg-muted/10 p-4 rounded-xl border border-border/40">
        <Grid gap="xl">
          <Column span={6}>
            <div className="bg-amber-500/5 border border-amber-500/20 text-amber-600 p-4 rounded-lg text-center text-xs font-mono">
              Extra Large Gap
            </div>
          </Column>
          <Column span={6}>
            <div className="bg-amber-500/5 border border-amber-500/20 text-amber-600 p-4 rounded-lg text-center text-xs font-mono">
              Extra Large Gap
            </div>
          </Column>
        </Grid>
      </div>
    ),
  },
];

const apiProperties = [
  {
    name: "gap",
    type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description:
      "Alters the internal row/column separation tracks gutter spacing metrics on the main Grid wrapper.",
  },
  {
    name: "span",
    type: "ColumnSpan (1-12 | 'auto' | 'full')",
    default: '"full"',
    description:
      "Fallback standard mobile or uniform breakpoint span constraint value.",
  },
  {
    name: "md",
    type: "ColumnSpan",
    default: "-",
    description:
      "The span scale calculation initialized at the medium layout viewport layer (768px+).",
  },
  {
    name: "lg",
    type: "ColumnSpan",
    default: "-",
    description:
      "The span scale calculation initialized at the large layout viewport layer (1024px+).",
  },
];

export default function ColumnDocsPage() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [activeTabs, setActiveTabs] = React.useState<
    Record<string, "preview" | "code">
  >({
    basic: "preview",
    responsive: "preview",
    gaps: "preview",
  });

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
                label: "Base Components",
                href: "/docs/components#base-components",
              },
              {
                label: componentMeta.title,
                href: "/docs/components/base-components/columns",
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

        <div className="space-y-14">
          {examples.map((example) => (
            <CodeBlock key={example.id} example={example} />
          ))}
        </div>

        <section id="props-api" className="space-y-6 scroll-mt-20 pt-4">
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

          <DocsPanel className="overflow-hidden border border-border/40 bg-card/5 rounded-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/50 font-semibold text-muted-foreground">
                    <th className="w-[20%] p-4 font-bold uppercase tracking-wider">
                      Property
                    </th>
                    <th className="w-[30%] p-4 font-bold uppercase tracking-wider">
                      Type
                    </th>
                    <th className="w-[15%] p-4 font-bold uppercase tracking-wider">
                      Default
                    </th>
                    <th className="w-[35%] p-4 font-bold uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 font-medium">
                  {apiProperties.map((prop) => (
                    <tr
                      key={prop.name}
                      className="transition-colors hover:bg-muted/30"
                    >
                      <td className="p-4 font-mono font-bold text-primary">
                        {prop.name}
                      </td>
                      <td className="p-4 font-mono text-[10px] text-muted-foreground leading-relaxed">
                        {prop.type}
                      </td>
                      <td className="p-4 font-mono text-foreground/70 italic">
                        {prop.default}
                      </td>
                      <td className="p-4 font-normal leading-relaxed text-muted-foreground">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
