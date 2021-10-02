import { types } from '../types';
import { AnyAction } from 'redux';

import { ITasksState } from '../../types/ITasksState';

const initialState: ITasksState = {
  projects: [
    {
      title: 'Calistu',
      id: 1,
      isOpen: false,
      isMenuOpen: false,
      tasks: [
        { title: 'Auth', id: 1, status: 'todo', description: 'Fix api bugs' },
        { title: 'API', id: 2, status: 'todo', description: 'Fix api bugs' },
        { title: 'Bug fix', id: 3, status: 'todo', description: 'Fix api bugs' }
      ]
    },
    {
      title: 'Junior Coders',
      id: 2,
      isOpen: false,
      isMenuOpen: false,
      tasks: [
        {
          title: 'IG content',
          id: 1,
          status: 'todo',
          description: 'Fix api bugs'
        }
      ]
    }
  ]
};

const reducer = (
  state = initialState,
  { type, payload }: AnyAction
): ITasksState => {
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
    default:
      return state;
  }
};

export default reducer;
