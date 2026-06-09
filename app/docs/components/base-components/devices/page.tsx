"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconDeviceMobile,
  IconDeviceTablet,
  IconLayoutGrid,
  IconNetwork,
  IconShieldLock,
} from "@tabler/icons-react";

import { DeviceMockup } from "@/components/devices"; 
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame, DocsPanel } from "../../../layout";
import DocsSidebar from "../../../Sidebar";
import DocsAdjacentNav from "../../../DocsAdjacentNav";

const componentMeta = {
  title: "Device Mockup",
  description: "Polished viewport canvas containers styled as native hardware frames. Ideal for showcasing responsive software layouts, high-fidelity landing graphics, and app interfaces.",
  version: "v1.1.0",
  sourceUrl: "https://github.com/venti-ui/venti/blob/main/packages/device-mockup.tsx",
};

const apiProperties = [
  { name: "type", type: "'phone' | 'tablet'", default: "'phone'", description: "Configures the external structural bezel parameters and structural factor dimensions." },
  { name: "animate", type: "boolean", default: "true", description: "Enables hardware-accelerated spring entry transitions when mounting into active view tracks." },
  { name: "className", type: "string", default: "''", description: "Standard utility appending parameters straight onto the outer structural hardware chassis frame layer." },
  { name: "children", type: "React.ReactNode", default: "undefined", description: "Clipped inner frame view hierarchy containing your target app dashboards or interface elements." },
];

