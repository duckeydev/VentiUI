"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconExternalLink,
  IconLayoutGrid,
  IconUser,
  IconPhoto,
  IconRefresh,
} from "@tabler/icons-react";

import { Avatar } from "@/components/avatar";
import {
  DocsBreadcrumbs,
  DocsOutline,
  DocsPageFrame,
  DocsPanel,
} from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Avatar",
  description:
    "An image fallback primitive optimized for rendering user profile portraits, team identity nodes, and systemic fallbacks.",
  version: "v1.2.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/avatar.tsx",
};

const avatarProperties = [
  {
    name: "src",
    type: "string",
    default: "undefined",
    description: "The targeted user profile image URL source. Tracks cross-origin handshakes safely.",
  },
  {
    name: "fallback",
    type: "React.ReactNode",
    default: "undefined",
    description: "Rendered fallback node injected automatically if image addresses return 404 or break loading sequences.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: "Alters aspect locks and structural dimension frames uniformly across your interface maps.",
  },
  {
    name: "roundness",
    type: "'none' | 'sm' | 'md' | 'lg' | 'full'",
    default: "'full'",
    description: "Modifies border radius constraints to conform with modern, minimal, or system window aesthetics.",
  },
];

export default function AvatarDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [activeRound, setActiveRound] = useState<"none" | "sm" | "md" | "lg" | "full">("full");
  const [brokenSrc, setBrokenSrc] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100");
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    playground: "preview",
    fallbacks: "preview",
  });

  const handleCopy = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const playgroundCode = `<Avatar 
  size="${activeSize}" 
  roundness="${activeRound}" 
  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" 
  fallback="UI" 
/>`;

  const fallbacksCode = `<Avatar 
  src="https://broken-link.com/asset.png" 
  fallback="UX" 
/>`;

  const rightBarItems = [
    { label: "Interactive Playground", href: "#playground" },
    { label: "Error Handling & Fallbacks", href: "#fallbacks" },
    { label: "Properties API", href: "#props-api" },
  ];

  return (
    <DocsPageFrame
      leftBar={
        <aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-border/40">
          <DocsSidebar />
        </aside>
      }
      rightBar={<DocsOutline title="On this page" items={rightBarItems} />}
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">
        {/* Document Meta Header Block */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Base Primitives", href: "/docs/components#base" },
              { label: "Avatar", href: "/docs/components/avatar" },
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

          <p className="text-base leading-relaxed text-muted-foreground">
            {componentMeta.description}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={componentMeta.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconCode className="h-3.5 w-3.5" /> View Primitives Source
              <IconExternalLink className="h-2.5 w-2.5 text-muted-foreground/60" />
            </a>
          </div>
        </div>

        {/* 1. INTERACTIVE EXPERIMENTAL SANDBOX */}
        <section id="playground" className="space-y-4 scroll-mt-20">
          <div className="bg-secondary/20 border border-border/50 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sizing Controller */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Scale Uniform</span>
              <div className="flex gap-1 bg-background border border-border/60 p-0.5 rounded-lg text-xs font-medium">
                {(["sm", "md", "lg", "xl"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveSize(s)}
                    className={`flex-1 py-1 rounded-md uppercase transition-all ${activeSize === s ? "bg-card text-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Roundness Controller */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Mask Roundness</span>
              <div className="flex gap-1 bg-background border border-border/60 p-0.5 rounded-lg text-xs font-medium">
                {(["none", "sm", "md", "lg", "full"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setActiveRound(r)}
                    className={`flex-1 py-1 rounded-md capitalize transition-all ${activeRound === r ? "bg-card text-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
              <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs">
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, playground: "preview" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${(activeTabs["playground"] || "preview") === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, playground: "code" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${activeTabs["playground"] === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  Code
                </button>
              </div>
              <button
                onClick={() => handleCopy("playground", playgroundCode)}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {copiedId === "playground" ? <IconCheck className="h-3.5 w-3.5 text-emerald-500" /> : <IconCopy className="h-3.5 w-3.5" />}
                {copiedId === "playground" ? "Copied" : "Copy Primitives"}
              </button>
            </div>

            <div className="flex min-h-[140px] items-center justify-center p-6 bg-gradient-to-br from-transparent to-muted/5">
              {(activeTabs["playground"] || "preview") === "preview" ? (
                <Avatar
                  size={activeSize}
                  roundness={activeRound}
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  fallback="UX"
                />
              ) : (
                <pre className="w-full overflow-x-auto rounded-xl border border-border/60 bg-background/60 p-4 font-mono text-xs text-foreground"><code>{playgroundCode}</code></pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* 2. ERROR HANDLING & SYSTEM FALLBACKS */}
        <section id="fallbacks" className="space-y-3 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h3 className="text-lg font-bold tracking-tight text-foreground">Graceful Degradation Primitives</h3>
              <p className="text-xs text-muted-foreground">
                When network transactions fault, avatars trigger fallback modes cleanly, preserving layouts.
              </p>
            </div>
            
            <button
              onClick={() => setBrokenSrc(p => p.includes("broken") ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" : "https://broken-link.com/asset.png")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold border border-border/60 rounded-md px-2.5 py-1.5 bg-background hover:bg-secondary/40 transition-colors"
            >
              <IconRefresh className="h-3.5 w-3.5" /> Toggle Broken Endpoint
            </button>
          </div>

          <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
              <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs">
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, fallbacks: "preview" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${(activeTabs["fallbacks"] || "preview") === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, fallbacks: "code" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${activeTabs["fallbacks"] === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  Code
                </button>
              </div>
              <button onClick={() => handleCopy("fallbacks", fallbacksCode)} className="text-xs text-muted-foreground">{copiedId === "fallbacks" ? "Copied" : "Copy"}</button>
            </div>
            <div className="p-6 flex flex-col items-center justify-center gap-2">
              {(activeTabs["fallbacks"] || "preview") === "preview" ? (
                <>
                  <Avatar size="lg" roundness="md" src={brokenSrc} fallback={<IconUser className="h-5 w-5 stroke-[2.2]" />} />
                  <span className="text-[10px] text-muted-foreground italic tracking-tight">
                    Current Status: <span className={brokenSrc.includes("broken") ? "text-destructive font-bold" : "text-emerald-500 font-bold"}>{brokenSrc.includes("broken") ? "Injecting Broken 404 Fallback" : "Image Resolved Properly"}</span>
                  </span>
                </>
              ) : (
                <pre className="w-full overflow-x-auto rounded-xl border border-border/60 bg-background/60 p-4 font-mono text-xs text-foreground"><code>{fallbacksCode}</code></pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* 3. TECHNICAL API MATRIX SPECIFICATION */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconLayoutGrid stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">Properties API</h2>
              <p className="text-xs text-muted-foreground">Type signatures and parameter matrix maps assigned to individual Avatar nodes.</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/60 bg-card/30">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/30 font-semibold text-muted-foreground">
                  <th className="p-3 w-[18%]">Property</th>
                  <th className="p-3 w-[32%]">Type</th>
                  <th className="p-3 w-[12%]">Default</th>
                  <th className="p-3 w-[38%]">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-medium">
                {avatarProperties.map((prop) => (
                  <tr key={prop.name} className="transition-colors hover:bg-secondary/10 align-top">
                    <td className="p-3 font-mono font-bold text-primary">{prop.name}</td>
                    <td className="p-3 font-mono text-purple-600 dark:text-purple-400 leading-relaxed">{prop.type}</td>
                    <td className="p-3 font-mono text-foreground/70">{prop.default}</td>
                    <td className="p-3 font-normal leading-relaxed text-muted-foreground">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <DocsAdjacentNav />

        <footer className="border-t border-border/30 pt-4 text-center text-xs text-muted-foreground/40">
          © 2026 Venti UI Labs. System architecture primitives.
        </footer>
      </main>
    </DocsPageFrame>
  );
}