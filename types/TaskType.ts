export type TaskType = {
  title: string;
  id: number | string;
  status?: 'todo' | 'in_progress' | 'in_review' | 'done';
  description: string;
};
