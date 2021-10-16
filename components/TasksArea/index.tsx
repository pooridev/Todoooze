import { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
import { DragDropContext, Droppable } from 'react-beautiful-dnd-next';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

import { AddIcon } from '../../shared/icon';
import styles from './TasksArea.module.css';
import { IProjectState } from './../../types/IProjectState';
import { ProjectType } from '../../types/ProjectType';
import NewTaskModal from './NewTaskModal';
import { useModal } from '../../providers/Modal';
import DraggableTask from './DraggableTask';
import { columnsData } from './../../constant/columnsData';

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
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

const TasksArea = () => {
  const [columns, setColumns] = useState(columnsData);

  const { openModal } = useModal();
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState({ title: '', icon: null });

  // The given ID in the path (URL)
  const { project_id } = router.query;

  // All projects that made by user
  const projects = useSelector((state: IProjectState) => state.projects);

  /*
   * Find that particular project, so we can render its tasks
   * We will get the most recent one, if we were on Home page
   * (It means whenever the ID was undefined)
   */
  let project = projects.find((p: ProjectType) => p?.id === project_id);

  if (!project_id) project = projects[projects.length - 1]; // get the most recent one

  // All tasks that particular project contains
  const tasks = project?.tasks || [];

  // Each status that we want to render on each column
  const todoTasks = tasks?.filter(task => task.status === 'todo');
  const inProgressTasks = tasks?.filter(task => task.status === 'in_progress');
  const inReviewTasks = tasks?.filter(task => task.status === 'in_review');
  const DoneTasks = tasks?.filter(task => task.status === 'done');

  /**
   * This part updates the columns as soon as URL changed
   */
  useEffect(() => {
    clearColumnsTasks();
    const columnsArray = Object.entries(columns);

    columnsArray.forEach(([columnId, column]) => {
      if (column.name === 'Todo' && todoTasks?.length !== 0) {
        const copyOfColumn = { ...column };
        copyOfColumn.items = [...todoTasks];

        setColumns({ ...columns, [columnId]: copyOfColumn });
      }

      if (column.name === 'In Progress' && inProgressTasks?.length !== 0) {
        const copyOfColumn = { ...column };
        copyOfColumn.items = [...inProgressTasks];

        setColumns({ ...columns, [columnId]: copyOfColumn });
      }

      if (column.name === 'In Review' && inReviewTasks?.length !== 0) {
        const copyOfColumn = { ...column };
        copyOfColumn.items = [...inReviewTasks];

        setColumns({ ...columns, [columnId]: copyOfColumn });
      }

      if (column.name === 'Done' && DoneTasks?.length !== 0) {
        const copyOfColumn = { ...column };
        copyOfColumn.items = [...DoneTasks];

        setColumns({ ...columns, [columnId]: copyOfColumn });
      }
    });
  }, [project_id, projects]);

  // To clear tasks while navigating between projects
  const clearColumnsTasks = () => {
    setColumns(columnsData);
  };

  return (
    <>
      <section className={styles.TasksArea}>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns)?.map(([columnId, column], index) => {
            return (
              <div className={styles.TasksStatus} key={columnId}>
                <header key={columnId} className={styles.StatusHeader}>
                  <div className={styles.HeaderText}>
                    {column.icon}
                    <p>{column.name}</p>
                    <span>{column?.items?.length}</span>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentStatus({
                        title: column.name,
                        icon: column.icon
                      });
                      openModal();
                    }}
                    title='Add new task'
                    className={styles.AddTaskButton}>
                    <AddIcon />
                  </button>
                </header>
                <div style={{ minHeight: '100%' }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          style={{ minHeight: '100vh' }}
                          {...provided.droppableProps}
                          ref={provided.innerRef}>
                          {provided.placeholder}
                          <DraggableTask column={column} />
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
        <NewTaskModal taskStatus={currentStatus} projectName={project.title} />;
      </section>
    </>
  );
};

export default TasksArea;
