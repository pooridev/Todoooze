import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, FormEvent, memo } from 'react';
import { useRouter } from 'next/dist/client/router';
import { v4 as uuidv4 } from 'uuid';

import styles from './TaskModal.module.css';
import { PriorityIcon } from '../../shared/Icon';
import Select from '../../shared/Select';
import { TaskStatusType, TaskType } from '../../../types/TaskType';
import { addTask } from '../../../redux/actions/project';
import { IProjectState } from '../../../types/IProjectState';
import { statusItems } from '../../../constants/statusItems';
import { priorityItems } from '../../../constants/priorityItems';
import { getStatus } from '../../../helpers/task-utils';
import { useModal } from '../../../providers/Modal';

interface IProps {
  taskStatus: TaskStatusType;
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

  const [taskPayload, setTaskPayload] = useState({
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
      title: taskPayload.title,
      description: taskPayload.description,
      id: uuidv4(),
      status: getStatus(taskPayload.status.title),
      priority: taskPayload.priority
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
    setTaskPayload({
      title: '',
      description: '',
      status: taskStatus,
      priority: { title: 'Priority', icon: <PriorityIcon /> }
    });
  };

  useEffect(() => {
    setTaskPayload({ ...taskPayload, status: taskStatus });
  }, [taskStatusTitle]);

  useEffect(() => {
    changeModaConfig({
      ...modalConfig,
      onSubmit: addTaskHandler
    });
  }, [taskPayload, projects]);

  return (
    <div className={styles.Content} onSubmit={e => e.preventDefault()}>
      <input
        onChange={({ target }) =>
          setTaskPayload({ ...taskPayload, title: target.value })
        }
        type='text'
        autoFocus
        value={taskPayload.title}
        className={styles.Title}
        placeholder='Task title'
        title='Task title'
      />
      <textarea
        value={taskPayload.description}
        placeholder='Add description...'
        onChange={({ target }) =>
          setTaskPayload({ ...taskPayload, description: target.value })
        }
        className={styles.Description}></textarea>
      <div className={styles.Menus}>
        <Select<typeof taskPayload['priority']>
          onChange={item => {
            setTaskPayload({ ...taskPayload, priority: item });
          }}
          items={priorityItems}
          value={taskPayload.priority}
        />
        <Select<typeof taskPayload['status']>
          onChange={item =>
            setTaskPayload({
              ...taskPayload,
              status: item
            })
          }
          items={statusItems}
          value={taskPayload.status}
        />
      </div>
    </div>
  );
};

export default memo(NewTaskModal);
