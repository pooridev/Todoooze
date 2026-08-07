import { FC } from "react";
import Link from "next/link";

import styles from "./TaskRow.module.css";
import { TaskType } from "../../../types/Task";
import { ColumnType } from "../../../types/Column";
import { priorityItems } from "../../../constants/priorityItems";
import { formatRelativeTime } from "../../../helpers/relative-time";
import { stripMarkdown } from "../../../helpers/markdown";

type Props = {
  task: TaskType;
  listId: string;
  listTitle: string;
  column?: ColumnType;
  /** When set, occurrences of this text are visually highlighted (used by Search). */
  highlight?: string;
};

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightMatches = (text: string, query?: string) => {
  const needle = query?.trim();
  if (!needle) return text;

  const parts = text.split(new RegExp(`(${escapeRegExp(needle)})`, "ig"));

  return parts.map((part, index) =>
    part.toLowerCase() === needle.toLowerCase() ? (
      <mark key={index} className={styles.Mark}>
        {part}
      </mark>
    ) : (
      part
    )
  );
};

/**
 * A compact, linkable task row used by the Search and Recent pages.
 */
const TaskRow: FC<Props> = ({ task, listId, listTitle, column, highlight }) => {
  const priorityIcon = priorityItems.find((priority) => priority.title === task.priority)?.icon;

  return (
    <Link href={`/list/${listId}`} className={styles.Row}>
      <span className={styles.Status} title={column?.name || "Column"}>
        <span className={styles.ColumnDot} style={{ backgroundColor: column?.color || "#8a8f98" }} />
      </span>
      <span className={styles.TitleGroup}>
        <span className={styles.Title}>{highlightMatches(task.title, highlight)}</span>
        {task.description && (
          <span className={styles.Description}>{highlightMatches(stripMarkdown(task.description), highlight)}</span>
        )}
      </span>
      <span className={styles.Meta}>
        <span title={task.priority}>{priorityIcon}</span>
        {column && <span className={styles.ColumnName}>{column.name}</span>}
        <span className={styles.ListName}>{listTitle}</span>
        <span className={styles.Time}>{formatRelativeTime(task.updatedAt)}</span>
      </span>
    </Link>
  );
};

export default TaskRow;
