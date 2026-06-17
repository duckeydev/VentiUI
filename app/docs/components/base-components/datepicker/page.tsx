"use client";

import { useState } from "react";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconEye,
  IconExternalLink,
  IconSparkles,
} from "@tabler/icons-react";

import { DatePicker } from "@/components/datepicker";
import { TableColumn, Table } from "@/components/table";
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
  title: "DatePicker",
  description:
    "A date picker with popover and inline modes.",
  version: "v1.0.0",
  sourceUrl:
    "https://github.com/venti-ui/venti/blob/main/packages/datepicker.tsx",

  category: "base-components",
  apiDescription: "The DatePicker component provides a versatile UI primitive.",
};

const examples = [
  {
    id: "default-usage",
    title: "Standard Selector",
    description:
      "Click the input to open the date picker.",
    code: `import { useState } from "react";
import { DatePicker } from "@/components/datepicker";

export function BasicDate() {
  const [date, setDate] = useState<Date>();

  return (
    <DatePicker 
      value={date} 
      onChange={setDate} 
      placeholder="Select launch date..."
    />
  );
}`,
    render: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [date, setDate] = useState<Date | undefined>();
      return (
        <div className="w-full flex justify-center py-10">
          <DatePicker
            value={date}
            onChange={setDate}
            placeholder="Select launch date..."
          />
        </div>
      );
    },
  },
  {
    id: "inline-calendar",
    title: "Inline View Container",
    description:
      "The calendar renders inline without a popover.",
    code: `import { useState } from "react";
import { DatePicker } from "@/components/datepicker";

export function InlineDate() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="p-4 rounded-xl border border-border/50 bg-secondary/20 inline-block">
      <DatePicker 
        inline
        value={date} 
        onChange={setDate} 
      />
    </div>
  );
}`,
    render: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [date, setDate] = useState<Date | undefined>();
      return (
        <div className="w-full flex justify-center">
          <div className="p-4 rounded-xl border border-border/50 bg-secondary/20 inline-block shadow-sm">
            <DatePicker inline value={date} onChange={setDate} />
          </div>
        </div>
      );
    },
  },
  {
    id: "min-max-bounds",
    title: "Min / Max Range Bounds",
    description:
      "Set minimum and maximum selectable dates.",
    code: `import { useState } from "react";
import { DatePicker } from "@/components/datepicker";

export function BoundedDate() {
  const [date, setDate] = useState<Date>();
  

  const today = new Date();
  const maxLimit = new Date();
  maxLimit.setDate(today.getDate() + 14);

  return (
    <DatePicker 
      value={date} 
      onChange={setDate} 
      minDate={today}
      maxDate={maxLimit}
      placeholder="Select delivery window..."
    />
  );
}`,
    render: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [date, setDate] = useState<Date | undefined>();

      const today = new Date();
      const maxLimit = new Date();
      maxLimit.setDate(today.getDate() + 14);

      return (
        <div className="w-full flex justify-center py-10">
          <DatePicker
            value={date}
            onChange={setDate}
            minDate={today}
            maxDate={maxLimit}
            placeholder="Select delivery window..."
          />
        </div>
      );
    },
  },
];

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

const apiProperties: ApiProperty[] = [
  {
    name: "value",
    type: "Date",
    default: "undefined",
    description:
      "Currently active date object controlling standard internal selection matrix states.",
  },
  {
    name: "onChange",
    type: "(date: Date) => void",
    default: "undefined",
    description:
      "Standard execution trigger hook fired immediately upon calendar integer interaction.",
  },
  {
    name: "minDate",
    type: "Date",
    default: "undefined",
    description:
      "Enforces a mathematical floor preventing selection vectors before defined logical timestamp limits.",
  },
  {
    name: "maxDate",
    type: "Date",
    default: "undefined",
    description:
      "Enforces a mathematical ceiling disabling interface inputs targeting out-of-bounds ranges.",
  },
  {
    name: "inline",
    type: "boolean",
    default: "false",
    description:
      "Forces structural component rendering into relative block grids voiding Popover input mechanics.",
  },
  {
    name: "placeholder",
    type: "string",
    default: "'Pick a date'",
    description:
      "Dictates input fallback parameters if undefined initialization state occurs.",
  },
  {
    name: "formatDate",
    type: "(date: Date) => string",
    default: "undefined",
    description:
      "Overrides default English timestamp formatting with direct string output mapping.",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description:
      "Appends extra CSS variables immediately onto outer hierarchy wrapper tags.",
  },
];
const columns: TableColumn<ApiProperty>[] = [
  { key: "name", header: "Property", width: "20%", className: "font-mono font-bold text-primary p-4" },
  { key: "type", header: "Type", width: "30%", className: "font-mono text-[10px] text-muted-foreground leading-relaxed p-4" },
  { key: "default", header: "Default", width: "15%", className: "font-mono text-foreground/70 italic p-4", render: (row: ApiProperty) => row.default || <span className="text-muted-foreground/30">&mdash;</span> },
  { key: "description", header: "Description", width: "35%", className: "font-normal leading-relaxed text-muted-foreground p-4" },
];

const outlineItems = [
  ...examples.map((example) => ({
    label: example.title,
    href: `#${example.id}`,
  })),
  { label: "Properties API", href: "#props-api" },
];

export default function DatePickerDocsPage() {
  return (
    <DocsPageFrame
      leftBar={
        <aside className="hidden py-10 lg:col-span-3 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pr-6 lg:border-r lg:border-border/40">
          <DocsSidebar />
        </aside>
      }
      rightBar={<DocsOutline title="On this page" items={outlineItems} />}
    >
      <main className="py-10 lg:col-span-7 space-y-12 lg:max-w-3xl">

        <div className="space-y-3 border-b border-border pb-6">
          <DocsBreadcrumbs
            items={[
              { label: "Docs", href: "/docs" },
              {
                label: "Base Components",
                href: "/docs/components#base-components",
              },
              {
                label: componentMeta.title,
                href: "/docs/components/base-components/datepicker",
              },
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
          </p>        </div>

        <div className="space-y-10">
          {examples.map((example) => (
            <CodeBlock key={example.id} example={example} />
          ))}
        </div>

        <section id="props-api" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                API Reference
              </h2>
              <p className="text-xs text-muted-foreground">All available props for this component.</p>
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

        <footer className="border-t border-border/30 pt-8 pb-10 text-center text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/40">
          © 2026 Venti UI Labs. UI made right.
        </footer>
      </main>
    </DocsPageFrame>
  );
}
