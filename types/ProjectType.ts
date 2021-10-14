import { TaskType } from './TaskType';

export type ProjectType = {
  id: string;
  isOpen: boolean;
  isMenuOpen: boolean;
  title: string;
  tasks: Array<TaskType>;
};
