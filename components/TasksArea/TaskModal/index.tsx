import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, FormEvent, memo } from "react";
import { useRouter } from "next/dist/client/router";
import { v4 as uuidv4 } from "uuid";

import styles from "./TaskModal.module.css";
import Select from "../../shared/Select";
import { TaskPriority, TaskStatus, TaskType } from "../../../types/Task";
import { addTask } from "../../../redux/actions/project";
import { IProjectState } from "../../../types/IProjectState";
import { statusItems } from "../../../constants/statusItems";
import { priorityItems } from "../../../constants/priorityItems";
import { getStatus } from "../../../helpers/task-utils";
import { useModal } from "../../../providers/Modal";
import { PriorityIcon } from "../../shared/Icon";
import { useProjects } from "../../../providers/Projects";

interface IProps {
  taskStatus: TaskStatus;
}

const validateForm = (TASK_PAYLOAD: TaskType) => {
  const { title, priority } = TASK_PAYLOAD;
  debugger;
  if (!title) {
    return false;
  }

  if (priority == "Priority") {
    return false;
  }

  return true;
};
const NewTaskModal = (props: IProps) => {
  const { taskStatus } = props;

  const { changeModaConfig, modalConfig } = useModal();

  const { dispatch } = useProjects();

  const [taskPayload, setTaskPayload] = useState({
    title: "",
    description: "",
    status: taskStatus,
    priority: "Priority" as TaskPriority,
  });

  const router = useRouter();

  // The given ID in the path (URL)
  const { project_id } = router.query;

  const { projects } = useProjects();

  // We would get the most recent project
  const recentProject = Object.values(projects)[0];

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const TASK_PAYLOAD = {
      title: taskPayload.title,
      description: taskPayload.description,
      id: uuidv4(),
      status: taskPayload.status,
      priority: taskPayload.priority,
      projectId: String(project_id || recentProject.id),
    };

    const isValid = validateForm(TASK_PAYLOAD);

    if (isValid) {
      dispatch({
        type: "ADD_NEW_TASK",
        payload: TASK_PAYLOAD,
      });

      resetForm();
      changeModaConfig({ isOpen: false });
      return;
    }

    alert("Title and Prority are required");
  };

  // To clear text fields and selected menu items in the modal form
  const resetForm = () => {
    setTaskPayload({
      title: "",
      description: "",
      status: taskStatus,
      priority: "Priority",
    });
  };

  useEffect(() => {
    setTaskPayload({ ...taskPayload, status: taskStatus });
  }, [taskStatus]);

  useEffect(() => {
    changeModaConfig({
      ...modalConfig,
      onSubmit: addTaskHandler,
    });
  }, [taskPayload, projects]);

  return (
    <div className={styles.Content} onSubmit={(e) => e.preventDefault()}>
      <input
        onChange={({ target }) =>
          setTaskPayload({ ...taskPayload, title: target.value })
        }
        type="text"
        autoFocus
        value={taskPayload.title}
        className={styles.Title}
        placeholder="Task title"
        title="Task title"
      />
      <textarea
        value={taskPayload.description}
        placeholder="Add description..."
        onChange={({ target }) =>
          setTaskPayload({ ...taskPayload, description: target.value })
        }
        className={styles.Description}
      ></textarea>
      <div className={styles.Menus}>
        <Select
          onChange={(item) => {
            console.log({ item });

            setTaskPayload({ ...taskPayload, priority: item });
          }}
          defaultValue={{ title: "Priority", icon: <PriorityIcon /> }}
          items={priorityItems}
          value={taskPayload.priority}
        />
        <Select
          onChange={(item) =>
            setTaskPayload({
              ...taskPayload,
              status: item,
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
