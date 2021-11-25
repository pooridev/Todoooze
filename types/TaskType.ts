export type TaskStatusType = 'todo' | 'in_progress' | 'in_review' | 'done';

export type TaskType = {
  title: string;
  id: string;
  status?: TaskStatusType;
  priority: { title: string; icon: JSX.Element };
  description?: string;
};
