import { FC, ReactElement } from 'react';
import Image from 'next/image';
import { Draggable } from 'react-beautiful-dnd-next';

import styles from './styles.module.css';
import userAvatar from '../../../assets/images/avatar.jpg';
import { TaskType } from '../../../types/TaskType';

interface IProps {
  column: { name: string; icon: ReactElement; items: Array<TaskType> };
}

const DraggableTask: FC<IProps> = ({ column }) => {
  return (
    <>
      {column['items'].map((item, index) => (
        <Draggable key={item?.id} draggableId={item?.id} index={index}>
          {(provided, snapshot) => (
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
                <span>{item.priority.icon}</span>
                <span>
                  {column.icon}
                  {column.name}
                </span>
              </div>
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default DraggableTask;
