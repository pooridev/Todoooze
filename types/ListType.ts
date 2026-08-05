import { TaskType } from "./Task";

export type ListType = {
  id: string;
  title: string;
  description: string;
  tasks: Array<TaskType>;
};
