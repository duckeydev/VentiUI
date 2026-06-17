"use client";

import { useState } from "react";
import { IconExternalLink } from "@tabler/icons-react";

import { RadioGroup, Radio } from "@/components/radio";
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
  title: "Radio",
  description:
    "A single-select radio group with keyboard arrow navigation, animated selection indicator, accessible ARIA radiogroup semantics, and error state support.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/radio.tsx",
  category: "basic-forms",
  apiDescription: "The Radio and RadioGroup components provide a controlled/ uncontrolled single-selection set.",
};

const examples = [
  {
    id: "basic-usage",
    title: "Basic Radio Group",
    description:
      "A simple uncontrolled radio group with label and description on each option. Arrow keys navigate between options.",
    code: `<RadioGroup label="Billing Plan" defaultValue="pro">
  <Radio value="free" label="Free" description="Basic features for individuals" />
  <Radio value="pro" label="Pro" description="Advanced analytics and API access" />
  <Radio value="enterprise" label="Enterprise" description="Dedicated support and SLA" />
</RadioGroup>`,
    render: () => (
      <div className="w-full max-w-sm">
        <RadioGroup label="Billing Plan" defaultValue="pro">
          <Radio value="free" label="Free" description="Basic features for individuals" />
          <Radio value="pro" label="Pro" description="Advanced analytics and API access" />
          <Radio value="enterprise" label="Enterprise" description="Dedicated support and SLA" />
        </RadioGroup>
      </div>
    ),
  },
  {
    id: "controlled",
    title: "Controlled Radio Group",
    description:
      "Control the selected value externally with the <code>value</code> and <code>onValueChange</code> props.",
    code: `const [plan, setPlan] = useState("pro");

<RadioGroup label="Billing Plan" value={plan} onValueChange={setPlan}>
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
  <Radio value="enterprise" label="Enterprise" />
</RadioGroup>

<p>Selected: {plan}</p>`,
    render: () => {
      const [plan, setPlan] = useState("starter");
      return (
        <div className="w-full max-w-sm space-y-3">
          <RadioGroup label="Deployment Tier" value={plan} onValueChange={setPlan}>
            <Radio value="starter" label="Starter" description="Single instance, 1 GB RAM" />
            <Radio value="business" label="Business" description="Three instances, 4 GB RAM each" />
            <Radio value="enterprise" label="Enterprise" description="Unlimited instances, custom SLA" />
          </RadioGroup>
          <p className="text-xs text-muted-foreground font-mono">
            Selected: {plan}
          </p>
        </div>
      );
    },
  },
  {
    id: "disabled",
    title: "Disabled State",
    description:
      "Disable the entire group or individual radio options. Disabled radios are skipped during keyboard navigation.",
    code: `<RadioGroup label="Node Version" defaultValue="18">
  <Radio value="16" label="Node 16" description="End of life" disabled />
  <Radio value="18" label="Node 18" description="Active LTS" />
  <Radio value="20" label="Node 20" description="Latest" />
</RadioGroup>`,
    render: () => (
      <div className="w-full max-w-sm space-y-6">
        <RadioGroup label="Node Version" defaultValue="18">
          <Radio value="16" label="Node 16" description="End of life — no longer supported" disabled />
          <Radio value="18" label="Node 18" description="Active LTS with security backports" />
          <Radio value="20" label="Node 20" description="Latest with experimental features" />
        </RadioGroup>
        <RadioGroup label="Region" defaultValue="us" disabled>
          <Radio value="us" label="US East" description="North Virginia" />
          <Radio value="eu" label="EU West" description="Ireland" />
          <Radio value="ap" label="Asia Pacific" description="Singapore" />
        </RadioGroup>
        <p className="text-xs text-muted-foreground font-mono">The region group is fully disabled.</p>
      </div>
    ),
  },
  {
    id: "error-state",
    title: "Error State",
    description:
      "Pass an <code>error</code> prop to individual Radio items to show destructive border styling with an animated error message.",
    code: `<RadioGroup label="Payment Method" defaultValue="card">
  <Radio value="card" label="Credit Card" />
  <Radio value="paypal" label="PayPal" error="PayPal is currently unavailable." />
  <Radio value="crypto" label="Cryptocurrency" />
</RadioGroup>`,
    render: () => (
      <div className="w-full max-w-sm">
        <RadioGroup label="Payment Method" defaultValue="card">
          <Radio value="card" label="Credit Card" description="Visa, Mastercard, Amex" />
          <Radio value="paypal" label="PayPal" description="Pay with your PayPal balance" error="PayPal is currently unavailable in your region." />
          <Radio value="crypto" label="Cryptocurrency" description="BTC, ETH, USDC" />
        </RadioGroup>
      </div>
    ),
  },
  {
    id: "inline-horizontal",
    title: "Inline Horizontal Layout",
    description:
      "Radio groups stack vertically by default, but you can use flexbox classes to lay them out horizontally.",
    code: `<RadioGroup label="Sort by" defaultValue="name">
  <div className="flex gap-4">
    <Radio value="name" label="Name" />
    <Radio value="date" label="Date" />
    <Radio value="size" label="Size" />
  </div>
</RadioGroup>`,
    render: () => (
      <div className="w-full max-w-sm">
        <RadioGroup label="Sort order" defaultValue="name">
          <div className="flex gap-6">
            <Radio value="name" label="Name" />
            <Radio value="date" label="Date" />
            <Radio value="size" label="Size" />
          </div>
        </RadioGroup>
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
    name: "value (RadioGroup)",
    type: "string",
    default: "undefined",
    description: "Controlled selected value for the entire radio group.",
  },
  {
    name: "defaultValue (RadioGroup)",
    type: "string",
    default: "undefined",
    description: "Uncontrolled initial selected value on first render.",
  },
  {
    name: "onValueChange (RadioGroup)",
    type: "(value: string) => void",
    default: "undefined",
    description: "Callback triggered when a radio option is selected.",
  },
  {
    name: "disabled (RadioGroup)",
    type: "boolean",
    default: "false",
    description: "Disables all radio children within the group context.",
  },
  {
    name: "label (RadioGroup)",
    type: "string",
    default: "undefined",
    description: "Accessible legend label for the radio group fieldset.",
  },
  {
    name: "value (Radio)",
    type: "string",
    default: "required",
    description: "Unique value for this radio option within the group.",
  },
  {
    name: "label (Radio)",
    type: "React.ReactNode",
    default: "undefined",
    description: "Primary label rendered beside the radio circle.",
  },
  {
    name: "description (Radio)",
    type: "React.ReactNode",
    default: "undefined",
    description: "Secondary text rendered below the label.",
  },
  {
    name: "error (Radio)",
    type: "string",
    default: "undefined",
    description: "Error message with destructive border and animated text.",
  },
  {
    name: "disabled (Radio)",
    type: "boolean",
    default: "false",
    description: "Disables this specific radio option.",
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

export default function RadioDocsPage() {
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
              { label: componentMeta.title, href: "/docs/components/basic-forms/radio" },
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
                Properties accepted by the RadioGroup context wrapper and individual Radio items.
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
