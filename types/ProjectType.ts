import { TaskType } from "./Task";

export type ProjectType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
};
