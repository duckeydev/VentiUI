"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconCategory,
  IconSparkles,
  IconSettings,
  IconTrash,
  IconShieldCheck,
  IconHeart,
} from "@tabler/icons-react";

import { StyledIcon } from "@/components/styledIcon";
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
  title: "Styled Icon Box",
  description:
    "Icon containers with background variants.",
  version: "v1.1.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/styled-icon.tsx",

  category: "base-components",
  apiDescription:
    "The Styled Icon Box component provides a versatile UI primitive.",
};

const examples = [
  {
    id: "variant-matrix",
    title: "Aesthetic Variants Matrix",
    description:
      "Four different icon container styles to choose from.",
    code: `<div className="flex flex-wrap gap-4">
  <StyledIcon icon={<IconSettings />} variant="solid" color="primary" />
  <StyledIcon icon={<IconSettings />} variant="outline" color="primary" />
  <StyledIcon icon={<IconSettings />} variant="ghost" color="primary" />
  <StyledIcon icon={<IconSettings />} variant="glass" color="primary" />
</div>`,
    render: () => (
      <div className="flex flex-wrap items-center justify-center gap-4 p-6 border border-border/50 rounded-2xl w-full max-w-md bg-card/40 backdrop-blur-sm">
        <StyledIcon icon={<IconSettings />} variant="solid" color="primary" />
        <StyledIcon icon={<IconSettings />} variant="outline" color="primary" />
        <StyledIcon icon={<IconSettings />} variant="ghost" color="primary" />
        <StyledIcon icon={<IconSettings />} variant="glass" color="primary" />
      </div>
    ),
  },
  {
    id: "color-semantic-scales",
    title: "Semantic Color Contexts",
    description:
      "Icons adapt to semantic color contexts.",
    code: `<div className="flex items-center gap-4">
  <StyledIcon icon={<IconShieldCheck />} color="primary" variant="glass" />
  <StyledIcon icon={<IconHeart />} color="secondary" variant="solid" />
  <StyledIcon icon={<IconTrash />} color="destructive" variant="ghost" />
  <StyledIcon icon={<IconSettings />} color="muted" variant="outline" />
</div>`,
    render: () => (
      <div className="flex items-center justify-around gap-4 p-6 border border-border/40 rounded-xl bg-card/20 w-full max-w-md">
        <div className="flex flex-col items-center gap-1">
          <StyledIcon
            icon={<IconShieldCheck />}
            color="primary"
            variant="glass"
          />
          <span className="text-[10px] font-mono text-muted-foreground">
            primary
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <StyledIcon icon={<IconHeart />} color="secondary" variant="solid" />
          <span className="text-[10px] font-mono text-muted-foreground">
            secondary
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <StyledIcon
            icon={<IconTrash />}
            color="destructive"
            variant="ghost"
          />
          <span className="text-[10px] font-mono text-muted-foreground">
            destructive
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <StyledIcon icon={<IconSettings />} color="muted" variant="outline" />
          <span className="text-[10px] font-mono text-muted-foreground">
            muted
          </span>
        </div>
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

const apiProperties: ApiProperty[] = [
  {
    name: "icon",
    type: "React.ReactNode",
    default: "required",
    description:
      "The interface vector or icon component node to clean up and inject into the scaling mask.",
  },
  {
    name: "variant",
    type: "'solid' | 'outline' | 'ghost' | 'glass'",
    default: "'ghost'",
    description:
      "Dictates the basic background layering architecture and opacity configurations.",
  },
  {
    name: "color",
    type: "'primary' | 'secondary' | 'destructive' | 'muted'",
    default: "'primary'",
    description:
      "Applies targeted semantic palette matrices across the component's fill and stroke states.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description:
      "Configures parent box framing proportions while updating layout dimensions via structural variables.",
  },
  {
    name: "roundness",
    type: "'none' | 'md' | 'full'",
    default: "'md'",
    description:
      "Controls border-radius constraints along the outer edges of the wrapper asset box.",
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

export default function StyledIconDocsPage() {
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
              {
                label: "Design Primitives",
                href: "/docs/components#primitives",
              },
              {
                label: "Styled Icon Box",
                href: "/docs/components/primitives/styled-icon",
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
  );
}
