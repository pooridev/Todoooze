import { useState, useEffect, FC } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd-next";
import { useRouter } from "next/dist/client/router";

import styles from "./TasksArea.module.css";
import { ProjectType } from "../../types/ProjectType";
import DraggableTask from "./DraggableTask";
import { Columns, columnsData } from "../../constants/columnsData";
import { onDragEnd, Result } from "../../helpers/task-utils";
import ColumnHeader from "./ColumnHeader";
import { useSetProjects } from "../../providers/Projects";

interface IProps {
  project: ProjectType;
}

const TasksArea: FC<IProps> = ({ project }) => {
  const [columns, setColumns] = useState<Columns>(columnsData);

  const router = useRouter();
  const { project_id } = router.query;

  const { updateTaskStatus } = useSetProjects();

  const tasks = project?.tasks || [];

  const todoTasks = tasks.filter((task) => task.status === "Todo");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const inReviewTasks = tasks.filter((task) => task.status === "In Review");
  const DoneTasks = tasks.filter((task) => task.status === "Done");

  useEffect(() => {
    const columnsArray = Object.entries(columns);
    columnsArray.forEach(([columnId, column]) => {
      // To clear tasks while switching between projects
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
  }, [project_id, project]);

  return (
    <>
      <section className={styles.TasksArea}>
        <DragDropContext
          onDragEnd={(result: Result) => onDragEnd(result, columns, setColumns, project.id, updateTaskStatus)}
        >
          {Object.entries(columns).map(([columnId, column]) => (
            <div className={styles.TasksStatus} key={columnId}>
              <ColumnHeader column={column} key={columnId} project={project} />
              <div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided: typeof Droppable) => (
                    <div style={{ minHeight: "100vh" }} {...provided.droppableProps} ref={provided.innerRef}>
                      <DraggableTask project={project} column={column} />
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
