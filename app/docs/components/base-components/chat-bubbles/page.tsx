"use client";

import React from "react";
import {
  IconCode,
  IconSettings,
} from "@tabler/icons-react";
import {
  ChatBubbles,
  type ChatMessage,
  type ChatBubbleVariant,
} from "@/components/chatBubbles";
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

const componentMeta = {
  title: "Chat Bubbles",
  description:
    "Displays chat messages in bubble style.",
  version: "v1.0.0",

  category: "base-components",
  apiDescription:
    "The Chat Bubbles component provides a versatile UI primitive.",
};

const sampleMessages: ChatMessage[] = [
  {
    id: "m1",
    author: "Alice",
    text: "Hey! Did you see the new variant updates?",
    time: "10:02 AM",
    side: "left",
  },
  {
    id: "m2",
    author: "You",
    text: "Yeah, the glassmorphism one looks incredible.",
    time: "10:03 AM",
    side: "right",
  },
  {
    id: "m3",
    author: "Alice",
    text: "Agreed. Super easy to implement too.",
    time: "10:04 AM",
    side: "left",
  },
];

export default function ChatBubblesDocsPage() {
  const [selectedVariant, setSelectedVariant] =
    React.useState<ChatBubbleVariant>("modern");

  const usageCode = `import { ChatBubbles } from "@/components/chatBubbles";

const messages = [
  { id: "1", author: "Alice", text: "Hello!", side: "left" },
  { id: "2", author: "You", text: "Hi there!", side: "right" }
];

export default function Demo() {
  return (
    <ChatBubbles 
      messages={messages} 
      defaultVariant="modern" 
      showTimestamps 
    />
  );
}`;

  const outlineItems = [
    { label: "Interactive Demo", href: "#interactive-demo" },
    { label: "Variants", href: "#variants" },
    { label: "API Reference", href: "#api-reference" },
  ];

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
                href: "/docs/components/base-components/chat-bubbles",
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

        <section id="interactive-demo" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Interactive Playground
              </h3>
              <p className="text-sm text-muted-foreground">
                Preview styles globally and toggle between output modes.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/20 p-1 text-xs">
              {(
                ["modern", "minimal", "glass", "macos"] as ChatBubbleVariant[]
              ).map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVariant(v)}
                  className={`rounded-md px-2.5 py-1 font-medium capitalize transition-all ${
                    selectedVariant === v
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <CodeBlock
            example={{
              id: "interactive-demo",
              title: "",
              code: usageCode,
              render: () => (
                <div className="max-w-md mx-auto border border-border/40 rounded-xl bg-background/50 p-4 shadow-sm backdrop-blur-[2px]">
                  <ChatBubbles
                    messages={sampleMessages}
                    defaultVariant={selectedVariant}
                    showTimestamps
                  />
                </div>
              ),
            }}
          />
        </section>

        <section id="api-reference" className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Props Reference
            </h3>
            <p className="text-sm text-muted-foreground">
              All available props for this component.
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border/60 bg-background">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
                  <th className="p-3">Prop</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Default</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-foreground/90">
                <tr>
                  <td className="p-3 font-mono text-xs font-semibold text-primary">
                    messages
                  </td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">
                    ChatMessage[]
                  </td>
                  <td className="p-3 font-mono text-xs">—</td>
                  <td className="p-3 text-xs">
                    Array of message objects to display inside the thread stack.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs font-semibold text-primary">
                    defaultVariant
                  </td>
                  <td className="p-3 font-mono text-xs text-purple-600 dark:text-purple-400">
                    "modern" | "minimal" | "glass" | "macos"
                  </td>
                  <td className="p-3 font-mono text-xs">"modern"</td>
                  <td className="p-3 text-xs">
                    Global styling aesthetic fallback applied to all text
                    bubbles.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs font-semibold text-primary">
                    showTimestamps
                  </td>
                  <td className="p-3 font-mono text-xs text-blue-600">
                    boolean
                  </td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3 text-xs">
                    Toggles display of timestamps aligned beneath bubbles.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs font-semibold text-primary">
                    className
                  </td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">
                    string
                  </td>
                  <td className="p-3 font-mono text-xs">""</td>
                  <td className="p-3 text-xs">
                    Additional Tailwind overrides passed directly down to the
                    flex list wrapper.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <DocsAdjacentNav />

        <footer className="border-t border-border/30 pt-8 pb-10 text-center text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/40">
          © 2026 Venti UI Labs. UI made right.
        </footer>
      </main>
    </DocsPageFrame>
  );
}
