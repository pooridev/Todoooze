export interface ITasksState {
  lists: {
    iconName: string;
    title: string;
    id: number;
    isOpen: boolean;
    isMenuOpen: boolean;
    tasks: {
      title: string;
      id: number;
      status: 'todo' | 'in_progress' | 'done';
      description: string;
    }[];
  }[];
}
