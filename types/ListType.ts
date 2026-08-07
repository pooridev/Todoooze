import { ColumnType } from "./Column";
import { TaskType } from "./Task";

export type ListType = {
  id: string;
  title: string;
  description: string;
  columns: ColumnType[];
  tasks: Array<TaskType>;
};
