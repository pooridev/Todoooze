export interface IListState {
  lists: {
    iconName: string;
    title: string;
    id: number;
    isOpen: boolean;
    isMenuOpen: boolean;
    tasks: {
      title: string;
      id: number;
      isDone: boolean;
      description: string;
    }[];
  }[];
}