export default function DevicesDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "code">>({
    phone: "preview",
    tablet: "preview",
  });

  const handleCopy = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const phoneCode = `<DeviceMockup type="phone">
  <div className="flex flex-col h-full bg-gradient-to-b from-neutral-900 to-black text-white p-5">
    {/* Status Row */}
    <div className="flex justify-between text-[10px] font-bold opacity-60 mb-6 pt-1">
      <span>09:41</span>
      <div className="flex gap-1"><span>5G</span><span>100%</span></div>
    </div>
    {/* Micro-App Content */}
    <div className="space-y-4 flex-1 flex flex-col justify-center">
      <div className="h-10 w-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary mx-auto">
        <IconShieldLock className="h-5 w-5" />
      </div>
      <div className="text-center space-y-1">
        <h4 className="text-sm font-bold tracking-tight">Identity Verified</h4>
        <p className="text-[11px] text-muted-foreground max-w-[180px] mx-auto">Biometric session token renewed cleanly.</p>
      </div>
    </div>
  </div>
</DeviceMockup>`;

  const tabletCode = `<DeviceMockup type="tablet">
  <div className="flex h-full bg-neutral-900 text-neutral-100">
    {/* Navigation Column */}
    <aside className="w-44 border-r border-neutral-800 bg-neutral-950 p-4 space-y-3">
      <div className="h-5 w-20 rounded bg-neutral-800" />
      <div className="space-y-1.5 pt-2">
        <div className="h-3.5 w-full rounded bg-primary/20 border border-primary/30" />
        <div className="h-3.5 w-3/4 rounded bg-neutral-800" />
        <div className="h-3.5 w-5/6 rounded bg-neutral-800" />
      </div>
    </aside>
    {/* Main Matrix Dashboard Canvas */}
    <main className="flex-1 p-5 space-y-4">
      <div className="flex justify-between items-center"><div className="h-6 w-32 rounded bg-neutral-800" /><div className="h-4 w-12 rounded bg-neutral-800" /></div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-24 rounded-xl border border-neutral-800 bg-neutral-950/40 p-3" />
        <div className="h-24 rounded-xl border border-neutral-800 bg-neutral-950/40 p-3" />
        <div className="h-24 rounded-xl border border-neutral-800 bg-neutral-950/40 p-3" />
      </div>
    </main>
  </div>
</DeviceMockup>`;

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
            { label: "Phone Viewport", href: "#phone-viewport" },
            { label: "Tablet Viewport", href: "#tablet-viewport" },
            { label: "Properties API", href: "#props-api" },
          ]}
        />
      }
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">
        {/* Document Meta Header Block */}
        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Showcase Primitives", href: "/docs/components#showcase" },
              { label: "Device Mockup", href: "/docs/components/device-mockup" },
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

        {/* 1. SMARTPHONE CHASSIS VIEW */}
        <section id="phone-viewport" className="space-y-3 scroll-mt-20">
          <div className="flex items-center gap-2">
            <IconDeviceMobile className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-bold tracking-tight text-foreground">Phone Showcase Viewport</h3>
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Renders a standard compact layout, complete with dynamic volume buttons, a camera array cutout, and a persistent home indicator tracking line.
          </p>

          <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
              <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs font-medium">
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, phone: "preview" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${activeTabs.phone === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, phone: "code" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${activeTabs.phone === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  Code
                </button>
              </div>
              <button
                onClick={() => handleCopy("phone", phoneCode)}
                className="text-xs text-muted-foreground font-medium flex items-center gap-1 hover:text-foreground"
              >
                {copiedId === "phone" ? <IconCheck className="h-3.5 w-3.5 text-emerald-500" /> : <IconCopy className="h-3.5 w-3.5" />}
                Copy Callout
              </button>
            </div>

            <div className="p-8 flex justify-center bg-gradient-to-tr from-transparent to-muted/5 overflow-hidden">
              {activeTabs.phone === "preview" ? (
                <DeviceMockup type="phone">
                  <div className="flex flex-col h-full bg-gradient-to-b from-neutral-950 to-neutral-900 text-white p-5 select-none">
                    <div className="flex justify-between text-[10px] font-bold opacity-40 mb-6 pt-1 tracking-tight">
                      <span>09:41</span>
                      <div className="flex gap-1"><span>5G</span><span>100%</span></div>
                    </div>
                    <div className="space-y-4 flex-1 flex flex-col justify-center">
                      <div className="h-11 w-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto shadow-inner">
                        <IconShieldLock className="h-5 w-5 stroke-[2.2]" />
                      </div>
                      <div className="text-center space-y-1.5">
                        <h4 className="text-xs font-bold tracking-tight text-neutral-100">Identity Secure</h4>
                        <p className="text-[10px] text-neutral-400 max-w-[170px] mx-auto leading-normal font-medium">
                          Biometric verification pipeline synchronized successfully.
                        </p>
                      </div>
                    </div>
                  </div>
                </DeviceMockup>
              ) : (
                <pre className="w-full overflow-x-auto rounded-xl border border-border/60 bg-background/60 p-4 font-mono text-xs text-foreground"><code>{phoneCode}</code></pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* 2. LANDSCAPE TABLET VIEW */}
        <section id="tablet-viewport" className="space-y-3 scroll-mt-20">
          <div className="flex items-center gap-2">
            <IconDeviceTablet className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-bold tracking-tight text-foreground">Tablet Showcase Viewport</h3>
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Provides a wide orientation matrix frame, making it ideal for layout verification across desktop-lite grids or administrative system tools.
          </p>

          <DocsPanel className="overflow-hidden rounded-xl bg-card/20">
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-1.5">
              <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/50 p-0.5 text-xs font-medium">
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, tablet: "preview" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${activeTabs.tablet === "preview" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTabs((p) => ({ ...p, tablet: "code" }))}
                  className={`px-2.5 py-1 rounded-md transition-all ${activeTabs.tablet === "code" ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  Code
                </button>
              </div>
              <button
                onClick={() => handleCopy("tablet", tabletCode)}
                className="text-xs text-muted-foreground font-medium flex items-center gap-1 hover:text-foreground"
              >
                {copiedId === "tablet" ? <IconCheck className="h-3.5 w-3.5 text-emerald-500" /> : <IconCopy className="h-3.5 w-3.5" />}
                Copy Callout
              </button>
            </div>

            <div className="p-8 flex justify-center bg-gradient-to-tr from-transparent to-muted/5 overflow-x-auto">
              {activeTabs.tablet === "preview" ? (
                <DeviceMockup type="tablet">
                  <div className="flex h-full bg-neutral-950 text-neutral-200 select-none font-sans">
                    <aside className="w-36 border-r border-neutral-800/60 bg-neutral-900/40 p-3.5 space-y-4">
                      <div className="h-4 w-16 rounded bg-neutral-800" />
                      <div className="space-y-2 pt-1">
                        <div className="h-3 w-full rounded bg-primary/10 border border-primary/20 flex items-center px-1.5"><div className="w-1.5 h-1.5 rounded-full bg-primary" /></div>
                        <div className="h-3 w-4/5 rounded bg-neutral-800/60" />
                        <div className="h-3 w-5/6 rounded bg-neutral-800/60" />
                      </div>
                    </aside>
                    <main className="flex-1 p-4 space-y-3.5">
                      <div className="flex justify-between items-center">
                        <div className="h-4 w-28 rounded bg-neutral-800" />
                        <div className="h-3.5 w-10 rounded bg-neutral-800" />
                      </div>
                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="h-20 rounded-lg border border-neutral-800 bg-neutral-900/20 p-2 flex flex-col justify-between"><div className="w-4 h-4 text-primary"><IconNetwork className="w-full h-full" /></div><div className="h-2 w-10 bg-neutral-800 rounded" /></div>
                        <div className="h-20 rounded-lg border border-neutral-800 bg-neutral-900/20 p-2 flex flex-col justify-between"><div className="w-4 h-4 text-purple-400"><IconLayoutGrid className="w-full h-full" /></div><div className="h-2 w-12 bg-neutral-800 rounded" /></div>
                        <div className="h-20 rounded-lg border border-neutral-800 bg-neutral-900/20 p-2 flex flex-col justify-between"><div className="w-4 h-4 text-neutral-500" /><div className="h-2 w-8 bg-neutral-800 rounded" /></div>
                      </div>
                    </main>
                  </div>
                </DeviceMockup>
              ) : (
                <pre className="w-full overflow-x-auto rounded-xl border border-border/60 bg-background/60 p-4 font-mono text-xs text-foreground"><code>{tabletCode}</code></pre>
              )}
            </div>
          </DocsPanel>
        </section>

        {/* 3. TECHNICAL API MATRIX PARAMETERS */}
        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconLayoutGrid stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">Properties API</h2>
              <p className="text-xs text-muted-foreground">Type signatures and custom properties assigned directly onto the device mockups.</p>
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
                {apiProperties.map((prop) => (
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