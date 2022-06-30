import { useRouter } from 'next/dist/client/router';
import { FC } from 'react';
import { useModal } from '../../../providers/Modal';
import { ProjectType } from '../../../types/ProjectType';
import { TaskStatusType, TaskType } from '../../../types/TaskType';
import { AddIcon } from '../../shared/Icon';
import NewTaskModal from '../TaskModal';
import styles from './ColumnHeader.module.css';

type ColumnHeaderProps = {
  column: {
    name: TaskStatusType['title'];
    icon: TaskStatusType['icon'];
    items: TaskType[];
  };
  project: ProjectType;
};

const ColumnHeader: FC<ColumnHeaderProps> = ({ column, project }) => {
  const { changeModaConfig } = useModal();

  const openNewTaskModal = () => {
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
    <header key={column.name} className={styles.StatusHeader}>
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
