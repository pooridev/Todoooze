import { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
import {
  DragDropContext,
  Droppable,
  Draggable
} from 'react-beautiful-dnd-next';
import Image from 'next/image';

import {
  DoneIcon,
  InProgressIcon,
  InReviewIcon,
  TodoIcon
} from '../../shared/icon';
import styles from './TasksArea.module.css';
import userAvatar from '../../assets/images/avatar.jpg';
import { IProjectState } from './../../types/IProjectState';
import { ProjectType } from '../../types/ProjectType';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

const columnsData = {
  [uuid()]: {
    name: 'Todo',
    icon: <TodoIcon />,
    items: []
  },
  [uuid()]: {
    name: 'In Progress',
    icon: <InProgressIcon />,
    items: []
  },
  [uuid()]: {
    name: 'In Review',
    icon: <InReviewIcon />,
    items: []
  },
  [uuid()]: {
    name: 'Done',
    icon: <DoneIcon />,
    items: []
  }
};

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

  const router = useRouter();

  // The given ID in the path
  const { project_id } = router.query;

  // All projects that made by user
  const projects = useSelector((state: IProjectState) => state.projects);

  // Find that particular project, so we can render its tasks
  const project = projects.find((p: ProjectType) => p?.id === project_id);

  const tasks = project?.tasks || [];

  const todoTasks = tasks?.filter(task => task.status === 'todo');
  const inProgressTasks = tasks?.filter(task => task.status === 'in_progress');
  const inReviewTasks = tasks?.filter(task => task.status === 'in_review');
  const DoneTasks = tasks?.filter(task => task.status === 'done');

  /**
   * This part updates the columns as soon as URL changed
   */
  useEffect(() => {
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
  }, [project_id]);

  return (
    <section className={styles.TasksArea}>
      {/* <div className={styles.TasksStatus}>
        <header className={styles.StatusHeader}>
          <TodoIcon /> <p>Todo</p> <span>2</span>
        </header>
        <div>TASKS</div>
      </div>
      <div className={styles.TasksStatus}>
        <header className={styles.StatusHeader}>
          <InProgressIcon /> <p>In Progress</p> <span>1</span>
        </header>
        <div>TASKS</div>
      </div>
      <div className={styles.TasksStatus}>
        <header className={styles.StatusHeader}>
          <InReviewIcon /> <p>In Review</p> <span>0</span>
        </header>
        <div>TASKS</div>
      </div>
      <div className={styles.TasksStatus}>
        <header className={styles.StatusHeader}>
          <DoneIcon /> <p>Done</p> <span>0</span>
        </header>
        <div>TASKS</div>
      </div> */}
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns)?.map(([columnId, column], index) => {
          return (
            <div className={styles.TasksStatus} key={columnId}>
              <header key={columnId} className={styles.StatusHeader}>
                {column.icon}
                <p>{column.name}</p>
                <span>{column?.items?.length}</span>
              </header>
              <div style={{ minHeight: '100%' }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        style={{ minHeight: '100vh' }}
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {column?.items?.map((item, index) => {
                          return (
                            <Draggable
                              key={item?.id}
                              draggableId={item?.id}
                              index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className={styles.Task}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}>
                                    <p>{item?.title}</p>
                                    <Image
                                      alt='Pooria Faramarzian'
                                      width='19'
                                      height='19'
                                      src={userAvatar}
                                      className={styles.Avatar}
                                    />
                                    <div className={styles.AvatarStatus} />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </section>
  );
};

export default TasksArea;
