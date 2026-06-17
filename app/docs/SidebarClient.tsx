"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { SIDEBAR_MAP } from "./navigationMap";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function SidebarClient() {
  const pathname = usePathname() ?? "/";

  const groupVariants = {
    collapsed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.18, ease: "easeInOut" },
    },
    expanded: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.24,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.03,
        delayChildren: 0.02,
      },
    },
  } as const satisfies Variants;

  const itemVariants = {
    collapsed: { opacity: 0, x: -8 },
    expanded: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.18, ease: "easeOut" },
    },
  } as const satisfies Variants;

  // Track manual user toggles only
  const [userToggledGroups, setUserToggledGroups] = useState<
    Record<string, boolean>
  >({});

  // 1. Find the true active group by checking the longest matching href first
  const currentActiveGroup = useMemo(() => {
    let bestMatchGroup = "Getting Started";
    let longestMatchLength = 0;

    for (const [title, items] of Object.entries(SIDEBAR_MAP)) {
      for (const entry of items) {
        if (isActive(pathname, entry.href)) {
          // Track the most explicit/longest matching URL path
          if (entry.href.length > longestMatchLength) {
            longestMatchLength = entry.href.length;
            bestMatchGroup = title;
          }
        }
      }
    }

    return bestMatchGroup;
  }, [pathname]);

  // 2. Build group items and state derived dynamically from render
  const groups = useMemo(() => {
    return Object.entries(SIDEBAR_MAP).map(([title, items]) => {
      // Find exact active item within this group
      const updatedItems = items.map((entry) => ({
        ...entry,
        active: isActive(pathname, entry.href) && title === currentActiveGroup,
      }));

      // Active category stays open, user clicks override others, fallback defaults
      const isExplicitlyToggled = userToggledGroups[title] !== undefined;
      const isCollapsed =
        title === currentActiveGroup
          ? false
          : isExplicitlyToggled
            ? userToggledGroups[title]
            : title !== "Getting Started";

      return {
        title,
        isCollapsed,
        items: updatedItems,
      };
    });
  }, [pathname, currentActiveGroup, userToggledGroups]);

  const toggleGroup = (title: string) => {
    if (title === "Getting Started" || title === currentActiveGroup) return;

    const currentGroupData = groups.find((g) => g.title === title);
    const wasCollapsed = currentGroupData ? currentGroupData.isCollapsed : true;

    setUserToggledGroups((current) => ({
      ...current,
      [title]: !wasCollapsed,
    }));
  };

  return (
    <motion.nav
      key={pathname}
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.7 }}
      className="space-y-4 text-sm"
    >
      <div className="space-y-6">
        {groups.map((group) => {
          const isUncollapsible =
            group.title === "Getting Started" ||
            group.title === currentActiveGroup;

          return (
            <section key={group.title} className="space-y-2">
              <button
                type="button"
                onClick={() => toggleGroup(group.title)}
                className={`flex w-full items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground ${
                  isUncollapsible ? "cursor-default" : "cursor-pointer"
                }`}
                aria-expanded={!group.isCollapsed}
              >
                <span>{group.title}</span>
                {!isUncollapsible ? (
                  <motion.span
                    animate={{ rotate: group.isCollapsed ? 0 : 180 }}
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    className="text-muted-foreground"
                  >
                    ▾
                  </motion.span>
                ) : null}
              </button>

              <AnimatePresence initial={false} mode="popLayout">
                {group.isCollapsed ? null : (
                  <motion.ul
                    key={group.title}
                    variants={groupVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="space-y-1.5 border-l border-border pl-3 font-medium text-muted-foreground overflow-hidden"
                  >
                    {group.items.map((link) => (
                      <motion.li
                        key={link.href}
                        variants={itemVariants}
                        whileHover={{ x: 2 }}
                      >
                        <Link
                          href={link.href}
                          className="relative -ml-3 block py-0.5 pl-3 transition-colors duration-200"
                        >
                          {link.active ? (
                            <motion.span
                              layoutId="sidebar-active-indicator"
                              className="absolute inset-y-0 -left-px w-0.5 rounded bg-primary"
                              transition={{
                                type: "spring",
                                stiffness: 520,
                                damping: 42,
                              }}
                            />
                          ) : null}
                          <span
                            className={
                              link.active
                                ? "font-semibold text-primary"
                                : "text-muted-foreground hover:text-foreground"
                            }
                          >
                            {link.item}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </section>
          );
        })}
      </div>
    </motion.nav>
  );
}
