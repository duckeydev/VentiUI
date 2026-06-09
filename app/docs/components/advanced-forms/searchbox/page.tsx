"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconSearch,
  IconSparkles,
} from "@tabler/icons-react";

import { SearchBox } from "@/components/search-box"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "SearchBox Vector Input",
  description: "A functional query controller field engineered with debounced network dispatch integration, operational hotkey hooks, and real-time activity spinners.",
  version: "v1.0.1",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/search-box.tsx",
};

export default function SearchBoxDocsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedResult, setDebouncedResult] = useState("");
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  // Fire simulation indicators during debounce execution
  const handleDebounceTrack = (val: string) => {
    setDebouncedResult(val);
    setIsSimulatingLoad(true);
    setTimeout(() => setIsSimulatingLoad(false), 450);
  };

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
        {/* Core Header Section Workspace */}
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
            <span className="mt-1.5 rounded bg-secondary border border-border/80 px-2 py-0.5 font-mono text-[11px] font-bold text-muted-foreground">
              {componentMeta.version}
            </span>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">{componentMeta.description}</p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={componentMeta.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconCode className="h-3.5 w-3.5" /> View Package Source
              <IconExternalLink className="h-2.5 w-2.5 text-muted-foreground/60" />
            </a>
          </div>
        </div>

        {/* Live Active Rendering Interactive Sandbox Sandbox */}
        <section id="interactive-demo" className="space-y-3 scroll-mt-20">
          <div className="flex items-center gap-2">
            <IconSearch className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-bold tracking-tight text-foreground">Interactive Implementation</h3>
          </div>
          <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
            Test hotkey focuses by tapping the <kbd className="px-1 py-0.5 font-mono bg-muted border text-[10px] rounded">/</kbd> key while unfocused, then watch the asynchronous debounce emission update below.
          </p>

          <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
              <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs font-medium">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${activeTab === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <IconEye className="h-3.5 w-3.5" /> Preview
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${activeTab === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <IconCode className="h-3.5 w-3.5" /> Code
                </button>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(exampleCode);
                  setCopiedId("demo");
                  setTimeout(() => setCopiedId(null), 2000);
                }}
                className="cursor-pointer rounded-md border border-border/60 bg-card/60 p-1.5 text-muted-foreground transition-all hover:border-border hover:text-foreground"
              >
                {copiedId === "demo" ? (
                  <IconCheck className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <IconCopy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            <div className="flex min-h-64 flex-col items-center justify-center bg-card/10 p-6 overflow-visible">
              {activeTab === "preview" ? (
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
              ) : (
                <pre className="w-full overflow-x-auto rounded-lg border border-border/40 bg-muted/20 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                  <code>{exampleCode}</code>
                </pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* Configurations Parameters Specifications API Matrices Area */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconSparkles stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">SearchBox API Reference</h2>
              <p className="text-xs text-muted-foreground">
                Properties parameters and typing specifications configuration parameters supported by the SearchBox primitive.
              </p>
            </div>
          </div>

          <DocsPanel className="overflow-hidden bg-card/30 rounded-xl border border-border/60">
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
                    { name: "value", type: "string", default: "required", description: "Controlled text stream mapping straight onto the active string buffer layout." },
                    { name: "onChange", type: "(value: string) => void", default: "required", description: "Direct state callback firing instantly on every hardware keystroke iteration." },
                    { name: "onDebounceSearch", type: "(value: string) => void", default: "undefined", description: "Delayed execution callback ideal for throttling database index network calls." },
                    { name: "debounceDelay", type: "number", default: "300", description: "The time gap criteria measured in milliseconds before the debounce tracker validates input updates." },
                    { name: "isLoading", type: "boolean", default: "false", description: "Swaps out the static search vector icon layout with a rotating loading wheel layout." },
                    { name: "shortcutKey", type: "string", default: "undefined", description: "Specifies a single document-wide key trigger to cleanly focus text fields from anywhere." },
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
          © 2026 Venti UI Labs. Optimized client query interaction interfaces.
        </footer>
      </main>
    </DocsPageFrame>
  );
}