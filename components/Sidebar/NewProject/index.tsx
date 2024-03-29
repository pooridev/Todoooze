import { FC } from "react";

import { WritingIcon } from "../../shared/Icon";
import styles from "./NewProject.module.css";

const NewProject: FC = () => {
  return (
    <div className={`${styles["NewTask"]} group`}>
      <div className={styles["NewTaskButtonWrapper"]}>
        <button className={styles["NewTaskButton"]}>
          <WritingIcon className={`${styles["newTaskIcon"]} group-hover:fill-lightest`} />
          New List
        </button>
      </div>
    </div>
  );
};

export default NewProject;
