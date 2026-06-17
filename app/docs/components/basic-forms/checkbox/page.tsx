"use client";

import { useState } from "react";
import { IconExternalLink } from "@tabler/icons-react";

import { Checkbox } from "@/components/checkbox";
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
import { Button } from "@/components/button";

const componentMeta = {
  title: "Checkbox",
  description:
    "A binary selection control with indeterminate state support, animated checkmark transitions, accessible labeling, and error state handling.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/checkbox.tsx",
  category: "basic-forms",
  apiDescription: "The Checkbox component provides a controlled/ uncontrolled binary input with indeterminate support.",
};

const examples = [
  {
    id: "basic-usage",
    title: "Basic Usage",
    description:
      "A simple checkbox with label and description. The label is clickable and the checkbox animates on state change.",
    code: `<div className="space-y-3">
  <Checkbox
    label="Accept terms and conditions"
    description="You must agree before proceeding."
  />
  <Checkbox
    label="Subscribe to newsletter"
    description="Receive weekly updates about product changes."
  />
</div>`,
    render: () => (
      <div className="w-full max-w-sm space-y-4">
        <Checkbox
          label="Accept terms and conditions"
          description="You must agree before proceeding."
        />
        <Checkbox
          label="Subscribe to newsletter"
          description="Receive weekly updates about product changes."
        />
      </div>
    ),
  },
  {
    id: "controlled",
    title: "Controlled State",
    description:
      "Control the checked state externally. The parent component manages the value and responds to changes.",
    code: `const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onCheckedChange={setChecked}
  label="Enable dark mode"
  description="Toggle the application theme."
/>`,
    render: () => {
      const [checked, setChecked] = useState(false);
      return (
        <div className="w-full max-w-sm space-y-3">
          <Checkbox
            checked={checked}
            onCheckedChange={setChecked}
            label="Enable dark mode"
            description="Toggle the application theme."
          />
          <p className="text-xs text-muted-foreground font-mono">
            State: {checked ? "checked" : "unchecked"}
          </p>
        </div>
      );
    },
  },
  {
    id: "indeterminate",
    title: "Indeterminate State",
    description:
      "Use the <code>indeterminate</code> prop to represent a mixed selection state, commonly used in tree or list headers.",
    code: `<Checkbox
  indeterminate
  label="Select all"
  description="Some items are selected."
/>`,
    render: () => {
      const [indeterminate, setIndeterminate] = useState(true);
      const [allChecked, setAllChecked] = useState(false);
      return (
        <div className="w-full max-w-sm space-y-4">
          <Checkbox
            indeterminate={indeterminate}
            checked={allChecked}
            onCheckedChange={(v) => {
              setAllChecked(v);
              if (indeterminate) setIndeterminate(false);
            }}
            label="Select all items"
            description="Bulk selection for batch operations."
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setIndeterminate(!indeterminate);
              if (allChecked) setAllChecked(false);
            }}
          >
            {indeterminate ? "Clear indeterminate" : "Set indeterminate"}
          </Button>
        </div>
      );
    },
  },
  {
    id: "error-state",
    title: "Error State",
    description:
      "Pass an <code>error</code> string to show destructive styling and an animated error message below the checkbox.",
    code: `<Checkbox
  label="I agree to the terms"
  error="You must accept the terms to continue."
/>`,
    render: () => (
      <div className="w-full max-w-sm space-y-4">
        <Checkbox
          label="I agree to the terms of service"
          description="Please read the terms carefully."
          error="You must accept the terms to continue."
        />
        <Checkbox
          label="I agree to the privacy policy"
          description="Data handling and processing terms."
        />
      </div>
    ),
  },
  {
    id: "disabled",
    title: "Disabled State",
    description:
      "Set the <code>disabled</code> prop to prevent interaction and apply reduced opacity styling.",
    code: `<div className="space-y-3">
  <Checkbox label="Editable option" description="You can toggle this." />
  <Checkbox disabled label="Locked setting" description="This option is unavailable." />
  <Checkbox disabled checked label="Already applied" description="Permanent setting." />
</div>`,
    render: () => (
      <div className="w-full max-w-sm space-y-4">
        <Checkbox
          label="Email notifications"
          description="Receive email alerts for account activity."
        />
        <Checkbox
          disabled
          label="SMS notifications"
          description="This feature requires phone verification."
        />
        <Checkbox
          disabled
          checked
          label="Terms of service"
          description="Accepted on January 15, 2025."
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
    name: "checked",
    type: "boolean",
    default: "undefined",
    description: "Controlled checked state of the checkbox.",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    default: "undefined",
    description: "Uncontrolled initial checked state on first render.",
  },
  {
    name: "indeterminate",
    type: "boolean",
    default: "false",
    description: "Visual indeterminate state for mixed selection in tree or list headers.",
  },
  {
    name: "onCheckedChange",
    type: "(checked: boolean) => void",
    default: "undefined",
    description: "Callback triggered when the checkbox state changes.",
  },
  {
    name: "label",
    type: "React.ReactNode",
    default: "undefined",
    description: "Primary label rendered beside the checkbox control. Clickable.",
  },
  {
    name: "description",
    type: "React.ReactNode",
    default: "undefined",
    description: "Secondary helper text rendered below the label.",
  },
  {
    name: "error",
    type: "string",
    default: "undefined",
    description: "Error message rendered with destructive styling and animated entrance.",
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

export default function CheckboxDocsPage() {
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
              { label: componentMeta.title, href: "/docs/components/basic-forms/checkbox" },
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
                Properties accepted by the binary selection control.
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
