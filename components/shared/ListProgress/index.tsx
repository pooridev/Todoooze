"use client";
import { FC } from "react";
import { motion } from "framer-motion";

import styles from "./ListProgress.module.css";
import { TaskType } from "../../../types/Task";

type Props = {
  tasks: TaskType[];
};

/**
 * Shows how much of a list is done — a small count plus an animated progress bar.
 */
const ListProgress: FC<Props> = ({ tasks }) => {
  const total = tasks.length;

  if (total === 0) return null;

  const done = tasks.filter((task) => task.status === "Done").length;
  const percent = Math.round((done / total) * 100);

  return (
    <div className={styles.Progress} title={`${percent}% done`}>
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
