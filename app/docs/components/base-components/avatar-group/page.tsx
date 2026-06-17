"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCopy,
  IconExternalLink,
  IconLayoutGrid,
  IconUsers,
  IconLayersIntersect,
  IconSettings2,
} from "@tabler/icons-react";

import { AvatarGroup } from "@/components/avatarGroup";
import { Avatar } from "@/components/avatar";
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
  title: "Avatar Group",
  description:
    "Stacks overlapping avatars in a compact row.",
  version: "v1.2.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/avatar-group.tsx",
};

const propDefinitions = [
  {
    name: "orientation",
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description:
      "Sets the visual track direction and dynamically reverses layer alignment indices.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description:
      "Configures uniform height and width dimensions across all embedded profiles.",
  },
  {
    name: "max",
    type: "number",
    default: "4",
    description:
      "The ceiling threshold of visible profiles before dropping additional nodes into a trailing incremental counter.",
  },
  {
    name: "roundness",
    type: "'none' | 'sm' | 'md' | 'lg' | 'full'",
    default: "'full'",
    description:
      "Controls the perimeter mask radius of individual avatars and the backup count bubble.",
  },
];

const apiProperties = propDefinitions;

const mockProfiles = [
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    name: "Sarah Jenkins",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    name: "Marcus Chen",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    name: "Elena Rostova",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    name: "David Kojo",
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
    name: "Amélie Laurent",
  },
];

export default function AvatarGroupDocsPage() {
  const [activeOrientation, setActiveOrientation] = useState<
    "horizontal" | "vertical"
  >("horizontal");
  const [activeSize, setActiveSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [maxDisplay, setMaxDisplay] = useState<number>(3);

  const playgroundCode = `<AvatarGroup orientation="${activeOrientation}" size="${activeSize}" max={${maxDisplay}}>
  <Avatar src="${mockProfiles[0].src}" fallback="SJ" />
  <Avatar src="${mockProfiles[1].src}" fallback="MC" />
  <Avatar src="${mockProfiles[2].src}" fallback="ER" />
  <Avatar src="${mockProfiles[3].src}" fallback="DK" />
</AvatarGroup>`;

  const stackingCode = `<AvatarGroup orientation="vertical" size="lg" max={2}>
  <Avatar fallback="UX" className="bg-purple-500 text-white" />
  <Avatar fallback="FE" className="bg-blue-500 text-white" />
  <Avatar fallback="QA" className="bg-emerald-500 text-white" />
</AvatarGroup>`;

  return (
    <DocsPageFrame
      leftBar={
        <aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-border/40">
          <DocsSidebar />
        </aside>
      }
      rightBar={
        [
          { label: "Interactive Playground", href: "#playground" },
          { label: "Vertical Stacking", href: "#stacking-patterns" },
          { label: "Properties API", href: "#props-api" },
        ].map((item, idx) => (
          <DocsOutline key={idx} title="On this page" items={[item]} />
        ))[0] /* Unified frame usage */
      }
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">

        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              {
                label: "Structural Composites",
                href: "/docs/components#structural",
              },
              { label: "Avatar Group", href: "/docs/components/avatar-group" },
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

        <section id="playground" className="space-y-4 scroll-mt-20">
          <div className="bg-secondary/20 rounded-xl p-4 border border-border/50 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <IconSettings2 className="h-4 w-4 text-primary" /> Core Controls
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/80">
                  Orientation Track
                </label>
                <div className="flex gap-1 rounded-md border border-border/60 bg-background p-0.5 text-xs">
                  {["horizontal", "vertical"].map((o) => (
                    <button
                      key={o}
                      onClick={() => setActiveOrientation(o as any)}
                      className={`flex-1 py-1 rounded capitalize font-medium ${activeOrientation === o ? "bg-secondary text-foreground font-bold shadow-sm" : "text-muted-foreground"}`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/80">
                  Scale Uniform
                </label>
                <div className="flex gap-1 rounded-md border border-border/60 bg-background p-0.5 text-xs">
                  {["sm", "md", "lg", "xl"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setActiveSize(s as any)}
                      className={`flex-1 py-1 rounded uppercase font-medium ${activeSize === s ? "bg-secondary text-foreground font-bold shadow-sm" : "text-muted-foreground"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/80">
                  Display Cap ({maxDisplay})
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={maxDisplay}
                  onChange={(e) => setMaxDisplay(parseInt(e.target.value))}
                  className="w-full accent-primary bg-muted rounded-lg h-1.5 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <CodeBlock
            example={{
              id: "playground-preview",
              title: "Interactive Preview",
              description: "Use the controls to customize the appearance.",
              code: playgroundCode,
              render: () => (
                <AvatarGroup
                  orientation={activeOrientation}
                  size={activeSize}
                  max={maxDisplay}
                >
                  {mockProfiles.map((p, i) => (
                    <Avatar
                      key={i}
                      src={p.src}
                      fallback={p.name.slice(0, 2)}
                      aria-label={p.name}
                    />
                  ))}
                </AvatarGroup>
              ),
            }}
          />
        </section>

        <section id="stacking-patterns" className="space-y-3 scroll-mt-20">
          <CodeBlock
            example={{
              id: "stacking",
              title: "Vertical Stacking Channels",
              description: "Avatars stack vertically for sidebar layouts.",
              code: stackingCode,
              render: () => (
                <AvatarGroup orientation="vertical" size="lg" max={2}>
                  <Avatar
                    fallback="UX"
                    className="bg-purple-600 font-bold text-white"
                  />
                  <Avatar
                    fallback="FE"
                    className="bg-blue-600 font-bold text-white"
                  />
                  <Avatar
                    fallback="QA"
                    className="bg-emerald-600 font-bold text-white"
                  />
                </AvatarGroup>
              ),
            }}
          />
        </section>

        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="rounded-md border border-border/50 bg-secondary/50 p-1.5 text-primary">
              <IconLayoutGrid stroke={2} className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                API Reference
              </h2>
              <p className="text-xs text-muted-foreground">All available props for this component.</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/60 bg-card/30">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/30 font-semibold text-muted-foreground">
                  <th className="p-3 w-[20%]">Property</th>
                  <th className="p-3 w-[30%]">Type</th>
                  <th className="p-3 w-[15%]">Default</th>
                  <th className="p-3 w-[35%]">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-medium">
                {apiProperties.map((prop) => (
                  <tr
                    key={prop.name}
                    className="transition-colors hover:bg-secondary/10 align-top"
                  >
                    <td className="p-3 font-mono font-bold text-primary">
                      {prop.name}
                    </td>
                    <td className="p-3 font-mono text-purple-600 dark:text-purple-400 leading-relaxed">
                      {prop.type}
                    </td>
                    <td className="p-3 font-mono text-foreground/70">
                      {prop.default}
                    </td>
                    <td className="p-3 font-normal leading-relaxed text-muted-foreground">
                      {prop.description}
                    </td>
                  </tr>
                ))}
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