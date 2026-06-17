"use client";

import { useState } from "react";
import { IconExternalLink } from "@tabler/icons-react";

import { Switch } from "@/components/switch";
import { Badge } from "@/components";
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

const componentMeta = {
  title: "Switch",
  description:
    "A tactile toggle control with spring-animated thumb motion, aria-switch semantics, contextual labeling support, and multiple visual variants.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/switch.tsx",
  category: "basic-forms",
  apiDescription: "The Switch component provides a controlled/ uncontrolled boolean toggle with spring physics.",
};

const examples = [
  {
    id: "basic-usage",
    title: "Basic Usage",
    description:
      "A simple switch with label and description. The thumb animates with spring physics on toggle.",
    code: `<Switch
  label="Enable notifications"
  description="Receive real-time alerts via push."
  defaultChecked
/>`,
    render: () => (
      <div className="w-full max-w-sm space-y-4">
        <Switch
          label="Enable notifications"
          description="Receive real-time alerts via push."
          defaultChecked
        />
        <Switch
          label="Dark mode"
          description="Switch to a darker color scheme."
        />
      </div>
    ),
  },
  {
    id: "controlled",
    title: "Controlled Switch",
    description:
      "Use <code>checked</code> and <code>onCheckedChange</code> to manage the toggle state from parent state.",
    code: `const [enabled, setEnabled] = useState(false);

<Switch
  checked={enabled}
  onCheckedChange={setEnabled}
  label="Real-time sync"
  description="Push updates to connected clients immediately."
/>`,
    render: () => {
      const [enabled, setEnabled] = useState(false);
      return (
        <div className="w-full max-w-sm space-y-3">
          <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
            label="Real-time sync"
            description="Push updates to connected clients immediately."
          />
          <p className="text-xs text-muted-foreground font-mono">
            State: {enabled ? "enabled" : "disabled"}
          </p>
        </div>
      );
    },
  },
  {
    id: "glass-variant",
    title: "Glass Variant",
    description:
      "A frosted glass style with backdrop blur and translucent backgrounds for modern UI overlays.",
    code: `<Switch
  variant="glass"
  label="Glass toggle"
  description="Frosted glass aesthetic."
  defaultChecked
/>`,
    render: () => (
      <div className="w-full max-w-sm">
        <Switch
          variant="glass"
          label="Glass mode"
          description="Frosted glass aesthetic with backdrop blur."
          defaultChecked
        />
      </div>
    ),
  },
  {
    id: "notion-variant",
    title: "Notion Variant",
    description:
      "A flat, minimal style matching Notion's design with neutral backgrounds and a blue accent when active.",
    code: `<Switch
  variant="notion"
  label="Notion toggle"
  description="Flat design matching Notion's style."
  defaultChecked
/>`,
    render: () => (
      <div className="w-full max-w-sm">
        <Switch
          variant="notion"
          label="Notion style"
          description="Flat design matching Notion's UI language."
          defaultChecked
        />
      </div>
    ),
  },
  {
    id: "disabled",
    title: "Disabled State",
    description:
      "Set <code>disabled</code> to prevent interaction. The switch appears faded and the thumb cannot move.",
    code: `<div className="space-y-3">
  <Switch disabled label="Locked setting" description="Unavailable." />
  <Switch disabled checked label="Always on" description="Permanent." />
</div>`,
    render: () => (
      <div className="w-full max-w-sm space-y-4">
        <Switch
          disabled
          label="Beta features"
          description="This setting requires admin access."
        />
        <Switch
          disabled
          checked
          label="Two-factor authentication"
          description="Enforced by organization policy."
        />
      </div>
    ),
  },
  {
    id: "multiple-switches",
    title: "Multiple Switches",
    description:
      "Use multiple switches together to create a settings panel with independent toggles.",
    code: `<div className="space-y-4">
  <Switch label="Email alerts" description="Receive email notifications." defaultChecked />
  <Switch label="Push notifications" description="Browser push alerts." defaultChecked />
  <Switch label="SMS alerts" description="Text message updates." />
  <Switch label="Weekly digest" description="Weekly summary email." defaultChecked />
</div>`,
    render: () => (
      <div className="w-full max-w-sm space-y-5">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notification Preferences</p>
          <div className="space-y-3">
            <Switch label="Email alerts" description="Receive email for account activity." defaultChecked />
            <Switch label="Push notifications" description="Browser and mobile push alerts." defaultChecked />
            <Switch label="SMS alerts" description="Text message for critical updates." />
            <Switch label="Weekly digest" description="Summary of the week's activity." defaultChecked />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Privacy</p>
          <div className="space-y-3">
            <Switch label="Profile visibility" description="Make your profile public." defaultChecked />
            <Switch label="Activity status" description="Show when you are online." />
          </div>
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
    name: "variant",
    type: "'default' | 'glass' | 'notion'",
    default: "'default'",
    description: "Controls the visual style of the switch track background.",
  },
  {
    name: "checked",
    type: "boolean",
    default: "undefined",
    description: "Controlled checked state of the switch toggle.",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    default: "false",
    description: "Uncontrolled initial checked state on first render.",
  },
  {
    name: "onCheckedChange",
    type: "(checked: boolean) => void",
    default: "undefined",
    description: "Callback triggered when the toggle state changes.",
  },
  {
    name: "label",
    type: "React.ReactNode",
    default: "undefined",
    description: "Primary label rendered beside the switch control. Clickable.",
  },
  {
    name: "description",
    type: "React.ReactNode",
    default: "undefined",
    description: "Secondary helper text rendered below the label.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction and applies reduced opacity styling.",
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

export default function SwitchDocsPage() {
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
              { label: "Basic Forms", href: "/docs/components#basic-forms" },
              { label: componentMeta.title, href: "/docs/components/basic-forms/switch" },
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
              <p className="text-xs text-muted-foreground">
                Properties accepted by the toggle switch control primitive.
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
          &copy; 2026 Venti UI Labs. UI made right.
        </footer>
      </main>
    </DocsPageFrame>
  );
}
