import { useModal } from '../../../providers/Modal';
import { AddIcon } from '../../shared/Icon';
import styles from './ColumnHeader.module.css';

const ColumnHeader = ({ column, onChangeCurrentStatus }) => {
  const { openModal } = useModal();
  
  return (
    <header key={column.columnId} className={styles.StatusHeader}>
      <div className={styles.HeaderText}>
        {column.icon}
        <p>{column.name}</p>
        <span>{column?.items?.length}</span>
      </div>
      <button
        onClick={() => {
          onChangeCurrentStatus({
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
  );
};

export default ColumnHeader;
