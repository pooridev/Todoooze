import { Dispatch, SetStateAction } from "react";
import { Columns } from "../constants/columnsData";
import { UpdateTaskStatusPayload } from "../providers/Projects";

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
  projectId: string,
  onUpdateTaskStatus: (payload: UpdateTaskStatusPayload) => void
) => {
  if (!result.destination) return;

  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);

    // update the status of the task
    const taskId = result.draggableId;
    const status = destColumn.name;

    onUpdateTaskStatus({
      projectId: projectId,
      taskId,
      newStatus: status,
    });

    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
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
        items: copiedItems,
      },
    });
  }
};
