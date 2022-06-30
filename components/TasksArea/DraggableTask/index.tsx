import { FC, ReactElement } from 'react';
import Image from 'next/image';
import { Draggable } from 'react-beautiful-dnd-next';
import * as ReactContextMenu from '@radix-ui/react-context-menu';

import styles from './styles.module.css';
import userAvatar from '../../../assets/images/avatar.jpg';
import { TaskStatusType, TaskType } from '../../../types/TaskType';
import ContextMenu from './ContextMenu';
import Select from '../../shared/Select';
import { statusItems } from '../../../constants/statusItems';
import { priorityItems } from '../../../constants/priorityItems';
import { ProjectType } from '../../../types/ProjectType';
import { useDispatch } from 'react-redux';
import {
  updateTaskPriority,
  updateTaskStatus
} from '../../../redux/actions/project';
import { getStatus } from '../../../helpers/task-utils';

interface IProps {
  column: {
    name: 'Todo' | 'In Progress' | 'In Review' | 'Done';
    icon: ReactElement;
    items: Array<TaskType>;
  };
  project: ProjectType;
}

const DraggableTask: FC<IProps> = ({ column, project }) => {
  const dispatch = useDispatch();

  const updateTaskStatusHandler = (
    taskId: string,
    newStatus: TaskStatusType
  ) => {
    debugger;
    dispatch(updateTaskStatus(newStatus, taskId, project.id));
  };

  const updateTaskPriorityHandler = (
    taskId: string,
    newPriority: TaskType['priority']
  ) => {
    dispatch(updateTaskPriority(newPriority, taskId, project.id));
  };
  return (
    <>
      {column?.items.map((item, index) => (
        <ReactContextMenu.Root key={item.id}>
          <ReactContextMenu.Trigger>
            <Draggable draggableId={item.id} index={index}>
              {provided => (
                <div
                  className={styles.Task}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  <div className={styles.TaskHeader}>
                    <p title={item?.title}>{item?.title}</p>
                    <Image
                      alt='Pooria Faramarzian'
                      width='19'
                      height='19'
                      src={userAvatar}
                      className={styles.Avatar}
                    />
                    <div className={styles.AvatarStatus} />
                  </div>
                  <div className={styles.TaskFooter}>
                    <Select<TaskType['priority']>
                      items={priorityItems}
                      value={item?.priority}
                      variant='outline'
                      onChange={selectedPriority => {
                        updateTaskPriorityHandler(item.id, selectedPriority);
                      }}
                      iconOnly
                    />
                    <Select<typeof statusItems[0]>
                      items={statusItems}
                      value={{ title: column.name, icon: column.icon }}
                      variant='outline'
                      onChange={selectedStatus => {
                        updateTaskStatusHandler(item.id, selectedStatus);
                      }}
                    />
                  </div>
                </div>
              )}
            </Draggable>
          </ReactContextMenu.Trigger>
          <ContextMenu taskId={item.id} />
        </ReactContextMenu.Root>
      ))}
    </>
  );
};

export default DraggableTask;
