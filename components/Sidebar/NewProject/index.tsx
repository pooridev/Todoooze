"use client";
import { FC, useState } from "react";

import { WritingIcon } from "../../shared/Icon";
import styles from "./NewProject.module.css";
import ListModal from "../ListModal";

const NewProject: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={`${styles["NewTask"]} group`}>
        <div className={styles["NewTaskButtonWrapper"]}>
          <button className={styles["NewTaskButton"]} onClick={() => setIsModalOpen(true)}>
            <WritingIcon className={styles["newTaskIcon"]} />
            New List
          </button>
        </div>
      </div>
      <ListModal isOpen={isModalOpen} toggle={setIsModalOpen} />
    </>
  );
};

export default NewProject;
