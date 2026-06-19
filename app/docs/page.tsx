import {
  IconCompass,
  IconForms,
  IconLayoutGrid,
  IconLayersSubtract,
  IconPlug,
  IconSettings,
  IconTable,
} from "@tabler/icons-react";
import { Typography } from "@/components/typography";
import { Button } from "@/components/button";
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame } from "./layout";
import DocsSidebar from "./Sidebar";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { List, ListItem } from "@/components/list";

const rightBarItems = [
  { label: "Overview", href: "#overview" },
  { label: "Features", href: "#features" },
  { label: "Getting started", href: "#getting-started" },
];

export default function IntroductionPage() {
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
        <div className="space-y-4 border-b border-border pb-8" id="overview">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Introduction", href: "/docs/introduction" },
            ]}
          />
          <Typography variant="h1">VentiUI</Typography>
          <Typography variant="lead">
            A composable, Tailwind-first component library built for speed and
            clarity. Ship consistent UIs with accessible primitives, CSS
            variables, and a minimal design system that adapts to your project.
          </Typography>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/docs/installation">
              Get started
            </Button>
            <Button href="/docs/components" variant="outline">
              Explore components
            </Button>
          </div>
        </div>

        <section className="space-y-6" id="features">
          <Typography variant="h2">What you'll get</Typography>
          <Typography variant="body">
            Thoughtful primitives, layout utilities, and accessible patterns
            ready for production.
          </Typography>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card variant="modern" hoverable className="max-w-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconLayoutGrid className="h-6 w-6 text-foreground/90" />
                  Layout Primitives
                </CardTitle>
                <CardDescription>
                  Experiment with active interface styles using the runtime
                  token modifiers above.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="modern" hoverable className="max-w-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconForms className="h-6 w-6 text-foreground/90" />
                  Form controls
                </CardTitle>
                <CardDescription>
                  Accessible inputs, selects, and validation-ready patterns that
                  reduce friction.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="modern" hoverable className="max-w-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconLayersSubtract className="h-6 w-6 text-foreground/90" />
                  Overlay systems
                </CardTitle>
                <CardDescription>
                  Modals, popovers, and dropdowns with focus management and
                  composability.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="modern" hoverable className="max-w-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconCompass className="h-6 w-6 text-foreground/90" />
                  Design tokens
                </CardTitle>
                <CardDescription>
                  Themeable CSS variables for colors, radii, and spacing to
                  align with your brand.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section id="getting-started" className="space-y-4">
          <Typography variant="h2">Getting started</Typography>
          <List as="ol" marker="decimal" spacing="loose">
            <ListItem>Install VentiUI via your package manager.</ListItem>
            <ListItem>
              Wrap your app with the theme provider and Tailwind variables.
            </ListItem>
            <ListItem>
              Browse the components and copy examples to prototype quickly.
            </ListItem>
          </List>
        </section>

        <div className="grid grid-cols-2 gap-4 border-t border-border pt-8 text-sm">
          <Link
            href="/docs/introduction"
            className="group flex flex-col items-start gap-1 rounded-xl border border-border/70 bg-card/30 p-4 text-left transition-all hover:bg-secondary/40"
          >
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <span className="transition-transform group-hover:-translate-x-0.5">←</span>{" "}
              Previous
            </span>
            <span className="font-semibold text-foreground">Introduction</span>
          </Link>
          <Link
            href="/docs/installation"
            className="group flex flex-col items-end gap-1 rounded-xl border border-border/70 bg-card/30 p-4 text-right transition-all hover:bg-secondary/40"
          >
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              Next{" "}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
            <span className="font-semibold text-foreground">Installation</span>
          </Link>
        </div>

        <footer className="border-t border-border/30 pt-4 text-center text-xs text-muted-foreground/50">
          © 2026 Venti UI Labs.
        </footer>
      </main>
    </DocsPageFrame>
  );
}
