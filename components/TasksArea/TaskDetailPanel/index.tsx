"use client";
import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import styles from "./TaskDetailPanel.module.css";
import { TaskType } from "../../../types/Task";
import Select from "../../shared/Select";
import { statusItems } from "../../../constants/statusItems";
import { priorityItems, priorityColors } from "../../../constants/priorityItems";
import { formatRelativeTime } from "../../../helpers/relative-time";
import { useSetLists } from "../../../providers/Lists";
import { CloseIcon, DeleteIcon } from "../../shared/Icon";

type Props = {
  /** The task to show; the panel is hidden when null. */
  task: TaskType | null;
  listId: string;
  onClose: () => void;
};

/**
 * A slide-in drawer with the full task detail. Edits save live as you type,
 * so the card on the board updates in real time.
 */
const TaskDetailPanel: FC<Props> = ({ task, listId, onClose }) => {
  useEffect(() => {
    if (!task) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [task, onClose]);

  const content = (
    <AnimatePresence>
      {task && (
        <>
          <motion.div
            className={styles.Backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />
          <motion.aside
            className={styles.Panel}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
          >
            {/* Keyed by task id so switching tasks resets the local edit state. */}
            <PanelContent key={task.id} task={task} listId={listId} onClose={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return typeof window !== "undefined" ? createPortal(content, document.body) : content;
};

const PanelContent: FC<{ task: TaskType; listId: string; onClose: () => void }> = ({ task, listId, onClose }) => {
  const { updateTask, deleteTask } = useSetLists();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");

  const titleChangeHandler = (value: string) => {
    setTitle(value);

    // Live-save, but never persist an empty title.
    if (value.trim()) updateTask({ listId, taskId: task.id, updates: { title: value.trim() } });
  };

  const descriptionChangeHandler = (value: string) => {
    setDescription(value);
    updateTask({ listId, taskId: task.id, updates: { description: value } });
  };

  const deleteHandler = () => {
    deleteTask({ listId, taskId: task.id });
    onClose();
  };

  return (
    <>
      <header className={styles.Header}>
        <span className={styles.HeaderLabel}>
          <span className={styles.PriorityDot} style={{ backgroundColor: priorityColors[task.priority] }} />
          Task details
        </span>
        <button className={styles.CloseButton} title="Close (Esc)" onClick={onClose}>
          <CloseIcon />
        </button>
      </header>

      <div className={styles.Body}>
        <input
          className={styles.TitleInput}
          value={title}
          placeholder="Task title"
          onChange={({ target }) => titleChangeHandler(target.value)}
          onBlur={() => {
            if (!title.trim()) setTitle(task.title);
          }}
        />

        <textarea
          className={styles.DescriptionInput}
          value={description}
          placeholder="Add a description..."
          rows={5}
          onChange={({ target }) => descriptionChangeHandler(target.value)}
        />

        <div className={styles.Properties}>
          <div className={styles.PropertyRow}>
            <span className={styles.PropertyLabel}>Status</span>
            <Select
              items={statusItems}
              value={task.status ?? "Todo"}
              onChange={(status) => updateTask({ listId, taskId: task.id, updates: { status } })}
            />
          </div>
          <div className={styles.PropertyRow}>
            <span className={styles.PropertyLabel}>Priority</span>
            <Select
              items={priorityItems}
              value={task.priority}
              onChange={(priority) => updateTask({ listId, taskId: task.id, updates: { priority } })}
            />
          </div>
          <div className={styles.PropertyRow}>
            <span className={styles.PropertyLabel}>Assignee</span>
            <span className={styles.Assignee}>
              <Image alt="Assignee avatar" width={18} height={18} src="/assets/images/avatar.jpg" />
              You
            </span>
          </div>
        </div>

        <div className={styles.Meta}>
          {task.createdAt && <span>Created {formatRelativeTime(task.createdAt)}</span>}
          {task.updatedAt && <span>Updated {formatRelativeTime(task.updatedAt)}</span>}
        </div>
      </div>

      <footer className={styles.Footer}>
        <button className={styles.DeleteButton} onClick={deleteHandler}>
          <DeleteIcon width="16" height="16" />
          Delete task
        </button>
      </footer>
    </>
  );
};

export default TaskDetailPanel;
