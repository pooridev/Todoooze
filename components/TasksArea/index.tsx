"use client";
import { useState, useEffect, FC } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd-next";
import { useParams } from "next/navigation";

import styles from "./TasksArea.module.css";
import { ListType } from "../../types/ListType";
import DraggableTask from "./DraggableTask";
import { Columns, columnsData } from "../../constants/columnsData";
import { onDragEnd, Result } from "../../helpers/task-utils";
import ColumnHeader from "./ColumnHeader";
import { useSetLists } from "../../providers/Lists";

interface IProps {
  list: ListType;
}

const TasksArea: FC<IProps> = ({ list }) => {
  const [columns, setColumns] = useState<Columns>(columnsData);

  const query = useParams();
  const { list_id } = query;

  const { updateTaskStatus } = useSetLists();

  const tasks = list?.tasks || [];

  const todoTasks = tasks.filter((task) => task.status === "Todo");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const inReviewTasks = tasks.filter((task) => task.status === "In Review");
  const DoneTasks = tasks.filter((task) => task.status === "Done");

  useEffect(() => {
    const columnsArray = Object.entries(columns);
    columnsArray.forEach(([columnId, column]) => {
      // To clear tasks while switching between lists
      column.items = [];

      if (column.name === "Todo" && todoTasks?.length) {
        column.items = [...todoTasks];

        setColumns({ ...columns, [columnId]: column });
      }

      if (column.name === "In Progress" && inProgressTasks?.length) {
        column.items = [...inProgressTasks];

        setColumns({ ...columns, [columnId]: column });
      }

      if (column.name === "In Review" && inReviewTasks?.length) {
        column.items = [...inReviewTasks];

        setColumns({ ...columns, [columnId]: column });
      }

      if (column.name === "Done" && DoneTasks?.length) {
        column.items = [...DoneTasks];

        setColumns({ ...columns, [columnId]: column });
      }
    });
  }, [list_id, list]);

  return (
    <>
      <section className={styles.TasksArea}>
        <DragDropContext
          onDragEnd={(result: Result) => onDragEnd(result, columns, setColumns, list.id, updateTaskStatus)}
        >
          {Object.entries(columns).map(([columnId, column]) => (
            <div className={styles.TasksStatus} key={columnId}>
              <ColumnHeader column={column} key={columnId} />
              <div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided: typeof Droppable) => (
                    <div style={{ minHeight: "100vh" }} {...provided.droppableProps} ref={provided.innerRef}>
                      <DraggableTask list={list} column={column} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </DragDropContext>
      </section>
    </>
  );
};

export default TasksArea;
