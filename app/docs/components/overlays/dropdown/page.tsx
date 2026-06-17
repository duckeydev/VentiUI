"use client";

import React from "react";
import {
  IconClick,
  IconUser,
  IconSettings,
  IconShare,
  IconTrash
} from "@tabler/icons-react";

import { Dropdown, type DropdownItem } from "@/components/dropdown"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "Dropdown Menu Node",
  description: "A menu that opens when you click a button to select an option.",
  version: "v1.0.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/dropdown.tsx",
};

export default function DropdownDocsPage() {
  const actionItems: DropdownItem[] = [
    { id: "profile", label: "View Profile", icon: <IconUser className="w-3.5 h-3.5" /> },
    { id: "settings", label: "Account Settings", icon: <IconSettings className="w-3.5 h-3.5" /> },
    { id: "share", label: "Share Workspace", icon: <IconShare className="w-3.5 h-3.5" /> },
    { id: "billing", label: "Billing Audit", disabled: true },
    { id: "delete", label: "Terminate Session", icon: <IconTrash className="w-3.5 h-3.5" />, danger: true },
  ];

  const exampleCode = `import { Dropdown } from "@/components/dropdown";
import { IconUser, IconSettings, IconTrash } from "@tabler/icons-react";

export function ActionMenu() {
  const menuItems = [
    { id: "profile", label: "Profile", icon: <IconUser className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <IconSettings className="w-4 h-4" /> },
    { id: "delete", label: "Delete", icon: <IconTrash className="w-4 h-4" />, danger: true },
  ];

  return (
    <Dropdown
      label="Manage Account"
      items={menuItems}
      variant="default"
      align="left"
      onSelect={(item) => console.log("Selected target: ", item.id)}
    />
  );
}`;

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
            { label: "Interactive Component Layout", href: "#interactive-demo" },
            { label: "Dropdown Specification Matrix", href: "#props-api" },
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
              { label: "Dropdown Menu Node", href: "/docs/components/overlays/dropdown" },
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
              description: "Click the button to open the dropdown and select an option.",
              code: exampleCode,
              render: () => {
                const [selectedLog, setSelectedLog] = React.useState<string>("None");
                return (
                  <div className="w-full max-w-xs flex flex-col items-center gap-4">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60 text-center">
                      Dashboard Settings Portal
                    </label>
                    <Dropdown
                      label="Options Matrix"
                      items={actionItems}
                      onSelect={(item) => setSelectedLog(item.label)}
                    />
                    <span className="text-[10px] text-muted-foreground/40 font-mono mt-4">
                      Callback Registered: "{selectedLog}"
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

          <DocsPanel className=" bg-card/30 rounded-xl border border-border/60">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-border/60 bg-secondary/30 font-semibold text-muted-foreground">
                    <th className="w-[18%] p-3 font-semibold">Property</th>
                    <th className="w-[32%] p-3 font-semibold">Type</th>
                    <th className="w-[12%] p-3 font-semibold">Default</th>
                    <th className="w-[38%] p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 font-medium">
                  {[
                    { name: "label", type: "ReactNode", default: "required", description: "The button click target node label text visible within the trigger canvas." },
                    { name: "items", type: "DropdownItem[]", default: "required", description: "An array of configuration nodes mapping to row indices displayed in the dropdown portal menu." },
                    { name: "onSelect", type: "(item: DropdownItem) => void", default: "required", description: "Callback triggered instantly upon choosing a valid selectable action point row item." },
                    { name: "align", type: '"left" | "right"', default: '"left"', description: "Controls horizontal alignment vectors bounding edge metrics for the floating popover container." },
                    { name: "variant", type: '"default" | "secondary"', default: '"default"', description: "Changes structural density canvas formatting, borders, and hover color weights." },
                  ].map((prop) => (
                    <tr key={prop.name} className="transition-colors hover:bg-secondary/20 vertical-align-top">
                      <td className="p-3 font-mono font-bold text-primary">{prop.name}</td>
                      <td className="p-3 font-mono text-purple-600 dark:text-purple-400 leading-relaxed">{prop.type}</td>
                      <td className="p-3 font-mono text-foreground/70">{prop.default}</td>
                      <td className="p-3 font-normal leading-relaxed text-muted-foreground">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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