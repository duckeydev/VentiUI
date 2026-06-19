export type SidebarItem = { item: string; href: string };

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/<[^>]*>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const componentDirectory = [
  {
    title: "Getting Started",
    items: [
      { item: "Introduction", href: "/docs" },
      { item: "Components", href: "/docs/components" },
      { item: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Layout & Content",
    slug: "layout-and-content",
    items: [
      "Container",
      "Columns",
      "Grid",
      "Layout Splitter",
      "Typography",
      "Images",
      "Links",
      "Dividers",
      "KBD",
      "CodeBlock",
      "Custom Scrollbar",
    ],
  },
  {
    title: "Base Components",
    slug: "base-components",
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
      "Tabs",
      "Toasts",
      "Timeline",
      "Tree View",
      "Marquee",
    ],
  },
  {
    title: "Navigations",
    slug: "navigations",
    items: [
      "Navbar",
      "Mega Menu",
      "Navs",
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
      "Time Picker",
    ],
  },
  {
    title: "Advanced Forms",
    slug: "advanced-forms",
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
    items: ["Tables"],
  },
] as const;

export const SIDEBAR_MAP: Record<string, SidebarItem[]> = Object.fromEntries(
  componentDirectory.map((category) => {
    if (category.title === "Getting Started") {
      return [category.title, category.items];
    }

    return [
      category.title,
      category.items.map((item) => ({
        item,
        href: `/docs/components/${category.slug}/${slugify(item)}`,
      })),
    ];
  }),
);
