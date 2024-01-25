import { useRouter } from "next/dist/client/router";
import { FC, useState } from "react";
import { ProjectType } from "../../../types/ProjectType";
import { TaskStatusType, TaskType } from "../../../types/Task";
import { AddIcon } from "../../shared/Icon";
import NewTaskModal from "../TaskModal";
import styles from "./ColumnHeader.module.css";

type ColumnHeaderProps = {
  column: {
    name: TaskStatusType["title"];
    icon: TaskStatusType["icon"];
    items: TaskType[];
  };
  project: ProjectType;
};

const ColumnHeader: FC<ColumnHeaderProps> = ({ column, project }) => {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const openNewTaskModal = () => {
    setIsNewTaskModalOpen(true);
  };

  return (
    <>
      <header key={column.name} className={styles.StatusHeader}>
        <div className={styles.HeaderText}>
          {column.icon}
          <p>{column.name}</p>
          <span>{column?.items?.length}</span>
        </div>
        <button onClick={openNewTaskModal} title="Add new task" className={styles.AddTaskButton}>
          <AddIcon />
        </button>
      </header>
      <NewTaskModal
        projectId={project?.id || ""}
        taskStatus={column.name}
        projectTitle={project?.title || ""}
        toggle={setIsNewTaskModalOpen}
        isOpen={isNewTaskModalOpen}
      />
    </>
  );
};

export default ColumnHeader;
