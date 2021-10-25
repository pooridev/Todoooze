import { useDispatch, useSelector } from 'react-redux';
import { useEffect, ReactElement, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { v4 as uuidv4 } from 'uuid';

import Modal from '../../shared/Modal';
import styles from './NewTaskModal.module.css';
import { PriorityIcon } from '../../shared/icon';
import { useModal } from '../../../providers/Modal';
import Menu from '../../shared/Menu';
import { TaskType } from '../../../types/TaskType';
import { addTask } from '../../../redux/actions/project';
import { IProjectState } from './../../../types/IProjectState';
import { statusItems } from '../../../constants/statusItems';
import { priorityItems } from '../../../constants/priorityItems';
import { getStatus } from '../../../helpers/task-utils';

interface IProps {
  projectName: string;
  taskStatus: { title: string; icon: ReactElement };
}

const validateForm = TASK_PAYLOAD => {
  const { title, priority } = TASK_PAYLOAD;
  if (!title) {
    return false;
  }
  if (priority === 'Priority') {
    return false;
  }
  return true;
};
const NewTaskModal = (props: IProps) => {
  const { projectName, taskStatus } = props;

  const { isOpen } = useModal();

  const dispatch = useDispatch();

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: taskStatus,
    priority: { title: 'Priority', icon: <PriorityIcon /> }
  });

  const router = useRouter();

  // The given ID in the path (URL)
  const { project_id } = router.query;

  // All projects that made by user
  const projects = useSelector((state: IProjectState) => state.projects);

  // We would get the most recent project
  const recentProject = projects[projects.length - 1];

  const addTaskHandler = () => {
    const TASK_PAYLOAD: TaskType = {
      title: taskData.title,
      description: taskData.description,
      id: uuidv4(),
      status: getStatus(taskData.status.title)
    };

    const PROJECT_PAYLOAD = {
      id: project_id?.toString() || recentProject.id
    };

    const isValid = validateForm(TASK_PAYLOAD);

    if (isValid) dispatch(addTask(TASK_PAYLOAD, PROJECT_PAYLOAD));
    else alert('Title and Prority are required');

    resetForm();
  };

  // To clear text fields and selected menu items in the modal form
  const resetForm = () => {
    setTaskData({
      title: '',
      description: '',
      status: taskStatus,
      priority: { title: 'Priority', icon: <PriorityIcon /> }
    });
  };

  useEffect(
    () => setTaskData({ ...taskData, status: taskStatus }),
    [taskStatus]
  );

  return (
    <Modal onSubmit={addTaskHandler} projectName={projectName} isOpen={isOpen}>
      <form className={styles.Form} onSubmit={e => e.preventDefault()}>
        <input
          onChange={({ target }) =>
            setTaskData({ ...taskData, title: target.value })
          }
          type='text'
          value={taskData.title}
          className={styles.Title}
          placeholder='Task title'
          title='Task title'
        />
        <textarea
          value={taskData.description}
          placeholder='Add description...'
          onChange={({ target }) =>
            setTaskData({ ...taskData, description: target.value })
          }
          className={styles.Description}></textarea>
        <div className={styles.Menus}>
          <Menu
            onChange={item => setTaskData({ ...taskData, priority: item })}
            items={priorityItems}
            label={taskData.priority}
          />
          <Menu
            onChange={item => setTaskData({ ...taskData, status: item })}
            items={statusItems}
            label={taskData.status}
          />
        </div>
      </form>
    </Modal>
  );
};

export default NewTaskModal;
