"use client";
import { useMemo } from "react";

import Navbar from "../../components/shared/Navbar/Navbar";
import TaskRow from "../../components/shared/TaskRow";
import { useLists } from "../../providers/Lists";
import { TaskType } from "../../types/Task";

import styles from "./Recent.module.css";

const MAX_RECENT_TASKS = 20;

type RecentEntry = {
  task: TaskType;
  listId: string;
  listTitle: string;
};

const RecentPage = () => {
  const lists = useLists();

  const recentTasks = useMemo<RecentEntry[]>(
    () =>
      Object.values(lists)
        .flatMap((list) => list.tasks.map((task) => ({ task, listId: list.id, listTitle: list.title })))
        .sort((a, b) => (b.task.updatedAt ?? 0) - (a.task.updatedAt ?? 0))
        .slice(0, MAX_RECENT_TASKS),
    [lists]
  );

  return (
    <>
      <Navbar>
        <h2 className={styles.Title}>Recent</h2>
      </Navbar>
      <div className={styles.Scroll}>
        <div className={styles.Recent}>
          <p className={styles.Subtitle}>Recently updated tasks across all your lists.</p>
          <div className={styles.Results}>
            {recentTasks.map(({ task, listId, listTitle }) => (
              <TaskRow key={task.id} task={task} listId={listId} listTitle={listTitle} />
            ))}
          </div>
          {recentTasks.length === 0 && <p className={styles.EmptyState}>Nothing here yet — go create some tasks!</p>}
        </div>
      </div>
    </>
  );
};

export default RecentPage;
