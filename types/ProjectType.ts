import { TaskType } from './TaskType';

export type ProjectType = {
  id: number | string;
  isOpen: boolean;
  isMenuOpen: boolean;
  title: string;
  tasks: Array<TaskType>;
};
