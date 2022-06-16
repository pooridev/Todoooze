import { useRouter } from 'next/dist/client/router';
import { useModal } from '../../../providers/Modal';
import { AddIcon } from '../../shared/Icon';
import NewTaskModal from '../TaskModal';
import styles from './ColumnHeader.module.css';

const ColumnHeader = ({ column, onChangeCurrentStatus, project }) => {
  const { changeModaConfig } = useModal();
  const router = useRouter();

  const openNewTaskModal = () => {
    onChangeCurrentStatus({
      title: column.name,
      icon: column.icon
    });
    changeModaConfig({
      isOpen: true,
      breadcrumb: [
        { isMain: true, label: project.title, href: '/project/' + project.id },
        { label: 'New Task', isMain: false, href: '/project/' + project.id }
      ],
      renderModalContent: (
        <NewTaskModal taskStatus={{ title: column.name, icon: column.icon }} />
      )
    });
  };

  return (
    <header key={column.columnId} className={styles.StatusHeader}>
      <div className={styles.HeaderText}>
        {column.icon}
        <p>{column.name}</p>
        <span>{column?.items?.length}</span>
      </div>
      <button
        onClick={openNewTaskModal}
        title='Add new task'
        className={styles.AddTaskButton}>
        <AddIcon />
      </button>
    </header>
  );
};

export default ColumnHeader;
