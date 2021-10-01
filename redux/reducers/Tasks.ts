import { types } from '../types';
import { AnyAction } from 'redux';

import { ITasksState } from '../../types/ITasksState';

const initialState: ITasksState = {
  lists: [
    {
      iconName: 'profile',
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
      iconName: 'profile',
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
    case types.OPEN_LIST: {
      const newList = state.lists.map(item => {
        if (item.id === payload) {
          item.isOpen = !item.isOpen;
          return item;
        }
      });
      return { ...state, ...newList };
    }
    case types.DELETE_LIST: {
      const newList = state.lists.map(list => list.id !== payload.id);
      return {
        ...state,
        ...newList
      };
    }
    case types.OPEN_MENU: {
      const newList = state.lists.map(item => {
        if (item.id === payload) {
          item.isMenuOpen = !item.isMenuOpen;
          return item;
        }
      });
      return { ...state, ...newList };
    }
    case types.CLOSE_MENU: {
      const newList = state.lists.map(item => {
        if (item.id === payload) {
          item.isMenuOpen = !item.isMenuOpen;
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
