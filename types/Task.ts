import { ReactElement } from "react";

import { ColumnId } from "./Column";

export type TaskPriority = "Priority" | "Urgent" | "High" | "Medium" | "Low";

export type TaskType = {
  title: string;
  id: string;
  /** Id of the column this task belongs to. */
  columnId: ColumnId;
  priority: TaskPriority;
  description?: string;
  /** Unix epoch (ms). Optional for backwards compatibility with previously stored data. */
  createdAt?: number;
  updatedAt?: number;
};

/** @deprecated Kept only for typing legacy stored data during migration. */
export type LegacyTaskStatus = "Todo" | "In Progress" | "In Review" | "Done";

export type TaskStatusType = {
  title: string;
  icon: ReactElement | JSX.Element;
};
