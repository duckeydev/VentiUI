"use client";

import { useState } from "react";
import {
  IconExternalLink,
  IconUser,
  IconMail,
  IconCalendar,
  IconCircleCheck,
  IconX,
  IconClock,
  IconStar,
  IconTrash,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

import { Table, type TableColumn } from "@/components/table";
import { Badge } from "@/components";
import {
  DocsBreadcrumbs,
  DocsOutline,
  DocsPageFrame,
  DocsPanel,
} from "../../layout";
import DocsSidebar from "../../Sidebar";
import DocsAdjacentNav from "../../DocsAdjacentNav";
import CodeBlock from "@/app/components/codeblock";
import { Button } from "@/components/button";
import { Input } from "@/components/input";

const componentMeta = {
  title: "Tables",
  description:
    "A flexible data table component with animated rows, loading skeletons, empty states, and multiple visual variants inspired by Notion database views.",
  version: "v1.1.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/table.tsx",
  category: "tables",
  apiDescription: "The Table component provides a type-safe generic data table with animated row transitions.",
};

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  joined: string;
}

const users: User[] = [
  { id: 1, name: "Alice Chen", email: "alice@example.com", role: "Admin", status: "active", joined: "2024-01-15" },
  { id: 2, name: "Bob Martinez", email: "bob@example.com", role: "Editor", status: "active", joined: "2024-03-22" },
  { id: 3, name: "Clara Johansson", email: "clara@example.com", role: "Viewer", status: "inactive", joined: "2024-06-10" },
  { id: 4, name: "David Kim", email: "david@example.com", role: "Editor", status: "active", joined: "2024-08-05" },
  { id: 5, name: "Elena Popescu", email: "elena@example.com", role: "Admin", status: "pending", joined: "2024-11-30" },
];

interface Project {
  name: string;
  status: "completed" | "in-progress" | "planned";
  priority: "high" | "medium" | "low";
  deadline: string;
  owner: string;
}

const projects: Project[] = [
  { name: "Design System Migration", status: "completed", priority: "high", deadline: "2025-02-01", owner: "Alice" },
  { name: "API Rate Limiting", status: "in-progress", priority: "high", deadline: "2025-03-15", owner: "David" },
  { name: "Documentation Overhaul", status: "in-progress", priority: "medium", deadline: "2025-04-01", owner: "Clara" },
  { name: "Mobile Responsiveness", status: "planned", priority: "medium", deadline: "2025-05-01", owner: "Bob" },
  { name: "Performance Benchmarks", status: "planned", priority: "low", deadline: "2025-06-01", owner: "Elena" },
];

const statusBadge = (status: string) => {
  const colors: Record<string, "success" | "warning" | "info" | "minimal"> = {
    active: "success",
    inactive: "minimal",
    pending: "warning",
    completed: "success",
    "in-progress": "info",
    planned: "minimal",
  };
  return <Badge variant={colors[status] || "minimal"}>{status}</Badge>;
};

