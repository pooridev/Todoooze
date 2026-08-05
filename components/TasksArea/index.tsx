"use client";
import { FC, useMemo, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd-next";
import classNames from "classnames";

import styles from "./TasksArea.module.css";
import { ListType } from "../../types/ListType";
import { TaskStatus } from "../../types/Task";
import DraggableTask from "./DraggableTask";
import ColumnHeader from "./ColumnHeader";
import TaskDetailPanel from "./TaskDetailPanel";
import { statusItems } from "../../constants/statusItems";
import { useSetLists } from "../../providers/Lists";

interface IProps {
  list: ListType;
}

type DragResult = {
  draggableId: string;
  destination: {
    droppableId: string;
    index: number;
  } | null;
};

const TasksArea: FC<IProps> = ({ list }) => {
  const { moveTask } = useSetLists();

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // Derive from state so the panel stays in sync (and closes when the task is deleted).
  const selectedTask = list?.tasks?.find((task) => task.id === selectedTaskId) ?? null;

  // A column is simply the ordered subset of the list's tasks sharing a status,
  // derived from provider state — no duplicated column state to keep in sync.
  const columns = useMemo(() => {
    const tasks = list?.tasks || [];

    return statusItems.map((status) => ({
      name: status.title,
      icon: status.icon,
      items: tasks.filter((task) => task.status === status.title),
    }));
  }, [list?.tasks]);

  const onDragEnd = (result: DragResult) => {
    if (!result.destination) return;

    moveTask({
      listId: list.id,
      taskId: result.draggableId,
      newStatus: result.destination.droppableId as TaskStatus,
      destinationIndex: result.destination.index,
    });
  };

  return (
    <section className={styles.TasksArea}>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => (
          <div className={styles.TasksStatus} key={column.name}>
            <ColumnHeader column={column} />
            <Droppable droppableId={column.name}>
              {(provided: typeof Droppable, snapshot: { isDraggingOver?: boolean }) => (
                <div
                  className={classNames(styles.DropZone, { [styles.DraggingOver]: snapshot?.isDraggingOver })}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <DraggableTask
                    list={list}
                    column={column}
                    onTaskClick={(task) => setSelectedTaskId(task.id)}
                  />
                  {provided.placeholder}
                  {column.items.length === 0 && !snapshot?.isDraggingOver && (
                    <div className={styles.EmptyColumn}>No tasks — drop one here</div>
                  )}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>

      <TaskDetailPanel task={selectedTask} listId={list?.id} onClose={() => setSelectedTaskId(null)} />
    </section>
  );
};

export default TasksArea;
