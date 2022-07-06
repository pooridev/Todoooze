import { v4 as uuidv4 } from 'uuid';

import {
  HighIcon,
  InProgressIcon,
  InReviewIcon,
  LowIcon,
  TodoIcon,
  UrgentIcon
} from '../components/shared/Icon';
import { IProjectState } from '../types/RootState';

export const initialState: IProjectState = {
  projects: [
    {
      title: 'Calistu',
      id: '1',
      tasks: [
        {
          title: 'Bug fix',
          id: uuidv4(),
          status: {
            title: 'Todo',
            icon: <TodoIcon />
          },
          priority: {
            title: 'Urgent',
            icon: <UrgentIcon />
          }
        },
        {
          title: 'Typescript course',
          id: uuidv4(),
          status: {
            title: 'In Progress',
            icon: <InProgressIcon />
          },
          priority: {
            title: 'High',
            icon: <HighIcon />
          }
        }
      ]
    },
    {
      title: 'Junior Coders',
      id: '2',
      tasks: [
        {
          title: 'Add Authentication',
          id: uuidv4(),
          status: { title: 'In Review', icon: <InReviewIcon /> },
          priority: {
            title: 'Low',
            icon: <LowIcon />
          }
        },
        {
          title: 'Node.js course',
          id: uuidv4(),
          status: {
            title: 'In Review',
            icon: <InReviewIcon />
          },
          priority: {
            title: 'High',
            icon: <HighIcon />
          }
        }
      ]
    }
  ]
};
