"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { SIDEBAR_MAP, type SidebarItem } from "./navigationMap";

function findAdjacent(pathname: string): { prev?: SidebarItem; next?: SidebarItem } {
  for (const items of Object.values(SIDEBAR_MAP)) {
    const idx = items.findIndex((it) => it.href === pathname);
    if (idx !== -1) {
      return {
        prev: idx > 0 ? items[idx - 1] : undefined,
        next: idx < items.length - 1 ? items[idx + 1] : undefined,
      };
    }
  }

  return {};
}

export default function DocsAdjacentNav() {
  const pathname = usePathname() ?? "";
  const { prev, next } = findAdjacent(pathname);

  if (!prev && !next) return null;

  return (
    <div className="grid grid-cols-2 gap-4 border-t border-border pt-8 text-sm">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col items-start gap-1 rounded-xl border border-border/70 bg-card/30 p-4 text-left transition-all hover:bg-secondary/40"
        >
          <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <IconArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" /> Previous
          </span>
          <span className="font-semibold text-foreground">{prev.item} Component</span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1 rounded-xl border border-border/70 bg-card/30 p-4 text-right transition-all hover:bg-secondary/40"
        >
          <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            Next <IconArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="font-semibold text-foreground">{next.item} Component</span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
