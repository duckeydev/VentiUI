"use client";

import { useState } from "react";
import {
  IconCode,
  IconExternalLink,
  IconSettings,
  IconUser,
  IconBell,
  IconShield,
} from "@tabler/icons-react";

import { Tabs } from "@/components/tabs";
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
import { Card } from "@/components/card";

const componentMeta = {
  title: "Tabs",
  description:
    "A tabbed interface for organizing content.",
  version: "v1.2.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/tabs.tsx",
  category: "base-components",
  apiDescription: "The Tabs component provides a versatile tabbed navigation primitive.",
};

const examples = [
  {
    id: "line-variant",
    title: "Line Variant",
    description:
      "A thin underline highlights the active tab.",
    code: `<Tabs
  variant="line"
  items={[
    { id: "tab1", label: "Overview", content: <p className="text-sm text-muted-foreground">Overview content here.</p> },
    { id: "tab2", label: "Analytics", content: <p className="text-sm text-muted-foreground">Analytics content here.</p> },
    { id: "tab3", label: "Settings", content: <p className="text-sm text-muted-foreground">Settings content here.</p> },
  ]}
/>`,
    render: () => (
      <div className="w-full">
        <Tabs
          variant="line"
          items={[
            { id: "tab1", label: "Overview", content: <p className="text-sm text-muted-foreground">Overview content goes here.</p> },
            { id: "tab2", label: "Analytics", content: <p className="text-sm text-muted-foreground">Analytics dashboard with real-time metrics.</p> },
            { id: "tab3", label: "Settings", content: <p className="text-sm text-muted-foreground">Configure your application preferences.</p> },
          ]}
        />
      </div>
    ),
  },
  {
    id: "pill-variant",
    title: "Pill Variant",
    description:
      "Filled pill shape highlights the active tab.",
    code: `<Tabs
  variant="pill"
  items={[
    { id: "tab1", label: "Overview", content: <p>Content A</p> },
    { id: "tab2", label: "Analytics", content: <p>Content B</p> },
  ]}
/>`,
    render: () => (
      <div className="w-full">
        <Tabs
          variant="pill"
          items={[
            { id: "tab1", label: "Overview", content: <p className="text-sm text-muted-foreground">Pill tab overview panel.</p> },
            { id: "tab2", label: "Analytics", content: <p className="text-sm text-muted-foreground">Pill tab analytics panel.</p> },
            { id: "tab3", label: "Settings", content: <p className="text-sm text-muted-foreground">Pill tab settings panel.</p> },
          ]}
        />
      </div>
    ),
  },
  {
    id: "segmented-variant",
    title: "Segmented Variant",
    description:
      "Compact segmented style for toolbar filtering.",
    code: `<Tabs
  variant="segmented"
  items={[
    { id: "day", label: "Day", content: <p>Daily view</p> },
    { id: "week", label: "Week", content: <p>Weekly view</p> },
    { id: "month", label: "Month", content: <p>Monthly view</p> },
  ]}
/>`,
    render: () => (
      <div className="w-full">
        <Tabs
          variant="segmented"
          items={[
            { id: "day", label: "Day", content: <p className="text-sm text-muted-foreground">Daily breakdown of events and tasks.</p> },
            { id: "week", label: "Week", content: <p className="text-sm text-muted-foreground">Weekly summary with trend indicators.</p> },
            { id: "month", label: "Month", content: <p className="text-sm text-muted-foreground">Monthly report with aggregated metrics.</p> },
          ]}
        />
      </div>
    ),
  },
  {
    id: "small-variant",
    title: "Small Variant",
    description:
      "Minimal flat style for sidebar navigation.",
    code: `<Tabs
  variant="small"
  items={[
    { id: "all", label: "All", content: <p>All items</p> },
    { id: "active", label: "Active", content: <p>Active items</p> },
    { id: "archived", label: "Archived", content: <p>Archived items</p> },
  ]}
/>`,
    render: () => (
      <div className="w-full">
        <Tabs
          variant="small"
          items={[
            { id: "all", label: "All", content: <p className="text-sm text-muted-foreground">Showing all items in the workspace.</p> },
            { id: "active", label: "Active", content: <p className="text-sm text-muted-foreground">Showing active items only.</p> },
            { id: "archived", label: "Archived", content: <p className="text-sm text-muted-foreground">Showing archived and completed items.</p> },
          ]}
        />
      </div>
    ),
  },
  {
    id: "glass-variant",
    title: "Glass Variant",
    description:
      "Frosted glass style with backdrop blur.",
    code: `<Tabs
  variant="glass"
  items={[
    { id: "tab1", label: "Overview", content: <p>Content</p> },
    { id: "tab2", label: "Details", content: <p>Content</p> },
  ]}
/>`,
    render: () => (
      <div className="w-full">
        <Tabs
          variant="glass"
          items={[
            { id: "overview", label: "Overview", content: <p className="text-sm text-muted-foreground">Glass style overview content.</p> },
            { id: "details", label: "Details", content: <p className="text-sm text-muted-foreground">Detailed information with frosted backdrop.</p> },
            { id: "activity", label: "Activity", content: <p className="text-sm text-muted-foreground">Recent activity feed in glass panel.</p> },
          ]}
        />
      </div>
    ),
  },
  {
    id: "with-icons",
    title: "Tabs with Icons",
    description:
      "Add icons to tab labels for visual clarity.",
    code: `<Tabs
  items={[
    { id: "account", label: <><IconUser className="h-4 w-4" /> Account</>, content: <p>Account settings</p> },
    { id: "notifications", label: <><IconBell className="h-4 w-4" /> Notifications</>, content: <p>Notification prefs</p> },
  ]}
/>`,
    render: () => (
      <div className="w-full">
        <Tabs
          items={[
            {
              id: "account",
              label: <><IconUser className="h-4 w-4" /> Account</>,
              content: <p className="text-sm text-muted-foreground">Manage your account details, email, and security preferences.</p>,
            },
            {
              id: "notifications",
              label: <><IconBell className="h-4 w-4" /> Notifications</>,
              content: <p className="text-sm text-muted-foreground">Configure push notifications and alert thresholds.</p>,
            },
            {
              id: "security",
              label: <><IconShield className="h-4 w-4" /> Security</>,
              content: <p className="text-sm text-muted-foreground">Two-factor authentication and session management.</p>,
            },
          ]}
        />
      </div>
    ),
  },
  {
    id: "controlled",
    title: "Controlled Tabs",
    description:
      "Control the active tab from parent state.",
    code: `<Tabs
  activeId={activeTab}
  onValueChange={setActiveTab}
  items={[...]}
/>`,
    render: () => {
      const [activeTab, setActiveTab] = useState("tab1");
      return (
        <div className="w-full space-y-4">
          <Tabs
            variant="pill"
            activeId={activeTab}
            onValueChange={setActiveTab}
            items={[
              { id: "tab1", label: "Projects", content: <p className="text-sm text-muted-foreground">Active project list with status indicators.</p> },
              { id: "tab2", label: "Team", content: <p className="text-sm text-muted-foreground">Team members and role assignments.</p> },
              { id: "tab3", label: "Billing", content: <p className="text-sm text-muted-foreground">Subscription plan and payment history.</p> },
            ]}
          />
          <p className="text-xs text-muted-foreground font-mono">
            Active tab: &ldquo;{activeTab}&rdquo;
          </p>
        </div>
      );
    },
  },
  {
    id: "disabled-tabs",
    title: "Disabled Tabs",
    description:
      "Disable individual tabs to prevent selection.",
    code: `<Tabs
  items={[
    { id: "general", label: "General", content: <p>General</p> },
    { id: "advanced", label: "Advanced", disabled: true, content: null },
    { id: "admin", label: "Admin", content: <p>Admin</p> },
  ]}
/>`,
    render: () => (
      <div className="w-full">
        <Tabs
          items={[
            { id: "general", label: "General", content: <p className="text-sm text-muted-foreground">General configuration options.</p> },
            { id: "advanced", label: "Advanced", disabled: true, content: null },
            { id: "admin", label: "Admin", content: <p className="text-sm text-muted-foreground">Administrative privileges and audit logs.</p> },
            { id: "beta", label: "Beta", disabled: true, content: null },
          ]}
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
    type: "'line' | 'pill' | 'segmented' | 'small' | 'glass'",
    default: "'line'",
    description: "Controls the tab track and trigger visual style.",
  },
  {
    name: "items",
    type: "TabItem[]",
    default: "required",
    description: "Array of tab definitions with id, label, content, and optional disabled flag.",
  },
  {
    name: "defaultActiveId",
    type: "string",
    default: "first item's id",
    description: "Uncontrolled initial active tab ID on first render.",
  },
  {
    name: "activeId",
    type: "string",
    default: "undefined",
    description: "Controlled active tab ID for external state management.",
  },
  {
    name: "onValueChange",
    type: "(id: string) => void",
    default: "undefined",
    description: "Callback triggered when the active tab changes.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    description: "Additional CSS class names for the root wrapper.",
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
              { label: "Base Components", href: "/docs/components#base-components" },
              { label: componentMeta.title, href: "/docs/components/base-components/tabs" },
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
          &copy; 2026 Venti UI Labs. UI made right.
        </footer>
      </main>
    </DocsPageFrame>
  );
}
