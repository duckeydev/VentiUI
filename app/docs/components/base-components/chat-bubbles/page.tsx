"use client";

import React, { useState } from "react";
import { IconCode, IconCopy, IconEye, IconCheck, IconSettings } from "@tabler/icons-react";
import { ChatBubbles, type ChatMessage, type ChatBubbleVariant } from "@/components/chatBubbles";
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Chat Bubbles",
  description: "A highly customizable, responsive chat bubble primitive supporting dynamic styling variants for messaging interfaces and AI chat streams.",
  version: "v1.0.0",
};

const sampleMessages: ChatMessage[] = [
  { id: "m1", author: "Alice", text: "Hey! Did you see the new variant updates?", time: "10:02 AM", side: "left" },
  { id: "m2", author: "You", text: "Yeah, the glassmorphism one looks incredible.", time: "10:03 AM", side: "right" },
  { id: "m3", author: "Alice", text: "Agreed. Super easy to implement too.", time: "10:04 AM", side: "left" },
];

export default function ChatBubblesDocsPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [selectedVariant, setSelectedVariant] = useState<ChatBubbleVariant>("modern");
  const [copiedText, setCopiedText] = useState(false);

  const usageCode = `import { ChatBubbles } from "@/components/chatBubbles";

const messages = [
  { id: "1", author: "Alice", text: "Hello!", side: "left" },
  { id: "2", author: "You", text: "Hi there!", side: "right" }
];

export default function Demo() {
  return (
    <ChatBubbles 
      messages={messages} 
      defaultVariant="${selectedVariant}" 
      showTimestamps 
    />
  );
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(usageCode);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

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
        {/* Header */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Base Components", href: "/docs/components#base-components" },
              { label: componentMeta.title, href: "/docs/components/base-components/chat-bubbles" },
            ]}
          />
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
              {componentMeta.title}
            </h1>
            <span className="mt-1.5 rounded bg-primary/10 border border-primary/20 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
              {componentMeta.version}
            </span>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">{componentMeta.description}</p>
        </div>

        {/* Interactive Demo Section */}
        <section id="interactive-demo" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold tracking-tight text-foreground">Interactive Playground</h3>
              <p className="text-sm text-muted-foreground">Preview styles globally and toggle between output modes.</p>
            </div>

            {/* Quick Variant Switcher */}
            <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/20 p-1 text-xs">
              {(["modern", "minimal", "glass", "macos"] as ChatBubbleVariant[]).map((v) => (
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

          <DocsPanel className="overflow-hidden rounded-xl border border-border/50 bg-card/20">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-3 py-2">
              <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-1 text-[11px] font-medium">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-1 rounded-md px-3 py-1 font-semibold transition-all ${
                    activeTab === "preview" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconEye className="h-3.5 w-3.5" /> Preview
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-1 rounded-md px-3 py-1 font-semibold transition-all ${
                    activeTab === "code" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconCode className="h-3.5 w-3.5" /> Code
                </button>
              </div>
              <button
                onClick={handleCopy}
                className="cursor-pointer rounded-md border border-border/60 bg-card/60 p-2 text-muted-foreground transition-all hover:border-border hover:text-foreground"
              >
                {copiedText ? <IconCheck className="h-3.5 w-3.5 text-emerald-500" /> : <IconCopy className="h-3.5 w-3.5" />}
              </button>
            </div>

            {/* Panel Body */}
            <div className="p-6 bg-gradient-to-b from-transparent to-muted/10">
              {activeTab === "preview" ? (
                <div className="max-w-md mx-auto border border-border/40 rounded-xl bg-background/50 p-4 shadow-sm backdrop-blur-[2px]">
                  <ChatBubbles messages={sampleMessages} defaultVariant={selectedVariant} showTimestamps />
                </div>
              ) : (
                <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-200 dark:bg-black/40">
                  <code>{usageCode}</code>
                </pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* API Reference Section */}
        <section id="api-reference" className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-foreground">Props Reference</h3>
            <p className="text-sm text-muted-foreground">Configuration settings for the root ChatBubbles wrapper.</p>
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
                  <td className="p-3 font-mono text-xs font-semibold text-primary">messages</td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">ChatMessage[]</td>
                  <td className="p-3 font-mono text-xs">—</td>
                  <td className="p-3 text-xs">Array of message objects to display inside the thread stack.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs font-semibold text-primary">defaultVariant</td>
                  <td className="p-3 font-mono text-xs text-purple-600 dark:text-purple-400">"modern" | "minimal" | "glass" | "macos"</td>
                  <td className="p-3 font-mono text-xs">"modern"</td>
                  <td className="p-3 text-xs">Global styling aesthetic fallback applied to all text bubbles.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs font-semibold text-primary">showTimestamps</td>
                  <td className="p-3 font-mono text-xs text-blue-600">boolean</td>
                  <td className="p-3 font-mono text-xs">false</td>
                  <td className="p-3 text-xs">Toggles display of timestamps aligned beneath bubbles.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs font-semibold text-primary">className</td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">string</td>
                  <td className="p-3 font-mono text-xs">""</td>
                  <td className="p-3 text-xs">Additional Tailwind overrides passed directly down to the flex list wrapper.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <DocsAdjacentNav />
      </main>
    </DocsPageFrame>
  );
}