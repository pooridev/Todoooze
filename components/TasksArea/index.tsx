import { useState, useEffect, FC, ReactElement } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd-next';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

import { store } from '../../redux/store';
import styles from './TasksArea.module.css';
import { IProjectState } from './../../types/IProjectState';
import { ProjectType } from '../../types/ProjectType';
import NewTaskModal from './NewTaskModal';
import DraggableTask from './DraggableTask';
import { columnsData } from '../../constants/columnsData';
import { updateTaskStatus } from '../../redux/actions/project';
import { getStatus } from '../../helpers/task-utils';
import ColumnHeader from './ColumnHeader';

const onDragEnd = (result, columns, setColumns, projectId) => {
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

interface IProps {
  project: ProjectType;
}

const TasksArea: FC<IProps> = ({ project }) => {
  const [columns, setColumns] = useState(columnsData);

  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState({ title: '', icon: null });

  // The given ID in the path (URL)
  const { project_id } = router.query;

  // All projects that made by user, use to re-render component when a new task is added
  const projects = useSelector((state: IProjectState) => state.projects);

  // All tasks that particular project contains
  const tasks = project?.tasks || [];

  // Each status that we want to render on each column
  const todoTasks = tasks?.filter(task => task.status === 'todo');
  const inProgressTasks = tasks?.filter(task => task.status === 'in_progress');
  const inReviewTasks = tasks?.filter(task => task.status === 'in_review');
  const DoneTasks = tasks?.filter(task => task.status === 'done');

  /**
   * Updates the columns data when a new task is added or edited.
   */
  useEffect(() => {
    const columnsArray = Object.entries(columns);
    columnsArray.forEach(([columnId, column]) => {
      // To clear tasks while switching between projects
      column.items = [];

      if (column.name === 'Todo' && todoTasks?.length) {
        column.items = [...todoTasks];

        setColumns({ ...columns, [columnId]: column });
      }

      if (column.name === 'In Progress' && inProgressTasks?.length) {
        column.items = [...inProgressTasks];

        setColumns({ ...columns, [columnId]: column });
      }

      if (column.name === 'In Review' && inReviewTasks?.length) {
        column.items = [...inReviewTasks];

        setColumns({ ...columns, [columnId]: column });
      }

      if (column.name === 'Done' && DoneTasks?.length) {
        column.items = [...DoneTasks];

        setColumns({ ...columns, [columnId]: column });
      }
    });
  }, [project_id, projects]);

  return (
    <>
      <section className={styles.TasksArea}>
        <DragDropContext
          onDragEnd={result =>
            onDragEnd(result, columns, setColumns, project.id)
          }>
          {Object.entries(columns).map(([columnId, column]) => (
            <div className={styles.TasksStatus} key={columnId}>
              <ColumnHeader
                column={column}
                key={columnId}
                onChangeCurrentStatus={setCurrentStatus}
              />
              <div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => (
                    <div
                      style={{ minHeight: '100vh' }}
                      {...provided.droppableProps}
                      ref={provided.innerRef}>
                      <DraggableTask column={column} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </DragDropContext>
        <NewTaskModal taskStatus={currentStatus} projectName={project?.title} />
      </section>
    </>
  );
};

export default TasksArea;
