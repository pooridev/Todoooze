import { ReactElement } from 'react';

export type TaskStatusType = {
  title: 'Todo' | 'In Progress' | 'In Review' | 'Done';
  icon: ReactElement | JSX.Element;
};

export type TaskType = {
  title: string;
  id: string;
  status?: TaskStatusType;
  priority: { title: string; icon: JSX.Element };
  description?: string;
};
