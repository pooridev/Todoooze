import { ReactElement } from "react";

export type TaskStatus = "Todo" | "In Progress" | "In Review" | "Done";
export type TaskPriority = "Priority" | "Urgent" | "High" | "Medium" | "Low";

export type TaskStatusType = {
  title: TaskStatus;
  icon: ReactElement | JSX.Element;
};

export type TaskType = {
  title: string;
  id: string;
  status?: TaskStatus;
  priority: TaskPriority;
  description?: string;
};
