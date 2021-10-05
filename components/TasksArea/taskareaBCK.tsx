import { useState } from 'react';

import {
  DoneIcon,
  InProgressIcon,
  InReviewIcon,
  TodoIcon
} from '../../shared/icon';
import styles from './TasksArea.module.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const TasksArea = () => {
  const [state, setState] = useState<any>([
    [
      {
        id: '1',
        title: 'Todo',
        icon: <TodoIcon />,
        tasks: [{ title: 'FFG', id: 5 }]
      }
    ],
    [
      {
        id: '2',
        title: 'In Progress',
        icon: <InProgressIcon />,
        tasks: [{ title: 'FFG', id: 6 }]
      }
    ],
    [
      {
        id: '3',
        title: 'In Review',
        icon: <InReviewIcon />,
        tasks: [{ title: 'FFG', id: 7 }]
      }
    ],
    ,
    [
      {
        id: '4',
        title: 'Done',
        icon: <DoneIcon />,
        tasks: [{ title: 'FFG', id: 8 }]
      }
    ]
  ]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      debugger;
      setState(newState?.filter(group => group?.length));
    }
  }
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
      <DragDropContext onDragEnd={onDragEnd}>
        {state.map((el, ind) => (
          <Droppable key={ind} droppableId={el.id}>
            {(provided, snapshot) => (
              <div
                key={el.id}
                className={styles.TasksStatus}
                ref={provided.innerRef}
                {...provided.droppableProps}>
                {el?.map((item, index) => (
                  <>
                    <header key={item.id} className={styles.StatusHeader}>
                      {item.icon}
                      <p>{item.title}</p>
                      <span>0</span>
                    </header>
                    {item.tasks.map(
                      (
                        task: { id: number; title: string },
                        taskIndex: number
                      ) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id + ''}
                          index={taskIndex}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              <div>{task?.title}</div>
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                  </>
                ))}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </section>
  );
};

export default TasksArea;
