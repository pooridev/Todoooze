"use client";
import { FC, useMemo, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd-next";
import classNames from "classnames";

import styles from "./TasksArea.module.css";
import { ListType } from "../../types/ListType";
import DraggableTask from "./DraggableTask";
import ColumnHeader from "./ColumnHeader";
import TaskDetailPanel from "./TaskDetailPanel";
import AddColumn from "./AddColumn";
import { useSetLists } from "../../providers/Lists";

interface IProps {
  list: ListType;
}

type DragResult = {
  type?: string;
  draggableId: string;
  destination: {
    droppableId: string;
    index: number;
  } | null;
  source: {
    droppableId: string;
    index: number;
  };
};

const TasksArea: FC<IProps> = ({ list }) => {
  const { moveTask, reorderColumns } = useSetLists();

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const selectedTask = list?.tasks?.find((task) => task.id === selectedTaskId) ?? null;

  const columns = useMemo(() => {
    const tasks = list?.tasks || [];
    const listColumns = list?.columns || [];

    return listColumns.map((column) => ({
      ...column,
      items: tasks.filter((task) => task.columnId === column.id),
    }));
  }, [list?.tasks, list?.columns]);

  const onDragEnd = (result: DragResult) => {
    if (!result.destination) return;

    if (result.type === "COLUMN") {
      reorderColumns({
        listId: list.id,
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      });
      return;
    }

    moveTask({
      listId: list.id,
      taskId: result.draggableId,
      columnId: result.destination.droppableId,
      destinationIndex: result.destination.index,
    });
  };

  return (
    <section className={styles.TasksArea}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(boardProvided: typeof Droppable) => (
            <div
              className={styles.ColumnsTrack}
              ref={boardProvided.innerRef}
              {...boardProvided.droppableProps}
            >
              {columns.map((column, index) => {
                const fallbackColumnId =
                  columns.find((candidate) => candidate.id !== column.id)?.id || column.id;

                return (
                  <Draggable key={column.id} draggableId={`column-${column.id}`} index={index}>
                    {(
                      provided: typeof Draggable,
                      snapshot: { isDragging?: boolean }
                    ) => (
                      <div
                        className={classNames(styles.TasksStatus, {
                          [styles.ColumnDragging]: snapshot?.isDragging,
                        })}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <ColumnHeader
                          listId={list.id}
                          column={column}
                          columnCount={columns.length}
                          fallbackColumnId={fallbackColumnId}
                          dragHandleProps={provided.dragHandleProps}
                        />
                        <Droppable droppableId={column.id} type="TASK">
                          {(
                            taskProvided: typeof Droppable,
                            taskSnapshot: { isDraggingOver?: boolean }
                          ) => (
                            <div
                              className={classNames(styles.DropZone, {
                                [styles.DraggingOver]: taskSnapshot?.isDraggingOver,
                              })}
                              {...taskProvided.droppableProps}
                              ref={taskProvided.innerRef}
                            >
                              <DraggableTask
                                list={list}
                                column={column}
                                onTaskClick={(task) => setSelectedTaskId(task.id)}
                              />
                              {taskProvided.placeholder}
                              {column.items.length === 0 && !taskSnapshot?.isDraggingOver && (
                                <div className={styles.EmptyColumn}>No tasks — drop one here</div>
                              )}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {boardProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <AddColumn listId={list.id} nextColorIndex={columns.length} />

      <TaskDetailPanel
        task={selectedTask}
        listId={list.id}
        columns={list.columns}
        onClose={() => setSelectedTaskId(null)}
      />
    </section>
  );
};

export default TasksArea;
