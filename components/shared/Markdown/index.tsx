import { FC } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import type { Element, ElementContent } from "hast";

import styles from "./Markdown.module.css";

type Props = {
  source: string;
  /**
   * When provided, checklist checkboxes become clickable and this is called
   * with the source line index of the toggled item.
   */
  onToggleTask?: (lineIndex: number) => void;
};

/** Finds the GFM task-list checkbox inside a rendered <li>, if any. */
const findCheckbox = (node: ElementContent | undefined): Element | null => {
  if (!node || node.type !== "element") return null;
  if (node.tagName === "input" && node.properties?.type === "checkbox") return node;

  for (const child of node.children) {
    const found = findCheckbox(child);
    if (found) return found;
  }

  return null;
};

/**
 * Markdown renderer for task descriptions, built on react-markdown with
 * GitHub-flavored Markdown (tables, strikethrough, autolinks, task lists)
 * and GitHub-comment-style line breaks. URLs are sanitized by react-markdown.
 *
 * Checklist items are re-rendered as interactive checkboxes: toggling one
 * reports the item's source line so the caller can rewrite `[ ]` ↔ `[x]`.
 */
const Markdown: FC<Props> = ({ source, onToggleTask }) => {
  const components: Components = {
    a: ({ node: _node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
    // Task-list checkboxes are rendered by the custom <li> below instead.
    input: () => null,
    li: ({ node, children, ...props }) => {
      const checkbox = node ? findCheckbox(node) : null;
      if (!checkbox) return <li {...props}>{children}</li>;

      const checked = Boolean(checkbox.properties?.checked);
      const line = (node?.position?.start.line ?? 1) - 1;

      return (
        <li className={styles.TaskItem}>
          <input
            type="checkbox"
            className={styles.Checkbox}
            checked={checked}
            disabled={!onToggleTask}
            onChange={() => onToggleTask?.(line)}
          />
          <span className={checked ? styles.TaskDone : undefined}>{children}</span>
        </li>
      );
    },
  };

  return (
    <div className={styles.Markdown}>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={components}>
        {source}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
