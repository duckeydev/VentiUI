"use client";

import {
  IconCompass,
  IconForms,
  IconLayoutGrid,
  IconLayersSubtract,
  IconPlug,
  IconSettings,
  IconTable,
} from "@tabler/icons-react";
import Link from "next/link";
import { DocsBreadcrumbs, DocsOutline, DocsPageFrame } from "../layout";
import DocsSidebar from "../Sidebar";
import { cardVariants } from "@/components/card";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/<[^>]*>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const componentDirectory = [
  {
    title: "Layout & Content",
    slug: "layout-and-content",
    description:
      "Structural building blocks for pages, spacing, media, and readable content patterns.",
    icon: IconLayoutGrid,
    color: "text-blue-500/80",
    items: [
      "Container",
      "Columns",
      "Grid",
      "Layout Splitter",
      "Typography",
      "Images",
      "Links",
      "Dividers and <hr>",
      "KBD",
      "Custom Scrollbar",
    ],
  },
  {
    title: "Base Components",
    slug: "base-components",
    description:
      "Foundational UI patterns for common product interfaces, cards, feedback states, and rich content blocks.",
    icon: IconLayersSubtract,
    color: "text-purple-500/80",
    items: [
      "Accordion",
      "Alerts",
      "Avatar",
      "Avatar Group",
      "Badge",
      "Blockquote",
      "Buttons",
      "Button Group",
      "Cards",
      "Chat Bubbles",
      "Carousel",
      "Collapse",
      "Datepicker",
      "Devices",
      "Lists",
      "List Group",
      "Legend Indicator",
      "Progress",
      "File Uploading Progress",
      "Ratings",
      "Skeleton",
      "Spinners",
      "Styled Icons",
      "Toasts",
      "Timeline",
      "Tree View",
      "Marquee",
    ],
  },
  {
    title: "Navigations",
    slug: "navigations",
    description:
      "Navigation systems for app shells, tabs, menus, sidebars, scroll tracking, and page wayfinding.",
    icon: IconCompass,
    color: "text-emerald-500/80",
    items: [
      "Navbar",
      "Mega Menu",
      "Navs",
      "Tabs",
      "Sidebar",
      "Scrollspy",
      "Breadcrumb",
      "Pagination",
      "Stepper",
    ],
  },
  {
    title: "Basic Forms",
    slug: "basic-forms",
    description:
      "Core form controls for text entry, file selection, choices, toggles, and common input states.",
    icon: IconForms,
    color: "text-amber-500/80",
    items: [
      "Input",
      "Input Group",
      "Textarea",
      "File Input",
      "Checkbox",
      "Radio",
      "Switch",
      "Select",
      "Range",
      "Color Picker",
      "TimePicker",
    ],
  },
  {
    title: "Advanced Forms",
    slug: "advanced-forms",
    description:
      "Enhanced input experiences for search, validation, quantity controls, copy flows, and richer selection patterns.",
    icon: IconSettings,
    color: "text-orange-500/80",
    items: [
      "Advanced Select",
      "ComboBox",
      "SearchBox",
      "Input Number",
      "Strong Password",
      "Toggle Password",
      "Toggle Count",
      "Copy Markup",
      "PIN Input",
    ],
  },
  {
    title: "Overlays",
    slug: "overlays",
    description:
      "Layered interactions for menus, drawers, dialogs, popovers, and contextual actions.",
    icon: IconLayersSubtract,
    color: "text-pink-500/80",
    items: [
      "Dropdown",
      "Context Menu",
      "Modal",
      "Offcanvas",
      "Popover",
      "Tooltip",
    ],
  },
  {
    title: "Tables",
    slug: "tables",
    description:
      "Responsive table patterns for dense information and data-heavy views.",
    icon: IconTable,
    color: "text-cyan-500/80",
    items: ["Tables"],
  },
  {
    title: "Third-Party Plugins",
    slug: "third-party-plugins",
    description:
      "Plugin-powered components for charts, maps, uploads, advanced date controls, editors, and richer interactions.",
    icon: IconPlug,
    color: "text-red-500/80",
    items: [
      "Advanced Range Slider",
      "Advanced Datepicker",
      "Charts",
      "Clipboard",
      "Confetti Animation",
      "Datamaps",
      "Datatables",
      "Drag and Drop",
      "File Upload",
      "Maps",
      "Toast Notifications",
      "WYSIWYG Editor",
    ],
  },
] as const;

const processedDirectory = componentDirectory.map((category) => ({
  ...category,
  items: category.items.map((item) => ({
    name: item,
    href: `/docs/components/${category.slug}/${slugify(item)}`,
  })),
}));

const rightBarItems = processedDirectory.map((category) => ({
  label: category.title,
  href: `#${category.slug}`,
}));

export default function ComponentsPage() {
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
        <div className="space-y-4 border-b border-border pb-8">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              { label: "Components", href: "/docs/components" },
            ]}
          />
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
            Component Directory
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            An ecosystem of modular, high-density primitives built atop Tailwind
            variables. Explore layouts, input forms, and overlay architectures.
          </p>
        </div>

        <div className="space-y-12">
          {processedDirectory.map((category) => {
            const CategoryIcon = category.icon;

            return (
              <section
                key={category.slug}
                id={category.slug}
                className="space-y-4 scroll-mt-20"
              >
                <div className="flex items-start gap-3 border-b border-border/40 pb-2">
                  <div
                    className={`rounded-md border border-border/50 bg-secondary/50 p-1.5 ${category.color}`}
                  >
                    <CategoryIcon stroke={2} className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h2 className="text-base font-bold tracking-tight text-foreground">
                      {category.title}
                    </h2>
                    <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">
                      {category.description}  
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {category.items.map(({ name, href }) => (
                    <Link
                      key={name}
                      href={href}
                      className={cardVariants({
                        // We have NO limits to integrate with YOUR systems.
                        variant: "minimal",
                        hoverable: true,
                        className:
                          "flex items-center justify-between p-2.5 text-xs font-medium",
                      })}
                    >
                      <span className="truncate">{name}</span>
                      <span className="ml-2 text-muted-foreground/0 transition-all group-hover:text-muted-foreground/80">
                        ›
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-border pt-8 text-sm">
          <Link
            href="/docs/introduction"
            className="group flex flex-col items-start gap-1 rounded-xl border border-border/70 bg-card/30 p-4 text-left transition-all hover:bg-secondary/40"
          >
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <span className="transition-transform group-hover:-translate-x-0.5">
                ←
              </span>{" "}
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
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
            <span className="font-semibold text-foreground">Installation</span>
          </Link>
        </div>

        <footer className="border-t border-border/30 pt-4 text-center text-xs text-muted-foreground/50">
          © 2026 Venti UI Labs. Expressive architecture.
        </footer>
      </main>
    </DocsPageFrame>
  );
}
