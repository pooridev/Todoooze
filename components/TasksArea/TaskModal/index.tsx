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
  /** When provided, the modal edits this task instead of creating a new one. */
  task?: TaskType;
  /** Required in edit mode; falls back to the route param in create mode. */
  listId?: string;
}

interface FormState {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

const validateForm = ({ title, priority }: FormState): string | null => {
  if (!title.trim()) return "Title is required";
  if (priority === "Priority") return "Priority is required";

  return null;
};

const TaskModal = ({ taskStatus, isOpen, toggle, task, listId }: IProps) => {
  const { addNewTask, updateTask } = useSetLists();
  const isEditMode = Boolean(task);

  const buildFormState = (): FormState => ({
    title: task?.title ?? "",
    description: task?.description ?? "",
    status: task?.status ?? taskStatus,
    priority: task?.priority ?? "Priority",
  });

  const [taskPayload, setTaskPayload] = useState<FormState>(buildFormState);
  const [error, setError] = useState<string | null>(null);

  const query = useParams();
  const { list_id } = query;

  const lists = useLists();

  const fallbackList = Object.values(lists)[0];
  const targetListId = listId ?? String(list_id ?? fallbackList?.id ?? "");

  const submitHandler = () => {
    const validationError = validateForm(taskPayload);

    if (validationError) {
      setError(validationError);
      return;
    }

    if (isEditMode && task) {
      updateTask({
        listId: targetListId,
        taskId: task.id,
        updates: {
          title: taskPayload.title.trim(),
          description: taskPayload.description,
          status: taskPayload.status,
          priority: taskPayload.priority,
        },
      });
    } else {
      addNewTask({
        title: taskPayload.title.trim(),
        description: taskPayload.description,
        id: uuidv4(),
        status: taskPayload.status,
        priority: taskPayload.priority,
        listId: targetListId,
      });
    }

    closeModal();
  };

  const closeModal = () => {
    setTaskPayload(buildFormState());
    setError(null);
    toggle(false);
  };

  useEffect(() => {
    setTaskPayload((prev) => ({ ...prev, status: task?.status ?? taskStatus }));
  }, [taskStatus, task?.status]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Header toggle={closeModal} />
      <Modal.Body>
        <div className={styles.Content}>
          <input
            onChange={({ target }) => setTaskPayload({ ...taskPayload, title: target.value })}
            onKeyDown={(event) => event.key === "Enter" && submitHandler()}
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
          {error && <p className={styles.Error}>{error}</p>}
          <div className={styles.Menus}>
            <Select
              onChange={(item) => {
                setError(null);
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
      <Modal.Footer toggle={closeModal} onSubmit={submitHandler} submitLabel={isEditMode ? "Save changes" : "Save"} />
    </Modal>
  );
};

export default TaskModal;
