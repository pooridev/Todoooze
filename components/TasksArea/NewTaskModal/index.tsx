import { useEffect, ReactElement } from 'react';

import Modal from '../../../shared/Modal';
import styles from './NewTaskModal.module.css';
import {
  HighIcon,
  LowIcon,
  MediumIcon,
  UrgentIcon,
  PriorityIcon,
  TodoIcon,
  InProgressIcon,
  InReviewIcon,
  DoneIcon
} from '../../../shared/icon';
import { useModal } from '../../../providers/Modal';
import { usePatch } from './../../../hooks/usePatch';
import Header from '../../../shared/Modal/Header';
import Menu from './Menu';

interface IProps {
  projectName: string;
  taskStatus: { title: string; icon: ReactElement };
}

const priorityItems = [
  {
    title: 'Urgent',
    icon: <UrgentIcon />
  },
  {
    title: 'High',
    icon: <HighIcon />
  },
  {
    title: 'Medium',
    icon: <MediumIcon />
  },
  {
    title: 'Low',
    icon: <LowIcon />
  }
];
const statusItems = [
  {
    title: 'Todo',
    icon: <TodoIcon />
  },
  {
    title: 'In Progress',
    icon: <InProgressIcon />
  },
  {
    title: 'In Review',
    icon: <InReviewIcon />
  },
  {
    title: 'Done',
    icon: <DoneIcon />
  }
];
const NewTaskModal = (props: IProps) => {
  const { projectName, taskStatus } = props;
  const { isOpen } = useModal();

  const [formData, setFormData] = usePatch({
    title: '',
    description: '',
    status: taskStatus
  });

  return (
    <Modal projectName={projectName} isOpen={isOpen}>
      <form className={styles.Form} onSubmit={e => e.preventDefault()}>
        <input
          onChange={({ target }) => setFormData({ title: target.value })}
          type='text'
          value={formData.title}
          className={styles.Title}
          placeholder='Task title'
          title='Task title'
        />
        <textarea
          value={formData.description}
          placeholder='Add description...'
          onChange={({ target }) => setFormData({ description: target.value })}
          className={styles.Description}></textarea>
        <div className={styles.Menus}>
          <Menu
            onChange={item => console.log(item)}
            items={priorityItems}
            label={{ title: 'Priority', icon: <PriorityIcon /> }}
          />
          <Menu
            onChange={item => console.log(item)}
            items={statusItems}
            label={{ title: taskStatus.title, icon: taskStatus.icon }}
          />
        </div>
      </form>
    </Modal>
  );
};

export default NewTaskModal;
