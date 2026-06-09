import type { ReactNode } from "react";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";

type DocsLink = {
  label: string;
  href: string;
  active?: boolean;
};

type DocsGroup = {
  title: string;
  links: DocsLink[];
};

type DocsOutlineItem = {
  label: string;
  href: string;
};

type DocsLayoutProps = {
  children: ReactNode;
};

type DocsSplitLayoutProps = {
  children: ReactNode;
  leftSidebar?: ReactNode;
  rightSidebar?: ReactNode;
  maxWidthClassName?: string;
};

type DocsPageFrameProps = {
  children: ReactNode;
  leftBar?: ReactNode;
  rightBar?: ReactNode;
  maxWidthClassName?: string;
};

type DocsSidebarSectionProps = {
  title: string;
  children: ReactNode;
};

type DocsSidebarNavProps = {
  groups: DocsGroup[];
};

type DocsBreadcrumbsProps = {
  items: DocsLink[];
};

type DocsOutlineProps = {
  title: string;
  items: DocsOutlineItem[];
};

type DocsPanelProps = {
  children: ReactNode;
  className?: string;
};

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10 selection:text-primary">
      <DocsHeader />
      {children}
    </div>
  );
}

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-1 text-lg font-bold tracking-tight">
            <span>Venti</span>
            <span className="text-muted-foreground font-light">UI</span>
          </Link>
          <span className="hidden h-4 w-px bg-border sm:inline-block" />
          <nav className="hidden items-center gap-5 text-sm font-medium text-muted-foreground sm:flex">
            <Link href="/docs/components" className="hover:text-foreground transition-colors">
              Documentation
            </Link>
            <Link href="/docs/themes" className="transition-colors hover:text-foreground">
              Themes
            </Link>
            <Link href="https://github.com/duckeydev/ventiui" className="transition-colors hover:text-foreground">
              GitHub
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded border border-border/80 bg-muted/60 px-2 py-0.5 font-mono text-xs text-muted-foreground">
            v1.0.0
          </span>
        </div>
      </div>
    </header>
  );
}

export function DocsSplitLayout({
  children,
  leftSidebar,
  rightSidebar,
  maxWidthClassName = "max-w-7xl",
}: DocsSplitLayoutProps) {
  return (
    <div className={`mx-auto ${maxWidthClassName} px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8`}>
      {leftSidebar}
      {children}
      {rightSidebar}
    </div>
  );
}

export function DocsPageFrame({
  children,
  leftBar,
  rightBar,
  maxWidthClassName = "max-w-7xl",
}: DocsPageFrameProps) {
  return (
    <DocsSplitLayout
      maxWidthClassName={maxWidthClassName}
      leftSidebar={leftBar}
      rightSidebar={rightBar}
    >
      {children}
    </DocsSplitLayout>
  );
}

export function DocsSidebarSection({ title, children }: DocsSidebarSectionProps) {
  return (
    <section className="space-y-2">
      <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">{title}</h4>
      {children}
    </section>
  );
}

export function DocsSidebarNav({ groups }: DocsSidebarNavProps) {
  return (
    <nav className="space-y-6 text-sm">
      {groups.map((group) => (
        <DocsSidebarSection key={group.title} title={group.title}>
          <ul className="space-y-1.5 border-l border-border pl-3 font-medium text-muted-foreground">
            {group.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={
                    link.active
                      ? "-ml-3.25 block border-l-2 border-primary py-0.5 pl-3 font-semibold text-primary"
                      : "block py-0.5 transition-all hover:translate-x-1 hover:text-foreground"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </DocsSidebarSection>
      ))}
    </nav>
  );
}

export function DocsBreadcrumbs({ items }: DocsBreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {index > 0 ? <IconChevronRight className="h-3 w-3 stroke-3 text-muted-foreground/40" /> : null}
            {isLast ? (
              <span className="font-semibold text-foreground">{item.label}</span>
            ) : (
              <Link href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export function DocsOutline({ title, items }: DocsOutlineProps) {
  return (
    <aside className="hidden py-10 text-xs lg:col-span-2 lg:block lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto lg:pl-6 lg:pr-2 lg:border-l lg:border-border/40">
      <div className="space-y-4">
        <h5 className="text-[11px] font-bold uppercase tracking-widest text-foreground">{title}</h5>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border/60" />
          <ul className="relative z-10 space-y-3 pl-4 font-medium text-muted-foreground">
            {items.map((item) => (
              <li key={item.href} className="group relative">
                <a href={item.href} className="block truncate transition-all duration-150 hover:translate-x-0.5 hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export function DocsPanel({ children, className }: DocsPanelProps) {
  return <div className={`rounded-4xl border border-white/8 bg-[#11151d] ${className ?? ""}`.trim()}>{children}</div>;
}