import { types } from '../types';
import { AnyAction } from 'redux';

export const openList = (payload: number): AnyAction => {
  return {
    type: types.TOGGLE_PROJECT,
    payload
  };
};
