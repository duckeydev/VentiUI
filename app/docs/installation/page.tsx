"use client";

import { Typography } from "@/components/typography";
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/card";
import { Badge } from "@/components/badge";
import { Kbd } from "@/components/kbd";
import { Tabs } from "@/components/tabs";
import { IconBrandNpm, IconTerminal2, IconPackage, IconCopy, IconCheck } from "@tabler/icons-react";
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame } from "../layout";
import DocsSidebar from "../Sidebar";
import DocsAdjacentNav from "../DocsAdjacentNav";
import { useState } from "react";

const CLI_CONTENT = `bash <(curl -s https://raw.githubusercontent.com/duckeydev/VentiUI/main/install.sh) my-app`;

const INSTALL_DEPS = `npm install framer-motion class-variance-authority clsx tailwind-merge @tabler/icons-react
npm install -D tailwindcss @tailwindcss/postcss`;

const TSCONFIG_PATHS = `{
  "compilerOptions": {
    "paths": { "@/*": ["./*"] }
  }
}`;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0"
    >
      {copied ? <IconCheck className="h-3.5 w-3.5 text-emerald-500" /> : <IconCopy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

const rightBarItems = [
  { label: "Quick scaffold", href: "#quick-scaffold" },
  { label: "Manual install", href: "#manual-install" },
  { label: "Peer dependencies", href: "#peer-dependencies" },
  { label: "PostCSS & Tailwind", href: "#postcss-tailwind" },
  { label: "TypeScript setup", href: "#typescript-setup" },
  { label: "Import components", href: "#import-components" },
  { label: "Next steps", href: "#next-steps" },
];

export default function InstallationPage() {
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
        <div className="space-y-4 border-b border-border pb-8" id="quick-scaffold">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Installation", href: "/docs/installation" },
            ]}
          />

          <Typography variant="h1">Installation</Typography>

          <Typography variant="lead">
            Add Venti UI to your Next.js project with the CLI scaffold
            or manually copy the components you need.
          </Typography>
        </div>

        <section className="space-y-6 scroll-mt-20" id="quick-scaffold">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary/10 p-1.5">
              <IconPackage className="h-4 w-4 text-primary" />
            </div>
            <Typography variant="h2">Quick scaffold</Typography>
            <Badge variant="success" size="sm">Recommended</Badge>
          </div>

          <Typography variant="body">
            The fastest way to start is with the <code>create-venti-app</code> CLI.
            It scaffolds a full Next.js project with all components, the theme engine,
            and Tailwind CSS v4 pre-configured.
          </Typography>

          <Card variant="minimal" className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between bg-muted/30 border-b border-border/30 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <IconTerminal2 className="h-4 w-4 text-foreground/60" />
                  <span className="text-xs font-medium text-muted-foreground">Terminal</span>
                </div>
                <CopyButton text={CLI_CONTENT} />
              </div>
              <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-foreground font-mono">
                {CLI_CONTENT}
              </pre>
            </CardContent>
          </Card>

          <Typography variant="body">
            Or run interactively to choose options:
          </Typography>

          <Card variant="minimal" className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between bg-muted/30 border-b border-border/30 px-4 py-2.5">
                <span className="text-xs font-medium text-muted-foreground">Terminal</span>
                <CopyButton text="bash <(curl -s https://raw.githubusercontent.com/duckeydev/VentiUI/main/install.sh)" />
              </div>
              <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-foreground font-mono">
                bash &lt;(curl -s https://raw.githubusercontent.com/duckeydev/VentiUI/main/install.sh)
              </pre>
            </CardContent>
          </Card>

          <div className="rounded-xl border border-border/50 bg-card p-4 space-y-2">
            <Typography variant="small" className="font-semibold uppercase tracking-wider">What you get</Typography>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Next.js + TypeScript + Tailwind CSS v4
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                65+ components in <code>components/</code>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Utility library (<code>cn()</code>, theme engine) in <code>lib/</code>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                shadcn-style CSS variables with Coffee light/dark theme
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-6 scroll-mt-20" id="manual-install">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-amber-500/10 p-1.5">
              <IconBrandNpm className="h-4 w-4 text-amber-500" />
            </div>
            <Typography variant="h2">Manual install</Typography>
          </div>

          <Typography variant="body">
            If you already have a project, install the required dependencies:
          </Typography>

          <Card variant="minimal" className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between bg-muted/30 border-b border-border/30 px-4 py-2.5">
                <span className="text-xs font-medium text-muted-foreground">Terminal</span>
                <CopyButton text={INSTALL_DEPS} />
              </div>
              <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-foreground font-mono whitespace-pre-wrap">
                {INSTALL_DEPS}
              </pre>
            </CardContent>
          </Card>

          <Typography variant="body">
            Then copy the files you need from <code>components/</code>, <code>lib/</code>,
            and <code>app/globals.css</code> into your project.
          </Typography>
        </section>

        <section className="space-y-6 scroll-mt-20" id="peer-dependencies">
          <Typography variant="h2">Peer dependencies</Typography>

          <Typography variant="body">
            These packages are required at runtime. The scaffold installs them automatically.
          </Typography>

          <Card variant="minimal" className="overflow-hidden">
            <CardContent className="p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { name: "react", version: "^19.0.0" },
                  { name: "react-dom", version: "^19.0.0" },
                  { name: "framer-motion", version: "^12.0.0" },
                  { name: "tailwindcss", version: "^4.0.0" },
                  { name: "class-variance-authority", version: "^0.7.0" },
                  { name: "clsx", version: "^2.0.0" },
                  { name: "tailwind-merge", version: "^3.0.0" },
                  { name: "@tabler/icons-react", version: "^3.44.0" },
                ].map((dep) => (
                  <div
                    key={dep.name}
                    className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 px-3 py-2"
                  >
                    <span className="text-sm font-medium text-foreground">{dep.name}</span>
                    <span className="text-xs font-mono text-muted-foreground">{dep.version}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6 scroll-mt-20" id="postcss-tailwind">
          <Typography variant="h2">PostCSS &amp; Tailwind</Typography>

          <Typography variant="body">
            Venti UI uses Tailwind CSS v4 with the <code>@tailwindcss/postcss</code> plugin.
            Your <code>postcss.config.mjs</code> should look like this:
          </Typography>

          <Card variant="minimal" className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between bg-muted/30 border-b border-border/30 px-4 py-2.5">
                <span className="text-xs font-medium text-muted-foreground">postcss.config.mjs</span>
                <CopyButton text={'const config = { plugins: { "@tailwindcss/postcss": {} } };\nexport default config;'} />
              </div>
              <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-foreground font-mono">
                {`const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;`}
              </pre>
            </CardContent>
          </Card>

          <Typography variant="body">
            The <code>app/globals.css</code> file imports Tailwind and defines
            CSS variable tokens for the Coffee theme. The scaffold creates this
            automatically.
          </Typography>

          <Card variant="minimal" className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between bg-muted/30 border-b border-border/30 px-4 py-2.5">
                <span className="text-xs font-medium text-muted-foreground">app/globals.css</span>
                <CopyButton text={`@import "tailwindcss";`} />
              </div>
              <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-foreground font-mono">
                {`@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  /* ... all shadcn-style CSS variable tokens ... */
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
}

:root {
  /* Coffee light theme */
  --background: oklch(0.995 0.008 80);
  --primary: oklch(0.4 0.08 50);
  /* ... */
}

.dark {
  /* Coffee dark theme */
  --background: oklch(0.14 0.015 50);
  --primary: oklch(0.65 0.1 50);
  /* ... */
}`}
              </pre>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6 scroll-mt-20" id="typescript-setup">
          <Typography variant="h2">TypeScript setup</Typography>

          <Typography variant="body">
            Components use the <code>@/*</code> import alias. Ensure your
            <code>tsconfig.json</code> includes:
          </Typography>

          <Card variant="minimal" className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between bg-muted/30 border-b border-border/30 px-4 py-2.5">
                <span className="text-xs font-medium text-muted-foreground">tsconfig.json</span>
                <CopyButton text={`"paths": { "@/*": ["./*"] }`} />
              </div>
              <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-foreground font-mono">
                {TSCONFIG_PATHS}
              </pre>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6 scroll-mt-20" id="import-components">
          <Typography variant="h2">Import components</Typography>

          <Typography variant="body">
            All components are imported from <code>@/components/&lt;name&gt;</code>.
            Utility functions live in <code>@/lib/</code>.
          </Typography>

          <Card variant="minimal" className="overflow-hidden">
            <CardContent className="p-5 space-y-4">
              <Typography variant="code" className="text-xs">Single import</Typography>
              <pre className="rounded-lg bg-muted/40 border border-border/40 p-3 text-sm leading-relaxed text-foreground font-mono">
                {`import { Button } from "@/components/button";`}
              </pre>

              <Typography variant="code" className="text-xs">Multiple imports</Typography>
              <pre className="rounded-lg bg-muted/40 border border-border/40 p-3 text-sm leading-relaxed text-foreground font-mono">
                {`import { Card, CardContent, CardHeader } from "@/components/card";
import { cn } from "@/lib/utils";`}
              </pre>

              <Typography variant="code" className="text-xs">With icons</Typography>
              <pre className="rounded-lg bg-muted/40 border border-border/40 p-3 text-sm leading-relaxed text-foreground font-mono">
                {`import { IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/button";

export default function CTA() {
  return (
    <Button rightIcon={<IconArrowRight className="h-4 w-4" />}>
      Continue
    </Button>
  );
}`}
              </pre>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6 scroll-mt-20" id="next-steps">
          <Typography variant="h2">Next steps</Typography>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card variant="modern" hoverable className="p-5">
              <CardContent className="p-0 space-y-2">
                <Typography variant="h4">Browse components</Typography>
                <Typography variant="body">
                  Explore the full catalog of 65+ components with live examples
                  and code snippets.
                </Typography>
                <Button variant="minimal" size="sm" href="/docs/components" className="mt-2">
                  View components →
                </Button>
              </CardContent>
            </Card>

            <Card variant="modern" hoverable className="p-5">
              <CardContent className="p-0 space-y-2">
                <Typography variant="h4">Customize themes</Typography>
                <Typography variant="body">
                  Use the Theme Studio to tweak colors, radius, and export your
                  design tokens.
                </Typography>
                <Button variant="minimal" size="sm" href="/docs/themes" className="mt-2">
                  Open Theme Studio →
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <DocsAdjacentNav />

        <footer className="border-t border-border/30 pt-8 pb-10 text-center text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/40">
          © 2026 Venti UI Labs.
        </footer>
      </main>
    </DocsPageFrame>
  );
}
