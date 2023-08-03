import { AnyAction } from "redux";

import { TaskStatusType } from "../../types/Task";
import { types } from "../types";
import { TaskType } from "../../types/Task";

export const openList = (payload: number | string): AnyAction => {
  return {
    type: types.TOGGLE_PROJECT,
    payload,
  };
};

export const addTask = (
  taskPayload: TaskType,
  projectPayload: { id: string }
): AnyAction => {
  return {
    type: types.ADD_TASK,
    payload: { taskPayload, projectPayload },
  };
};

export const updateTaskStatus = (
  status: TaskStatusType,
  taskId: string,
  projectId: string
): AnyAction => {
  return {
    type: types.UPDATE_TASK_STATUS,
    payload: { taskId, status, projectId },
  };
};
export const updateTaskPriority = (
  priority: TaskType["priority"],
  taskId: string,
  projectId: string
): AnyAction => {
  return {
    type: types.UPDATE_TASK_PRIORITY,
    payload: { taskId, priority, projectId },
  };
};
