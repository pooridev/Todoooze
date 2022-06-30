import { Dispatch, SetStateAction } from 'react';
import { store } from '../redux/store';
import { updateTaskStatus } from '../redux/actions/project';
import { TaskStatusType } from '../types/TaskType';
import { Columns } from '../constants/columnsData';
import { TodoIcon } from '../components/shared/Icon';

/**
 * @description get the status information for the given title.
 */
export const getStatus = (status: TaskStatusType['title']): TaskStatusType => {
  type StatusMapType = {
    [key in TaskStatusType['title']]: TaskStatusType;
  };

  const STATUS_MAP: StatusMapType = {
    Todo: {
      title: 'Todo',
      icon: <TodoIcon />
    },
    'In Progress': {
      title: 'In Progress',
      icon: <TodoIcon />
    },
    'In Review': {
      title: 'In Review',
      icon: <TodoIcon />
    },

    Done: {
      title: 'Done',
      icon: <TodoIcon />
    }
  };

  return STATUS_MAP[status];
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
