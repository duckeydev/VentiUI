"use client";

import { Tabs } from "@/components/tabs";
import { cn } from "@/lib/utils";
import { IconEye, IconCode, IconCheck, IconCopy } from "@tabler/icons-react";
import React from "react";
import { Highlight, themes } from "prism-react-renderer";

interface ExampleProps {
  id: string;
  title: string;
  description?: string;
  code: string;
  render: React.ComponentType;
}

export default function CodeBlock({ example }: { example: ExampleProps }) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState("preview");

  const handleCopy = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const tabItems = [
    {
      id: "preview",
      label: (
        <>
          <IconEye className="h-3.5 w-3.5 stroke-[1.5]" /> Preview
        </>
      ),
      content: null,
    },
    {
      id: "code",
      label: (
        <>
          <IconCode className="h-3.5 w-3.5 stroke-[1.5]" /> Code
        </>
      ),
      content: null,
    },
  ];

  return (
    <section
      key={example.id}
      id={example.id}
      className="space-y-3 scroll-mt-20 group"
    >
      {/* Notion Headers */}
      <div className="space-y-0.5">
        <h3 className="text-lg font-medium text-foreground tracking-tight">
          {example.title}
        </h3>
        {example.description && (
          <p className="max-w-2xl text-[13px] text-muted-foreground/80 leading-relaxed">
            {example.description}
          </p>
        )}
      </div>

      <div className="rounded-md border border-border/60 bg-background shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        {/* Header Section */}
        <div className="flex items-center justify-between border-b border-border/40 bg-muted/20 px-1 py-0.5">
          <Tabs
            items={tabItems}
            activeId={activeTab}
            onValueChange={setActiveTab}
            variant="small"
            className="w-auto"
          />

          <button
            onClick={() => handleCopy(example.id, example.code)}
            className="mr-1.5 flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-[11px] font-medium text-muted-foreground/70 transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            {copiedId === example.id ? (
              <>
                <IconCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-normal">Copied</span>
              </>
            ) : (
              <>
                <IconCopy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Content Area */}
        <div
          className={cn(
            "relative min-h-35 w-full transition-colors",
            activeTab === "preview"
              ? "bg-background p-6 flex items-center justify-center"
              : "bg-muted/10",
          )}
        >
          {activeTab === "preview" ? (
            <example.render />
          ) : (
            /* FIX: Removed the outer wrapping curly braces that broke the JSX parser */
            <Highlight
              theme={themes.vsDark}
              code={example.code.trim()}
              language="tsx"
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={cn(
                    "w-full overflow-x-auto p-4 font-mono text-[12px] leading-6 selection:bg-muted/40",
                    className,
                  )}
                  style={{ ...style, backgroundColor: "transparent" }}
                >
                  <code>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </code>
                </pre>
              )}
            </Highlight>
          )}
        </div>
      </div>
    </section>
  );
}
