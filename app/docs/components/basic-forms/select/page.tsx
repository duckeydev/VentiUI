"use client";

import { useState } from "react";
import { IconExternalLink } from "@tabler/icons-react";

import { Select } from "@/components/select";
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
  title: "Select",
  description:
    "A keyboard-navigable dropdown selection control with animated portal rendering, listbox semantics, multiple visual variants, and error state support.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/select.tsx",
  category: "basic-forms",
  apiDescription: "The Select component provides a controlled/ uncontrolled dropdown with full keyboard navigation.",
};

const regionOptions = [
  { value: "us-east", label: "US East (N. Virginia)" },
  { value: "us-west", label: "US West (Oregon)" },
  { value: "eu-west", label: "EU West (Ireland)" },
  { value: "eu-central", label: "EU Central (Frankfurt)" },
  { value: "ap-south", label: "Asia Pacific (Mumbai)" },
  { value: "ap-southeast", label: "Asia Pacific (Singapore)" },
  { value: "sa-east", label: "South America (Sao Paulo)" },
];

const examples = [
  {
    id: "basic-usage",
    title: "Basic Select",
    description:
      "A simple select with label, placeholder, and a list of options. Click to open and select via click or keyboard.",
    code: `<Select
  label="Region"
  placeholder="Choose a region..."
  options={[
    { value: "us-east", label: "US East" },
    { value: "eu-west", label: "EU West" },
    { value: "ap-south", label: "Asia Pacific" },
  ]}
/>`,
    render: () => (
      <div className="w-full max-w-sm">
        <Select
          label="Region"
          placeholder="Choose a deployment region..."
          options={regionOptions.slice(0, 4)}
        />
      </div>
    ),
  },
  {
    id: "controlled",
    title: "Controlled Select",
    description:
      "Use <code>value</code> and <code>onChange</code> to manage the selected value from parent state.",
    code: `const [region, setRegion] = useState("us-east");

<Select
  label="Region"
  options={options}
  value={region}
  onChange={setRegion}
/>`,
    render: () => {
      const [region, setRegion] = useState("us-east");
      return (
        <div className="w-full max-w-sm space-y-3">
          <Select
            label="Primary Region"
            options={regionOptions}
            value={region}
            onChange={setRegion}
          />
          <p className="text-xs text-muted-foreground font-mono">
            Selected: {region}
          </p>
        </div>
      );
    },
  },
  {
    id: "glass-variant",
    title: "Glass Variant",
    description:
      "A frosted glass aesthetic with backdrop blur on both the trigger and the dropdown list.",
    code: `<Select
  variant="glass"
  label="Region"
  options={options}
/>`,
    render: () => (
      <div className="w-full max-w-sm">
        <Select
          variant="glass"
          label="Region"
          placeholder="Select a region..."
          options={regionOptions.slice(0, 4)}
        />
      </div>
    ),
  },
  {
    id: "notion-variant",
    title: "Notion Variant",
    description:
      "A flat, minimal style matching Notion's design language with subtle borders and no shadow.",
    code: `<Select
  variant="notion"
  label="Region"
  options={options}
/>`,
    render: () => (
      <div className="w-full max-w-sm">
        <Select
          variant="notion"
          label="Region"
          placeholder="Select a region..."
          options={regionOptions.slice(0, 4)}
        />
      </div>
    ),
  },
  {
    id: "error-state",
    title: "Error State",
    description:
      "Pass an <code>error</code> string to show destructive border styling and an animated error message below the trigger.",
    code: `<Select
  label="Region"
  options={options}
  error="Please select a valid deployment region."
/>`,
    render: () => (
      <div className="w-full max-w-sm">
        <Select
          label="Region"
          placeholder="Select..."
          options={regionOptions.slice(0, 3)}
          error="Please select a valid deployment region."
        />
      </div>
    ),
  },
  {
    id: "disabled",
    title: "Disabled State",
    description:
      "Set <code>disabled</code> to prevent interaction. The trigger appears faded and cannot be opened.",
    code: `<Select
  label="Region"
  disabled
  options={[]}
/>`,
    render: () => (
      <div className="w-full max-w-sm space-y-4">
        <Select
          label="Environment"
          value="production"
          options={[{ value: "production", label: "Production" }]}
          disabled
        />
        <Select
          label="Region"
          placeholder="Unavailable during maintenance"
          disabled
          options={[]}
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
    type: "'default' | 'glass' | 'notion'",
    default: "'default'",
    description: "Controls the visual style of both the trigger button and dropdown list.",
  },
  {
    name: "label",
    type: "string",
    default: "undefined",
    description: "Label rendered above the select trigger button.",
  },
  {
    name: "placeholder",
    type: "string",
    default: "'Select an option...'",
    description: "Fallback text when no option is currently selected.",
  },
  {
    name: "options",
    type: "SelectOption[]",
    default: "required",
    description: "Array of value-label pairs rendered as listbox options.",
  },
  {
    name: "value",
    type: "string",
    default: "undefined",
    description: "Controlled selected value for the select control.",
  },
  {
    name: "defaultValue",
    type: "string",
    default: "undefined",
    description: "Uncontrolled initial selected value on first render.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    default: "undefined",
    description: "Callback triggered when an option is selected.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the trigger and prevents listbox expansion.",
  },
  {
    name: "error",
    type: "string",
    default: "undefined",
    description: "Error message rendered below the trigger with destructive styling.",
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

export default function SelectDocsPage() {
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
              { label: componentMeta.title, href: "/docs/components/basic-forms/select" },
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
                Properties accepted by the dropdown selection control.
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
