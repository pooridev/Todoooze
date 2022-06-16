import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, FormEvent, memo } from 'react';
import { useRouter } from 'next/dist/client/router';
import { v4 as uuidv4 } from 'uuid';

import styles from './TaskModal.module.css';
import { PriorityIcon } from '../../shared/Icon';
import Select from '../../shared/Select';
import { TaskType } from '../../../types/TaskType';
import { addTask } from '../../../redux/actions/project';
import { IProjectState } from '../../../types/IProjectState';
import { statusItems } from '../../../constants/statusItems';
import { priorityItems } from '../../../constants/priorityItems';
import { getStatus } from '../../../helpers/task-utils';
import { useModal } from '../../../providers/Modal';

interface IProps {
  taskStatus: {
    title: 'Todo' | 'In Progress' | 'In Review' | 'Done';
    icon: JSX.Element;
  };
}

const validateForm = (TASK_PAYLOAD: TaskType) => {
  const { title, priority } = TASK_PAYLOAD;
  if (!title) {
    return false;
  }
  if (priority.title === 'Priority') {
    return false;
  }
  return true;
};
const NewTaskModal = (props: IProps) => {
  const { taskStatus } = props;
  const { title: taskStatusTitle } = taskStatus;

  const { changeModaConfig, modalConfig } = useModal();

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

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const TASK_PAYLOAD: TaskType = {
      title: taskData.title,
      description: taskData.description,
      id: uuidv4(),
      status: getStatus(taskData.status.title),
      priority: taskData.priority
    };

    const PROJECT_PAYLOAD = {
      id: project_id?.toString() || recentProject.id
    };

    const isValid = validateForm(TASK_PAYLOAD);

    if (isValid) {
      dispatch(addTask(TASK_PAYLOAD, PROJECT_PAYLOAD));
      resetForm();
      changeModaConfig({ isOpen: false });
      return;
    }

    alert('Title and Prority are required');
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

  useEffect(() => {
    setTaskData({ ...taskData, status: taskStatus });
  }, [taskStatusTitle]);

  useEffect(() => {
    changeModaConfig({
      ...modalConfig,
      onSubmit: addTaskHandler
    });
  }, [taskData, projects]);

  return (
    <div className={styles.Content} onSubmit={e => e.preventDefault()}>
      <input
        onChange={({ target }) =>
          setTaskData({ ...taskData, title: target.value })
        }
        type='text'
        autoFocus
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
        <Select
          onChange={item => {
            setTaskData({ ...taskData, priority: item });
          }}
          items={priorityItems}
          value={taskData.priority}
        />
        <Select
          onChange={item =>
            setTaskData({
              ...taskData,
              status: item
            })
          }
          items={statusItems}
          value={taskData.status}
        />
      </div>
    </div>
  );
};

export default memo(NewTaskModal);
