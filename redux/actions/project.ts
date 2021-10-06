import { types } from '../types';
import { AnyAction } from 'redux';

export const openList = (payload: number | string): AnyAction => {
  return {
    type: types.TOGGLE_PROJECT,
    payload
  };
};
