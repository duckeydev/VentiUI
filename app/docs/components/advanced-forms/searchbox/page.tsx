"use client";

import React from "react";

import { SearchBox } from "@/components/search-box";
import { TableColumn, Table } from "@/components/table"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";
import CodeBlock from "@/app/components/codeblock";
import { Badge } from "@/components";

const componentMeta = {
  title: "SearchBox Vector Input",
  description: "A search input with debounced results.",
  version: "v1.0.1",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/search-box.tsx",
};

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
                    { name: "value", type: "string", default: "required", description: "Controlled text stream mapping straight onto the active string buffer layout." },
                    { name: "onChange", type: "(value: string) => void", default: "required", description: "Direct state callback firing instantly on every hardware keystroke iteration." },
                    { name: "onDebounceSearch", type: "(value: string) => void", default: "undefined", description: "Delayed execution callback ideal for throttling database index network calls." },
                    { name: "debounceDelay", type: "number", default: "300", description: "The time gap criteria measured in milliseconds before the debounce tracker validates input updates." },
                    { name: "isLoading", type: "boolean", default: "false", description: "Swaps out the static search vector icon layout with a rotating loading wheel layout." },
                    { name: "shortcutKey", type: "string", default: "undefined", description: "Specifies a single document-wide key trigger to cleanly focus text fields from anywhere." },
                  ];

const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

export default function SearchBoxDocsPage() {
  const exampleCode = `import { useState } from "react";
import { SearchBox } from "@/components/search-box";

export function QueryInputEngine() {
  const [query, setQuery] = useState("");
  const [liveSearch, setLiveSearch] = useState("");

  return (
    <SearchBox
      value={query}
      onChange={setQuery}
      onDebounceSearch={setLiveSearch}
      debounceDelay={400}
      shortcutKey="/"
      placeholder="Type query patterns..."
      variant="default"
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
            { label: "SearchBox Property API Matrix", href: "#props-api" },
          ]}
        />
      }
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">

        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Form Primitives", href: "/docs/components#forms" },
              { label: "SearchBox Component Matrix", href: "/docs/components/forms/search-box" },
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
              description: "Press / to focus, then type your query.",
              code: exampleCode,
              render: () => {
                const [searchValue, setSearchValue] = React.useState("");
                const [debouncedResult, setDebouncedResult] = React.useState("");
                const [isSimulatingLoad, setIsSimulatingLoad] = React.useState(false);
                const handleDebounceTrack = (val: string) => {
                  setDebouncedResult(val);
                  setIsSimulatingLoad(true);
                  setTimeout(() => setIsSimulatingLoad(false), 450);
                };
                return (
                  <div className="w-full max-w-xs space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60">
                        Asynchronous Registry Scan
                      </label>
                      <SearchBox
                        value={searchValue}
                        onChange={setSearchValue}
                        onDebounceSearch={handleDebounceTrack}
                        debounceDelay={350}
                        shortcutKey="/"
                        isLoading={isSimulatingLoad}
                        placeholder="Search microservices tracking indexes..."
                      />
                    </div>
                    <div className="rounded-lg border border-border/40 bg-muted/10 p-3 space-y-1 text-[10px] font-mono">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground/50">RAW_BUFFER:</span>
                        <span className="text-foreground/80 font-semibold truncate max-w-[180px]">"{searchValue || "NULL"}"</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground/50">DEBOUNCED_VALUE:</span>
                        <span className="text-primary font-bold truncate max-w-[180px]">"{debouncedResult || "NULL"}"</span>
                      </div>
                    </div>
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