"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import styles from "./TaskModal.module.css";
import Select from "../../shared/Select";
import { TaskPriority, TaskStatus, TaskType } from "../../../types/Task";

import { statusItems } from "../../../constants/statusItems";
import { priorityItems } from "../../../constants/priorityItems";
import { PriorityIcon } from "../../shared/Icon";
import { useLists, useSetLists } from "../../../providers/Lists";
import Modal from "../../shared/Modal";

interface IProps {
  taskStatus: TaskStatus;
  toggle: (state: boolean) => void;
  isOpen: boolean;
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

const NewTaskModal = ({ taskStatus, isOpen, toggle }: IProps) => {
  const { addNewTask } = useSetLists();

  const [taskPayload, setTaskPayload] = useState({
    title: "",
    description: "",
    status: taskStatus,
    priority: "Priority" as TaskPriority,
  });

  const query = useParams();
  const { list_id } = query;

  const lists = useLists();

  const recentList = Object.values(lists)[0];

  const addTaskHandler = () => {
    const TASK_PAYLOAD = {
      title: taskPayload.title,
      description: taskPayload.description,
      id: uuidv4(),
      status: taskPayload.status,
      priority: taskPayload.priority,
      listId: String(list_id || recentList.id),
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
    <Modal isOpen={isOpen}>
      <Modal.Header toggle={toggle} />
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
