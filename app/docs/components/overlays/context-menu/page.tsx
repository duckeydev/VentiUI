"use client";

import React from "react";
import {
  IconCursorText,
  IconEdit,
  IconClipboard,
  IconDownload,
  IconTrash
} from "@tabler/icons-react";

import { ContextMenu, type ContextMenuItem } from "@/components/context-menu"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import { TableColumn, Table } from "@/components/table";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "Context Menu Portal",
  description: "Displays a custom menu when you right-click an area.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/context-menu.tsx",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
                    { name: "children", type: "ReactNode", default: "required", description: "The content viewport frame node that acts as the mouse right-click gesture capture boundary." },
                    { name: "items", type: "ContextMenuItem[]", default: "required", description: "Array containing menu metrics mapping directly onto items displayed inside the structural floating grid." },
                    { name: "onSelect", type: "(item: ContextMenuItem) => void", default: "required", description: "Execution handler fired instantly upon clicking a valid row item configuration block." },
                    { name: "className", type: "string", default: "undefined", description: "Injected class definitions applied straight to the tracking viewport base node container." },
                  ];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function ContextMenuDocsPage() {
  const contextualItems: ContextMenuItem[] = [
    { id: "edit-node", label: "Edit Entity Parameters", icon: <IconEdit className="w-3.5 h-3.5" /> },
    { id: "clone-node", label: "Clone Row Layout", icon: <IconClipboard className="w-3.5 h-3.5" /> },
    { id: "export-json", label: "Download Raw Schema JSON", icon: <IconDownload className="w-3.5 h-3.5" /> },
    { id: "lock-index", label: "Lock Structural State", disabled: true },
    { id: "purge-index", label: "Purge Context Node", icon: <IconTrash className="w-3.5 h-3.5" />, danger: true },
  ];

  const exampleCode = `import { ContextMenu } from "@/components/context-menu";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export function DesignCanvas() {
  const contextActions = [
    { id: "edit", label: "Modify Metadata", icon: <IconEdit className="w-4 h-4" /> },
    { id: "delete", label: "Purge Component", icon: <IconTrash className="w-4 h-4" />, danger: true },
  ];

  return (
    <ContextMenu
      items={contextActions}
      onSelect={(action) => console.log("Fired sequence: ", action.id)}
      className="w-full h-48 bg-card rounded-xl flex items-center justify-center border border-dashed"
    >
      <p className="text-sm text-muted-foreground">Right-click anywhere inside this sector container</p>
    </ContextMenu>
  );
}`;

  return (
    <DocsPageFrame
      leftBar={
        <aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-r-border/40">
          <DocsSidebar />
        </aside>
      }
      rightBar={
        <DocsOutline
          title="On this page"
          items={[
            { label: "Interactive Component Layout", href: "#interactive-demo" },
            { label: "ContextMenu Specification Matrix", href: "#props-api" },
          ]}
        />
      }
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Overlay Primitives", href: "/docs/components#overlays" },
              { label: "Context Menu Portal", href: "/docs/components/overlays/context-menu" },
            ]}
          />

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
              {componentMeta.title}
            </h1>
<Badge variant="info">
  {componentMeta.version}
</Badge>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">{componentMeta.description}</p>


        </div>

        <section id="interactive-demo" className="space-y-3 scroll-mt-20">
          <CodeBlock
            example={{
              id: "interactive-demo",
              title: "Interactive Implementation",
              description: "Right-click inside the box below to see the context menu.",
              code: exampleCode,
              render: () => {
                const [callbackLog, setCallbackLog] = React.useState<string>("None");
                return (
                  <div className="w-full max-w-md flex flex-col items-center gap-3">
                    <ContextMenu
                      items={contextualItems}
                      onSelect={(item) => setCallbackLog(item.label)}
                      className="w-full h-44 border-2 border-dashed border-border rounded-xl bg-background/40 hover:bg-background/80 transition-colors flex flex-col items-center justify-center select-none cursor-context-menu p-4 group"
                    >
                      <span className="text-xs font-semibold tracking-tight text-foreground/80 group-hover:text-primary transition-colors text-center">
                        Right Click Inside This Workspace Panel
                      </span>
                      <span className="text-[10px] text-muted-foreground/50 font-mono mt-1 text-center">
                        (Viewport collision detection mechanics auto-adjust display tracking vectors)
                      </span>
                    </ContextMenu>
                    <span className="text-[10px] text-muted-foreground/40 font-mono mt-2">
                      Action Node Callback: "{callbackLog}"
                    </span>
                  </div>
                );
              },
            }}
          />
        </section>

        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Properties API
              </h2>
              <p className="text-xs text-muted-foreground">
                All available props for this component.
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

        <footer className="border-t border-border/30 pt-4 text-center text-xs text-muted-foreground/40">
          © 2026 Venti UI Labs. UI made right.
        </footer>
      </main>
    </DocsPageFrame>
  );
}