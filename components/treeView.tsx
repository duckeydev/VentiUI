"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconFolder, IconFolderOpen, IconFile, IconChevronRight } from "@tabler/icons-react";

export interface TreeNodeData {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNodeData[];
}

export interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array nested structure of filesystem elements. */
  data: TreeNodeData[];
  /** Optional array collection containing the initial structural IDs to render expanded. */
  defaultExpanded?: string[];
}

export const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  ({ data, defaultExpanded = [], className, ...props }, ref) => {
    const [expandedIds, setExpandedIds] = React.useState<string[]>(defaultExpanded);

    const toggleExpand = (id: string) => {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };

    return (
      <div ref={ref} className={`w-full select-none text-sm px-2 ${className}`} {...props}>
        {data.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            expandedIds={expandedIds}
            onToggle={toggleExpand}
            depth={0}
          />
        ))}
      </div>
    );
  }
);
TreeView.displayName = "TreeView";

interface TreeNodeInternalProps {
  node: TreeNodeData;
  expandedIds: string[];
  onToggle: (id: string) => void;
  depth: number;
}

function TreeNode({ node, expandedIds, onToggle, depth }: TreeNodeInternalProps) {
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const isExpanded = expandedIds.includes(node.id);

  return (
    <div className="w-full flex flex-col">
      {/* Node Content Bar Wrapper */}
      <div
        onClick={() => hasChildren && onToggle(node.id)}
        style={{ paddingLeft: `${depth * 12 + 6}px` }}
        className={`flex items-center gap-2 py-1.5 pr-2 rounded-lg cursor-pointer transition-colors text-foreground/80 hover:text-foreground hover:bg-secondary/40 ${
          hasChildren ? "font-medium" : "text-muted-foreground"
        }`}
      >
        {/* Expansion Indicator Arrow */}
        <div className="w-4 h-4 flex items-center justify-center shrink-0">
          {hasChildren && (
            <IconChevronRight
              className={`w-3.5 h-3.5 text-muted-foreground/60 transition-transform duration-200 ${
                isExpanded ? "rotate-90" : ""
              }`}
            />
          )}
        </div>

        {/* Semantic Icon Vector Spot */}
        <div className="w-4 h-4 flex items-center justify-center shrink-0">
          {node.icon ? (
            node.icon
          ) : hasChildren ? (
            isExpanded ? (
              <IconFolderOpen className="w-4 h-4 text-amber-500/80 fill-amber-500/10" />
            ) : (
              <IconFolder className="w-4 h-4 text-amber-500/80 fill-amber-500/10" />
            )
          ) : (
            <IconFile className="w-4 h-4 text-muted-foreground/60" />
          )}
        </div>

        {/* Textual Heading Element Label */}
        <span className="truncate tracking-tight text-xs font-medium">{node.label}</span>
      </div>

      {/* Recursive Deep Animation Nested Block Rendering Canvas */}
      <AnimatePresence initial={false}>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {node.children?.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                expandedIds={expandedIds}
                onToggle={onToggle}
                depth={depth + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}