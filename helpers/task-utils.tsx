import { Dispatch, SetStateAction } from 'react';
import { store } from '../redux/store';
import { updateTaskStatus } from '../redux/actions/project';
import { TaskStatusType } from '../types/TaskType';
import { Columns } from '../constants/columnsData';

/**
 * @description get the exptected status title.
 *
 * @param status Todo | In Progress | In Review | Done
 * @returns {string}
 */
export const getStatus = (
  status: 'Todo' | 'In Progress' | 'In Review' | 'Done'
): TaskStatusType => {
  const STATUS_MAP = {
    Todo: 'todo',
    'In Progress': 'in_progress',
    'In Review': 'in_review',
    Done: 'done'
  };
  return STATUS_MAP[status] as TaskStatusType;
};

export type Result = {
  draggableId: string;
  destination: {
    droppableId: string;
    index: number;
  };
  source: {
    droppableId: string;
    index: number;
  };
};

export const onDragEnd = (
  result: Result,
  columns: Columns,
  setColumns: Dispatch<SetStateAction<Columns>>,
  projectId: string
) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);

    // To update the status of the task
    const taskId = result.draggableId;
    const status = getStatus(destColumn.name);
    store.dispatch(updateTaskStatus(status, taskId, projectId));

    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};
