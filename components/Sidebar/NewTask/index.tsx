import { FC } from 'react';

import Icon from '../../../shared/Icon';
import styles from './NewTask.module.css';

const NewTask: FC = () => {
  return (
    <div className={`${styles['NewTask']} group`}>
      <div className={styles['NewTaskButtonWrapper']}>
        <button className={styles['NewTaskButton']}>
          <Icon
            iconName='writing'
            className={`${styles['newTaskIcon']} group-hover:fill-lightest`}
          />
          New task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
