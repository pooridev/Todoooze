export interface ITasksState {
  projects: Array<{
    title: string;
    id: number;
    isOpen: boolean;
    isMenuOpen: boolean;
    tasks: Array<{
      title: string;
      id: number;
      status: 'todo' | 'in_progress' | 'done';
      description: string;
    }>;
  }>;
}
