import {
  DoneIcon,
  InProgressIcon,
  InReviewIcon,
  TodoIcon
} from '../../shared/icon';
import styles from './TasksArea.module.css';

const TasksArea = () => {
  return (
    <section className={styles.TasksArea}>
      <div className={styles.TasksStatus}>
        <header className={styles.StatusHeader}>
          <TodoIcon /> <p>Todo</p> <span>2</span>
        </header>
        <div></div>
      </div>
      <div className={styles.TasksStatus}>
        <header className={styles.StatusHeader}>
          <InProgressIcon /> <p>In Progress</p> <span>1</span>
        </header>
        <div></div>
      </div>
      <div className={styles.TasksStatus}>
        <header className={styles.StatusHeader}>
          <InReviewIcon /> <p>In Review</p> <span>0</span>
        </header>
        <div></div>
      </div>
      <div className={styles.TasksStatus}>
        <header className={styles.StatusHeader}>
          <DoneIcon /> <p>Done</p> <span>0</span>
        </header>
        <div></div>
      </div>
    </section>
  );
};

export default TasksArea;
