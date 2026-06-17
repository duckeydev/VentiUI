"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconCloudUpload,
  IconSparkles,
} from "@tabler/icons-react";

import { FileUploadingProgress } from "@/components/fileUploadingProgress";
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
  title: "File Uploading Progress",
  description:
    "Shows file upload status with progress.",
  version: "v1.1.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/file-uploading-progress.tsx",

  category: "base-components",
  apiDescription:
    "The File Uploading Progress component provides a versatile UI primitive.",
};

const examples = [
  {
    id: "active-upload",
    title: "Asynchronous Active Stream",
    description:
      "View the progress bar during an active upload.",
    code: `<FileUploadingProgress 
  fileName="production-database-export.sql" 
  fileSize="142.8 MB" 
  progress={45} 
  status="uploading"
  onCancel={() => console.log("Aborted streaming session")}
/>`,
    render: () => (
      <div className="w-full max-w-sm">
        <FileUploadingProgress
          fileName="production-database-export.sql"
          fileSize="142.8 MB"
          progress={45}
          status="uploading"
          onCancel={() => alert("Aborted transmission path context.")}
        />
      </div>
    ),
  },
  {
    id: "terminal-states",
    title: "Terminal Success & Exception Matrix",
    description:
      "See success and error states for uploads.",
    code: `<div className="space-y-3 w-full max-w-sm">

  <FileUploadingProgress fileName="user-avatar-vector.svg" fileSize="1.2 MB" progress={100} status="success" />

  <FileUploadingProgress fileName="enterprise-financials.pdf" fileSize="24.5 MB" progress={82} status="error" />
</div>`,
    render: () => (
      <div className="space-y-3 w-full max-w-sm text-left">
        <FileUploadingProgress
          fileName="user-avatar-vector.svg"
          fileSize="1.2 MB"
          progress={100}
          status="success"
        />
        <FileUploadingProgress
          fileName="enterprise-financials.pdf"
          fileSize="24.5 MB"
          progress={82}
          status="error"
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
    name: "fileName",
    type: "string",
    default: "required",
    description:
      "The direct identification string designating the attachment target asset.",
  },
  {
    name: "fileSize",
    type: "string",
    default: "'Unknown size'",
    description:
      "Explicit document byte calculation metadata (e.g., '14 KB' or '2 GB').",
  },
  {
    name: "progress",
    type: "number",
    default: "0",
    description:
      "Scalar measurement percentage tracked between absolute parameters 0 and 100.",
  },
  {
    name: "status",
    type: "'uploading' | 'success' | 'error'",
    default: "'uploading'",
    description:
      "Drives asset indicator sub-states and swaps tracking themes automatically.",
  },
  {
    name: "onCancel",
    type: "() => void",
    default: "undefined",
    description:
      "Optional callback parameter rendering an action close element inside structural header files.",
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

export default function FileUploadingDocsPage() {
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
              { label: "Data Feedback", href: "/docs/components#feedback" },
              {
                label: "File Uploading Progress",
                href: "/docs/components/feedback/file-uploading",
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
