import { types } from '../types';
import { AnyAction } from 'redux';
import { v4 as uuidv4 } from 'uuid';

import { IProjectState } from '../../types/IProjectState';
import { HighIcon, LowIcon, UrgentIcon } from '../../components/shared/Icon';

const initialState: IProjectState = {
  projects: [
    {
      title: 'Calistu',
      id: '1',
      isOpen: false,
      isMenuOpen: false,
      tasks: [
        {
          title: 'Bug fix',
          id: uuidv4(),
          status: 'in_progress',
          priority: {
            title: 'Urgent',
            icon: <UrgentIcon />
          }
        },
        {
          title: 'Typescript course',
          id: uuidv4(),
          status: 'in_progress',
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
      isOpen: false,
      isMenuOpen: false,
      tasks: [
        {
          title: 'Add Authentication',
          id: uuidv4(),
          status: 'in_review',
          priority: {
            title: 'Low',
            icon: <LowIcon />
          }
        },
        {
          title: 'Node.js course',
          id: uuidv4(),
          status: 'in_progress',
          priority: {
            title: 'High',
            icon: <HighIcon />
          }
        }
      ]
    }
  ]
};

const reducer = (
  state = initialState,
  { type, payload }: AnyAction
): IProjectState => {
  switch (type) {
    case types.TOGGLE_PROJECT: {
      const newList = state.projects.map(item => {
        if (item.id === payload) {
          item.isOpen = !item.isOpen;
          return item;
        }
      });
      return { ...state, ...newList };
    }
    case types.ADD_TASK: {
      const newList = state.projects.map(item => {
        if (item.id === payload.projectPayload.id) {
          item.tasks.push(payload.taskPayload);
          return item;
        }
        return item;
      });
      return { projects: newList };
    }
    case types.UPDATE_TASK_STATUS: {
      const newProjects = state.projects.map(item => {
        debugger;
        if (item.id === payload.projectId) {
          const newTasks = item.tasks.map(task => {
            if (task.id === payload.taskId) {
              task.status = payload.status;
              return task;
            }
            return newTasks;
          });
        }
        return item;
      });
      return { projects: newProjects };
    }
    case types.UPDATE_TASK_PRIORITY: {
      const newProjects = state.projects.map(item => {
        if (item.id === payload.projectId) {
          const newTasks = item.tasks.map(task => {
            if (task.id === payload.taskId) {
              task.priority = payload.priority;
              return task;
            }
            return newTasks;
          });
        }
        return item;
      });
      return { projects: newProjects };
    }
    default:
      return state;
  }
};

export default reducer;
