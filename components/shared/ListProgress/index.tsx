"use client";
import { FC } from "react";
import { motion } from "framer-motion";

import styles from "./ListProgress.module.css";
import { TaskType } from "../../../types/Task";
import { ColumnType } from "../../../types/Column";

type Props = {
  tasks: TaskType[];
  columns: ColumnType[];
};

/**
 * Shows how much of a list is done — tasks in the last column count as done.
 */
const ListProgress: FC<Props> = ({ tasks, columns }) => {
  const total = tasks.length;

  if (total === 0 || columns.length === 0) return null;

  const doneColumnId = columns[columns.length - 1].id;
  const done = tasks.filter((task) => task.columnId === doneColumnId).length;
  const percent = Math.round((done / total) * 100);

  return (
    <div className={styles.Progress} title={`${percent}% in ${columns[columns.length - 1].name}`}>
      <span className={styles.Label}>
        {done}/{total} done
      </span>
      <div className={styles.Bar}>
        <motion.div
          className={styles.Fill}
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
        />
      </div>
    </div>
  );
};

export default ListProgress;
