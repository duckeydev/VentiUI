"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconDeviceMobile,
  IconDeviceTablet,
  IconLayoutGrid,
  IconNetwork,
  IconShieldLock,
} from "@tabler/icons-react";

import { DeviceMockup } from "@/components/devices";
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
  title: "Device Mockup",
  description:
    "Hardware frame mockups for showcasing UIs.",
  version: "v1.1.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/device-mockup.tsx",

  category: "base-components",
  apiDescription:
    "The Device Mockup component provides a versatile UI primitive.",
};

const apiProperties = [
  {
    name: "type",
    type: "'phone' | 'tablet'",
    default: "'phone'",
    description:
      "Configures the external structural bezel parameters and structural factor dimensions.",
  },
  {
    name: "animate",
    type: "boolean",
    default: "true",
    description:
      "Enables hardware-accelerated spring entry transitions when mounting into active view tracks.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description:
      "Standard utility appending parameters straight onto the outer structural hardware chassis frame layer.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "undefined",
    description:
      "Clipped inner frame view hierarchy containing your target app dashboards or interface elements.",
  },
];

const examples = [
  {
    id: "phone",
    title: "Phone",
    description: "",
    code: `<DeviceMockup type="phone">
  <div className="flex flex-col h-full bg-gradient-to-b from-neutral-900 to-black text-white p-5">

    <div className="flex justify-between text-[10px] font-bold opacity-60 mb-6 pt-1">
      <span>09:41</span>
      <div className="flex gap-1"><span>5G</span><span>100%</span></div>
    </div>

    <div className="space-y-4 flex-1 flex flex-col justify-center">
      <div className="h-10 w-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary mx-auto">
        <IconShieldLock className="h-5 w-5" />
      </div>
      <div className="text-center space-y-1">
        <h4 className="text-sm font-bold tracking-tight">Identity Verified</h4>
        <p className="text-[11px] text-muted-foreground max-w-[180px] mx-auto">Biometric session token renewed cleanly.</p>
      </div>
    </div>
  </div>
</DeviceMockup>`,
    render: () => (
      <div className="p-6 border border-border/50 rounded-xl bg-card/40 flex items-center justify-center min-h-[120px] text-sm text-muted-foreground">
        Live preview
      </div>
    ),
  },
  {
    id: "tablet",
    title: "Tablet",
    description: "",
    code: `<DeviceMockup type="tablet">
  <div className="flex h-full bg-neutral-900 text-neutral-100">

    <aside className="w-44 border-r border-neutral-800 bg-neutral-950 p-4 space-y-3">
      <div className="h-5 w-20 rounded bg-neutral-800" />
      <div className="space-y-1.5 pt-2">
        <div className="h-3.5 w-full rounded bg-primary/20 border border-primary/30" />
        <div className="h-3.5 w-3/4 rounded bg-neutral-800" />
        <div className="h-3.5 w-5/6 rounded bg-neutral-800" />
      </div>
    </aside>

    <main className="flex-1 p-5 space-y-4">
      <div className="flex justify-between items-center"><div className="h-6 w-32 rounded bg-neutral-800" /><div className="h-4 w-12 rounded bg-neutral-800" /></div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-24 rounded-xl border border-neutral-800 bg-neutral-950/40 p-3" />
        <div className="h-24 rounded-xl border border-neutral-800 bg-neutral-950/40 p-3" />
        <div className="h-24 rounded-xl border border-neutral-800 bg-neutral-950/40 p-3" />
      </div>
    </main>
  </div>
</DeviceMockup>`,
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

export default function DevicesDocsPage() {
  const phoneCode = `<DeviceMockup type="phone">
  <div className="flex flex-col h-full bg-gradient-to-b from-neutral-900 to-black text-white p-5">

    <div className="flex justify-between text-[10px] font-bold opacity-60 mb-6 pt-1">
      <span>09:41</span>
      <div className="flex gap-1"><span>5G</span><span>100%</span></div>
    </div>

    <div className="space-y-4 flex-1 flex flex-col justify-center">
      <div className="h-10 w-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary mx-auto">
        <IconShieldLock className="h-5 w-5" />
      </div>
      <div className="text-center space-y-1">
        <h4 className="text-sm font-bold tracking-tight">Identity Verified</h4>
        <p className="text-[11px] text-muted-foreground max-w-[180px] mx-auto">Biometric session token renewed cleanly.</p>
      </div>
    </div>
  </div>
</DeviceMockup>`;

  const tabletCode = `<DeviceMockup type="tablet">
  <div className="flex h-full bg-neutral-900 text-neutral-100">

    <aside className="w-44 border-r border-neutral-800 bg-neutral-950 p-4 space-y-3">
      <div className="h-5 w-20 rounded bg-neutral-800" />
      <div className="space-y-1.5 pt-2">
        <div className="h-3.5 w-full rounded bg-primary/20 border border-primary/30" />
        <div className="h-3.5 w-3/4 rounded bg-neutral-800" />
        <div className="h-3.5 w-5/6 rounded bg-neutral-800" />
      </div>
    </aside>

    <main className="flex-1 p-5 space-y-4">
      <div className="flex justify-between items-center"><div className="h-6 w-32 rounded bg-neutral-800" /><div className="h-4 w-12 rounded bg-neutral-800" /></div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-24 rounded-xl border border-neutral-800 bg-neutral-950/40 p-3" />
        <div className="h-24 rounded-xl border border-neutral-800 bg-neutral-950/40 p-3" />
        <div className="h-24 rounded-xl border border-neutral-800 bg-neutral-950/40 p-3" />
      </div>
    </main>
  </div>
</DeviceMockup>`;

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
            { label: "Phone Viewport", href: "#phone-viewport" },
            { label: "Tablet Viewport", href: "#tablet-viewport" },
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
                label: "Showcase Primitives",
                href: "/docs/components#showcase",
              },
              {
                label: "Device Mockup",
                href: "/docs/components/device-mockup",
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

        <section id="phone-viewport" className="space-y-3 scroll-mt-20">
          <div className="flex items-center gap-2">
            <IconDeviceMobile className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              Phone Showcase Viewport
            </h3>
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Renders a standard compact layout, complete with dynamic volume
            buttons, a camera array cutout, and a persistent home indicator
            tracking line.
          </p>
        </section>

        <section id="tablet-viewport" className="space-y-3 scroll-mt-20">
          <div className="flex items-center gap-2">
            <IconDeviceTablet className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              Tablet Showcase Viewport
            </h3>
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Provides a wide orientation matrix frame, making it ideal for layout
            verification across desktop-lite grids or administrative system
            tools.
          </p>
        </section>

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
