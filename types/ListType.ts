import { TaskType } from "./Task";

export type ListType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
};
