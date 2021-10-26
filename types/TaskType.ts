export type TaskType = {
  title: string;
  id: string;
  status?: 'todo' | 'in_progress' | 'in_review' | 'done';
  priority: { title: string; icon: JSX.Element };
  description?: string;
};
