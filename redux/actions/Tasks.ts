import { types } from '../types';
import { AnyAction } from 'redux';

export const openList = (payload: number): AnyAction => {
  return {
    type: types.OPEN_LIST,
    payload
  };
};

export const openMenu = (payload: number): AnyAction => {
  return {
    type: types.OPEN_MENU,
    payload
  };
};

export const closeMenu = (payload: number): AnyAction => {
  return {
    type: types.CLOSE_MENU,
    payload
  };
};