const examples = [
  {
    id: "basic-table",
    title: "Basic Table",
    description:
      "The default modern variant with clean borders, hover states, and responsive overflow scrolling.",
    code: `<Table
  columns={columns}
  data={data}
  rowKey={(row) => row.id}
/>`,
    render: () => {
      const columns: TableColumn<User>[] = [
        { key: "name", header: "Name", render: (row) => <span className="font-medium">{row.name}</span> },
        { key: "email", header: "Email" },
        { key: "role", header: "Role" },
        {
          key: "status",
          header: "Status",
          render: (row) => statusBadge(row.status),
        },
        { key: "joined", header: "Joined" },
      ];
      return (
        <div className="w-full">
          <Table columns={columns} data={users} rowKey={(row) => row.id} />
        </div>
      );
    },
  },
  {
    id: "minimal-variant",
    title: "Minimal Variant",
    description:
      "A borderless table style that blends with the canvas, matching Notion's sidebar or inline views.",
    code: `<Table variant="minimal" columns={columns} data={data} rowKey={(row) => row.id} />`,
    render: () => {
      const columns: TableColumn<User>[] = [
        { key: "name", header: "Name" },
        { key: "role", header: "Role" },
        { key: "status", header: "Status", render: (row) => statusBadge(row.status) },
      ];
      return (
        <div className="w-full">
          <Table variant="minimal" columns={columns} data={users.slice(0, 3)} rowKey={(row) => row.id} />
        </div>
      );
    },
  },
  {
    id: "compact-variant",
    title: "Compact Variant",
    description:
      "A dense table layout with reduced padding, suitable for database views or data-heavy dashboards.",
    code: `<Table variant="compact" columns={columns} data={data} rowKey={(row) => row.id} />`,
    render: () => {
      const columns: TableColumn<Project>[] = [
        { key: "name", header: "Project", render: (row) => <span className="font-medium">{row.name}</span> },
        { key: "owner", header: "Owner" },
        { key: "priority", header: "Priority" },
        { key: "status", header: "Status", render: (row) => statusBadge(row.status) },
        { key: "deadline", header: "Deadline" },
      ];
      return (
        <div className="w-full">
          <Table variant="compact" columns={columns} data={projects} rowKey={(p) => p.name} />
        </div>
      );
    },
  },
  {
    id: "clickable-rows",
    title: "Clickable Rows",
    description:
      "Pass <code>onRowClick</code> to make rows interactive with a pointer cursor and active press state.",
    code: `<Table
  columns={columns}
  data={data}
  rowKey={(row) => row.id}
  onRowClick={(row) => console.log(row)}
/>`,
    render: () => {
      const [selected, setSelected] = useState<string | null>(null);
      const columns: TableColumn<User>[] = [
        { key: "name", header: "Name", render: (row) => <span className="font-medium">{row.name}</span> },
        { key: "email", header: "Email" },
        { key: "role", header: "Role" },
        { key: "status", header: "Status", render: (row) => statusBadge(row.status) },
      ];
      return (
        <div className="w-full space-y-3">
          <Table
            columns={columns}
            data={users}
            rowKey={(row) => row.id}
            onRowClick={(row) => setSelected(row.name)}
          />
          {selected && (
            <p className="text-xs text-muted-foreground font-mono">
              Selected: {selected}
            </p>
          )}
        </div>
      );
    },
  },
  {
    id: "loading-state",
    title: "Loading State",
    description:
      "Set <code>isLoading</code> to render animated skeleton placeholders while data is being fetched.",
    code: `<Table
  columns={columns}
  data={[]}
  rowKey={(row) => row.id}
  isLoading
/>`,
    render: () => {
      const columns: TableColumn<User>[] = [
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
        { key: "role", header: "Role" },
        { key: "status", header: "Status" },
      ];
      return (
        <div className="w-full">
          <Table columns={columns} data={[]} rowKey={(row) => row.id} isLoading />
        </div>
      );
    },
  },
  {
    id: "empty-state",
    title: "Empty State",
    description:
      "When the data array is empty, the table displays a centered empty message that can be customized.",
    code: `<Table
  columns={columns}
  data={[]}
  rowKey={(row) => row.id}
  emptyMessage="No users found"
/>`,
    render: () => {
      const columns: TableColumn<User>[] = [
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
        { key: "role", header: "Role" },
      ];
      return (
        <div className="w-full">
          <Table columns={columns} data={[]} rowKey={(row) => row.id} emptyMessage="No matching records found" />
        </div>
      );
    },
  },
  {
    id: "custom-rendering",
    title: "Custom Cell Rendering",
    description:
      "Use the <code>render</code> function on each column to customize cell content with badges, buttons, or any React node.",
    code: `<Table
  columns={[
    { key: "name", header: "Name", render: (row) => <span className="font-medium">{row.name}</span> },
    {
      key: "status",
      header: "Status",
      render: (row) => <Badge variant="success">{row.status}</Badge>,
    },
  ]}
  data={data}
  rowKey={(row) => row.id}
/>`,
    render: () => {
      const columns: TableColumn<Project>[] = [
        {
          key: "name",
          header: "Project",
          render: (row) => (
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{row.name}</span>
            </div>
          ),
        },
        {
          key: "priority",
          header: "Priority",
          render: (row) => {
            const colors: Record<string, string> = { high: "text-red-500", medium: "text-amber-500", low: "text-muted-foreground" };
            return <span className={`text-xs font-semibold ${colors[row.priority]}`}>{row.priority}</span>;
          },
        },
        {
          key: "status",
          header: "Status",
          render: (row) => statusBadge(row.status),
        },
        {
          key: "owner",
          header: "Owner",
        },
      ];
      return (
        <div className="w-full">
          <Table variant="modern" columns={columns} data={projects} rowKey={(p) => p.name} />
        </div>
      );
    },
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
    type: "'modern' | 'minimal' | 'compact'",
    default: "'modern'",
    description: "Controls the overall table aesthetic — modern has borders and shadow, minimal is borderless, compact has tight padding.",
  },
  {
    name: "columns",
    type: "TableColumn<T>[]",
    default: "required",
    description: "Array of column definitions with key, header, optional render function, className, and width.",
  },
  {
    name: "data",
    type: "T[]",
    default: "required",
    description: "Array of data objects to render as rows. The generic type T ensures type safety in render functions.",
  },
  {
    name: "rowKey",
    type: "(row: T) => string | number",
    default: "required",
    description: "Function returning a unique key for each row, used for React reconciliation and animations.",
  },
  {
    name: "emptyMessage",
    type: "string",
    default: "'No pages or entries found'",
    description: "Message displayed centered in the table when the data array is empty.",
  },
  {
    name: "onRowClick",
    type: "(row: T) => void",
    default: "undefined",
    description: "Callback when a row is clicked. Enables pointer cursor and hover effects on rows.",
  },
  {
    name: "isLoading",
    type: "boolean",
    default: "false",
    description: "Shows animated skeleton placeholders instead of data rows during loading.",
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
              { label: "Tables", href: "/docs/components/tables" },
              { label: componentMeta.title, href: "/docs/components/tables/tables" },
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
                Properties, generic types, and column configuration for the Table component.
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
