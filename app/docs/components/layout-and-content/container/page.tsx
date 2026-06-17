"use client";

import React from "react";
import { Badge } from "@/components";
import {
  DocsBreadcrumbs,
  DocsOutline,
  DocsPageFrame,
  DocsPanel,
} from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import CodeBlock from "@/app/components/codeblock";

const Container = ({
  children,
  fluid = false,
  clean = false,
  size = "lg",
  className = "",
}: {
  children: React.ReactNode;
  fluid?: boolean;
  clean?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}) => {
  const sizeClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
  };

  return (
    <div
      className={`w-full mx-auto ${clean ? "" : "px-4 sm:px-6 lg:px-8"} ${
        fluid ? "max-w-full" : sizeClasses[size]
      } ${className}`}
    >
      {children}
    </div>
  );
};

const componentMeta = {
  title: "Container",
  description:
    "Centers and constrains content within a max-width container.",
  version: "v1.0.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/container.tsx",
};

const examples = [
  {
    id: "default",
    title: "Default Container",
    description:
      "Try adjusting the container size controls below.",
    code: `<Container size="lg">
  <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center text-sm font-medium text-primary">
    Responsive Fixed Content Box
  </div>
</Container>`,
    render: () => (
      <div className="w-full bg-muted/10 p-2 rounded-xl border border-border/40">
        <Container size="lg">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center text-sm font-medium text-primary">
            Centered Constrained Layout (Max-Width: 1024px)
          </div>
        </Container>
      </div>
    ),
  },
  {
    id: "fluid",
    title: "Fluid Width",
    description:
      "A full-width container that spans the entire viewport.",
    code: `<Container fluid>
  <div className="bg-secondary/40 border border-border/80 rounded-xl p-6 text-center text-sm font-medium text-foreground">
    Full-width Fluid Block
  </div>
</Container>`,
    render: () => (
      <div className="w-full bg-muted/10 p-2 rounded-xl border border-border/40">
        <Container fluid>
          <div className="bg-secondary/40 border border-border/80 rounded-xl p-6 text-center text-sm font-medium text-foreground">
            100% Width Edge-to-Edge Fluid Area
          </div>
        </Container>
      </div>
    ),
  },
  {
    id: "sizes",
    title: "Container Sizes",
    description:
      "Choose between different max-width presets.",
    code: `<Container size="sm">Small Content</Container>
<Container size="xl">Extra Large Content</Container>`,
    render: () => (
      <div className="w-full space-y-3 bg-muted/10 p-4 rounded-xl border border-border/40">
        <Container size="sm">
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 text-center text-xs font-mono text-amber-600 dark:text-amber-400">
            size="sm" (Max: 640px)
          </div>
        </Container>
        <Container size="md">
          <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-3 text-center text-xs font-mono text-indigo-600 dark:text-indigo-400">
            size="md" (Max: 768px)
          </div>
        </Container>
        <Container size="xl">
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 text-center text-xs font-mono text-emerald-600 dark:text-emerald-400">
            size="xl" (Max: 1280px)
          </div>
        </Container>
      </div>
    ),
  },
  {
    id: "clean",
    title: "Clean Mode",
    description:
      "Removes horizontal padding for flush edge alignment.",
    code: `<Container clean size="lg">
  <div className="w-full bg-destructive/5 text-destructive border border-destructive/20 p-4 rounded-lg text-xs font-semibold">
    No Default Padding Applied
  </div>
</Container>`,
    render: () => (
      <div className="w-full bg-muted/10 p-2 rounded-xl border border-border/40">
        <Container clean size="lg">
          <div className="w-full bg-destructive/5 text-destructive border border-destructive/20 p-4 rounded-lg text-center text-xs font-semibold">
            Padding Removed (Flush Edge alignment)
          </div>
        </Container>
      </div>
    ),
  },
];

const apiProperties = [
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl" | "2xl"',
    default: '"lg"',
    description:
      "Defines the max-width bounds configuration of the component layout block.",
  },
  {
    name: "fluid",
    type: "boolean",
    default: "false",
    description:
      "Overrides preset sizing bounds to lock container layout to width: 100% infinitely.",
  },
  {
    name: "clean",
    type: "boolean",
    default: "false",
    description:
      "Removes default responsive structural side gutters (px fields) from the layout primitive wrapper.",
  },
  {
    name: "className",
    type: "string",
    default: '""',
    description:
      "Additional raw Tailwind or custom CSS fallback style hooks to attach onto the parent DOM element node.",
  },
];

export default function ContainersDocsPage() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [activeTabs, setActiveTabs] = React.useState<
    Record<string, "preview" | "code">
  >({
    default: "preview",
    fluid: "preview",
    sizes: "preview",
    clean: "preview",
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
                href: "/docs/components/base-components/container",
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
