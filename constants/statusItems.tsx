import {
  DoneIcon,
  InProgressIcon,
  InReviewIcon,
  TodoIcon
} from '../components/shared/icon';

export const statusItems = [
  {
    title: 'Todo',
    icon: <TodoIcon />
  },
  {
    title: 'In Progress',
    icon: <InProgressIcon />
  },
  {
    title: 'In Review',
    icon: <InReviewIcon />
  },
  {
    title: 'Done',
    icon: <DoneIcon />
  }
];