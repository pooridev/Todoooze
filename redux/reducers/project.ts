import { types } from '../types';
import { AnyAction } from 'redux';

import { IProjectState } from '../../types/IProjectState';

const initialState: IProjectState = {
  projects: [
    {
      title: 'Calistu',
      id: '1',
      isOpen: false,
      isMenuOpen: false,
      tasks: []
    },
    {
      title: 'Junior Coders',
      id: '2',
      isOpen: false,
      isMenuOpen: false,
      tasks: []
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
    default:
      return state;
  }
};

export default reducer;
