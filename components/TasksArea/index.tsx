import { useState, useEffect, FC } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd-next';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

import styles from './TasksArea.module.css';
import { IProjectState } from './../../types/IProjectState';
import { ProjectType } from '../../types/ProjectType';
import NewTaskModal from './TaskModal';
import DraggableTask from './DraggableTask';
import { Columns, columnsData } from '../../constants/columnsData';
import { onDragEnd, Result } from '../../helpers/task-utils';
import ColumnHeader from './ColumnHeader';
import { TodoIcon } from '../shared/Icon';

interface IProps {
  project: ProjectType;
}

const TasksArea: FC<IProps> = ({ project }) => {
  const [columns, setColumns] = useState<Columns>(columnsData);

  const router = useRouter();

  const [currentStatus, setCurrentStatus] = useState<{
    title: 'Todo' | 'In Progress' | 'In Review' | 'Done';
    icon: JSX.Element;
  }>({ title: 'Todo', icon: <TodoIcon /> });

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
          onDragEnd={(result: Result) =>
            onDragEnd(result, columns, setColumns, project.id)
          }>
          {Object.entries(columns).map(([columnId, column]) => (
            <div className={styles.TasksStatus} key={columnId}>
              <ColumnHeader
                column={column}
                key={columnId}
                project={project}
                onChangeCurrentStatus={setCurrentStatus}
              />
              <div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => (
                    <div
                      style={{ minHeight: '100vh' }}
                      {...provided.droppableProps}
                      ref={provided.innerRef}>
                      <DraggableTask project={project} column={column} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </DragDropContext>
        {/* <NewTaskModal taskStatus={currentStatus} projectName={project?.title} /> */}
      </section>
    </>
  );
};

export default TasksArea;
