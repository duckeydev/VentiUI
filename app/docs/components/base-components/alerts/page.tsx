"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconSparkles,
} from "@tabler/icons-react";

import { Alert } from "@/components/alert";
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
  title: "Alert",
  description:
    "Displays contextual messages and notifications.",
  version: "v1.2.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/alert.tsx",

  category: "base-components",
  apiDescription: "The Alert component provides a versatile UI primitive.",
};

const examples = [
  {
    id: "variants",
    title: "Variants",
    description:
      "Try clicking the different variant buttons below.",
    code: `<div className="space-y-3 w-full">
  <Alert title="Deployment Update" description="A new deployment iteration was initialized automatically by your web webhook provider pipeline." />
  <Alert variant="info" title="Beta Feature Configured" description="Hardware acceleration metrics can now be tracked in the infrastructure metrics panel tabs." />
  <Alert variant="success" title="Payment Processed" description="Your receipt and premium seat upgrade licenses have been synchronized onto your user record profile." />
  <Alert variant="warning" title="Subscription Expiring" description="Your payment instrument will expire in 48 hours. Please update your billing methods immediately." />
  <Alert variant="destructive" title="Connection Timed Out" description="The edge router cluster failed to return a proper heartbeat payload response. Retrying setup protocol sequence." />
</div>`,
    render: () => (
      <div className="space-y-3 w-full">
        <Alert
          title="Deployment Update"
          description="A new deployment iteration was initialized automatically by your web webhook provider pipeline."
        />
        <Alert
          variant="info"
          title="Beta Feature Configured"
          description="Hardware acceleration metrics can now be tracked in the infrastructure metrics panel tabs."
        />
        <Alert
          variant="success"
          title="Payment Processed"
          description="Your receipt and premium seat upgrade licenses have been synchronized onto your user record profile."
        />
        <Alert
          variant="warning"
          title="Subscription Expiring"
          description="Your payment instrument will expire in 48 hours. Please update your billing methods immediately."
        />
        <Alert
          variant="destructive"
          title="Connection Timed Out"
          description="The edge router cluster failed to return a proper heartbeat payload response. Retrying setup protocol sequence."
        />
      </div>
    ),
  },
  {
    id: "dismissible",
    title: "Dismissible Exit Animations",
    description:
      "Click the close button to see the exit animation.",
    code: `<div className="space-y-3 w-full">
  <Alert 
    exitAnimation="fade-out" 
    title="Fade Out Exit" 
    description="Softly dissolves opacity layers into background vectors over a 300ms timeline step." 
    onClose={() => console.log('faded')} 
  />
  <Alert 
    exitAnimation="slide-out-right" 
    title="Slide Right Exit" 
    description="Transforms horizontal layout metrics to fly off the right side edge during unmounting." 
    onClose={() => console.log('slid-right')} 
  />
  <Alert 
    exitAnimation="slide-out-left" 
    title="Slide Left Exit" 
    description="Transforms horizontal layout metrics to fly off the left side edge during unmounting." 
    onClose={() => console.log('slid-left')} 
  />
</div>`,
    render: () => {
      const [resetKey, setResetKey] = useState(0);

      return (
        <div className="w-full space-y-4">
          <div key={resetKey} className="space-y-3 w-full">
            <Alert
              exitAnimation="fade-out"
              title="Fade Out Exit"
              description="Softly dissolves opacity layers into background vectors over a 300ms timeline step."
              onClose={() => console.log("Fade close handled")}
            />
            <Alert
              exitAnimation="slide-out-right"
              title="Slide Right Exit"
              description="Transforms horizontal layout metrics to fly off the right side edge during unmounting."
              onClose={() => console.log("Slide right close handled")}
            />
            <Alert
              exitAnimation="slide-out-left"
              title="Slide Left Exit"
              description="Transforms horizontal layout metrics to fly off the left side edge during unmounting."
              onClose={() => console.log("Slide left close handled")}
            />
            <Alert
              exitAnimation="none"
              title="Immediate Unmount"
              description="Disappears instantly from the active node tree layout sequence with zero processing delays."
              onClose={() => console.log("None close handled")}
            />
          </div>
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setResetKey((prev) => prev + 1)}
              className="px-3 py-1.5 rounded-md border border-border bg-secondary/50 text-xs font-semibold text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              Reset Exit Animation Previews
            </button>
          </div>
        </div>
      );
    },
  },
  {
    id: "custom-icon",
    title: "Custom Icon Overrides",
    description:
      "Custom icons replace the default alert icon.",
    code: `<Alert 
  icon={<IconSparkles className="h-5 w-5 text-purple-500" />}
  title="AI Optimization Complete"
  description="Vector index embedding structures have been clustered and fully cached to local database targets."
/>`,
    render: () => (
      <div className="w-full">
        <Alert
          icon={<IconSparkles className="h-5 w-5 text-purple-500" />}
          title="AI Optimization Complete"
          description="Vector index embedding structures have been clustered and fully cached to local database targets."
        />
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
    name: "variant",
    type: "'default' | 'info' | 'success' | 'warning' | 'destructive'",
    default: "'default'",
    description:
      "Dictates structural background color combinations and shifts accessible live-region roles dynamically.",
  },
  {
    name: "exitAnimation",
    type: "'fade-out' | 'slide-out-right' | 'slide-out-left' | 'none'",
    default: "'fade-out'",
    description:
      "Configures the specific unmounting visual transition path handled when executing close triggers.",
  },
  {
    name: "title",
    type: "string",
    default: "undefined",
    description:
      "Bold header text emphasizing the primary announcement statement of the alert.",
  },
  {
    name: "description",
    type: "string",
    default: "undefined",
    description:
      "Granular descriptive prose text providing secondary context, warnings, or next steps.",
  },
  {
    name: "icon",
    type: "React.ReactNode",
    default: "Semantic Icon Base",
    description:
      "Overrides default built-in SVG vector elements with a custom asset blueprint.",
  },
  {
    name: "onClose",
    type: "() => void",
    default: "undefined",
    description:
      "Appending a functional callback cleanly structures an absolute accessible dismiss button layout.",
  },
  {
    name: "closeLabel",
    type: "string",
    default: "'Dismiss alert'",
    description:
      "Configures explicit hidden labels exposed to screen reader nodes identifying the target dismiss button action.",
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

export default function ComponentDetailPage() {
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
                label: "Base Components",
                href: "/docs/components#base-components",
              },
              {
                label: componentMeta.title,
                href: "/docs/components/base-components/alerts",
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
