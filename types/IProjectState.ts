import { TaskType } from './TaskType';

export interface IProjectState {
  projects: Array<{
    title: string;
    id: number | string;
    isOpen: boolean;
    isMenuOpen: boolean;
    tasks: Array<TaskType>;
  }>;
}
