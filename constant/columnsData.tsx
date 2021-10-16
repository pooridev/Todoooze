import { v4 as uuidv4 } from 'uuid';

import {
  TodoIcon,
  InProgressIcon,
  InReviewIcon,
  DoneIcon
} from '../shared/icon/index';

export const columnsData = {
  [uuidv4()]: {
    name: 'Todo',
    icon: <TodoIcon />,
    items: []
  },
  [uuidv4()]: {
    name: 'In Progress',
    icon: <InProgressIcon />,
    items: []
  },
  [uuidv4()]: {
    name: 'In Review',
    icon: <InReviewIcon />,
    items: []
  },
  [uuidv4()]: {
    name: 'Done',
    icon: <DoneIcon />,
    items: []
  }
};
