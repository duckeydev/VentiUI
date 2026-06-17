"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { IconFolder, IconFolderOpen, IconFile, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const treeViewVariants = cva(
  "w-full select-none text-sm px-2",
  {
    variants: {
      variant: {
        modern: "",
        minimal: "",
        glass: "bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 py-2",
        macos: "bg-secondary/20 rounded-xl border border-border/40 py-2",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);

export interface TreeNodeData {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNodeData[];
}

export interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof treeViewVariants> {
  data: TreeNodeData[];
  defaultExpanded?: string[];
}

export const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  ({ data, defaultExpanded = [], className, variant, ...props }, ref) => {
    const [expandedIds, setExpandedIds] = React.useState<string[]>(defaultExpanded);

    const toggleExpand = (id: string) => {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const allNodes = flattenTree(data);
      const focused = document.activeElement as HTMLElement;
      const currentId = focused?.closest("[data-tree-node]")?.getAttribute("data-tree-node");
      const currentIndex = currentId ? allNodes.findIndex((n) => n.id === currentId) : -1;

      let nextIndex = currentIndex;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          nextIndex = Math.min(currentIndex + 1, allNodes.length - 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          nextIndex = Math.max(currentIndex - 1, 0);
          break;
        case "ArrowRight":
          e.preventDefault();
          if (currentId && !expandedIds.includes(currentId)) {
            const node = allNodes.find((n) => n.id === currentId);
            if (node?.children && node.children.length > 0) {
              toggleExpand(currentId);
            }
          }
          return;
        case "ArrowLeft":
          e.preventDefault();
          if (currentId && expandedIds.includes(currentId)) {
            toggleExpand(currentId);
          } else if (currentIndex > 0) {
            nextIndex = currentIndex - 1;
          }
          return;
        case "Home":
          e.preventDefault();
          nextIndex = 0;
          break;
        case "End":
          e.preventDefault();
          nextIndex = allNodes.length - 1;
          break;
        default:
          return;
      }

      if (nextIndex >= 0 && nextIndex < allNodes.length) {
        const el = document.querySelector(`[data-tree-node="${allNodes[nextIndex].id}"]`) as HTMLElement;
        el?.focus();
      }
    };

    return (
      <div
        ref={ref}
        role="tree"
        aria-label="Tree navigation"
        onKeyDown={handleKeyDown}
        className={cn(treeViewVariants({ variant, className }))}
        {...props}
      >
        {data.map((node, i) => (
          <TreeNode
            key={node.id}
            node={node}
            expandedIds={expandedIds}
            onToggle={toggleExpand}
            depth={0}
            index={i}
          />
        ))}
      </div>
    );
  }
);
TreeView.displayName = "TreeView";

function flattenTree(nodes: TreeNodeData[], expandedIds?: string[]): TreeNodeData[] {
  const result: TreeNodeData[] = [];
  for (const node of nodes) {
    result.push(node);
    if (node.children && node.children.length > 0) {
      if (!expandedIds || expandedIds.includes(node.id)) {
        result.push(...flattenTree(node.children, expandedIds));
      }
    }
  }
  return result;
}

interface TreeNodeInternalProps {
  node: TreeNodeData;
  expandedIds: string[];
  onToggle: (id: string) => void;
  depth: number;
  index: number;
}

function TreeNode({ node, expandedIds, onToggle, depth, index }: TreeNodeInternalProps) {
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const isExpanded = expandedIds.includes(node.id);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (hasChildren) onToggle(node.id);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div
        data-tree-node={node.id}
        onClick={() => hasChildren && onToggle(node.id)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-level={depth + 1}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        className={cn(
          "flex items-center gap-2.5 py-1.5 pr-2 rounded-lg cursor-pointer transition-colors text-foreground/80 hover:text-foreground hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          hasChildren ? "font-medium" : "text-muted-foreground"
        )}
      >
        <div className="w-4 h-4 flex items-center justify-center shrink-0">
          {hasChildren && (
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
            >
              <IconChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
            </motion.div>
          )}
        </div>

        <div className="w-4 h-4 flex items-center justify-center shrink-0">
          {node.icon ? (
            node.icon
          ) : hasChildren ? (
            <AnimatePresence mode="wait" initial={false}>
              {isExpanded ? (
                <motion.span
                  key="open"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
                  className="flex items-center justify-center"
                >
                  <IconFolderOpen className="w-4 h-4 text-amber-500/80 fill-amber-500/10" />
                </motion.span>
              ) : (
                <motion.span
                  key="closed"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
                  className="flex items-center justify-center"
                >
                  <IconFolder className="w-4 h-4 text-amber-500/80 fill-amber-500/10" />
                </motion.span>
              )}
            </AnimatePresence>
          ) : (
            <IconFile className="w-4 h-4 text-muted-foreground/60" />
          )}
        </div>

        <span className="truncate tracking-tight text-xs font-medium">{node.label}</span>
      </div>

      <AnimatePresence initial={false}>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
            role="group"
          >
            {node.children?.map((child, i) => (
              <motion.div
                key={child.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.03, ease: EASE_OUT_EXPO }}
              >
                <TreeNode
                  node={child}
                  expandedIds={expandedIds}
                  onToggle={onToggle}
                  depth={depth + 1}
                  index={i}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
