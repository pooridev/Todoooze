import { TaskType } from './TaskType';

export type ProjectType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
};
