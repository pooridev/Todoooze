import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { v4 as uuidv4 } from "uuid";

import styles from "./TaskModal.module.css";
import Select from "../../shared/Select";
import { TaskPriority, TaskStatus, TaskType } from "../../../types/Task";

import { statusItems } from "../../../constants/statusItems";
import { priorityItems } from "../../../constants/priorityItems";
import { PriorityIcon } from "../../shared/Icon";
import { useProjects, useSetProjects } from "../../../providers/Projects";
import Modal from "../../shared/Modal";

interface IProps {
  taskStatus: TaskStatus;
  toggle: (state: boolean) => void;
  isOpen: boolean;
  projectTitle: string;
  projectId: string;
}

const validateForm = (TASK_PAYLOAD: TaskType) => {
  const { title, priority } = TASK_PAYLOAD;

  if (!title) {
    return false;
  }

  if (priority == "Priority") {
    return false;
  }

  return true;
};

const NewTaskModal = ({ taskStatus, isOpen, toggle, projectId, projectTitle }: IProps) => {
  const { addNewTask } = useSetProjects();

  const [taskPayload, setTaskPayload] = useState({
    title: "",
    description: "",
    status: taskStatus,
    priority: "Priority" as TaskPriority,
  });

  const router = useRouter();
  const { project_id } = router.query;

  const projects = useProjects();

  const recentProject = Object.values(projects)[0];

  const addTaskHandler = () => {
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
      addNewTask(TASK_PAYLOAD);
      resetForm();
      return;
    }

    alert("Title and Prority are required");
  };

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

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <Modal.Header
        toggle={toggle}
        breadcrumb={[
          { isMain: true, label: projectTitle, href: "/project/" + projectId },
          { label: "New Task", isMain: false, href: "/project/" + projectId },
        ]}
      />
      <Modal.Body>
        <div className={styles.Content}>
          <input
            onChange={({ target }) => setTaskPayload({ ...taskPayload, title: target.value })}
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
            onChange={({ target }) => setTaskPayload({ ...taskPayload, description: target.value })}
            className={styles.Description}
          />
          <div className={styles.Menus}>
            <Select
              onChange={(item) => {
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
      </Modal.Body>
      <Modal.Footer toggle={toggle} onSubmit={addTaskHandler} />
    </Modal>
  );
};

export default NewTaskModal;
