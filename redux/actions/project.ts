import { AnyAction } from 'redux';

import { types } from '../types';
import { TaskType } from '../../types/TaskType';

export const openList = (payload: number | string): AnyAction => {
  return {
    type: types.TOGGLE_PROJECT,
    payload
  };
};

export const addTask = (
  taskPayload: TaskType,
  projectPayload: { id: string }
): AnyAction => {
  return {
    type: types.ADD_TASK,
    payload: { taskPayload, projectPayload }
  };
};

export const updateTaskStatus = (
  status: string,
  taskId: string,
  projectId: string
): AnyAction => {
  return {
    type: types.UPDATE_TASK_STATUS,
    payload: { taskId, status, projectId }
  };
};
