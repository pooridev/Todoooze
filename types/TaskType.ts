export type TaskType = {
  title: string;
  id:  string;
  status?: 'todo' | 'in_progress' | 'in_review' | 'done';
  description?: string;
};
